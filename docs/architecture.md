# Architecture and art direction

The game is a buildless browser application served from `dist/`. Gameplay uses a 60 Hz simulation; drawing uses Canvas 2D at up to 30 FPS. No WebGL context is required.

`engine.js` owns gameplay state, combat, the three-person party, progression, region travel and save serialization. `data.js` defines heroes, techniques, animation clips, regions and checkpoints. `pose.js` provides deterministic poses and frame metadata.

`sprites.js` draws 2D characters and enemies and bakes their sheets. `world.js` draws the pixel-art environment, depth-sorts characters and props, and projects world coordinates into the scrolling 2D map. `ui.js` owns menus, the world map, party management and sprite inspection. `game.js` connects simulation, input, rendering, audio, browser storage and layered ultimate cut-ins.

The final art direction is a Stardew Valley / Pony Town inspired 2D background, illustrated 2D chibi characters based on the supplied Gojo reference, and 2.5D parallax only during short ultimate/awakening cut-ins. Three.js remains vendored for lightweight scene objects used by effects; it does not render a 3D world.

Sandbox and Survival have independent browser-local saves. GitHub contains source and prebaked assets; the private playable Site is published separately.
