// CorrectSpell Popup Script
// Plain JavaScript implementation

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const autoCorrectCheckbox = document.getElementById('autoCorrect');
    const showSuggestionsCheckbox = document.getElementById('showSuggestions');
    
    // Load settings from storage
    loadSettings();
    
    // Add event listeners to checkboxes
    autoCorrectCheckbox.addEventListener('change', function() {
        saveSetting('autoCorrect', this.checked);
    });
    
    showSuggestionsCheckbox.addEventListener('change', function() {
        saveSetting('showSuggestions', this.checked);
    });
    
    // Function to load settings from storage
    function loadSettings() {
        chrome.storage.sync.get({
            autoCorrect: true,
            showSuggestions: true
        }, function(items) {
            autoCorrectCheckbox.checked = items.autoCorrect;
            showSuggestionsCheckbox.checked = items.showSuggestions;
        });
    }
    
    // Function to save a setting to storage
    function saveSetting(key, value) {
        const obj = {};
        obj[key] = value;
        chrome.storage.sync.set(obj, function() {
            console.log(`${key} setting saved:`, value);
        });
    }
});