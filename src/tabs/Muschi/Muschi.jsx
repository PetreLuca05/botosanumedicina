
import './Muschi.css';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Box, OrbitControls, ScrollControls, Scroll, useScroll, Stats, Text } from '@react-three/drei';
import * as THREE from 'three';
import MODEL_Muscles from '../../components/m_muscles';
import { useState, useRef } from 'react';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

const cameraStates = [
  { position: [0, 2, 10], lookAt: [0, 0, 0], fov: 50 },
  { position: [1, 1, 6], lookAt: [.2, 0, 0], fov: 35 },
  { position: [-3, 1, 6], lookAt: [-2, 0, 0], fov: 60 },
  { position: [-3, 1, 6], lookAt: [-2, 0, 0], fov: 60 },
  { position: [-3, 1, 6], lookAt: [-2, 0, 0], fov: 60 },
    { position: [-3, 1, 6], lookAt: [-2, 0, 0], fov: 60 },
];

function CameraController() {
  const { camera } = useThree();
  const scroll = useScroll();

  useFrame(() => {
    const pages = cameraStates.length - 1;
    const scrollPos = scroll.offset * pages;
    let page = Math.floor(scrollPos);
    let nextPage = Math.min(page + 1, pages);
    const t = scrollPos - page;

    // Guard against out-of-bounds
    page = Math.max(0, Math.min(page, pages));
    nextPage = Math.max(0, Math.min(nextPage, pages));

    // Lerp position
    const posA = new THREE.Vector3(...cameraStates[page].position);
    const posB = new THREE.Vector3(...cameraStates[nextPage].position);
    camera.position.lerpVectors(posA, posB, t);

    // Lerp lookAt
    const lookA = new THREE.Vector3(...cameraStates[page].lookAt);
    const lookB = new THREE.Vector3(...cameraStates[nextPage].lookAt);
    const lookAt = lookA.clone().lerp(lookB, t);
    camera.lookAt(lookAt);

    // Lerp fov
    camera.fov = THREE.MathUtils.lerp(cameraStates[page].fov, cameraStates[nextPage].fov, t);
    camera.updateProjectionMatrix();
  });
  return null;
}

function PostProcessing({enabled = true}) {
  if(!enabled) return null;
  return (
    <EffectComposer>
      <Bloom 
        intensity={1}
        luminanceThreshold={0.3}
        luminanceSmoothing={0.025}
        blendFunction={BlendFunction.ADD}
      />

      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.001, 0.001]}
      />
    </EffectComposer>
  )
}

