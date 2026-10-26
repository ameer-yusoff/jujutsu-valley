# Jujutsu Valley · Beyond the Curtain

A browser-based, single-player chibi fan game inspired by Jujutsu Kaisen. Built with a 2D pixel-art Canvas world, 2D character artwork, and layered 2.5D ultimate cut-ins based on the supplied Gojo reference.

Run `npm start` and open http://localhost:3000. No dependency install is required. `npm test` runs deterministic simulation tests. Browser QA scripts use the environment's installed Playwright and Chromium.

Six playable heroes, two AI companions, five regions, nine teleport checkpoints, separate Sandbox/Survival saves, daytime gathering, lantern upgrades, nighttime encounters, five rotating bosses, 2D characters and cinematic ultimate cut-ins, mobile touch controls, and a sprite inspector with PNG/JSON exports.

The original brief is in `dist/original-bible.md`; the implementation bible is in `dist/sprite-bible.md`. Prebaked character atlases and matching frame metadata are indexed in `dist/atlases/manifest.json`. All 18 original Gojo rows are included; six supplemental rows contain damage, defeat, recovery, checkpoint, teleport, and headgear transitions.

Controls: WASD/arrows move, Shift dash, E/Space interact/melee, 1/2/3 abilities, R special, Q Infinity (Gojo), V cosmetics, X sit/snack, Z/C/F switch party heroes, M map, P party, B studio. Mobile has a virtual stick, action buttons, portrait switching, and target assistance.

Save data remains in browser localStorage. The Settings menu exports a portable JSON backup. Sandbox and Survival have independent saves. Browser emulation validates touch layouts; physical-device performance remains device-dependent.

The HUD uses an indigo/cyan Jujutsu theme and displays whole in-game hours. Mobile Character Actions includes Infinity and headgear controls. Teleport arrivals and save recovery share collision rules with the map. See [CHANGELOG.md](CHANGELOG.md) for the latest fixes.
