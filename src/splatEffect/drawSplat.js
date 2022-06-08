import { circle } from "./circle"

function drawsplat(arr) {

    let i = arr.length
    while (i--) {
      let t = arr[i];
      let x = t.x,
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
  }

  export { drawsplat }