// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Extract words from text, removing punctuation
function extractWords(text) {
    // Match sequences of letters (a-z, A-Z) with optional internal apostrophes
    const wordRegex = /[a-z]+('[a-z]+)*/gi;
    return text.match(wordRegex) || [];
}

// Check spelling of all words in a text node
async function checkAndCorrectTextElement(element) {
    if (!element || element.nodeType !== Node.TEXT_NODE) {
        // If it's not a text node, check child elements that might be text inputs
        await checkAndCorrectInputElement(element);
        return;
    }

    const text = element.textContent;
    const words = extractWords(text);
    
    if (words.length === 0) return;

    for (const word of words) {
        try {
            const result = await chrome.runtime.sendMessage({
                action: 'checkSpelling',
                word: word
            });

            if (result && !result.correct) {
                // Find and replace the misspelled word with the first suggestion
                if (result.suggestions && result.suggestions.length > 0) {
                    const correctedWord = result.suggestions[0];
                    const newText = element.textContent.replace(
                        new RegExp(`\\b${word}\\b`, 'gi'), 
                        correctedWord
                    );
                    element.textContent = newText;
                }
            }
        } catch (error) {
            console.error('Error checking spelling:', error);
        }
    }
}

// Check spelling in input elements like <input>, <textarea>
async function checkAndCorrectInputElement(element) {
    if (!element || 
        (element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA' && !element.isContentEditable)) {
        return;
    }

    // For input/textarea elements
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        if (element.type !== 'text' && element.type !== 'search' && element.type !== 'email' && 
            element.type !== 'password' && element.type !== 'url' && element.type !== '') {
            return;
        }

        const value = element.value;
        if (!value) return;

        const words = extractWords(value);
        if (words.length === 0) return;

        for (const word of words) {
            try {
                const result = await chrome.runtime.sendMessage({
                    action: 'checkSpelling',
                    word: word
                });

                if (result && !result.correct) {
                    if (result.suggestions && result.suggestions.length > 0) {
                        const correctedWord = result.suggestions[0];
                        // Replace the misspelled word in the input value
                        const newValue = value.replace(
                            new RegExp(`\\b${word}\\b`, 'gi'), 
                            correctedWord
                        );
                        element.value = newValue;
                        
                        // Trigger input event to notify the page of the change
                        element.dispatchEvent(new Event('input', { bubbles: true }));
                        element.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                }
            } catch (error) {
                console.error('Error checking spelling in input:', error);
            }
        }
    }
    // For contenteditable elements
    else if (element.isContentEditable) {
        const textNodes = getTextNodesIn(element);
        for (const textNode of textNodes) {
            await checkAndCorrectTextElement(textNode);
        }
    }
}

// Get all text nodes within an element
function getTextNodesIn(node) {
    const textNodes = [];
    const walker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    let textNode;
    while (textNode = walker.nextNode()) {
        if (textNode.textContent.trim() !== '') {
            textNodes.push(textNode);
        }
    }
    return textNodes;
}

// Handle typing in input fields with debounced checking
const handleInput = debounce(async (event) => {
    const element = event.target;
    await checkAndCorrectInputElement(element);
}, 500);

// Monitor dynamically added elements
const observeDOM = () => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Check if the added node is an input element
                    if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA' || node.isContentEditable) {
                        // Add event listeners to new input elements
                        node.addEventListener('input', handleInput);
                        node.addEventListener('blur', async () => {
                            await checkAndCorrectInputElement(node);
                        });
                    }
                    
                    // Check for nested input elements
                    const inputs = node.querySelectorAll('input, textarea, [contenteditable="true"], [contenteditable=""]');
                    inputs.forEach(input => {
                        input.addEventListener('input', handleInput);
                        input.addEventListener('blur', async () => {
                            await checkAndCorrectInputElement(input);
                        });
                    });
                }
            });
        });
    });

    observer.observe(document, {
        childList: true,
        subtree: true
    });
};

// Initialize the spell checker on the page
const initializeSpellChecker = async () => {
    // Check if background script is ready
    try {
        const response = await chrome.runtime.sendMessage({ action: 'initialize' });
        if (!response.initialized) {
            console.error('Spell checker not initialized in background script');
            return;
        }
    } catch (error) {
        console.error('Error communicating with background script:', error);
        return;
    }

    // Add listeners to existing input elements
    const inputs = document.querySelectorAll('input, textarea, [contenteditable="true"], [contenteditable=""]');
    inputs.forEach(input => {
        input.addEventListener('input', handleInput);
        input.addEventListener('blur', async () => {
            await checkAndCorrectInputElement(input);
        });
    });

    // Start observing for new elements
    observeDOM();
    
    console.log('CorrectSpell content script initialized');
};

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSpellChecker);
} else {
    initializeSpellChecker();
}