let startButton = document.querySelector("#start-button");
let timer = document.querySelector("#timer");

let q1 = new QuizQ("question1", ["choice1", "choice2", "choice3", "choice4"], "choice2");
let q2 = new QuizQ("question1", ["choice1", "choice2", "choice3", "choice4"], "choice2");
let q3 = new QuizQ("question1", ["choice1", "choice2", "choice3", "choice4"], "choice2");
let q4 = new QuizQ("question1", ["choice1", "choice2", "choice3", "choice4"], "choice2");
let q5 = new QuizQ("question1", ["choice1", "choice2", "choice3", "choice4"], "choice2");

const questionsArray = [q1, q2, q3, q4, q5];

// Object constructor for the quiz questions
function QuizQ(question, choices, answer) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
}

startButton.addEventListener("click", function() {
    startButton.style.visibility = 'hidden';
    runQuiz();
});

function runQuiz() {
    // randomize the quiz questions
    const newQsArray = randomizeQs(questionsArray);
    // Start the timer 

    // Display the questions
    
};

function randomizeQs(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};