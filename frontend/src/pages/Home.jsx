import React from 'react'
import HeroSection from '../components/HeroSection'
import Instruction from '../components/Instruction'
import FeaturedCards from '../components/FeaturedCards'
import LanguageSupport from '../components/LanguageSupport'

const Home = () => {
  return (
     <section className="main-content">
        <HeroSection/>
        <Instruction/>
        <FeaturedCards/>
        <LanguageSupport/>
      </section>
  )
}

export default Home
