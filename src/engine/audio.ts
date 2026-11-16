import { Howl, Howler } from 'howler';
import { BGM_ASSETS, SFX_ASSETS, type BgmId, type SfxId } from '../data/assets';

class AudioEngine {
  private bgmHowls = new Map<BgmId, Howl>();
  private sfxHowls = new Map<SfxId, Howl>();
  private currentBgmId: BgmId | null = null;
  private bgmVolume = 0.42;
  private sfxVolume = 0.65;
  private muted = false;
  private lastBlipTime = 0;
  private initialized = false;

  public async preloadCoreAudio(onStep?: () => void): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;

    const sfxEntries = Object.entries(SFX_ASSETS) as Array<[SfxId, string[]]>;
    await Promise.all(
      sfxEntries.map(
        ([id, src]) =>
          new Promise<void>((resolve) => {
            const howl = new Howl({
              src,
              preload: true,
              volume: this.sfxVolume,
              onload: () => {
                onStep?.();
                resolve();
              },
              onloaderror: () => {
                onStep?.();
                resolve();
              },
            });
            this.sfxHowls.set(id, howl);
            // Failsafe timeout so a slow codec probe never stalls preloader
            setTimeout(() => resolve(), 2500);
          })
      )
    );

    // Prepare BGM Howls (streamed/html5 false where fast, preload metadata cleanly)
    const bgmEntries = Object.entries(BGM_ASSETS) as Array<[BgmId, { src: string }]>;
    for (const [id, meta] of bgmEntries) {
      const howl = new Howl({
        src: [meta.src],
        loop: true,
        preload: id === 'bgm_title' || id === 'bgm_classroom' || id === 'bgm_debate',
        volume: 0,
      });
      this.bgmHowls.set(id, howl);
    }
  }

  public unlock(): void {
    if (Howler.ctx && Howler.ctx.state === 'suspended') {
      Howler.ctx.resume().catch(() => {});
    }
  }

  public playBgm(id: BgmId, fadeMs = 750): void {
    this.unlock();
    if (this.currentBgmId === id) {
      const existing = this.bgmHowls.get(id);
      if (existing && !existing.playing()) {
        existing.volume(this.muted ? 0 : this.bgmVolume);
        existing.play();
      }
      return;
    }

    // Fade out old BGM
    if (this.currentBgmId) {
      const prevId = this.currentBgmId;
      const prev = this.bgmHowls.get(prevId);
      if (prev && prev.playing()) {
        prev.fade(prev.volume(), 0, Math.min(fadeMs, 550));
        setTimeout(() => {
          if (this.currentBgmId === prevId) return;
          prev.stop();
        }, Math.min(fadeMs, 550) + 50);
      }
    }

    this.currentBgmId = id;
    let next = this.bgmHowls.get(id);
    if (!next) {
      next = new Howl({
        src: [BGM_ASSETS[id].src],
        loop: true,
        preload: true,
        volume: 0,
      });
      this.bgmHowls.set(id, next);
    }

    const targetVol = this.muted ? 0 : this.bgmVolume;
    const startPlay = () => {
      if (this.currentBgmId !== id) return;
      next!.stop();
      next!.volume(0);
      next!.play();
      next!.fade(0, targetVol, fadeMs);
    };

    if (next.state() === 'loaded') {
      startPlay();
    } else {
      next.once('load', startPlay);
      next.load();
    }
  }

  public stopBgm(fadeMs = 400): void {
    if (!this.currentBgmId) return;
    const cur = this.bgmHowls.get(this.currentBgmId);
    this.currentBgmId = null;
    if (cur && cur.playing()) {
      cur.fade(cur.volume(), 0, fadeMs);
      setTimeout(() => cur.stop(), fadeMs + 40);
    }
  }

  public getCurrentBgmId(): BgmId | null {
    return this.currentBgmId;
  }

  public playSfx(id: SfxId, options?: { rate?: number; volume?: number }): void {
    if (this.muted) return;
    this.unlock();
    const howl = this.sfxHowls.get(id);
    if (!howl) return;
    const soundId = howl.play();
    const vol = (options?.volume ?? 1) * this.sfxVolume;
    howl.volume(Math.min(1, vol), soundId);
    if (options?.rate) {
      howl.rate(options.rate, soundId);
    }
  }

  public playBlip(rate = 1.0): void {
    if (this.muted) return;
    const now = performance.now();
    if (now - this.lastBlipTime < 48) return;
    this.lastBlipTime = now;
    const jitter = (Math.random() - 0.5) * 0.06;
    this.playSfx('blip', { rate: Math.max(0.55, Math.min(1.6, rate + jitter)), volume: 0.28 });
  }

  // Layered studio SFX combos for Ace Attorney / Danganronpa drama
  public playObjection(): void {
    this.playSfx('impact_slam', { volume: 1.0, rate: 0.95 });
    this.playSfx('bullet_fire', { volume: 0.8, rate: 1.08 });
    setTimeout(() => {
      this.playSfx('glass_shatter', { volume: 0.95, rate: 1.02 });
    }, 90);
  }

  public playPress(): void {
    this.playSfx('question', { volume: 0.9, rate: 1.05 });
    this.playSfx('impact_metal', { volume: 0.65, rate: 1.15 });
  }

  public playDamage(): void {
    this.playSfx('glitch', { volume: 0.9, rate: 0.9 });
    this.playSfx('error', { volume: 0.85 });
  }

  public playClueGet(): void {
    this.playSfx('clue_get', { volume: 0.85 });
    setTimeout(() => this.playSfx('glass_ping', { volume: 0.7, rate: 1.15 }), 120);
  }

  public playBreakthrough(): void {
    this.playSfx('explosion', { volume: 0.85, rate: 1.05 });
    setTimeout(() => this.playSfx('jingle_victory', { volume: 0.8 }), 160);
  }

  public setBgmVolume(v: number): void {
    this.bgmVolume = Math.max(0, Math.min(1, v));
    if (this.currentBgmId && !this.muted) {
      const cur = this.bgmHowls.get(this.currentBgmId);
      if (cur) cur.volume(this.bgmVolume);
    }
  }

  public setSfxVolume(v: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, v));
  }

  public setMuted(m: boolean): void {
    this.muted = m;
    Howler.mute(m);
    if (!m && this.currentBgmId) {
      const cur = this.bgmHowls.get(this.currentBgmId);
      if (cur) cur.volume(this.bgmVolume);
    }
  }

  public getState() {
    return {
      bgmVolume: this.bgmVolume,
      sfxVolume: this.sfxVolume,
      muted: this.muted,
      currentBgmId: this.currentBgmId,
    };
  }
}

export const audioEngine = new AudioEngine();
