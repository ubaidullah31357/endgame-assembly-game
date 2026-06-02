# Endgame-Assembly Game

# Live Preview: https://endgame-assembly-game.vercel.app/

    1. Summary of app.

- **Title & One-line:** Endgame — Assembly Game  
  A lightweight React word-guessing game (Hangman-style) that combines playful visuals with accessible UI patterns.

- **Table of Contents**
  - Features
  - Demo / Preview
  - Tech Stack
  - Project Structure
  - Installation
  - Usage
  - Accessibility Notes
  - Roadmap
  - Contributing
  - License

- **Features**
  - Word-guessing gameplay with A–Z keyboard buttons.
  - Visual "language chips" represent remaining attempts; wrong guesses mark chips as lost.
  - Accessible updates via `aria-live` status regions for screen readers.
  - Win celebration using `react-confetti`.
  - Modular code: separate data (`words`, `languages`), utilities, component, and styles.

- **Demo / Preview**
  - Run locally (see Installation). Open the dev server and play the game in your browser.

- **Tech Stack**
  - Frontend: `React` (JSX)
  - Bundler: `Vite`
  - UI helper: `clsx`
  - Confetti: `react-confetti`
  - Dev: `ESLint`
  - See dependencies in package.json

- **Project Structure**
  - index.html — App entry.
  - src
    - App.jsx — Mounts the `Page` component.
    - endgame.jsx — Main game component and UI logic.
    - endgame.css — Styling for the app.
    - utils-endgame.js — `getRandomWord()` and `getFarewellText()`.
    - words-endgame.js — Word list used for random selection.
    - endgame-languages.js — Language chips metadata.
  - README.md — This file.
  2. Open the Vite URL shown in the terminal.

- **Usage**
  - Click letters to guess. Correct letters reveal in the word grid; incorrect letters mark a language chip as lost. Win to trigger confetti; lose and view the revealed word. Use the "New Game" button to play again.

- **Accessibility Notes**
  - `aria-live` polite regions announce current word progress and last-guess feedback.
  - Buttons include `aria-label` attributes.
  - Suggested improvements: add physical keyboard support, expand `aria` announcements for attempt counts, and test with screen readers.

- **Roadmap & Enhancements**
  - Add keyboard event handling for letter input.
  - Categorize words and add difficulty levels.
  - Persist scores/streaks in `localStorage`.

- **Contributing**
  - Fork, create a branch, add tests for new features, and open a pull request. Please keep changes focused and add a short description of the change.
