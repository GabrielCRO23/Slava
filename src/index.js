//Created by Gabriel with the help of online resources

import { weaponMover } from "./weaponEffect/weaponMover";
import { playRaygunSound} from "./weaponEffect/raygunSound"
import { muzzleFire } from "./weaponEffect/muzzleFire"
import { drawloop } from "./splatEffect/drawLoop"
import { splat } from "./splatEffect/splat"
import { Orc } from "./spriteConstructor"
import { updateScore } from "./updateScore"
import { playBackground } from "./weaponEffect/playBackground"





window.canvas = document.getElementById('canvas');
window.ctx = canvas.getContext('2d');
window.collisionCanvas = document.getElementById('collisionCanvas');
window.collisionCtx = collisionCanvas.getContext('2d');

window.items = [];
window.kills = 0;
window.tone = '#ffffff'

collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.font = '50px Impact';


window.focused = false;
window.clicked = false;
window.gameEnd = false;

window.mouse = {
  x: 0,
  y: 0,
  dx: 0,
  dy: 0,
  px: 0,
  py: 0
};

window.options = {
  scatter: 0,
  gravity: 0.2,
  consistency: 0.04,
}



let timeToNextOrc = 0;
let orcInterval = 500;
let lastTime = 0;
let orcs = [];


canvas.addEventListener('mousemove', weaponMover);




window.addEventListener('click', function(e){
  playRaygunSound();
  muzzleFire();
  const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1)
  const pc = detectPixelColor.data;
  orcs.forEach(object => {
    if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]){
      object.markedForDeletion = true;
      kills++
  
    if (!focused) {
      focused = true;
      drawloop();
    } else {
      clicked = true;
  
      
        setTimeout(function() {
          clicked = false
        }, 100)
      
  
      mouse.x = e.pageX
      mouse.y = e.pageY
  
      
      ctx.fillStyle = tone;
  
      splat(mouse.x, mouse.y, items)
      
      setTimeout(function() {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }, 1000)
      
  
    }
    }
  })
})




function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime
    lastTime = timestamp;
    timeToNextOrc += deltaTime
    if (timeToNextOrc > orcInterval) {
        orcs.push(new Orc());
        timeToNextOrc = 0;
        //console.log(orcs)
    };
    // Must be layered behind sprites
    updateScore();
    [...orcs].forEach(object => object.update(deltaTime));
    [...orcs].forEach(object => object.draw());
    orcs = orcs.filter(object => !object.markedForDeletion)
    
    if (!gameEnd) requestAnimationFrame(animate);
}

//animate(0)


let startGameButton = document.getElementById('startGameButton')
let startGameContainer = document.querySelector('.startGame')
let rayGun = document.getElementById('raygun');

startGameButton.addEventListener('click', function(){
  animate(0)
  canvas.style.display = "block";
  collisionCanvas.style.display = "block";
  startGameContainer.style.display = "none";
  rayGun.style.display = "flex"
  playBackground();
})


canvas.onmousemove = function(e) {
  if (clicked) {
    let distx = (mouse.px - mouse.x);
    let disty = (mouse.py - mouse.y);
    mouse = {
      x: e.pageX,
      y: e.pageY,
      dx: (Math.abs(distx) > 10) ? -10 : distx,
      dy: (Math.abs(disty) > 10) ? -10 : disty,
      px: mouse.x,
      py: mouse.y
    }
    splat(mouse.x, mouse.y, items)
  }
}







