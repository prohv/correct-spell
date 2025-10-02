// Shared helper functions for CorrectSpell

/**
 * Debounces a function to limit how often it can run
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>): void {
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

/**
 * Extracts words from text, removing punctuation
 */
export function extractWords(text: string): string[] {
  // Split text on whitespace and remove punctuation
  return text
    .split(/\s+/)
    .map(word => word.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "))
    .filter(word => word.length > 0);
}

/**
 * Checks if an element is a text input element
 */
export function isTextInputElement(element: Element): element is HTMLInputElement | HTMLTextAreaElement {
  return (
    (element instanceof HTMLInputElement && 
      (element.type === 'text' || element.type === 'search' || element.type === 'email' || element.type === 'password' || element.type === 'url' || element.type === '')) ||
    element instanceof HTMLTextAreaElement
  );
}

/**
 * Waits for a specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Gets the current URL origin
 */
export function getOrigin(): string {
  return window.location.origin;
}

/**
 * Creates a unique ID
 */
export function createUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}