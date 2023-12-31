// Variables to hold the current set of sentences and mistakes
let currentSentences = {};
let mistakes = [];
let unseenSentences = [];

// Is mute state
let isMuted = true;

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
        setTimeout(() => canPressEnter = true, 1000); // Re-enable after 1 second

        if (isChecking) {
            nextSentence();
        } else {
            checkTranslation();
        }
    }
});

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Wait for 2-3 seconds after the page has loaded
    setTimeout(function() {
        const muteButton = document.getElementById('muteButton');
        muteButton.classList.add('animate__animated', 'animate__shakeY');
    }, 3000);  // 3000 milliseconds = 3 seconds
});

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        const muteButton = document.getElementById('muteButton');
        muteButton.classList.add('animate__animated', 'animate__shakeY');

        // Remove the animation classes after it completes
        muteButton.addEventListener('animationend', function() {
            muteButton.classList.remove('animate__animated', 'animate__shakeY');
        });
    }, 3000);
});

document.getElementById('muteButton').addEventListener('click', function() {
    isMuted = !isMuted; // Toggle the mute state

    // Update button text based on mute state
    this.textContent = isMuted ? "Unmute" : "Mute"; 

    // Update all audio elements to reflect the new mute state
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.muted = isMuted;
    });
});

// Function to play the correct sound
function playCorrectSound() {
    console.log("Trying to play correct sound");
    if (!isMuted) {
        const sound = document.getElementById('correctSound');
    sound.play().catch(error => {
        console.error("Error playing correct sound:", error);
        });
    }
}

// Function to play the incorrect sound
function playIncorrectSound() {
    console.log("Trying to play incorrect sound");
    if (!isMuted) {
        const sound = document.getElementById('incorrectSound');
        sound.play().catch(error => {
        console.error("Error playing correct sound:", error);
        });
    }
}

// Function to play a random hover sound
function playRandomHoverSound() {
    if (!isMuted) {
        // Stop all hover sounds
        const hoverSounds = ['hoverSound1', 'hoverSound2', 'hoverSound3', 'hoverSound4'];
        hoverSounds.forEach(soundId => {
            const audio = document.getElementById(soundId);
            audio.pause(); // Stop the sound
            audio.currentTime = 0; // Reset the sound to the beginning
        });

        // Play a random hover sound
        const randomSound = hoverSounds[Math.floor(Math.random() * hoverSounds.length)];
        document.getElementById(randomSound).play();
    }
}

// Function to play the selection sound
function playSelectionSound() {
    console.log("Trying to play selection sound");
    if (!isMuted) document.getElementById('selectionSound').play();
}

// Add hover sound event listeners to the buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseover', playRandomHoverSound);
});


function sanitizeInput(str) {
    return str.replace(/[?,!-]/g, ''); // Removes ?, !, , and -
}

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
    playCorrectSound();
    result.textContent = "Correct!";
    result.style.color = "green";
    correctCount++;
} else if (correctTranslations.some(correct => levenshteinDistance(correct, userInput) === 1)) {
    playCorrectSound();
    result.textContent = "Correct (typo, but we'll forgive you)";
    result.style.color = "orange";
    typoCount++;
} else {
    playIncorrectSound();
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
    playSelectionSound();
    currentSentences = verbs1Sentences;
    startExercise();
}

function loadVerbs2() {
    playSelectionSound();
    currentSentences = verbs2Sentences;
    startExercise();
}

function loadVerbs3() {
    playSelectionSound();
    currentSentences = verbs3Sentences;
    startExercise();
}

// ... Similarly, you'll have functions for other categories:
function startLocationsExercise() {
    playSelectionSound();
    currentSentences = {...locationSentences};
    startExercise();
}

function startClothingExercise() {
    playSelectionSound();
    currentSentences = {...clothingSentences};
    startExercise();
}

function startFoodAndBeverageExercise() {
    playSelectionSound();
    currentSentences = {...foodAndBeverageSentences};
    startExercise();
}

function startQuestionsExercise() {
    playSelectionSound();
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
    isChecking = false; // Reset the isChecking flag

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
