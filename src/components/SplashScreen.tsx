import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { getAnimalById } from '../data/animals';
import { AnimalCanvas } from './AnimalCanvas';

interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  useEffect(() => {
    const timer = window.setTimeout(onContinue, 2600);
    return () => window.clearTimeout(timer);
  }, [onContinue]);

  const mascots = ['dog', 'cat', 'duck']
    .map((id) => getAnimalById(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <div
      onClick={onContinue}
      className="min-h-dvh w-full bg-[#FFF8E7] flex flex-col items-center justify-center p-6 cursor-pointer overflow-hidden relative"
    >
      {/* Decorative soft sky paint blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#FFD60A]/30" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#1EA7FF]/20" />

      <motion.div
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="flex flex-col items-center gap-6 z-10"
      >
        {/* Bouncing Mascot Trio */}
        <div className="flex items-end justify-center gap-2 sm:gap-5">
          {mascots.map((animal, idx) => {
            const fullColors: Record<string, string> = {};
            animal.regions.forEach((r) => {
              fullColors[r.id] = r.targetColor;
            });
            return (
              <motion.div
                key={animal.id}
                animate={{ y: [0, -14, 0] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: idx * 0.22,
                  ease: 'easeInOut',
                }}
                className={idx === 1 ? 'w-32 h-32 sm:w-40 sm:h-40' : 'w-24 h-24 sm:w-32 sm:h-32'}
              >
                <AnimalCanvas animal={animal} fills={fullColors} />
              </motion.div>
            );
          })}
        </div>

        {/* Splash Zoo Title Lockup */}
        <div className="text-center">
          <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-[#1A1A2E] drop-shadow-[0_4px_0_#FFD60A]">
            Splash Zoo
          </h1>
          <p className="mt-2 font-display text-xl sm:text-2xl font-semibold text-[#FF7A00]">
            Tap. Paint. Pop!
          </p>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          onClick={(e) => {
            e.stopPropagation();
            onContinue();
          }}
          aria-label="Play Splash Zoo"
          className="mt-2 min-w-[88px] min-h-[88px] rounded-full bg-[#3CD62F] border-4 border-[#1A1A2E] shadow-[0_6px_0_#1A1A2E] flex items-center justify-center text-white cursor-pointer"
        >
          <Play className="w-11 h-11 fill-white text-[#1A1A2E]" strokeWidth={2.5} />
        </motion.button>
      </motion.div>
    </div>
  );
};
