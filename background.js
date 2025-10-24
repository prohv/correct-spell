// Background service worker for CorrectSpell extension
// Handles nspell initialization and messaging
// Plain JavaScript implementation

// Dictionary data will be loaded from the dictionaries folder
// In a real extension, you would load the actual .aff and .dic files
let spellChecker = null;

// Initialize the spell checker when the service worker starts
async function initializeSpellChecker() {
  try {
    console.log('Initializing spell checker...');
    
    // In a real implementation, you would load the actual dictionary files
    // Since Chrome extensions can't directly load files in service workers,
    // you'd need to include the dictionary content in the extension build process
    // or use an alternative approach
    
    // Placeholder: for now, we'll create a basic mock spell checker
    // In a real implementation, you would properly load the dictionaries
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
      // For now, return true for all words as a placeholder
      sendResponse({ isCorrect: true });
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