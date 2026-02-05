import React, { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import Instruction from '../components/Instruction'
import FeaturedCards from '../components/FeaturedCards'
import LanguageSupport from '../components/LanguageSupport'
import { getCurrentUser } from '../services/user/user'

const Home = () => {

  // useEffect(async () => {
  //  const data=await getCurrentUser("tekamjatin@gmail.com");
  //   console.log(data);
  // },[])
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
