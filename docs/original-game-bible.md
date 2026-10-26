# Chibi World: Game Design Plan & Sprite Map Bible (JJK $\times$ Cozy Hybrid Edition)

---

## 1. Character Visual Profile & State Machine (Satoru Gojo Chibi)

Our protagonist is a **2-head-tall ($1:1$ head-to-body ratio) stylized chibi** of **Satoru Gojo**. The character operates on a **3-State Headgear & Power Visual System**, defaulting to his iconic covered eyes during normal exploration and unveiling the luminous **Six Eyes** (from your reference image) during **Max Power / Awakened Mode**.

### 1.1 Proportions & Silhouette Constants
* **Total Sprite Cell Canvas:** $128 \times 128\text{ px}$ with ground pivot anchor at $(x_0, y_0) = (64, 116)$.
* **Standing Character Height:** $H_{\text{char}} = 96\text{ px}$ (Head $= 50\text{ px}$ [$52\%$], Torso $= 28\text{ px}$ [$29\%$], Legs/Shoes $= 18\text{ px}$ [$19\%$]).
* **Outline Weight:** Uniform crisp ink stroke of $w_{\text{ink}} = 3.5\text{ px}$ in 2D canvas space (and $0.035\text{ units}$ inverted-hull extrusion in 3D space).

### 1.2 The 3-State Eye & Headgear System
| Visual State | Trigger Condition | Hair Geometry | Eye / Face Layer | Aura & Particle VFX |
| :--- | :--- | :--- | :--- | :--- |
| **State A: Blindfold Mode (Default 1)** | Default spawn / Normal state (Toggleable with `[V]`) | Spikes swept sharply upward (`y_offset = -3 px`) held up by the wrap | Pitch-black cloth wrap (`#141218`) with subtle fold line (`#2B2635`) covering eye region $y \in [38, 52]$ | Calm, zero ambient particle drain |
| **State B: Sunglasses Mode (Default 2)** | Casual exploration toggle (`[V]` key) | Relaxed fluffy outward spikes & jagged bangs (matches reference photo hair) | Tiny dark circular frames (`#0E0C12`) with indigo reflective sheen (`#322B47`) resting at $y = 46$ | Faint cyan glint peeking behind frames when Cursed Energy $\ge 80\%$ |
| **State C: Six-Eyes Unsealed (Max Power)** | Activated via **Awakening (`[R]` key)** or Ultimate cast | Gravity-defying floating spikes (`sin(t * 6) * 2 px` upward levitation) | **Full Reference Image Eyes:** Vibrant Sky Cyan (`#52B2CF`) + Luminous Aqua (`#BDF0FF`) + glowing white catchlights | Trailing cyan/white starlight wisps, crackling blue infinity sparks, ground distortion ring |

### 1.3 Master Color Palette (Day, Night & Cursed Energy)
| Element | Base Hex | Shadow / Secondary Hex | Highlight / Emission Hex |
| :--- | :--- | :--- | :--- |
| **Fluffy Spiky Hair** | `#F2EFF8` (Soft Lavender-White) | `#D9D2E6` (Cool Lilac Grey) | `#FFFFFF` (Pure Crisp White) |
| **Blindfold / Shades** | `#141218` (Cursed Ink Black) | `#09080C` (Deep Void Black) | `#3A3347` (Cloth Rim / Lens Specular) |
| **Six-Eyes Iris (Max Power)** | `#52B2CF` (Vibrant Sky Cyan) | `#2C6E8F` (Deep Cerulean) | `#BDF0FF` (Luminous Six-Eyes Glow) |
| **Skin Tone** | `#FFE6D0` (Warm Peach) | `#F0C6A8` (Soft Apricot Blush) | `#FFF3E8` (Forehead/Cheek Glow) |
| **Jujutsu High Jacket** | `#4E4459` (Muted Plum-Charcoal) | `#383040` (Deep Slate Purple) | `#675B75` (Moonlight Rim Light) |
| **Trousers & Shoes** | `#483E52` / `#18161C` | `#312A38` / `#0D0C10` | `#5C5069` / `#4A4654` |
| **Cursed Energy (Blue / Infinity)** | `#00B4FF` (Lapse Blue Core) | `#0051A8` (Deep Gravity Indigo) | `#E0F8FF` (White-Hot Cyan Core) |
| **Cursed Reversal (Red)** | `#FF2A55` (Crimson Reversal) | `#8F0024` (Deep Blood Carmine) | `#FFD1DC` (Explosive Pink Core) |
| **Hollow Purple (Ultimate)** | `#A832FF` (Imaginary Mass Violet) | `#4B0082` (Void Indigo) | `#F3E0FF` (Singularity White-Violet) |

