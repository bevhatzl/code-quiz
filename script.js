let startButton = document.querySelector("#start-button");
let scoresPageBtn = document.querySelector(".hs-link");
let timer = document.querySelector("#timer");
let questionGroup = document.querySelector("#question-group");
let tickEl = document.querySelector("#tick");
let crossEl = document.querySelector("#cross");
let questionEl = document.querySelector("#question");
let option1El = document.querySelector("#option1");
let option2El = document.querySelector("#option2");
let option3El = document.querySelector("#option3");
let option4El = document.querySelector("#option4");
let optionElsArray = [option1El, option2El, option3El, option4El]
let activeQuestion = 0;
let interval;
let secondsElapsed = 0;
const maxTime = 75;
let countdown = 75000;
let score;

// Creating the objects
let q1 = new QuizQ("Which built-in method combines the text of two strings and returns a new string?", ["append()", "concat()", "attach()", "None of the above."], 1);
let q2 = new QuizQ("Which of the following function of Number object forces a number to display in exponential notation?", ["toExponential()", "toFixed()", "toPrecision()", "toLocaleString()"], 0);
let q3 = new QuizQ("What is the HTML tag under which one can write the JavaScript code?", ["<javascript>", "<scripted>", "<script>", "<js>"], 2);
let q4 = new QuizQ("Which of the following is the correct syntax to display an alert box using JavaScript?", ["alertbox()", "msg()", "msgbox()", "alert()"], 3);
let q5 = new QuizQ("Which of the following is not a reserved word in JavaScript?", ["interface", "throws", "program", "short"], 2);

const questionsArray = [q1, q2, q3, q4, q5];

// Object constructor for the quiz questions
function QuizQ(question, choices, answer) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
}

tickEl.style.visibility = "hidden";
crossEl.style.visibility = "hidden";

startButton.addEventListener("click", function() {
    startButton.style.visibility = 'hidden';
    runQuiz();
});

function runQuiz() {
    // randomize the quiz questions
    const newQsArray = randomizeQs(questionsArray);
    // Start the timer 
    startTimer();
    // Display the first question
    renderQuestion(newQsArray); 
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
        let isTimedOut;
        secondsElapsed++;
        timer.textContent = maxTime - secondsElapsed;
        countdown = countdown - 1000;
        // Check if timer has reached 0
        countdown <= 0 ? isTimedOut = true : isTimedOut = false;
        if (isTimedOut) {
            clearInterval(interval);
            // End the quiz and go to scores page
            score = maxTime - secondsElapsed;
            // If score is less than zero, change to 0
            if (score < 0) {
                score = 0;
                localStorage.setItem("score", JSON.stringify(score));
            }
            localStorage.setItem("quizCompleted", true);
            window.location = "./scores.html";  
        }
    }, 1000);    
}

function renderQuestion(questions) {
  if (countdown > 0)  {
    questionGroup.style.visibility = "visible"; 
    if (activeQuestion < questions.length) {
        questionEl.textContent = questions[activeQuestion].question;
        option1El.textContent = questions[activeQuestion].choices[0];
        option2El.textContent = questions[activeQuestion].choices[1];
        option3El.textContent = questions[activeQuestion].choices[2];
        option4El.textContent = questions[activeQuestion].choices[3];
        // set correct attribute to the correct answer
        let correctAnswer = questions[activeQuestion].answer;
        if (correctAnswer === 0) {
            option1El.setAttribute("data-correct", true);
            option2El.removeAttribute("data-correct");
            option3El.removeAttribute("data-correct");
            option4El.removeAttribute("data-correct");
        }
        if (correctAnswer === 1) {
            option2El.setAttribute("data-correct", true);
            option1El.removeAttribute("data-correct");
            option3El.removeAttribute("data-correct");
            option4El.removeAttribute("data-correct");

        }
        if (correctAnswer === 2) {
            option3El.setAttribute("data-correct", true);
            option1El.removeAttribute("data-correct");
            option2El.removeAttribute("data-correct");
            option4El.removeAttribute("data-correct");

        }
        if (correctAnswer === 3) {
            option4El.setAttribute("data-correct", true);
            option1El.removeAttribute("data-correct");
            option2El.removeAttribute("data-correct");
            option3El.removeAttribute("data-correct");
        }
    } else {
        // go to high scores page since no more questions        
        score = maxTime - secondsElapsed;
        // If score is less than zero, change to 0
        if (score < 0) {
            score = 0;
        }
        localStorage.setItem("score", JSON.stringify(score));
        localStorage.setItem("quizCompleted", true);
        window.location = "./scores.html";  
    }
  }       
}

questionGroup.addEventListener("click", function(event) {
    let element = event.target;  
    // If target element is a button...
    if (element.matches("button") === true) {
        // Check answer to question
        if (!element.hasAttribute("data-correct")) {
            // Penalise wrong answer and display a cross
            crossEl.style.visibility = "visible";
            setTimeout(function(){ 
                crossEl.style.visibility = "hidden";
            }, 1000);
            secondsElapsed = secondsElapsed + 15;
            countdown = countdown - 15000;
        } else {
            // display a tick
            tickEl.style.visibility = "visible";
            setTimeout(function(){ 
                tickEl.style.visibility = "hidden";
            }, 1000);
        }
        activeQuestion++;
        renderQuestion(questionsArray);
    }
});

// If high scores link is clicked...
scoresPageBtn.addEventListener("click", function(event) {
    localStorage.setItem("quizCompleted", false);
    window.location = "./scores.html";    
});
