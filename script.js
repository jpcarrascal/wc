// DOM Elements
const textInput = document.getElementById('text-input');
const wordCount = document.getElementById('word-count');
const characterCount = document.getElementById('character-count');
const charNoSpacesCount = document.getElementById('char-no-spaces-count');
const lineCount = document.getElementById('line-count');

// Function to count words and characters
function countWordsAndChars(text) {
    // Trim the text and handle empty inputs
    const trimmedText = text.trim();
    
    // Count characters (including spaces)
    const chars = text.length;
    
    // Count characters excluding spaces
    const charsNoSpaces = text.replace(/\s+/g, '').length;
    
    // Count lines (1 + number of line breaks)
    const lines = text === '' ? 0 : text.split('\n').length;
    
    // Count words by splitting on whitespace
    const words = trimmedText === '' ? 0 : trimmedText.split(/\s+/).length;
    
    return { words, chars, charsNoSpaces, lines };
}

// Function to update the counters
function updateCounters() {
    const text = textInput.value;
    const { words, chars, charsNoSpaces, lines } = countWordsAndChars(text);
    
    wordCount.textContent = words;
    characterCount.textContent = chars;
    charNoSpacesCount.textContent = charsNoSpaces;
    lineCount.textContent = lines;
    
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

// Download textarea content as a file on Ctrl+S or Cmd+S
function downloadTextFile(filename, text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Event listeners
textInput.addEventListener('keyup', updateCounters);

// Also listen for paste events
textInput.addEventListener('paste', () => {
    // Use setTimeout to ensure the paste content is available
    setTimeout(updateCounters, 0);
});

document.addEventListener('keydown', function(e) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    if ((isMac && e.metaKey && e.key === 's') || (!isMac && e.ctrlKey && e.key === 's')) {
        e.preventDefault();
        const text = textInput.value;
        downloadTextFile('word-counter.txt', text);
    }
});

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', loadSavedText);
