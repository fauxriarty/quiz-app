let game = new Game();

document.addEventListener("DOMContentLoaded", function() {
    game.startGame();
});

const overlay = document.getElementById('overlay');
overlay.style.display = 'none';

let timerValue = 120;
let timerInterval;
const timerDisplay = document.createElement('p');
document.body.appendChild(timerDisplay);

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timerValue--;
        updateTimerDisplay();
        if (timerValue <= 0) {
            endGameDueToTimeOut();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    timerValue = 120;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timerValue / 60);
    const seconds = timerValue % 60;
    timerDisplay.textContent = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function endGameDueToTimeOut() {
    clearInterval(timerInterval);
    alert("Time's up!");
    game.endQuiz();
}

const answers = document.querySelector('.answers');
answers.addEventListener('click', (e) => {
    pauseTimer();
    if (!answers.classList.contains('active') && e.target.classList.contains('answer')) {
        game.handleInteraction(e);
        answers.classList.add('active');
    }
});

const next_button = document.querySelector('.next');
next_button.addEventListener('click', () => {
    startTimer();
    if (answers.classList.contains('active')) {
        answers.classList.remove('active');
        game.questionNumber++;
        game.handleShowNewQuestion();
    }
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-reset')) {
        game = new Game();
        game.startGame();
        resetTimer();
    }
});
