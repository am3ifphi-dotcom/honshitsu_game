import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import type { PreloadProgress } from '../engine/preloader';
import { LOTTIE_CACHE } from '../engine/preloader';

interface Props {
  progress: PreloadProgress;
  ready: boolean;
  onEnter: () => void;
}

export const PreloaderScreen: React.FC<Props> = ({ progress, ready, onEnter }) => {
  const loaderAnim = LOTTIE_CACHE.get('loaderDots');

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#06070d] text-slate-100 topo-grid-bg">
      {/* Animated Topographic Contour Rings SVG */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill="none" stroke="#e11d48" strokeWidth="1.2" opacity="0.55">
          <ellipse cx="720" cy="450" rx="220" ry="120" />
          <ellipse cx="720" cy="450" rx="340" ry="190" strokeDasharray="10 8" />
          <ellipse cx="720" cy="450" rx="480" ry="270" />
          <ellipse cx="720" cy="450" rx="640" ry="370" stroke="#38bdf8" strokeDasharray="6 10" />
          <ellipse cx="720" cy="450" rx="820" ry="480" stroke="#f59e0b" opacity="0.4" />
        </g>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex w-full max-w-xl flex-col items-center px-6 text-center"
      >
        {/* Brand Emblem */}
        <div className="mb-3 flex items-center gap-3 text-xs font-bold tracking-[0.35em] text-rose-400 uppercase">
          <span className="h-px w-8 bg-rose-500/60" />
          <span>KIRIHA HIGH SCHOOL · SCIENCE CLASS B</span>
          <span className="h-px w-8 bg-rose-500/60" />
        </div>

        <h1 className="font-serif-jp mb-2 text-2xl font-extrabold tracking-wider text-white sm:text-3xl">
          偏差値60の教室から
          <span className="mx-1.5 inline-block text-rose-500 drop-shadow-[0_0_18px_rgba(244,63,94,0.8)]">
            ✝本質✝
          </span>
          が漏れ出している件について
        </h1>
        <p className="mb-8 text-xs tracking-[0.25em] text-slate-400">
          逆転✝本質✝論戦アドベンチャー · ZERO-LATENCY ASSET PRELOADER
        </p>

        {/* Progress Card */}
        <div className="w-full rounded-xl border border-rose-500/30 bg-slate-950/85 p-6 shadow-[0_0_50px_rgba(225,29,72,0.18)] backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-amber-300">{progress.phase}</span>
            <span className="font-mono font-bold text-white">
              {progress.percent}% ({progress.loaded}/{progress.total})
            </span>
          </div>

          {/* Glowing Bar */}
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-800/90 ring-1 ring-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-rose-600 via-amber-400 to-sky-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress.percent}%` }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
            <span className="truncate font-mono">{progress.detail}</span>
            <span className="ml-3 shrink-0 text-emerald-400/90">全立ち絵77枚・背景10枚・UI/VFX・音源一括展開</span>
          </div>

          {!ready && (
            <div className="mt-4 flex h-10 items-center justify-center">
              {loaderAnim ? (
                <Lottie animationData={loaderAnim} loop className="h-10 w-24 opacity-90" />
              ) : (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
              )}
            </div>
          )}

          {ready && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="mt-6 flex flex-col items-center gap-2"
            >
              <button
                type="button"
                onClick={onEnter}
                className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-lg bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 px-8 py-3.5 text-base font-bold tracking-[0.2em] text-white shadow-[0_0_30px_rgba(225,29,72,0.55)] transition hover:scale-[1.02] hover:brightness-110 active:scale-[0.99]"
              >
                <span className="font-impact-jp text-lg">✝</span>
                <span>北棟・理数科B組へ入る（音声ONで開始）</span>
                <span className="font-impact-jp text-lg">✝</span>
              </button>
              <p className="text-[11px] text-slate-400">
                ※全アセットのメモリ展開が完了しました。表示時の読み込み遅延なくお楽しみいただけます。
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
