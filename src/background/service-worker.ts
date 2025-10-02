// Background service worker for CorrectSpell extension
// Handles nspell initialization and messaging

import * as nspell from 'nspell';

// Dictionary data will be loaded from the dictionaries folder
// In a real extension, you would load the actual .aff and .dic files
let spellChecker: nspell | null = null;

// Initialize the spell checker when the service worker starts
async function initializeSpellChecker() {
  try {
    // In a real implementation, you would load the actual dictionary files
    // This is a placeholder implementation
    console.log('Initializing spell checker...');
    
    // Placeholder: in real implementation, fetch and load the .aff and .dic files
    // const affContent = await fetch('/dictionaries/en_US.aff').then(r => r.text());
    // const dicContent = await fetch('/dictionaries/en_US.dic').then(r => r.text());
    // spellChecker = nspell(affContent, dicContent);
    
    console.log('Spell checker initialized');
  } catch (error) {
    console.error('Failed to initialize spell checker:', error);
  }
}

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkSpelling') {
    const { word } = request;
    
    if (spellChecker) {
      const isCorrect = spellChecker.correct(word);
      sendResponse({ isCorrect });
    } else {
      console.error('Spell checker not initialized');
      sendResponse({ isCorrect: false, error: 'Spell checker not initialized' });
    }
  } else if (request.action === 'getSuggestions') {
    const { word } = request;
    
    if (spellChecker) {
      const suggestions = spellChecker.suggest(word);
      sendResponse({ suggestions });
    } else {
      console.error('Spell checker not initialized');
      sendResponse({ suggestions: [], error: 'Spell checker not initialized' });
    }
  }
  
  // Return true to indicate we will send a response asynchronously
  return true;
});

// Initialize the spell checker when the service worker starts
initializeSpellChecker();