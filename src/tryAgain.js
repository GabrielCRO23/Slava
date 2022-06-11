let tryAgainContainer = document.querySelector('.tryAgain')
let score = document.querySelector('.score')


function tryAgain(){
    rayGun.style.display = "none"
    canvas.style.display = "none"
    collisionCanvas.style.display = "none"
    tryAgainContainer.style.display = "flex"
    score.textContent = `Your score was ${kills}.`
}

export { tryAgain }