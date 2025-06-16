// DOM Elements
const textInput = document.getElementById('text-input');
const wordCount = document.getElementById('word-count');
const characterCount = document.getElementById('character-count');
const charNoSpacesCount = document.getElementById('char-no-spaces-count');

// Function to count words and characters
function countWordsAndChars(text) {
    // Trim the text and handle empty inputs
    const trimmedText = text.trim();
    
    // Count characters (including spaces)
    const chars = text.length;
    
    // Count characters excluding spaces
    const charsNoSpaces = text.replace(/\s+/g, '').length;
    
    // Count words by splitting on whitespace
    const words = trimmedText === '' ? 0 : trimmedText.split(/\s+/).length;
    
    return { words, chars, charsNoSpaces };
}

// Function to update the counters
function updateCounters() {
    const text = textInput.value;
    const { words, chars, charsNoSpaces } = countWordsAndChars(text);
    
    wordCount.textContent = words;
    characterCount.textContent = chars;
    charNoSpacesCount.textContent = charsNoSpaces;
    
    // Save to local storage
    localStorage.setItem('savedText', text);
}

// Load saved text from local storage (if available)
function loadSavedText() {
    const savedText = localStorage.getItem('savedText');
    
    if (savedText) {
        textInput.value = savedText;
        updateCounters();
    }
}

// Event listeners
textInput.addEventListener('keyup', updateCounters);

// Also listen for paste events
textInput.addEventListener('paste', () => {
    // Use setTimeout to ensure the paste content is available
    setTimeout(updateCounters, 0);
});

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', loadSavedText);
