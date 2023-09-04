// Variables to hold the current set of sentences and mistakes
let currentSentences = {};
let mistakes = [];
let unseenSentences = [];

// Score variables
let correctCount = 0;
let typoCount = 0;
let incorrectCount = 0;

// Press enter key
let canPressEnter = true;

let isChecking = false; // A flag to determine if we're in the checking phase or the next sentence phase

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && canPressEnter) {
        canPressEnter = false;
        setTimeout(() => canPressEnter = true, 2000); // Re-enable after 2 seconds

        if (isChecking) {
            nextSentence();
        } else {
            checkTranslation();
        }
    }
});

function sanitizeInput(str) {
    return str.replace(/[?,!-]/g, ''); // Removes ?, !, , and -
}

function checkTranslation() {
    const userInput = sanitizeInput(translationInput.value.trim().toLowerCase());
    
    // Check if the input is empty
    if (userInput === "") {
        result.textContent = "Type something first!";
        result.style.color = "red";
        translationInput.classList.add('shake');
        setTimeout(() => translationInput.classList.remove('shake'), 500);
        return;
    }

    const correctTranslations = currentSentences[englishText.textContent].map(t => sanitizeInput(t.toLowerCase()));

    if (correctTranslations.includes(userInput)) {
        result.textContent = "Correct!";
        result.style.color = "green";
        correctCount++;
    } else if (correctTranslations.some(correct => levenshteinDistance(correct, userInput) === 1)) {
        result.textContent = "Correct (typo, but we'll forgive you)";
        result.style.color = "orange";
        typoCount++;
    } else {
        result.textContent = "Incorrect. Try again.";
        result.style.color = "red";
        mistakes.push(englishText.textContent);
        incorrectCount++;
    }
    // Update the scoreboard
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('typoCount').textContent = typoCount;
    document.getElementById('incorrectCount').textContent = incorrectCount;
    document.getElementById('totalCount').textContent = correctCount + typoCount + incorrectCount;

    translationInput.disabled = true; // Disable the input box
    isChecking = true; // Set the flag to true, indicating we're in the checking phase
}


// Function to start the Verbs exercise
function loadVerbs1() {
    currentSentences = verbs1Sentences;
    startExercise();
}

function loadVerbs2() {
    currentSentences = verbs2Sentences;
    startExercise();
}

function loadVerbs3() {
    currentSentences = verbs3Sentences;
    startExercise();
}

// ... Similarly, you'll have functions for other categories:
function startLocationsExercise() {
    currentSentences = {...locationSentences};
    startExercise();
}

function startClothingExercise() {
    currentSentences = {...clothingSentences};
    startExercise();
}

function startFoodAndBeverageExercise() {
    currentSentences = {...foodAndBeverageSentences};
    startExercise();
}

function startQuestionsExercise() {
    currentSentences = {...questionSentences};
    startExercise();
}

// Function to start the exercise
function startExercise() {
    unseenSentences = Object.keys(currentSentences);
    nextSentence(); // Start with the first sentence
}

// Next Sentence Function
function nextSentence() {
    translationInput.disabled = false; // Re-enable the input box
    translationInput.focus(); // Set focus back to the input field

    if (unseenSentences.length > 0) {
        const randomIndex = Math.floor(Math.random() * unseenSentences.length);
        const randomSentence = unseenSentences[randomIndex];
        englishText.textContent = randomSentence;
        unseenSentences.splice(randomIndex, 1);
        translationInput.value = '';
        result.textContent = '';
    } else if (mistakes.length > 0) {
        englishText.textContent = "Let's go through your previous mistakes";
        unseenSentences = [...mistakes];
        mistakes = [];
        nextSentence();
    } else {
        englishText.textContent = "All done!";
        translationInput.value = '';
        result.textContent = '';
    }
}

// ... Rest of the script for checking translations, Levenshtein distance, etc., remains unchanged ...

// You don't need to call nextSentence() at the end of this script anymore, as it will be called when a category is selected.

