import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lightbulb, Palette, Star } from 'lucide-react';
import type { GameProgress, PaintMode } from '../types/game';
import { getAnimalsByLevel, LEVELS } from '../data/animals';
import { AnimalCanvas } from './AnimalCanvas';

interface AnimalSelectScreenProps {
  levelId: number;
  progress: GameProgress;
  onSelectAnimal: (animalId: string) => void;
  onChangeMode: (mode: PaintMode) => void;
  onBack: () => void;
}

export const AnimalSelectScreen: React.FC<AnimalSelectScreenProps> = ({
  levelId,
  progress,
  onSelectAnimal,
  onChangeMode,
  onBack,
}) => {
  const level = LEVELS.find((l) => l.id === levelId) || LEVELS[0];
  const animals = getAnimalsByLevel(levelId);
  const mode = progress.settings.mode;

  return (
    <div
      className="min-h-dvh w-full flex flex-col p-4 sm:p-6 transition-colors"
      style={{ backgroundColor: level.bgHex }}
    >
      {/* Top Bar: Back + Level Badge + Guided/Free Mode Switch */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between gap-3 mb-6">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to Levels"
          className="min-w-[64px] min-h-[64px] rounded-2xl bg-white border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] active:translate-y-0.5 active:shadow-[0_2px_0_#1A1A2E] flex items-center justify-center cursor-pointer"
        >
          <ArrowLeft className="w-8 h-8 text-[#1A1A2E]" strokeWidth={3} />
        </button>

        <div className="flex items-center gap-2.5 bg-white border-[3px] border-[#1A1A2E] rounded-2xl px-4 py-2 shadow-[0_4px_0_#1A1A2E]">
          <span className="text-2xl" aria-hidden="true">
            {level.badgeIcon}
          </span>
          <span className="font-display text-xl sm:text-2xl font-bold text-[#1A1A2E]">
            {level.title}
          </span>
        </div>

        {/* Guided vs Free Paint Toggle */}
        <div className="flex items-center bg-white border-[3px] border-[#1A1A2E] rounded-2xl p-1 shadow-[0_4px_0_#1A1A2E]">
          <button
            type="button"
            onClick={() => onChangeMode('guided')}
            aria-label="Guided Mode"
            title="Guided Mode"
            className={`min-w-[52px] min-h-[52px] rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
              mode === 'guided' ? 'bg-[#FFD60A] border-2 border-[#1A1A2E]' : 'text-[#1A1A2E]/60'
            }`}
          >
            <Lightbulb className="w-7 h-7 text-[#1A1A2E]" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => onChangeMode('free')}
            aria-label="Free Paint Mode"
            title="Free Paint Mode"
            className={`min-w-[52px] min-h-[52px] rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
              mode === 'free' ? 'bg-[#1EA7FF] border-2 border-[#1A1A2E] text-white' : 'text-[#1A1A2E]/60'
            }`}
          >
            <Palette className="w-7 h-7" strokeWidth={2.5} />
          </button>
        </div>
      </header>

      {/* 5 Large Animal Cards */}
      <main className="flex-1 w-full max-w-5xl mx-auto flex items-center justify-center">
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {animals.map((animal, idx) => {
            const record = progress.completedAnimals[animal.id];
            const fills = record ? record.colors : {};
            const accessory = progress.selectedAccessories[animal.id] || record?.accessory || 'none';

            return (
              <motion.button
                key={animal.id}
                type="button"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectAnimal(animal.id)}
                aria-label={`Paint ${animal.name}`}
                className="min-h-[210px] sm:min-h-[240px] rounded-3xl bg-white border-4 border-[#1A1A2E] shadow-[0_7px_0_#1A1A2E] active:translate-y-1 active:shadow-[0_3px_0_#1A1A2E] p-3 flex flex-col items-center justify-between gap-2 cursor-pointer"
              >
                <div className="w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
                  <AnimalCanvas
                    animal={animal}
                    fills={fills}
                    brushEffect={record?.brush || 'solid'}
                    accessory={accessory}
                  />
                </div>

                <div className="w-full flex flex-col items-center gap-1.5">
                  <span className="font-display text-xl font-bold text-[#1A1A2E]">
                    {animal.name}
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((starNum) => {
                      const earned = record ? record.stars >= starNum : false;
                      return (
                        <Star
                          key={starNum}
                          className={`w-6 h-6 ${
                            earned ? 'fill-[#FFD60A] text-[#1A1A2E]' : 'fill-[#E2E8F0] text-[#94A3B8]'
                          }`}
                          strokeWidth={2.2}
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
