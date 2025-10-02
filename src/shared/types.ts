// Shared TypeScript types for CorrectSpell

export interface SpellCheckResult {
  word: string;
  isCorrect: boolean;
  suggestions?: string[];
}

export interface SpellCheckRequest {
  action: 'checkSpelling' | 'getSuggestions';
  word: string;
}

export interface SpellCheckResponse {
  isCorrect?: boolean;
  suggestions?: string[];
  error?: string;
}

export interface InputElementData {
  element: HTMLInputElement | HTMLTextAreaElement;
  lastCheckedValue: string;
}

export interface DictionaryConfig {
  language: string;
  affPath: string;
  dicPath: string;
}