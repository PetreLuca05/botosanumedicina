
import './Slide4.css';
import { Canvas } from '@react-three/fiber'
import { Box, OrbitControls, Text } from '@react-three/drei'

function Slide4_Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} rotation={[0.1, 0.1, 0]}>
        <meshStandardMaterial color="orange" />
      </Box>
      <Box position={[1.2, 0, 0]} rotation={[0.1, 0.1, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Box>
            <gridHelper args={[10, 10]} />
      <Text
        position={[0, 2, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        forta
      </Text>
      <OrbitControls enablePan={true} enableZoom={false} enableRotate={true} />
    </Canvas>
  );
}

function Slide4() {
  return (
    <div className="overlay-container">
      <h2>forta</h2>
      <Slide4_Scene />
    </div>
  );
}


export default Slide4;