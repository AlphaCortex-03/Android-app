import React, { useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, RotateCcw, Sparkles, Star, Trophy, Unlock } from 'lucide-react';
import type { AccessoryId, AnimalDefinition, BrushEffectId } from '../types/game';
import { soundEngine } from '../audio/soundEngine';
import { AnimalCanvas } from './AnimalCanvas';

interface CelebrationScreenProps {
  animal: AnimalDefinition;
  fills: Record<string, string>;
  brush: BrushEffectId;
  accessory: AccessoryId;
  earnedStars: 1 | 2 | 3;
  totalStars: number;
  newlyUnlockedLevel: number | null;
  levelJustCompleted: boolean;
  onNext: () => void;
  onReplay: () => void;
}

const CONFETTI_COLORS = ['#FFD60A', '#FF7A00', '#FF2E4C', '#FF5CAA', '#8E3BFF', '#1EA7FF', '#00D9C0', '#3CD62F'];

export const CelebrationScreen: React.FC<CelebrationScreenProps> = ({
  animal,
  fills,
  brush,
  accessory,
  earnedStars,
  totalStars,
  newlyUnlockedLevel,
  levelJustCompleted,
  onNext,
  onReplay,
}) => {
  useEffect(() => {
    soundEngine.playCelebrationJingle(animal.soundType);
    const t = window.setTimeout(() => {
      soundEngine.playStarTwinkle();
    }, 350);
    return () => window.clearTimeout(t);
  }, [animal.soundType]);

  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: (i % 7) * 0.14,
        duration: 2.2 + (i % 4) * 0.45,
        rotate: (i % 2 === 0 ? 1 : -1) * (120 + (i % 5) * 45),
      })),
    []
  );

  return (
    <div className="min-h-dvh w-full bg-[#FFF8E7] flex flex-col items-center justify-between p-5 sm:p-8 overflow-hidden relative">
      {/* Confetti Shower */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {confettiPieces.map((c) => (
          <motion.div
            key={c.id}
            initial={{ y: -30, opacity: 1, rotate: 0 }}
            animate={{ y: '105vh', opacity: [1, 1, 0.4], rotate: c.rotate }}
            transition={{
              duration: c.duration,
              delay: c.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute w-4 h-4 rounded-sm border-2 border-[#1A1A2E]"
            style={{ left: c.left, backgroundColor: c.color }}
          />
        ))}
      </div>

      {/* Top Star Counter */}
      <header className="relative z-10 w-full max-w-4xl flex items-center justify-end">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="min-h-[60px] px-5 rounded-2xl bg-white border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] flex items-center gap-2.5"
        >
          <Star className="w-8 h-8 fill-[#FFD60A] text-[#1A1A2E]" strokeWidth={2.5} />
          <span className="font-display text-3xl font-bold tabular-nums text-[#1A1A2E]">
            {totalStars}
          </span>
        </motion.div>
      </header>

      {/* Dancing Animal Centerpiece */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center gap-5 w-full max-w-xl">
        {/* 1-3 Big Animated Stars */}
        <div className="flex items-center justify-center gap-4">
          {[1, 2, 3].map((num) => {
            const active = num <= earnedStars;
            return (
              <motion.div
                key={num}
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: active ? 1 : 0.85, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 16,
                  delay: 0.15 * num,
                }}
              >
                <Star
                  className={`w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_4px_0_#1A1A2E] ${
                    active ? 'fill-[#FFD60A] text-[#1A1A2E]' : 'fill-[#E2E8F0] text-[#94A3B8]'
                  }`}
                  strokeWidth={2.5}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Dancing Finished Animal (tappable to replay animal sound!) */}
        <motion.button
          type="button"
          onClick={() => soundEngine.playAnimalSound(animal.soundType)}
          whileTap={{ scale: 0.94 }}
          aria-label={`${animal.name} dancing`}
          className="w-60 h-60 sm:w-72 sm:h-72 cursor-pointer"
        >
          <AnimalCanvas
            animal={animal}
            fills={fills}
            brushEffect={brush}
            accessory={accessory}
            dancing
          />
        </motion.button>

        {/* Visual Reward Badges (Level Trophy / Unlock) */}
        {(levelJustCompleted || newlyUnlockedLevel) && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.45, type: 'spring' }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {levelJustCompleted && (
              <div className="px-4 py-2.5 rounded-2xl bg-[#FFD60A] border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] flex items-center gap-2">
                <Trophy className="w-7 h-7 text-[#1A1A2E]" strokeWidth={2.5} />
                <Sparkles className="w-6 h-6 text-[#FF2E4C]" strokeWidth={2.5} />
              </div>
            )}
            {newlyUnlockedLevel && (
              <div className="px-4 py-2.5 rounded-2xl bg-[#3CD62F] border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] flex items-center gap-2 text-white">
                <Unlock className="w-7 h-7" strokeWidth={2.6} />
                <span className="font-display text-2xl font-bold">
                  {newlyUnlockedLevel}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* Bottom Action Row: Replay + Giant Next Arrow */}
      <footer className="relative z-10 w-full max-w-md flex items-center justify-center gap-5 pb-2">
        <button
          type="button"
          onClick={onReplay}
          aria-label="Paint again"
          className="min-w-[72px] min-h-[72px] rounded-3xl bg-white border-4 border-[#1A1A2E] shadow-[0_6px_0_#1A1A2E] active:translate-y-1 active:shadow-[0_2px_0_#1A1A2E] flex items-center justify-center cursor-pointer"
        >
          <RotateCcw className="w-8 h-8 text-[#1A1A2E]" strokeWidth={2.8} />
        </button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          onClick={onNext}
          aria-label="Next"
          className="min-w-[148px] min-h-[80px] px-10 rounded-3xl bg-[#3CD62F] border-4 border-[#1A1A2E] shadow-[0_7px_0_#1A1A2E] active:translate-y-1 active:shadow-[0_3px_0_#1A1A2E] flex items-center justify-center cursor-pointer"
        >
          <ArrowRight className="w-12 h-12 text-white" strokeWidth={3.5} />
        </motion.button>
      </footer>
    </div>
  );
};
