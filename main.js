(()=>{"use strict";let t=document.getElementById("soundEfx");function e(t,e,i,s){s.beginPath(),s.arc(t,e,5*i,0,2*Math.PI,!1),s.fill(),s.closePath()}function i(){focused&&requestAnimationFrame(i),function(t){let i=t.length;for(;i--;){let s=t[i],o=s.x,n=s.y,a=s.size;e(o,n,a,ctx),s.dy-=options.gravity,s.x-=s.dx,s.y-=s.dy,s.size-=.05,(t[i].size<.3||Math.random()<options.consistency)&&(e(o,n,a,ctx),t.splice(i,1))}}(items)}function s(t,e,i){for(let s=0;s<30;s++){let s=Math.random()*Math.PI,o=(Math.random()<.5?3:-3)*(3*Math.random())*options.scatter,n=(Math.random()<.5?3:-3)*(3*Math.random())*options.scatter;i.push({x:t,y:e,dx:o+mouse.dx,dy:n+mouse.dy,size:s})}}let o=document.querySelector(".tryAgain"),n=document.querySelector(".score"),a=document.querySelector(".highestScoreData");class l{constructor(){this.spriteWidth=396,this.spriteHeight=582,this.sizeModifier=.2*Math.random()+.4,this.width=this.spriteWidth*this.sizeModifier/3,this.height=this.spriteHeight*this.sizeModifier/3,this.x=canvas.width,this.y=Math.random()*(canvas.height-this.height),this.directionX=2*Math.random()+2+.5*Math.floor(kills/10),this.directionY=2*Math.random(),this.markedForDeletion=!1,this.image=new Image,this.image.src="./Sprites/ghostspritesheet.png",this.frame=0,this.maxFrame=8,this.timeSinceStep=0,this.stepInterval=100,this.randomColors=[Math.floor(255*Math.random()),Math.floor(255*Math.random()),Math.floor(255*Math.random())],this.color="rgb("+this.randomColors[0]+","+this.randomColors[1]+","+this.randomColors[2]+")",mediaQuery.matches&&(this.directionX=.5+.25*Math.floor(kills/10),this.directionY=Math.random())}update(t){(this.y<0||this.y>canvas.height-this.height)&&(this.directionY=-1*this.directionY),this.x-=this.directionX,this.y+=this.directionY,this.x<0-this.width&&(this.markedForDeletion=!0),this.timeSinceStep+=t,this.timeSinceStep>this.stepInterval&&(this.frame>this.maxFrame?this.frame=0:this.frame++,this.timeSinceStep=0),this.x<0-this.width&&(gameEnd=!0,highestScore=null==localStorage.getItem(localStorageName)?0:localStorage.getItem(localStorageName),highestScore=Math.max(kills,highestScore),localStorage.setItem(localStorageName,highestScore),rayGun.style.display="none",canvas.style.display="none",collisionCanvas.style.display="none",o.style.display="flex",n.textContent=`Your score was ${kills}.`,a.textContent=`Your highest score was ${highestScore}`)}draw(){collisionCtx.fillStyle=this.color,collisionCtx.fillRect(this.x,this.y,this.width,this.height),ctx.drawImage(this.image,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)}}let c=document.getElementById("bgmEfx");function d(){if("block"==canvas.style.display&&0==c.checked){let t=new Audio("backgroundsound.mp3");t.play(),t.setAttribute("id","backgroundSound"),t.loop=!0}}window.canvas=document.getElementById("canvas"),window.ctx=canvas.getContext("2d"),window.collisionCanvas=document.getElementById("collisionCanvas"),window.collisionCtx=collisionCanvas.getContext("2d"),window.rayGun=document.getElementById("raygun"),window.items=[],window.kills=0,window.tone="#ffffff",collisionCanvas.width=window.innerWidth,collisionCanvas.height=window.innerHeight,canvas.width=window.innerWidth,canvas.height=window.innerHeight,ctx.font="40px Alien",window.focused=!1,window.clicked=!1,window.gameEnd=!1,window.mouse={x:0,y:0,dx:0,dy:0,px:0,py:0},window.options={scatter:0,gravity:.2,consistency:.04};let r=document.getElementById("removeEfx"),h=0,m=500,y=0,u=[];function g(t){ctx.clearRect(0,0,canvas.width,canvas.height),collisionCtx.clearRect(0,0,canvas.width,canvas.height);let e=t-y;y=t,h+=e,h>m&&(u.push(new l),h=0),ctx.fillStyle="white",ctx.fillText("Busts: "+kills,canvas.width/2,canvas.height/8),[...u].forEach((t=>t.update(e))),[...u].forEach((t=>t.draw())),u=u.filter((t=>!t.markedForDeletion)),gameEnd||requestAnimationFrame(g)}window.localStorageName="ghostbusters",window.highestScore=0,window.mediaQuery=window.matchMedia("(max-width: 1200px)"),canvas.addEventListener("mousemove",(t=>{document.getElementById("raygun").style.top=t.pageY+"px"})),canvas.addEventListener("click",(function(e){!function(){if("block"==canvas.style.display&&0==t.checked){let t=new Audio("raygunsound.mp3");t.play(),t.setAttribute("id","rayGunSound"),t.loop=!1}}(),function(){let t=document.getElementById("raygun");t.src="coloredraygunfire.png",setTimeout((function(){t.src="coloredraygun.png"}),100)}();const o=collisionCtx.getImageData(e.x,e.y,1,1).data;u.forEach((t=>{t.randomColors[0]===o[0]&&t.randomColors[1]===o[1]&&t.randomColors[2]===o[2]&&(t.markedForDeletion=!0,kills++,0==r.checked&&(focused?(clicked=!0,setTimeout((function(){clicked=!1}),100),mouse.x=e.pageX,mouse.y=e.pageY,ctx.fillStyle=tone,s(mouse.x,mouse.y,items),setTimeout((function(){ctx.clearRect(0,0,canvas.width,canvas.height)}),1e3)):(focused=!0,i())))}))}));let p=document.getElementById("startGameButton"),f=document.querySelector(".startGame"),w=document.getElementById("tryAgainButton"),x=document.querySelector(".tryAgain");w.addEventListener("click",(function(){mediaQuery.matches?(focused=!1,clicked=!1,gameEnd=!1,h=0,m=500,y=0,items=[],u=[],kills=0,canvas.style.display="block",collisionCanvas.style.display="block",x.style.display="none",rayGun.style.display="none",g(0)):(focused=!1,clicked=!1,gameEnd=!1,h=0,m=500,y=0,items=[],u=[],kills=0,canvas.style.display="block",collisionCanvas.style.display="block",x.style.display="none",rayGun.style.display="flex",g(0))})),p.addEventListener("click",(function(){mediaQuery.matches?(canvas.style.display="block",collisionCanvas.style.display="block",f.style.display="none",rayGun.style.display="none",d(),g(0)):(canvas.style.display="block",collisionCanvas.style.display="block",f.style.display="none",rayGun.style.display="flex",d(),g(0))})),canvas.onmousemove=function(t){if(clicked&&0==r.checked){let e=mouse.px-mouse.x,i=mouse.py-mouse.y;mouse={x:t.pageX,y:t.pageY,dx:Math.abs(e)>10?-10:e,dy:Math.abs(i)>10?-10:i,px:mouse.x,py:mouse.y},s(mouse.x,mouse.y,items)}};let v=document.querySelector(".screenRotation");console.log(screen.orientation),screen.orientation.onchange=function(t){"landscape-primary"!==screen.orientation.type?v.style.display="flex":v.style.display="none"},"landscape-primary"!==screen.orientation.type&&(v.style.display="flex")})();