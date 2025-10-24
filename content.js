// CorrectSpell Content Script - Plain JavaScript Implementation
// Replaces the React-based approach with vanilla JavaScript

console.log('CorrectSpell content script loaded');

// SpellCorrector class - handles spell checking logic
class SpellCorrector {
  constructor() {
    this.observedElements = new Set();
    this.mutationObserver = null;
    this.debounceCheckSpelling = this.debounce(this.checkSpelling.bind(this), 300);
    this.initializeMutationObserver();
  }

  // Process input from a text element
  processInput(element) {
    const text = element.value;
    console.log(`Processing input: ${text}`);
    
    // Check spelling and provide corrections if needed
    // Using debounced method to avoid checking on every keystroke
    this.debounceCheckSpelling(text, element);
  }

  // Initialize spell checking for a specific element
  initializeElement(element) {
    if (this.observedElements.has(element)) {
      return; // Already initialized
    }

    this.observedElements.add(element);
    
    // Perform initial spell check if the element already has content
    if (element.value) {
      this.debounceCheckSpelling(element.value, element);
    }
    
    console.log(`Initialized spell checking for element: ${element.tagName}`);
  }

  // Check spelling of text in an element
  async checkSpelling(text, element) {
    // Split text into words and check each word
    const words = text.split(/\s+/).filter(word => word.length > 0);
    
    for (const word of words) {
      // Clean the word of punctuation
      const cleanWord = word.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
      
      if (cleanWord) {
        // Send message to background script to check spelling
        const result = await this.sendMessageToBackground({
          action: 'checkSpelling',
          word: cleanWord
        });

        if (result && !result.isCorrect) {
          console.log(`Misspelled word detected: ${cleanWord}`);
          this.highlightMisspelledWord(element, cleanWord);
        }
      }
    }
  }

  // Highlight misspelled words in the element
  highlightMisspelledWord(element, word) {
    // In a real implementation, we would visually highlight the misspelled word
    // This could be done by replacing the input with a contenteditable div
    // or by using a more complex text rendering solution
    
    console.log(`Highlighting misspelled word: ${word}`);
    
    // For now, we'll just log the misspelled word
    // In a real implementation, you might want to underline or highlight the word
  }

  // Send message to background script
  sendMessageToBackground(message) {
    return new Promise((resolve, reject) => {
      try {
        chrome.runtime.sendMessage(message, (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error sending message to background:', chrome.runtime.lastError);
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      } catch (error) {
        console.error('Error sending message to background:', error);
        reject(error);
      }
    });
  }

  // Initialize mutation observer to detect dynamically added text elements
  initializeMutationObserver() {
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node;
            
            // Check if the added node is a text input or textarea
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
              const inputElement = element;
              if (this.isTextInputElement(inputElement)) {
                this.initializeElement(inputElement);
              }
            }
            
            // Also check for any text input elements within the added node
            const textInputs = element.querySelectorAll('input[type="text"], input[type="search"], input[type="email"], input[type="password"], input[type="url"], textarea');
            textInputs.forEach((input) => {
              const inputElement = input;
              if (this.isTextInputElement(inputElement)) {
                this.initializeElement(inputElement);
              }
            });
          }
        });
      });
    });

    // Start observing the document for added elements
    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Check if an element is a text input element
  isTextInputElement(element) {
    return (
      (element instanceof HTMLInputElement && 
        (element.type === 'text' || element.type === 'search' || element.type === 'email' || element.type === 'password' || element.type === 'url' || element.type === '')) ||
      element instanceof HTMLTextAreaElement
    );
  }

  // Debounce function
  debounce(func, wait) {
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
}

// InputListener class - handles input event listening
class InputListener {
  constructor(spellCorrector) {
    this.spellCorrector = spellCorrector;
    this.listening = false;
  }

  startListening() {
    if (this.listening) {
      console.warn('Input listener already started');
      return;
    }

    // Listen for input events on all input and textarea elements
    document.addEventListener('input', this.handleInput.bind(this), true);
    
    // Also listen for focus events to handle dynamically created elements
    document.addEventListener('focus', this.handleFocus.bind(this), true);
    
    this.listening = true;
    console.log('Input listener started');
  }

  stopListening() {
    document.removeEventListener('input', this.handleInput.bind(this), true);
    document.removeEventListener('focus', this.handleFocus.bind(this), true);
    this.listening = false;
    console.log('Input listener stopped');
  }

  handleInput(event) {
    const target = event.target;
    
    if (this.isTextInputElement(target)) {
      // Process the input for spell checking
      this.spellCorrector.processInput(target);
    }
  }

  handleFocus(event) {
    const target = event.target;
    
    if (this.isTextInputElement(target)) {
      // When a text element gains focus, we might want to initialize spell checking
      this.spellCorrector.initializeElement(target);
    }
  }

  isTextInputElement(element) {
    return (
      (element instanceof HTMLInputElement && 
        (element.type === 'text' || element.type === 'search' || element.type === 'email' || element.type === 'password' || element.type === 'url' || element.type === '')) ||
      element instanceof HTMLTextAreaElement
    );
  }
}

// Initialize the spell corrector
const spellCorrector = new SpellCorrector();

// Initialize the input listener to monitor text inputs
const inputListener = new InputListener(spellCorrector);

// Start listening for input events
inputListener.startListening();

console.log('CorrectSpell content script initialized and running');