const weaponMover = (e) =>{
    let rayGun = document.getElementById('raygun');
    rayGun.style.top = e.pageY + 'px';
};

export { weaponMover }