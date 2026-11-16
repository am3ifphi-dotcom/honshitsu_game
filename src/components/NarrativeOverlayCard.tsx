import React from 'react';
import { motion } from 'framer-motion';
import type { NarrativeOverlay } from '../data/types';
import { UI_ASSETS } from '../data/assets';

interface Props {
  overlay: NarrativeOverlay;
}

export const NarrativeOverlayCard: React.FC<Props> = ({ overlay }) => {
  if (overlay.kind === 'bbs') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-xl overflow-hidden rounded-lg border-2 border-slate-500/70 bg-[#efefef]/95 text-slate-900 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur"
      >
        <div className="flex items-center justify-between bg-slate-800 px-4 py-2 text-xs text-slate-100">
          <span className="font-bold text-amber-300">■ {overlay.boardName}</span>
          <span className="font-mono text-[10px] text-slate-400">ANONYMOUS BBS LOG</span>
        </div>
        <div className="border-b border-slate-300 bg-slate-200/80 px-4 py-1.5 text-sm font-bold text-rose-800">
          {overlay.threadTitle}
        </div>
        <div className="max-h-56 space-y-2.5 overflow-y-auto p-4 text-xs leading-relaxed sm:text-sm">
          {overlay.posts.map((p, idx) => (
            <div
              key={idx}
              className={`rounded border p-2.5 ${
                p.highlight
                  ? 'border-rose-400 bg-rose-50/95 shadow-sm'
                  : 'border-slate-300 bg-white/90'
              }`}
            >
              <div className="mb-1 flex items-center gap-2 text-[11px] text-slate-600">
                <span className="font-mono font-bold text-slate-800">{p.num}</span>
                <span className="font-bold text-emerald-700">{p.author}</span>
              </div>
              <p className="whitespace-pre-wrap font-medium text-slate-900">{p.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (overlay.kind === 'paper') {
    return (
      <motion.div
        initial={{ opacity: 0, rotate: -3, scale: 0.92 }}
        animate={{ opacity: 1, rotate: -1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.32 }}
        className="relative w-full max-w-lg rounded-sm border border-stone-300 bg-[#faf7f0] p-6 text-stone-900 shadow-[0_20px_55px_rgba(0,0,0,0.8)]"
      >
        <div className="mb-3 flex items-center justify-between border-b-2 border-stone-800 pb-1.5 text-xs font-bold tracking-wider text-stone-600">
          <span>A4 コピー用紙（太マジック）</span>
          <span className="text-rose-700">{overlay.header}</span>
        </div>
        <div className="font-marker-jp space-y-2 py-2 text-center text-lg leading-relaxed text-stone-950 sm:text-2xl">
          {overlay.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        {overlay.footer && (
          <div className="mt-3 border-t border-dashed border-stone-400 pt-2 text-center text-xs font-medium text-stone-600">
            {overlay.footer}
          </div>
        )}
      </motion.div>
    );
  }

  if (overlay.kind === 'almanac') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="w-full max-w-xl rounded-lg bg-slate-950/95 p-5 text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.85)] kenney-border-ornate"
      >
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-serif-jp text-base font-bold text-amber-300 sm:text-lg">
            ✝ {overlay.title}
          </h3>
          <span className="rounded bg-purple-900/70 px-2 py-0.5 text-[10px] font-bold text-purple-200">
            統計補正済
          </span>
        </div>
        <img src={UI_ASSETS.divider} alt="" className="mb-3 h-2.5 w-full object-contain opacity-65" />
        <div className="space-y-2 text-xs sm:text-sm">
          {overlay.rows.map((r, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center justify-between gap-2 rounded bg-slate-900/90 px-3 py-2 ring-1 ring-white/10"
            >
              <span className="font-bold text-white">{r.label}</span>
              <div className="text-right">
                <span className="font-mono font-bold text-rose-400">{r.value}</span>
                {r.note && <span className="ml-2 text-[11px] text-slate-400">({r.note})</span>}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // LINE chat
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-md overflow-hidden rounded-2xl border border-emerald-400/30 bg-[#7494c0]/95 shadow-2xl"
    >
      <div className="bg-slate-900/90 px-4 py-2 text-xs font-bold text-white">
        {overlay.groupName}
      </div>
      <div className="space-y-2 p-3 text-xs">
        {overlay.messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.isSelf ? 'items-end' : 'items-start'}`}>
            <span className="mb-0.5 text-[10px] text-slate-900/80">{m.sender}</span>
            <div
              className={`max-w-[85%] rounded-xl px-3 py-1.5 font-medium shadow-sm ${
                m.isSelf ? 'bg-[#8de055] text-slate-900' : 'bg-white text-slate-900'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
