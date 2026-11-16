import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BookMarked, History, Home, Library, Volume2, VolumeX } from 'lucide-react';
import {
  CHARACTERS,
  type BackgroundId,
} from './data/assets';
import { getChapterById } from './data/chapters';
import { TRUTH_BULLETS } from './data/bullets';
import type {
  BacklogEntry,
  ChoiceOption,
  DialogueStep,
  SaveState,
  StageSlot,
  TruthBullet,
} from './data/types';
import { audioEngine } from './engine/audio';
import { preloadAllGameAssets, type PreloadProgress } from './engine/preloader';
import { ParticleCanvas, type BurstStyle, type ParticleCanvasHandle, type ParticleMood } from './components/ParticleCanvas';
import { PreloaderScreen } from './components/PreloaderScreen';
import { TitleScreen } from './components/TitleScreen';
import { VnStage } from './components/VnStage';
import { NonstopDebateStage } from './components/NonstopDebateStage';
import { LivestreamStage } from './components/LivestreamStage';
import { TopoPuzzleStage } from './components/TopoPuzzleStage';
import { CutInOverlay, type CutInData } from './components/CutInOverlay';
import { AlmanacModal } from './components/AlmanacModal';
import {
  AudioSettingsModal,
  BacklogModal,
  BulletNotebookModal,
  ChapterResultScreen,
} from './components/HudModals';

const SAVE_KEY = 'honshitsu_debate_adv_save_v1';

const DEFAULT_SAVE: SaveState = {
  chapterId: 1,
  stepIndex: 0,
  unlockedBulletIds: [],
  completedChapters: [],
  bestRankByChapter: {},
  haCount: 0,
  honshitsuCount: 0,
};

function loadSave(): { state: SaveState; hasSavedProgress: boolean } {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { state: DEFAULT_SAVE, hasSavedProgress: false };
    const parsed = JSON.parse(raw) as Partial<SaveState>;
    const merged: SaveState = {
      chapterId: parsed.chapterId ?? 1,
      stepIndex: parsed.stepIndex ?? 0,
      unlockedBulletIds: Array.isArray(parsed.unlockedBulletIds) ? parsed.unlockedBulletIds : [],
      completedChapters: Array.isArray(parsed.completedChapters) ? parsed.completedChapters : [],
      bestRankByChapter: parsed.bestRankByChapter ?? {},
      haCount: parsed.haCount ?? 0,
      honshitsuCount: parsed.honshitsuCount ?? 0,
    };
    return {
      state: merged,
      hasSavedProgress: merged.chapterId > 1 || merged.stepIndex > 0 || merged.completedChapters.length > 0,
    };
  } catch {
    return { state: DEFAULT_SAVE, hasSavedProgress: false };
  }
}

