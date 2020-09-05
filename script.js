let startButton = document.querySelector("#start-button");
let timer = document.querySelector("#timer");
let questionGroup = document.querySelector("#question-group");
let questionEl = document.querySelector("#question");
let option1El = document.querySelector("#option1");
let option2El = document.querySelector("#option2");
let option3El = document.querySelector("#option3");
let option4El = document.querySelector("#option4");

// Creating the objects
let q1 = new QuizQ("question1", ["choice1", "choice2", "choice3", "choice4"], "choice2");
let q2 = new QuizQ("question1", ["choice1", "choice2", "choice3", "choice4"], "choice2");
let q3 = new QuizQ("question1", ["choice1", "choice2", "choice3", "choice4"], "choice2");
let q4 = new QuizQ("question1", ["choice1", "choice2", "choice3", "choice4"], "choice2");
let q5 = new QuizQ("question1", ["choice1", "choice2", "choice3", "choice4"], "choice2");

const questionsArray = [q1, q2, q3, q4, q5];

let interval;
let secondsElapsed = 0;
let maxTime = 75;

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
    startTimer();
    // Display the questions
    renderQuestion(newQsArray);

    // Check answer to question


};

function randomizeQs(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

function startTimer() {
    interval = setInterval(function() {
        secondsElapsed++;
        timer.textContent = maxTime - secondsElapsed;
    }, 1000);
}

function renderQuestion(questions) {
    questionGroup.style.visibility = "visible"; 
  
    console.log(questionsArray);
    console.log(questions);

        questionEl.textContent = questions[0].question;
        option1El.textContent = questions[0].choices[0];
        option2El.textContent = questions[0].choices[1];
        option3El.textContent = questions[0].choices[2];
        option4El.textContent = questions[0].choices[3];

        // Check answer to question


  
    
}