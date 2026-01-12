
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Box, OrbitControls, ScrollControls, Scroll, useScroll } from '@react-three/drei'
import './TabSlide1.css'
import { useRef } from 'react'

function Home() {
  return (
    <>
      <Canvas style={{ height: '100vh' }}>
        <ScrollControls pages={5} damping={0.1}>
          <Scene />
          <Scroll html>
            <Hero />
            <CeEsteUnFluid />
            <Necesara />
            <CePune />
            <Presiune />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  )
}

function Scene() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <group rotation={[0, 90, 0]} position={[0, .5, 0]}>
        <Box position={[-1.2, 0, 0]} rotation={[0.1, 0.1, 0]}>
          <meshStandardMaterial color="orange" />
        </Box>
        <Box position={[1.2, 0, 0]} rotation={[0.1, 0.1, 0]}>
          <meshStandardMaterial color="hotpink" />
        </Box>
      </group>
      <gridHelper args={[10, 10]} />
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
    </>
  );
}

function CameraRig() {
  const { camera } = useThree()
  const scroll = useScroll()
  
  useFrame(() => {
    const offset = scroll.offset // 0 to 1 based on scroll position
    
    // Animate camera position based on scroll
    camera.position.x = Math.sin(offset * Math.PI * 2) * 5
    camera.position.y = 2 + offset * 3 // Move camera up as we scroll
    camera.position.z = Math.cos(offset * Math.PI * 2) * 5
    
    // Always look at the center
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

function Hero() {
  return (
    <section className="s1hero">
      <h1>curgerea fluideor în corpul uman</h1>
      <p>Fluidele din corpul nostru, cum ar fi sângele și limfa, sunt esențiale pentru transportul substanțelor vitale și menținerea sănătății.</p>
    </section>
  )
}

function CeEsteUnFluid() {
  return (
    <section className="ceesteunfluid">
      <h2>1️⃣ Ce este un fluid?</h2>
      <p>Un fluid este o substanță care curge și ia forma vasului în care se află.</p>
      <h3>În corp avem două fluide principale:</h3>
      <ul>
        <li>Sângele 🩸</li>
        <li>Limfa 💧</li>
      </ul>
      👉 Animație cu lichid care curge prin tuburi; utilizatorul poate schimba viteza.
    </section>
  )
}

function Necesara(){
  return (
    <section className="necesara">
      <header>
        <h2>2️⃣ De ce este necesară curgerea fluidelor?</h2>
        <p>Un fluid este o substanță care curge și ia forma vasului în care se află.</p>
      </header>

      <article>
        <ul>
          <h3>Funcțiile sângelui:</h3>
          <li>Transportă oxigen</li>
          <li>Transportă nutrienți</li>
          <li>Elimină dioxidul de carbon și toxinele</li>
          <li>Transportă hormoni</li>
          <li>Apără organismul</li>
        </ul>

        <ul>
          <h3>Funcțiile limfei:</h3>
          <li>Drenează lichidele din țesuturi</li>
          <li>Apără organismul (sistem imunitar)</li>
          <li>Transportă grăsimi</li>
        </ul>
        </article>
      👉 Click pe o organ → vezi ce aduce sângele acolo.
    </section>
  )
}

function CePune(){
  return (
    <section className="cepune">
      <header>
        <h2>3️⃣ Ce pune fluidele în mișcare?</h2>
        <p>Fluidele din corpul nostru nu se mișcă de la sine - au nevoie de forțe care să le pună în circulație.</p>
      </header>

      <article>
        <ul>
          <h3>🩸 Sângele:</h3>
          <li>Este pus în mișcare de inimă (pompa).</li>
          <li>Inima creează presiune.</li>
        </ul>

        <ul>
          <h3>💪 Limfa:</h3>
          <li>Nu are pompă proprie.</li>
          <li>Este pusă în mișcare de:</li>
          <li>contracțiile mușchilor</li>
          <li>respirație</li>
          <li>valvele vaselor limfatice</li>
        </ul>
        </article>
      👉 Apasă pe inimă → vezi pulsul și debitul.
      👉 Activează mușchii → vezi limfa cum începe să circule.
    </section>
  )
}

function Presiune() {
  return (
    <section className="presiune">
      <h2>4️⃣ Presiunea și viteza de curgere</h2>
      <p>Fluidul curge din zona cu presiune mare spre presiune mică.</p>
      <h3>Viteza depinde de:</h3>
      <ul>
        <li>diametrul vasului</li>
        <li>presiune</li>
        <li>vâscozitate</li>
      </ul>
      👉 Slider pentru diametrul vasului → vezi viteza modificată.
    </section>
  )
}

export default Home
