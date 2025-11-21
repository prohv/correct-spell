import NSpell from 'nspell';

let spellchecker = null; //var to store spellcheck instance

async function initializeSpellChecker(){
    try {
        console.log("Initialising spell check...");
        const affResponse = await fetch(chrome.runtime.getURL('dictionaries/en_US.aff'));
        const dicResponse = await fetch(chrome.runtime.getURL('dictionaries/en_US.dic'));
        const affContent = await affResponse.text();
        const dicContent = await dicResponse.text();
        spellchecker = new NSpell(affContent, dicContent);
        console.log("Spell check initialised successfully.");
        return true;
    } catch (error) {
        console.error("Failed to initialise spell check:", error);
        return false;
    }
}