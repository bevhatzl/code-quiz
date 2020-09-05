let startButton = document.querySelector("#start-button");
let timer = document.querySelector("#timer");
let questionGroup = document.querySelector("#question-group");
let questionEl = document.querySelector("#question");
let option1El = document.querySelector("#option1");
let option2El = document.querySelector("#option2");
let option3El = document.querySelector("#option3");
let option4El = document.querySelector("#option4");
let optionElsArray = [option1El, option2El, option3El, option4El]
let activeQuestion = 0;

// Creating the objects
let q1 = new QuizQ("Which built-in method combines the text of two strings and returns a new string?", ["append()", "concat()", "attach()", "None of the above."], 1);
let q2 = new QuizQ("Which of the following function of Number object forces a number to display in exponential notation?", ["toExponential()", "toFixed()", "toPrecision()", "toLocaleString()"], 0);
let q3 = new QuizQ("What is the HTML tag under which one can write the JavaScript code?", ["<javascript>", "<scripted>", "<script>", "<js>"], 2);
let q4 = new QuizQ("Which of the following is the correct syntax to display an alert box using JavaScript?", ["alertbox()", "msg()", "msgbox()", "alert()"], 3);
let q5 = new QuizQ("Which of the following is not a reserved word in JavaScript?", ["interface", "throws", "program", "short"], 2);

const questionsArray = [q1, q2, q3, q4, q5];

let interval;
let secondsElapsed = 0;
const maxTime = 75;
let countdown = 75000;


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
    
    setTimeout(function() {
        // End the quiz and go to scores page
        // displayScore();
         // go to high scores page
         document.write("High Scores Page");
    }, 75000)
   
    // Display the questions
    
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
        secondsElapsed++;
        timer.textContent = maxTime - secondsElapsed;
        countdown = countdown - 1000;
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
        // set correct attribute to correct answer
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
        // go to high scores page
        document.write("High Scores Page");
    }
  }   
    
}


questionGroup.addEventListener("click", function(event) {
    let element = event.target;
  
    // If that element is a button...
    if (element.matches("button") === true) {
        // Check answer to question
        if (!element.hasAttribute("data-correct")) {
            secondsElapsed = secondsElapsed + 15;
            countdown = countdown = 15000;

        } 
        activeQuestion++;
        // reset the attribute

        renderQuestion(questionsArray);
    }

});

