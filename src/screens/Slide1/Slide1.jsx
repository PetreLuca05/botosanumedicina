
import './Slide1.css';
import { Canvas, useThree } from '@react-three/fiber'
import { Box, OrbitControls, Text } from '@react-three/drei'
import { useEffect } from 'react'

function CameraController() {
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.set(2, 1.5, 5)
    camera.lookAt(-3, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera])

  return null
}

function Slide1_Scene() {
  return (
    <Canvas>
      <CameraController />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} rotation={[0.1, 0.1, 0]}>
        <meshStandardMaterial color="orange" />
      </Box>
      <Box position={[1.2, 0, 0]} rotation={[0.1, 0.1, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Box>
      <gridHelper args={[10, 10]} />
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
    </Canvas>
  );
}

function Slide1() {
  return (
    <div className="overlay-container">
      <article>
        <h2>curgerea fluidelor</h2>
        <p>Curgerea fluidelor este procesul prin care lichidele și gazele se 
        deplasează sub acțiunea diferitelor forțe, cum ar fi gravitația, presiunea sau 
        forțele de frecare. Acest fenomen este fundamental în multe procese biologice și industriale.</p>
        <button onClick={() => window.alert('Learn more clicked!')}>Learn More</button>
      </article>
      <Slide1_Scene />
    </div>
  );
}


export default Slide1;