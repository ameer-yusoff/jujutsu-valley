# Chibi World: Implemented Sprite and Interaction Bible

The supplied Gojo illustration establishes the lavender-white hair, cyan eyes, bold dark outline, high plum collar, rounded face, and mitten hands. Character art is procedural vector artwork inspired by that illustration. North/side views are authored interpretations of the front reference.

## Atlas and coordinate contract

Each cell is 128 × 128 pixels. The master sheet has 8 columns and 18 rows: 1024 × 2304 pixels. Six supplemental rows form a 1024 × 768 sheet. Cell coordinates are `(column × 128, localRow × 128)`. The foot anchor is `(64,116)`; 96 pose pixels correspond to one world unit. Character display scaling is applied uniformly by the renderer.

Directions: south/front, north/back, side/east, and west/mirrored. Eight-way movement selects these cardinal artwork views while retaining the full continuous movement and attack vectors. Gojo has blindfold, sunglasses, and unveiled-eye variants. Other heroes use their individual faces and accessories.

Metadata records atlas rectangles, timing, root translation, head/body rotations, both arm and leg angles, scale, hand anchors, projectile origin, foot anchors, hurtbox, event flags, and hitbox range/arc. `pose.js` evaluates these values for the 2D character sprite drawer and atlas inspector. The world is a flat pixel-art tile map inspired by cozy farming and social games. All exploration characters are 2D. Short ultimate and awakening cut-ins use layered 2.5D parallax; there are no 3D world or character modes. World collision uses the continuous facing vector.

## Gojo master animation matrix

| Row | Clip | Frames | FPS | Duration | Active frames (1-based) |
|---|---|---:|---:|---:|---|
|1|Idle south|6|8|0.750 s|—|
|2|Idle north|4|6|0.667 s|—|
|3|Idle side|6|8|0.750 s|—|
|4|Walk south|8|12|0.667 s|—|
|5|Walk north|8|12|0.667 s|—|
|6|Walk side|8|12|0.667 s|—|
|7|Run/dash|6|16|0.375 s|—|
|8|Sit and mochi|6|6|1.000 s|—|
|9|Boop/wave|6|10|0.600 s|—|
|10|Chop|6|12|0.500 s|4|
|11|Mine|6|12|0.500 s|4|
|12|Water/forage|6|10|0.600 s|4|
|13|Unseal / hero special|8|14|0.571 s|—|
|14|Three-hit melee|8|16|0.500 s|2, 5, 7|
|15|Technique 1|6|12|0.500 s|4|
|16|Technique 2|6|12|0.500 s|4|
|17|Ultimate|8|12|0.667 s|6|
|18|Infinity/guard|4|10|0.400 s|—|

Supplemental clips: hurt 4@12, defeat 6@8, recovery 6@10, checkpoint 6@10, teleport 8@12, headgear transition 6@12.

## Evaluated motion

For frame f of N, normalized phase is `p = f/N`, angle `a = 2πp`, frame duration `1/FPS`, and clip duration `N/FPS`.

- Breathing: root y `1.5 sin(a)`; hair `2 sin(a − π/4)`.
- Walking: root y `−3 abs(sin(πf/4))`; opposing arm swings ±28°, legs ±22°, head tilt ±2°.
- Dash: torso tilt 14°, arms −55°, movement speed 11 u/s for 0.2 s; 0.4 s invulnerability, 0.8 s cooldown.
- Sit: root drops 10 px, legs fold ±50°, snack hand `(70,61)`. After 3 s sitting, add 5 HP/s and 8 CE/s to base regeneration.
- Wave/boop: head 8°, right arm `−125° + 20°sin(2a)`, root x `6 sin(πp)`, hand `(88,62)`.
- Chop/mine: tool rotates −65° to +95°. Impact at frame 4, root shifts +4 px; chop scales `(1.12,0.88)`, mine `(1.12,0.86)`. Mine hop is `−6sin(πp)` px.
- Water: can tilt 35°, hand `(84,78)`, later-phase knee bend +8 px. Three watering interactions grow the crop by 34% each, clamped at 100%; a fourth interaction harvests.
- Unseal: hand `(66,45)`, arm lifts through `−130°sin(πp)`; unveiled face starts at frame 4.
- Casting: Blue left-hand origin `(92,72)`, Red right-hand `(94,66)`, Purple hands `(34,72)` and `(94,72)`. Runtime effects originate relative to the actor and continuous facing vector.
- Hurt/defeat/recovery: −12° recoil with −5px sinusoidal shift; defeat leans to 80° and lowers 10px; recovery reverses an 8px root drop.

