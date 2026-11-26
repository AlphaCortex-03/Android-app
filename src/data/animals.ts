import type { AnimalDefinition, AnimalRegion, LevelDefinition, SoundType, StaticLayer } from '../types/game';

export const LEVELS: LevelDefinition[] = [
  {
    id: 1,
    title: 'Farm Friends',
    accentHex: '#FF7A00',
    bgHex: '#FFF0D6',
    badgeIcon: '🐶',
    rewardBrush: 'solid',
  },
  {
    id: 2,
    title: 'Farm & Pond',
    accentHex: '#3CD62F',
    bgHex: '#E8FCE6',
    badgeIcon: '🐸',
    rewardBrush: 'glitter',
  },
  {
    id: 3,
    title: 'Jungle',
    accentHex: '#FFD60A',
    bgHex: '#FFF9D6',
    badgeIcon: '🦁',
    rewardBrush: 'rainbow',
    surpriseColorId: 'gold',
  },
  {
    id: 4,
    title: 'Wild Safari',
    accentHex: '#8E3BFF',
    bgHex: '#F2E8FF',
    badgeIcon: '🐼',
    rewardBrush: 'polka',
  },
  {
    id: 5,
    title: 'Ocean',
    accentHex: '#1EA7FF',
    bgHex: '#E6F5FF',
    badgeIcon: '🐠',
    rewardBrush: 'stars',
  },
  {
    id: 6,
    title: 'Deep Sea & Ice',
    accentHex: '#00D9C0',
    bgHex: '#E3FCF8',
    badgeIcon: '🐧',
    rewardBrush: 'neon',
  },
  {
    id: 7,
    title: 'Sky & Garden',
    accentHex: '#FF5CAA',
    bgHex: '#FFEAF4',
    badgeIcon: '🦋',
    rewardBrush: 'gold',
    surpriseColorId: 'silver',
  },
];

// Color shorthands matching PRD Section 7
const C = {
  yellow: '#FFD60A',
  orange: '#FF7A00',
  red: '#FF2E4C',
  pink: '#FF5CAA',
  purple: '#8E3BFF',
  blue: '#1EA7FF',
  aqua: '#00D9C0',
  green: '#3CD62F',
  brown: '#8B4A1F',
  black: '#1A1A2E',
  white: '#FFFFFF',
  gray: '#9AA5B1',
};

// ============================================================================
// LEVEL 1: BESPOKE CHUNKY CARTOON SVG ANIMALS (Dog, Cat, Cow, Duck, Pig)
// ============================================================================

