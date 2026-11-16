import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Users, Sparkles, Play, Square, X } from 'lucide-react';
import {
  BGM_ASSETS,
  CHARACTERS,
  getCharacterImage,
  type BgmId,
  type CharacterId,
} from '../data/assets';
import { TRUTH_BULLETS } from '../data/bullets';
import { audioEngine } from '../engine/audio';

interface Props {
  unlockedBulletIds: string[];
  onClose: () => void;
}

const CHAR_LIST = Object.values(CHARACTERS);
const BGM_LIST = Object.entries(BGM_ASSETS) as Array<[BgmId, { src: string; title: string; mood: string }]>;

export const AlmanacModal: React.FC<Props> = ({ unlockedBulletIds, onClose }) => {
  const [tab, setTab] = useState<'characters' | 'bullets' | 'sound'>('characters');
  const [selectedCharId, setSelectedCharId] = useState<CharacterId>('mie');
  const [selectedExpr, setSelectedExpr] = useState<string>(CHARACTERS.mie.defaultExpression);
  const [playingBgm, setPlayingBgm] = useState<BgmId | null>(audioEngine.getCurrentBgmId());

  const char = CHARACTERS[selectedCharId];
  const exprKeys = Object.keys(char.expressions);

  const handleSelectChar = (id: CharacterId) => {
    audioEngine.playSfx('select');
    setSelectedCharId(id);
    setSelectedExpr(CHARACTERS[id].defaultExpression);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/82 p-3 backdrop-blur-md sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="flex h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-slate-950 text-slate-100 shadow-2xl kenney-border-ornate"
      >
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-900/90 px-5 py-3.5">
          <div>
            <h2 className="font-serif-jp text-lg font-extrabold text-amber-300 sm:text-xl">
              ✝ 倉石暁の『✝本質✝年鑑』・立ち絵＆サウンド資料館
            </h2>
            <p className="text-[11px] text-slate-400">
              全14名・77枚の事前読込済み立ち絵差分と魔王魂BGM全9曲をゼロ遅延で閲覧・再生できます
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                audioEngine.playSfx('click');
                setTab('characters');
              }}
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                tab === 'characters' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Users className="h-3.5 w-3.5" /> 立ち絵図鑑 (14名/77枚)
            </button>
            <button
              type="button"
              onClick={() => {
                audioEngine.playSfx('click');
                setTab('bullets');
              }}
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                tab === 'bullets' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" /> 言弾一覧 ({unlockedBulletIds.length}/{Object.keys(TRUTH_BULLETS).length})
            </button>
            <button
              type="button"
              onClick={() => {
                audioEngine.playSfx('click');
                setTab('sound');
              }}
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                tab === 'sound' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Music className="h-3.5 w-3.5" /> サウンドテスト
            </button>
            <button
              type="button"
              onClick={() => {
                audioEngine.playSfx('close');
                onClose();
              }}
              className="ml-2 cursor-pointer rounded-lg bg-slate-800 p-1.5 text-slate-300 hover:bg-rose-700 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden p-4">
          {tab === 'characters' && (
            <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-12">
              {/* Cast selector */}
              <div className="custom-scroll grid grid-cols-2 gap-1.5 overflow-y-auto pr-1 md:col-span-3 md:grid-cols-1">
                {CHAR_LIST.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectChar(c.id)}
                    className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition ${
                      c.id === selectedCharId
                        ? 'bg-rose-700/85 font-bold text-white ring-1 ring-amber-300'
                        : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{c.name}</div>
                      <div className="text-[10px] opacity-75">{c.affiliation}</div>
                    </div>
                    <span className="font-mono text-[10px] opacity-70">
                      {Object.keys(c.expressions).length}枚
                    </span>
                  </button>
                ))}
              </div>

              {/* Portrait Stage */}
              <div className="relative flex flex-col items-center justify-end overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 via-slate-900/80 to-black p-4 ring-1 ring-white/10 md:col-span-5">
                <img
                  src={getCharacterImage(char.id, selectedExpr)}
                  alt={char.name}
                  className="h-full max-h-[520px] w-auto object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* Bio & Expression Switcher */}
              <div className="custom-scroll flex flex-col justify-between gap-4 overflow-y-auto md:col-span-4">
                <div className="space-y-3 rounded-xl bg-slate-900/85 p-4 ring-1 ring-white/10">
                  <div>
                    <span
                      className="inline-block rounded px-2 py-0.5 text-[10px] font-bold text-white"
                      style={{ backgroundColor: char.accentColor }}
                    >
                      {char.almanacTitle}
                    </span>
                    <h3 className="font-serif-jp mt-1.5 text-2xl font-extrabold text-white">
                      {char.name}
                    </h3>
                    <div className="text-xs text-slate-400">
                      {char.reading} · {char.affiliation}
                    </div>
                  </div>
                  <p className="rounded bg-black/40 p-2.5 font-serif-jp text-xs italic text-amber-200">
                    {char.signatureQuote}
                  </p>
                  <p className="text-xs leading-relaxed text-slate-200">{char.bio}</p>
                </div>

                <div className="rounded-xl bg-slate-900/85 p-4 ring-1 ring-white/10">
                  <div className="mb-2 text-xs font-bold text-amber-300">
                    立ち絵表情差分（クリックで即座に切替）
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exprKeys.map((expr) => (
                      <button
                        key={expr}
                        type="button"
                        onClick={() => {
                          audioEngine.playSfx('click');
                          setSelectedExpr(expr);
                        }}
                        className={`cursor-pointer rounded px-2.5 py-1 text-[11px] font-bold transition ${
                          expr === selectedExpr
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {expr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'bullets' && (
            <div className="custom-scroll grid h-full grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
              {Object.values(TRUTH_BULLETS).map((b) => {
                const unlocked = unlockedBulletIds.includes(b.id);
                return (
                  <div
                    key={b.id}
                    className={`rounded-xl border p-4 ${
                      unlocked
                        ? 'border-amber-400/35 bg-slate-900/90'
                        : 'border-white/10 bg-slate-900/45 opacity-70'
                    }`}
                  >
                    <div className="mb-1 flex items-center justify-between text-[10px] font-bold">
                      <span className="rounded bg-rose-900/60 px-2 py-0.5 text-rose-200">{b.category}</span>
                      <span className={unlocked ? 'text-emerald-400' : 'text-slate-500'}>
                        {unlocked ? '獲得済' : '本編で獲得'}
                      </span>
                    </div>
                    <div className="font-serif-jp text-base font-extrabold text-white">【{b.title}】</div>
                    <div className="text-[11px] text-amber-300/90">{b.subtitle}</div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300">{b.description}</p>
                    <p className="mt-2 text-[11px] italic text-sky-300">{b.sourceQuote}</p>
                  </div>
                );
              })}
            </div>
          )}

          {tab === 'sound' && (
            <div className="custom-scroll grid h-full grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
              {BGM_LIST.map(([id, meta]) => {
                const isPlaying = playingBgm === id;
                return (
                  <div
                    key={id}
                    className={`flex items-center justify-between rounded-xl border p-4 transition ${
                      isPlaying
                        ? 'border-sky-400 bg-sky-950/50'
                        : 'border-white/10 bg-slate-900/90 hover:border-white/25'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-bold text-sky-300">{meta.mood}</div>
                      <div className="font-serif-jp text-sm font-extrabold text-white">{meta.title}</div>
                      <div className="font-mono text-[10px] text-slate-400">{id}.m4a</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (isPlaying) {
                          audioEngine.stopBgm(250);
                          setPlayingBgm(null);
                        } else {
                          audioEngine.playBgm(id, 450);
                          setPlayingBgm(id);
                        }
                      }}
                      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition ${
                        isPlaying
                          ? 'bg-rose-600 text-white'
                          : 'bg-sky-600 text-white hover:bg-sky-500'
                      }`}
                    >
                      {isPlaying ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
