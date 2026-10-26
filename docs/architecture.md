# Architecture and art direction

The game is a buildless browser application served from `dist/`. Gameplay uses a 60 Hz simulation; drawing uses Canvas 2D at up to 30 FPS. No WebGL context is required.

`engine.js` owns gameplay state, combat, the three-person party, progression, region travel and save serialization. `data.js` defines heroes, techniques, animation clips, regions and checkpoints. `pose.js` provides deterministic poses and frame metadata. `navigation.js` shares building and pond footprints between rendering, safe party arrivals, and legacy save repair. `format.js` formats whole HUD hours while the simulation retains fractional time.

`sprites.js` draws 2D characters and enemies and bakes their sheets. `world.js` draws the pixel-art environment, depth-sorts characters and props, and projects world coordinates into the scrolling 2D map. `ui.js` owns menus, the world map, party management and sprite inspection. `game.js` connects simulation, input, rendering, audio, browser storage and layered ultimate cut-ins.

The final art direction is a Stardew Valley / Pony Town inspired 2D background, illustrated 2D chibi characters based on the supplied Gojo reference, and 2.5D parallax only during short ultimate/awakening cut-ins. Three.js remains vendored for lightweight scene objects used by effects; it does not render a 3D world.

Sandbox and Survival have independent browser-local saves. GitHub contains source and prebaked assets; the private playable Site is published separately.

The HUD uses dark indigo surfaces and cyan cursed-energy accents. On mobile, compact squad cards and a collapsed objective preserve the central play area. The minimap draws from the current terrain rather than a generic layout. Browser icons and a home-screen manifest share the Six Eyes emblem.

## Poster-style roster, quests and combat

The version 3 roster is loaded by `character-art.js` from 46 normalized poster-derived model views. `sprites.js` composites them into the original atlas contract and the studio exports. Model sheets and the poster are included in `dist/art/`; source assets are cached before the title screen starts. The previous 32-pixel block roster is replaced.

`quests.js` owns campaign prerequisites, objective counters and one-time reward claims. `combat.js` owns damage growth, encounter scaling, XP thresholds and the seven enemy CE profiles. Enemies reserve energy at attack startup and fall back to basic melee when insufficient. `map-markers.js` shares red enemy markers between the minimap and region preview. `skill-icons.js` supplies per-character pixel commands, and `cinematics.js` synchronizes their layered cutscenes with ultimate release events.

The title screen pauses simulation and offers separate saved Sandbox/Survival adventures. A four-step guide is shown once. Pixelify Sans is served locally with its OFL license. Browser tests cover the title screen, quest claims, a named hunt, enemy CE, red markers, changing ultimate frames, save reload and mobile viewports.

The poster now belongs to a short animated boot sequence with real artwork-loading progress. Mode selection uses a quiet pixel menu. The full-width game header is removed; region, clock, and settings are compact HUD elements. Studio and rest commands remain available through Actions (and their keyboard shortcuts).
