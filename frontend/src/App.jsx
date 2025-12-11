import './App.css'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import FeaturedCards from './components/FeaturedCards'
import { useState } from 'react'
import LanguageSupport from './components/LanguageSupport'
import PlugAndPlay from './components/PlugAndPlayCom'
import Instruction from './components/Instruction'


function App() {
const[darkMode,setDarkMode]=useState(false);

function handleDarkMode(){
  setDarkMode(!darkMode);
}

  return (
    <div className={`w-screen pb-5 ${darkMode ? "text-red"  : ""}   ${darkMode ? "bg-white"  : "bg-[#0A0A0A]"} trancation-all`}>
     <Header handleDarkMode={handleDarkMode} darkMode={darkMode}/>
     <HeroSection darkMode={darkMode}/>
     <Instruction darkMode={darkMode}/>
     <FeaturedCards darkMode={darkMode}/>
     <LanguageSupport darkMode={darkMode}/>
     {/* <PlugAndPlay/> */}
    </div>
  )
}

export default App
