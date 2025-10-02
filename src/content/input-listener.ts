// Input listener for detecting user input in text fields
import { SpellCorrector } from './corrector';
import { isTextInputElement } from '../shared/helpers';

export class InputListener {
  private spellCorrector: SpellCorrector;
  private listening: boolean = false;

  constructor(spellCorrector: SpellCorrector) {
    this.spellCorrector = spellCorrector;
  }

  startListening(): void {
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

  stopListening(): void {
    document.removeEventListener('input', this.handleInput.bind(this), true);
    document.removeEventListener('focus', this.handleFocus.bind(this), true);
    this.listening = false;
    console.log('Input listener stopped');
  }

  private handleInput(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    
    if (isTextInputElement(target)) {
      // Process the input for spell checking
      this.spellCorrector.processInput(target);
    }
  }

  private handleFocus(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    
    if (isTextInputElement(target)) {
      // When a text element gains focus, we might want to initialize spell checking
      this.spellCorrector.initializeElement(target);
    }
  }
}