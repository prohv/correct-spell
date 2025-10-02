// Spell check logic and correction implementation
import { debounce } from '../shared/helpers';

export class SpellCorrector {
  private observedElements: Set<HTMLElement> = new Set();
  private mutationObserver: MutationObserver | null = null;
  private debounceCheckSpelling = debounce(this.checkSpelling.bind(this), 300);

  constructor() {
    this.initializeMutationObserver();
  }

  /**
   * Process input from a text element
   */
  processInput(element: HTMLInputElement | HTMLTextAreaElement): void {
    const text = element.value;
    // In a real implementation, we would check spelling here
    console.log(`Processing input: ${text}`);
    
    // Check spelling and provide corrections if needed
    // Using debounced method to avoid checking on every keystroke
    this.debounceCheckSpelling(text, element);
  }

  /**
   * Initialize spell checking for a specific element
   */
  initializeElement(element: HTMLInputElement | HTMLTextAreaElement): void {
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

  /**
   * Check spelling of text in an element
   */
  private async checkSpelling(text: string, element: HTMLInputElement | HTMLTextAreaElement): Promise<void> {
    // This is where we would communicate with the background script to check spelling
    // For now, we'll just simulate a spell check
    
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

  /**
   * Highlight misspelled words in the element
   */
  private highlightMisspelledWord(element: HTMLInputElement | HTMLTextAreaElement, word: string): void {
    // In a real implementation, we would visually highlight the misspelled word
    // This could be done by replacing the input with a contenteditable div
    // or by using a more complex text rendering solution
    
    console.log(`Highlighting misspelled word: ${word}`);
    
    // For now, we'll just log the misspelled word
    // In a real implementation, you might want to underline or highlight the word
  }

  /**
   * Send message to background script
   */
  private sendMessageToBackground(message: any): Promise<any> {
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

  /**
   * Initialize mutation observer to detect dynamically added text elements
   */
  private initializeMutationObserver(): void {
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            
            // Check if the added node is a text input or textarea
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
              const inputElement = element as HTMLInputElement | HTMLTextAreaElement;
              if (this.isTextInputElement(inputElement)) {
                this.initializeElement(inputElement);
              }
            }
            
            // Also check for any text input elements within the added node
            const textInputs = element.querySelectorAll('input[type="text"], input[type="search"], input[type="email"], input[type="password"], input[type="url"], textarea');
            textInputs.forEach((input) => {
              const inputElement = input as HTMLInputElement | HTMLTextAreaElement;
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

  /**
   * Check if an element is a text input element
   */
  private isTextInputElement(element: Element): element is HTMLInputElement | HTMLTextAreaElement {
    return (
      (element instanceof HTMLInputElement && 
        (element.type === 'text' || element.type === 'search' || element.type === 'email' || element.type === 'password' || element.type === 'url' || element.type === '')) ||
      element instanceof HTMLTextAreaElement
    );
  }
}