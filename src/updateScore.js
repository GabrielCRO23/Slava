let ctx = canvas.getContext('2d');


function updateScore(){
    
    ctx.fillStyle = "white";
    ctx.fillText('Kills: ' + kills, canvas.width/2, canvas.height/8)
}

export { updateScore }