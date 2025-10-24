# CorrectSpell Extension - Project Context

## Overview
CorrectSpell is a lightweight Chrome extension that auto-corrects misspelled words in real-time on any web page. Built with plain JavaScript, nspell, and Hunspell dictionaries. Fast, privacy-friendly, and requires no extra setup from users.

## Tech Stack
- Frontend: Plain HTML, CSS, JavaScript (No React, TypeScript, or build tools)
- Spell-checking: nspell library with Hunspell dictionaries
- Manifest Version: 3
- Browser Extension: Chrome Extension (Manifest V3)

## Architecture
- Content Script: Runs on all web pages to detect and correct text input
- Background Script: Handles spell-checking logic using nspell
- Popup: Simple UI for extension interaction
- Dictionaries: en_US.aff and en_US.dic files

## Key Components

### Content Script
- Located in `content.js`
- Plain JavaScript that directly manipulates the DOM
- Listens for input events on text fields
- Communicates with background script to check spelling
- Uses MutationObserver to detect dynamically added text elements
- Handles spell correction logic directly without React components

### Background Script
- Located in `background.js`
- Initializes nspell with dictionary files
- Handles communication with content scripts
- Performs actual spell-checking operations

### Popup
- Located in `popup/` directory
- Simple HTML file with CSS and plain JavaScript
- Provides basic information about the extension

### Shared Utilities
- Located in `lib/helpers.js`
- Contains utility functions like debounce, word extraction, etc.

## File Structure
```
correctspell/
├── manifest.json
├── package.json
├── background.js
├── content.js
├── dictionaries/
│   ├── en_US.aff
│   └── en_US.dic
├── icons/
│   ├── icon-48.png
│   └── icon-128.png
├── popup/
│   ├── index.html
│   ├── script.js
│   └── style.css
└── lib/
    └── helpers.js
```

## Build Configuration
- No build tools required (no Vite, TypeScript compilation)
- Simple file structure ready for Chrome extension packaging

## Current Status
- The spell checking functionality is implemented with plain JavaScript
- The extension works on all text inputs and editable fields
- Supports undo functionality for corrections
- No React or TypeScript dependencies required
- Ready for Chrome extension packaging with `npm run build`