import React from 'react';
import { motion } from 'framer-motion';
import { X, Volume2, Award, ArrowRight, Home, BookOpen } from 'lucide-react';
import type { BacklogEntry, ChapterEndStep, TruthBullet } from '../data/types';
import { UI_ASSETS } from '../data/assets';
import { audioEngine } from '../engine/audio';

export const BulletNotebookModal: React.FC<{
  bullets: TruthBullet[];
  onClose: () => void;
}> = ({ bullets, onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={(e) => e.stopPropagation()}
      className="flex max-h-[80vh] w-full max-w-3xl flex-col rounded-xl bg-slate-950 p-5 text-slate-100 shadow-2xl kenney-border-ornate"
    >
      <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
        <div>
          <h3 className="font-serif-jp text-lg font-extrabold text-amber-300">
            ✝ 本質手帳（所持中の言弾・証拠ログ）
          </h3>
          <p className="text-[11px] text-slate-400">論戦で矛盾に撃ち込むための切り札一覧</p>
        </div>
        <button
          type="button"
          onClick={() => {
            audioEngine.playSfx('close');
            onClose();
          }}
          className="cursor-pointer rounded-lg bg-slate-800 p-1.5 hover:bg-slate-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="custom-scroll space-y-2.5 overflow-y-auto pr-1">
        {bullets.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">まだ言弾を獲得していません。</p>
        ) : (
          bullets.map((b) => (
            <div key={b.id} className="rounded-lg border border-white/10 bg-slate-900/90 p-3.5">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-serif-jp text-base font-extrabold text-white">【{b.title}】</span>
                <span className="rounded bg-rose-900/70 px-2 py-0.5 text-[10px] font-bold text-rose-200">
                  {b.category}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">{b.description}</p>
              <p className="mt-1.5 text-[11px] italic text-amber-300">{b.sourceQuote}</p>
            </div>
          ))
        )}
      </div>
    </motion.div>
  </div>
);

export const BacklogModal: React.FC<{
  entries: BacklogEntry[];
  onClose: () => void;
}> = ({ entries, onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
  >
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={(e) => e.stopPropagation()}
      className="flex max-h-[80vh] w-full max-w-2xl flex-col rounded-xl bg-slate-950 p-5 text-slate-100 shadow-2xl kenney-border-sleek"
    >
      <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
        <h3 className="font-serif-jp text-lg font-extrabold text-sky-300">会話バックログ</h3>
        <button
          type="button"
          onClick={() => {
            audioEngine.playSfx('close');
            onClose();
          }}
          className="cursor-pointer rounded-lg bg-slate-800 p-1.5 hover:bg-slate-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="custom-scroll space-y-2.5 overflow-y-auto pr-1">
        {entries.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">履歴はまだありません。</p>
        ) : (
          entries.map((entry, idx) => (
            <div key={idx} className="rounded-lg bg-white/5 p-3">
              <div className="mb-0.5 text-xs font-extrabold" style={{ color: entry.speakerColor }}>
                {entry.speakerName}
              </div>
              <p className="font-serif-jp text-sm leading-relaxed text-slate-200">{entry.text}</p>
            </div>
          ))
        )}
      </div>
    </motion.div>
  </div>
);

