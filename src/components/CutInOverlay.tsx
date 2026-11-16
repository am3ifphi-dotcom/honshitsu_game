import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import Lottie from 'lottie-react';
import { CHARACTERS, getCharacterImage, PARTICLE_ASSETS, type CharacterId } from '../data/assets';
import { LOTTIE_CACHE } from '../engine/preloader';

export interface CutInData {
  text: string;
  subtext: string;
  speaker: CharacterId;
  expression: string;
  partnerSpeaker?: CharacterId;
  partnerExpression?: string;
  variant: 'counter' | 'press' | 'breakthrough';
}

interface Props {
  data: CutInData | null;
}

export const CutInOverlay: React.FC<Props> = ({ data }) => {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const sparkleAnim = LOTTIE_CACHE.get('sparkleBurst');
  const rippleAnim = LOTTIE_CACHE.get('ripple');

  useEffect(() => {
    if (!data || !bannerRef.current) return;
    gsap.fromTo(
      bannerRef.current,
      { x: -30, scale: 1.08 },
      {
        x: 0,
        scale: 1,
        duration: 0.28,
        ease: 'back.out(2.2)',
      }
    );
  }, [data]);

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          key={`${data.text}-${data.speaker}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/55 backdrop-blur-[2px]"
        >
          {/* Radial speedlines */}
          <div className="speedlines-bg absolute inset-0 opacity-45" />

          {/* Diagonal Persona/Danganronpa Slash Band */}
          <div
            ref={bannerRef}
            className={`relative flex h-64 w-[125vw] -rotate-3 items-center justify-between overflow-hidden border-y-4 shadow-[0_0_90px_rgba(0,0,0,0.9)] sm:h-72 ${
              data.variant === 'press'
                ? 'border-sky-300 bg-gradient-to-r from-sky-950 via-blue-700 to-cyan-600'
                : 'border-amber-300 bg-gradient-to-r from-rose-950 via-rose-700 to-amber-600'
            }`}
          >
            {/* Kenney external slash & flare textures */}
            <img
              src={PARTICLE_ASSETS.slash01}
              alt=""
              className="pointer-events-none absolute -left-10 top-0 h-full w-1/2 object-cover opacity-35 mix-blend-screen"
            />
            <img
              src={PARTICLE_ASSETS.flare01}
              alt=""
              className="pointer-events-none absolute right-1/4 top-1/2 h-96 w-96 -translate-y-1/2 opacity-50 mix-blend-screen"
            />

            {/* Character Bust-Up Standing Portrait (strictly framed as dramatic cut-in!) */}
            <motion.div
              initial={{ x: -120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative ml-[14vw] flex h-full items-end gap-2"
            >
              <img
                src={getCharacterImage(data.speaker, data.expression)}
                alt={CHARACTERS[data.speaker].name}
                className="h-[520px] w-auto max-w-none translate-y-44 object-contain drop-shadow-[0_0_25px_rgba(0,0,0,0.85)]"
              />
              {data.partnerSpeaker && (
                <img
                  src={getCharacterImage(data.partnerSpeaker, data.partnerExpression)}
                  alt={CHARACTERS[data.partnerSpeaker].name}
                  className="-ml-16 h-[500px] w-auto max-w-none translate-y-44 object-contain drop-shadow-[0_0_25px_rgba(0,0,0,0.85)]"
                />
              )}
            </motion.div>

            {/* Giant Impact Typography */}
            <motion.div
              initial={{ scale: 1.75, x: 90, opacity: 0 }}
              animate={{ scale: 1, x: 0, opacity: 1 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 mr-[16vw] flex flex-col items-end text-right"
            >
              <div className="mb-1 rounded bg-black/70 px-3 py-1 text-xs font-bold tracking-[0.25em] text-amber-300 uppercase">
                {data.subtext}
              </div>
              <div
                className="font-impact-jp text-5xl tracking-wider text-white sm:text-7xl"
                style={{
                  textShadow:
                    '4px 4px 0px #000, -2px -2px 0px #000, 0 0 36px rgba(251,191,36,0.95)',
                }}
              >
                {data.text}
              </div>
            </motion.div>

            {/* External Lottie Burst Overlay */}
            {(sparkleAnim || rippleAnim) && (
              <div className="pointer-events-none absolute right-[18vw] top-1/2 h-44 w-44 -translate-y-1/2 opacity-80 mix-blend-screen">
                <Lottie
                  animationData={data.variant === 'press' ? rippleAnim ?? sparkleAnim : sparkleAnim ?? rippleAnim}
                  loop={false}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
