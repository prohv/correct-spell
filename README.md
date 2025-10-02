# CorrectSpell

A lightweight Chrome extension that auto-corrects misspelled words in real-time on any web page. Built with TypeScript, nspell, and Hunspell dictionaries. Fast, privacy-friendly, and requires **no extra setup** from users.

## 🚀 Features

- **Instant spell check & correction** on all text inputs and editable fields
- **Undo support** (Ctrl+Z for last auto-correction)
- **Seamless user experience** (no cursor jump, silent corrections)
- Supports most websites, including chat, forms, and search bars

## 🔧 Tech Stack

- TypeScript, nspell, Hunspell, Webpack, Manifest V3

## 📝 How To Install

1. Clone/download this repo and run `npm run build`
2. Go to `chrome://extensions/` in your browser
3. Enable "Developer mode" (top right)
4. Click "Load unpacked" and select the `dist` folder

## 💡 Usage

Just type anywhere—misspelled words auto-correct when you press space. Undo the last correction with Ctrl+Z.

## 📁 File Structure

- `src/background/service-worker.ts` - nspell engine, communication
- `src/content/index.ts`, `inputListener.ts`, `corrector.ts` - input handling, correction logic
- `src/shared/` - types and helpers
- `src/dictionaries/` - .aff/.dic files
- `public/icons/`, `public/manifest.json` - extension assets

## ❓ FAQ

- **Will users need Node/npm/any dependencies?**
  - **No.** Users only get the final bundled extension (no setup or dependencies required!).

- **Is my data sent anywhere?**
  - All spell-checking is offline and local.

## 📄 License

MIT. Free for personal or commercial use.
