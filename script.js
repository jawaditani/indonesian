// Levenshtein Distance function
function levenshteinDistance(a, b) {
    // ... (same as before)
}

// Sanitize Input function
function sanitizeInput(str) {
    return str.replace(/[?,!]/g, ''); // Removes ?, , and !
}

// Rest of the script
const englishText = document.getElementById('englishText');
const translationInput = document.getElementById('translationInput');
const result = document.getElementById('result');
const checkButton = document.querySelector('button');

const translations = {
    "Hello": ["Halo"],
    "I am 10 years old": ["Umur saya sepuluh tahun", "Umurku sepuluh tahun"],
    // ... add more translations
};

let unseenSentences = Object.keys(translations);
let mistakes = [];

translationInput.addEventListener('keyup', function(event) {
    // ... (same as before)
});

checkButton.addEventListener('click', function() {
    // ... (same as before)
});

function checkTranslation() {
    const userInput = sanitizeInput(translationInput.value.trim().toLowerCase());
    const correctTranslations = translations[englishText.textContent].map(t => sanitizeInput(t.toLowerCase()));

    if (correctTranslations.includes(userInput)) {
        result.textContent = "Correct!";
        result.style.color = "green";
    } else if (correctTranslations.some(correct => levenshteinDistance(correct, userInput) === 1)) {
        result.textContent = "Correct (typo, but we'll forgive you)";
        result.style.color = "orange";
    } else {
        result.textContent = "Incorrect. Try again.";
        result.style.color = "red";
        mistakes.push(englishText.textContent);
    }

    checkButton.textContent = 'Next Sentence';
}

function nextSentence() {
    // ... (same as before)
}

// Start with the first sentence
nextSentence();
