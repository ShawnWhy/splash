import ReactDOM from 'react-dom';
import React, { useEffect, useState, useRef, createElement } from "react";
import Style from "./style.css"

import './App.css';
var domtoimage = require('dom-to-image');

function App() {

 const download =function(){


domtoimage.toJpeg(document.getElementById('imageCanvass'), { quality: 0.95,height: 812, width:375, bgcolor:"white"})
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });
}


  const mixup = function(){
  let smalldips =document.getElementsByClassName("smallspla")
  let splatters = document.getElementsByClassName("splatter");
  for(let i=0; i<splatters.length;i++){
    let randnumber = Math.floor(Math.random()*180)
    let randnumber2 = Math.floor(Math.random()*4+1)
    splatters[i].style.transform="rotate("+-randnumber+"deg)scale("+randnumber2+")translate("+randnumber2*100+"px)";

  

  }
  for(let i=0; i<smalldips.length;i++){
    let randnumber = Math.floor(Math.random()*4+1)
  let randnumber2 = Math.floor(Math.random()*4+1)

      smalldips[i].style.transform="rotate("+i*9+"deg)scale("+randnumber2+")translate("+bulletPower*(randnumber*300)+"px)";
    }
}

  const [iteration, setIteration]= useState(1)
  const smallDrips = function(percent){
    for(var i=0; i<20; i++){
      

      var smallspla = document.createElement('div')
      smallspla.classList.add("smallspla");
      smallspla.classList.add("smallspla"+iteration);

      smallspla.style.left = (bulletLeft+300)+"px";
      smallspla.style.backgroundColor=bulletColor;
      canvass.current.append(smallspla);


    }
    setTimeout(() => {
      let smalldips =document.getElementsByClassName("smallspla"+iteration)
      for(let i=0; i<smalldips.length;i++){
        let randnumber = Math.floor(Math.random()*4+1)
      let randnumber2 = Math.floor(Math.random()*4+1)

          smalldips[i].style.transform="rotate("+i*9+"deg)scale("+randnumber2+")translate("+percent*(randnumber*300)+"px)";
          setIteration(iteration+1);

        

      }
      
    }, 10);
  }

  // const [enoughtForce, setEnoughForce]=useState("off")
  const [bulletColor, setBulletColor]= useState("red")
  // const [bulletDragThrottle, setBulletDragTrottle]=useState("on")
  const [bulletLeft, setBulletLeft]=useState("")
  const [bulletPower, setBulletPower]=useState(.5);

  

  const createSplatter = function(percent){
    setTimeout(() => {
      
    
    console.log("splatter")
    var splatter = document.createElement('div')
    splatter.classList.add("splatter");
    splatter.style.transform="scale("+percent+")";
    splatter.style.left = bulletLeft+"px";
    splatter.style.backgroundColor=bulletColor;
    canvass.current.append(splatter);
   
      smallDrips(percent);
      
   
  }, 700*(1-percent));
    
  }

  

  const shootbullet =function(offset){
    var height = magazineArea.current.offsetHeight;
     var heightFloat = parseFloat(height);
     var percent = offset/heightFloat;
     setBulletPower(percent);

     bullet.current.style.transition="transform "+ (1-percent)+"s";

     bullet.current.style.transform="translateY(-2500%)";
     createSplatter(percent);

    //  setTimeout(() => {

    //   createSplatter();
       
    //  }, (1000*(1-percent))
 

     setTimeout(() => {
       lastFakeBullet.current.style.display="none";
      bullet.current.style.transition="none";
      bullet.current.style.transform="translateX(-87px)";
      bullet.current.style.backgroundColor="";
      bullet.current.style.top="";
      bullet.current.style.left="";

      bullet.current.style.pointerEvents="";

      setTimeout(() => {

        bullet.current.style.transform="";

        bullet.current.style.transition="";
        setBulletState("off");

        setTimeout(() => {
          lastFakeBullet.current.style.display="";

          
        }, 500);

        
      }, 200);





       
     }, 1000);


  }

  const releaseBullet = function(e){
    var topLocation = magazineArea.current.offsetTop;
    var releaseLocation = bullet.current.offsetTop;
    var offset = parseFloat(releaseLocation)-parseFloat(topLocation);
    // console.log(offset)
    if(offset<20){
    bullet.current.style.top="80%";
    setBulletState("off")
    bullet.current.style.pointerEvents="auto";
    }

    else{

      shootbullet(offset);
    }



  }

  const dragBullet = function(e){
    if(bulletState==="on"){
      // if(bulletDragThrottle==="on"){
     var phoneLeft = container.current.offsetLeft;
      var phoneTop = container.current.offsetTop;
      console.log(phoneLeft)
      console.log(phoneTop)

     var positionY = e.clientY;
     positionY=positionY-phoneTop
     var positionX =e.clientX;
     positionX=positionX-phoneLeft
     bullet.current.style.top=(positionY-20)+"px";
     bullet.current.style.left=(positionX-20)+"px";
     setBulletLeft(positionX-300);

      // setBulletDragTrottle("off");
      // setTimeout(() => {
      //   setBulletDragTrottle("on")
        
      // }, 50);
      // }

    }

  }
  // const [bulletState, setBulletState]= useState("off")
  const container = useRef()
  const canvass = useRef()
  const magazineArea = useRef();
  const bullet = useRef();
  const lastFakeBullet = useRef();

  const clearCanvass = function(){
    console.log("clear")
    canvass.current.innerHTML="";
    
  }

  const [bulletState, setBulletState]= useState("off")

  const readyBullet=function(){
    setBulletState("on")
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var j = 0; j < 6; j++) {
    color += letters[Math.floor(Math.random() * 16)];}

    setBulletColor(color);
    bullet.current.style.backgroundColor = color;
    bullet.current.style.pointerEvents="none";

    
  }
  return (
    <div className="AppContainer" onMouseUp={(e)=>{releaseBullet(e)}} ref={container}>
      <div className = "clearButton" onClick={()=>clearCanvass()}>clear!</div>
      <div className="mixup" onClick={()=>mixup()}>mixup!</div>
      <div className="download" onClick={()=>download()}>download!</div>

      <div className = "canvass" id="imageCanvass" ref={canvass}> </div>
      <div className = "magazine" ref={magazineArea} onMouseMove={(e)=>dragBullet(e)}>
          <div className = "fakeBullet"></div>
          <div className = "fakeBullet"></div>
          <div className = "fakeBullet" ref={lastFakeBullet}></div>
      </div>
      <div onMouseDown={()=>{readyBullet()}}  className ={bulletState ==="on"? "bullet bulletOn" : "bullet bulletOff"} ref={bullet}></div>
  
    </div>
  );
}

export default App;
