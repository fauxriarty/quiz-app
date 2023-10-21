class Game {
    constructor() {
        this.questionsArray = [...data];
        this.question_object = null;
        this.correctAnswers = 0;
        this.questionNumber = 1;
    }

    getRandomQuestion() {
        let randomNumber = Math.floor(Math.random() * this.questionsArray.length);
        return new Question(this.questionsArray[randomNumber])
    }

    startGame() {
        this.handleShowNewQuestion();
        startTimer();
        document.getElementById('overlay').style.display = 'none';
        document.querySelector('.total-questions').textContent = `Total Questions: ${data.length}`;
        document.querySelector('body').style.backgroundColor = '';
        this.updateScore();
    }

    handleShowNewQuestion() {
        if (this.question_object !== null) {
            for (let i = 0; i < this.questionsArray.length; i++) {
                if (this.questionsArray[i].question === this.question_object.question.question) {
                    this.questionsArray.splice(i, 1);
                }
            }
        }
        if (this.questionsArray.length === 0) {
            this.endQuiz();
            return;
        }
        this.question_object = this.getRandomQuestion();
        this.question_object.addQuestionToDisplay();
    }

    handleInteraction(e) {
        e.target.style.borderColor = "black";
        this.question_object.showAnswers()
        const answer = this.question_object.question.correct_answer;
        if (answer === e.target.textContent) {
            this.correctAnswers++;
        }
        this.updateScore();
    }

    updateScore() {
        const scoreBoard = document.querySelector('p');
        scoreBoard.innerHTML = `Your score: ${this.correctAnswers}/${this.questionNumber}`;
    }

    endQuiz() {
        document.getElementById('overlay').style.display = 'flex';
        document.querySelector('body').style.backgroundColor = '#3659a2';
        document.getElementById('end-h3').textContent = `Your Score: ${this.correctAnswers}/${this.questionNumber}`;
    }
}
