import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Radio, Users, Send, Sparkles } from 'lucide-react';
import { BACKGROUNDS, getCharacterImage } from '../data/assets';
import type { DialogueStep, LivestreamStep } from '../data/types';
import { audioEngine } from '../engine/audio';

interface Props {
  step: LivestreamStep;
  onComplete: (afterLines: DialogueStep[]) => void;
}

export const LivestreamStage: React.FC<Props> = ({ step, onComplete }) => {
  const [itemIdx, setItemIdx] = useState(0);
  const [revealedChars, setRevealedChars] = useState(0);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);
  const [chatLog, setChatLog] = useState<Array<{ user: string; text: string; toxic?: boolean }>>([]);
  const [freezeCounter, setFreezeCounter] = useState(0);

  const item = step.items[itemIdx];
  const chosen = selectedChoiceIdx !== null ? item.choices[selectedChoiceIdx] : null;

  useEffect(() => {
    audioEngine.playBgm(step.bgm, 650);
  }, [step.bgm]);

  // Animate A4 paper calligraphy reveal + live chat incoming
  useEffect(() => {
    setRevealedChars(0);
    setSelectedChoiceIdx(null);
    setFreezeCounter(item.terachiFreezeSec);
    setChatLog([]);
    audioEngine.playSfx('paper_flip');

    const fullText = item.paperText;
    let charTimer: ReturnType<typeof setInterval> | null = null;
    charTimer = setInterval(() => {
      setRevealedChars((c) => {
        if (c >= fullText.length) {
          if (charTimer) clearInterval(charTimer);
          return c;
        }
        return c + 1;
      });
    }, 32);

    const chatTimers = item.liveComments.map((msg, i) =>
      setTimeout(() => {
        audioEngine.playSfx('notify', { volume: 0.35, rate: 1.15 });
        setChatLog((prev) => [...prev, msg]);
      }, 450 + i * 650)
    );

    const freezeTimer = setInterval(() => {
      setFreezeCounter((f) => (f > 0 ? f - 1 : 0));
    }, 750);

    return () => {
      if (charTimer) clearInterval(charTimer);
      chatTimers.forEach(clearTimeout);
      clearInterval(freezeTimer);
    };
  }, [itemIdx, item]);

  const handleChoose = (idx: number) => {
    if (selectedChoiceIdx !== null) return;
    const choice = item.choices[idx];
    audioEngine.playSfx(choice.isBest ? 'confirm' : 'select');
    setSelectedChoiceIdx(idx);
    choice.chatReaction.forEach((msg, i) => {
      setTimeout(() => {
        audioEngine.playSfx('notify', { volume: 0.3, rate: 1.25 });
        setChatLog((prev) => [...prev, msg]);
      }, 300 + i * 420);
    });
  };

  const handleNext = () => {
    audioEngine.playSfx('click');
    if (itemIdx + 1 < step.items.length) {
      setItemIdx(itemIdx + 1);
    } else {
      onComplete(step.afterLines);
    }
  };

  const terachiExpr = chosen
    ? chosen.terachiExpression
    : freezeCounter > 0
      ? 'konwaku_katamaru'
      : 'haishin_shinken';

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0a0c12] pt-14 text-slate-100">
      <img
        src={BACKGROUNDS.bg_terachi_stream.path}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35 blur-[2px]"
      />
      <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-30" />

      {/* Main Broadcast Grid */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-6xl grid-cols-1 gap-4 px-4 pb-4 lg:grid-cols-12">
        {/* Left: Video Feed + A4 Marker Paper + Choices */}
        <div className="flex flex-col gap-3 lg:col-span-8">
          {/* Broadcast Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-slate-950/90 px-4 py-2.5">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 rounded bg-rose-600 px-2.5 py-0.5 text-xs font-extrabold tracking-wider text-white animate-pulse">
                <Radio className="h-3.5 w-3.5" /> LIVE
              </span>
              <div>
                <div className="text-sm font-extrabold text-white">{step.episodeTitle}</div>
                <div className="text-[11px] text-slate-400">
                  {step.channelName} · {step.subscriberLabel}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-slate-800/90 px-3 py-1 text-xs font-bold text-rose-300">
              <Users className="h-3.5 w-3.5" />
              <span>{step.viewerCountLabel}</span>
            </div>
          </div>

          {/* Camera Feed Box */}
          <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-slate-700/80 bg-slate-950/80 p-5 shadow-2xl">
            <img
              src={BACKGROUNDS.bg_terachi_stream.path}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/70" />

            {/* Terachi Standing Portrait in Webcam Corner */}
            <div className="pointer-events-none absolute bottom-0 left-2 z-10 flex h-full items-end sm:left-4">
              <img
                src={getCharacterImage('terachi', terachiExpr)}
                alt="寺地星"
                className="portrait-breathe h-[92%] max-h-[370px] w-auto object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]"
              />
            </div>

            {/* A4 Copy Paper with Marker Handwriting */}
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -1 }}
              className="relative z-20 ml-24 w-full max-w-md rounded-sm border border-stone-300 bg-[#fbf8f1] p-6 text-stone-900 shadow-[0_18px_45px_rgba(0,0,0,0.85)] sm:ml-40"
            >
              <div className="mb-2 flex items-center justify-between border-b border-stone-300 pb-1 text-[11px] font-bold text-stone-500">
                <span>LINEオープンチャット「✝本質✝募集所」より</span>
                <span className="text-rose-700">{item.senderTag}</span>
              </div>
              <p className="font-marker-jp min-h-[76px] py-2 text-center text-xl leading-relaxed text-stone-950 sm:text-2xl">
                {item.paperText.slice(0, revealedChars)}
                {revealedChars < item.paperText.length && (
                  <span className="inline-block h-5 w-1.5 animate-pulse bg-stone-900 align-middle" />
                )}
              </p>
              {freezeCounter > 0 && !chosen && (
                <div className="mt-2 inline-flex items-center gap-1.5 rounded bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900">
                  寺地フリーズ中… 残り {freezeCounter}秒
                </div>
              )}
            </motion.div>

            {/* Terachi's Spoken Reply Overlay once chosen */}
            <AnimatePresence>
              {chosen && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-20 mt-4 ml-20 w-full max-w-lg rounded-lg border border-indigo-400/50 bg-slate-950/92 p-4 text-sm leading-relaxed text-white shadow-xl sm:ml-36"
                >
                  <div className="mb-1 flex items-center justify-between text-xs font-bold text-indigo-300">
                    <span>寺地 星（配信マイク）</span>
                    {chosen.isBest && (
                      <span className="flex items-center gap-1 text-amber-300">
                        <Sparkles className="h-3.5 w-3.5" /> 神回コメント！
                      </span>
                    )}
                  </div>
                  <p>{chosen.terachiReply}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive Reaction Controls */}
          <div className="rounded-xl bg-slate-950/92 p-4 ring-1 ring-white/15">
            {!chosen ? (
              <div>
                <div className="mb-2.5 text-xs font-bold text-amber-300">
                  ▶ {item.prompt}（投稿 {itemIdx + 1}/{step.items.length}）
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {item.choices.map((ch, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleChoose(idx)}
                      className="cursor-pointer rounded-lg border border-indigo-400/35 bg-slate-900/90 px-4 py-3 text-left text-xs font-bold text-white transition hover:border-amber-400 hover:bg-indigo-950/80 sm:text-sm"
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">
                  コメント欄が盛り上がっている！ 次の投稿へ進もう。
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="cursor-pointer rounded-lg bg-gradient-to-r from-indigo-600 to-rose-600 px-6 py-2.5 text-sm font-extrabold text-white shadow-lg transition hover:brightness-110"
                >
                  {itemIdx + 1 < step.items.length ? '次の紙をめくる ▶' : '配信を終了して本編へ ▶'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Live YouTube-Style Chat */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-white/15 bg-slate-950/92 lg:col-span-4">
          <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-4 py-2.5 text-xs font-bold text-slate-200">
            <span>トップチャット</span>
            <span className="font-mono text-[10px] text-emerald-400">CONNECTED</span>
          </div>
          <div className="custom-scroll flex-1 space-y-2 overflow-y-auto p-3">
            {chatLog.map((c, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                className={`rounded-md px-3 py-2 text-xs ${
                  c.toxic
                    ? 'border border-rose-500/40 bg-rose-950/50 text-rose-200'
                    : 'bg-white/5 text-slate-100'
                }`}
              >
                <span className="mr-2 font-bold text-sky-300">{c.user}</span>
                <span>{c.text}</span>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-white/10 bg-slate-900/75 px-3 py-2 text-xs text-slate-500">
            <Send className="h-3.5 w-3.5" />
            <span>チャットは配信進行と連動しています…</span>
          </div>
        </div>
      </div>
    </div>
  );
};
