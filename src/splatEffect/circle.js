function circle(x, y, s, c) {
    c.beginPath()
    c.arc(x, y, s * 5, 0, 2 * Math.PI, false);
    c.fill()
    c.closePath()
  }

export { circle }