---

## 2. Locked Hybrid 3D / 2.5D Engine Architecture

As confirmed, the application will run a **Real-Time Dual-Mode Hybrid Engine** inside a cozy-yet-mystical 3D diorama world:

1. **Mode 1: True 3D Cel-Shaded Chibi (`3D Mesh Mode`):**
   * Constructed with procedural Three.js geometry: a sphere-lathed cranium, $18$ radial curved cone hair spikes, a flared cylinder high-collar Jujutsu uniform jacket, stubby articulated capsules for arms/legs, plus 3D toggleable meshes for the **Blindfold Wrap**, **Mini Round Sunglasses**, and **2D Canvas-Mapped Six-Eyes**.
   * Rendered with a custom 2-band stepped Toon Shader and an inverted-hull black outline mesh ($w = 0.035$).
2. **Mode 2: 2.5D HD Billboard Sprite (`2.5D Paper/Cult Mode`):**
   * Mounts the live-rendered $128 \times 128\text{ px}$ Master Sprite Atlas onto a camera-facing 3D quad with alpha-cutout shadow casting, matching the uploaded 2D illustration $100\%$.
3. **Mode 3: Interactive Sprite Map Bible Studio (`Atlas Inspector Overlay`):**
   * A dedicated UI drawer where you can view all $18$ rows of the generated sprite sheet, scrub frame-by-frame, toggle Blindfold/Sunglasses/Six-Eyes across the entire sheet, inspect hitbox/anchor vectors, and export the PNG sprite map.

---

## 3. Expanded Master Sprite Map & Animation Bible ($18\text{ Rows}$)

To support both **Daytime Cozy Grinding** (*Stardew Valley* $\times$ *Pony Town*) and **Nighttime Cursed Spirit Combat** (*Jujutsu Kaisen*), the Master Sprite Atlas is expanded to **$8\text{ Columns} \times 18\text{ Rows}$** ($1024 \times 2304\text{ px}$ total resolution).

### 3.1 Complete 18-Row Animation Matrix

