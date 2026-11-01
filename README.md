# Battle Grounds

A two-player, couch-style 2D fighting game that runs in the browser. Two pixel-art fighters face off in a 60-second round; land hits to drain your opponent's health bar, or have the most health when the clock runs out.

No build step and no dependencies to install. It's plain HTML, CSS and JavaScript.

## Features

- Start screen with a scrolling starfield and a CRT-style scanline overlay
- Two fighters with idle, run, jump, fall, attack, take-hit and death animations
- Health bars for both players and a 60-second round timer
- Win by knockout or by having more health when time expires; a tie is possible
- End-of-round menu with **REMATCH** and **MENU** buttons

## Getting started

1. Clone the repository:

   ```bash
   git clone https://github.com/archcoder-jd/battle-grounds.git
   cd battle-grounds
   ```

2. Serve the folder with any static file server. For example:

   ```bash
   python3 -m http.server 8000
   ```

3. Open `http://localhost:8000` in your browser.

You can also open `index.html` directly in a browser. A local server is the safer option, though I haven't tested the direct-file route.

The page loads the Press Start 2P and Monda fonts from Google Fonts and the GSAP animation library from cdnjs, so you need an internet connection for the styling and health-bar animations.

## How to play

From the start screen, press **Enter** or click **START**. This opens `game.html` and begins the round.

### Controls

| Action        | Player 1 (left) | Player 2 (right) |
| ------------- | --------------- | ---------------- |
| Move left     | `A`             | `←`              |
| Move right    | `D`             | `→`              |
| Jump          | `W`             | `↑`              |
| Attack        | `Space`         | `↓`              |

### Rules

- Each fighter starts with 100% health.
- Every landed hit removes 8% health.
- The round lasts 60 seconds. If neither fighter is knocked out, the one with more health wins. Equal health is a tie.
- Attacks only connect when the weapon box overlaps the opponent's hurtbox during a specific frame of the attack animation, so timing matters.

## Project structure

```
battle-grounds/
├── index.html          # Start screen; loads js/menu.js
├── game.html           # Game screen; loads utils, classes and game scripts
├── css/
│   └── app.css         # Styles for both the start and game screens
├── js/
│   ├── menu.js         # Starfield animation and start button / Enter handling
│   ├── classes.js      # Sprite, Fighter1 and Fighter2 classes
│   ├── utils.js        # Hit detection, round timer and win/end-of-round logic
│   └── game.js         # Canvas setup, fighter config, game loop and controls
└── assets/
    ├── background/     # Stage background images
    └── characters/     # Sprite sheets for fighter1 and fighter2
```

## How it works

- **Canvas rendering:** `game.js` runs a `requestAnimationFrame` loop that clears the 928×597 canvas, draws the background, updates both fighters, and checks for hits and a winner.
- **Sprite sheets:** each animation is a horizontal strip of frames. `Sprite.draw()` slices out the current frame, and `animateFrames()` advances it every few ticks.
- **Hitboxes:** each fighter has a `hurtbox` (the body that can be hit) and a `weapon` box (active during attacks). Both are positioned relative to the drawn sprite, so they follow the animation.
- **Round flow:** `decreaseTimer()` counts down once per second. When the timer reaches zero, or a fighter's health drops to zero, `determineWinner()` shows the result and then reveals the end-of-round buttons.

## Tech

- HTML5 Canvas (2D context)
- Vanilla JavaScript (ES6 classes, no framework)
- CSS with a pixel-art look
- [GSAP 3.15](https://gsap.com/) for health-bar tweens

# Credits

**Background Artwork**
By Eder MunizFree - Pixel Art Forest.

**Player1**
Hero Knight is Creative Commons Zero (CC-0).

**Player2**
Huntress is Creative Commons Zero (CC-0).