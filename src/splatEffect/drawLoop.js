import { drawsplat } from "./drawSplat"

function drawloop() {
    if (focused) {
      requestAnimationFrame(drawloop);
    }
    drawsplat(items)
  }

export { drawloop }