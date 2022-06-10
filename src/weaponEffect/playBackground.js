let bgmEfx = document.getElementById('bgmEfx')

function playBackground() {
    if (canvas.style.display == 'block' && bgmEfx.checked == false){
    let gameBackAudio = new Audio('backgroundsound.mp3')
    gameBackAudio.play()
    gameBackAudio.setAttribute("id", "backgroundSound")
    gameBackAudio.loop = true; 
}
}

export { playBackground }