# Jujutsu Valley · Poster-Style Sprite Bible v3

## Art standard

The battle poster is the visual reference for the current roster. Version 3 replaces the earlier low-resolution block figures with detailed chibi artwork: expressive eyes, layered hair, substantial two-head-tall bodies, textured uniforms, recognizable weapons, and clean transparent silhouettes. The world and HUD remain pixelated; characters use detailed 128-pixel cells.

Forty-six normalized model views are indexed in `art/characters/manifest.json`: front, back, profile and combat stances for six heroes; six additional Gojo headgear views; front/attack views for the main curses; and Rika, Panda, Divine Dog and Nue. Original model sheets are downloadable in `art/model-sheets/`. The poster is `art/battle-poster.webp`.

The official visual guides consulted were the [TV anime character catalogue](https://jujutsukaisen.jp/character/index_1st.php), [disaster curse catalogue](https://jujutsukaisen.jp/character/category4.php), and [Jujutsu Kaisen 0 catalogue](https://jujutsukaisen-movie.jp/character/). The game uses original generated interpretations rather than extracted anime frames. The current playable catalogue is Gojo, Yuji, Megumi, Nobara, Yuta and Maki.

| Character | Distinctive design |
|---|---|
|Gojo|Lavender-white textured spikes, plum high collar, black blindfold, round shades, luminous cyan Six Eyes|
|Yuji|Short pink spikes, dark undercut, red hood, navy uniform and red trainers|
|Megumi|Black starburst hair, green eyes, navy high collar and shadow techniques|
|Nobara|Auburn side-parted bob, amber eyes, brass uniform buttons, skirt, stockings and hammer|
|Yuta|Tousled black hair, white jacket, dark trousers and katana strap|
|Maki|Green high ponytail, rectangular glasses, navy uniform and long polearm|
|Jogo / Hanami|Volcanic single eye and spotted shawl / bark skin, branch eyes and red botanical shoulder|
|Mahito / Sukuna|Long blue-grey hair and facial stitches / pink hair, dark markings and white robe|

## Atlas and animation contract

Each cell is 128 × 128, with foot anchor `(64,116)`. Source views fit a 114 × 108 bounding area. The master atlas is 8 columns × 18 rows, 1024 × 2304. Six supplemental rows use 1024 × 768. North and east have their own source artwork; west mirrors the profile. Signature combat stances face the camera for readability while gameplay collision follows the continuous world-facing vector.

There are 64 hero sheets including directions, Gojo variants and supplemental clips, plus seven enemy sheets: 71 sheets and 5,256 exported animation frames. `atlases/manifest.json` indexes the PNGs and matching metadata. Every sheet now declares `style: poster-chibi-pixel`, `version: 3`, and `nativeGrid: 128`.

| Row | Animation | Frames | FPS | Active frames, 1-based |
|---|---|---:|---:|---|
|1–3|Idle south / north / side|6 / 4 / 6|8 / 6 / 8|—|
|4–6|Walk south / north / side|8|12|—|
|7|Dash|6|16|—|
|8|Sit and snack|6|6|—|
|9|Wave / boop|6|10|—|
|10|Chop|6|12|4|
|11|Mine|6|12|4|
|12|Water / forage|6|10|4|
|13|Unseal / special|8|14|—|
|14|Three-hit melee|8|16|2, 5, 7|
|15|Technique 1|6|12|4|
|16|Technique 2|6|12|4|
|17|Ultimate|8|12|6|
|18|Guard / Infinity|4|10|—|

Supplemental clips: hurt 4@12, defeat 6@8, recovery 6@10, checkpoint 6@10, teleport 8@12, headgear transition 6@12. Enemies expose idle, walk, telegraph, attack, hurt, defeat and recovery.

The detailed model artwork is composited into procedural animation, rather than claiming thousands of independently illustrated drawings. Walks articulate the lower legs and bob the body; dashes lean, attacks use authored combat stances, damage recoils, sitting compresses the silhouette, and defeat falls within the cell. Tools, resource effects and cast timing share the simulation pose contract. Integer placement and nearest-neighbor sampling preserve the artwork; exported alpha is binary to avoid background halos.

Frame duration is `1/FPS`; clip duration is `frames/FPS`; atlas position is `(column×128,row×128)`. Pose metadata includes root offset, rotations, hand/tool/projectile anchors, hurtbox, active hitbox and impact event. Runtime simulation uses 60 Hz. Melee hits occur at 0.0625, 0.25 and 0.375 seconds; standard casts release at 0.25 seconds and ultimates at 5/12 seconds.

## Skill icons and cinematics

`skill-atlas.png` and `skill-atlas.json` contain 26 original pixel icons: four commands per hero and two utilities. Gojo has Blue, Red, Purple and Six Eyes; Yuji has fists, lunge and Black Flash; Megumi has Divine Dog, Nue and shadows; Nobara has nails, Hairpin and a straw doll; Yuta has katana, speech, Rika and healing; Maki has polearm, slam and arsenal designs.

Ultimate cutscenes layer the same detailed hero, enemy and summon artwork over pixel scenery. Charging precedes the simulation release event, followed by a hero-specific beam, barrage, shadow field, nail resonance, Rika strike or weapon sweep. Movement, particles and foreground layers create 2.5D depth without a 3D world. Reduced-motion preferences remove the strongest motion and flash.

## Combat and progression

Hero HP is `500+25×level`, CE (mana) is `300+20×level`, and damage is `baseDamage×(1+0.08×(level−1))`. XP to the next level is `80+40×level`. The active squad shares kill experience. Basic attacks, dashes, immunity frames, CE costs, regeneration, cooldowns, stuns, roots, Infinity and awakening are functional simulation mechanics.

Survival encounter level is the highest active hero level, plus one for bosses. Stats are fixed when an enemy spawns. Normal HP scales by 12% per level and boss HP by 16%; damage scales by 7% and 9% respectively. Sandbox retains base enemy stats. A normal curse does not become a boss merely because its scaled HP exceeds 500.

| Curse | Base HP | Base damage | Base CE | CE / second | Technique cost |
|---|---:|---:|---:|---:|---:|
|Fly Head|60|8|40|4|14|
|Shadow Lurker|150|18|90|6|24|
|Finger Bearer|650|35|180|9|36|
|Jogo|800|35|220|10|48|
|Hanami|900|32|240|10|52|
|Mahito|850|30|200|12|42|
|Sukuna|1100|40|300|14|70|

Enemy CE capacity gains 8 per encounter level, regeneration gains 0.25 and technique cost gains 2. A technique reserves its CE once at telegraph startup. With insufficient CE, the enemy closes to melee and uses a weaker zero-cost basic attack while regenerating. Bosses enter phase two at half HP: 15% more speed, 10% more damage, a one-time 25% CE refill and a shorter attack cooldown. HP and CE bars are visible above all enemies; the boss HUD also shows numeric values, level and phase.

Gojo retains the original Blue/Red/Purple costs and base damage. Blue ticks ten times for 96 total base damage; Red deals 140 and stuns; Purple deals 450 along its forward corridor and harvests resources. Six Eyes modifies cost ×0.2, damage ×1.5 and cooldown ×0.5 for Gojo's techniques.

## Survival campaign and travel

The journal tracks ten prerequisite-linked quests with one-time rewards. Five named hunts target Finger Bearer, Jogo, Hanami, Mahito and Sukuna. Objectives cover attuning checkpoints, gathering, lantern upgrades, regional exorcisms and boss kills. Claiming campaign rewards unlocks Tokyo, Shibuya and the domain. Existing saves gain the journal without losing their prior unlocks.

The single map control is the minimap; keyboard M also opens it. Red points show living curses in the current loaded region, with a larger outlined marker for bosses. The region preview uses actual terrain and entity positions. Unloaded regions do not invent enemy locations.

Teleportation uses shared region collision footprints, separate safe squad positions and immediate camera alignment. Combat blocks teleport for eight seconds after hostile damage; boss encounters seal travel until resolved. Sandbox and Survival retain separate browser-local saves and are chosen on a minimal pixel title menu after an animated poster loading sequence.

## Character motion refinement

`animation-profiles.js` defines stride, bounce, sway, breathing, attack follow-through and tempo for all six heroes, seven enemies and four companions/summons. Maki now has articulated steps as well. Walk legs pivot at the shared hip, interaction bodies reach toward tools, idle breathing stays grounded, and attacks use each character's authored combat art with distinct anticipation/recoil. Enemy animation clocks restart on state changes; hurt and telegraph poses interrupt locomotion. Summons and boop reactions animate their own frames. The 71 exported sheets include these profiles and match runtime rendering.

## Radial techniques and progression

Each hero has three independently upgraded techniques. Rank 0/1/2/3 releases 4/6/8/10 equally spaced echoes around the facing angle. Upgrades require levels 3/6/10 and one skill point each. Points equal `level - 1 - sum(ranks)`; existing saves gain their earned points automatically. Per rank: +15% technique damage, +0.6 world-unit echo range, +8% CE cost. Existing hero-level damage scaling still applies. The signature effect carries 65% of cast damage; the radial echo carries 35%. A shared per-cast hit set prevents ten overlapping echoes hitting one enemy ten times. Each ultimate cinematic shows the current direction count with radial particles and motion trails.

## Location atlas and artifacts

One map control opens World / Location tabs. Local maps show terrain, collision footprints, numbered gold artifacts, attuned and unvisited checkpoints, exits, the squad, red curses and outlined bosses. World nodes show region connectivity and artifact progress. Fifteen artifacts (three in every region) sit on validated walkable tiles; interact to collect gems and squad XP once. Collection and technique ranks persist independently in Sandbox and Survival saves.

## Authored character actions

`character-actions.js` defines separate head, torso, left arm, right arm, leg, lean and root channels. Gojo uses a floating finger cast; Yuji alternates boxing punches; Megumi brings his hands together; Nobara snaps her hammer; Yuta draws into a sword strike; Maki rotates through a broad weapon sweep. Each hero has distinct walk and interaction curves, including waves, mining, chopping, watering and checkpoint gestures. Enemy attack accents include Jogo's eruption, Hanami's roots, Mahito's elastic reach, Sukuna's crossed slashes, wing beats and claw trails. The sprite studio and exported sheets use the same renderer.
