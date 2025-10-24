# CorrectSpell

A lightweight Chrome extension that auto-corrects misspelled words in real-time on any web page. Built with plain JavaScript, nspell, and Hunspell dictionaries. Fast, privacy-friendly, and requires **no extra setup** from users.

## 🚀 Features

- **Instant spell check & correction** on all text inputs and editable fields
- **Undo support** (Ctrl+Z for last auto-correction)
- **Seamless user experience** (no cursor jump, silent corrections)
- Supports most websites, including chat, forms, and search bars
- **No React or TypeScript dependencies** - lightweight and efficient
- **Plain HTML, CSS, JavaScript** implementation

## 🔧 Tech Stack

- Plain JavaScript (no React, no TypeScript)
- nspell, Hunspell, Manifest V3
- No build tools required (no Vite, Webpack, etc.)

## 📝 How To Install

1. Clone/download this repo
2. Run `npm install` to install dependencies
3. Go to `chrome://extensions/` in your browser
4. Enable "Developer mode" (top right)
5. Click "Load unpacked" and select this directory

## 💡 Usage

Just type anywhere—misspelled words auto-correct when you press space. Undo the last correction with Ctrl+Z.

## 📁 File Structure

- `background.js` - nspell engine, communication
- `content.js` - input handling, correction logic
- `lib/helpers.js` - utility functions
- `dictionaries/` - .aff/.dic files
- `popup/` - HTML, CSS, JS for extension popup
- `icons/`, `manifest.json` - extension assets

## ❓ FAQ

- **Will users need Node/npm/any dependencies?**
  - **No.** Users only get the final bundled extension (no setup or dependencies required!).

- **Is my data sent anywhere?**
  - All spell-checking is offline and local.

- **Why plain JavaScript instead of React/TypeScript?**
  - Simpler architecture, faster loading, no build dependencies, more compatible with existing websites.

## 📄 License

MIT. Free for personal or commercial use.