const LEVEL_1_ANIMALS: AnimalDefinition[] = [
  {
    id: 'dog',
    number: 1,
    level: 1,
    name: 'Dog',
    emoji: '🐶',
    soundType: 'dog',
    danceType: 'wag',
    viewBox: '0 0 400 400',
    hasBespokeArt: true,
    regions: [
      {
        id: 'dog_tail',
        label: 'Tail',
        targetColor: C.brown,
        hintPoint: { x: 318, y: 242 },
        svgPaths: [
          'M 278 292 C 334 276 352 224 334 208 C 316 196 300 242 268 266 Z',
        ],
      },
      {
        id: 'dog_body',
        label: 'Body',
        targetColor: C.brown,
        hintPoint: { x: 145, y: 298 },
        svgPaths: [
          'M 126 244 C 110 278 112 344 136 356 C 154 364 176 358 182 346 C 194 352 206 352 218 346 C 224 358 246 364 264 356 C 288 344 290 278 274 244 Z',
        ],
      },
      {
        id: 'dog_head',
        label: 'Head',
        targetColor: C.brown,
        hintPoint: { x: 200, y: 112 },
        svgPaths: [
          'M 200 62 C 134 62 94 108 98 168 C 102 224 146 254 200 254 C 254 254 298 224 302 168 C 306 108 266 62 200 62 Z',
        ],
      },
      {
        id: 'dog_ear_left',
        label: 'Left Ear',
        targetColor: C.black,
        hintPoint: { x: 88, y: 158 },
        svgPaths: [
          'M 112 98 C 72 100 54 158 66 200 C 76 226 106 216 112 186 C 118 156 116 122 112 98 Z',
        ],
      },
      {
        id: 'dog_ear_right',
        label: 'Right Ear',
        targetColor: C.black,
        hintPoint: { x: 312, y: 158 },
        svgPaths: [
          'M 288 98 C 328 100 346 158 334 200 C 324 226 294 216 288 186 C 282 156 284 122 288 98 Z',
        ],
      },
      {
        id: 'dog_face',
        label: 'Face Patch',
        targetColor: C.white,
        hintPoint: { x: 200, y: 202 },
        svgPaths: [
          'M 152 108 C 128 108 114 132 124 156 C 130 170 144 176 146 188 C 142 224 166 244 200 244 C 234 244 258 224 254 188 C 250 172 228 164 200 164 C 184 164 178 152 178 136 C 178 118 168 108 152 108 Z',
        ],
      },
      {
        id: 'dog_belly',
        label: 'Belly',
        targetColor: C.white,
        hintPoint: { x: 200, y: 306 },
        svgPaths: [
          'M 200 264 C 170 264 156 296 164 332 C 172 346 228 346 236 332 C 244 296 230 264 200 264 Z',
        ],
      },
      {
        id: 'dog_collar',
        label: 'Collar',
        targetColor: C.red,
        hintPoint: { x: 200, y: 256 },
        svgPaths: [
          'M 134 236 C 166 254 234 254 266 236 L 274 258 C 236 276 164 276 126 258 Z',
        ],
      },
      {
        id: 'dog_tongue',
        label: 'Tongue',
        targetColor: C.pink,
        hintPoint: { x: 200, y: 230 },
        svgPaths: [
          'M 184 212 C 184 238 192 246 200 246 C 208 246 216 238 216 212 Z',
        ],
      },
    ],
    preColoredForeground: [
      // Eyes
      { d: 'M 154 146 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
      { d: 'M 246 146 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
      { d: 'M 157 146 m -11 0 a 11 11 0 1 0 22 0 a 11 11 0 1 0 -22 0', fill: '#1A1A2E' },
      { d: 'M 243 146 m -11 0 a 11 11 0 1 0 22 0 a 11 11 0 1 0 -22 0', fill: '#1A1A2E' },
      { d: 'M 153 140 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0', fill: '#FFFFFF' },
      { d: 'M 239 140 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0', fill: '#FFFFFF' },
      // Button Nose & Smile
      { d: 'M 200 172 C 184 172 178 184 186 192 C 194 200 206 200 214 192 C 222 184 216 172 200 172 Z', fill: '#1A1A2E' },
      { d: 'M 196 178 m -4 0 a 4 3 0 1 0 8 0 a 4 3 0 1 0 -8 0', fill: '#FFFFFF', opacity: 0.5 },
      { d: 'M 176 202 Q 188 218 200 204 Q 212 218 224 202', fill: 'none', stroke: '#1A1A2E', strokeWidth: 5 },
      // Gold Collar Tag
      { d: 'M 200 278 m -13 0 a 13 13 0 1 0 26 0 a 13 13 0 1 0 -26 0', fill: '#FFD60A', stroke: '#1A1A2E', strokeWidth: 5 },
      // Paw toe lines
      { d: 'M 148 342 L 148 356 M 162 342 L 162 356 M 238 342 L 238 356 M 252 342 L 252 356', fill: 'none', stroke: '#1A1A2E', strokeWidth: 4 },
    ],
  },

  {
    id: 'cat',
    number: 2,
    level: 1,
    name: 'Cat',
    emoji: '🐱',
    soundType: 'cat',
    danceType: 'stretch',
    viewBox: '0 0 400 400',
    hasBespokeArt: true,
    regions: [
      {
        id: 'cat_tail',
        label: 'Tail',
        targetColor: C.orange,
        hintPoint: { x: 286, y: 300 },
        svgPaths: [
          'M 244 334 C 296 340 318 292 294 276 C 276 264 268 302 240 306 Z',
        ],
      },
      {
        id: 'cat_body',
        label: 'Body',
        targetColor: C.orange,
        hintPoint: { x: 190, y: 312 },
        svgPaths: [
          'M 122 238 C 102 276 106 346 138 356 C 166 364 218 364 244 356 C 274 346 276 276 254 238 Z',
        ],
      },
      {
        id: 'cat_head',
        label: 'Head',
        targetColor: C.orange,
        hintPoint: { x: 190, y: 145 },
        svgPaths: [
          'M 124 106 L 106 46 L 160 76 C 174 72 206 72 220 76 L 274 46 L 256 106 C 278 130 284 166 274 198 C 260 236 226 252 190 252 C 154 252 120 236 106 198 C 96 166 102 130 124 106 Z',
        ],
      },
      {
        id: 'cat_stripes_head',
        label: 'Head Stripes',
        targetColor: C.brown,
        hintPoint: { x: 190, y: 92 },
        svgPaths: [
          'M 176 74 L 182 106 L 198 106 L 204 74 Z',
          'M 150 78 L 160 104 L 170 100 L 164 76 Z',
          'M 216 76 L 210 100 L 220 104 L 230 78 Z',
        ],
      },
      {
        id: 'cat_cheek_left',
        label: 'Left Cheek Stripe',
        targetColor: C.brown,
        hintPoint: { x: 116, y: 169 },
        svgPaths: [
          'M 104 162 L 130 166 L 128 176 L 102 174 Z',
        ],
      },
      {
        id: 'cat_cheek_right',
        label: 'Right Cheek Stripe',
        targetColor: C.brown,
        hintPoint: { x: 264, y: 169 },
        svgPaths: [
          'M 276 162 L 250 166 L 252 176 L 278 174 Z',
        ],
      },
      {
        id: 'cat_belly_left',
        label: 'Left Body Stripe',
        targetColor: C.brown,
        hintPoint: { x: 132, y: 290 },
        svgPaths: [
          'M 118 282 L 150 286 L 148 298 L 114 294 Z',
        ],
      },
      {
        id: 'cat_belly_right',
        label: 'Right Body Stripe',
        targetColor: C.brown,
        hintPoint: { x: 246, y: 290 },
        svgPaths: [
          'M 260 282 L 228 286 L 230 298 L 264 294 Z',
        ],
      },
      {
        id: 'cat_ear_left',
        label: 'Left Inner Ear',
        targetColor: C.pink,
        hintPoint: { x: 128, y: 84 },
        svgPaths: [
          'M 126 98 L 118 66 L 146 84 Z',
        ],
      },
      {
        id: 'cat_ear_right',
        label: 'Right Inner Ear',
        targetColor: C.pink,
        hintPoint: { x: 252, y: 84 },
        svgPaths: [
          'M 254 98 L 262 66 L 234 84 Z',
        ],
      },
      {
        id: 'cat_nose',
        label: 'Nose',
        targetColor: C.pink,
        hintPoint: { x: 190, y: 180 },
        svgPaths: [
          'M 176 176 C 176 168 204 168 204 176 C 204 186 194 192 190 192 C 186 192 176 186 176 176 Z',
        ],
      },
      {
        id: 'cat_bow',
        label: 'Bow',
        targetColor: C.purple,
        hintPoint: { x: 190, y: 256 },
        svgPaths: [
          'M 190 256 L 148 236 C 140 248 140 268 148 278 Z',
          'M 190 256 L 232 236 C 240 248 240 268 232 278 Z',
          'M 190 256 m -14 0 a 14 14 0 1 0 28 0 a 14 14 0 1 0 -28 0',
        ],
      },
      {
        id: 'cat_wool',
        label: 'Wool Ball',
        targetColor: C.blue,
        hintPoint: { x: 320, y: 318 },
        svgPaths: [
          'M 320 318 m -42 0 a 42 42 0 1 0 84 0 a 42 42 0 1 0 -84 0',
        ],
      },
    ],
    preColoredForeground: [
      // Big kitty eyes
      { d: 'M 150 144 m -19 0 a 19 19 0 1 0 38 0 a 19 19 0 1 0 -38 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
      { d: 'M 230 144 m -19 0 a 19 19 0 1 0 38 0 a 19 19 0 1 0 -38 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
      { d: 'M 152 144 m -11 0 a 11 11 0 1 0 22 0 a 11 11 0 1 0 -22 0', fill: '#1A1A2E' },
      { d: 'M 228 144 m -11 0 a 11 11 0 1 0 22 0 a 11 11 0 1 0 -22 0', fill: '#1A1A2E' },
      { d: 'M 148 138 m -4.5 0 a 4.5 4.5 0 1 0 9 0 a 4.5 4.5 0 1 0 -9 0', fill: '#FFFFFF' },
      { d: 'M 224 138 m -4.5 0 a 4.5 4.5 0 1 0 9 0 a 4.5 4.5 0 1 0 -9 0', fill: '#FFFFFF' },
      // Smile & whiskers
      { d: 'M 168 202 Q 179 216 190 198 Q 201 216 212 202', fill: 'none', stroke: '#1A1A2E', strokeWidth: 5 },
      { d: 'M 86 184 L 124 190 M 84 202 L 124 200', fill: 'none', stroke: '#1A1A2E', strokeWidth: 4.5 },
      { d: 'M 294 184 L 256 190 M 296 202 L 256 200', fill: 'none', stroke: '#1A1A2E', strokeWidth: 4.5 },
      // Wool ball yarn details
      { d: 'M 290 294 Q 320 318 350 296 M 284 320 Q 320 342 356 322 M 304 282 Q 308 320 330 354', fill: 'none', stroke: '#1A1A2E', strokeWidth: 4 },
      { d: 'M 282 336 Q 266 364 300 368', fill: 'none', stroke: '#1A1A2E', strokeWidth: 5 },
    ],
  },

  {
    id: 'cow',
    number: 3,
    level: 1,
    name: 'Cow',
    emoji: '🐮',
    soundType: 'cow',
    danceType: 'chew',
    viewBox: '0 0 400 400',
    hasBespokeArt: true,
    regions: [
      {
        id: 'cow_ear_left',
        label: 'Left Ear',
        targetColor: C.white,
        hintPoint: { x: 88, y: 124 },
        svgPaths: [
          'M 110 108 C 72 98 58 124 76 144 C 92 156 112 142 118 126 Z',
        ],
      },
      {
        id: 'cow_ear_right',
        label: 'Right Ear',
        targetColor: C.white,
        hintPoint: { x: 312, y: 124 },
        svgPaths: [
          'M 290 108 C 328 98 342 124 324 144 C 308 156 288 142 282 126 Z',
        ],
      },
      {
        id: 'cow_body',
        label: 'Body',
        targetColor: C.white,
        hintPoint: { x: 200, y: 316 },
        svgPaths: [
          'M 118 228 C 98 266 102 342 128 356 C 148 364 170 356 174 342 L 226 342 C 230 356 252 364 272 356 C 298 342 302 266 282 228 Z',
        ],
      },
      {
        id: 'cow_head',
        label: 'Head',
        targetColor: C.white,
        hintPoint: { x: 200, y: 118 },
        svgPaths: [
          'M 200 68 C 138 68 102 108 104 164 C 106 218 144 246 200 246 C 256 246 294 218 296 164 C 298 108 262 68 200 68 Z',
        ],
      },
      {
        id: 'cow_spot_head',
        label: 'Head Spot',
        targetColor: C.black,
        hintPoint: { x: 256, y: 108 },
        svgPaths: [
          'M 224 74 C 256 76 284 96 290 128 C 266 138 242 124 234 106 C 228 92 220 84 224 74 Z',
        ],
      },
      {
        id: 'cow_spot_left',
        label: 'Left Spot',
        targetColor: C.black,
        hintPoint: { x: 128, y: 288 },
        svgPaths: [
          'M 110 264 C 132 258 154 274 150 298 C 146 318 118 320 104 304 Z',
        ],
      },
      {
        id: 'cow_spot_right',
        label: 'Right Spot',
        targetColor: C.black,
        hintPoint: { x: 270, y: 306 },
        svgPaths: [
          'M 262 284 C 284 278 296 298 290 322 C 276 334 252 326 248 306 Z',
        ],
      },
      {
        id: 'cow_horn_left',
        label: 'Left Horn',
        targetColor: C.yellow,
        hintPoint: { x: 130, y: 70 },
        svgPaths: [
          'M 148 80 C 136 52 114 48 112 66 C 110 82 126 92 140 90 Z',
        ],
      },
      {
        id: 'cow_horn_right',
        label: 'Right Horn',
        targetColor: C.yellow,
        hintPoint: { x: 270, y: 70 },
        svgPaths: [
          'M 252 80 C 264 52 286 48 288 66 C 290 82 274 92 260 90 Z',
        ],
      },
      {
        id: 'cow_nose',
        label: 'Snout',
        targetColor: C.pink,
        hintPoint: { x: 200, y: 204 },
        svgPaths: [
          'M 200 170 C 144 170 120 192 124 218 C 128 242 162 252 200 252 C 238 252 272 242 276 218 C 280 192 256 170 200 170 Z',
        ],
      },
      {
        id: 'cow_bell',
        label: 'Bell',
        targetColor: C.orange,
        hintPoint: { x: 200, y: 288 },
        svgPaths: [
          'M 178 268 L 222 268 L 234 304 C 212 310 188 310 166 304 Z',
        ],
      },
    ],
    preColoredForeground: [
      // Eyes
      { d: 'M 156 138 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
      { d: 'M 244 138 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
      { d: 'M 158 138 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0', fill: '#1A1A2E' },
      { d: 'M 242 138 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0', fill: '#1A1A2E' },
      { d: 'M 154 132 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0', fill: '#FFFFFF' },
      { d: 'M 238 132 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0', fill: '#FFFFFF' },
      // Nostrils & Big Happy Smile
      { d: 'M 170 196 m -9 0 a 9 7 0 1 0 18 0 a 9 7 0 1 0 -18 0', fill: '#1A1A2E' },
      { d: 'M 230 196 m -9 0 a 9 7 0 1 0 18 0 a 9 7 0 1 0 -18 0', fill: '#1A1A2E' },
      { d: 'M 172 222 Q 200 240 228 222', fill: 'none', stroke: '#1A1A2E', strokeWidth: 5 },
      // Collar strap & bell clapper
      { d: 'M 142 248 Q 200 268 258 248', fill: 'none', stroke: '#FF2E4C', strokeWidth: 10 },
      { d: 'M 200 310 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0', fill: '#FFD60A', stroke: '#1A1A2E', strokeWidth: 4 },
    ],
  },

  {
    id: 'duck',
    number: 4,
    level: 1,
    name: 'Duck',
    emoji: '🦆',
    soundType: 'duck',
    danceType: 'splash',
    viewBox: '0 0 400 400',
    hasBespokeArt: true,
    regions: [
      {
        id: 'duck_pond',
        label: 'Pond',
        targetColor: C.aqua,
        hintPoint: { x: 200, y: 342 },
        svgPaths: [
          'M 52 332 C 52 296 118 286 200 286 C 282 286 348 296 348 332 C 348 364 282 374 200 374 C 118 374 52 364 52 332 Z',
        ],
      },
      {
        id: 'duck_body',
        label: 'Body',
        targetColor: C.yellow,
        hintPoint: { x: 195, y: 120 },
        svgPaths: [
          'M 196 58 C 188 42 204 34 212 46 C 220 38 232 46 222 60 C 260 66 286 98 284 142 C 282 174 264 198 246 208 C 280 220 310 244 326 226 C 340 212 344 248 318 282 C 292 316 244 322 198 322 C 138 322 104 294 106 250 C 108 216 132 198 144 192 C 122 178 112 150 116 120 C 122 80 156 58 196 58 Z',
        ],
      },
      {
        id: 'duck_beak',
        label: 'Beak',
        targetColor: C.orange,
        hintPoint: { x: 112, y: 162 },
        svgPaths: [
          'M 134 142 C 92 142 74 156 76 170 C 78 184 114 190 152 180 C 160 172 156 142 134 142 Z',
        ],
      },
      {
        id: 'duck_foot_left',
        label: 'Left Foot',
        targetColor: C.orange,
        hintPoint: { x: 158, y: 330 },
        svgPaths: [
          'M 150 314 L 136 342 L 178 342 L 166 314 Z',
        ],
      },
      {
        id: 'duck_foot_right',
        label: 'Right Foot',
        targetColor: C.orange,
        hintPoint: { x: 240, y: 330 },
        svgPaths: [
          'M 232 314 L 220 342 L 262 342 L 246 314 Z',
        ],
      },
      {
        id: 'duck_bowtie',
        label: 'Bow Tie',
        targetColor: C.blue,
        hintPoint: { x: 190, y: 222 },
        svgPaths: [
          'M 190 222 L 154 204 C 146 216 146 232 154 242 Z',
          'M 190 222 L 226 204 C 234 216 234 232 226 242 Z',
          'M 190 222 m -12 0 a 12 12 0 1 0 24 0 a 12 12 0 1 0 -24 0',
        ],
      },
    ],
    preColoredForeground: [
      // Big eyes
      { d: 'M 176 116 m -17 0 a 17 17 0 1 0 34 0 a 17 17 0 1 0 -34 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
      { d: 'M 236 116 m -17 0 a 17 17 0 1 0 34 0 a 17 17 0 1 0 -34 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
      { d: 'M 174 116 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0', fill: '#1A1A2E' },
      { d: 'M 234 116 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0', fill: '#1A1A2E' },
      { d: 'M 170 110 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0', fill: '#FFFFFF' },
      { d: 'M 230 110 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0', fill: '#FFFFFF' },
      // Wing contour & rosy cheek
      { d: 'M 218 242 C 254 236 278 260 264 286 C 248 304 206 298 198 272', fill: 'none', stroke: '#1A1A2E', strokeWidth: 5 },
      { d: 'M 252 146 m -10 0 a 10 7 0 1 0 20 0 a 10 7 0 1 0 -20 0', fill: '#FF5CAA', opacity: 0.45 },
      // Bill smile line & pond ripples
      { d: 'M 86 164 Q 116 174 146 164', fill: 'none', stroke: '#1A1A2E', strokeWidth: 4.5 },
      { d: 'M 84 352 Q 116 360 144 352 M 260 354 Q 294 362 320 352', fill: 'none', stroke: '#FFFFFF', strokeWidth: 4.5, opacity: 0.7 },
    ],
  },

  {
    id: 'pig',
    number: 5,
    level: 1,
    name: 'Pig',
    emoji: '🐷',
    soundType: 'pig',
    danceType: 'bounce',
    viewBox: '0 0 400 400',
    hasBespokeArt: true,
    regions: [
      {
        id: 'pig_mud',
        label: 'Mud Puddle',
        targetColor: C.brown,
        hintPoint: { x: 200, y: 344 },
        svgPaths: [
          'M 64 334 C 58 304 126 294 200 296 C 276 298 342 308 336 336 C 330 364 268 372 200 372 C 128 372 70 364 64 334 Z',
        ],
      },
      {
        id: 'pig_ear_left',
        label: 'Left Ear',
        targetColor: C.pink,
        hintPoint: { x: 102, y: 124 },
        svgPaths: [
          'M 128 118 C 96 86 78 106 86 138 C 94 156 116 154 128 142 Z',
        ],
      },
      {
        id: 'pig_ear_right',
        label: 'Right Ear',
        targetColor: C.pink,
        hintPoint: { x: 298, y: 124 },
        svgPaths: [
          'M 272 118 C 304 86 322 106 314 138 C 306 156 284 154 272 142 Z',
        ],
      },
      {
        id: 'pig_body',
        label: 'Body',
        targetColor: C.pink,
        hintPoint: { x: 200, y: 286 },
        svgPaths: [
          'M 122 232 C 100 264 106 332 134 342 C 154 348 168 342 172 328 L 228 328 C 232 342 246 348 266 342 C 294 332 300 264 278 232 Z',
        ],
      },
      {
        id: 'pig_head',
        label: 'Head',
        targetColor: C.pink,
        hintPoint: { x: 200, y: 120 },
        svgPaths: [
          'M 200 84 C 138 84 102 122 104 174 C 106 226 144 254 200 254 C 256 254 294 226 296 174 C 298 122 262 84 200 84 Z',
        ],
      },
      {
        id: 'pig_snout',
        label: 'Snout',
        targetColor: C.red,
        hintPoint: { x: 200, y: 186 },
        svgPaths: [
          'M 200 156 m -46 0 a 46 34 0 1 0 92 0 a 46 34 0 1 0 -92 0',
        ],
      },
      {
        id: 'pig_hat',
        label: 'Hat',
        targetColor: C.yellow,
        hintPoint: { x: 200, y: 66 },
        svgPaths: [
          'M 152 86 C 154 44 246 44 248 86 Z',
          'M 124 86 C 156 76 244 76 276 86 C 276 98 244 102 200 102 C 156 102 124 98 124 86 Z',
        ],
      },
    ],
    preColoredForeground: [
      // Eyes
      { d: 'M 154 134 m -17 0 a 17 17 0 1 0 34 0 a 17 17 0 1 0 -34 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
      { d: 'M 246 134 m -17 0 a 17 17 0 1 0 34 0 a 17 17 0 1 0 -34 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
      { d: 'M 156 134 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0', fill: '#1A1A2E' },
      { d: 'M 244 134 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0', fill: '#1A1A2E' },
      { d: 'M 152 128 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0', fill: '#FFFFFF' },
      { d: 'M 240 128 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0', fill: '#FFFFFF' },
      // Nostrils in snout & smile
      { d: 'M 180 184 m -9 0 a 9 13 0 1 0 18 0 a 9 13 0 1 0 -18 0', fill: '#1A1A2E' },
      { d: 'M 220 184 m -9 0 a 9 13 0 1 0 18 0 a 9 13 0 1 0 -18 0', fill: '#1A1A2E' },
      { d: 'M 164 222 Q 200 244 236 222', fill: 'none', stroke: '#1A1A2E', strokeWidth: 5 },
      // Curly tail
      { d: 'M 294 274 C 318 264 328 240 310 236 C 296 234 298 256 322 252', fill: 'none', stroke: '#1A1A2E', strokeWidth: 6 },
      // Hat stripe
      { d: 'M 152 80 Q 200 72 248 80', fill: 'none', stroke: '#FF2E4C', strokeWidth: 6 },
    ],
  },
];

// ============================================================================
// LEVELS 2–7 STRUCTURED BUILDER (All remaining 30 animals from single registry)
// ============================================================================

type SilhouetteArchetype = 'quadruped' | 'bird' | 'aquatic' | 'bug' | 'round';

interface CompactAnimalSpec {
  id: string;
  number: number;
  level: number;
  name: string;
  emoji: string;
  soundType: SoundType;
  danceType: AnimalDefinition['danceType'];
  archetype: SilhouetteArchetype;
  regions: Array<{ id: string; label: string; targetColor: string }>;
}

function buildStructuredAnimal(spec: CompactAnimalSpec): AnimalDefinition {
  const templates: Record<
    SilhouetteArchetype,
    { slots: Array<Array<{ path: string; hint: { x: number; y: number }; suffix?: string }>>; fg: StaticLayer[] }
  > = {
    quadruped: {
      slots: [
        // 0: Body then Head individually so head overlaps neck cleanly
        [
          { path: 'M 122 232 C 102 268 108 344 138 354 L 262 354 C 292 344 298 268 278 232 Z', hint: { x: 200, y: 292 }, suffix: 'body' },
          { path: 'M 200 74 C 138 74 102 114 104 166 C 106 218 144 246 200 246 C 256 246 294 218 296 166 C 298 114 262 74 200 74 Z', hint: { x: 200, y: 120 }, suffix: 'head' },
        ],
        // 1: Left & Right Ears individually
        [
          { path: 'M 120 104 C 84 82 72 118 92 142 C 106 154 118 136 120 104 Z', hint: { x: 96, y: 118 }, suffix: 'left' },
          { path: 'M 280 104 C 316 82 328 118 308 142 C 294 154 282 136 280 104 Z', hint: { x: 304, y: 118 }, suffix: 'right' },
        ],
        // 2: Belly
        [
          { path: 'M 200 264 C 166 264 152 296 160 334 C 174 346 226 346 240 334 C 248 296 234 264 200 264 Z', hint: { x: 200, y: 300 } },
        ],
        // 3: Snout / Nose
        [
          { path: 'M 200 186 m -32 0 a 32 22 0 1 0 64 0 a 32 22 0 1 0 -64 0', hint: { x: 200, y: 186 } },
        ],
        // 4: Side prop
        [
          { path: 'M 318 310 m -38 0 a 38 38 0 1 0 76 0 a 38 38 0 1 0 -76 0', hint: { x: 318, y: 310 } },
        ],
      ],
      fg: [
        { d: 'M 156 138 m -17 0 a 17 17 0 1 0 34 0 a 17 17 0 1 0 -34 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
        { d: 'M 244 138 m -17 0 a 17 17 0 1 0 34 0 a 17 17 0 1 0 -34 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
        { d: 'M 158 138 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0', fill: '#1A1A2E' },
        { d: 'M 242 138 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0', fill: '#1A1A2E' },
        { d: 'M 154 132 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0', fill: '#FFFFFF' },
        { d: 'M 238 132 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0', fill: '#FFFFFF' },
        { d: 'M 178 214 Q 200 232 222 214', fill: 'none', stroke: '#1A1A2E', strokeWidth: 5 },
      ],
    },
    bird: {
      slots: [
        [{ path: 'M 200 84 C 136 84 106 138 110 206 C 114 276 146 318 200 318 C 254 318 286 276 290 206 C 294 138 264 84 200 84 Z', hint: { x: 200, y: 120 } }],
        [
          { path: 'M 110 184 C 66 196 58 248 92 272 C 112 284 126 254 124 222 Z', hint: { x: 88, y: 230 }, suffix: 'left' },
          { path: 'M 290 184 C 334 196 342 248 308 272 C 288 284 274 254 276 222 Z', hint: { x: 312, y: 230 }, suffix: 'right' },
        ],
        [{ path: 'M 200 204 C 166 204 148 240 156 286 C 166 304 234 304 244 286 C 252 240 234 204 200 204 Z', hint: { x: 200, y: 256 } }],
        [{ path: 'M 178 164 L 222 164 L 200 202 Z', hint: { x: 200, y: 178 } }],
        [
          { path: 'M 142 320 L 130 356 L 176 356 Z', hint: { x: 152, y: 342 }, suffix: 'left' },
          { path: 'M 258 320 L 224 356 L 270 356 Z', hint: { x: 248, y: 342 }, suffix: 'right' },
        ],
      ],
      fg: [
        { d: 'M 162 136 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
        { d: 'M 238 136 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
        { d: 'M 164 136 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0', fill: '#1A1A2E' },
        { d: 'M 236 136 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0', fill: '#1A1A2E' },
        { d: 'M 160 130 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0', fill: '#FFFFFF' },
        { d: 'M 232 130 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0', fill: '#FFFFFF' },
      ],
    },
    aquatic: {
      slots: [
        [{ path: 'M 186 112 C 110 112 72 158 74 206 C 76 254 118 292 192 292 C 258 292 294 252 298 206 C 302 158 258 112 186 112 Z', hint: { x: 185, y: 164 } }],
        [{ path: 'M 294 204 L 358 152 C 364 188 364 222 358 258 Z', hint: { x: 334, y: 204 } }],
        [{ path: 'M 186 218 C 136 218 112 246 124 274 C 146 288 228 288 252 272 C 260 244 236 218 186 218 Z', hint: { x: 188, y: 254 } }],
        [
          { path: 'M 92 104 m -22 0 a 22 22 0 1 0 44 0 a 22 22 0 1 0 -44 0', hint: { x: 92, y: 104 }, suffix: 'b1' },
          { path: 'M 64 64 m -14 0 a 14 14 0 1 0 28 0 a 14 14 0 1 0 -28 0', hint: { x: 64, y: 64 }, suffix: 'b2' },
        ],
        [{ path: 'M 68 342 C 120 318 280 318 332 342 C 332 368 68 368 68 342 Z', hint: { x: 200, y: 344 } }],
      ],
      fg: [
        { d: 'M 142 166 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
        { d: 'M 218 166 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
        { d: 'M 144 166 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0', fill: '#1A1A2E' },
        { d: 'M 216 166 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0', fill: '#1A1A2E' },
        { d: 'M 152 204 Q 180 220 206 204', fill: 'none', stroke: '#1A1A2E', strokeWidth: 5 },
      ],
    },
    bug: {
      slots: [
        [{ path: 'M 200 130 C 138 130 108 182 112 246 C 116 306 148 336 200 336 C 252 336 284 306 288 246 C 292 182 262 130 200 130 Z', hint: { x: 200, y: 248 } }],
        [
          { path: 'M 106 164 C 54 146 42 206 74 236 C 92 252 114 232 114 200 Z', hint: { x: 76, y: 200 }, suffix: 'left' },
          { path: 'M 294 164 C 346 146 358 206 326 236 C 308 252 286 232 286 200 Z', hint: { x: 324, y: 200 }, suffix: 'right' },
        ],
        [
          { path: 'M 164 204 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0', hint: { x: 164, y: 204 }, suffix: 'left' },
          { path: 'M 236 204 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0', hint: { x: 236, y: 204 }, suffix: 'right' },
        ],
        [{ path: 'M 200 96 m -46 0 a 46 38 0 1 0 92 0 a 46 38 0 1 0 -92 0', hint: { x: 200, y: 96 } }],
        [{ path: 'M 326 322 m -36 0 a 36 36 0 1 0 72 0 a 36 36 0 1 0 -72 0', hint: { x: 326, y: 322 } }],
      ],
      fg: [
        { d: 'M 178 92 m -14 0 a 14 14 0 1 0 28 0 a 14 14 0 1 0 -28 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 4.5 },
        { d: 'M 222 92 m -14 0 a 14 14 0 1 0 28 0 a 14 14 0 1 0 -28 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 4.5 },
        { d: 'M 180 92 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0', fill: '#1A1A2E' },
        { d: 'M 220 92 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0', fill: '#1A1A2E' },
        { d: 'M 168 58 Q 152 34 136 44 M 232 58 Q 248 34 264 44', fill: 'none', stroke: '#1A1A2E', strokeWidth: 5 },
      ],
    },
    round: {
      slots: [
        [{ path: 'M 200 96 C 122 96 86 150 90 220 C 94 288 136 326 200 326 C 264 326 306 288 310 220 C 314 150 278 96 200 96 Z', hint: { x: 200, y: 144 } }],
        [{ path: 'M 200 224 C 154 224 134 256 144 294 C 160 310 240 310 256 294 C 266 256 246 224 200 224 Z', hint: { x: 200, y: 266 } }],
        [
          { path: 'M 110 112 m -34 0 a 34 34 0 1 0 68 0 a 34 34 0 1 0 -68 0', hint: { x: 110, y: 112 }, suffix: 'left' },
          { path: 'M 290 112 m -34 0 a 34 34 0 1 0 68 0 a 34 34 0 1 0 -68 0', hint: { x: 290, y: 112 }, suffix: 'right' },
        ],
        [{ path: 'M 74 344 C 132 318 268 318 326 344 C 326 372 74 372 74 344 Z', hint: { x: 200, y: 344 } }],
        [{ path: 'M 200 186 m -28 0 a 28 20 0 1 0 56 0 a 28 20 0 1 0 -56 0', hint: { x: 200, y: 186 } }],
      ],
      fg: [
        { d: 'M 156 152 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
        { d: 'M 244 152 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0', fill: '#FFFFFF', stroke: '#1A1A2E', strokeWidth: 5 },
        { d: 'M 158 152 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0', fill: '#1A1A2E' },
        { d: 'M 242 152 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0', fill: '#1A1A2E' },
        { d: 'M 176 206 Q 200 224 224 206', fill: 'none', stroke: '#1A1A2E', strokeWidth: 5 },
      ],
    },
  };

  const tpl = templates[spec.archetype];
  const regions: AnimalRegion[] = spec.regions.flatMap((r, idx) => {
    const slotItems = tpl.slots[idx % tpl.slots.length];
    return slotItems.map((item, sIdx) => ({
      id: item.suffix ? `${r.id}_${item.suffix}` : slotItems.length > 1 ? `${r.id}_${sIdx + 1}` : r.id,
      label: r.label,
      targetColor: r.targetColor,
      svgPaths: [item.path],
      hintPoint: item.hint,
    }));
  });

  return {
    id: spec.id,
    number: spec.number,
    level: spec.level,
    name: spec.name,
    emoji: spec.emoji,
    soundType: spec.soundType,
    danceType: spec.danceType,
    viewBox: '0 0 400 400',
    hasBespokeArt: false,
    regions,
    preColoredForeground: tpl.fg,
  };
}

const REMAINING_30_SPECS: CompactAnimalSpec[] = [
  // Level 2 – Farm & Pond
  {
    id: 'chicken', number: 6, level: 2, name: 'Chicken', emoji: '🐔', soundType: 'chicken', danceType: 'bounce', archetype: 'bird',
    regions: [
      { id: 'chicken_body', label: 'Body', targetColor: C.white },
      { id: 'chicken_comb', label: 'Comb', targetColor: C.red },
      { id: 'chicken_beak', label: 'Beak', targetColor: C.orange },
      { id: 'chicken_feet', label: 'Feet', targetColor: C.yellow },
      { id: 'chicken_egg', label: 'Egg', targetColor: C.brown },
    ],
  },
  {
    id: 'sheep', number: 7, level: 2, name: 'Sheep', emoji: '🐑', soundType: 'sheep', danceType: 'bounce', archetype: 'round',
    regions: [
      { id: 'sheep_wool', label: 'Wool', targetColor: C.white },
      { id: 'sheep_face', label: 'Face & Legs', targetColor: C.black },
      { id: 'sheep_bell', label: 'Bell', targetColor: C.yellow },
      { id: 'sheep_grass', label: 'Grass', targetColor: C.green },
    ],
  },
  {
    id: 'horse', number: 8, level: 2, name: 'Horse', emoji: '🐴', soundType: 'horse', danceType: 'wag', archetype: 'quadruped',
    regions: [
      { id: 'horse_body', label: 'Body', targetColor: C.brown },
      { id: 'horse_mane', label: 'Mane', targetColor: C.black },
      { id: 'horse_saddle', label: 'Saddle', targetColor: C.red },
      { id: 'horse_blanket', label: 'Blanket', targetColor: C.blue },
      { id: 'horse_hooves', label: 'Hooves', targetColor: C.gray },
    ],
  },
  {
    id: 'rabbit', number: 9, level: 2, name: 'Rabbit', emoji: '🐰', soundType: 'rabbit', danceType: 'bounce', archetype: 'quadruped',
    regions: [
      { id: 'rabbit_body', label: 'Body', targetColor: C.gray },
      { id: 'rabbit_ears', label: 'Inner Ears & Nose', targetColor: C.pink },
      { id: 'rabbit_carrot', label: 'Carrot', targetColor: C.orange },
      { id: 'rabbit_leaves', label: 'Leaves', targetColor: C.green },
    ],
  },
  {
    id: 'frog', number: 10, level: 2, name: 'Frog', emoji: '🐸', soundType: 'frog', danceType: 'splash', archetype: 'round',
    regions: [
      { id: 'frog_body', label: 'Body', targetColor: C.green },
      { id: 'frog_belly', label: 'Belly & Eyes', targetColor: C.yellow },
      { id: 'frog_tongue', label: 'Tongue', targetColor: C.red },
      { id: 'frog_lily', label: 'Lily Pad', targetColor: C.green },
    ],
  },

  // Level 3 – Jungle
  {
    id: 'lion', number: 11, level: 3, name: 'Lion', emoji: '🦁', soundType: 'lion', danceType: 'roar', archetype: 'quadruped',
    regions: [
      { id: 'lion_body', label: 'Body', targetColor: C.yellow },
      { id: 'lion_mane', label: 'Mane', targetColor: C.orange },
      { id: 'lion_nose', label: 'Nose', targetColor: C.brown },
      { id: 'lion_tail', label: 'Tail Tuft', targetColor: C.red },
      { id: 'lion_crown', label: 'Crown', targetColor: C.purple },
    ],
  },
  {
    id: 'elephant', number: 12, level: 3, name: 'Elephant', emoji: '🐘', soundType: 'elephant', danceType: 'splash', archetype: 'quadruped',
    regions: [
      { id: 'elephant_body', label: 'Body', targetColor: C.blue },
      { id: 'elephant_ears', label: 'Inner Ears', targetColor: C.pink },
      { id: 'elephant_tusks', label: 'Tusks', targetColor: C.white },
      { id: 'elephant_blanket', label: 'Blanket', targetColor: C.red },
      { id: 'elephant_peanuts', label: 'Peanuts', targetColor: C.brown },
    ],
  },
  {
    id: 'monkey', number: 13, level: 3, name: 'Monkey', emoji: '🐵', soundType: 'monkey', danceType: 'stretch', archetype: 'quadruped',
    regions: [
      { id: 'monkey_body', label: 'Body', targetColor: C.brown },
      { id: 'monkey_face', label: 'Face & Belly', targetColor: C.orange },
      { id: 'monkey_banana', label: 'Banana', targetColor: C.yellow },
      { id: 'monkey_tree', label: 'Tree', targetColor: C.green },
    ],
  },
  {
    id: 'giraffe', number: 14, level: 3, name: 'Giraffe', emoji: '🦒', soundType: 'giraffe', danceType: 'chew', archetype: 'quadruped',
    regions: [
      { id: 'giraffe_body', label: 'Body', targetColor: C.yellow },
      { id: 'giraffe_spots', label: 'Spots & Horns', targetColor: C.brown },
      { id: 'giraffe_tongue', label: 'Tongue', targetColor: C.pink },
      { id: 'giraffe_leaves', label: 'Leaves', targetColor: C.green },
    ],
  },
  {
    id: 'tiger', number: 15, level: 3, name: 'Tiger', emoji: '🐯', soundType: 'tiger', danceType: 'roar', archetype: 'quadruped',
    regions: [
      { id: 'tiger_body', label: 'Body', targetColor: C.orange },
      { id: 'tiger_stripes', label: 'Stripes', targetColor: C.black },
      { id: 'tiger_belly', label: 'Belly', targetColor: C.white },
      { id: 'tiger_nose', label: 'Nose', targetColor: C.pink },
      { id: 'tiger_ball', label: 'Ball', targetColor: C.blue },
    ],
  },

  // Level 4 – Wild Safari
  {
    id: 'zebra', number: 16, level: 4, name: 'Zebra', emoji: '🦓', soundType: 'zebra', danceType: 'wag', archetype: 'quadruped',
    regions: [
      { id: 'zebra_body', label: 'Body', targetColor: C.white },
      { id: 'zebra_stripes', label: 'Stripes', targetColor: C.black },
      { id: 'zebra_mane', label: 'Mane', targetColor: C.purple },
      { id: 'zebra_hooves', label: 'Hooves', targetColor: C.gray },
      { id: 'zebra_flowers', label: 'Flowers', targetColor: C.pink },
    ],
  },
  {
    id: 'hippo', number: 17, level: 4, name: 'Hippo', emoji: '🦛', soundType: 'hippo', danceType: 'splash', archetype: 'round',
    regions: [
      { id: 'hippo_body', label: 'Body', targetColor: C.purple },
      { id: 'hippo_mouth', label: 'Mouth', targetColor: C.pink },
      { id: 'hippo_teeth', label: 'Teeth', targetColor: C.white },
      { id: 'hippo_water', label: 'Water', targetColor: C.aqua },
      { id: 'hippo_lily', label: 'Lily', targetColor: C.pink },
    ],
  },
  {
    id: 'bear', number: 18, level: 4, name: 'Bear', emoji: '🐻', soundType: 'bear', danceType: 'bounce', archetype: 'quadruped',
    regions: [
      { id: 'bear_body', label: 'Body', targetColor: C.brown },
      { id: 'bear_snout', label: 'Snout', targetColor: C.orange },
      { id: 'bear_honey', label: 'Honey Pot', targetColor: C.yellow },
      { id: 'bear_tree', label: 'Tree', targetColor: C.green },
    ],
  },
  {
    id: 'panda', number: 19, level: 4, name: 'Panda', emoji: '🐼', soundType: 'panda', danceType: 'chew', archetype: 'round',
    regions: [
      { id: 'panda_body', label: 'Body', targetColor: C.white },
      { id: 'panda_patches', label: 'Patches', targetColor: C.black },
      { id: 'panda_cheeks', label: 'Cheeks', targetColor: C.pink },
      { id: 'panda_bamboo', label: 'Bamboo', targetColor: C.green },
      { id: 'panda_heart', label: 'Heart', targetColor: C.red },
    ],
  },
  {
    id: 'kangaroo', number: 20, level: 4, name: 'Kangaroo', emoji: '🦘', soundType: 'kangaroo', danceType: 'bounce', archetype: 'quadruped',
    regions: [
      { id: 'kangaroo_body', label: 'Body', targetColor: C.orange },
      { id: 'kangaroo_belly', label: 'Belly', targetColor: C.yellow },
      { id: 'kangaroo_joey', label: 'Joey', targetColor: C.brown },
      { id: 'kangaroo_gloves', label: 'Gloves', targetColor: C.red },
    ],
  },

  // Level 5 – Ocean
  {
    id: 'fish', number: 21, level: 5, name: 'Fish', emoji: '🐠', soundType: 'fish', danceType: 'splash', archetype: 'aquatic',
    regions: [
      { id: 'fish_body', label: 'Body', targetColor: C.orange },
      { id: 'fish_fins', label: 'Fins', targetColor: C.yellow },
      { id: 'fish_stripes', label: 'Stripes', targetColor: C.white },
      { id: 'fish_bubbles', label: 'Bubbles', targetColor: C.aqua },
      { id: 'fish_seaweed', label: 'Seaweed', targetColor: C.green },
    ],
  },
  {
    id: 'octopus', number: 22, level: 5, name: 'Octopus', emoji: '🐙', soundType: 'octopus', danceType: 'flutter', archetype: 'aquatic',
    regions: [
      { id: 'octopus_body', label: 'Body', targetColor: C.purple },
      { id: 'octopus_spots', label: 'Spots', targetColor: C.pink },
      { id: 'octopus_eyes', label: 'Eyes', targetColor: C.white },
      { id: 'octopus_bubbles', label: 'Bubbles', targetColor: C.blue },
    ],
  },
  {
    id: 'turtle', number: 23, level: 5, name: 'Turtle', emoji: '🐢', soundType: 'turtle', danceType: 'chew', archetype: 'round',
    regions: [
      { id: 'turtle_shell', label: 'Shell', targetColor: C.green },
      { id: 'turtle_pattern', label: 'Pattern', targetColor: C.yellow },
      { id: 'turtle_skin', label: 'Skin', targetColor: C.green },
      { id: 'turtle_sand', label: 'Sand', targetColor: C.yellow },
    ],
  },
  {
    id: 'dolphin', number: 24, level: 5, name: 'Dolphin', emoji: '🐬', soundType: 'dolphin', danceType: 'splash', archetype: 'aquatic',
    regions: [
      { id: 'dolphin_body', label: 'Body', targetColor: C.blue },
      { id: 'dolphin_belly', label: 'Belly', targetColor: C.white },
      { id: 'dolphin_splash', label: 'Splash', targetColor: C.aqua },
      { id: 'dolphin_ball', label: 'Ball', targetColor: C.red },
      { id: 'dolphin_stars', label: 'Stars', targetColor: C.yellow },
    ],
  },
  {
    id: 'crab', number: 25, level: 5, name: 'Crab', emoji: '🦀', soundType: 'crab', danceType: 'wag', archetype: 'bug',
    regions: [
      { id: 'crab_body', label: 'Body', targetColor: C.red },
      { id: 'crab_claws', label: 'Claws', targetColor: C.orange },
      { id: 'crab_eyes', label: 'Eyes', targetColor: C.white },
      { id: 'crab_shell', label: 'Shell', targetColor: C.yellow },
      { id: 'crab_sand', label: 'Sand', targetColor: C.yellow },
    ],
  },

  // Level 6 – Deep Sea & Ice
  {
    id: 'whale', number: 26, level: 6, name: 'Whale', emoji: '🐳', soundType: 'whale', danceType: 'splash', archetype: 'aquatic',
    regions: [
      { id: 'whale_body', label: 'Body', targetColor: C.blue },
      { id: 'whale_belly', label: 'Belly', targetColor: C.white },
      { id: 'whale_spout', label: 'Spout', targetColor: C.aqua },
      { id: 'whale_tail', label: 'Tail', targetColor: C.purple },
      { id: 'whale_hearts', label: 'Hearts', targetColor: C.pink },
    ],
  },
  {
    id: 'seahorse', number: 27, level: 6, name: 'Seahorse', emoji: '🐡', soundType: 'seahorse', danceType: 'flutter', archetype: 'aquatic',
    regions: [
      { id: 'seahorse_body', label: 'Body', targetColor: C.yellow },
      { id: 'seahorse_fins', label: 'Fins', targetColor: C.orange },
      { id: 'seahorse_belly', label: 'Belly', targetColor: C.pink },
      { id: 'seahorse_coral', label: 'Coral', targetColor: C.red },
      { id: 'seahorse_bubbles', label: 'Bubbles', targetColor: C.aqua },
    ],
  },
  {
    id: 'starfish', number: 28, level: 6, name: 'Starfish', emoji: '⭐', soundType: 'starfish', danceType: 'bounce', archetype: 'bug',
    regions: [
      { id: 'starfish_body', label: 'Body', targetColor: C.red },
      { id: 'starfish_dots', label: 'Dots', targetColor: C.yellow },
      { id: 'starfish_shell', label: 'Shell', targetColor: C.pink },
      { id: 'starfish_sand', label: 'Sand', targetColor: C.yellow },
    ],
  },
  {
    id: 'penguin', number: 29, level: 6, name: 'Penguin', emoji: '🐧', soundType: 'penguin', danceType: 'wag', archetype: 'bird',
    regions: [
      { id: 'penguin_body', label: 'Body', targetColor: C.black },
      { id: 'penguin_belly', label: 'Belly', targetColor: C.white },
      { id: 'penguin_beak', label: 'Beak & Feet', targetColor: C.orange },
      { id: 'penguin_scarf', label: 'Scarf', targetColor: C.red },
    ],
  },
  {
    id: 'shark', number: 30, level: 6, name: 'Shark', emoji: '🦈', soundType: 'shark', danceType: 'splash', archetype: 'aquatic',
    regions: [
      { id: 'shark_body', label: 'Body', targetColor: C.gray },
      { id: 'shark_belly', label: 'Belly & Teeth', targetColor: C.white },
      { id: 'shark_fin', label: 'Fin', targetColor: C.blue },
      { id: 'shark_bubbles', label: 'Bubbles', targetColor: C.aqua },
    ],
  },

  // Level 7 – Sky & Garden
  {
    id: 'parrot', number: 31, level: 7, name: 'Parrot', emoji: '🦜', soundType: 'parrot', danceType: 'flutter', archetype: 'bird',
    regions: [
      { id: 'parrot_body', label: 'Body', targetColor: C.red },
      { id: 'parrot_wings', label: 'Wings', targetColor: C.blue },
      { id: 'parrot_belly', label: 'Belly', targetColor: C.yellow },
      { id: 'parrot_beak', label: 'Beak', targetColor: C.orange },
      { id: 'parrot_branch', label: 'Branch', targetColor: C.brown },
    ],
  },
  {
    id: 'owl', number: 32, level: 7, name: 'Owl', emoji: '🦉', soundType: 'owl', danceType: 'flutter', archetype: 'bird',
    regions: [
      { id: 'owl_body', label: 'Body', targetColor: C.brown },
      { id: 'owl_belly', label: 'Belly', targetColor: C.yellow },
      { id: 'owl_eyes', label: 'Eyes', targetColor: C.orange },
      { id: 'owl_wings', label: 'Wings', targetColor: C.purple },
      { id: 'owl_moon', label: 'Moon', targetColor: C.yellow },
    ],
  },
  {
    id: 'butterfly', number: 33, level: 7, name: 'Butterfly', emoji: '🦋', soundType: 'butterfly', danceType: 'flutter', archetype: 'bug',
    regions: [
      { id: 'butterfly_wings', label: 'Wings', targetColor: C.purple },
      { id: 'butterfly_spots', label: 'Spots', targetColor: C.yellow },
      { id: 'butterfly_body', label: 'Body', targetColor: C.black },
      { id: 'butterfly_flower', label: 'Flower', targetColor: C.red },
    ],
  },
  {
    id: 'bee', number: 34, level: 7, name: 'Bee', emoji: '🐝', soundType: 'bee', danceType: 'flutter', archetype: 'bug',
    regions: [
      { id: 'bee_body', label: 'Body', targetColor: C.yellow },
      { id: 'bee_stripes', label: 'Stripes', targetColor: C.black },
      { id: 'bee_wings', label: 'Wings', targetColor: C.aqua },
      { id: 'bee_honey', label: 'Honey', targetColor: C.orange },
      { id: 'bee_flower', label: 'Flower', targetColor: C.pink },
    ],
  },
  {
    id: 'ladybug', number: 35, level: 7, name: 'Ladybug', emoji: '🐞', soundType: 'ladybug', danceType: 'bounce', archetype: 'bug',
    regions: [
      { id: 'ladybug_body', label: 'Body', targetColor: C.red },
      { id: 'ladybug_spots', label: 'Spots & Head', targetColor: C.black },
      { id: 'ladybug_leaf', label: 'Leaf', targetColor: C.green },
      { id: 'ladybug_dew', label: 'Dew Drops', targetColor: C.aqua },
    ],
  },
];

export const ANIMALS: AnimalDefinition[] = [
  ...LEVEL_1_ANIMALS,
  ...REMAINING_30_SPECS.map(buildStructuredAnimal),
];

export function getAnimalsByLevel(levelId: number): AnimalDefinition[] {
  return ANIMALS.filter((a) => a.level === levelId);
}

export function getAnimalById(id: string): AnimalDefinition | undefined {
  return ANIMALS.find((a) => a.id === id);
}
