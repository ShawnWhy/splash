import ReactDOM from 'react-dom';
import React, { useEffect, useState, useRef } from "react";
import Style from "./style.css"

import './App.css';

function App() {

  // const [enoughtForce, setEnoughForce]=useState("off")
  const [bulletColor, setBulletColor]= useState("")
  const [bulletDragThrottle, setBulletDragTrottle]=useState("on")

  const shootbullet =function(offset){
    var height = magazineArea.current.offsetHeight;
     var heightFloat = parseFloat(height);
     var percent = offset/heightFloat;
     bullet.current.style.transition="transform "+ (1-percent)+"s";

     bullet.current.style.transform="translateY(-2500%)";

     setTimeout(() => {
       lastFakeBullet.current.style.display="none";
      bullet.current.style.transition="none";
      bullet.current.style.transform="translateX(-87px)";
      bullet.current.style.backgroundColor="";
      bullet.current.style.top="";
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
    console.log(offset)
    if(offset<40){

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
      if(bulletDragThrottle==="on"){
     var positionY = e.clientY;
     var positionX =e.clientX;
     bullet.current.style.top=(positionY-70)+"px";
     bullet.current.style.left=positionX+"px";

      setBulletDragTrottle("off");
      setTimeout(() => {
        setBulletDragTrottle("on")
        
      }, 50);
      }

    }

  }
  // const [bulletState, setBulletState]= useState("off")
  const container = useRef()
  const canvass = useRef()
  const magazineArea = useRef();
  const bullet = useRef();
  const lastFakeBullet = useRef();

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
      <div className = "canvass" ref={canvass}> </div>
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
