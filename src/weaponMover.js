//let a = console.log('hi')

const weaponMover = (e) =>{
    let rayGun = document.getElementById('raygun');
    rayGun.style.top = e.pageY + 'px';
    //console.log(e.pageY)
    //console.log(rayGun.height)
    //let a = console.log('hi')
    //a
};

export { weaponMover }