| Row | Animation ID | Category | Frames | FPS | Calculated Motion & Pose Kinematics |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **01** | `IDLE_SOUTH` | Core | $6$ | $8$ | Chest breathes $\Delta y = \pm 1.5\text{ px}$; hair spikes bob $\Delta y = \pm 2\text{ px}$ with $\pi/4$ phase lag; blink on frames $5\text{--}6$. |
| **02** | `IDLE_NORTH` | Core | $4$ | $6$ | Back view; high collar and rear spiky hair tufts sway $\Delta y = \pm 1.5\text{ px}$. |
| **03** | `IDLE_SIDE` | Core | $6$ | $8$ | $3/4$ profile view; gentle breathing bob + nose/ear parallax shift of $1\text{ px}$. |
| **04** | `WALK_SOUTH` | Movement | $8$ | $12$ | Bouncy waddle: vertical bounce $y(f) = -3 |\sin(\pi f / 4)|\text{ px}$, head tilt $\theta = \pm 2^\circ$, opposite arm/leg swing. |
| **05** | `WALK_NORTH` | Movement | $8$ | $12$ | Back bouncy walk; shoe soles peek at $y = 112\text{ px}$ on passing frames $4$ and $8$. |
| **06** | `WALK_SIDE` | Movement | $8$ | $12$ | Forward lean $\theta = +4^\circ$, leg stride amplitude $\Delta x = \pm 7\text{ px}$, arm swing $\theta_{\text{arm}} = \pm 28^\circ$. |
| **07** | `RUN_DASH` | Movement | $6$ | $16$ | High-speed dash: forward torso tilt $\theta = +14^\circ$, arms swept back $\theta = -55^\circ$, airborne frames $2$ & $5$. |
| **08** | `SIT_COZY_SNACK` | Pony Town | $6$ | $6$ | Pelvis drops $\Delta y = +10\text{ px}$, feet tucked forward; frames $4\text{--}6$ nibble a **Kikufuku Mochi** with happy `^ ^` eyes. |
| **09** | `EMOTE_BOOP_WAVE` | Pony Town | $6$ | $10$ | Head tilts $\theta = +8^\circ$, right hand waves at $(x = 88, y = 62)$ or leans forward $\Delta x = +6\text{ px}$ for a nose boop. |
| **10** | `CHOP_AXE_SWING` | Stardew Day | $6$ | $12$ | Two-handed tool arc from overhead $\theta = -65^\circ$ (Frame 2) to ground impact $\theta = +95^\circ$ (Frame 4). |
| **11** | `MINE_PICKAXE` | Stardew Day | $6$ | $12$ | High leap anticipation ($\Delta y = -4\text{ px}$), steep downward strike onto Cursed Ore nodes with squash $S_y = 0.86$. |
| **12** | `WATER_FORAGE` | Stardew Day | $6$ | $10$ | Frames $1\text{--}3$: watering can tilt ($\theta = +35^\circ$); Frames $4\text{--}6$: deep knee bend ($\Delta y = +8\text{ px}$) to pluck herbs. |
| **13** | `UNSEAL_SIX_EYES` | JJK State | $8$ | $14$ | Right hand grips blindfold/shades at $(66, 45)$, pulls down at Frame $4$; Frame $5\text{--}8$ bursts into glowing Six-Eyes! |
| **14** | `COMBAT_MELEE_BF` | JJK Night | $8$ | $16$ | 3-hit martial arts combo: Palm strike ($F_2$), roundhouse kick ($F_5$), Black Flash spatial palm impact ($F_7$). |
| **15** | `CAST_LAPSE_BLUE` | JJK Night | $6$ | $12$ | Left arm extends forward $(x = 92, y = 70)$; palm opens as rotating Blue gravity singularity orbits hand. |
| **16** | `CAST_REVERSAL_RED`| JJK Night | $6$ | $12$ | Right index finger points forward $(x = 94, y = 66)$; miniature crimson star condenses at fingertip and detonates. |
| **17** | `CAST_HOLLOW_PURPLE`| JJK Night | $8$ | $12$ | Hands wide ($F_1\text{--}3$: Blue left, Red right) $\rightarrow$ merge at $(64, 72)$ ($F_5$) $\rightarrow$ finger snap & giant beam ($F_6\text{--}8$). |
| **18** | `HIT_INFINITY_GUARD`| JJK Defense | $4$ | $10$ | Passive/Active guard: Gojo smirks smugly with hands in pockets while incoming attacks freeze $18\text{ px}$ away. |

---

## 4. Calculated Interaction Poses & Sprite Interaction Effects

Every interaction in the engine uses deterministic kinematic equations, frame data (Startup / Active / Recovery), and particle physics calculations so hits, harvests, and emotes feel responsive and weighty.

### 4.1 Daytime Cozy Interactions (*Stardew Valley* $\times$ *Pony Town*)