export const AudioSettingsModal: React.FC<{
  bgmVol: number;
  sfxVol: number;
  muted: boolean;
  onChangeBgm: (v: number) => void;
  onChangeSfx: (v: number) => void;
  onToggleMute: () => void;
  onClose: () => void;
}> = ({ bgmVol, sfxVol, muted, onChangeBgm, onChangeSfx, onToggleMute, onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-md rounded-xl bg-slate-950 p-6 text-slate-100 shadow-2xl kenney-border-sleek"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-serif-jp text-lg font-extrabold text-amber-300">
          <Volume2 className="h-5 w-5" /> サウンド設定
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded bg-slate-800 p-1.5 hover:bg-slate-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-4 text-xs">
        <div>
          <div className="mb-1 flex justify-between font-bold">
            <span>BGM 音量（魔王魂）</span>
            <span className="font-mono">{Math.round(bgmVol * 100)}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={bgmVol}
            onChange={(e) => onChangeBgm(Number(e.target.value))}
            className="w-full accent-rose-500"
          />
        </div>
        <div>
          <div className="mb-1 flex justify-between font-bold">
            <span>効果音・ボイス音 音量（Kenney / SFX）</span>
            <span className="font-mono">{Math.round(sfxVol * 100)}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={sfxVol}
            onChange={(e) => onChangeSfx(Number(e.target.value))}
            className="w-full accent-sky-500"
          />
        </div>
        <button
          type="button"
          onClick={onToggleMute}
          className={`w-full cursor-pointer rounded-lg py-2.5 font-bold transition ${
            muted ? 'bg-rose-700 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
          }`}
        >
          {muted ? 'ミュート解除する' : '全音声をミュートする'}
        </button>
      </div>
    </motion.div>
  </div>
);

export const ChapterResultScreen: React.FC<{
  step: ChapterEndStep;
  sanity: number;
  haCount: number;
  onNextChapter?: () => void;
  onReturnTitle: () => void;
  onOpenAlmanac: () => void;
}> = ({ step, sanity, haCount, onNextChapter, onReturnTitle, onOpenAlmanac }) => {
  const rank: 'S' | 'A' | 'B' = sanity >= 80 ? 'S' : sanity >= 50 ? 'A' : 'B';

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#070811] p-4 topo-grid-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl rounded-2xl bg-slate-950/95 p-7 text-center shadow-[0_0_80px_rgba(225,29,72,0.35)] kenney-border-ornate"
      >
        <div className="mb-1 flex items-center justify-center gap-2 text-xs font-bold tracking-[0.3em] text-amber-300 uppercase">
          <Award className="h-4 w-4" /> EPISODE COMPLETE
        </div>
        <h2 className="font-serif-jp text-2xl font-extrabold text-white sm:text-3xl">
          {step.summaryTitle}
        </h2>
        <img src={UI_ASSETS.divider} alt="" className="mx-auto my-4 h-3 w-56 object-contain opacity-70" />

        <p className="font-serif-jp mb-6 text-sm italic text-rose-200 sm:text-base">
          {step.summaryQuote}
        </p>

        {/* Evaluation Stats */}
        <div className="mb-6 grid grid-cols-3 gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
          <div>
            <div className="text-[10px] font-bold text-slate-400">論戦評価ランク</div>
            <div className="font-impact-jp text-4xl text-amber-300 drop-shadow-[0_0_16px_rgba(251,191,36,0.75)]">
              {rank}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400">残存・冷笑防波堤</div>
            <div className="font-mono text-2xl font-extrabold text-sky-300">{sanity}%</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400">累計「は？」記録</div>
            <div className="font-mono text-2xl font-extrabold text-rose-400">{420 + haCount}回</div>
          </div>
        </div>

        <div className="mb-6 rounded-lg border border-purple-400/35 bg-purple-950/40 px-4 py-2.5 text-xs text-purple-200">
          {step.almanacUnlockNote}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {onNextChapter && (
            <button
              type="button"
              onClick={() => {
                audioEngine.playSfx('confirm');
                onNextChapter();
              }}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 px-7 py-3 text-sm font-extrabold text-white shadow-lg transition hover:scale-105"
            >
              <span>次の話へ進む（第{step.nextChapterId}話）</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              audioEngine.playSfx('open');
              onOpenAlmanac();
            }}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-purple-900/75 px-5 py-3 text-sm font-bold text-purple-100 ring-1 ring-purple-400/40 hover:bg-purple-800"
          >
            <BookOpen className="h-4 w-4" />
            <span>✝本質✝年鑑を見る</span>
          </button>
          <button
            type="button"
            onClick={() => {
              audioEngine.playSfx('back');
              onReturnTitle();
            }}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-800 px-5 py-3 text-sm font-bold text-slate-200 hover:bg-slate-700"
          >
            <Home className="h-4 w-4" />
            <span>タイトルへ</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