function Skybox() {
  const { scene } = useThree()
    const sphereRef = useRef()
    
    useFrame(() => {
      if (sphereRef.current) {
        sphereRef.current.rotation.y += 0.01
      }
    })

    // Create gradient material
    const gradientMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color(0x0066ff) },
        color2: { value: new THREE.Color(0xff6600) }
      },
      side: THREE.BackSide,
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 vPosition;
        void main() {
          float mixValue = (vPosition.y + 1.0) / 2.0;
          gl_FragColor = vec4(mix(color1, color2, mixValue), 1.0);
        }
      `
    })

    return (
      <mesh ref={sphereRef} position={[0, 0, 0]} scale={100}>
        <sphereGeometry args={[1, 32, 32]} />
        <primitive object={gradientMaterial} attach="material" />
      </mesh>
    )
}

function Scene({ currentPage }) {
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[-5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <MuscleModelRig currentPage={currentPage} />
      {/* <gridHelper args={[10, 10]} /> */}
      <PostProcessing enabled={true} />
      <Skybox />
    </>
  );
}

function MuscleModelRig({ currentPage }) {
  // You can use currentPage here to control animation, visibility, etc.
  return (
    <group>
      <MODEL_Muscles position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} currentPage={currentPage} />
    </group>
  );
}

function Muschi() {
  const [currentPage, setCurrentPage] = useState(1);
  const scrollRef = useRef();

  // Custom hook to track scroll page
  function PageTracker() {
    const scroll = useScroll();
    const PAGE_OFFSET = 0.3; // Change this value for earlier/later switching
    useFrame(() => {
      if (!scroll) return;
      const pages = cameraStates.length;
      const offset = scroll.offset * (pages - 1) - PAGE_OFFSET;
      const page = Math.max(1, Math.min(pages, Math.round(offset) + 1)); // Clamp between 1 and pages
      setCurrentPage(page);
    });
    return null;
  }

  return (
    <article className="Muschi">
      <div style={{position: 'absolute', top: 10, left: 10, zIndex: 10, background: 'rgba(0,0,0,0.5)', color: 'white', padding: '0.5rem', borderRadius: '8px'}}>
        currentPage = {currentPage}
      </div>
      <Canvas style={{ height: '100vh' }} camera={{ position: [0, 2, 5], fov: 40 }}>
        <ScrollControls pages={cameraStates.length} damping={0.1}>
          <PageTracker />
          <Scene currentPage={currentPage} />
          <Scroll html style={{ width: '100%' }}>
            <Hero />
            <CeEste />
            <CeEsteContractia />
            <Structura />
            <CumApare />
            <Forta />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </article>
  );
}

function Hero() {
  return (
    <figure className="hero">
      <h1>mușchiul</h1>
    </figure>
  );
}

function CeEste() {
  return (
    <figure id='ceeste_muschi'>
      <h1>1️⃣ Ce este mușchiul și ce face?</h1>
      <article>
        <ul>
          <h3>Mușchiul este un organ activ care:</h3>
          <li>produce forță</li>
          <li>produce mișcare</li>
          <li>menține postura</li>
          👉 Accentul prezentării: mușchii scheletici.
        </ul>

        <ul>
          <h3>Tipuri de mușchi:</h3>
          <li>🟥 scheletici (voluntari)</li>
          <li>🫀 cardiac</li>
          <li>🟨 netezi (organe interne)</li>
          👉 Click pe corp → apar mușchii activi.
        </ul>
      </article>
    </figure>
  );
}

function CeEsteContractia() {
  return (
    <figure >
      <h1>2️⃣ Ce este contracția musculară?</h1>
      <p>scurtarea sau tensionarea mușchiului prin alunecarea filamentelor interne.</p>
      <ul>
        <h3>Mușchiul poate:</h3>
        <li>să se scurteze</li>
        <li>să rămână la aceeași lungime</li>
        <li>să se alungească sub tensiune</li>
        👉 Animație „zoom” în interiorul mușchiului.
      </ul>
    </figure>
  );
}

function Structura(){
    return (
    <figure id='structura_muschiului'>
      <h1>3️⃣ Tipuri de contracție musculară</h1>

      <article>
        <ul>
          <h3>Contracție izotonică</h3>
          <li>Mușchiul se scurtează</li>
          <li>Produce mișcare</li>
          👉 Exemplu: ridicarea unei greutăți
        </ul>

        <ul>
          <h3>Contracție izometrică</h3>
          <li>Mușchiul nu se scurtează</li>
          <li>Produce forță fără mișcare</li>
          👉 Exemplu: menținerea unei poziții
        </ul>

        <ul>
          <h3>Contracție excentrică</h3>
          <li>Mușchiul se alungește sub tensiune</li>
          <li>Exemplu: coborârea unei greutăți</li>
          👉 Alegi tipul → vezi animația specifică.
        </ul>
      </article>
    </figure>
  );
}

function CumApare(){
    return (
      <figure id='cumapare'>
        <h1>4️⃣ Cum apare contracția?</h1>

        <ol>
          <h3>Contracție izotonică</h3>
          <li>Creierul trimite impuls nervos</li>
          <li>Nervul ajunge la mușchi</li>
          <li><div className='li_w_span'> Se eliberează <span>Ca²⁺</span> </div></li>
          <li>Are loc alunecarea filamentelor</li>
          👉 Buton „Trimite impuls” → contracția pornește.
        </ol>
      </figure>
    );
}

function Forta(){
    return (
    <figure id='cumapare'>
      <h1>5️⃣ Forța musculară</h1>

      <ul>
        <h3>Ce determină forța:</h3>
        <li>dimensiunea mușchiului</li>
        <li>numărul fibrelor activate</li>
        <li>tipul contracției</li>
        <li>nivelul de antrenament</li>
        👉 Slider pentru „număr de fibre active”.
      </ul>
    </figure>
  );
}


export default Muschi;