## Gameplay events and physics

The simulation runs at 60 Hz. Gathering grants loot once per impact. Loot visuals launch upward, use gravity 24 u/s² and bounce restitution 0.45, then magnetize toward the controlled character. Resource nodes regrow after 30 seconds.

Melee hits occur at 0.0625, 0.25 and 0.375 seconds. Base hit damage is 25. The third hit has a 15% Black Flash chance, 40% during Six Eyes; Black Flash damage is `25^1.35`, restores 30 CE and grants 20 gauge. Other successful melee hits grant 8 gauge and 8 CE.

Blue spawns 3.5 units forward, lasts 2.5 seconds, pulls within 4.5 units with acceleration based on `18/max(0.5,d)^1.2`, and applies ten ticks of 9.6 base damage. Red travels 14 u/s to 6 units and detonates in radius 2.8 for 140 base damage and 1.2s stun. Purple tests a 16-unit forward cylinder of radius 2.2, deals 450 base damage, and harvests trees/crystals in its path.

Infinity scales approaching enemy/projectile speed by `clamp(((d−0.65)/0.95)^3,0,1)`. It drains 15 CE/s, reduced to 3 with Six Eyes, plus 2 CE/s on stopped enemy contact. Six Eyes scales Gojo costs ×0.2, damage ×1.5 and cooldown ×0.5. Survival activation spends a full gauge for 15 seconds, with a 30-second activation-to-activation lockout. Sandbox ignores the gauge requirement. Cosmetic toggles do not grant the buff.

## Character technique mapping

| Hero | Slot 1 | Slot 2 | Ultimate |
|---|---|---|---|
|Gojo|Blue gravity field|Red projectile|Purple beam|
|Yuji|Divergent Fist close strike|Forward lunging strike|Black Flash area barrage|
|Megumi|Divine Dog assist strike|Nue area strike|Chimera Shadow Garden stun field|
|Nobara|Three spread nails|Hairpin area detonation|Resonance area burst|
|Yuta|Rika assist strike|Cursed Speech stun|Rika manifestation burst|
|Maki|Wide sweeping strike|Vaulting area slam|Weapon barrage|

Other heroes use the same pose categories with character-specific effects and weapons. Base technique costs are 45/65/140 CE, cooldowns 4/6/12s, and damage 96/140/450, divided across multiple projectiles when applicable. Non-Gojo specials grant temporary speed/energy focus; Yuta's special heals the party.

## Curses and companions

Fly Head: 60 HP, 3.8 speed, 8 damage. Shadow Lurker: 150 HP, 3.0 speed, 18 damage. Finger Bearer: 650 HP, 2.4 speed, 35 damage, slam/spread orbs. Jogo: 800 HP, fire eruptions. Hanami: 900 HP, rooting hazards. Mahito: 850 HP, lunges. Sukuna: 1100 HP, slash lane.

Every enemy has idle, movement, telegraph, attack, hurt, defeat, and recovery categories in the studio. Telegraphs last 0.6 seconds. Fire/root hazards add a further 0.7-second location warning before impact. Companions follow the controlled hero, avoid nearby telegraphs, and autonomously use melee and their first two techniques. Ultimates are player-commanded by switching control.

## Regions and travel

Jujutsu High, Whispering Shrine, Tokyo Backstreets, Shibuya, and the Cursed Domain contain nine named checkpoints. Their IDs and exact coordinates are in `data.js` and the studio's complete bible export. Travel requires an attuned destination, an unlocked region, no boss seal, and eight seconds since hostile damage. Rest heals and sets the defeat return point; teleport preserves health, energy and cooldowns.

Sandbox opens all destinations. Survival opens Tokyo after three harvests, Shibuya after three Tokyo exorcisms, and the domain after both Shibuya checkpoints are attuned. A 180-second cycle covers 24 in-game hours. Night is 18:00–06:00. Midnight bosses rotate; dawn purifies remaining enemies and levels the active party.
