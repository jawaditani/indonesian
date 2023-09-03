document.addEventListener("DOMContentLoaded", function () {
    const translationForm = document.getElementById("translationForm");
    const userTranslationInput = document.getElementById("userTranslation");
    const checkButton = document.getElementById("checkButton");
    const resultDiv = document.getElementById("result");

    const sentences = [
        { english: "Hello, how are you?", indonesian: "Halo, apa kabar?" },
        // Add more sentences and translations here
    ];

    checkButton.addEventListener("click", function () {
        const userTranslation = userTranslationInput.value.trim();
        const currentSentence = sentences[0]; // For simplicity, using the first sentence

        if (userTranslation === currentSentence.indonesian) {
            resultDiv.textContent = "Correct!";
            resultDiv.style.color = "green";
        } else {
            resultDiv.textContent = "Incorrect. The correct translation is: " + currentSentence.indonesian;
            resultDiv.style.color = "red";
        }
    });
});
