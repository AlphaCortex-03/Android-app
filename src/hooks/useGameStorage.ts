import { useCallback, useEffect, useState } from 'react';
import type { AccessoryId, BrushEffectId, GameProgress, GameSettings } from '../types/game';
import { getAnimalsByLevel, LEVELS } from '../data/animals';
import { ACCESSORIES, BRUSH_EFFECTS } from '../data/palette';
import { soundEngine } from '../audio/soundEngine';

const STORAGE_KEY = 'splash-zoo-save-v1';

const DEFAULT_PROGRESS: GameProgress = {
  unlockedLevel: 1,
  justUnlockedLevel: null,
  hasCompletedFirstPaint: false,
  completedAnimals: {},
  selectedAccessories: {},
  settings: {
    sfxEnabled: true,
    musicEnabled: true,
    patternHints: false,
    mode: 'guided',
  },
};

function loadInitialProgress(): GameProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<GameProgress>;
    const completedAnimals = parsed.completedAnimals || {};
    return {
      unlockedLevel: typeof parsed.unlockedLevel === 'number' ? Math.max(1, Math.min(LEVELS.length, parsed.unlockedLevel)) : 1,
      justUnlockedLevel: null,
      hasCompletedFirstPaint: Boolean(
        parsed.hasCompletedFirstPaint || Object.keys(completedAnimals).length > 0
      ),
      completedAnimals,
      selectedAccessories: parsed.selectedAccessories || {},
      settings: {
        ...DEFAULT_PROGRESS.settings,
        ...(parsed.settings || {}),
      },
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function useGameStorage() {
  const [progress, setProgress] = useState<GameProgress>(loadInitialProgress);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore quota errors cleanly
    }
  }, [progress]);

  useEffect(() => {
    soundEngine.setSettings(progress.settings.sfxEnabled, progress.settings.musicEnabled);
  }, [progress.settings.sfxEnabled, progress.settings.musicEnabled]);

  const updateSettings = useCallback((patch: Partial<GameSettings>) => {
    setProgress((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...patch,
      },
    }));
  }, []);

  const recordAnimalCompletion = useCallback(
    (
      animalId: string,
      levelId: number,
      stars: 1 | 2 | 3,
      colors: Record<string, string>,
      brush: BrushEffectId
    ): { newlyUnlockedLevel: number | null; levelJustCompleted: boolean } => {
      let newlyUnlockedLevel: number | null = null;
      let levelJustCompleted = false;

      setProgress((prev) => {
        const existing = prev.completedAnimals[animalId];
        const nextCompleted = {
          ...prev.completedAnimals,
          [animalId]: {
            stars: existing ? (Math.max(existing.stars, stars) as 1 | 2 | 3) : stars,
            colors,
            brush,
            accessory: prev.selectedAccessories[animalId] || existing?.accessory || 'none',
            completedAt: Date.now(),
          },
        };

        const levelAnimals = getAnimalsByLevel(levelId);
        const allInLevelDone = levelAnimals.every((a) => Boolean(nextCompleted[a.id]));

        let nextUnlockedLevel = prev.unlockedLevel;
        if (allInLevelDone && levelId >= prev.unlockedLevel && levelId < LEVELS.length) {
          nextUnlockedLevel = levelId + 1;
          newlyUnlockedLevel = nextUnlockedLevel;
          levelJustCompleted = true;
        } else if (allInLevelDone && !levelAnimals.every((a) => Boolean(prev.completedAnimals[a.id]))) {
          levelJustCompleted = true;
        }

        return {
          ...prev,
          unlockedLevel: nextUnlockedLevel,
          justUnlockedLevel: newlyUnlockedLevel,
          completedAnimals: nextCompleted,
        };
      });

      return { newlyUnlockedLevel, levelJustCompleted };
    },
    []
  );

  const clearJustUnlockedLevel = useCallback(() => {
    setProgress((prev) => ({ ...prev, justUnlockedLevel: null }));
  }, []);

  const markFirstPaintCompleted = useCallback(() => {
    setProgress((prev) =>
      prev.hasCompletedFirstPaint ? prev : { ...prev, hasCompletedFirstPaint: true }
    );
  }, []);

  const setAnimalAccessory = useCallback((animalId: string, accessory: AccessoryId) => {
    setProgress((prev) => ({
      ...prev,
      selectedAccessories: {
        ...prev.selectedAccessories,
        [animalId]: accessory,
      },
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const totalStars = Object.values(progress.completedAnimals).reduce((sum, rec) => sum + rec.stars, 0);
  const completedCount = Object.keys(progress.completedAnimals).length;
  const completedLevels = LEVELS.filter((lvl) =>
    getAnimalsByLevel(lvl.id).every((a) => Boolean(progress.completedAnimals[a.id]))
  ).map((l) => l.id);

  const unlockedBrushes = BRUSH_EFFECTS.filter((b) => b.unlockLevel <= progress.unlockedLevel);
  const unlockedAccessories = ACCESSORIES.filter((acc) => completedCount >= acc.unlockAnimalsCount);

  return {
    progress,
    totalStars,
    completedCount,
    completedLevels,
    unlockedBrushes,
    unlockedAccessories,
    updateSettings,
    recordAnimalCompletion,
    clearJustUnlockedLevel,
    markFirstPaintCompleted,
    setAnimalAccessory,
    resetProgress,
  };
}