export const App: React.FC = () => {
  // Preload state
  const [preloadProgress, setPreloadProgress] = useState<PreloadProgress>({
    loaded: 0,
    total: 1,
    percent: 0,
    phase: '初期化中…',
    detail: '',
  });
  const [preloadReady, setPreloadReady] = useState(false);

  // Screen mode
  const [screen, setScreen] = useState<'preload' | 'title' | 'play'>('preload');

  // Persistent save
  const initialSave = useMemo(() => loadSave(), []);
  const [saveState, setSaveState] = useState<SaveState>(initialSave.state);
  const [hasResumeSave, setHasResumeSave] = useState<boolean>(initialSave.hasSavedProgress);

  // Active gameplay state
  const [chapterId, setChapterId] = useState<number>(1);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [subQueue, setSubQueue] = useState<DialogueStep[]>([]);
  const [currentBg, setCurrentBg] = useState<BackgroundId>('bg_cherry_path');
  const [currentStage, setCurrentStage] = useState<StageSlot[]>([]);
  const [sanity, setSanity] = useState<number>(100);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [backlog, setBacklog] = useState<BacklogEntry[]>([]);

  // Overlays & modals
  const [cutIn, setCutIn] = useState<CutInData | null>(null);
  const [recentBulletToast, setRecentBulletToast] = useState<TruthBullet | null>(null);
  const [showAlmanac, setShowAlmanac] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);
  const [showBacklog, setShowBacklog] = useState(false);
  const [showAudio, setShowAudio] = useState(false);

  // Audio controls state
  const [bgmVol, setBgmVol] = useState(0.45);
  const [sfxVol, setSfxVol] = useState(0.75);
  const [muted, setMuted] = useState(false);

  const particleRef = useRef<ParticleCanvasHandle | null>(null);
  const cutInTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Kick off 100% upfront preload on mount
  useEffect(() => {
    let active = true;
    preloadAllGameAssets((p) => {
      if (active) setPreloadProgress(p);
    }).then(() => {
      if (active) setPreloadReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  // Persist saveState to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveState));
    } catch {
      // ignore quota error
    }
  }, [saveState]);

  const chapter = useMemo(() => getChapterById(chapterId), [chapterId]);
  const activeStep = useMemo(() => {
    if (subQueue.length > 0) return subQueue[0];
    return chapter.steps[stepIdx] ?? chapter.steps[chapter.steps.length - 1];
  }, [subQueue, chapter, stepIdx]);

  // Helper: trigger cut-in banner
  const triggerCutIn = useCallback((data: CutInData, durationMs = 1200) => {
    setCutIn(data);
    if (cutInTimerRef.current) clearTimeout(cutInTimerRef.current);
    cutInTimerRef.current = setTimeout(() => {
      setCutIn(null);
    }, durationMs);
  }, []);

  const triggerBurst = useCallback((x: number, y: number, style: BurstStyle) => {
    particleRef.current?.triggerBurst(x, y, style);
  }, []);

  // Helper: unlock Truth Bullet & show celebration toast
  const unlockBullet = useCallback(
    (bullet: TruthBullet) => {
      setSaveState((prev) => {
        if (prev.unlockedBulletIds.includes(bullet.id)) return prev;
        return { ...prev, unlockedBulletIds: [...prev.unlockedBulletIds, bullet.id] };
      });
      setRecentBulletToast(bullet);
      triggerBurst(window.innerWidth * 0.85, 110, 'clue');
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setRecentBulletToast(null), 3400);
    },
    [triggerBurst]
  );

  // Sync visual/BGM/bullet side-effects whenever activeStep changes during gameplay
  useEffect(() => {
    if (screen !== 'play' || !activeStep) return;

    if (activeStep.type === 'dialogue') {
      if (activeStep.bg) setCurrentBg(activeStep.bg);
      if (activeStep.stage) setCurrentStage(activeStep.stage);
      if (activeStep.bgm) audioEngine.playBgm(activeStep.bgm, 750);
      if (activeStep.addBullet) {
        audioEngine.playClueGet();
        unlockBullet(activeStep.addBullet);
      }

      // Append to backlog
      const speakerId =
        activeStep.speaker &&
        activeStep.speaker !== 'narrator' &&
        activeStep.speaker !== 'system' &&
        activeStep.speaker !== 'crowd'
          ? activeStep.speaker
          : null;
      const meta = speakerId ? CHARACTERS[speakerId] : null;
      const speakerName =
        activeStep.speakerLabel ??
        meta?.name ??
        (activeStep.speaker === 'crowd' ? '教室の面々' : '地の文');
      const speakerColor = meta?.accentColor ?? '#94a3b8';

      setBacklog((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.text === activeStep.text && last.speakerName === speakerName) return prev;
        return [...prev.slice(-140), { speakerName, speakerColor, text: activeStep.text }];
      });
    } else if (activeStep.type === 'choice') {
      if (activeStep.bg) setCurrentBg(activeStep.bg);
      if (activeStep.stage) setCurrentStage(activeStep.stage);
    } else if (activeStep.type === 'chapter_end') {
      audioEngine.playSfx('jingle_clear', { volume: 0.85 });
      const rank: 'S' | 'A' | 'B' = sanity >= 80 ? 'S' : sanity >= 50 ? 'A' : 'B';
      const rankOrder = { S: 3, A: 2, B: 1 };
      setSaveState((prev) => {
        const completed = prev.completedChapters.includes(chapterId)
          ? prev.completedChapters
          : [...prev.completedChapters, chapterId];
        const prevRank = prev.bestRankByChapter[chapterId];
        const bestRank =
          !prevRank || rankOrder[rank] > rankOrder[prevRank] ? rank : prevRank;
        return {
          ...prev,
          completedChapters: completed,
          bestRankByChapter: { ...prev.bestRankByChapter, [chapterId]: bestRank },
        };
      });
    }

    // Update save cursor when on main timeline
    if (subQueue.length === 0) {
      setSaveState((prev) => ({
        ...prev,
        chapterId,
        stepIndex: stepIdx,
      }));
      setHasResumeSave(true);
    }
  }, [screen, activeStep, chapterId, stepIdx, subQueue.length, sanity, unlockBullet]);

  // Start or jump to a chapter
  const startChapter = useCallback((targetChapterId: number, startAtStep = 0) => {
    const ch = getChapterById(targetChapterId);
    setChapterId(ch.id);
    setStepIdx(Math.min(startAtStep, Math.max(0, ch.steps.length - 1)));
    setSubQueue([]);
    setCurrentBg(ch.coverBg);
    setCurrentStage([]);
    setSanity(100);
    setAutoPlay(false);
    setBacklog([]);
    setScreen('play');
  }, []);

  const advanceMainStep = useCallback(() => {
    setStepIdx((idx) => Math.min(chapter.steps.length - 1, idx + 1));
  }, [chapter.steps.length]);

  const handleAdvanceDialogue = useCallback(() => {
    if (subQueue.length > 0) {
      const rest = subQueue.slice(1);
      setSubQueue(rest);
      if (rest.length === 0) {
        advanceMainStep();
      }
      return;
    }
    advanceMainStep();
  }, [subQueue, advanceMainStep]);

  const handleSkipToNextEvent = useCallback(() => {
    setAutoPlay(false);
    // Flush subQueue first, unlocking any bullets in it
    if (subQueue.length > 0) {
      subQueue.forEach((l) => {
        if (l.addBullet) unlockBullet(l.addBullet);
        if (l.bg) setCurrentBg(l.bg);
        if (l.stage) setCurrentStage(l.stage);
      });
      setSubQueue([]);
      advanceMainStep();
      return;
    }
    // Scan forward in chapter.steps until the next non-dialogue step
    let target = stepIdx + 1;
    let lastBg = currentBg;
    let lastStage = currentStage;
    while (target < chapter.steps.length) {
      const s = chapter.steps[target];
      if (s.type === 'dialogue') {
        if (s.addBullet) unlockBullet(s.addBullet);
        if (s.bg) lastBg = s.bg;
        if (s.stage) lastStage = s.stage;
        target++;
      } else {
        break;
      }
    }
    setCurrentBg(lastBg);
    setCurrentStage(lastStage);
    setStepIdx(Math.min(target, chapter.steps.length - 1));
  }, [subQueue, stepIdx, chapter.steps, currentBg, currentStage, unlockBullet, advanceMainStep]);

  const handleChooseOption = useCallback(
    (option: ChoiceOption) => {
      if (option.addBullet) {
        audioEngine.playClueGet();
        unlockBullet(option.addBullet);
      }
      if (option.sanityBonus) {
        setSanity((s) => Math.max(20, Math.min(100, s + option.sanityBonus!)));
      }
      if (option.responseLines.length > 0) {
        setSubQueue(option.responseLines);
      } else {
        advanceMainStep();
      }
    },
    [unlockBullet, advanceMainStep]
  );

  const handleModeComplete = useCallback(
    (afterLines: DialogueStep[]) => {
      if (afterLines.length > 0) {
        setSubQueue(afterLines);
      } else {
        advanceMainStep();
      }
    },
    [advanceMainStep]
  );

  // Determine ambient Kenney particle mood
  const particleMood: ParticleMood = useMemo(() => {
    if (screen === 'preload') return 'stars';
    if (screen === 'title') return 'sakura';
    if (activeStep?.type === 'dialogue' && activeStep.particleMood) return activeStep.particleMood;
    if (activeStep?.type === 'debate') return 'debate';
    if (activeStep?.type === 'livestream') return 'stars';
    if (activeStep?.type === 'chapter_end') return 'sakura';
    if (currentBg === 'bg_cherry_path') return 'sakura';
    if (currentBg === 'bg_terachi_stream' || currentBg === 'bg_suiko_lake') return 'stars';
    if (currentBg === 'bg_debate_void') return 'debate';
    if (chapterId === 5 && stepIdx < 24 && currentBg === 'bg_classroom_sunset') return 'rain';
    return 'dust';
  }, [screen, activeStep, currentBg, chapterId, stepIdx]);

  const collectedBullets = useMemo(
    () =>
      saveState.unlockedBulletIds
        .map((id) => TRUTH_BULLETS[id])
        .filter((b): b is TruthBullet => Boolean(b)),
    [saveState.unlockedBulletIds]
  );

  const handleToggleMute = () => {
    const next = !muted;
    setMuted(next);
    audioEngine.setMuted(next);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#06070d] text-slate-100">
      {/* Real External Kenney Particle Canvas Layer */}
      <ParticleCanvas ref={particleRef} mood={particleMood} />

      {/* Screen 1: Upfront 100% Preloader */}
      {screen === 'preload' && (
        <PreloaderScreen
          progress={preloadProgress}
          ready={preloadReady}
          onEnter={() => {
            audioEngine.unlock();
            audioEngine.playSfx('confirm');
            setScreen('title');
          }}
        />
      )}

      {/* Screen 2: Title Screen */}
      {screen === 'title' && (
        <TitleScreen
          saveState={saveState}
          hasResumeSave={hasResumeSave}
          muted={muted}
          onToggleMute={handleToggleMute}
          onStartNewGame={() => startChapter(1, 0)}
          onResumeGame={() => startChapter(saveState.chapterId, saveState.stepIndex)}
          onSelectChapter={(id) => startChapter(id, 0)}
          onOpenAlmanac={() => setShowAlmanac(true)}
        />
      )}

      {/* Screen 3: Active Gameplay */}
      {screen === 'play' && activeStep && (
        <>
          {/* Persistent Compact Top Studio HUD */}
          <header className="fixed inset-x-0 top-0 z-30 flex h-12 items-center justify-between border-b border-white/10 bg-slate-950/80 px-3 backdrop-blur-md sm:px-5">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="shrink-0 rounded bg-rose-700 px-2 py-0.5 text-[10px] font-extrabold text-white">
                {chapter.numberLabel}
              </span>
              <span className="truncate font-serif-jp text-xs font-bold text-slate-100 sm:text-sm">
                {chapter.title}
              </span>
              <span className="hidden text-[11px] text-slate-400 md:inline">({chapter.yearLabel})</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  audioEngine.playSfx('open');
                  setShowNotebook(true);
                }}
                className="flex cursor-pointer items-center gap-1 rounded-md bg-amber-500/15 px-2.5 py-1 text-[11px] font-bold text-amber-200 ring-1 ring-amber-400/35 hover:bg-amber-500/30"
              >
                <BookMarked className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">本質手帳</span>
                <span className="font-mono text-[10px]">({collectedBullets.length})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  audioEngine.playSfx('open');
                  setShowBacklog(true);
                }}
                className="flex cursor-pointer items-center gap-1 rounded-md bg-slate-800/90 px-2.5 py-1 text-[11px] font-bold text-slate-200 ring-1 ring-white/10 hover:bg-slate-700"
              >
                <History className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">ログ</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  audioEngine.playSfx('open');
                  setShowAlmanac(true);
                }}
                className="flex cursor-pointer items-center gap-1 rounded-md bg-purple-900/50 px-2.5 py-1 text-[11px] font-bold text-purple-200 ring-1 ring-purple-400/30 hover:bg-purple-800/70"
              >
                <Library className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">年鑑</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  audioEngine.playSfx('select');
                  setShowAudio(true);
                }}
                className="flex cursor-pointer items-center gap-1 rounded-md bg-slate-800/90 px-2 py-1 text-[11px] font-bold text-slate-200 ring-1 ring-white/10 hover:bg-slate-700"
                title="音量設定"
              >
                {muted ? <VolumeX className="h-3.5 w-3.5 text-rose-400" /> : <Volume2 className="h-3.5 w-3.5 text-sky-400" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  audioEngine.playSfx('back');
                  setAutoPlay(false);
                  setScreen('title');
                }}
                className="flex cursor-pointer items-center gap-1 rounded-md bg-slate-800/90 px-2.5 py-1 text-[11px] font-bold text-slate-200 ring-1 ring-white/10 hover:bg-rose-800/80"
                title="タイトルへ戻る"
              >
                <Home className="h-3.5 w-3.5" />
                <span className="hidden md:inline">タイトル</span>
              </button>
            </div>
          </header>

          {/* Active Stage Router */}
          {(activeStep.type === 'dialogue' || activeStep.type === 'choice') && (
            <VnStage
              step={activeStep}
              currentBg={currentBg}
              currentStage={currentStage}
              autoPlay={autoPlay}
              onToggleAuto={() => setAutoPlay((a) => !a)}
              onAdvanceDialogue={handleAdvanceDialogue}
              onSkipToNextEvent={handleSkipToNextEvent}
              onChooseOption={handleChooseOption}
              recentBulletToast={recentBulletToast}
            />
          )}

          {activeStep.type === 'debate' && (
            <NonstopDebateStage
              key={activeStep.id}
              step={activeStep}
              sanity={sanity}
              onSanityChange={(delta) =>
                setSanity((s) => Math.max(0, Math.min(100, s + delta)))
              }
              onTriggerCutIn={triggerCutIn}
              onTriggerBurst={triggerBurst}
              onUnlockBullet={unlockBullet}
              onIncrementHa={() =>
                setSaveState((prev) => ({ ...prev, haCount: prev.haCount + 1 }))
              }
              onComplete={handleModeComplete}
            />
          )}

          {activeStep.type === 'livestream' && (
            <LivestreamStage
              key={activeStep.id}
              step={activeStep}
              onComplete={handleModeComplete}
            />
          )}

          {activeStep.type === 'topo_puzzle' && (
            <TopoPuzzleStage
              key={activeStep.id}
              step={activeStep}
              onUnlockBullet={unlockBullet}
              onComplete={handleModeComplete}
            />
          )}

          {activeStep.type === 'chapter_end' && (
            <ChapterResultScreen
              step={activeStep}
              sanity={sanity}
              haCount={saveState.haCount}
              onNextChapter={
                activeStep.nextChapterId
                  ? () => startChapter(activeStep.nextChapterId!, 0)
                  : undefined
              }
              onReturnTitle={() => setScreen('title')}
              onOpenAlmanac={() => setShowAlmanac(true)}
            />
          )}
        </>
      )}

      {/* Dramatic Full-Screen Cut-In Overlay (は？！！ / 待った！！ / 論破！！) */}
      <CutInOverlay data={cutIn} />

      {/* Modals */}
      {showAlmanac && (
        <AlmanacModal
          unlockedBulletIds={saveState.unlockedBulletIds}
          onClose={() => setShowAlmanac(false)}
        />
      )}
      {showNotebook && (
        <BulletNotebookModal
          bullets={collectedBullets}
          onClose={() => setShowNotebook(false)}
        />
      )}
      {showBacklog && (
        <BacklogModal entries={backlog} onClose={() => setShowBacklog(false)} />
      )}
      {showAudio && (
        <AudioSettingsModal
          bgmVol={bgmVol}
          sfxVol={sfxVol}
          muted={muted}
          onChangeBgm={(v) => {
            setBgmVol(v);
            audioEngine.setBgmVolume(v);
          }}
          onChangeSfx={(v) => {
            setSfxVol(v);
            audioEngine.setSfxVolume(v);
          }}
          onToggleMute={handleToggleMute}
          onClose={() => setShowAudio(false)}
        />
      )}
    </div>
  );
};

export default App;
