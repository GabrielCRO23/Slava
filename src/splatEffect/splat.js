function splat(x, y, arr) {

    for (let i = 0; i < 30; i++) {
      let s = Math.random() * Math.PI;
      let dirx = (((Math.random() < .5) ? 3 : -3) * (Math.random() * 3)) * options.scatter;
      let diry = (((Math.random() < .5) ? 3 : -3) * (Math.random() * 3)) * options.scatter;
  
      arr.push({
        x: x,
        y: y,
        dx: dirx + mouse.dx,
        dy: diry + mouse.dy,
        size: s
      })
    }
  }

  export { splat }