#### 1. Tree Chopping & Fruit Shaking (`Row 10: CHOP_AXE_SWING`)
* **Pose Calculation:**
  * **Frames $1\text{--}2$ (Startup - $166\text{ ms}$):** Torso stretches vertically ($S_y = 1.06, S_x = 0.95$). Both mitten hands lock onto tool handle anchor at $(x_h, y_h) = (58, 54)$, rotating tool backward to angle $\theta_0 = -65^\circ$.
  * **Frame $3\text{--}4$ (Active Impact - $83\text{ ms}$):** Rapid angular sweep $\omega = 1920^\circ\text{/s}$ down to $\theta_1 = +95^\circ$. Body squashes ($S_y = 0.88, S_x = 1.12$) and shifts forward $\Delta x = +4\text{ px}$.
  * **Frames $5\text{--}6$ (Recovery - $166\text{ ms}$):** Elastic return to neutral idle pose.
* **Calculated Sprite Interaction Effect:**
  * **Hitbox:** Circular sector at distance $r = 1.2\text{ world units}$ in front of facing vector $\hat{d}$, arc angle $\Delta \phi = 75^\circ$.
  * **Target Tree Reaction:** Tree mesh undergoes damped harmonic oscillation:
    $$\theta_{\text{tree}}(t) = \theta_{\max} e^{-\zeta \omega_n t} \cos(\omega_d t), \quad \theta_{\max} = 0.18\text{ rad}, \quad \zeta = 0.35, \quad \omega_d = 28\text{ rad/s}$$
  * **Loot Drop Physics:** Spawns $2\text{--}3$ Wood Logs or Sweet Apples that launch along a parabolic trajectory:
    $$x(t) = x_0 + v_{0x} t, \quad y(t) = y_0 + v_{0y} t - \frac{1}{2} g t^2 \quad (g = 24\text{ u/s}^2)$$
    with $2$ ground bounces ($e_{\text{restitution}} = 0.45$) before magnetizing toward Gojo when distance $d < 1.8\text{ units}$.

#### 2. Mining Cursed Crystal Nodes (`Row 11: MINE_PICKAXE`)
* **Pose Calculation:**
  * **Frame $2$ (Apex):** Character hops $\Delta y = -6\text{ px}$ into the air, pickaxe raised directly above cranium $(\theta = -90^\circ)$.
  * **Frame $4$ (Strike):** Drops to $\Delta y = +3\text{ px}$ on contact; head tilts forward $+6^\circ$.
* **Calculated Sprite Interaction Effect:**
  * Emits $N = 12$ crystalline spark sprites radially with initial velocity $v_i \in [3.5, 6.0]\text{ u/s}$ and angular distribution $\phi_i = \frac{2\pi i}{N} + \text{rand}(-0.2, 0.2)$.
  * Restores $+15\text{ Cursed Energy (CE)}$ per node shattered and yields **Cursed Shards** (used to upgrade lanterns or craft barriers).

#### 3. Watering Crops & Foraging Wildflowers (`Row 12: WATER_FORAGE`)
* **Pose Calculation:**
  * **Watering ($F_1\text{--}3$):** Arms hold watering spout at $(x = 84, y = 78)$ tilted at $+35^\circ$.
  * **Foraging ($F_4\text{--}6$):** Knees bend $45^\circ$, torso drops $\Delta y = +8\text{ px}$, right hand reaches ground level $(x = 76, y = 112)$ and lifts the item overhead to $(x = 64, y = 32)$ on pickup completion.
* **Calculated Sprite Interaction Effect:**
  * Soil tile transitions color saturation via linear interpolation $C_{\text{wet}} = \text{lerp}(C_{\text{dry}}, C_{\text{dark}}, 1 - e^{-4t})$ and increases flower growth stage by $+34\%$.
  * Harvested **Kikufuku Herbs / Berries** float above Gojo's head for $0.6\text{ s}$ with a rising pop scale $S(t) = 1 + 0.3 \sin(\pi t / 0.6)$.

