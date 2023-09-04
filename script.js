const englishText = document.getElementById('englishText');
const translationInput = document.getElementById('translationInput');
const result = document.getElementById('result');

const translations = {
    "Hello": "Halo",
    // Add more translations as needed
    // "English": "Indonesian"
};

function checkTranslation() {
    const userInput = translationInput.value.trim().toLowerCase();
    const correctTranslation = translations[englishText.textContent].toLowerCase();

    if (userInput === correctTranslation) {
        result.textContent = "Correct!";
        result.style.color = "green";
    } else {
        result.textContent = "Incorrect. Try again.";
        result.style.color = "red";
    }
}
