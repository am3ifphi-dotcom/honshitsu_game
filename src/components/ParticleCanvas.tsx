import React, { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import { PARTICLE_ASSETS } from '../data/assets';
import { IMAGE_CACHE } from '../engine/preloader';

export type ParticleMood = 'sakura' | 'dust' | 'stars' | 'rain' | 'debate' | 'none';
export type BurstStyle = 'objection' | 'shatter' | 'clue' | 'press';

export interface ParticleCanvasHandle {
  triggerBurst: (x: number, y: number, style: BurstStyle) => void;
}

interface AmbientParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  rot: number;
  vrot: number;
  spriteKey: keyof typeof PARTICLE_ASSETS;
  tint: string;
  phase: number;
}

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  rot: number;
  vrot: number;
  spriteKey: keyof typeof PARTICLE_ASSETS;
  tint: string;
}

interface Props {
  mood: ParticleMood;
}

export const ParticleCanvas = forwardRef<ParticleCanvasHandle, Props>(({ mood }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const moodRef = useRef<ParticleMood>(mood);
  const ambientRef = useRef<AmbientParticle[]>([]);
  const burstsRef = useRef<BurstParticle[]>([]);

  moodRef.current = mood;

  useImperativeHandle(ref, () => ({
    triggerBurst(x: number, y: number, style: BurstStyle) {
      const count = style === 'objection' ? 34 : style === 'shatter' ? 28 : 20;
      const palette: Record<BurstStyle, { sprites: Array<keyof typeof PARTICLE_ASSETS>; colors: string[] }> = {
        objection: {
          sprites: ['spark01', 'spark04', 'star08', 'flare01', 'slash01'],
          colors: ['#fbbf24', '#f43f5e', '#ffffff', '#fb7185'],
        },
        shatter: {
          sprites: ['spark05', 'star07', 'trace05', 'slash02', 'circle02'],
          colors: ['#fde047', '#38bdf8', '#f43f5e', '#ffffff'],
        },
        clue: {
          sprites: ['star08', 'light02', 'magic02', 'spark01'],
          colors: ['#38bdf8', '#fbbf24', '#a78bfa'],
        },
        press: {
          sprites: ['circle05', 'spark01', 'star04'],
          colors: ['#22d3ee', '#ffffff', '#60a5fa'],
        },
      };

      const cfg = palette[style];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = (style === 'objection' ? 5 : 3.5) + Math.random() * 11;
        burstsRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 28 + Math.random() * 58,
          life: 0,
          maxLife: 32 + Math.random() * 26,
          rot: angle,
          vrot: (Math.random() - 0.5) * 0.25,
          spriteKey: cfg.sprites[i % cfg.sprites.length],
          tint: cfg.colors[i % cfg.colors.length],
        });
      }
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnAmbient = (m: ParticleMood, w: number, h: number, randomY: boolean): AmbientParticle => {
      if (m === 'sakura') {
        return {
          x: Math.random() * (w + 200) - 100,
          y: randomY ? Math.random() * h : -40,
          vx: -0.6 - Math.random() * 0.9,
          vy: 0.7 + Math.random() * 1.1,
          size: 18 + Math.random() * 22,
          alpha: 0.35 + Math.random() * 0.45,
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * 0.03,
          spriteKey: Math.random() > 0.4 ? 'star04' : 'light02',
          tint: '#fbcfe8',
          phase: Math.random() * Math.PI * 2,
        };
      }
      if (m === 'rain') {
        return {
          x: Math.random() * (w + 300),
          y: randomY ? Math.random() * h : -80,
          vx: -2.2,
          vy: 14 + Math.random() * 6,
          size: 38 + Math.random() * 26,
          alpha: 0.25 + Math.random() * 0.3,
          rot: 0.16,
          vrot: 0,
          spriteKey: 'trace01',
          tint: '#93c5fd',
          phase: 0,
        };
      }
      if (m === 'debate') {
        return {
          x: Math.random() * w,
          y: randomY ? Math.random() * h : h + 40,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -1.4 - Math.random() * 2.2,
          size: 20 + Math.random() * 34,
          alpha: 0.3 + Math.random() * 0.5,
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * 0.04,
          spriteKey: Math.random() > 0.5 ? 'spark01' : 'star08',
          tint: Math.random() > 0.45 ? '#fb7185' : '#fbbf24',
          phase: Math.random() * Math.PI * 2,
        };
      }
      if (m === 'stars') {
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -0.15 - Math.random() * 0.25,
          size: 16 + Math.random() * 26,
          alpha: 0.22 + Math.random() * 0.42,
          rot: Math.random() * Math.PI * 2,
          vrot: 0.008,
          spriteKey: Math.random() > 0.5 ? 'star08' : 'light02',
          tint: '#bae6fd',
          phase: Math.random() * Math.PI * 2,
        };
      }
      // dust
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.25 - Math.random() * 0.45,
        size: 16 + Math.random() * 24,
        alpha: 0.18 + Math.random() * 0.28,
        rot: Math.random() * Math.PI * 2,
        vrot: 0.005,
        spriteKey: 'light02',
        tint: '#fde68a',
        phase: Math.random() * Math.PI * 2,
      };
    };

    let lastMood: ParticleMood = 'none';
    const syncMood = () => {
      const m = moodRef.current;
      if (m === lastMood) return;
      lastMood = m;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const count = m === 'none' ? 0 : m === 'rain' ? 42 : m === 'debate' ? 32 : 26;
      ambientRef.current = Array.from({ length: count }, () => spawnAmbient(m, w, h, true));
    };

    let rafId = 0;
    let tick = 0;

    const drawSprite = (
      spriteKey: keyof typeof PARTICLE_ASSETS,
      x: number,
      y: number,
      size: number,
      rot: number,
      alpha: number,
      tint: string
    ) => {
      const url = PARTICLE_ASSETS[spriteKey];
      const img = IMAGE_CACHE.get(url);
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.globalCompositeOperation = 'lighter';
      ctx.translate(x, y);
      ctx.rotate(rot);
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
      } else {
        ctx.fillStyle = tint;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.22, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const loop = () => {
      syncMood();
      tick += 0.025;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Update & draw ambient particles
      const m = moodRef.current;
      for (let i = 0; i < ambientRef.current.length; i++) {
        const p = ambientRef.current[i];
        if (m === 'sakura') {
          p.x += p.vx + Math.sin(tick + p.phase) * 0.65;
          p.y += p.vy;
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }
        p.rot += p.vrot;

        const pulseAlpha =
          m === 'stars' ? p.alpha * (0.55 + 0.45 * Math.sin(tick * 1.8 + p.phase)) : p.alpha;
        drawSprite(p.spriteKey, p.x, p.y, p.size, p.rot, pulseAlpha, p.tint);

        if (p.y > h + 90 || p.y < -100 || p.x < -140 || p.x > w + 140) {
          ambientRef.current[i] = spawnAmbient(m, w, h, false);
        }
      }

      // Update & draw burst particles
      const nextBursts: BurstParticle[] = [];
      for (const b of burstsRef.current) {
        b.life += 1;
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.94;
        b.vy *= 0.94;
        b.rot += b.vrot;
        const progress = b.life / b.maxLife;
        if (progress < 1) {
          const a = (1 - progress) * 0.95;
          const sz = b.size * (0.7 + progress * 0.65);
          drawSprite(b.spriteKey, b.x, b.y, sz, b.rot, a, b.tint);
          nextBursts.push(b);
        }
      }
      burstsRef.current = nextBursts;

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 h-full w-full"
    />
  );
});

ParticleCanvas.displayName = 'ParticleCanvas';