#### 4. Pony Town Cozy Sit, Boop & Chat Bubbles (`Row 08` & `Row 09`)
* **Pose Calculation:**
  * **Sit (`[X]` key):** Instant cozy transition where legs fold forward ($\Delta L_{\text{leg}} = -10\text{ px}$), torso settles onto grass, and if idle for $> 3\text{ s}$, Gojo pulls out a wrapped **Kikufuku Mochi** snack, restoring $+5\text{ HP/s}$ and $+8\text{ CE/s}$.
  * **Boop (`[E]` near NPC/Critter):** Gojo leans forward $\Delta x = +6\text{ px}$ with a mischievous `:3` smirk and taps the companion's nose.
* **Calculated Sprite Interaction Effect:**
  * Booped companions (Jade Divine Dog pup, Panda plushie, or Cuddle Slime) execute a vertical joy-hop $\Delta y(t) = 0.6 \sin(\pi t / 0.35)\text{ units}$ and emit a floating Heart/Sparkle speech bubble that drifts upward at $v_y = 1.2\text{ u/s}$ with horizontal sine sway $x(t) = 0.15 \sin(5t)$.

---

### 4.2 Nighttime JJK Combat Poses & Calculated Technique Physics

#### 1. Passive / Active Limitless: `Infinity (Mugen)` (`Row 18`)
* **Pose Calculation:** Relaxed standing or walking posture; optional smug hand-in-pocket stance with glowing cyan rim-light around silhouette.
* **Calculated Spatial Physics (Achilles and the Tortoise Formula):**
  * Any enemy or projectile within radius $R_{\text{inf}} = 1.6\text{ units}$ of Gojo has its velocity vector $\vec{v}_{\text{enemy}}$ dynamically divided by a spatial convergence factor based on distance $d$:
    $$\vec{v}_{\text{effective}}(d) = \vec{v}_{\text{enemy}} \cdot \max\left(0, \left(\frac{d - R_{\text{stop}}}{R_{\text{inf}} - R_{\text{stop}}}\right)^3\right), \quad R_{\text{stop}} = 0.65\text{ units}$$
  * At $d \le 0.65\text{ units}$, enemy speed reaches $0\text{ u/s}$—monsters literally freeze in mid-air against an invisible spherical distortion shield while draining $2\text{ CE/s}$ on contact.

#### 2. Basic Martial Arts & `Black Flash (Kokusen)` (`Row 14`)
* **Pose Calculation:**
  * **Hit 1 (Palm Strike - $F_2$):** Step velocity $+4\text{ u/s}$, right palm extends $\Delta x = +16\text{ px}$.
  * **Hit 2 (Spinning Kick - $F_5$):** $360^\circ$ torso rotation, leg extends $\Delta x = +20\text{ px}$ at hip height $y = 86$.
  * **Hit 3 (Heavy Impulse - $F_7$):** Two-handed close-range impact with $15\%$ base probability ($40\%$ in Six-Eyes Mode) to trigger **Black Flash**.
* **Calculated Sprite Interaction Effect:**
  * Normal hit deals $D_{\text{base}} = 25\text{ DMG}$ with knockback impulse $J = 4.0\text{ u/s}$.
  * **Black Flash Trigger:** Screen flashes inverted monochrome for $40\text{ ms}$, spawns jagged crimson-and-black lightning vectors ($8$ branches using midpoint displacement), and calculates damage exponentially (adapted for balanced RPG scaling):
    $$D_{\text{BlackFlash}} = \left(D_{\text{base}}\right)^{1.35} \approx 77\text{ DMG} + \text{Instant } +30\text{ CE Restore}$$

