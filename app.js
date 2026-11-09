
let randomNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 0;
const maxAttempts = 4;
let gameOver = false;

function checkGuess() {
    if (gameOver) return;

    const inputField = document.getElementById("guessNumber");
    let result = document.getElementById("result");
    
    // Check if input is empty
    if (inputField.value === "") {
        result.innerHTML = "⚠️ Please enter a number!";
        result.className = "error";
        return;
    }

    let userGuess = Number(inputField.value);

    // Check range validation
    if (userGuess < 1 || userGuess > 10) {
        result.innerHTML = "⚠️ Enter a number between 1 and 10!";
        result.className = "error";
        return;
    }

    // Increment attempt count
    attempts++;

    // Add entry to history (create container/list if it doesn't exist yet)
    let historyList = document.getElementById("historyList");
    if (!historyList) {
        // If historyList element isn't in your HTML yet, you can create it dynamically or add it to HTML
        const container = document.querySelector(".game-container");
        const historyDiv = document.createElement("div");
        historyDiv.id = "history-container";
        historyDiv.innerHTML = `<h3>Guess History</h3><div id="historyList"></div>`;
        container.insertBefore(historyDiv, document.querySelector(".footer-text"));
        historyList = document.getElementById("historyList");
    }

    const historyRow = document.createElement("p");
    historyRow.textContent = `Row ${attempts}: You guessed ${userGuess}`;
    historyList.appendChild(historyRow);

    // Check win, fail, or wrong guess conditions
    if (userGuess === randomNumber) {
        result.innerHTML = "🎉 Congratulations! You Got It Right!";
        result.className = "success";
        endGame();
    } else if (attempts >= maxAttempts) {
        result.innerHTML = `❌ Attempt failed. Try again! (The number was ${randomNumber})`;
        result.className = "error";
        endGame();
    } else {
        result.innerHTML = `😢 Oops! Wrong Guess. (${maxAttempts - attempts} attempts left)`;
        result.className = "error";
    }

    inputField.value = "";
    inputField.focus();
}

function endGame() {
    gameOver = true;
    document.getElementById("guessNumber").disabled = true;
    // Optional: disable the button if you have an ID on it
    const btn = document.querySelector("button");
    if (btn) btn.disabled = true;
}