import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { HelpCircle, ShieldAlert, Crosshair, Eye, ChevronLeft, ChevronRight, MessageSquareWarning } from 'lucide-react';
import {
  BACKGROUNDS,
  CHARACTERS,
  getCharacterImage,
  UI_ASSETS,
} from '../data/assets';
import type { DebateStep, DialogueStep, TruthBullet } from '../data/types';
import { TRUTH_BULLETS } from '../data/bullets';
import { audioEngine } from '../engine/audio';
import type { CutInData } from './CutInOverlay';
import type { BurstStyle } from './ParticleCanvas';

interface Props {
  step: DebateStep;
  sanity: number;
  onSanityChange: (delta: number) => void;
  onTriggerCutIn: (cutIn: CutInData, durationMs?: number) => void;
  onTriggerBurst: (x: number, y: number, style: BurstStyle) => void;
  onUnlockBullet: (bullet: TruthBullet) => void;
  onIncrementHa: () => void;
  onComplete: (victoryLines: DialogueStep[]) => void;
}

export const NonstopDebateStage: React.FC<Props> = ({
  step,
  sanity,
  onSanityChange,
  onTriggerCutIn,
  onTriggerBurst,
  onUnlockBullet,
  onIncrementHa,
  onComplete,
}) => {
  const [roundIdx, setRoundIdx] = useState(0);
  const [stmtIdx, setStmtIdx] = useState(0);
  const [bulletIds, setBulletIds] = useState<string[]>(step.startingBullets);
  const [selectedBulletId, setSelectedBulletId] = useState<string>(step.startingBullets[0]);
  const [isFocused, setIsFocused] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [feedbackBanner, setFeedbackBanner] = useState<{ text: string; tone: 'error' | 'info' } | null>(null);

  // Sub-mode inside debate: 'loop' | 'press' | 'breakdown' | 'gameover'
  const [phase, setPhase] = useState<'loop' | 'press' | 'breakdown' | 'gameover'>('loop');
  const [pressStepIdx, setPressStepIdx] = useState(0);
  const [breakdownIdx, setBreakdownIdx] = useState(0);
  const [progressPct, setProgressPct] = useState(0);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const round = step.rounds[roundIdx];
  const statement = round.statements[stmtIdx % round.statements.length];

  const bullets = useMemo(
    () => bulletIds.map((id) => TRUTH_BULLETS[id]).filter(Boolean),
    [bulletIds]
  );
  const activeBullet = TRUTH_BULLETS[selectedBulletId] ?? bullets[0];

  // Switch BGM on mount
  useEffect(() => {
    audioEngine.playBgm(step.bgm, 600);
  }, [step.bgm]);

  // Reset statement loop on round change
  useEffect(() => {
    setStmtIdx(0);
    setProgressPct(0);
    setShowHint(false);
    setFeedbackBanner(null);
  }, [roundIdx]);

  // Keyboard shortcuts: 1-5 select bullets, P press, Space/Shift focus, ArrowLeft/Right step statements
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (phase !== 'loop') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (phase === 'press') handleAdvancePress();
          else if (phase === 'breakdown') handleAdvanceBreakdown();
        }
        return;
      }
      if (e.key >= '1' && e.key <= '9') {
        const i = Number(e.key) - 1;
        if (bullets[i]) {
          audioEngine.playSfx('impact_metal', { rate: 1.15, volume: 0.6 });
          setSelectedBulletId(bullets[i].id);
        }
      } else if (e.key === 'Shift' || e.key === ' ') {
        e.preventDefault();
        if (!isFocused) {
          audioEngine.playSfx('focus_enter', { volume: 0.55 });
          setIsFocused(true);
        }
      } else if (e.key.toLowerCase() === 'p') {
        handlePress();
      } else if (e.key === 'ArrowRight') {
        setStmtIdx((prev) => (prev + 1) % round.statements.length);
        setProgressPct(0);
      } else if (e.key === 'ArrowLeft') {
        setStmtIdx((prev) => (prev - 1 + round.statements.length) % round.statements.length);
        setProgressPct(0);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift' || e.key === ' ') {
        setIsFocused(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  });

  // Statement auto-cycling timer (respects Concentration Focus slowdown)
  useEffect(() => {
    if (phase !== 'loop') return;
    let last = performance.now();
    let elapsed = (progressPct / 100) * statement.durationMs;
    let raf = 0;

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const speed = isFocused ? 0.28 : 1.0;
      elapsed += dt * speed;
      const pct = Math.min(100, (elapsed / statement.durationMs) * 100);
      setProgressPct(pct);
      if (elapsed >= statement.durationMs) {
        setStmtIdx((prev) => (prev + 1) % round.statements.length);
        setProgressPct(0);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, stmtIdx, roundIdx, isFocused, statement.durationMs]);

  const shakeStage = (intensity = 12) => {
    if (!stageRef.current) return;
    gsap.fromTo(
      stageRef.current,
      { x: -intensity, y: intensity * 0.4 },
      {
        x: 0,
        y: 0,
        duration: 0.42,
        ease: 'elastic.out(1.2, 0.25)',
      }
    );
  };

  const handlePress = () => {
    if (phase !== 'loop') return;
    audioEngine.playPress();
    onTriggerCutIn(
      {
        text: '待った！！',
        subtext: 'ゆさぶる — 詳しく聞かせろ！',
        speaker: step.protagonist,
        expression: step.protagonistExpression,
        variant: 'press',
      },
      750
    );
    onTriggerBurst(window.innerWidth * 0.5, window.innerHeight * 0.45, 'press');
    setPressStepIdx(0);
    setPhase('press');
  };

  const handleAdvancePress = () => {
    audioEngine.playSfx('click');
    if (pressStepIdx === 0) {
      setPressStepIdx(1);
      if (statement.pressResponse.unlockBullet) {
        const b = statement.pressResponse.unlockBullet;
        if (!bulletIds.includes(b.id)) {
          setBulletIds((prev) => [...prev, b.id]);
          onUnlockBullet(b);
          audioEngine.playClueGet();
        }
      }
    } else {
      if (statement.pressResponse.extraHint) {
        setFeedbackBanner({ text: `ヒント：${statement.pressResponse.extraHint}`, tone: 'info' });
      }
      setPhase('loop');
    }
  };

  const handleFireWeakPoint = (weakPointId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (phase !== 'loop') return;

    const clickX = e.clientX || window.innerWidth * 0.5;
    const clickY = e.clientY || window.innerHeight * 0.45;

    const isMatch =
      weakPointId === round.solution.weakPointId &&
      selectedBulletId === round.solution.bulletId;

    if (isMatch) {
      audioEngine.playObjection();
      onIncrementHa();
      onTriggerBurst(clickX, clickY, 'objection');
      setTimeout(() => onTriggerBurst(window.innerWidth * 0.5, window.innerHeight * 0.42, 'shatter'), 140);
      shakeStage(18);
      onTriggerCutIn(
        {
          text: round.solution.cutInText,
          subtext: round.solution.cutInSubtext,
          speaker: round.solution.cutInSpeaker,
          expression: round.solution.cutInExpression,
          partnerSpeaker: round.solution.partnerSpeaker,
          partnerExpression: round.solution.partnerExpression,
          variant: 'counter',
        },
        1350
      );
      setBreakdownIdx(0);
      setFeedbackBanner(null);
      setPhase('breakdown');
    } else {
      audioEngine.playDamage();
      shakeStage(14);
      const nextSanity = sanity - 20;
      onSanityChange(-20);
      setFeedbackBanner({
        text:
          weakPointId === round.solution.weakPointId
            ? `発言はそこだ！ だが装填した言弾『${activeBullet?.title ?? ''}』が違う！ 別の言弾を選べ！`
            : round.wrongHitLine,
        tone: 'error',
      });
      if (nextSanity <= 0) {
        setPhase('gameover');
      }
    }
  };

  const handleAdvanceBreakdown = () => {
    audioEngine.playSfx('click');
    const lines = round.solution.breakdownLines;
    if (breakdownIdx + 1 < lines.length) {
      const nextLine = lines[breakdownIdx + 1];
      if (nextLine.addBullet) {
        onUnlockBullet(nextLine.addBullet);
        if (!bulletIds.includes(nextLine.addBullet.id)) {
          setBulletIds((prev) => [...prev, nextLine.addBullet!.id]);
        }
        audioEngine.playClueGet();
      }
      setBreakdownIdx(breakdownIdx + 1);
    } else {
      // Check if next round exists
      if (roundIdx + 1 < step.rounds.length) {
        audioEngine.playSfx('confirm');
        setRoundIdx(roundIdx + 1);
        setPhase('loop');
      } else {
        audioEngine.playBreakthrough();
        onComplete(step.victoryLines);
      }
    }
  };

  const handleRetryRound = () => {
    audioEngine.playSfx('confirm');
    onSanityChange(100);
    setStmtIdx(0);
    setProgressPct(0);
    setFeedbackBanner(null);
    setPhase('loop');
  };

  const activeSpeakerMeta = CHARACTERS[statement.speaker];
  const breakdownLine = phase === 'breakdown' ? round.solution.breakdownLines[breakdownIdx] : null;

  return (
    <div ref={stageRef} className="relative h-full w-full overflow-hidden select-none">
      {/* Arena Background */}
      <img
        src={BACKGROUNDS[step.bg].path}
        alt=""
        className="absolute inset-0 h-full w-full object-cover brightness-[0.68] contrast-110 transition-all duration-700"
      />
      <div
        className={`pointer-events-none absolute inset-0 transition-all duration-300 ${
          isFocused
            ? 'bg-sky-950/55 ring-8 ring-inset ring-cyan-400/50'
            : 'bg-gradient-to-b from-black/65 via-transparent to-black/85'
        }`}
      />

      {/* Top HUD Bar: Debate Title + Sanity Gauge + Round Progress */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-4 pt-14 sm:px-6">
        <div className="flex items-center gap-3 rounded-lg bg-slate-950/85 px-4 py-2 shadow-lg ring-1 ring-rose-500/45 backdrop-blur-md">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-rose-600 font-impact-jp text-lg text-white">
            ✝
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-[0.22em] text-amber-300 uppercase">
              {step.title} · {round.roundTitle}
            </div>
            <div className="text-xs font-bold text-white sm:text-sm">{round.topicBanner}</div>
          </div>
        </div>

        {/* Sanity / Defense Gauge */}
        <div className="flex items-center gap-4 rounded-lg bg-slate-950/85 px-4 py-2 ring-1 ring-sky-400/35 backdrop-blur-md">
          <div>
            <div className="mb-1 flex items-center justify-between gap-3 text-[10px] font-bold tracking-wider">
              <span className="flex items-center gap-1 text-sky-300">
                <ShieldAlert className="h-3.5 w-3.5" /> 冷笑防波堤（正気度）
              </span>
              <span className="font-mono text-white">{Math.max(0, sanity)}%</span>
            </div>
            <div className="h-2.5 w-36 overflow-hidden rounded-full bg-slate-800 sm:w-44">
              <motion.div
                className={`h-full rounded-full ${
                  sanity > 40
                    ? 'bg-gradient-to-r from-sky-500 to-emerald-400'
                    : 'bg-gradient-to-r from-rose-600 to-amber-500'
                }`}
                animate={{ width: `${Math.max(0, Math.min(100, sanity))}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              audioEngine.playSfx('select');
              setShowHint((v) => !v);
            }}
            className="flex cursor-pointer items-center gap-1.5 rounded-md border border-cyan-400/40 bg-cyan-950/60 px-3 py-1.5 text-xs font-bold text-cyan-200 transition hover:bg-cyan-800/70"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>零のヒント</span>
          </button>
        </div>
      </div>

      {/* Zero's Hint Drawer */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="relative z-30 mx-auto mt-2 flex max-w-2xl items-center gap-3 rounded-lg border border-cyan-400/50 bg-slate-950/92 px-4 py-2.5 text-xs text-cyan-100 shadow-2xl backdrop-blur"
          >
            <span className="shrink-0 rounded bg-cyan-600/30 px-2 py-0.5 font-bold text-cyan-300">
              数理 零の分析
            </span>
            <span>{round.hint}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Debate Arena */}
      {phase === 'loop' && (
        <div className="relative z-10 h-[calc(100%-290px)] w-full">
          {/* Active Speaker Standing Portrait (Framed cleanly on left side as VN debate speaker!) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${statement.id}-${statement.speaker}-${statement.expression}`}
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28 }}
              className="pointer-events-none absolute bottom-0 left-2 flex h-full items-end sm:left-8"
            >
              <img
                src={getCharacterImage(statement.speaker, statement.expression)}
                alt={activeSpeakerMeta.name}
                className="portrait-breathe h-[96%] max-h-[540px] w-auto object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.9)]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Statement Loop Navigation & Progress */}
          <div className="absolute left-1/2 top-3 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/75 px-3 py-1.5 ring-1 ring-white/15 backdrop-blur">
            <button
              type="button"
              onClick={() => {
                audioEngine.playSfx('click');
                setStmtIdx((p) => (p - 1 + round.statements.length) % round.statements.length);
                setProgressPct(0);
              }}
              className="cursor-pointer rounded-full p-1 text-slate-300 hover:bg-white/10 hover:text-white"
              title="前の発言"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {round.statements.map((st, idx) => (
                <div
                  key={st.id}
                  className={`h-2 rounded-full transition-all ${
                    idx === stmtIdx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-600'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                audioEngine.playSfx('click');
                setStmtIdx((p) => (p + 1) % round.statements.length);
                setProgressPct(0);
              }}
              className="cursor-pointer rounded-full p-1 text-slate-300 hover:bg-white/10 hover:text-white"
              title="次の発言"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="ml-2 h-1.5 w-16 overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full bg-rose-500 transition-none"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Kinetic Floating Debate Statement (Danganronpa-style angled typography!) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${round.id}-${statement.id}`}
              initial={{ opacity: 0, scale: 0.88, x: 55 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.94, x: -45 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              style={{
                top: `${Math.min(44, Math.max(15, statement.position.topPct))}%`,
                transform: `rotate(${statement.position.rotateDeg}deg)`,
              }}
              className="absolute right-4 left-[28%] z-20 max-w-2xl sm:left-[30%] sm:right-10"
            >
              {/* Speaker Tag */}
              <div className="mb-2 inline-flex items-center gap-2 rounded-sm bg-black/85 px-3 py-1 text-xs font-bold tracking-wider text-white ring-1 ring-white/25">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: activeSpeakerMeta.accentColor }}
                />
                <span>{statement.speakerTag ?? activeSpeakerMeta.name}</span>
                <span className="text-[10px] text-slate-400">
                  ({stmtIdx + 1}/{round.statements.length})
                </span>
              </div>

              {/* Statement Box with Kinetic Text & Interactive Weak Points */}
              <div className="rounded-xl bg-slate-950/88 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.85)] backdrop-blur-md kenney-border-scifi">
                <p className="font-serif-jp text-lg font-extrabold leading-relaxed tracking-wide text-white sm:text-2xl">
                  {statement.segments.map((seg, idx) => {
                    if (!seg.weakPointId) {
                      return (
                        <span key={idx} className="text-slate-100">
                          {seg.text}
                        </span>
                      );
                    }
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => handleFireWeakPoint(seg.weakPointId!, e)}
                        onMouseEnter={() => audioEngine.playSfx('hover', { rate: 1.3 })}
                        className="group relative mx-1 inline-block cursor-crosshair rounded px-1.5 py-0.5 text-amber-300 transition hover:scale-105 hover:bg-rose-600/30"
                      >
                        <span className="weak-point-text underline decoration-rose-500 decoration-wavy underline-offset-4">
                          {seg.text}
                        </span>
                        {/* Kenney external red Sci-Fi crosshair locks on hover! */}
                        <img
                          src={UI_ASSETS.crosshairRed}
                          alt=""
                          className="pointer-events-none absolute -right-4 -top-4 h-9 w-9 opacity-80 transition duration-200 group-hover:scale-125 group-hover:rotate-45 group-hover:opacity-100"
                        />
                      </button>
                    );
                  })}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-2.5 text-[11px] text-slate-300">
                  <span className="flex items-center gap-1.5 text-amber-300/95">
                    <Crosshair className="h-3.5 w-3.5" />
                    黄色の矛盾ワードをクリックで装填中の言弾を発射！
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePress}
                      className="flex cursor-pointer items-center gap-1.5 rounded bg-sky-600 px-3 py-1 text-xs font-bold text-white shadow transition hover:bg-sky-500"
                    >
                      <MessageSquareWarning className="h-3.5 w-3.5" />
                      <span>ゆさぶる (P)</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={() => {
                        audioEngine.playSfx('focus_enter', { volume: 0.55 });
                        setIsFocused(true);
                      }}
                      onMouseUp={() => setIsFocused(false)}
                      onMouseLeave={() => setIsFocused(false)}
                      onClick={() => setIsFocused((f) => !f)}
                      className={`flex cursor-pointer items-center gap-1.5 rounded px-3 py-1 text-xs font-bold transition ${
                        isFocused
                          ? 'bg-cyan-400 text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.85)]'
                          : 'bg-slate-800 text-cyan-200 ring-1 ring-cyan-400/40 hover:bg-slate-700'
                      }`}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>{isFocused ? '等高線集中 ON' : '集中スロー (Shift)'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Error / Info feedback toast */}
              <AnimatePresence>
                {feedbackBanner && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-2.5 rounded-lg px-4 py-2 text-xs font-bold shadow-lg ${
                      feedbackBanner.tone === 'error'
                        ? 'border border-rose-400/60 bg-rose-950/90 text-rose-100'
                        : 'border border-sky-400/60 bg-sky-950/90 text-sky-100'
                    }`}
                  >
                    {feedbackBanner.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* PRESS Sub-Mode Overlay (Ace Attorney "ゆさぶる") */}
      {phase === 'press' && (
        <div
          onClick={handleAdvancePress}
          className="relative z-30 flex h-[calc(100%-250px)] w-full cursor-pointer flex-col items-center justify-end px-6 pb-4"
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-around">
            <img
              src={getCharacterImage(step.protagonist, step.protagonistExpression)}
              alt=""
              className={`h-[440px] w-auto object-contain transition ${
                pressStepIdx === 0 ? 'scale-105 brightness-100' : 'brightness-60'
              }`}
            />
            <img
              src={getCharacterImage(statement.speaker, statement.pressResponse.targetExpression)}
              alt=""
              className={`h-[440px] w-auto object-contain transition ${
                pressStepIdx === 1 ? 'scale-105 brightness-100' : 'brightness-60'
              }`}
            />
          </div>

          <motion.div
            key={pressStepIdx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 w-full max-w-3xl rounded-xl bg-slate-950/95 p-5 shadow-2xl kenney-border-sleek"
          >
            <div className="mb-1.5 text-xs font-bold tracking-widest text-sky-400">
              【ゆさぶる証言チェック】クリックで続行 ▼
            </div>
            <p className="text-base font-bold leading-relaxed text-white sm:text-lg">
              {pressStepIdx === 0
                ? statement.pressResponse.protagonistLine
                : statement.pressResponse.targetReply}
            </p>
          </motion.div>
        </div>
      )}

      {/* BREAKDOWN Sub-Mode (After landing a Counter!) */}
      {phase === 'breakdown' && breakdownLine && (
        <div
          onClick={handleAdvanceBreakdown}
          className="relative z-30 flex h-[calc(100%-120px)] w-full cursor-pointer flex-col items-center justify-end px-6 pb-8"
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-28 flex items-end justify-center gap-12">
            {(breakdownLine.stage ?? []).map((slot, i) => (
              <img
                key={`${slot.charId}-${i}`}
                src={getCharacterImage(slot.charId, slot.expression)}
                alt={CHARACTERS[slot.charId].name}
                className={`h-[460px] w-auto object-contain transition duration-300 ${
                  slot.dim ? 'brightness-60 scale-95' : 'brightness-105 scale-105'
                }`}
              />
            ))}
          </div>

          <motion.div
            key={breakdownIdx}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 w-full max-w-3xl rounded-xl bg-slate-950/95 p-6 shadow-[0_0_50px_rgba(244,63,94,0.3)] kenney-border-ornate"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="rounded bg-rose-600 px-3 py-0.5 text-xs font-bold text-white">
                {breakdownLine.speakerLabel ??
                  (breakdownLine.speaker &&
                  breakdownLine.speaker !== 'narrator' &&
                  breakdownLine.speaker !== 'system' &&
                  breakdownLine.speaker !== 'crowd'
                    ? CHARACTERS[breakdownLine.speaker].name
                    : '論破ブレイクダウン')}
              </span>
              <span className="text-xs text-amber-300 animate-pulse">クリック / Enter で次へ ▼</span>
            </div>
            <p className="font-serif-jp text-base font-bold leading-relaxed text-white sm:text-xl">
              {breakdownLine.text}
            </p>
          </motion.div>
        </div>
      )}

      {/* Gameover Retry Modal */}
      {phase === 'gameover' && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="max-w-md rounded-xl bg-slate-950 p-7 text-center shadow-2xl kenney-border-ornate">
            <div className="font-impact-jp mb-2 text-3xl text-rose-500">冷笑防波堤・決壊！！</div>
            <p className="mb-5 text-sm leading-relaxed text-slate-300">
              ✝本質✝の暴走に飲み込まれてしまった……！ だが心配無用。このラウンドから正気度100%で即座にリトライできる！
            </p>
            <button
              type="button"
              onClick={handleRetryRound}
              className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-rose-600 to-amber-500 px-6 py-3 font-bold text-white shadow-lg transition hover:brightness-110"
            >
              もう一度この論戦に挑む（正気度全回復）
            </button>
          </div>
        </div>
      )}

      {/* Bottom Truth Bullet Revolver Chamber (言弾チャンバー) */}
      {phase !== 'breakdown' && (
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-rose-500/35 bg-gradient-to-t from-[#05060b] via-[#0a0c16]/95 to-slate-950/85 px-4 py-3 backdrop-blur-md sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {/* Active Bullet Summary */}
            {activeBullet && (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-white/5 px-3 py-1.5 text-xs ring-1 ring-amber-400/30">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-amber-500/20 px-2 py-0.5 font-bold text-amber-300">
                    装填中
                  </span>
                  <span className="font-bold text-white">【{activeBullet.title}】</span>
                  <span className="hidden text-slate-300 md:inline">— {activeBullet.description}</span>
                </div>
                <span className="font-mono text-[10px] text-rose-300">{activeBullet.sourceQuote}</span>
              </div>
            )}

            {/* Bullet Chamber Cards */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {bullets.map((b, i) => {
                const isSelected = b.id === selectedBulletId;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      audioEngine.playSfx('impact_metal', { rate: 1.15, volume: 0.65 });
                      setSelectedBulletId(b.id);
                    }}
                    className={`group relative flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left transition ${
                      isSelected
                        ? 'bg-gradient-to-r from-rose-700/90 to-amber-700/80 text-white shadow-[0_0_24px_rgba(244,63,94,0.45)] ring-2 ring-amber-300'
                        : 'bg-slate-900/90 text-slate-300 ring-1 ring-white/10 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-extrabold ${
                        isSelected ? 'bg-amber-300 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[10px] font-bold tracking-wider opacity-80">
                        {b.category}
                      </div>
                      <div className="truncate text-xs font-extrabold sm:text-sm">{b.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
