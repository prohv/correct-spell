// Main entry point for the content script using React
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log('CorrectSpell React content script loaded');

// Create a container element for the React app
const container = document.createElement('div');
container.id = 'correctspell-root';
// Position it off-screen since it's just for functionality
container.style.position = 'absolute';
container.style.left = '-9999px';
container.style.top = '0px';
container.style.width = '0px';
container.style.height = '0px';
container.style.overflow = 'hidden';

document.body.appendChild(container);

// Render the React app
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('CorrectSpell React app initialized and running');