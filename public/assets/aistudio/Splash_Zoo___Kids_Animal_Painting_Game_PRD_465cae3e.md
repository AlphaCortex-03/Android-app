# Splash Zoo – Kids Animal Painting Game PRD

*Version 1.0 · Product Requirements Document · Platform: Android / iOS · Age: 3–8*

## 1. Game Name Ideas

| Rank | Name | Why it works |
| --- | --- | --- |
| ⭐ 1 | **Splash Zoo** | Short, fun, easy for kids to say |
| 2 | **Paint Pals** | Friendly, animals feel like friends |
| 3 | **ColorPop Zoo** | Pop = punchy, bright colours |
| 4 | **Rainbow Safari** | Adventure feel |
| 5 | **Brushy Buddies** | Cute and playful |
| 6 | **Zoo Doodle Pop** | Fun sound, easy to remember |

**Recommended: Splash Zoo** (tagline: *Tap. Paint. Pop!*)

## 2. Product Vision

A zero-reading painting game where kids tap a colour, tap a part of a cartoon animal, and watch it burst to life with bright colour, animation and sound. Every animal finished gives a reward. Every 5 animals unlock a new level.

**Design rules**

- Almost no text: icons, colours, sounds and animation do the talking
- Very bright, punchy, high-contrast colours on a soft, clean background
- Big touch areas (min 64 px), no way to fail, no timers
- Every tap gives instant joy: sound + sparkle + bounce

## 3. Target Users

- **Primary:** Kids 3–8 years
- **Secondary:** Parents who want safe, calm, screen-time-friendly content

## 4. Core Gameplay Loop

1. Kid opens the game and taps **Play**
2. Sees the level map (5 animals per level)
3. Taps an animal → grey outline version opens
4. A glowing **hint** shows which part to paint and the colour palette shows the matching colour
5. Kid picks a colour (or the game auto-selects it) and taps the part → it fills with a splash
6. All parts painted → animal comes alive with a celebration dance + sound
7. Reward: stars + sticker + confetti
8. After 5 animals → level complete → next level unlocks

## 5. Painting Modes

| Mode | Age | How it works |
| --- | --- | --- |
| **Guided (default)** | 3–5 | Part blinks, correct colour is highlighted, kid taps the colour then the part |
| **Free Paint** | 5–8 | Kid chooses any colour for any part, reference thumbnail shown in the corner |

If a kid picks a different colour in Guided mode, it still fills (no "wrong" message). A gentle sparkle on the right colour gives bonus stars.

## 6. Level & Unlock System

- **7 levels × 5 animals = 35 animals**
- Level 1 is open at start
- Finish all 5 animals in a level → Level N+1 unlocks with a lock-opening animation
- Locked levels show a padlock icon and greyed animals (no text needed)
- Kids can replay any finished animal anytime

| Level | Theme | Icon colour |
| --- | --- | --- |
| 1 | Farm Friends | Orange |
| 2 | Farm & Pond | Green |
| 3 | Jungle | Yellow |
| 4 | Wild Safari | Purple |
| 5 | Ocean | Blue |
| 6 | Deep Sea & Ice | Aqua |
| 7 | Sky & Garden | Pink |

## 7. Colour Palette (12 punchy colours)

| Colour | Hex |
| --- | --- |
| Sunny Yellow | #FFD60A |
| Hot Orange | #FF7A00 |
| Candy Red | #FF2E4C |
| Bubblegum Pink | #FF5CAA |
| Electric Purple | #8E3BFF |
| Sky Blue | #1EA7FF |
| Aqua | #00D9C0 |
| Lime Green | #3CD62F |
| Chocolate Brown | #8B4A1F |
| Midnight Black | #1A1A2E |
| Snow White | #FFFFFF |
| Cloud Gray | #9AA5B1 |

