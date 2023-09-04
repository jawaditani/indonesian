// Levenshtein Distance function
function levenshteinDistance(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }

    return matrix[b.length][a.length];
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
    "I want to eat fried rice with ice tea": ["Saya mau makan nasi goreng dengan es teh"],
    "That cat is over there": ["Kucing itu di sana"],
    "They come and go": ["Mereka datang dan pergi"],
    "She like chicken soup because I like orange juice": ["Dia suka sup ayam karena saya suka jus jeruk"],
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
    console.log("Unseen sentences:", unseenSentences); // Log unseen sentences
    console.log("Mistakes:", mistakes); // Log mistakes

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
