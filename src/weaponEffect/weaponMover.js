//Moves the raygun image to follow mouse movement on vertical axis

const weaponMover = (e) => {
  let rayGun = document.getElementById("raygun");
  rayGun.style.top = e.pageY + "px";
};

export { weaponMover };
