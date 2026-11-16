import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Play, RotateCcw, Award, Info, Volume2, VolumeX } from 'lucide-react';
import {
  BACKGROUNDS,
  CHARACTERS,
  getCharacterImage,
  UI_ASSETS,
  type BackgroundId,
  type CharacterId,
} from '../data/assets';
import { CHAPTERS } from '../data/chapters';
import type { SaveState } from '../data/types';
import { audioEngine } from '../engine/audio';

interface Props {
  saveState: SaveState;
  hasResumeSave: boolean;
  muted: boolean;
  onToggleMute: () => void;
  onStartNewGame: () => void;
  onResumeGame: () => void;
  onSelectChapter: (chapterId: number) => void;
  onOpenAlmanac: () => void;
}

const SHOWCASE_CAST: Array<{ charId: CharacterId; expression: string; bg: BackgroundId }> = [
  { charId: 'mie', expression: 'ha', bg: 'bg_classroom_day' },
  { charId: 'ryoma', expression: 'niyari', bg: 'bg_cherry_path' },
  { charId: 'katsuya', expression: 'tsuujou', bg: 'bg_geography_board' },
  { charId: 'terachi', expression: 'haishin_shinken', bg: 'bg_terachi_stream' },
  { charId: 'rei', expression: 'suzushii', bg: 'bg_hawaii_volcano' },
];

