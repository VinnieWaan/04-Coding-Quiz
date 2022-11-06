const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById('finalScore');
// stores the most recent score in localStorage
const mostRecentScore = localStorage.getItem('mostRecentScore');

// NOTE: JSON.parse method - parse the key value and create an array
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Taking the top 5 scores
const MAX_HIGH_SCORES = 3;

// renders final score to end.html
finalScore.innerText = "Congrats! Your score is " + mostRecentScore + ".";

//the Save button is disabled if no value is entered in the username box
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = e => { //e means event
    console.log("Clicked the save button")
    // prevent the page from refreshing
    e.preventDefault();

    //create an object for highScores
    const score = {
        score: mostRecentScore,
        //score: Math.floor(Math.random() * 100), //**switch back to mostRecentScore**
        name: username.value
    };
    highScores.push(score);

    // sorts score from highest to lowest
    highScores.sort( (a,b) => b.score - a.score)
    
    //Recording top 3 scores. Cuts off the top scores at index 3
    highScores.splice(3);

    // NOTE: JSON.stringify method - parse the key value and create a string
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // go to the index.html page
    window.location.assign('./index.html');
    
};

