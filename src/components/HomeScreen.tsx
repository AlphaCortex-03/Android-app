import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Download, Lock, Play, Star, Trophy, Volume2, VolumeX } from 'lucide-react';
import { getAnimalById } from '../data/animals';
import { AnimalCanvas } from './AnimalCanvas';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useFirebaseAuth } from '../context/FirebaseProvider';

interface HomeScreenProps {
  totalStars: number;
  completedCount: number;
  completedLevelsCount: number;
  soundEnabled: boolean;
  onPlay: () => void;
  onOpenStickerBook: () => void;
  onToggleSound: () => void;
  onOpenParentGate: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  totalStars,
  completedCount,
  completedLevelsCount,
  soundEnabled,
  onPlay,
  onOpenStickerBook,
  onToggleSound,
  onOpenParentGate,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { user } = useFirebaseAuth();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  const dog = getAnimalById('dog');
  const duck = getAnimalById('duck');

  const fillAnimal = (a: NonNullable<typeof dog>) => {
    const map: Record<string, string> = {};
    a.regions.forEach((r) => {
      map[r.id] = r.targetColor;
    });
    return map;
  };

  return (
    <div className="min-h-dvh w-full bg-[#FFF8E7] flex flex-col justify-between p-4 sm:p-6 overflow-hidden relative">
      {/* Decorative soft background circles */}
      <div className="pointer-events-none absolute top-16 -right-16 w-64 h-64 rounded-full bg-[#E8F6FF]" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#FFD60A]/25" />

      {/* Top Row: Stars Counter + Sound & Parent Gate */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="min-h-[56px] px-4 rounded-2xl bg-white border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] flex items-center gap-2">
            <Star className="w-7 h-7 fill-[#FFD60A] text-[#1A1A2E]" strokeWidth={2.5} />
            <span className="font-display text-2xl font-bold tabular-nums text-[#1A1A2E]">
              {totalStars}
            </span>
          </div>
          {completedLevelsCount > 0 && (
            <div className="min-h-[56px] px-4 rounded-2xl bg-white border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] flex items-center gap-2">
              <Trophy className="w-6 h-6 fill-[#FF7A00] text-[#1A1A2E]" strokeWidth={2.5} />
              <span className="font-display text-2xl font-bold tabular-nums text-[#1A1A2E]">
                {completedLevelsCount}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          {!isInstalled && isInstallable && (
            <button
              type="button"
              onClick={install}
              aria-label="Install App"
              className="min-w-[56px] min-h-[56px] px-3.5 rounded-2xl bg-[#1EA7FF] border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] active:translate-y-0.5 active:shadow-[0_2px_0_#1A1A2E] flex items-center justify-center text-white cursor-pointer"
            >
              <Download className="w-6 h-6 text-white" strokeWidth={2.8} />
            </button>
          )}
          {!isInstalled && !isInstallable && isIOS && (
            <button
              type="button"
              onClick={() => setShowIOSGuide(true)}
              aria-label="Install on iOS"
              className="min-w-[56px] min-h-[56px] px-3.5 rounded-2xl bg-[#1EA7FF] border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] flex items-center justify-center text-white cursor-pointer"
            >
              <Download className="w-6 h-6 text-white" strokeWidth={2.8} />
            </button>
          )}

          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
            className={`min-w-[64px] min-h-[64px] rounded-2xl border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] active:translate-y-0.5 active:shadow-[0_2px_0_#1A1A2E] flex items-center justify-center cursor-pointer transition-colors ${
              soundEnabled ? 'bg-[#FFD60A]' : 'bg-[#CBD5E1]'
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="w-8 h-8 text-[#1A1A2E]" strokeWidth={2.6} />
            ) : (
              <VolumeX className="w-8 h-8 text-[#1A1A2E]" strokeWidth={2.6} />
            )}
          </button>

          <button
            type="button"
            onClick={onOpenParentGate}
            aria-label="Parent Settings"
            className="relative min-w-[64px] min-h-[64px] rounded-2xl bg-white border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] active:translate-y-0.5 active:shadow-[0_2px_0_#1A1A2E] flex items-center justify-center cursor-pointer"
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Parent Account"
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full border-2 border-[#1A1A2E] object-cover"
              />
            ) : (
              <Lock className="w-7 h-7 text-[#1A1A2E]" strokeWidth={2.5} />
            )}
            {user && (
              <span
                aria-hidden="true"
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#3CD62F] border-2 border-[#1A1A2E]"
              />
            )}
          </button>
        </div>
      </header>

      {/* Center Focal Showcase */}
      <main className="relative z-10 w-full max-w-5xl mx-auto flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 py-4">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-4">
          <div className="inline-flex items-center gap-3">
            <h1 className="font-display text-5xl sm:text-7xl font-bold text-[#1A1A2E] tracking-tight drop-shadow-[0_4px_0_#FFD60A]">
              Splash Zoo
            </h1>
          </div>
          <p className="font-display text-2xl sm:text-3xl font-semibold text-[#FF7A00]">
            Tap. Paint. Pop!
          </p>

          {/* Giant Play CTA + Sticker Book */}
          <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              onClick={onPlay}
              aria-label="Play"
              className="min-w-[168px] min-h-[84px] px-8 rounded-3xl bg-[#3CD62F] border-4 border-[#1A1A2E] shadow-[0_8px_0_#1A1A2E] active:translate-y-1 active:shadow-[0_3px_0_#1A1A2E] flex items-center justify-center gap-3 cursor-pointer"
            >
              <Play className="w-11 h-11 fill-white text-[#1A1A2E]" strokeWidth={2.5} />
              <span className="font-display text-3xl font-bold text-white drop-shadow-[0_2px_0_#1A1A2E]">
                PLAY
              </span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              onClick={onOpenStickerBook}
              aria-label="Sticker Book"
              className="min-w-[84px] min-h-[84px] px-6 rounded-3xl bg-[#FF5CAA] border-4 border-[#1A1A2E] shadow-[0_8px_0_#1A1A2E] active:translate-y-1 active:shadow-[0_3px_0_#1A1A2E] flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <BookOpen className="w-9 h-9 text-white" strokeWidth={2.6} />
              <span className="font-display text-2xl font-bold tabular-nums text-white drop-shadow-[0_2px_0_#1A1A2E]">
                {completedCount}/35
              </span>
            </motion.button>
          </div>
        </div>

        {/* Hero Bouncing Characters */}
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          {dog && (
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-44 h-44 sm:w-64 sm:h-64"
            >
              <AnimalCanvas animal={dog} fills={fillAnimal(dog)} />
            </motion.div>
          )}
          {duck && (
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="w-36 h-36 sm:w-52 sm:h-52 -ml-6"
            >
              <AnimalCanvas animal={duck} fills={fillAnimal(duck)} />
            </motion.div>
          )}
        </div>
      </main>

      <div className="h-2" />

      {/* iOS Safari Install Guide */}
      {showIOSGuide && (
        <div
          onClick={() => setShowIOSGuide(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A2E]/50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl bg-[#FFF8E7] border-4 border-[#1A1A2E] p-6 shadow-[0_8px_0_#1A1A2E]"
          >
            <h3 className="font-display text-2xl font-bold text-[#1A1A2E]">Install Splash Zoo</h3>
            <p className="mt-2 text-base font-bold text-[#1A1A2E]/80">
              1. Tap the Share icon in Safari.<br />
              2. Tap Add to Home Screen.
            </p>
            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="mt-4 w-full min-h-[56px] rounded-2xl bg-[#FFD60A] border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] font-display text-xl font-bold text-[#1A1A2E] cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
