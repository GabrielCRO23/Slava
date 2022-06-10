//Writes & updates the text

function updateScore(){
    
    ctx.fillStyle = "white";
    ctx.fillText('Busts: ' + kills, canvas.width/2, canvas.height/8)
}

export { updateScore }