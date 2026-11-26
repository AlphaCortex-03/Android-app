import { useCallback, useEffect, useState } from 'react';
import type { BrushEffectId, ScreenId } from './types/game';
import { getAnimalById, getAnimalsByLevel } from './data/animals';
import { soundEngine } from './audio/soundEngine';
import { useGameStorage } from './hooks/useGameStorage';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { LevelMapScreen } from './components/LevelMapScreen';
import { AnimalSelectScreen } from './components/AnimalSelectScreen';
import { PaintScreen } from './components/PaintScreen';
import { CelebrationScreen } from './components/CelebrationScreen';
import { StickerBookScreen } from './components/StickerBookScreen';
import { ParentGateModal } from './components/ParentGateModal';
import { OfflineIndicator } from './components/OfflineIndicator';

interface CelebrationState {
  animalId: string;
  fills: Record<string, string>;
  brush: BrushEffectId;
  earnedStars: 1 | 2 | 3;
  newlyUnlockedLevel: number | null;
  levelJustCompleted: boolean;
}

export default function App() {
  const {
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
  } = useGameStorage();

  const [screen, setScreen] = useState<ScreenId>('SPLASH');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>('dog');
  const [paintInstanceKey, setPaintInstanceKey] = useState<number>(1);
  const [celebration, setCelebration] = useState<CelebrationState | null>(null);
  const [showParentGate, setShowParentGate] = useState(false);

  // Unlock Web Audio API on first user gesture
  useEffect(() => {
    const unlockAudio = () => {
      soundEngine.unlock();
    };
    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  const handleContinueFromSplash = useCallback(() => {
    soundEngine.unlock();
    soundEngine.playPop();
    setScreen('HOME');
  }, []);

  const handleToggleQuickSound = () => {
    soundEngine.unlock();
    const next = !(progress.settings.sfxEnabled || progress.settings.musicEnabled);
    updateSettings({ sfxEnabled: next, musicEnabled: next });
    if (next) soundEngine.playPop();
  };

  const handleSelectAnimal = (animalId: string) => {
    soundEngine.playPop();
    setSelectedAnimalId(animalId);
    setPaintInstanceKey((k) => k + 1);
    setScreen('PAINT');
  };

  const handlePaintComplete = (
    stars: 1 | 2 | 3,
    fills: Record<string, string>,
    brush: BrushEffectId
  ) => {
    const animal = getAnimalById(selectedAnimalId);
    if (!animal) return;
    const result = recordAnimalCompletion(animal.id, animal.level, stars, fills, brush);
    setCelebration({
      animalId: animal.id,
      fills,
      brush,
      earnedStars: stars,
      newlyUnlockedLevel: result.newlyUnlockedLevel,
      levelJustCompleted: result.levelJustCompleted,
    });
    setScreen('CELEBRATION');
  };

  const handleCelebrationNext = () => {
    soundEngine.playPop();
    if (!celebration) {
      setScreen('LEVEL_MAP');
      return;
    }

    if (celebration.newlyUnlockedLevel) {
      setScreen('LEVEL_MAP');
      return;
    }

    const levelAnimals = getAnimalsByLevel(selectedLevel);
    const nextUnfinished = levelAnimals.find(
      (a) => a.id !== celebration.animalId && !progress.completedAnimals[a.id]
    );
    if (nextUnfinished) {
      setSelectedAnimalId(nextUnfinished.id);
      setPaintInstanceKey((k) => k + 1);
      setScreen('PAINT');
    } else {
      setScreen('ANIMAL_SELECT');
    }
  };

  const handleCelebrationReplay = () => {
    soundEngine.playPop();
    setPaintInstanceKey((k) => k + 1);
    setScreen('PAINT');
  };

  const currentAnimal = getAnimalById(selectedAnimalId);
  const celebrationAnimal = celebration ? getAnimalById(celebration.animalId) : undefined;
  const anySoundEnabled = progress.settings.sfxEnabled || progress.settings.musicEnabled;

  return (
    <>
      {screen === 'SPLASH' && <SplashScreen onContinue={handleContinueFromSplash} />}

      {screen === 'HOME' && (
        <HomeScreen
          totalStars={totalStars}
          completedCount={completedCount}
          completedLevelsCount={completedLevels.length}
          soundEnabled={anySoundEnabled}
          onPlay={() => {
            soundEngine.unlock();
            soundEngine.playPop();
            setScreen('LEVEL_MAP');
          }}
          onOpenStickerBook={() => {
            soundEngine.unlock();
            soundEngine.playPop();
            setScreen('STICKER_BOOK');
          }}
          onToggleSound={handleToggleQuickSound}
          onOpenParentGate={() => {
            soundEngine.playPop();
            setShowParentGate(true);
          }}
        />
      )}

      {screen === 'LEVEL_MAP' && (
        <LevelMapScreen
          progress={progress}
          totalStars={totalStars}
          onSelectLevel={(lvlId) => {
            soundEngine.playPop();
            setSelectedLevel(lvlId);
            setScreen('ANIMAL_SELECT');
          }}
          onBack={() => {
            soundEngine.playPop();
            setScreen('HOME');
          }}
          onOpenStickerBook={() => {
            soundEngine.playPop();
            setScreen('STICKER_BOOK');
          }}
          onAcknowledgeUnlock={clearJustUnlockedLevel}
        />
      )}

      {screen === 'ANIMAL_SELECT' && (
        <AnimalSelectScreen
          levelId={selectedLevel}
          progress={progress}
          onSelectAnimal={handleSelectAnimal}
          onChangeMode={(mode) => {
            soundEngine.playPop();
            updateSettings({ mode });
          }}
          onBack={() => {
            soundEngine.playPop();
            setScreen('LEVEL_MAP');
          }}
        />
      )}

      {screen === 'PAINT' && currentAnimal && (
        <PaintScreen
          key={`${currentAnimal.id}-${paintInstanceKey}`}
          animal={currentAnimal}
          mode={progress.settings.mode}
          hasCompletedFirstPaint={progress.hasCompletedFirstPaint || completedCount > 0}
          patternHints={progress.settings.patternHints}
          unlockedLevel={progress.unlockedLevel}
          unlockedBrushes={unlockedBrushes}
          unlockedAccessories={unlockedAccessories}
          initialAccessory={progress.selectedAccessories[currentAnimal.id] || 'none'}
          onChangeMode={(mode) => {
            soundEngine.playPop();
            updateSettings({ mode });
          }}
          onFirstPaint={markFirstPaintCompleted}
          onSelectAccessory={(acc) => setAnimalAccessory(currentAnimal.id, acc)}
          onComplete={handlePaintComplete}
          onBack={() => {
            soundEngine.playPop();
            setScreen('ANIMAL_SELECT');
          }}
        />
      )}

      {screen === 'CELEBRATION' && celebration && celebrationAnimal && (
        <CelebrationScreen
          animal={celebrationAnimal}
          fills={celebration.fills}
          brush={celebration.brush}
          accessory={progress.selectedAccessories[celebrationAnimal.id] || 'none'}
          earnedStars={celebration.earnedStars}
          totalStars={totalStars}
          newlyUnlockedLevel={celebration.newlyUnlockedLevel}
          levelJustCompleted={celebration.levelJustCompleted}
          onNext={handleCelebrationNext}
          onReplay={handleCelebrationReplay}
        />
      )}

      {screen === 'STICKER_BOOK' && (
        <StickerBookScreen
          progress={progress}
          completedLevels={completedLevels}
          completedCount={completedCount}
          onBack={() => {
            soundEngine.playPop();
            setScreen('HOME');
          }}
        />
      )}

      {showParentGate && (
        <ParentGateModal
          settings={progress.settings}
          onUpdateSettings={updateSettings}
          onResetProgress={resetProgress}
          onClose={() => setShowParentGate(false)}
        />
      )}

      <OfflineIndicator />
    </>
  );
}
