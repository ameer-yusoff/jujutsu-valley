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
