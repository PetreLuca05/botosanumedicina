import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import React from 'react'

function CameraController() {
  const { camera } = useThree()
  const scroll = useScroll()
  
  useFrame(() => {
    const scrollProgress = scroll.offset // 0 to 1
    
    // Camera movement based on scroll
    // Start position: [0, 0, 5]
    // End position: [3, 2, 3] (closer and to the side)
    camera.position.x = scrollProgress * 3
    camera.position.y = scrollProgress * 2
    camera.position.z = 5 - scrollProgress * 2
   
    // Look at the arm model
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

function Arm_Scene() {
  return (
    <>
      <CameraController />
      
      {/* Lighting setup */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-5, 5, 5]} intensity={0.4} />
    
      
      {/* Background plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#333" transparent opacity={0.1} />
      </mesh>
    </>
  )
}

export default Arm_Scene
