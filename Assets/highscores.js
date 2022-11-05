const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// .map takes an array of items and turning it into something else
highScoresList.innerHTML = highScores.map( score => {
    //created li in js and pulling the data from local storage
    return (`<li class="high-score"> ${score.name} - ${score.score}</li>`);
}).join("");