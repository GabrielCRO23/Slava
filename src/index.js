import { weaponMover } from "./weaponMover";
import { playRaygunSound} from "./raygunSound"


var canvas = document.getElementById('canvas');
var focused = false;
var ctx = canvas.getContext('2d');
var clicked = false;
var items = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var collisionCanvas = document.getElementById('collisionCanvas');
var collisionCtx = collisionCanvas.getContext('2d')
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

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



let timeToNextOrc = 0;
let orcInterval = 500;
let lastTime = 0;
let orcs = [];

//let score = 0;
//ctx.font = '50px Impact';


class Orc {
    constructor(){
        this.spriteWidth = 800;
        this.spriteHeight = 600;
       this.sizeModifier = Math.random() * 0.2 + 0.4
       this.width = this.spriteWidth * this.sizeModifier / 3
       this.height = this.spriteHeight * this.sizeModifier / 3
        //this.width = this.spriteWidth/4
        //this.height = this.spriteHeight/4
        this.x = canvas.width
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 2 + 2;
        this.directionY = Math.random() * 2;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = './Sprites/rotatedspritesheet.png'
        this.frame = 0;
        this.maxFrame = 8;
        this.timeSinceStep = 0;
        this.stepInterval = 100;
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255) ]
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
        
        
    }
    update(deltaTime){
        if (this.y < 0 || this.y > canvas.height - this.height){
            this.directionY = this.directionY * -1;
        }

        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.markedForDeletion = true;

        this.timeSinceStep += deltaTime
        if (this.timeSinceStep > this.stepInterval){
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;  
            this.timeSinceStep = 0;
        }

       
        
    }
    draw(){
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

window.addEventListener('click', function(e){

  playRaygunSound();
      let rayGun = document.getElementById('raygun');
      rayGun.src = "coloredraygunfire.png"
  
  
      setTimeout(function() {
          rayGun.src = "coloredraygun.png"
        }, 100)

  const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1)
  const pc = detectPixelColor.data;
  orcs.forEach(object => {
    if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]){
      object.markedForDeletion = true;
      
  
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
  
      var greentone = '#c1c121'
      
      ctx.fillStyle = greentone;
  
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
    // Must be layered behind orcs
    //makeScore();
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

collisionCanvas.addEventListener('click', function(){
    console.log('hey')
})

window.addEventListener('click', function(){
    console.log('hey')
})

/*

canvas.onclick = function(e) {
    


    
    playRaygunSound();
    let rayGun = document.getElementById('raygun');
    rayGun.src = "coloredraygunfire.png"


    setTimeout(function() {
        rayGun.src = "coloredraygun.png"
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

    var greentone = '#c1c121'
    
    ctx.fillStyle = greentone;

    splat(mouse.x, mouse.y, items)
    
    setTimeout(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }, 1000)
    

  }
}
*/

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





