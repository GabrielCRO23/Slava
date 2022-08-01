import { tryAgain } from "./tryAgain";

class Orc {
  constructor() {
    this.spriteWidth = 396; //Width of the individual sprite from the sprite sheet
    this.spriteHeight = 582; //Height of the individual sprite from the sprite sheet
    this.sizeModifier = Math.random() * 0.2 + 0.4; //SLightly randomizing size among constructed sprites
    this.width = (this.spriteWidth * this.sizeModifier) / 3;
    this.height = (this.spriteHeight * this.sizeModifier) / 3;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.directionX = Math.random() + 1 + 0.5 * Math.floor(kills / 10);
    this.directionY = Math.random() * 2; //Vertical directional speed
    this.markedForDeletion = false; //If marked true, sprite is deleted
    this.image = new Image();
    this.image.src = "./Sprites/ghostspritesheet.png"; //Insert any sprite sheet - make sure to adjust sprite width and height
    this.frame = 0;
    this.maxFrame = 8;
    this.timeSinceStep = 0;
    this.stepInterval = 100;
    this.randomColors = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
    this.color =
      "rgb(" +
      this.randomColors[0] +
      "," +
      this.randomColors[1] +
      "," +
      this.randomColors[2] +
      ")"; //Each sprite gets a randomized value of 3 RGB values, which will be matched to mark for deletion as an onclick event listener
    //if (kills == 10) this.directionX = this.directionX + 10
    //this.directionX = this.directionX + 0.5 * Math.floor(kills / 10)
    if (mediaQuery.matches) {
      this.directionX = 0.5 + 0.25 * Math.floor(kills / 10);
      this.directionY = Math.random();
    }
  }
  update(deltaTime) {
    if (this.y < 0 || this.y > canvas.height - this.height) {
      this.directionY = this.directionY * -1;
    }

    this.x -= this.directionX;
    this.y += this.directionY;
    if (this.x < 0 - this.width) this.markedForDeletion = true;

    this.timeSinceStep += deltaTime;
    if (this.timeSinceStep > this.stepInterval) {
      if (this.frame > this.maxFrame) this.frame = 0;
      else this.frame++;
      this.timeSinceStep = 0;
    }
    if (this.x < 0 - this.width) {
      gameEnd = true;
      tryAgain();
    }
  }
  draw() {
    collisionCtx.fillStyle = this.color;
    collisionCtx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export { Orc };
