import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Lock, Star, Trophy, Unlock } from 'lucide-react';
import type { GameProgress } from '../types/game';
import { getAnimalsByLevel, LEVELS } from '../data/animals';
import { soundEngine } from '../audio/soundEngine';

interface LevelMapScreenProps {
  progress: GameProgress;
  totalStars: number;
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
  onOpenStickerBook: () => void;
  onAcknowledgeUnlock: () => void;
}

export const LevelMapScreen: React.FC<LevelMapScreenProps> = ({
  progress,
  totalStars,
  onSelectLevel,
  onBack,
  onOpenStickerBook,
  onAcknowledgeUnlock,
}) => {
  useEffect(() => {
    if (progress.justUnlockedLevel) {
      soundEngine.playLevelUnlockFanfare();
      const t = window.setTimeout(() => {
        onAcknowledgeUnlock();
      }, 2800);
      return () => window.clearTimeout(t);
    }
  }, [progress.justUnlockedLevel, onAcknowledgeUnlock]);

  return (
    <div className="min-h-dvh w-full bg-[#FFF8E7] flex flex-col p-4 sm:p-6">
      {/* Top Bar */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between gap-3 mb-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="min-w-[64px] min-h-[64px] rounded-2xl bg-white border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] active:translate-y-0.5 active:shadow-[0_2px_0_#1A1A2E] flex items-center justify-center cursor-pointer"
        >
          <ArrowLeft className="w-8 h-8 text-[#1A1A2E]" strokeWidth={3} />
        </button>

        <div className="flex items-center gap-3">
          <div className="min-h-[56px] px-4 rounded-2xl bg-white border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] flex items-center gap-2">
            <Star className="w-7 h-7 fill-[#FFD60A] text-[#1A1A2E]" strokeWidth={2.5} />
            <span className="font-display text-2xl font-bold tabular-nums text-[#1A1A2E]">
              {totalStars}
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenStickerBook}
            aria-label="Sticker Book"
            className="min-w-[64px] min-h-[64px] rounded-2xl bg-[#FF5CAA] border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] active:translate-y-0.5 active:shadow-[0_2px_0_#1A1A2E] flex items-center justify-center text-white cursor-pointer"
          >
            <BookOpen className="w-7 h-7" strokeWidth={2.8} />
          </button>
        </div>
      </header>

      {/* Winding Level Path */}
      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-4">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {LEVELS.map((level, index) => {
            const isUnlocked = level.id <= progress.unlockedLevel;
            const isJustUnlocked = progress.justUnlockedLevel === level.id;
            const animals = getAnimalsByLevel(level.id);
            const completedAnimals = animals.filter((a) => Boolean(progress.completedAnimals[a.id]));
            const isCompleted = completedAnimals.length === animals.length;
            const zigzagOffset = index % 2 === 1 ? 'sm:translate-y-3 lg:translate-y-0' : '';

            return (
              <motion.button
                key={level.id}
                type="button"
                disabled={!isUnlocked}
                onClick={() => {
                  if (isUnlocked) onSelectLevel(level.id);
                }}
                whileHover={isUnlocked ? { scale: 1.03 } : undefined}
                whileTap={isUnlocked ? { scale: 0.96 } : undefined}
                animate={
                  isJustUnlocked
                    ? { scale: [1, 1.12, 0.96, 1.05, 1], rotate: [0, -4, 4, -2, 0] }
                    : undefined
                }
                transition={{ duration: 0.8 }}
                aria-label={`Level ${level.id} ${level.title}`}
                className={`relative min-h-[132px] rounded-3xl border-4 border-[#1A1A2E] p-4 flex flex-col items-center justify-between gap-3 transition-all ${zigzagOffset} ${
                  isUnlocked
                    ? 'cursor-pointer shadow-[0_7px_0_#1A1A2E] active:translate-y-1 active:shadow-[0_3px_0_#1A1A2E]'
                    : 'cursor-not-allowed bg-[#E2E8F0] opacity-75 shadow-[0_5px_0_#94A3B8]'
                }`}
                style={isUnlocked ? { backgroundColor: level.bgHex } : undefined}
              >
                {/* Fireworks particles on newly unlocked level */}
                {isJustUnlocked && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                      <motion.span
                        key={deg}
                        initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                        animate={{
                          x: Math.cos((deg * Math.PI) / 180) * 68,
                          y: Math.sin((deg * Math.PI) / 180) * 68,
                          scale: 0,
                          opacity: 0,
                        }}
                        transition={{ duration: 0.9, repeat: 2 }}
                        className="absolute w-3.5 h-3.5 rounded-full bg-[#FFD60A] border-2 border-[#1A1A2E]"
                      />
                    ))}
                  </div>
                )}

                {/* Level Number Bubble + Trophy / Padlock */}
                <div className="w-full flex items-center justify-between">
                  <span
                    className="w-12 h-12 rounded-2xl border-[3px] border-[#1A1A2E] flex items-center justify-center font-display text-2xl font-bold text-white shadow-[0_3px_0_#1A1A2E]"
                    style={{ backgroundColor: isUnlocked ? level.accentHex : '#9AA5B1' }}
                  >
                    {level.id}
                  </span>

                  <span className="text-4xl select-none" aria-hidden="true">
                    {level.badgeIcon}
                  </span>

                  {isUnlocked ? (
                    isCompleted ? (
                      <span className="w-11 h-11 rounded-2xl bg-[#FFD60A] border-[3px] border-[#1A1A2E] flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-[#1A1A2E]" strokeWidth={2.5} />
                      </span>
                    ) : isJustUnlocked ? (
                      <motion.span
                        initial={{ rotate: -20, scale: 1.3 }}
                        animate={{ rotate: 0, scale: 1 }}
                        className="w-11 h-11 rounded-2xl bg-[#3CD62F] border-[3px] border-[#1A1A2E] flex items-center justify-center"
                      >
                        <Unlock className="w-6 h-6 text-white" strokeWidth={2.6} />
                      </motion.span>
                    ) : (
                      <span className="w-11 h-11" />
                    )
                  ) : (
                    <span className="w-11 h-11 rounded-2xl bg-[#CBD5E1] border-[3px] border-[#1A1A2E] flex items-center justify-center">
                      <Lock className="w-6 h-6 text-[#1A1A2E]" strokeWidth={2.6} />
                    </span>
                  )}
                </div>

                {/* Minimal Level Label + 5 Progress Dots */}
                <div className="w-full flex items-center justify-between gap-2 pt-1">
                  <span className="font-display text-lg font-bold text-[#1A1A2E] truncate">
                    {level.title}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {animals.map((a) => {
                      const done = Boolean(progress.completedAnimals[a.id]);
                      return (
                        <span
                          key={a.id}
                          className="w-4 h-4 rounded-full border-2 border-[#1A1A2E] transition-colors"
                          style={{
                            backgroundColor: done ? '#FFD60A' : '#FFFFFF',
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </main>
    </div>
  );
};
