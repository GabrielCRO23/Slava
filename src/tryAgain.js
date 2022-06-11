//import { saveStorage } from "./saveStorage"

let tryAgainContainer = document.querySelector('.tryAgain')
let score = document.querySelector('.score')
let highestScoreData = document.querySelector('.highestScoreData')


function tryAgain(){
    highestScore = localStorage.getItem(localStorageName) == null ? 0 : localStorage.getItem(localStorageName);
    highestScore = Math.max(kills, highestScore);
    localStorage.setItem(localStorageName, highestScore);
    rayGun.style.display = "none"
    canvas.style.display = "none"
    collisionCanvas.style.display = "none"
    tryAgainContainer.style.display = "flex"
    score.textContent = `Your score was ${kills}.`
    highestScoreData.textContent = `Your highest score was ${highestScore}`
    
}

export { tryAgain }