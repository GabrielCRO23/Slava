function playRaygunSound() {
    if (canvas.style.display == 'block'){
    let gameAudio = new Audio('raygunsound.mp3')
    gameAudio.play()
    gameAudio.setAttribute("id", "rayGunSound")
    gameAudio.loop = false  
}
}

export { playRaygunSound }