import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useFBX, useTexture, Environment } from '@react-three/drei';
import Character from './Character';



function Scene({Jump , isJumping}) {
  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 8]} intensity={3} castShadow />

      {/* Environment */}
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/qwantani_moonrise_1k.hdr" background={false} />

    
      <gridHelper args={[30, 20, 'white', '#CBCBCB']} /> 

      <Character />

   
      <OrbitControls />
    </Canvas>
  );
}

export default Scene;
