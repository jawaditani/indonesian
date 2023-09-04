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
    if (event.key === 'Enter') {
        if (checkButton.textContent === 'Check') {
            checkTranslation();
        } else {
            nextSentence();
        }
    }
});

checkButton.addEventListener('click', function() {
    if (checkButton.textContent === 'Check') {
        checkTranslation();
    } else {
        nextSentence();
    }
});

function checkTranslation() {
    const userInput = translationInput.value.trim().toLowerCase();
    const correctTranslations = translations[englishText.textContent].map(t => t.toLowerCase());

    if (correctTranslations.includes(userInput)) {
        result.textContent = "Correct!";
        result.style.color = "green";
    } else {
        result.textContent = "Incorrect. Try again.";
        result.style.color = "red";
        mistakes.push(englishText.textContent);
    }

    checkButton.textContent = 'Next Sentence';
}

function nextSentence() {
    if (unseenSentences.length > 0) {
        const randomIndex = Math.floor(Math.random() * unseenSentences.length);
        const randomSentence = unseenSentences[randomIndex];
        englishText.textContent = randomSentence;
        unseenSentences.splice(randomIndex, 1);
        translationInput.value = '';
        result.textContent = '';
        checkButton.textContent = 'Check';
    } else if (mistakes.length > 0) {
        englishText.textContent = "Let's go through your previous mistakes";
        unseenSentences = [...mistakes];
        mistakes = [];
        nextSentence();
    } else {
        englishText.textContent = "All done!";
        translationInput.value = '';
        result.textContent = '';
        checkButton.style.display = 'none';
    }
}

// Start with the first sentence
nextSentence();
