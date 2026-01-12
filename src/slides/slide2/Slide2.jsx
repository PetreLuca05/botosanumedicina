
import './Slide2.css';
import { Canvas } from '@react-three/fiber'
import { Box, OrbitControls, Text } from '@react-three/drei'

function Slide2_Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[0, 0, 0]} rotation={[0.1, 0.1, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <gridHelper args={[10, 10]} />
      <Text
        position={[0, 2, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {"3D Scene"}
      </Text>
      <OrbitControls enablePan={true} enableZoom={false} enableRotate={true} />
    </Canvas>
  );
}

function Slide2() {
  return (
    <div className="overlay-container">
      <h2>actiunea oaselor</h2>
      <Slide2_Scene />
    </div>
  );
}


export default Slide2;