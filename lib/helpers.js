// CorrectSpell Helper Functions
// Plain JavaScript implementation

// Debounces a function to limit how often it can run
function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}

// Extracts words from text, removing punctuation
function extractWords(text) {
  // Split text on whitespace and remove punctuation
  return text
    .split(/\s+/)
    .map(word => word.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "))
    .filter(word => word.length > 0);
}

// Checks if an element is a text input element
function isTextInputElement(element) {
  return (
    (element instanceof HTMLInputElement && 
      (element.type === 'text' || element.type === 'search' || element.type === 'email' || element.type === 'password' || element.type === 'url' || element.type === '')) ||
    element instanceof HTMLTextAreaElement
  );
}

// Waits for a specified number of milliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Gets the current URL origin
function getOrigin() {
  return window.location.origin;
}

// Creates a unique ID
function createUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}