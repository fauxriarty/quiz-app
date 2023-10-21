class Question {
    constructor(question) {
        this.question = question;
    }

    addQuestionToDisplay() {
        const question_container = document.querySelector(".quiz-container h3");
        const answers_container = document.querySelector(".answers");
        question_container.innerHTML = this.question.question;
        let answers = [this.question.correct_answer].concat(this.question.incorrect_answers);
        this.randomAnswers(answers);
        let answers_html = "";
        answers.forEach((answer) => {
            answers_html += `<div class='answer'>${answer}</div>`;
        });
        answers_container.innerHTML = answers_html;
        this.styleByCategory(this.question.category);
    }

    checkAnswer(answer) {
        return answer === this.question.correct_answer;
    }

    showAnswers() {
        const answers = document.querySelectorAll(".answer");
        answers.forEach((answer) => {
            if (this.checkAnswer(answer.textContent)) {
                answer.style.backgroundColor = "green";
            } else {
                answer.style.backgroundColor = "red";
            }
        });
    }

    randomAnswers(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    styleByCategory(category) {
        const body = document.querySelector('body');
        const h3 = document.querySelector('.category');
        const answers = document.querySelectorAll(".answer");
        
        const categoryMapping = {
            'javascript': { displayText: 'Current Category: JavaScript', className: 'js' },
            'css': { displayText: 'Current Category: CSS', className: 'css' },
            'html': { displayText: 'Current Category: HTML', className: 'html' },
        };

        let categoryDetails = categoryMapping[category];
        if (categoryDetails) {
            body.className = categoryDetails.className;
            h3.textContent = categoryDetails.displayText;
            answers.forEach((answer) => {
                answer.classList.add(categoryDetails.className);
            });
        }
    }
}
