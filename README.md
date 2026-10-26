# Jujutsu Valley · Beyond the Curtain

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-55%20Passing-brightgreen.svg)](tests/)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Mobile%20%7C%20Desktop-orange.svg)](#controls)
[![Buildless](https://img.shields.io/badge/Stack-Pure%20HTML5%20Canvas%20%2F%20ES%20Modules-cyan.svg)](dist/)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel%20Ready-black.svg?logo=vercel)](https://vercel.com)

A fast, lightweight, buildless browser-based single-player chibi action RPG inspired by **Jujutsu Kaisen**. Combines cozy retro 2D pixel-art exploration (inspired by *Stardew Valley* and *Pony Town*) with high-stakes Jujutsu sorcery combat and cinematic 2.5D ultimate cut-ins.

---

## 🌟 Highlights & Features

- **🥋 6 Playable Sorcerers:** Satoru Gojo, Yuji Itadori, Megumi Fushiguro, Nobara Kugisaki, Yuta Okkotsu, and Maki Zen'in — each with unique animated sprite sheets, distinct curves, combat hitboxes, and signature cursed techniques.
- **⚔️ Dynamic Combat System:**
  - 3-hit committed basic combos with directional windups.
  - Timed dodges and cancelable attacks.
  - Break and poise stagger bars for interrupts and damage vulnerability windows.
  - 3 independent skill-tree branches per sorcerer with radial mastery upgrades.
  - Cinematic 2.5D layered awakening / ultimate cut-ins (including Gojo's *Hollow Purple* and *Infinity* barrier).
- **🗺️ Expansive 2D World & Exploration:**
  - 5 explorable regions: *Tokyo Jujutsu High*, *Sendai Outskirts*, *Shibuya District*, *Cursed Grove*, and *Cursed Domain*.
  - 9 interactive teleport checkpoints with collision safeguards.
  - Dynamic day/night cycle with whole-hour clock (`8:00`, `9:00`, night onset at `18:00`).
  - Daytime resource gathering (Spirit Wood, Cursed Crystals, Kikufuku Herbs, Cursed Gems) and lantern upgrades.
- **🎮 Dual Game Modes & Local Saves:**
  - **Solo Survival Campaign:** Deploy 1 sorcerer at a time, complete a 10-quest story arc, hunt 5 Special Grade bosses, unlock new heroes via Quest Seals, and manage cursed energy and level scaling.
  - **Sandbox Mode:** Unrestricted exploration, free testing, and instant experimentation.
  - Independent save slots stored in browser `localStorage` with portable JSON backup/restore in Settings.
- **📱 Responsive & Mobile-Ready:**
  - Mobile MOBA-style radial action arc (Attack, Skills 1–3, Dash, and Awakening).
  - Virtual floating joystick with smart target assistance.
  - Desktop keyboard controls and high-DPI canvas rendering.
- **⚡ Zero Build Step:** Pure Vanilla JavaScript (ES Modules), HTML5 Canvas 2D, and CSS3. Instant local serving without Webpack, Vite, or bundle overhead.

---

## 🕹️ Controls

| Action | Desktop Keyboard | Mobile Touch Interface |
| :--- | :--- | :--- |
| **Movement** | `W`, `A`, `S`, `D` or Arrow Keys | Virtual Joystick (drag bottom-left) |
| **Basic Attack / Interact** | `E` or `Space` | Attack / Interact Button (center arc) |
| **Dash / Dodge** | `Shift` | Dash Button (`4`) |
| **Skill 1** | `1` (e.g. Gojo's *Lapis Blue*) | Skill Button `1` |
| **Skill 2** | `2` (e.g. Gojo's *Cursed Technique Reversal: Red*) | Skill Button `2` |
| **Skill 3** | `3` (e.g. Gojo's *Hollow Purple*) | Skill Button `3` |
| **Ultimate / Awakening** | `R` (Special) | Actions Menu / Awakening Button |
| **Infinity Barrier (Gojo)** | `Q` | Character Actions Menu |
| **Cosmetics / Headgear** | `V` | Character Actions Menu |
| **Sit & Rest (Snack)** | `X` | Rest Button in Side Tools |
| **Open World Map** | `M` | Minimap HUD Button |
| **Sorcerer Collection** | `P` | Collection Button |
| **Quest Journal** | `J` | Quests Button in Side Tools |
| **Animation Studio** | `B` | Studio Button in Side Tools |

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (version 20 or higher recommended) **or** Python 3.

### 1. Clone the repository
```bash
git clone https://github.com/ameer-yusoff/jujutsu-valley.git
cd jujutsu-valley
```

### 2. Start the local server
Run the development server using npm:
```bash
npm start
```
*Alternatively, you can serve the `dist/` directory using any static file server:*
```bash
# Using Python
python3 -m http.server 3000 --directory dist

# Or using npx serve
npx serve dist
```

Open your browser at **`http://localhost:3000`**.

### 3. Run Simulation & Asset Tests
The project includes 55 deterministic unit and simulation tests (covering combat math, atlas metadata, collision bounds, quest flows, and navigation):
```bash
npm test
```

---

## 🌐 Deploying to Vercel

The game is ready for zero-config deployment on **[Vercel](https://vercel.com)** thanks to the pre-configured [`vercel.json`](vercel.json).

### Method 1: Deploy via Vercel Web Dashboard (Recommended)

1. Push your repository to GitHub (or use your existing fork/repo `ameer-yusoff/jujutsu-valley`).
2. Log in to [Vercel](https://vercel.com) and click **"Add New..."** → **"Project"**.
3. Select your repository `jujutsu-valley` and click **"Import"**.
4. In the Project Configuration:
   - **Framework Preset**: Select **Other**.
   - **Root Directory**: Leave as `./` (the root directory), as [`vercel.json`](vercel.json) handles serving the `dist` folder automatically.
     *(If you are not using `vercel.json`, you can alternatively set **Root Directory** to `dist` or **Output Directory** to `dist`)*.
   - **Build & Development Settings**: No build command required.
5. Click **"Deploy"**.
6. Within seconds, your game will be live with a production HTTPS URL (e.g., `https://jujutsu-valley.vercel.app`)!

### Method 2: Deploy via Vercel CLI

1. Install the Vercel CLI globally (or use `npx`):
   ```bash
   npm i -g vercel
   ```
2. In the project root directory, run:
   ```bash
   vercel
   ```
3. Follow the prompts in your terminal:
   - *Set up and deploy?* **`Y`**
   - *Which scope?* Select your account/team.
   - *Link to existing project?* **`N`** (or select if already created).
   - *What's your project's name?* `jujutsu-valley`
   - *In which directory is your code located?* `./`
4. To deploy directly to production:
   ```bash
   vercel --prod
   ```

---

## 📁 Repository Structure

```text
jujutsu-valley/
├── dist/                         # Main game assets and playable web application
│   ├── index.html                # Game entry point and HUD interface
│   ├── game.js                   # Game orchestrator (audio, input, cutscenes, loop)
│   ├── engine.js                 # Simulation engine, collision, state, and travel
│   ├── combat.js                 # Combat calculations, damage scaling, XP, enemy CE
│   ├── progression.js            # Skill trees, radial mastery, stat gates
│   ├── quests.js                 # Survival quests, objectives, and seal rewards
│   ├── world.js                  # 2D tilemap rendering, depth sorting, lighting
│   ├── sprites.js                # Character rendering and animation atlas playback
│   ├── ui.js                     # Menu system, minimap, inventory, and HUD
│   ├── style.css                 # Dark indigo/cyan Jujutsu UI design system
│   ├── art/                      # Battle poster, model source views, UI icons
│   ├── atlases/                  # Prebaked character sprite atlases and manifests
│   └── fonts/                    # Pixelify Sans font files (OFL)
├── docs/                         # Technical documentation and game bibles
│   ├── architecture.md           # Engine design and art direction overview
│   ├── sprite-bible.md           # Implementation bible, frame specs, and combat rules
│   └── animation-research.md     # Animation curve and timing specifications
├── tests/                        # Deterministic simulation, combat, and QA tests
├── tools/                        # Python asset-pipeline tools (art extraction, packing)
├── .github/workflows/ci.yml      # GitHub Actions CI syntax & test pipeline
├── package.json                  # Scripts (start, test)
├── vercel.json                   # Vercel deployment routing configuration
├── LICENSE                       # MIT Open Source License
└── README.md                     # Project documentation
```

---

## 📖 In-Depth Documentation

For contributors and developers looking to modify the game mechanics, consult the documentation in [`docs/`](docs/):
- [Architecture & Art Direction](docs/architecture.md): Game engine loop, state machine, rendering pipeline.
- [Sprite & Gameplay Bible](docs/sprite-bible.md): Character coordinates, animation states, and Solo Survival combat rules.
- [Animation Research](docs/animation-research.md): Variable timing and motion curve analysis.
- [Changelog](CHANGELOG.md): History of version updates, balance passes, and bug fixes.

---

## ⚖️ License & Disclaimer

### License
This codebase is distributed under the terms of the [MIT License](LICENSE).

### Fair Use & Fan Game Disclaimer
*Jujutsu Valley* is an unofficial, non-commercial fan-made game created for educational and entertainment purposes. *Jujutsu Kaisen*, its characters, themes, and names are the intellectual property and copyright of **Gege Akutami**, **Shueisha**, and **MAPPA**. No copyright infringement is intended.
