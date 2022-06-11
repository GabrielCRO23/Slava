import { drawsplat } from "./drawSplat"
//let removeEfx = document.getElementById('removeEfx')
function drawloop() {
    if (focused) {
      requestAnimationFrame(drawloop);
    }
    drawsplat(items)
  }

export { drawloop }