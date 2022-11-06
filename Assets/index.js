const question = document.getElementById("question");
//console log an HTMLCollection. Convert to an array.
const choices = Array.from(document.getElementsByClassName("choice-text"));
// referencing id from hud div
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");


//created some variables 
let currentQuestion = {}; 
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//created questions and correct answers. 
let questions = [ 
        {
          question: "How many moons does Mars have?",
          choice1: "2",
          choice2: "13",
          choice3: "50",
          choice4: "1",
          answer: 1
        },
        {
          question:
            "What is the Great Red Spot on Jupiter?",
          choice1: "A volcano",
          choice2: "A lake",
          choice3: "A crater",
          choice4: "A storm",
          answer: 4
        },
        {
          question: "Which planet is closet to the sun?",
          choice1: "Neptune",
          choice2: "Mercury",
          choice3: "Venus",
          choice4: "Earth",
          answer: 2
        },
        {
          question: "Which planet do the moons Oberon and Titania belong to?",
          choice1: "Saturn",
          choice2: "Jupiter",
          choice3: "Uranus",
          choice4: "Pluto",
          answer: 3
        },
        {
          question: "The largest volcano in the solar system is called Olympus Mons. Which planet is it on?",
          choice1: "Earth",
          choice2: "Venus",
          choice3: "Saturn",
          choice4: "Mars",
          answer: 4
        } 
]; 

// CONSTANTS
const CORRECT_BONUS = 10; //each answer is worth 10 points
const MAX_QUESTIONS = 5; //number of questions a user gets before they finish

// created function to start the game
startGame = () => {
    questionCounter = 0;
    score = 0;
    //using the spread operator to get questions from the "questions" array
    availableQuestions = [...questions]; // take "questions" array and spread out each of its item and put them into a new array 
    
    getNewQuestion();
};

getNewQuestion = () => {

    //when the all the questions have been rendered, go to the end.html
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign('./end.html');
    }
    questionCounter++;
    // can write it in string concatenation 
    //questionCounterText.innerHTML = questionCounter + "/" + MAX_QUESTIONS;
    
    // OR use string/variable interpolation aka variable substitution.
    // Interpolation is technique that enables you to insert expression values into literal strings. 

    if (progressText) {
        progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    }
    
    // update the progressBarFull as the questions are rendered
    if (progressBarFull) {
        progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    }
    
    //generates questions in random order
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    //pulling current question from availableQuestions[questionIndex]
    currentQuestion = availableQuestions[questionIndex];
    if (question) {
        question.innerText = currentQuestion.question;
    }
    
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    // take the avaiableQuestions array and prevent that specific question from re-rendering
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

// Created function for user to select an answer
choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
  
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];

      /*  More readable. Default as incorrect but if it is the correct answer apply correct
        const classToApply = "incorrect";
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = "correct";
        }
        */

        // Ternary (or conditional) operator is more concise way of writing the above code
      const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        // targeting the container element and adding the classToApply ("correct or incorrect") to the DOM
        // assigning red and green color in css for correct and incorrect answers
      selectedChoice.parentElement.classList.add(classToApply);
  
      // to remove the class thus removes colors after 1 sec.
      setTimeout(() => {
       selectedChoice.parentElement.classList.remove(classToApply);
       getNewQuestion();
      }, 1000);
    });
  });
  
  //adds up the score when questions are answered correctly
  incrementScore = num => {
    score += num;
    scoreText.innerText = score;
  }

startGame();