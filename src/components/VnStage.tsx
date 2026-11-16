import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import Lottie from 'lottie-react';
import { FastForward, Play, Pause } from 'lucide-react';
import {
  BACKGROUNDS,
  CHARACTERS,
  getCharacterImage,
  UI_ASSETS,
  type BackgroundId,
  type CharacterId,
} from '../data/assets';
import type { ChoiceOption, ChoiceStep, DialogueStep, StageSlot, TruthBullet } from '../data/types';
import { audioEngine } from '../engine/audio';
import { LOTTIE_CACHE } from '../engine/preloader';
import { NarrativeOverlayCard } from './NarrativeOverlayCard';

interface Props {
  step: DialogueStep | ChoiceStep;
  currentBg: BackgroundId;
  currentStage: StageSlot[];
  autoPlay: boolean;
  onToggleAuto: () => void;
  onAdvanceDialogue: () => void;
  onSkipToNextEvent: () => void;
  onChooseOption: (option: ChoiceOption) => void;
  recentBulletToast: TruthBullet | null;
}

export const VnStage: React.FC<Props> = ({
  step,
  currentBg,
  currentStage,
  autoPlay,
  onToggleAuto,
  onAdvanceDialogue,
  onSkipToNextEvent,
  onChooseOption,
  recentBulletToast,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [typedLen, setTypedLen] = useState(0);
  const [flashColor, setFlashColor] = useState<string | null>(null);

  const isDialogue = step.type === 'dialogue';
  const fullText = isDialogue ? step.text : step.prompt;
  const isFinishedTyping = typedLen >= fullText.length;

  const sparkleAnim = LOTTIE_CACHE.get('sparkleBurst');

  // Determine speaker metadata
  const speakerId: CharacterId | null =
    step.speaker &&
    step.speaker !== 'narrator' &&
    step.speaker !== 'system' &&
    step.speaker !== 'crowd'
      ? step.speaker
      : null;
  const speakerMeta = speakerId ? CHARACTERS[speakerId] : null;
  const speakerDisplayName =
    (isDialogue && step.speakerLabel) ||
    (speakerMeta ? speakerMeta.name : step.speaker === 'crowd' ? '教室の面々' : null);

  // Typewriter effect + SFX/Flash/Shake on step change
  useEffect(() => {
    setTypedLen(0);

    if (isDialogue) {
      if (step.sfx) {
        audioEngine.playSfx(step.sfx);
      }
      if (step.flash) {
        const map = { white: 'bg-white/75', crimson: 'bg-rose-600/55', gold: 'bg-amber-400/50' };
        setFlashColor(map[step.flash]);
        const t = setTimeout(() => setFlashColor(null), 240);
        return () => clearTimeout(t);
      }
      if (step.shake && containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { x: -10, y: 4 },
          { x: 0, y: 0, duration: 0.36, ease: 'elastic.out(1.2, 0.3)' }
        );
      }
    }
  }, [step]);

  useEffect(() => {
    if (typedLen >= fullText.length) return;
    const rate = speakerMeta?.blipRate ?? 0.92;
    const timer = setTimeout(() => {
      setTypedLen((n) => {
        const next = Math.min(fullText.length, n + 1);
        const ch = fullText[next - 1];
        if (ch && !/[\s、。「」『』…—]/.test(ch)) {
          audioEngine.playBlip(rate);
        }
        return next;
      });
    }, 24);
    return () => clearTimeout(timer);
  }, [typedLen, fullText, speakerMeta]);

  // Auto-advance timer when autoPlay enabled
  useEffect(() => {
    if (!autoPlay || !isDialogue || !isFinishedTyping) return;
    const delay = Math.max(1700, Math.min(4200, fullText.length * 48));
    const t = setTimeout(() => {
      onAdvanceDialogue();
    }, delay);
    return () => clearTimeout(t);
  }, [autoPlay, isDialogue, isFinishedTyping, fullText, onAdvanceDialogue]);

  // Keyboard Space/Enter advance
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isDialogue) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleStageClick();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const handleStageClick = () => {
    if (!isDialogue) return;
    if (!isFinishedTyping) {
      setTypedLen(fullText.length);
      return;
    }
    audioEngine.playSfx('click', { volume: 0.45 });
    onAdvanceDialogue();
  };

  const posClasses: Record<StageSlot['position'], string> = {
    left: 'left-[4%] sm:left-[10%]',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-[4%] sm:right-[10%]',
  };

  return (
    <div
      ref={containerRef}
      onClick={handleStageClick}
      className={`relative h-full w-full overflow-hidden select-none ${
        isDialogue ? 'cursor-pointer' : ''
      }`}
    >
      {/* Preloaded Background with Smooth Crossfade */}
      <AnimatePresence mode="sync">
        <motion.img
          key={currentBg}
          src={BACKGROUNDS[currentBg].path}
          alt={BACKGROUNDS[currentBg].label}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Atmospheric vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05060b]/90 via-transparent to-[#05060b]/45" />

      {/* Location Badge top-left under HUD */}
      <div className="pointer-events-none absolute left-4 top-14 z-10 rounded-full bg-black/55 px-3.5 py-1 text-[11px] font-bold tracking-widest text-slate-200 ring-1 ring-white/15 backdrop-blur-sm">
        📍 {BACKGROUNDS[currentBg].label}
      </div>

      {/* Standing Character Portraits Layer (STRICTLY anchored as classic VN standing portraits!) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[86%] w-full">
        <AnimatePresence>
          {currentStage.map((slot) => {
            const isSpeaking = speakerId === slot.charId;
            const dimmed = slot.dim ?? (speakerId !== null && !isSpeaking);
            const imgSrc = getCharacterImage(slot.charId, slot.expression);
            return (
              <motion.div
                key={`${slot.charId}-${slot.position}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: isSpeaking ? 1.03 : 0.98,
                  filter: dimmed ? 'brightness(0.62) saturate(0.85)' : 'brightness(1.03) saturate(1.04)',
                }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
                className={`absolute bottom-0 flex h-full items-end ${posClasses[slot.position]} ${
                  isSpeaking ? 'z-20' : 'z-10'
                }`}
              >
                <img
                  src={imgSrc}
                  alt={CHARACTERS[slot.charId].name}
                  className={`portrait-breathe h-[92%] max-h-[690px] w-auto object-contain drop-shadow-[0_14px_30px_rgba(0,0,0,0.8)] ${
                    slot.flip ? '-scale-x-100' : ''
                  }`}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* In-World Narrative Overlays (BBS / A4 Marker Paper / Kuraishi Almanac / LINE) */}
      <AnimatePresence>
        {isDialogue && step.overlay && (
          <div className="pointer-events-none absolute inset-x-0 top-16 z-30 flex justify-center px-4">
            <div className="pointer-events-auto">
              <NarrativeOverlayCard overlay={step.overlay} />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Truth Bullet Acquired Celebration Toast */}
      <AnimatePresence>
        {recentBulletToast && (
          <motion.div
            key={recentBulletToast.id}
            initial={{ opacity: 0, x: 80, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60 }}
            className="pointer-events-none fixed right-5 top-16 z-40 flex max-w-sm items-center gap-3 overflow-hidden rounded-xl border border-amber-300/70 bg-gradient-to-r from-slate-950/95 via-rose-950/95 to-amber-950/95 px-4 py-3 shadow-[0_0_40px_rgba(251,191,36,0.45)] backdrop-blur-md"
          >
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-400/20 ring-1 ring-amber-300">
              <span className="font-impact-jp text-xl text-amber-300">✝</span>
              {sparkleAnim && (
                <div className="pointer-events-none absolute -inset-3 opacity-85 mix-blend-screen">
                  <Lottie animationData={sparkleAnim} loop={false} />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-extrabold tracking-[0.2em] text-amber-300 uppercase">
                言弾（コトダマ）獲得！
              </div>
              <div className="truncate text-sm font-extrabold text-white">
                【{recentBulletToast.title}】
              </div>
              <div className="truncate text-[11px] text-rose-200">{recentBulletToast.subtitle}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Choice Buttons */}
      {step.type === 'choice' && (
        <div className="absolute inset-x-0 bottom-52 z-30 flex flex-col items-center gap-3 px-4">
          {step.options.map((opt, idx) => (
            <motion.button
              key={idx}
              type="button"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                audioEngine.playSfx('confirm');
                onChooseOption(opt);
              }}
              onMouseEnter={() => audioEngine.playSfx('hover')}
              className="group w-full max-w-xl cursor-pointer rounded-xl bg-slate-950/92 px-6 py-4 text-left shadow-[0_14px_40px_rgba(0,0,0,0.85)] backdrop-blur-md transition hover:scale-[1.02] hover:bg-rose-950/90 kenney-border-sleek"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-serif-jp text-base font-extrabold text-white group-hover:text-amber-200 sm:text-lg">
                    {opt.label}
                  </div>
                  {opt.sublabel && (
                    <div className="mt-0.5 text-xs text-slate-400 group-hover:text-rose-200">
                      {opt.sublabel}
                    </div>
                  )}
                </div>
                <span className="font-impact-jp text-lg text-rose-500 transition group-hover:translate-x-1 group-hover:text-amber-300">
                  ▶
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Bottom Dialogue Window (Kenney External Frame + Tie Affiliation Badge) */}
      <div className="absolute inset-x-0 bottom-3 z-30 mx-auto w-full max-w-5xl px-3 sm:px-6">
        {/* Speaker Name Plate */}
        <div className="mb-[-6px] flex items-end justify-between px-3">
          {speakerDisplayName ? (
            <motion.div
              key={speakerDisplayName}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2.5 rounded-t-lg border-x border-t border-white/25 bg-slate-950/95 px-5 py-1.5 shadow-lg"
            >
              <span
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: speakerMeta?.accentColor ?? '#e11d48' }}
              />
              <span className="font-serif-jp text-base font-extrabold tracking-wider text-white sm:text-lg">
                {speakerDisplayName}
              </span>
              {speakerMeta && (
                <span className="hidden rounded bg-white/10 px-2 py-0.5 text-[10px] font-bold text-slate-300 sm:inline">
                  {speakerMeta.affiliation}
                </span>
              )}
            </motion.div>
          ) : (
            <div />
          )}

          {/* Quick VN controls */}
          {isDialogue && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="mb-1.5 flex items-center gap-1.5"
            >
              <button
                type="button"
                onClick={() => {
                  audioEngine.playSfx('select');
                  onToggleAuto();
                }}
                className={`flex cursor-pointer items-center gap-1 rounded px-2.5 py-1 text-[11px] font-bold backdrop-blur transition ${
                  autoPlay
                    ? 'bg-rose-600 text-white shadow'
                    : 'bg-black/65 text-slate-300 ring-1 ring-white/15 hover:bg-black/85'
                }`}
              >
                {autoPlay ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                <span>AUTO</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  audioEngine.playSfx('click');
                  onAdvanceDialogue();
                }}
                className="flex cursor-pointer items-center gap-1 rounded bg-black/65 px-2.5 py-1 text-[11px] font-bold text-slate-300 ring-1 ring-white/15 backdrop-blur transition hover:bg-black/85 hover:text-white"
              >
                <FastForward className="h-3 w-3" />
                <span>NEXT</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  audioEngine.playSfx('select');
                  onSkipToNextEvent();
                }}
                title="次の選択肢・配信・地形図・論戦イベントまで早送り"
                className="flex cursor-pointer items-center gap-1 rounded bg-amber-950/75 px-2.5 py-1 text-[11px] font-bold text-amber-200 ring-1 ring-amber-400/35 backdrop-blur transition hover:bg-amber-800/80 hover:text-white"
              >
                <span>次の場面へ ▶▶</span>
              </button>
            </div>
          )}
        </div>

        {/* Main Dialogue Box */}
        <div className="relative min-h-[132px] rounded-xl bg-slate-950/92 px-6 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.9)] backdrop-blur-md kenney-border-sleek sm:min-h-[146px] sm:px-8 sm:py-5">
          <img
            src={UI_ASSETS.divider}
            alt=""
            className="pointer-events-none absolute right-5 top-2 h-2 w-24 opacity-35"
          />

          <p
            className={`font-serif-jp text-[15px] leading-[1.85] tracking-wide sm:text-lg ${
              speakerDisplayName ? 'font-medium text-white' : 'italic text-slate-200'
            }`}
          >
            {fullText.slice(0, typedLen)}
          </p>

          {isDialogue && isFinishedTyping && (
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.1 }}
              className="absolute bottom-3 right-5 flex items-center gap-1.5 text-xs font-bold text-rose-400"
            >
              <span className="font-impact-jp text-sm">✝</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Screen Flash Effect */}
      <AnimatePresence>
        {flashColor && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className={`pointer-events-none fixed inset-0 z-50 ${flashColor}`}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