export const TitleScreen: React.FC<Props> = ({
  saveState,
  hasResumeSave,
  muted,
  onToggleMute,
  onStartNewGame,
  onResumeGame,
  onSelectChapter,
  onOpenAlmanac,
}) => {
  const [showcaseIdx, setShowcaseIdx] = useState(0);
  const [showChapterSelect, setShowChapterSelect] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  useEffect(() => {
    audioEngine.playBgm('bgm_title', 900);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setShowcaseIdx((i) => (i + 1) % SHOWCASE_CAST.length);
    }, 5200);
    return () => clearInterval(t);
  }, []);

  const currentShowcase = SHOWCASE_CAST[showcaseIdx];
  const currentChar = CHARACTERS[currentShowcase.charId];

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#06070d] text-slate-100 select-none">
      {/* Cycling Fullscreen Preloaded Background */}
      <AnimatePresence mode="sync">
        <motion.img
          key={currentShowcase.bg}
          src={BACKGROUNDS[currentShowcase.bg].path}
          alt=""
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.55, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Stylized Persona-inspired Diagonal Tint & Contour Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#07070e]/95 via-[#090914]/75 to-transparent" />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill="none" stroke="#f43f5e" strokeWidth="1">
          <path d="M -40 720 Q 340 580 620 710 T 1480 620" />
          <path d="M -40 760 Q 380 610 660 750 T 1480 670" strokeDasharray="8 6" />
          <path d="M -40 800 Q 420 640 710 790 T 1480 720" stroke="#38bdf8" />
        </g>
      </svg>

      {/* Right Side: High-Res Preloaded Standing Portrait Showcase */}
      <div className="pointer-events-none absolute bottom-0 right-0 z-10 hidden h-[94%] w-[48%] items-end justify-center md:flex">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentShowcase.charId}-${currentShowcase.expression}`}
            initial={{ opacity: 0, x: 45 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative flex h-full items-end justify-center"
          >
            <img
              src={getCharacterImage(currentShowcase.charId, currentShowcase.expression)}
              alt={currentChar.name}
              className="portrait-breathe h-[95%] max-h-[780px] w-auto object-contain drop-shadow-[0_18px_45px_rgba(0,0,0,0.9)]"
            />
            <div className="absolute bottom-8 right-6 rounded-lg border border-white/15 bg-black/75 px-4 py-2 text-right backdrop-blur-md">
              <div className="text-[10px] font-bold tracking-widest text-amber-300">
                {currentChar.almanacTitle}
              </div>
              <div className="font-serif-jp text-lg font-extrabold text-white">{currentChar.name}</div>
              <div className="text-[11px] text-slate-300">{currentChar.signatureQuote}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Top Right Mute & Credits Controls */}
      <div className="absolute right-5 top-5 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            audioEngine.playSfx('select');
            setShowCredits(true);
          }}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-950/80 px-3 py-2 text-xs font-bold text-slate-200 ring-1 ring-white/15 backdrop-blur transition hover:bg-slate-800"
        >
          <Info className="h-4 w-4 text-sky-400" />
          <span>外部アセット表記</span>
        </button>
        <button
          type="button"
          onClick={() => {
            onToggleMute();
          }}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-950/80 px-3 py-2 text-xs font-bold text-slate-200 ring-1 ring-white/15 backdrop-blur transition hover:bg-slate-800"
        >
          {muted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
          <span>{muted ? 'MUTE' : 'BGM ON'}</span>
        </button>
      </div>

      {/* Left Side: Hero Logo & Main Menu */}
      <div className="relative z-20 flex h-full w-full flex-col justify-between p-6 sm:p-10 md:w-[58%] lg:p-14">
        <div className="mt-4">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-rose-950/50 px-3.5 py-1 text-[11px] font-bold tracking-[0.22em] text-rose-300">
            <span>桐葉高校・北棟理数科B組</span>
            <span>|</span>
            <span>逆転ツッコミ論戦ADV</span>
          </div>

          <h1 className="font-serif-jp text-3xl font-extrabold leading-tight tracking-wide text-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.9)] sm:text-5xl">
            偏差値60の教室から
            <br />
            <span className="font-impact-jp my-1 inline-block bg-gradient-to-r from-rose-500 via-amber-300 to-rose-400 bg-clip-text text-4xl text-transparent drop-shadow-[0_0_24px_rgba(244,63,94,0.55)] sm:text-6xl">
              ✝本質✝
            </span>
            が漏れ出している件について
          </h1>

          <img src={UI_ASSETS.divider} alt="" className="my-4 h-3 w-72 object-contain opacity-75" />

          <p className="max-w-lg text-xs leading-relaxed text-slate-300 sm:text-sm">
            一年生編から三年生・非公開配信の奇跡まで――原作『novel.txt』全三年間を完全ゲーム化。
            立ち絵会話・本質配信ライブ・地形図インサイト・ノンストップ「は？！」論戦で、桐葉高校の✝本質✝を論破せよ。
          </p>
        </div>

        {/* Action Buttons */}
        <div className="my-6 flex max-w-md flex-col gap-3">
          {hasResumeSave && (
            <button
              type="button"
              onClick={() => {
                audioEngine.playSfx('confirm');
                onResumeGame();
              }}
              onMouseEnter={() => audioEngine.playSfx('hover')}
              className="group flex cursor-pointer items-center justify-between rounded-xl bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 px-6 py-4 text-left font-bold text-white shadow-[0_0_32px_rgba(225,29,72,0.5)] transition hover:scale-[1.02] hover:brightness-110"
            >
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5" />
                <div>
                  <div className="text-base font-extrabold tracking-wider">つづきから再開</div>
                  <div className="text-[11px] text-rose-100">
                    第{saveState.chapterId}話・ステップ {saveState.stepIndex + 1} から
                  </div>
                </div>
              </div>
              <span className="font-impact-jp text-xl">▶</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              audioEngine.playSfx('confirm');
              onStartNewGame();
            }}
            onMouseEnter={() => audioEngine.playSfx('hover')}
            className={`group flex cursor-pointer items-center justify-between rounded-xl px-6 py-3.5 text-left font-bold text-white transition hover:scale-[1.02] ${
              hasResumeSave
                ? 'bg-slate-900/90 ring-1 ring-white/20 hover:bg-slate-800'
                : 'bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 shadow-[0_0_32px_rgba(225,29,72,0.5)] hover:brightness-110'
            }`}
          >
            <div className="flex items-center gap-3">
              <Play className="h-5 w-5 text-amber-300" />
              <div>
                <div className="text-base font-extrabold tracking-wider">はじめから（第1話）</div>
                <div className="text-[11px] text-slate-300">一年生編・味噌と自販機と最初の「は？」</div>
              </div>
            </div>
            <span className="font-impact-jp text-lg text-amber-300">✝</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                audioEngine.playSfx('open');
                setShowChapterSelect(true);
              }}
              onMouseEnter={() => audioEngine.playSfx('hover')}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-950/90 px-4 py-3 text-xs font-extrabold text-slate-100 ring-1 ring-sky-400/35 backdrop-blur transition hover:bg-sky-950/70 sm:text-sm"
            >
              <Award className="h-4 w-4 text-sky-400" />
              <span>全5話セレクト</span>
            </button>
            <button
              type="button"
              onClick={() => {
                audioEngine.playSfx('open');
                onOpenAlmanac();
              }}
              onMouseEnter={() => audioEngine.playSfx('hover')}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-950/90 px-4 py-3 text-xs font-extrabold text-slate-100 ring-1 ring-purple-400/35 backdrop-blur transition hover:bg-purple-950/70 sm:text-sm"
            >
              <BookOpen className="h-4 w-4 text-purple-400" />
              <span>倉石の✝本質✝年鑑</span>
            </button>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
          <span>
            クリア話数：<strong className="text-white">{saveState.completedChapters.length} / 5</strong>
          </span>
          <span>
            累計「は？」カウンター：<strong className="text-sky-300">{420 + saveState.haCount}回</strong>
          </span>
          <span>BGM：魔王魂 / UI・SFX・VFX：Kenney CC0 / Lottie</span>
        </div>
      </div>

      {/* Chapter Select Modal */}
      <AnimatePresence>
        {showChapterSelect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setShowChapterSelect(false)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl rounded-xl bg-slate-950 p-6 shadow-2xl kenney-border-ornate"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-serif-jp text-xl font-extrabold text-amber-300">
                    エピソード選択（全5話・3年間完全収録）
                  </h2>
                  <p className="text-xs text-slate-400">好きな話数からすぐにプレイ＆論戦リプレイが可能です。</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSfx('close');
                    setShowChapterSelect(false);
                  }}
                  className="cursor-pointer rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-700"
                >
                  閉じる ✕
                </button>
              </div>

              <div className="custom-scroll grid max-h-[65vh] grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
                {CHAPTERS.map((ch) => {
                  const rank = saveState.bestRankByChapter[ch.id];
                  const done = saveState.completedChapters.includes(ch.id);
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => {
                        audioEngine.playSfx('confirm');
                        setShowChapterSelect(false);
                        onSelectChapter(ch.id);
                      }}
                      className="group relative flex cursor-pointer overflow-hidden rounded-xl border border-white/15 bg-slate-900 text-left transition hover:scale-[1.01] hover:border-amber-400"
                    >
                      <img
                        src={BACKGROUNDS[ch.coverBg].path}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-30 transition group-hover:scale-105 group-hover:opacity-45"
                      />
                      <div className="relative z-10 flex flex-1 flex-col justify-between p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="rounded bg-rose-700/90 px-2 py-0.5 text-[10px] font-extrabold text-white">
                            {ch.numberLabel} · {ch.yearLabel}
                          </span>
                          {rank ? (
                            <span className="rounded bg-amber-400 px-2 py-0.5 font-mono text-xs font-black text-slate-950">
                              RANK {rank}
                            </span>
                          ) : done ? (
                            <span className="text-[10px] font-bold text-emerald-400">CLEAR</span>
                          ) : null}
                        </div>
                        <div className="mt-2 font-serif-jp text-base font-extrabold text-white group-hover:text-amber-200">
                          {ch.title}
                        </div>
                        <div className="mt-1 text-xs text-slate-300">{ch.subtitle}</div>
                      </div>
                      <div className="relative z-10 flex w-24 shrink-0 items-end justify-center overflow-hidden bg-gradient-to-t from-black/60 to-transparent pt-2">
                        <img
                          src={getCharacterImage(ch.featuredChar, ch.featuredExpression)}
                          alt=""
                          className="h-28 w-auto object-contain object-top"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* External Asset Credits Modal */}
      <AnimatePresence>
        {showCredits && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setShowCredits(false)}
          >
            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg rounded-xl bg-slate-950 p-6 text-xs leading-relaxed text-slate-200 shadow-2xl kenney-border-sleek"
            >
              <h3 className="font-serif-jp mb-3 text-lg font-extrabold text-amber-300">
                使用外部アセット＆制作クレジット
              </h3>
              <ul className="space-y-2">
                <li>
                  <strong className="text-white">キャラクター立ち絵（全14名・77差分）</strong>：Google Drive『本質images』より全差分を事前WebP最適化・メモリ展開（立ち絵および論戦カットイン専用として使用）
                </li>
                <li>
                  <strong className="text-white">BGM・ジングル（全11曲）</strong>：魔王魂（MaouDamashii）様 高品質ゲームループ音源（フリー素材ピアノ曲・日常・論戦・ボス・オルゴール）
                </li>
                <li>
                  <strong className="text-white">サウンドエフェクト（全23種）</strong>：Kenney.nl CC0 Interface / Impact / Sci-Fi / RPG / Digital Audio & OpenGameArt
                </li>
                <li>
                  <strong className="text-white">UIフレーム・照準・VFXパーティクル</strong>：Kenney.nl CC0 Fantasy UI Borders / Sci-Fi UI Pack / Particle Pack（Canvas加算合成描画）
                </li>
                <li>
                  <strong className="text-white">ベクトルアニメーション＆日本語フォント</strong>：Airbnb Lottie JSON / Shippori Mincho / Dela Gothic One / Yusei Magic / Zen Kaku Gothic New
                </li>
              </ul>
              <button
                type="button"
                onClick={() => setShowCredits(false)}
                className="mt-5 w-full cursor-pointer rounded-lg bg-slate-800 py-2 font-bold text-white hover:bg-slate-700"
              >
                閉じる
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
