import { Scroll } from '@react-three/drei'
import { useState, useEffect } from 'react'
import { armText } from './Arm_Text'
import './Arm.css'

function Arm_Overlay() {
  const [language, setLanguage] = useState('EN')
  
  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.detail)
    }
    
    // Set initial language
    setLanguage(window.currentLanguage || 'EN')
    
    // Listen for language changes
    window.addEventListener('languageChanged', handleLanguageChange)
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange)
    }
  }, [])

  const text = armText[language]

  return (
    <Scroll html style={{ width: '100%' }}>
      <section className="arm-section">
        <h1>{text.title}</h1>
        <p>{text.subtitle}</p>
      </section>
      
      <section className="arm-section">
        <h2>{text.structureTitle}</h2>
        <p>{text.structureDescription}</p>
      </section>

      <section className="arm-section">
        <h2>{text.functionTitle}</h2>
        <p>{text.functionDescription}</p>
      </section>
    </Scroll>
  )
}

export default Arm_Overlay