#### 3. Cursed Technique Lapse: `Blue (Ao)` (`Row 15`)
* **Pose Calculation:** Left arm raises to shoulder height $(y = 68\text{ px})$, fingers spread wide; hair spikes blow forward from negative pressure.
* **Calculated Gravitational Pull Effect:**
  * Spawns a singularity orb at distance $3.5\text{ units}$ along facing direction for duration $T = 2.5\text{ s}$.
  * All Cursed Spirits and loose loot within pull radius $R_{\text{blue}} = 4.5\text{ units}$ experience centripetal attraction force:
    $$\vec{F}_{\text{pull}} = G_{\text{cursed}} \frac{\hat{r}_{\text{to\_core}}}{\max(0.5, \|\vec{r}\|)^{1.2}}, \quad G_{\text{cursed}} = 18.0\text{ u/s}^2$$
  * Deals $12\text{ DMG}$ per $0.25\text{ s}$ tick ($96\text{ DMG}$ total) and groups enemies tightly into a cluster.

#### 4. Cursed Technique Reversal: `Red (Aka)` (`Row 16`)
* **Pose Calculation:** Gojo leans back $\theta = -6^\circ$, raises right hand with index finger extended at $(x = 94, y = 64)$. On Frame $4$, recoil pushes Gojo back $\Delta x = -0.3\text{ units}$.
* **Calculated Explosive Repulsion Effect:**
  * Fires a high-velocity crimson projectile ($v = 14\text{ u/s}$) that detonates on contact or at max range $d = 6.0\text{ units}$ (Explosion Radius $R_{\text{red}} = 2.8\text{ units}$).
  * Applies radial shockwave impulse away from blast center:
    $$\vec{v}_{\text{knockback}} = V_{\max} \left(1 - \frac{d}{R_{\text{red}}}\right)^{0.5} \hat{r}_{\text{outward}}, \quad V_{\max} = 16.0\text{ u/s}$$
  * Deals $140\text{ DMG}$ and stuns surviving monsters for $1.2\text{ s}$.

#### 5. Secret Technique: `Hollow Purple (Murasaki)` (`Row 17`)
* **Pose Calculation:**
  * **Frames $1\text{--}3$:** Blindfold/Sunglasses automatically unseal into **Six-Eyes Mode**. Left hand charges a Blue orb at $(x = 34, y = 72)$; right hand charges a Red orb at $(x = 94, y = 72)$.
  * **Frames $4\text{--}5$:** Both orbs follow converging spiral trajectories:
    $$x_L(t) = 64 - 30(1-t)\cos(2\pi t), \quad x_R(t) = 64 + 30(1-t)\cos(2\pi t)$$
    merging at $(64, 72)$ in a blinding violet flash.
  * **Frames $6\text{--}8$:** Gojo snaps his fingers forward; camera shakes ($\text{amplitude} = 0.25\text{ units}$) as a massive Imaginary Mass sphere/beam launches forward.
* **Calculated Eradication Effect:**
  * Sweeps a cylindrical volume of radius $R_{\text{purple}} = 2.2\text{ units}$ and length $L = 16.0\text{ units}$.
  * Deals $450\text{ DMG}$ (instantly vaporizing Grade 4–2 Cursed Spirits into purple stardust particles), carves a glowing trench decal on the ground for $5\text{ s}$, and automatically harvests any trees/crystals in its path!

---

## 5. RPG Combat Mechanics: HP, Cursed Energy (Mana) & Six-Eyes Awakening

### 5.1 Core Stat Formulas
* **Health Points ($HP$):**
  $$HP_{\max} = 500 + (25 \times \text{Level}), \quad \text{Daytime Regen} = +6\text{ HP/s}, \quad \text{Nighttime Regen} = +1\text{ HP/s}$$
* **Cursed Energy / Mana ($CE$):**
  $$CE_{\max} = 300 + (20 \times \text{Level}), \quad \text{Base Regen} = +10\text{ CE/s}$$
