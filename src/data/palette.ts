import type { AccessoryDef, BrushEffectDef, ColorSwatch } from '../types/game';

export const CORE_PALETTE: ColorSwatch[] = [
  { id: 'yellow', name: 'Sunny Yellow', hex: '#FFD60A', patternType: 'stars' },
  { id: 'orange', name: 'Hot Orange', hex: '#FF7A00', patternType: 'waves' },
  { id: 'red', name: 'Candy Red', hex: '#FF2E4C', patternType: 'dots' },
  { id: 'pink', name: 'Bubblegum Pink', hex: '#FF5CAA', patternType: 'dots' },
  { id: 'purple', name: 'Electric Purple', hex: '#8E3BFF', patternType: 'stripes' },
  { id: 'blue', name: 'Sky Blue', hex: '#1EA7FF', patternType: 'waves' },
  { id: 'aqua', name: 'Aqua', hex: '#00D9C0', patternType: 'waves' },
  { id: 'green', name: 'Lime Green', hex: '#3CD62F', patternType: 'stripes' },
  { id: 'brown', name: 'Chocolate Brown', hex: '#8B4A1F', patternType: 'grid' },
  { id: 'black', name: 'Midnight Black', hex: '#1A1A2E', patternType: 'solid' },
  { id: 'white', name: 'Snow White', hex: '#FFFFFF', patternType: 'solid' },
  { id: 'gray', name: 'Cloud Gray', hex: '#9AA5B1', patternType: 'grid' },
];

export const BONUS_COLORS: ColorSwatch[] = [
  { id: 'gold', name: 'Magic Gold', hex: '#F5B700', patternType: 'stars', isBonus: true, unlockLevel: 3 },
  { id: 'silver', name: 'Sparkle Silver', hex: '#CBD5E1', patternType: 'dots', isBonus: true, unlockLevel: 7 },
  { id: 'neon', name: 'Neon Lime', hex: '#B8FF00', patternType: 'stripes', isBonus: true, unlockLevel: 7 },
];

export const BRUSH_EFFECTS: BrushEffectDef[] = [
  { id: 'solid', label: 'Classic', unlockLevel: 1, iconColor: '#1EA7FF' },
  { id: 'glitter', label: 'Glitter', unlockLevel: 2, iconColor: '#FFD60A' },
  { id: 'rainbow', label: 'Rainbow', unlockLevel: 3, iconColor: '#FF5CAA' },
  { id: 'polka', label: 'Polka', unlockLevel: 4, iconColor: '#FF2E4C' },
  { id: 'stars', label: 'Starry', unlockLevel: 5, iconColor: '#8E3BFF' },
  { id: 'neon', label: 'Glow', unlockLevel: 6, iconColor: '#00D9C0' },
  { id: 'gold', label: 'Gold', unlockLevel: 7, iconColor: '#F5B700' },
];

export const ACCESSORIES: AccessoryDef[] = [
  { id: 'hat', label: 'Party Hat', unlockAnimalsCount: 5 },
  { id: 'glasses', label: 'Cool Shades', unlockAnimalsCount: 10 },
  { id: 'crown', label: 'Royal Crown', unlockAnimalsCount: 20 },
];

export function getColorByHexOrId(value: string): ColorSwatch {
  const all = [...CORE_PALETTE, ...BONUS_COLORS];
  return (
    all.find((c) => c.hex.toLowerCase() === value.toLowerCase() || c.id === value.toLowerCase()) ||
    CORE_PALETTE[0]
  );
}
