import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Star, Trophy } from 'lucide-react';
import type { GameProgress } from '../types/game';
import { ANIMALS, LEVELS } from '../data/animals';
import { ACCESSORIES, BRUSH_EFFECTS } from '../data/palette';
import { soundEngine } from '../audio/soundEngine';
import { AnimalCanvas } from './AnimalCanvas';

interface StickerBookScreenProps {
  progress: GameProgress;
  completedLevels: number[];
  completedCount: number;
  onBack: () => void;
}

export const StickerBookScreen: React.FC<StickerBookScreenProps> = ({
  progress,
  completedLevels,
  completedCount,
  onBack,
}) => {
  const [bouncingId, setBouncingId] = useState<string | null>(null);

  const handleStickerTap = (animalId: string) => {
    const animal = ANIMALS.find((a) => a.id === animalId);
    const record = progress.completedAnimals[animalId];
    if (!animal || !record) {
      soundEngine.playPop();
      return;
    }
    soundEngine.playAnimalSound(animal.soundType);
    setBouncingId(animalId);
    window.setTimeout(() => setBouncingId(null), 700);
  };

  return (
    <div className="min-h-dvh w-full bg-[#FFF8E7] flex flex-col p-4 sm:p-6">
      {/* Top Bar */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between gap-3 mb-5">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="min-w-[64px] min-h-[64px] rounded-2xl bg-white border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] active:translate-y-0.5 active:shadow-[0_2px_0_#1A1A2E] flex items-center justify-center cursor-pointer"
        >
          <ArrowLeft className="w-8 h-8 text-[#1A1A2E]" strokeWidth={3} />
        </button>

        <div className="min-h-[56px] px-5 rounded-2xl bg-[#FF5CAA] border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] flex items-center gap-2 text-white">
          <span className="font-display text-2xl font-bold tabular-nums">
            {completedCount} / 35
          </span>
        </div>
      </header>

      <main className="w-full max-w-5xl mx-auto flex flex-col gap-6 pb-8">
        {/* Trophy & Rewards Shelf */}
        <section className="rounded-3xl bg-white border-4 border-[#1A1A2E] shadow-[0_6px_0_#1A1A2E] p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {LEVELS.map((lvl) => {
              const won = completedLevels.includes(lvl.id);
              return (
                <div
                  key={lvl.id}
                  className={`w-12 h-12 rounded-2xl border-[3px] border-[#1A1A2E] flex items-center justify-center ${
                    won ? 'bg-[#FFD60A]' : 'bg-[#F1F5F9] opacity-45'
                  }`}
                >
                  <Trophy className="w-6 h-6 text-[#1A1A2E]" strokeWidth={2.5} />
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {BRUSH_EFFECTS.filter((b) => b.unlockLevel <= progress.unlockedLevel).map((b) => (
              <div
                key={b.id}
                className="h-11 px-3 rounded-xl bg-[#E8F6FF] border-[3px] border-[#1A1A2E] flex items-center gap-1.5 font-display text-sm font-bold"
              >
                <Sparkles className="w-4 h-4" style={{ color: b.iconColor }} />
                <span>{b.label}</span>
              </div>
            ))}
            {ACCESSORIES.filter((a) => completedCount >= a.unlockAnimalsCount).map((a) => (
              <div
                key={a.id}
                className="w-11 h-11 rounded-xl bg-[#FFF0D6] border-[3px] border-[#1A1A2E] flex items-center justify-center text-xl"
              >
                {a.id === 'hat' ? '🎩' : a.id === 'glasses' ? '🕶️' : '👑'}
              </div>
            ))}
          </div>
        </section>

        {/* 35 Sticker Slots Grid */}
        <section className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4">
          {ANIMALS.map((animal) => {
            const record = progress.completedAnimals[animal.id];
            const isUnlocked = Boolean(record);
            const isBouncing = bouncingId === animal.id;
            const accessory = progress.selectedAccessories[animal.id] || record?.accessory || 'none';

            return (
              <motion.button
                key={animal.id}
                type="button"
                onClick={() => handleStickerTap(animal.id)}
                animate={isBouncing ? { scale: [1, 1.18, 0.94, 1.06, 1], rotate: [0, -6, 6, 0] } : undefined}
                whileTap={{ scale: 0.94 }}
                aria-label={animal.name}
                className={`min-h-[120px] rounded-3xl border-[3px] border-[#1A1A2E] p-2.5 flex flex-col items-center justify-between gap-1 cursor-pointer transition-colors ${
                  isUnlocked
                    ? 'bg-white shadow-[0_5px_0_#1A1A2E]'
                    : 'bg-[#E2E8F0]/80 shadow-[0_3px_0_#94A3B8]'
                }`}
              >
                <div className="w-20 h-20">
                  <AnimalCanvas
                    animal={animal}
                    fills={record ? record.colors : {}}
                    brushEffect={record?.brush || 'solid'}
                    accessory={accessory}
                    silhouette={!isUnlocked}
                  />
                </div>

                {isUnlocked ? (
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          record.stars >= s
                            ? 'fill-[#FFD60A] text-[#1A1A2E]'
                            : 'fill-[#E2E8F0] text-[#94A3B8]'
                        }`}
                      />
                    ))}
                  </div>
                ) : (
                  <span className="font-display text-xs font-bold tabular-nums text-[#64748B]">
                    #{animal.number}
                  </span>
                )}
              </motion.button>
            );
          })}
        </section>
      </main>
    </div>
  );
};
