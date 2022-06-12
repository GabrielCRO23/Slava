//Writes & updates the text

function updateScore(){
    ctx.font = '25px Alien'
    ctx.fillStyle = "white";
    ctx.fillText('Busts: ' + kills, canvas.width/2, canvas.height/8)
}

export { updateScore }