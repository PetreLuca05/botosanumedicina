
import './Muschi.css';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Box, OrbitControls, ScrollControls, Scroll, useScroll, Stats } from '@react-three/drei'
import * as THREE from 'three';

const cameraStates = [
  { position: [0, 2, 10], lookAt: [0, 0, 0], fov: 50 },
  { position: [5, 3, 8], lookAt: [2, 1, 0], fov: 35 },
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

function Scene() {
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[0, 0, 0]} rotation={[0.1, 0.1, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <gridHelper args={[10, 10]} />
    </>
  );
}

function Muschi() {
  return (
    <article className="Muschi">
      <Canvas style={{ height: '100vh' }} camera={{ position: [0, 2, 5], fov: 40 }}>
        <ScrollControls pages={cameraStates.length} damping={0.1}>
          <Scene />
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