//Creates the brief (100ms) muzzle flash animation

function muzzleFire() {
  let rayGun = document.getElementById("raygun");
  rayGun.src = "coloredraygunfire.png";

  setTimeout(function () {
    rayGun.src = "coloredraygun.png";
  }, 100);
}

export { muzzleFire };
