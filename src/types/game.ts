export type ScreenId =
  | 'SPLASH'
  | 'HOME'
  | 'LEVEL_MAP'
  | 'ANIMAL_SELECT'
  | 'PAINT'
  | 'CELEBRATION'
  | 'STICKER_BOOK';

export type PaintMode = 'guided' | 'free';

export type BrushEffectId =
  | 'solid'
  | 'glitter'
  | 'rainbow'
  | 'polka'
  | 'stars'
  | 'neon'
  | 'gold';

export type AccessoryId = 'none' | 'hat' | 'glasses' | 'crown';

export type SoundType =
  | 'dog'
  | 'cat'
  | 'cow'
  | 'duck'
  | 'pig'
  | 'chicken'
  | 'sheep'
  | 'horse'
  | 'rabbit'
  | 'frog'
  | 'lion'
  | 'elephant'
  | 'monkey'
  | 'giraffe'
  | 'tiger'
  | 'zebra'
  | 'hippo'
  | 'bear'
  | 'panda'
  | 'kangaroo'
  | 'fish'
  | 'octopus'
  | 'turtle'
  | 'dolphin'
  | 'crab'
  | 'whale'
  | 'seahorse'
  | 'starfish'
  | 'penguin'
  | 'shark'
  | 'parrot'
  | 'owl'
  | 'butterfly'
  | 'bee'
  | 'ladybug';

export interface ColorSwatch {
  id: string;
  name: string;
  hex: string;
  patternType: 'dots' | 'stripes' | 'waves' | 'grid' | 'stars' | 'solid';
  isBonus?: boolean;
  unlockLevel?: number;
}

export interface BrushEffectDef {
  id: BrushEffectId;
  label: string;
  unlockLevel: number;
  iconColor: string;
}

export interface AccessoryDef {
  id: Exclude<AccessoryId, 'none'>;
  label: string;
  unlockAnimalsCount: number;
}

export interface AnimalRegion {
  id: string;
  label: string;
  targetColor: string;
  svgPaths: string[];
  hintPoint: { x: number; y: number };
}

export interface StaticLayer {
  d: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  fillRule?: 'nonzero' | 'evenodd';
  opacity?: number;
}

export interface AnimalDefinition {
  id: string;
  number: number;
  level: number;
  name: string;
  emoji: string;
  soundType: SoundType;
  danceType: 'wag' | 'stretch' | 'chew' | 'splash' | 'bounce' | 'flutter' | 'roar';
  viewBox: string;
  hasBespokeArt: boolean;
  regions: AnimalRegion[];
  /** Static non-paintable details rendered ABOVE painted regions (eyes, pupils, smile, outlines) */
  preColoredForeground: StaticLayer[];
  /** Optional static backdrop elements rendered BELOW painted regions */
  preColoredBackground?: StaticLayer[];
}

export interface LevelDefinition {
  id: number;
  title: string;
  accentHex: string;
  bgHex: string;
  badgeIcon: string;
  rewardBrush: BrushEffectId;
  surpriseColorId?: string;
}

export interface CompletedAnimalRecord {
  stars: 1 | 2 | 3;
  colors: Record<string, string>;
  brush?: BrushEffectId;
  accessory?: AccessoryId;
  completedAt: number;
}

export interface GameSettings {
  sfxEnabled: boolean;
  musicEnabled: boolean;
  patternHints: boolean;
  mode: PaintMode;
}

export interface GameProgress {
  unlockedLevel: number;
  justUnlockedLevel: number | null;
  completedAnimals: Record<string, CompletedAnimalRecord>;
  selectedAccessories: Record<string, AccessoryId>;
  settings: GameSettings;
}

export interface SplashParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  isStarMatch: boolean;
}