* **Six-Eyes Awakening Gauge ($AWG \in [0\%, 100\%]$):**
  * Builds by $+4\%$ per daytime resource harvested, $+8\%$ per melee hit, and $+20\%$ per Black Flash or Cursed Spirit exorcised.
  * Pressing **`[R]` (or clicking the Six-Eyes HUD Orb)** triggers **Unsealed Six-Eyes Max Power Mode** (available any time in Sandbox toggle, or consuming $AWG$ in Survival Mode).

### 5.2 The Six-Eyes Efficiency Multiplier (Lore-Accurate Calculation)
When Gojo removes his Blindfold/Sunglasses and activates **Six-Eyes Mode**, his perception and atomic-level Cursed Energy manipulation modify all combat equations:
$$\text{CE Cost}_{\text{SixEyes}} = \text{CE Cost}_{\text{Base}} \times 0.20 \quad (80\% \text{ Mana Cost Reduction!})$$
$$\text{Damage}_{\text{SixEyes}} = \text{Damage}_{\text{Base}} \times 1.50, \quad \text{Cooldown}_{\text{SixEyes}} = \text{Cooldown}_{\text{Base}} \times 0.50$$

### 5.3 Complete Ability & Interaction Table
| Input Key | Action / Technique | Base CE (Mana) Cost | Six-Eyes CE Cost | Cooldown | Effect Summary |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **`WASD` / Stick** | 8-Way Bouncy Move | $0\text{ CE}$ | $0\text{ CE}$ | — | Smooth movement ($v = 4.5\text{ u/s}$, Six-Eyes $v = 5.8\text{ u/s}$) |
| **`Shift`** | Cursed Dash / Zoomie | $10\text{ CE}$ | $2\text{ CE}$ | $0.8\text{ s}$ | High-speed dash ($v = 11\text{ u/s}$) with i-frames & dust puffs |
| **`E` / `Space`** | Context Interact / Melee | $0\text{ CE}$ | $0\text{ CE}$ | $0.35\text{ s}$ | **Day:** Chop, Mine, Water, Forage, Boop / **Night:** 3-Hit Combo ($+8\text{ CE}$ gain) |
| **`X`** | Cozy Sit & Eat Mochi | $0\text{ CE}$ | $0\text{ CE}$ | Toggle | Sit anywhere; eating Kikufuku heals $+25\text{ HP}$ & $+40\text{ CE}$ |
| **`V`** | Headgear Cycle | $0\text{ CE}$ | $0\text{ CE}$ | Instant | Cycle between **Blindfold**, **Round Sunglasses**, and **Unsealed Six-Eyes** |
| **`Q`** | **Infinity Barrier (`Mugen`)** | $15\text{ CE/s}$ | $3\text{ CE/s}$ | Toggle | Slows and halts all approaching monsters & projectiles |
| **`1`** | **Lapse: Blue (`Ao`)** | $45\text{ CE}$ | $9\text{ CE}$ | $4.0\text{ s}$ | Gravitational vortex pulling monsters & loot into center ($96\text{ DMG}$) |
| **`2`** | **Reversal: Red (`Aka`)** | $65\text{ CE}$ | $13\text{ CE}$ | $6.0\text{ s}$ | Explosive crimson repulsion blast ($140\text{ DMG}$ + heavy knockback) |
| **`3`** | **Hollow Purple (`Murasaki`)** | $140\text{ CE}$ | $28\text{ CE}$ | $12.0\text{ s}$ | Unseals Six-Eyes, merges Blue + Red into giant beam ($450\text{ DMG}$) |
| **`R`** | **Six-Eyes Max Power / Domain** | $0\text{ CE}$ (Uses Gauge) | Instant | $15.0\text{ s}$ | Removes blindfold/shades, activates Six-Eyes buff & casts **Unlimited Void** stun field! |

---

## 6. Day & Night Gameplay Loop: Cozy Meadow vs. Cursed Night

The world runs on a continuous (and manually controllable) **24-Hour Clock Cycle** ($1\text{ full cycle} = 3\text{ minutes}$ real-time, with UI buttons to freeze time or jump instantly between **Sunny Day** and **Cursed Night**).

