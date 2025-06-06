import React from 'react';
import Scene from './components/Scene';
import Screen from './components/Screen';
import { useState } from 'react';
import JumpButton from './components/button';


function App() {
  const [controls, setControls] = useState(null);
  const [Jump, setJump] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  return (
  <>
  <div  style={{ width: "100vw", height: "100vh" } } className='realtive'>
    <Scene  Jump={Jump} isJumping={setIsJumping}/>
    <Screen/>
    {controls && <JumpButton onJump={controls.jump} />}
  </div>
  
  </>
  )
}

export default App
