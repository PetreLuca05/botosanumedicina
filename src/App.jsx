import { Scroll } from '@react-three/drei'
import './App.css'
import { useState, useEffect, useRef } from 'react'
import React from 'react'
import Slide1 from './screens/Slide1/Slide1.jsx'
import Slide2 from './screens/Slide2/Slide2.jsx'
import Slide3 from './screens/Slide3/Slide3.jsx'
import Slide4 from './screens/Slide4/Slide4.jsx'

function Home() {
  return (
    <Hero />
  )
}

function Hero() {
  return (
    <>
    <section className="hero">
      <h1>Interactive Medicine</h1>
      <p>Scroll down to learn</p>
      <i className="fa-solid fa-arrow-down"></i>
    </section>

    <Carousel>
      <Slide1/> 
      <Slide2/> 
      <Slide3/> 
      <Slide4/>
    </Carousel>
    </>
  )
}

function Carousel(props) {
  const slidesRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = React.Children.count(props.children);

  const scrollToSlide = (slideIndex) => {
    if (slidesRef.current) {
      const slideWidth = slidesRef.current.clientWidth;
      slidesRef.current.scrollTo({
        left: slideIndex * slideWidth,
        behavior: 'smooth'
      });
      setCurrentSlide(slideIndex);
    }
  };

  const handleLeftArrow = () => {
    const newSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
    scrollToSlide(newSlide);
  };

  const handleRightArrow = () => {
    const newSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    scrollToSlide(newSlide);
  };

  return (
    <>
    <section className="carousel">
      <section className="carousel-overlay">
        <i className="fa-solid fa-arrow-right" id='arrowRight' onClick={handleRightArrow}></i>
        <i className="fa-solid fa-arrow-left" id='arrowLeft' onClick={handleLeftArrow}></i>
      </section>
      <section className="slides" ref={slidesRef}>
        {props.children}
      </section>
    </section>
    </>
  )
}

export default Home
