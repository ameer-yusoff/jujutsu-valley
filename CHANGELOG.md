# Updates

## Teleport reliability and Jujutsu HUD

- City checkpoints now sit in open plazas. Teleportation uses shared map collision footprints, finds separate safe positions for every squad member, and snaps the camera to the arrival point.
- Loading an existing save repairs squad positions trapped in buildings without resetting inventory, stats, cooldowns, or checkpoint discoveries.
- The clock displays whole hours (`8:00`, `9:00`, and onward). Fractional time and day/night events continue in the background.
- Added an indigo-and-cyan Jujutsu Valley HUD, a Gojo-inspired Six Eyes emblem, browser/home-screen icons, compact mobile squad cards, a collapsible objective, and an accurate terrain minimap.
- Character Actions provides touch access to headgear, Infinity, and resting. Ultimate cut-ins remain available in Settings.
- Browser regression checks cover all nine destinations, escape movement, atlas exports, and 390×844, 360×800, and 844×390 mobile viewports.

## Poster-style roster and Survival campaign

- Replaced the blocky roster with detailed poster-matched chibi model artwork, 46 source views, 71 rebuilt animated sheets and a new sprite bible.
- Added battle-poster mode selection and a four-step onboarding guide; each mode preserves its own save.
- Added a ten-quest Survival campaign, claimable rewards, regional unlocks and five named boss hunts.
- Added enemy HP/CE systems, resource costs and fallback attacks, shared XP, level-based hero damage, Survival encounter scaling and second-phase bosses.
- Removed the duplicate map control. Red markers now show curses and bosses on the minimap and detailed region map.
- Added 26 individual pixel skill icons, pixel interface typography and hero-specific layered ultimate cinematics.

## Minimal title and fullscreen play

- Moved the battle poster to a short animated loading sequence with artwork-loading progress.
- Simplified the title screen to the game mark and two saved-mode choices.
- Removed the full-width game header; kept compact region, hour and settings controls.
- Reduced persistent tools to Quests and Actions; Studio and Rest remain available inside Actions.
- Verified desktop, both portrait phone sizes and mobile landscape with animated-loading and no-header checks.

## Radial mastery and field atlas
- Added three skill-tree branches per hero, earned level points, and 4/6/8/10-direction technique echoes with bounded per-target damage.
- Added a local map tab, artifact markers, region collection counts and fifteen persistent collectible relics.
- Refined all hero/enemy motion profiles, articulated Maki's walk, animated summons and pets, and enhanced ultimate trails and radial particles.
- Rebuilt all 71 sprite sheets and recorded motion profiles in their metadata.

## Authored character action pass
- Replaced shared hero body animation with independent joint channels and character-specific movement, interaction and combat curves.
- Added signature hammer, casting, punch, shadow, weapon, flame, root, wing and claw accents.
- Rebuilt sprite atlases with action-style metadata and added distinctness/finite-pose checks.

## Animation quality pass
- Added phase-offset follow-through and removed duplicate enemy walking frames.
- Replaced frozen ultimate poses with staged action, animated summons and recovery.
- Added rendered-frame duplicate auditing across 4,040 hero/enemy frames.

## Research-led animation timing
- Added a primary-source research report and production recommendations.
- Applied variable pose timing to heroes, enemies, cinematics, sprite studio and exported frame metadata.
- Clamped one-shot clips, preserved harvesting/cast contact times, and added short visual impact holds.
- Reduced extreme joint rotation that separated sprite layers.

## New full-body drawn animation library
- Added new character pose sheets following the existing designs for six heroes and eleven curses, bosses and companions.
- Replaced procedural limb deformation with source-cell playback for movement, combat, casting and interactions.
- Added dedicated side walks, distance-driven walk playback, eight-frame hero clips and an interactive frame inspector.
- Retained original generated sheets and normalized transparent cells, including corrected Maki artwork.

## Side walking, front idle and sharper graphics
- Replaced side-walk artwork with visible passing steps for all six heroes.
- Restore a front-facing idle when movement stops.
- Build 192px detail variants directly from source drawings and render the world at device pixel density.
- Correct pointer projection for the sharper canvas and retain the same world scale.
- Add regression checks for walk frame progression, foot silhouettes, idle direction and detail resolution.

## Sprite contamination and clipping repairs
- Replace uniform fallback cropping with complete-silhouette extraction and separation of touching figures.
- Restore Gojo's boots and remove neighboring feet above Yuta.
- Add isolated side-walk sources and replace additional crowded or malformed action poses found during review.
- Rebuild standard/detail sheets and sprite exports with source provenance and regression checks.

## Stable sprite bodies and Maki’s weapon

- Added armed Maki idle frames and mapped her techniques to polearm poses.
- Replaced silhouette fitting with fixed body calibration per animation sequence across all 17 drawn actors. Wide weapons no longer shrink the character.
- Packed detail artwork into a larger safety viewport, preserving world presentation and full defeat frames. Rebuilt all 71 compatibility exports.
- Centralized the fixed hero ground collision radius and removed misleading inferred hand markers from Studio metadata.
- Added frame-bound, scale, weapon-presence and real collision regression checks; versioned assets to bypass older cached sheets.

## Solo Survival, signature mastery and mobile combat controls

- Replaced AI party followers with a persistent six-sorcerer collection and one deployed hero. Survival quest seals unlock the roster; old ownership, levels and saves are preserved.
- Added committed three-hit Survival combos, interruptible contacts, timed dodges, combat recovery rules, directional windups and visible stagger breaks. Dawn no longer grants free Survival levels.
- Strengthened skill ranks with damage, cooldown, energy efficiency, break pressure and hero-specific control, healing, barrier, exposure and projectile effects.
- Arranged Attack/Interact, skills 1–3 and Dash (4) in a mobile MOBA arc. Moved awakening to Actions/R, added a skill-tree shortcut, and enlarged the vertical pixel resource pouch.
- Added simulation coverage for solo migration, collection, combos, cancellation, stagger, mastery effects and recovery; browser coverage checks controls, contextual switching, collection and skill trees at four screen sizes.