**Background:** soft cream (#FFF8E7) or light sky (#E8F6FF) so the colours pop. Thick dark-navy outlines (4–6 px) on every shape.

## 8. Animal Art Style

- Cartoon, round, chunky shapes, big head, big eyes, tiny smile
- Thick outlines, no tiny details (easy tapping)
- Each animal has **4–6 paintable regions**, each a big closed shape
- Eyes are pre-coloured (white + black pupil) so every animal looks cute even half-painted
- Small background props (grass, water, tree) are also paintable to add fun
- Delivered as layered vector (SVG/Lottie) so each part can be filled and animated

## 9. Reference Image Spec (what gets which colour)

Each animal has a **Reference Card** shown as a small thumbnail (top corner) in Free Paint mode, and used for the hint glow in Guided mode. The card shows the finished animal with each region numbered. Region-to-colour map for all 35 animals is in section 10.

**Reference card layout:** finished coloured animal on the left, region dots with matching colour swatches on the right (no text, only dots).

## 10. The 35 Animals (Level-wise Colour Map)

### Level 1 – Farm Friends

| # | Animal | Region → Colour |
| --- | --- | --- |
| 1 | 🐶 Dog | Body → Brown · Face patch & belly → White · Ears → Black · Tongue → Pink · Collar → Red |
| 2 | 🐱 Cat | Body → Orange · Stripes → Brown · Nose → Pink · Bow → Purple · Ball of wool → Blue |
| 3 | 🐮 Cow | Body → White · Spots → Black · Nose → Pink · Horns → Yellow · Bell → Orange |
| 4 | 🦆 Duck | Body → Yellow · Beak & feet → Orange · Bow tie → Blue · Pond → Aqua |
| 5 | 🐷 Pig | Body & ears → Pink · Snout → Red · Mud puddle → Brown · Hat → Yellow |

### Level 2 – Farm & Pond

| # | Animal | Region → Colour |
| --- | --- | --- |
| 6 | 🐔 Chicken | Body → White · Comb → Red · Beak → Orange · Feet → Yellow · Egg → Brown |
| 7 | 🐑 Sheep | Wool → White · Face & legs → Black · Bell → Yellow · Grass → Green |
| 8 | 🐴 Horse | Body → Brown · Mane → Black · Saddle → Red · Blanket → Blue · Hooves → Gray |
| 9 | 🐰 Rabbit | Body → Gray · Inner ears & nose → Pink · Carrot → Orange · Leaves → Green |
| 10 | 🐸 Frog | Body → Green · Belly & eyes → Yellow · Tongue → Red · Lily pad → Lime |

### Level 3 – Jungle

| # | Animal | Region → Colour |
| --- | --- | --- |
| 11 | 🦁 Lion | Body → Yellow · Mane → Orange · Nose → Brown · Tail tuft → Red · Crown → Purple |
| 12 | 🐘 Elephant | Body → Blue · Inner ears → Pink · Tusks → White · Blanket → Red · Peanuts → Brown |
| 13 | 🐵 Monkey | Body → Brown · Face & belly → Orange · Banana → Yellow · Tree → Green |
| 14 | 🦒 Giraffe | Body → Yellow · Spots & horns → Brown · Tongue → Pink · Leaves → Green |
| 15 | 🐯 Tiger | Body → Orange · Stripes → Black · Belly → White · Nose → Pink · Ball → Blue |

### Level 4 – Wild Safari

| # | Animal | Region → Colour |
| --- | --- | --- |
| 16 | 🦓 Zebra | Body → White · Stripes → Black · Mane → Purple · Hooves → Gray · Flowers → Pink |
| 17 | 🦛 Hippo | Body → Purple · Mouth → Pink · Teeth → White · Water → Aqua · Lily → Pink |
| 18 | 🐻 Bear | Body → Brown · Snout → Orange · Honey pot → Yellow · Tree → Green |
| 19 | 🐼 Panda | Body → White · Patches → Black · Cheeks → Pink · Bamboo → Green · Heart → Red |
| 20 | 🦘 Kangaroo | Body → Orange · Belly → Yellow · Baby joey → Brown · Gloves → Red |

### Level 5 – Ocean

| # | Animal | Region → Colour |
| --- | --- | --- |
| 21 | 🐠 Fish | Body → Orange · Fins → Yellow · Stripes → White · Bubbles → Aqua · Seaweed → Green |
| 22 | 🐙 Octopus | Body → Purple · Spots → Pink · Eyes → White · Bubbles → Blue |
| 23 | 🐢 Turtle | Shell → Green · Shell pattern → Yellow · Skin → Lime · Sand → Yellow |
| 24 | 🐬 Dolphin | Body → Blue · Belly → White · Splash → Aqua · Ball → Red · Stars → Yellow |
| 25 | 🦀 Crab | Body → Red · Claws → Orange · Eyes → White · Shell → Yellow · Sand → Yellow |

### Level 6 – Deep Sea & Ice

| # | Animal | Region → Colour |
| --- | --- | --- |
| 26 | 🐳 Whale | Body → Blue · Belly → White · Water spout → Aqua · Tail → Purple · Hearts → Pink |
| 27 | 🌊 Seahorse | Body → Yellow · Fins → Orange · Belly → Pink · Coral → Red · Bubbles → Aqua |
| 28 | ⭐ Starfish | Body → Red · Dots → Yellow · Shell → Pink · Sand → Yellow |
| 29 | 🐧 Penguin | Body → Black · Belly → White · Beak & feet → Orange · Scarf → Red |
| 30 | 🦈 Shark | Body → Gray · Belly & teeth → White · Fin → Blue · Bubbles → Aqua |

### Level 7 – Sky & Garden

| # | Animal | Region → Colour |
| --- | --- | --- |
| 31 | 🦜 Parrot | Body → Red · Wings → Blue · Belly → Yellow · Beak → Orange · Branch → Brown |
| 32 | 🦉 Owl | Body → Brown · Belly → Yellow · Eyes → Orange · Wings → Purple · Moon → Yellow |
| 33 | 🦋 Butterfly | Wings → Purple & Pink · Spots → Yellow · Body → Black · Flower → Red |
| 34 | 🐝 Bee | Body → Yellow · Stripes → Black · Wings → Aqua · Honey → Orange · Flower → Pink |
| 35 | 🐞 Ladybug | Body → Red · Spots & head → Black · Leaf → Green · Dew drops → Aqua |

## 11. Animation Plan (Kid-Attracting)

| Moment | Animation |
| --- | --- |
| Tap a colour | Colour blob bounces and wiggles |
| Part ready to paint | Soft glow pulse around the region |
| Fill a region | Paint splash spreads from the finger touch point + tiny sparkle burst |
| Right colour (guided) | Extra star pops up |
| Last region filled | Animal jumps, spins, blinks and does its signature move (see below) |
| Reward | Confetti + rainbow + stars fly into the star counter |
| Level complete | Fireworks, padlock breaks open, next level icon bounces |
| Idle for 5 sec | A cartoon paintbrush points to the next region |

**Signature animal moves (examples):** Dog wags tail · Cat stretches · Cow chews · Duck splashes · Lion roars with a big mane shake · Elephant sprays water · Monkey swings · Dolphin jumps through a hoop · Penguin slides · Butterfly flutters away and returns · Bee buzzes in a loop.

## 12. Sound Design

| Event | Sound |
| --- | --- |
| Tap colour | Soft "bloop" |
| Fill region | Squishy "splash" + short chime |
| Right colour | Rising "ding-ding" |
| Animal finished | Happy jingle (2 sec) + the real animal sound |
| Star earned | "Twinkle" |
| Level unlocked | Magic "whoosh" + cheerful fanfare |
| Button tap | Light "pop" |
| Background music | Soft playful ukulele/xylophone loop, volume lower than effects, toggle on/off |

**Animal sounds:** Dog bark, Cat meow, Cow moo, Duck quack, Pig oink, Chicken cluck, Sheep baa, Horse neigh, Rabbit squeak, Frog ribbit, Lion roar, Elephant trumpet, Monkey chatter, Giraffe hum, Tiger growl, Zebra whinny, Hippo grunt, Bear growl, Panda squeak, Kangaroo thump, Fish bubble, Octopus splash, Turtle chirp, Dolphin click, Crab clack, Whale song, Seahorse chime, Starfish sparkle, Penguin squawk, Shark "duh-dun" cartoon sting, Parrot whistle, Owl hoot, Butterfly flutter chime, Bee buzz, Ladybug tiny giggle.

Optional: a cheerful voice says the animal's name (e.g. "Lion!") in the selectable language.

## 13. Rewards System

| Reward | When | Visual |
| --- | --- | --- |
| ⭐ Stars (1–3) | Per animal: 1 star for finishing, +1 for guided-colour match, +1 for finishing with no idle time | Gold stars fly to the top |
| 🎨 Sticker | Every finished animal | Coloured sticker added to a Sticker Book |
| 🌈 Rainbow Brush | Finish a level | New brush effect (glitter, rainbow, polka dots) |
| 🎩 Animal Accessory | Every 10 animals | Hat, glasses, crown to put on any animal |
| 🏆 Trophy | Every level completed | Shiny trophy on the shelf |
| 🎁 Surprise Box | After Level 3 and Level 7 | New bonus colour (Gold, Silver, Neon) |

**Collection screen:** Sticker Book (35 slots, silhouette until painted) gives kids a strong reason to complete every animal.

## 14. Screens (Minimal Text)

1. **Splash:** animated logo + bouncing animals
2. **Home:** big Play button, small sound toggle, parents corner (locked)
3. **Level Map:** 7 level bubbles on a winding path; each shows 5 animal dots (filled = done)
4. **Animal Select:** 5 large animal cards, locked ones greyed with a padlock
5. **Paint Screen:** big canvas (70%), colour palette at the bottom, reference thumbnail top corner, back and undo icons only
6. **Celebration:** animal dances, stars, confetti, big Next arrow
7. **Sticker Book:** grid of 35 stickers
8. **Parents Corner:** sound, music, language, reset progress, privacy (behind a simple hold-to-open or math gate)

## 15. Functional Requirements

| ID | Requirement | Priority |
| --- | --- | --- |
| F1 | Tap-to-fill painting on predefined regions | Must |
| F2 | 35 animals across 7 levels, 5 each | Must |
| F3 | Level N+1 unlocks only after all 5 animals in Level N are complete | Must |
| F4 | Progress saved locally, auto-resume | Must |
| F5 | Guided hint glow and Free Paint mode | Must |
| F6 | Per-event sound effects + animal sounds | Must |
| F7 | Reward stars, stickers, level trophy | Must |
| F8 | Undo and Reset animal | Should |
| F9 | Sticker Book | Should |
| F10 | Music and SFX toggles | Must |
| F11 | Voice naming of animals in multiple languages | Could |
| F12 | Save/share finished animal as image (parent-gated) | Could |
| F13 | Works fully offline | Must |

## 16. Non-Functional Requirements

- **Performance:** 60 fps on low-end phones; app size under 150 MB
- **Touch:** min 64 px targets; fill must respond in under 100 ms
- **Offline:** 100% playable without internet
- **Safety (kids):** no third-party chat, no external links, no data collection beyond anonymous analytics; comply with COPPA / GDPR-K; ads (if any) only in parent-gated areas or between levels, never mid-painting
- **Accessibility:** colour-blind friendly via pattern hints on regions (dots/stripes) as an option; large buttons; sound cues for every action
- **Languages:** zero-text UI; voice and parents corner localised (English, Hindi, Bengali, etc.)

## 17. Monetisation (Kid-Safe)

- **Free:** Level 1–2 (10 animals)
- **One-time unlock (parent-gated):** all 35 animals + bonus brushes, no ads
- No pop-ups, no countdown pressure, no loot-box mechanics

## 18. Success Metrics

| Metric | Target |
| --- | --- |
| Day-1 retention | 40%+ |
| Day-7 retention | 20%+ |
| Avg session length | 8–12 min |
| Animals completed per session | 2+ |
| Level 1 completion rate | 70%+ |
| Crash-free sessions | 99.5%+ |

## 19. Roadmap

| Phase | Scope | Duration |
| --- | --- | --- |
| 1 – Prototype | Paint engine + 5 animals (Level 1) + sounds | 3–4 weeks |
| 2 – Alpha | All 35 animals, levels, rewards, Sticker Book | 6–8 weeks |
| 3 – Beta | Polish, animations, kid testing, localisation | 3–4 weeks |
| 4 – Launch | Store release, analytics, bug fixes | 2 weeks |
| 5 – Post-launch | New themed levels (Dinosaurs, Birds, Insects) | Ongoing |

## 20. Recommended Tech

- **Engine:** Unity (2D) or Flutter + Rive/Lottie
- **Art:** layered SVG per animal; each region = a separate fillable shape
- **Audio:** WAV/OGG, short and compressed
- **Storage:** local save (JSON)

## 21. Open Questions

1. Should the game auto-pick the colour in Guided mode for the youngest kids (3–4)?
2. Free level 1–2 only, or fully free with parent-gated ads?
3. Which languages for the voice-over at launch?