### 6.1 Daytime ($06:00 - 18:00$): *Stardew Valley* $\times$ *Pony Town* Grind & Chill
* **Atmosphere:** Warm golden sunlight, swaying cherry blossom petals, sparkling cyan pond water, peaceful lo-fi chimes. Gojo wears his **Blindfold** or **Sunglasses** by default.
* **Core Activities:**
  1. **Resource Grinding:** Chop blossom trees for **Spirit Wood**, mine glowing blue outcrops for **Cursed Crystals**, and water/harvest **Sweet Kikufuku Plants** and **Starlight Berries**.
  2. **Sanctuary Preparation:** Spend collected Wood and Crystals at the **Shrine Lanterns** around the meadow to upgrade their purification aura (which heals Gojo and slows monsters at night).
  3. **Cozy Socializing:** Sit on wooden benches or the pier with friendly chibi companions (**Jade Divine Dog Pup** and **Panda**), trade emotes, boop noses, and snack on sweets to overcharge Max HP and Cursed Energy before nightfall.

### 6.2 Nighttime ($18:00 - 06:00$): "The Curtain Falls" (*Jujutsu Kaisen* Demon Defense)
* **Atmosphere:** At $18:00$, a dark violet **Curtain (`Tobari`)** descends across the sky (`#0F0A1E`), lanterns ignite with cyan flames, and **Cursed Miasma Rifts** open along the meadow borders.
* **Cursed Spirit Bestiary (Calculated Enemy AI & Sprite Behaviors):**
  1. **Grade 4 — Fly Head Swarm (`Swarm AI`):**
     * *Stats:* $HP = 60$, $Speed = 3.8\text{ u/s}$, $DMG = 8$.
     * *Behavior:* Chubby winged cyclops imps that erratic-flutter toward Gojo in groups of $3\text{--}5$; great targets for grouping with **Lapse: Blue**.
  2. **Grade 3 — Shadow Lurker Demon (`Lunge AI`):**
     * *Stats:* $HP = 150$, $Speed = 3.0\text{ u/s}$, $DMG = 18$.
     * *Behavior:* Multi-eyed dark purple sludge beast that telegraphs a red line for $0.6\text{ s}$ before lunging forward (easily stopped cold by **Infinity** or blasted back with **Reversal: Red**).
  3. **Grade 1 / Special Grade — Cursed Womb: Finger Bearer (`Boss AI`):**
     * *Stats:* $HP = 650$, $Speed = 2.4\text{ u/s}$, $DMG = 35$.
     * *Behavior:* Spawns at Midnight ($00:00$) with a glowing golden Sukuna-finger core; fires cursed energy orbs and ground-slam shockwaves. Prompts Gojo to pull off his blindfold/shades, awaken the **Six Eyes**, and obliterate it with **Hollow Purple**!
* **Dawn Rewards ($06:00$):** Surviving the night purifies all remaining curses into a shower of **Grade-S Cursed Gems**, leveling up Gojo's stats and unlocking new cozy decorations and expressions.

---

## 7. Ready for Development Review

The plan now encompasses:
1. **The Hybrid 3D / 2.5D Engine** with live toggle between 3D Cel-Shaded Mesh, 2.5D Illustrated Billboard Sprite, and the full 18-Row Sprite Map Bible Studio.
2. **Gojo's 3-State Headgear System** (Default Blindfold & Sunglasses $\rightarrow$ Awakened Six-Eyes matching your reference photo).
3. **Mathematically Calculated Poses & Interaction Physics** for every cozy activity and JJK Cursed Technique.
4. **Full HP, Cursed Energy (Mana), and Day/Night Cursed Spirit Combat Loop.**

Let me know if you would like any adjustments to the skill numbers, enemy types, or animations—or say the word and I will build the complete interactive single-file application!