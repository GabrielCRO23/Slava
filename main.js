(()=>{"use strict";var t=document.getElementById("canvas"),e=!1,i=t.getContext("2d"),h=!1,s=[],a={x:0,y:0,dx:0,dy:0,px:0,py:0};t.width=window.innerWidth,t.height=window.innerHeight;let n=0,r=0,o=[];class d{constructor(){this.spriteWidth=800,this.spriteHeight=600,this.width=this.spriteWidth/4,this.height=this.spriteHeight/4,this.x=t.width,this.y=Math.random()*(t.height-this.height),this.directionX=2*Math.random(),this.markedForDeletion=!1,this.image=new Image,this.image.src="./Sprites/rotatedspritesheet.png",this.frame=0,this.maxFrame=8,this.timeSinceStep=0,this.stepInterval=100}update(t){this.x-=this.directionX,this.x<0-this.width&&(this.markedForDeletion=!0),this.timeSinceStep+=t,this.timeSinceStep>this.stepInterval&&(this.frame>this.maxFrame?this.frame=0:this.frame++,this.timeSinceStep=0)}draw(){i.strokeRect(this.x,this.y,this.width,this.height),i.drawImage(this.image,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)}}function m(){e&&requestAnimationFrame(m),function(t){for(var e=t.length;e--;){var h=t[e],s=h.x,a=h.y,n=h.size;p(s,a,n,i),h.dy-=.2,h.x-=h.dx,h.y-=h.dy,h.size-=.05,(t[e].size<.3||Math.random()<.04)&&(p(s,a,n,i),t.splice(e,1))}}(s)}function c(t,e,i){for(var h=0;h<30;h++){var s=Math.random()*Math.PI,n=(Math.random()<.5?3:-3)*(3*Math.random())*0,r=(Math.random()<.5?3:-3)*(3*Math.random())*0;i.push({x:t,y:e,dx:n+a.dx,dy:r+a.dy,size:s})}}function p(t,e,i,h){h.beginPath(),h.arc(t,e,5*i,0,2*Math.PI,!1),h.fill(),h.closePath()}!function e(h){i.clearRect(0,0,t.width,t.height);let s=h-r;r=h,n+=s,n>500&&(o.push(new d),n=0),[...o].forEach((t=>t.update(s))),[...o].forEach((t=>t.draw())),o=o.filter((t=>!t.markedForDeletion)),requestAnimationFrame(e)}(0),t.onclick=function(n){console.log("heyyy"),function(){let t=new Audio("raygunsound.mp3");t.play(),t.setAttribute("id","rayGunSound"),t.loop=!1}();let r=document.getElementById("raygun");r.src="raygunfin.png",setTimeout((function(){r.src="raygunmodel.png"}),100),e?(h=!0,setTimeout((function(){h=!1}),100),a.x=n.pageX,a.y=n.pageY,i.fillStyle="#07aa15",c(a.x,a.y,s),setTimeout((function(){i.clearRect(0,0,t.width,t.height)}),1e3)):(e=!0,m())},t.onmousemove=function(t){if(h){var e=a.px-a.x,i=a.py-a.y;c((a={x:t.pageX,y:t.pageY,dx:Math.abs(e)>10?-10:e,dy:Math.abs(i)>10?-10:i,px:a.x,py:a.y}).x,a.y,s)}},t.addEventListener("mousemove",(t=>{document.getElementById("raygun").style.top=t.pageY+"px"}))})();