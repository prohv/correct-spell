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

function checkSpelling(word) {
    if(!spellchecker){
        console.log("Spell checker not initialised");
        return;
    }
    const isCorrect = spellchecker.correct(word);
    const suggestions = isCorrect ? [] : spellchecker.suggest(word).slice(0,2);
    return {
        correct: isCorrect,
        suggestions: suggestions
    }

}

initializeSpellChecker();

function preProcessWord(word){
    if(typeof word !== 'string' || word.length===0){
        return null;
    }
    return word.toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g, '');
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    if(request.action === 'checkSpelling'){
        const result = checkSpelling(preProcessWord(request.word));
        sendResponse(result);
    }
    else if (request.action === 'initialize'){
        sendResponse({initialized : !!spellchecker});
    }
    else {
        sendResponse({error: 'Unknown action'});
    }
});