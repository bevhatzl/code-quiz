let scoreEl = document.querySelector("#scoreText");
let score = localStorage.getItem("score");
let userInput = document.querySelector("#score-text");
let scoreForm = document.querySelector("#score-form");
let scoreList = document.querySelector("#score-list");
let submitBtn = document.querySelector("#submit-btn");
let startOverBtn = document.querySelector("#start-over");
let clearBtn = document.querySelector("#clear-scores");
let scores = [];
let initial;
let completedBoolean;

scoreEl.textContent += score;

// If quiz not completed... immediately display high scores list
 let isCompleted = localStorage.getItem("quizCompleted");
 console.log(typeof(isCompleted));
 console.log(isCompleted);
 if (isCompleted === "true") {
    completedBoolean = true;
 } 
 if (isCompleted === "false") {
    completedBoolean = false;
 } 
 
if (completedBoolean === false) {
    scoreEl.style.visibility = "hidden";


    storedScores = JSON.parse(localStorage.getItem("scores"));
    if (!storedScores) {
        localStorage.setItem("scores", JSON.stringify([]));
    }
    storedScores = JSON.parse(localStorage.getItem("scores")); 

    scores = JSON.parse(localStorage.getItem("scores"));

    sortScores();


    renderScores();
} 


function renderScores() {
    // Clear scoreList element 
    scoreList.innerHTML = "";
    // Remove the text input and submit button from being displayed
    scoreForm.style.visibility = 'hidden';
    // Display Start Button and Clear High Scores Button
    startOverBtn.style.visibility = "visible";
    clearBtn.style.visibility = "visible";
    // Render a new li for each score
    for (let i = 0; i < scores.length; i++) {
      let arrayScore = scores[i].score;
      let arrayInitial = scores[i].initial;
  
      let li = document.createElement("li");
      li.textContent = arrayScore + " :  " + arrayInitial;
      li.setAttribute("data-index", i);
      scoreList.appendChild(li);
    }
  }

  
  // When form is submitted...
  scoreForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    let scoreText = userInput.value.trim();
    
     //Return from function early if submitted text is blank
    if (scoreText === "") {
      return;
    }

    storedScores = JSON.parse(localStorage.getItem("scores"));
    if (!storedScores) {
        localStorage.setItem("scores", JSON.stringify([]));
    }
    storedScores = JSON.parse(localStorage.getItem("scores"));
    // Add new scoreText and score to scores arrayas an object, clear the input
    storedScores.push({score: score, initial: scoreText});
    userInput.value = "";

    // Store updated scores in localStorage, re-render the list
    localStorage.setItem("scores", JSON.stringify(storedScores));

    scores = JSON.parse(localStorage.getItem("scores"));

    sortScores();
    renderScores();
  
  });
  
function sortScores() {
    // sort the array by highest score first
    let isSorted;
    do  {
        isSorted = true;
        let a;
        let b;
        for (i = 1; i < scores.length; i++){
            a = scores[i].score;
            b = scores[i - 1].score;
            // Compare numbers to check if need sorting
            if (a - b > 0) {
                let tempScore = scores[i];
                scores[i] = scores[i - 1];
                scores[i - 1] = tempScore;
                isSorted = false;               
            }
        }
    } while (!isSorted);
}

// When user click to clear high scores
clearBtn.addEventListener("click", function(event) {
    let element = event.target;

    if (element.matches("button") === true) {
  

    // Clear localStorage and render the blank list
   
    localStorage.clear("scores");


    scoreList.innerHTML = "";
    }
  
  });

  // When Start Over button is clicked...
  startOverBtn.addEventListener("click", function(event) {
    let element = event.target;

    if (element.matches("button") === true) {
      //  localStorage.removeItem(score);
        window.location = "./index.html";

    }
  
  });