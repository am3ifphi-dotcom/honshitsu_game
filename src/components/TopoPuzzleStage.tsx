import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, CheckCircle2 } from 'lucide-react';
import { BACKGROUNDS, CHARACTERS, getCharacterImage, UI_ASSETS } from '../data/assets';
import type { DialogueStep, TopoHotspot, TopoPuzzleStep, TruthBullet } from '../data/types';
import { audioEngine } from '../engine/audio';

interface Props {
  step: TopoPuzzleStep;
  onUnlockBullet: (b: TruthBullet) => void;
  onComplete: (afterLines: DialogueStep[]) => void;
}

export const TopoPuzzleStage: React.FC<Props> = ({ step, onUnlockBullet, onComplete }) => {
  const [promptIdx, setPromptIdx] = useState(0);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{
    text: string;
    isCorrect: boolean;
    speaker: TopoHotspot['speaker'];
    expression: string;
  } | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    audioEngine.playBgm(step.bgm, 600);
  }, [step.bgm]);

  const currentPrompt = step.prompts[promptIdx];

  const handleClickZone = (zone: TopoHotspot) => {
    if (done) return;
    if (zone.isCorrectForStep === promptIdx) {
      audioEngine.playClueGet();
      setSolvedIds((prev) => [...prev, zone.id]);
      setFeedback({
        text: zone.correctExplanation,
        isCorrect: true,
        speaker: zone.speaker,
        expression: zone.expression,
      });

      if (promptIdx + 1 >= step.prompts.length) {
        setDone(true);
        if (step.rewardBullet) {
          onUnlockBullet(step.rewardBullet);
        }
      } else {
        setTimeout(() => {
          setPromptIdx((p) => p + 1);
        }, 1250);
      }
    } else {
      audioEngine.playSfx('error');
      setFeedback({
        text: zone.wrongFeedback,
        isCorrect: false,
        speaker: currentPrompt.speaker,
        expression: currentPrompt.expression,
      });
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0b1018] pt-14 text-slate-100">
      <img
        src={BACKGROUNDS.bg_geography_board.path}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col gap-3 px-4 pb-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-950/90 px-4 py-2.5 ring-1 ring-amber-400/35">
          <div className="flex items-center gap-2.5">
            <Compass className="h-5 w-5 text-amber-400" />
            <div>
              <div className="text-sm font-extrabold text-amber-300">{step.title}</div>
              <div className="text-xs text-slate-300">{step.subtitle}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            {step.prompts.map((_, i) => (
              <span
                key={i}
                className={`rounded-full px-2.5 py-0.5 ${
                  i < solvedIds.length
                    ? 'bg-emerald-500/25 text-emerald-300 ring-1 ring-emerald-400/50'
                    : i === promptIdx
                      ? 'bg-amber-500/25 text-amber-300 ring-1 ring-amber-400'
                      : 'bg-slate-800 text-slate-500'
                }`}
              >
                STEP {i + 1}
              </span>
            ))}
          </div>
        </div>

        {/* Main Split: Topographic Map + Speaker Guide */}
        <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Interactive Illustrated Japanese Topographic Contour Map */}
          <div className="relative overflow-hidden rounded-xl bg-[#f3ead6] shadow-2xl kenney-border-ornate lg:col-span-8">
            <svg viewBox="0 0 800 500" className="h-full w-full">
              {/* Warm GSI Cartographic Paper Texture Base */}
              <defs>
                <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.92" />
                </linearGradient>
                <pattern id="gridPat" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#b5a484" strokeWidth="0.6" opacity="0.45" />
                </pattern>
              </defs>
              <rect width="800" height="500" fill="#f3ead6" />
              <rect width="800" height="500" fill="url(#gridPat)" />

              {/* Elevated Plateau Fill (Upper Right) */}
              <path
                d="M 420 0 L 800 0 L 800 340 C 660 330, 560 290, 480 210 C 430 160, 415 85, 420 0 Z"
                fill="#e7d9b9"
                opacity="0.7"
              />
              {/* Floodplain & Rice Paddies Fill (Lower Left) */}
              <path
                d="M 0 180 C 140 210, 260 280, 350 370 C 410 430, 450 470, 490 500 L 0 500 Z"
                fill="#d8e3c5"
                opacity="0.75"
              />

              {/* Winding River (Left Edge) */}
              <path
                d="M -10 260 C 90 295, 130 365, 195 435 C 225 468, 255 485, 290 515"
                fill="none"
                stroke="url(#riverGrad)"
                strokeWidth="34"
                strokeLinecap="round"
              />
              <path
                d="M -10 260 C 90 295, 130 365, 195 435 C 225 468, 255 485, 290 515"
                fill="none"
                stroke="#e0f2fe"
                strokeWidth="3"
                strokeDasharray="10 10"
              />

              {/* Rice Paddy Cartographic Symbols (Lower Left) */}
              <g stroke="#4d7c0f" strokeWidth="1.8" opacity="0.7">
                {[
                  [120, 315],
                  [175, 345],
                  [235, 370],
                  [275, 415],
                  [195, 405],
                  [325, 445],
                ].map(([x, y], i) => (
                  <g key={i} transform={`translate(${x},${y})`}>
                    <line x1="-5" y1="-6" x2="-5" y2="6" />
                    <line x1="5" y1="-6" x2="5" y2="6" />
                  </g>
                ))}
              </g>

              {/* Dense Steep Terrace Bluff Contours (Middle Diagonal — 段丘崖!) */}
              <g fill="none" stroke="#8c5a2b">
                {[0, 10, 20, 30, 40, 52, 65].map((off, idx) => (
                  <path
                    key={idx}
                    d={`M ${340 + off} -10 C ${345 + off} 120, ${395 + off} 215, ${490 + off} 295 C ${580 + off} 365, ${680 + off} 415, 815 ${435 + off * 0.4}`}
                    strokeWidth={idx % 3 === 0 ? 2.4 : 1.2}
                    opacity={idx % 3 === 0 ? 0.9 : 0.65}
                  />
                ))}
              </g>

              {/* Gentle Upper Plateau Contours + Village Houses */}
              <g fill="none" stroke="#8c5a2b" opacity="0.5">
                <path d="M 520 -10 C 540 85, 620 165, 810 215" strokeWidth="1.3" />
                <path d="M 615 -10 C 645 65, 710 115, 810 140" strokeWidth="1.2" />
              </g>
              {/* Traditional Village Block Squares on Plateau */}
              <g fill="#57534e" opacity="0.85">
                <rect x="555" y="90" width="16" height="12" rx="1" />
                <rect x="582" y="108" width="18" height="12" rx="1" />
                <rect x="615" y="95" width="15" height="14" rx="1" />
                <rect x="565" y="132" width="20" height="12" rx="1" />
                <rect x="605" y="138" width="16" height="12" rx="1" />
                <rect x="642" y="122" width="18" height="13" rx="1" />
              </g>

              {/* Elevation Labels */}
              <g fill="#6b4226" fontSize="12" fontWeight="bold" fontFamily="monospace">
                <text x="680" y="72">140m（台地）</text>
                <text x="455" y="205">100m〜60m（急斜面）</text>
                <text x="115" y="455">25m（旧河床・水田）</text>
              </g>

              {/* Compass Rose */}
              <g transform="translate(740, 445)">
                <circle r="24" fill="#faf4e4" stroke="#78350f" strokeWidth="1.5" />
                <polygon points="0,-19 5,0 0,-4 -5,0" fill="#be123c" />
                <polygon points="0,19 5,0 0,4 -5,0" fill="#57534e" />
                <text x="-4" y="-26" fontSize="11" fontWeight="bold" fill="#78350f">
                  N
                </text>
              </g>
            </svg>

            {/* Interactive Hotspots with Kenney External Crosshairs */}
            {step.hotspots.map((zone) => {
              const isSolved = solvedIds.includes(zone.id);
              return (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => handleClickZone(zone)}
                  style={{ left: `${zone.xPct}%`, top: `${zone.yPct}%` }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                >
                  <div
                    className={`relative flex h-16 w-16 items-center justify-center rounded-full transition duration-200 ${
                      isSolved
                        ? 'bg-emerald-500/35 ring-2 ring-emerald-500'
                        : 'bg-rose-600/20 ring-2 ring-rose-600/70 hover:scale-115 hover:bg-amber-400/35'
                    }`}
                  >
                    <img
                      src={isSolved ? UI_ASSETS.crosshairBlue : UI_ASSETS.crosshairRed}
                      alt=""
                      className="h-11 w-11 opacity-90 transition group-hover:rotate-45"
                    />
                    {isSolved && (
                      <CheckCircle2 className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-slate-950 text-emerald-400" />
                    )}
                  </div>
                  <div className="mt-1 whitespace-nowrap rounded bg-slate-950/90 px-2.5 py-0.5 text-[11px] font-bold text-amber-200 shadow-lg ring-1 ring-white/20">
                    {zone.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Panel: Character Guidance & Question */}
          <div className="flex flex-col justify-between rounded-xl bg-slate-950/92 p-4 ring-1 ring-white/15 lg:col-span-4">
            <div className="relative flex flex-1 flex-col items-center justify-end overflow-hidden rounded-lg bg-gradient-to-b from-slate-900 to-slate-950 pt-4">
              <img
                src={getCharacterImage(
                  feedback ? feedback.speaker : currentPrompt.speaker,
                  feedback ? feedback.expression : currentPrompt.expression
                )}
                alt=""
                className="portrait-breathe h-64 w-auto object-contain drop-shadow-2xl"
              />
            </div>

            <div className="mt-3 space-y-3">
              <div className="rounded-lg border border-amber-400/40 bg-amber-950/35 p-3.5 text-xs leading-relaxed text-amber-100 sm:text-sm">
                <div className="mb-1 text-[11px] font-bold text-amber-300">
                  {CHARACTERS[currentPrompt.speaker].name}の問いかけ
                </div>
                <p className="font-bold">{currentPrompt.question}</p>
              </div>

              <AnimatePresence mode="wait">
                {feedback && (
                  <motion.div
                    key={feedback.text}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-lg p-3 text-xs leading-relaxed ${
                      feedback.isCorrect
                        ? 'border border-emerald-400/50 bg-emerald-950/60 text-emerald-100'
                        : 'border border-rose-400/50 bg-rose-950/60 text-rose-100'
                    }`}
                  >
                    {feedback.text}
                  </motion.div>
                )}
              </AnimatePresence>

              {done && (
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('confirm');
                    onComplete(step.afterLines);
                  }}
                  className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-amber-500 to-rose-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg transition hover:brightness-110"
                >
                  解析完了！ 言弾『時間の地形図』を手に講堂へ ▶
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
