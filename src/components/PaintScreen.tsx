import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lightbulb, Palette, RotateCcw, Sparkles, Undo2 } from 'lucide-react';
import type {
  AccessoryDef,
  AccessoryId,
  AnimalDefinition,
  BrushEffectDef,
  BrushEffectId,
  PaintMode,
  SplashParticle,
} from '../types/game';
import { BONUS_COLORS, CORE_PALETTE } from '../data/palette';
import { soundEngine } from '../audio/soundEngine';
import { AnimalCanvas } from './AnimalCanvas';
import { ReferenceThumbnail } from './ReferenceThumbnail';

interface PaintScreenProps {
  animal: AnimalDefinition;
  mode: PaintMode;
  hasCompletedFirstPaint: boolean;
  patternHints: boolean;
  unlockedLevel: number;
  unlockedBrushes: BrushEffectDef[];
  unlockedAccessories: AccessoryDef[];
  initialAccessory: AccessoryId;
  onChangeMode: (mode: PaintMode) => void;
  onFirstPaint: () => void;
  onSelectAccessory: (accessory: AccessoryId) => void;
  onComplete: (
    stars: 1 | 2 | 3,
    fills: Record<string, string>,
    brush: BrushEffectId
  ) => void;
  onBack: () => void;
}

export const PaintScreen: React.FC<PaintScreenProps> = ({
  animal,
  mode,
  hasCompletedFirstPaint,
  patternHints,
  unlockedLevel,
  unlockedBrushes,
  unlockedAccessories,
  initialAccessory,
  onChangeMode,
  onFirstPaint,
  onSelectAccessory,
  onComplete,
  onBack,
}) => {
  const [fills, setFills] = useState<Record<string, string>>({});
  const [undoStack, setUndoStack] = useState<Array<Record<string, string>>>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [brushEffect, setBrushEffect] = useState<BrushEffectId>('solid');
  const [splashes, setSplashes] = useState<SplashParticle[]>([]);
  const [showIdleHint, setShowIdleHint] = useState(false);
  const [nudgePalette, setNudgePalette] = useState(false);
  const [matchedCount, setMatchedCount] = useState(0);
  const [everIdled, setEverIdled] = useState(false);
  const [hasPaintedOnce, setHasPaintedOnce] = useState(false);

  const completedTriggeredRef = useRef(false);
  const splashIdRef = useRef(1);
  const idleTimerRef = useRef<number | null>(null);

  const availablePalette = useMemo(() => {
    const bonus = BONUS_COLORS.filter((b) => (b.unlockLevel ?? 99) <= unlockedLevel);
    return [...CORE_PALETTE, ...bonus];
  }, [unlockedLevel]);

  // Only suggest the first region and matching color before the user's very first paint;
  // after the 1st paint (and on all subsequent images), never suggest which color or section to fill.
  const suggestionsDisabled =
    hasCompletedFirstPaint || hasPaintedOnce || Object.keys(fills).length > 0;

  const nextGuidedRegion = useMemo(() => {
    if (mode !== 'guided' || suggestionsDisabled) return null;
    return animal.regions[0] || null;
  }, [animal.regions, mode, suggestionsDisabled]);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
    }
    setShowIdleHint(false);

    if (mode === 'guided' && !suggestionsDisabled && !completedTriggeredRef.current) {
      idleTimerRef.current = window.setTimeout(() => {
        setShowIdleHint(true);
        setEverIdled(true);
      }, 5000);
    }
  }, [mode, suggestionsDisabled]);

  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, [resetIdleTimer, fills]);

  // Check completion whenever fills update
  useEffect(() => {
    if (completedTriggeredRef.current) return;
    const allPainted = animal.regions.every((r) => Boolean(fills[r.id]));
    if (allPainted && animal.regions.length > 0) {
      completedTriggeredRef.current = true;
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }

      // 1 star base + 1 star for matching >= 60% target colors + 1 star for no idle time
      const matchRatio = matchedCount / animal.regions.length;
      const colorStar = matchRatio >= 0.6 ? 1 : 0;
      const speedStar = !everIdled ? 1 : 0;
      const totalStars = Math.min(3, 1 + colorStar + speedStar) as 1 | 2 | 3;

      const t = window.setTimeout(() => {
        onComplete(totalStars, fills, brushEffect);
      }, 680);
      return () => window.clearTimeout(t);
    }
  }, [animal.regions, brushEffect, everIdled, fills, matchedCount, onComplete]);

  const handleSelectColor = (hex: string) => {
    soundEngine.unlock();
    soundEngine.playBloop();
    setSelectedColor(hex);
    setNudgePalette(false);
    resetIdleTimer();
  };

  const handleTapRegion = (regionId: string, svgPoint: { x: number; y: number }) => {
    if (completedTriggeredRef.current) return;
    soundEngine.unlock();

    // Require picking a color swatch before tapping the region
    if (!selectedColor) {
      soundEngine.playPop();
      setNudgePalette(true);
      window.setTimeout(() => setNudgePalette(false), 600);
      resetIdleTimer();
      return;
    }

    const region = animal.regions.find((r) => r.id === regionId);
    if (!region) return;

    const isExactMatch = region.targetColor.toLowerCase() === selectedColor.toLowerCase();
    const wasAlreadyFilled = Boolean(fills[regionId]);

    setHasPaintedOnce(true);
    onFirstPaint();
    setUndoStack((prev) => [...prev, fills]);
    setFills((prev) => ({
      ...prev,
      [regionId]: selectedColor,
    }));

    if (!wasAlreadyFilled && isExactMatch) {
      setMatchedCount((c) => c + 1);
    }

    soundEngine.playSplashChime();
    if (mode === 'guided' && isExactMatch) {
      soundEngine.playDingDing();
    }

    const newSplash: SplashParticle = {
      id: splashIdRef.current++,
      x: svgPoint.x,
      y: svgPoint.y,
      color: selectedColor,
      isStarMatch: mode === 'guided' && isExactMatch,
    };
    setSplashes((prev) => [...prev, newSplash]);
    window.setTimeout(() => {
      setSplashes((prev) => prev.filter((s) => s.id !== newSplash.id));
    }, 820);

    resetIdleTimer();
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    soundEngine.playPop();
    const previous = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));
    setFills(previous);
    resetIdleTimer();
  };

  const handleReset = () => {
    if (Object.keys(fills).length === 0) return;
    soundEngine.playPop();
    setUndoStack((prev) => [...prev, fills]);
    setFills({});
    setMatchedCount(0);
    setHasPaintedOnce(false);
    resetIdleTimer();
  };

  return (
    <div className="h-dvh w-full bg-[#FFF8E7] flex flex-col justify-between p-3 sm:p-5 overflow-hidden select-none">
      {/* Compact Minimal Top Bar (Back, Undo, Reset, Mode, Reference Corner Thumbnail) */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between gap-2 z-20 shrink-0">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="min-w-[64px] min-h-[64px] rounded-2xl bg-white border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] active:translate-y-0.5 active:shadow-[0_2px_0_#1A1A2E] flex items-center justify-center cursor-pointer"
          >
            <ArrowLeft className="w-8 h-8 text-[#1A1A2E]" strokeWidth={3} />
          </button>

          <button
            type="button"
            onClick={handleUndo}
            disabled={undoStack.length === 0}
            aria-label="Undo"
            className={`min-w-[64px] min-h-[64px] rounded-2xl border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] flex items-center justify-center transition-all ${
              undoStack.length === 0
                ? 'bg-[#E2E8F0] opacity-50 cursor-not-allowed'
                : 'bg-white active:translate-y-0.5 active:shadow-[0_2px_0_#1A1A2E] cursor-pointer'
            }`}
          >
            <Undo2 className="w-7 h-7 text-[#1A1A2E]" strokeWidth={2.8} />
          </button>

          <button
            type="button"
            onClick={handleReset}
            aria-label="Clear canvas"
            className="hidden sm:flex min-w-[64px] min-h-[64px] rounded-2xl bg-white border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] active:translate-y-0.5 active:shadow-[0_2px_0_#1A1A2E] items-center justify-center cursor-pointer"
          >
            <RotateCcw className="w-7 h-7 text-[#1A1A2E]" strokeWidth={2.8} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Guided / Free Paint Quick Toggle */}
          <button
            type="button"
            onClick={() => onChangeMode(mode === 'guided' ? 'free' : 'guided')}
            aria-label={mode === 'guided' ? 'Switch to Free Paint' : 'Switch to Guided Paint'}
            className={`min-w-[64px] min-h-[64px] rounded-2xl border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] active:translate-y-0.5 active:shadow-[0_2px_0_#1A1A2E] flex items-center justify-center cursor-pointer transition-colors ${
              mode === 'guided' ? 'bg-[#FFD60A]' : 'bg-[#1EA7FF] text-white'
            }`}
          >
            {mode === 'guided' ? (
              <Lightbulb className="w-7 h-7 text-[#1A1A2E]" strokeWidth={2.6} />
            ) : (
              <Palette className="w-7 h-7 text-white" strokeWidth={2.6} />
            )}
          </button>

          <ReferenceThumbnail animal={animal} />
        </div>
      </header>

      {/* Large 70% Central Canvas */}
      <main className="relative flex-1 min-h-0 w-full max-w-4xl mx-auto flex items-center justify-center py-2">
        <div className="w-full h-full max-w-[460px] max-h-[460px] sm:max-w-[540px] sm:max-h-[540px] flex items-center justify-center rounded-3xl bg-white/80 border-4 border-[#1A1A2E]/15 p-3 sm:p-5">
          <AnimalCanvas
            animal={animal}
            fills={fills}
            interactive
            guidedRegionId={nextGuidedRegion?.id || null}
            showIdleHint={showIdleHint}
            brushEffect={brushEffect}
            patternHints={patternHints}
            accessory={initialAccessory}
            splashes={splashes}
            onRegionTap={handleTapRegion}
            className="w-full h-full"
          />
        </div>
      </main>

      {/* Bottom Thumb-Zone Palette + Optional Unlocked Brush/Accessory Strip */}
      <footer className="w-full max-w-4xl mx-auto flex flex-col items-center gap-2 z-20 shrink-0 pb-1">
        {(unlockedBrushes.length > 1 || unlockedAccessories.length > 0) && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {unlockedBrushes.length > 1 &&
              unlockedBrushes.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playPop();
                    setBrushEffect(b.id);
                  }}
                  aria-label={`${b.label} brush`}
                  className={`min-h-[44px] px-3 rounded-xl border-[3px] border-[#1A1A2E] flex items-center gap-1.5 font-display text-sm font-bold cursor-pointer transition-transform ${
                    brushEffect === b.id
                      ? 'bg-[#FFD60A] scale-105 shadow-[0_3px_0_#1A1A2E]'
                      : 'bg-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4" style={{ color: b.iconColor }} />
                  <span>{b.label}</span>
                </button>
              ))}

            {unlockedAccessories.map((acc) => {
              const active = initialAccessory === acc.id;
              return (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playPop();
                    onSelectAccessory(active ? 'none' : acc.id);
                  }}
                  aria-label={`Wear ${acc.label}`}
                  className={`min-h-[44px] px-3 rounded-xl border-[3px] border-[#1A1A2E] font-display text-sm font-bold cursor-pointer transition-transform ${
                    active
                      ? 'bg-[#FF5CAA] text-white scale-105 shadow-[0_3px_0_#1A1A2E]'
                      : 'bg-white text-[#1A1A2E]'
                  }`}
                >
                  {acc.id === 'hat' ? '🎩' : acc.id === 'glasses' ? '🕶️' : '👑'}
                </button>
              );
            })}
          </div>
        )}

        {/* 12+ Color Paint Blobs */}
        <motion.div
          animate={nudgePalette ? { scale: [1, 1.05, 0.97, 1.04, 1] } : undefined}
          transition={{ duration: 0.45 }}
          className="w-full rounded-3xl bg-white border-4 border-[#1A1A2E] shadow-[0_6px_0_#1A1A2E] p-2.5 sm:p-3"
        >
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 sm:gap-2.5 justify-items-center">
            {availablePalette.map((swatch) => {
              const isSelected = selectedColor?.toLowerCase() === swatch.hex.toLowerCase();
              const isGuidedMatch =
                mode === 'guided' &&
                nextGuidedRegion &&
                nextGuidedRegion.targetColor.toLowerCase() === swatch.hex.toLowerCase();

              return (
                <motion.button
                  key={swatch.id}
                  type="button"
                  whileTap={{ scale: 0.85 }}
                  animate={
                    isGuidedMatch && !isSelected
                      ? { y: [0, -6, 0], scale: [1, 1.08, 1] }
                      : isSelected
                      ? { scale: 1.15, y: -4 }
                      : { scale: 1, y: 0 }
                  }
                  transition={
                    isGuidedMatch && !isSelected
                      ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut' }
                      : { type: 'spring', stiffness: 420, damping: 20 }
                  }
                  onClick={() => handleSelectColor(swatch.hex)}
                  aria-label={swatch.name}
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-[3px] cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? 'border-[#1A1A2E] ring-4 ring-[#FFD60A] shadow-[0_4px_0_#1A1A2E]'
                      : isGuidedMatch
                      ? 'border-[#1A1A2E] ring-4 ring-[#FFB703]/80 shadow-[0_4px_0_#1A1A2E]'
                      : 'border-[#1A1A2E] shadow-[0_3px_0_#1A1A2E]'
                  }`}
                  style={{ backgroundColor: swatch.hex }}
                >
                  {/* Gloss highlight bubble */}
                  <span className="pointer-events-none absolute top-1.5 left-2.5 w-3 h-1.5 rounded-full bg-white/50 rotate-[-25deg]" />
                  {swatch.isBonus && (
                    <Sparkles className="w-4 h-4 text-[#1A1A2E] drop-shadow-xs" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </footer>
    </div>
  );
};
