import { weaponMover } from "./weaponMover";
import { playRaygunSound} from "./raygunSound"


var canvas = document.getElementById('canvas');
var focused = false;
var ctx = canvas.getContext('2d');
var clicked = false;
var items = [];

var mouse = {
  x: 0,
  y: 0,
  dx: 0,
  dy: 0,
  px: 0,
  py: 0
};

var options = {
  scatter: 0,
  gravity: 0.2,
  consistency: 0.04,
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timeToNextOrc = 0;
let orcInterval = 500;
let lastTime = 0;

let orcs = [];
class Orc {
    constructor(){
        this.spriteWidth = 800;
        this.spriteHeight = 600;
       // this.sizeModifier = Math.random() * 0.2 + 0.4
        this.width = this.spriteWidth/4
        this.height = this.spriteHeight/4
        this.x = canvas.width
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 2;
        //this.directionY = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = './Sprites/rotatedspritesheet.png'
        this.frame = 0;
        this.maxFrame = 8;
        this.timeSinceStep = 0;
        this.stepInterval = 100;
        
    }
    update(deltaTime){
        this.x -= this.directionX;
        if (this.x < 0 - this.width) this.markedForDeletion = true;

        this.timeSinceStep += deltaTime
        if (this.timeSinceStep > this.stepInterval){
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;  
            this.timeSinceStep = 0;
        }

       
        
    }
    draw(){
        ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}



function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime
    lastTime = timestamp;
    timeToNextOrc += deltaTime
    if (timeToNextOrc > orcInterval) {
        orcs.push(new Orc());
        timeToNextOrc = 0;
        //console.log(orcs)
    };
    [...orcs].forEach(object => object.update(deltaTime));
    [...orcs].forEach(object => object.draw());
    orcs = orcs.filter(object => !object.markedForDeletion)
    
    requestAnimationFrame(animate);
}

animate(0)



function drawloop() {

  if (focused) {
    requestAnimationFrame(drawloop);
  }
  //ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawsplat(items)

}


function splat(x, y, arr) {

  for (var i = 0; i < 30; i++) {
    var s = Math.random() * Math.PI;
    var dirx = (((Math.random() < .5) ? 3 : -3) * (Math.random() * 3)) * options.scatter;
    var diry = (((Math.random() < .5) ? 3 : -3) * (Math.random() * 3)) * options.scatter;

    arr.push({
      x: x,
      y: y,
      dx: dirx + mouse.dx,
      dy: diry + mouse.dy,
      size: s
    })
  }

}



function drawsplat(arr) {

  var i = arr.length
  while (i--) {
    var t = arr[i];
    var x = t.x,
      y = t.y,
      s = t.size;
    circle(x, y, s, ctx)

    t.dy -= options.gravity
    t.x -= t.dx
    t.y -= t.dy
    t.size -= 0.05;

    if (arr[i].size < 0.3 || Math.random() < options.consistency) {
      circle(x, y, s, ctx)
      arr.splice(i, 1)
    }
  }
  //ctx.drawImage(shadow, 0, 0)
}


function circle(x, y, s, c) {
  c.beginPath()
  c.arc(x, y, s * 5, 0, 2 * Math.PI, false);
  c.fill()
  c.closePath()
}




canvas.onclick = function(e) {

    console.log('heyyy')
    playRaygunSound();
    let rayGun = document.getElementById('raygun');
    rayGun.src = "raygunfin.png"


    setTimeout(function() {
        rayGun.src = "raygunmodel.png"
      }, 100)


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

    var greentone = '#07aa15'
    
    ctx.fillStyle = greentone;

    splat(mouse.x, mouse.y, items)
    
    setTimeout(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }, 1000)
    

  }
}


canvas.onmousemove = function(e) {

  if (clicked) {
    var distx = (mouse.px - mouse.x),
      disty = (mouse.py - mouse.y);
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

canvas.addEventListener('mousemove', weaponMover);





