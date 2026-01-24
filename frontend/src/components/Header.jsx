import { FaGithub } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { MdSunny } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import { DarkMode } from "@mui/icons-material";
import { DarkMode } from "../context/DarkMode";

function Header() {
  const[mobileMenu,setMobileMenu]=useState(false);

  const [darkMode,setDarkMode]=useContext(DarkMode);


  return (
    <div className="w-full h-16 sm:h-20 pt-2 sm:pt-4">
      <nav className={`backdrop-blur-lg fixed top-1 left-1/2 -translate-x-1/2 z-50 h-10 sm:h-20 transition-all duration-300 ${darkMode ? "bg-black/20" : "bg-white/20"} px-4 sm:px-6 md:px-8 py-2 sm:py-3 ${darkMode ? "text-white" : "text-black"} flex justify-between items-center border-b ${darkMode ? "border-white/10" : "border-black/10"}
        w-full sm:w-[95%] md:w-[90%] lg:w-[85%] 2xl:w-[75%] max-w-7xl rounded-none sm:rounded-none md:rounded-b-xl
      `}>
        <h1 className="text-lg sm:text-2xl font-semibold cursor-pointer flex-shrink-0"><NavLink to="/">Plug&Play</NavLink></h1>
        <div className="hidden md:flex items-center justify-center gap-3 sm:gap-4 text-[#a1a1a1]">
          <button className={`text-lg sm:text-xl pt-1 cursor-pointer transition hover:scale-110 ${darkMode ? "text-white" : "text-black"}`} onClick={()=>setDarkMode(!darkMode)}>
            {darkMode ? <MdSunny/> : <GoSun/>}
          </button>
          <button className={`text-sm sm:text-base hover:border-b p-1 ${darkMode ? "text-[#a1a1a1]" : "text-black"} transition duration-150 cursor-pointer`}><NavLink to="/signup">Sign up</NavLink></button>
          <button className={`text-sm sm:text-base hover:border-b p-1 ${darkMode ? "text-[#a1a1a1]" : "text-black"} cursor-pointer transition duration-150`}><NavLink to="/login">Log in</NavLink></button>
          <div className={`text-lg sm:text-xl p-1 ${darkMode ? "bg-black rounded-2xl" : "text-black"} cursor-pointer hover:text-white transition hover:scale-110`}><FaGithub className={`${darkMode ? "text-white" : "text-black"}`}/></div>
        </div>
        <div className="md:hidden flex items-center gap-2 sm:gap-4">
          <button className={`text-lg sm:text-xl pt-1 cursor-pointer transition hover:scale-110 ${darkMode ? "text-white" : "text-black"}`} onClick={()=>setDarkMode(!darkMode)}>
            {darkMode ? <MdSunny/> : <GoSun/>}
          </button>
          {mobileMenu ? <IoMdClose className="w-6 sm:w-8 cursor-pointer transition hover:scale-110" onClick={()=>setMobileMenu(!mobileMenu)}/> : <CiMenuBurger className="w-6 sm:w-8 cursor-pointer transition hover:scale-110" onClick={()=>setMobileMenu(!mobileMenu)}/>}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-sideMenu w-full min-h-screen pt-16 sm:pt-20 z-40 flex flex-col gap-1 text-center fixed top-0 left-0 transition-all duration-300 ease-in-out ${mobileMenu ? "block opacity-100" : "hidden opacity-0 pointer-events-none"} ${darkMode ? "bg-black/95" : "bg-gray-50/95"} backdrop-blur-sm border-t ${darkMode ? "border-white/10" : "border-gray-200"}`}>
        <NavLink to="/signup" className={`py-4 px-4 text-base font-medium transition hover:bg-blue-500/10 border-b ${darkMode ? "text-white border-white/10 hover:text-blue-400" : "text-black border-gray-200 hover:text-blue-600"}`} onClick={()=>setMobileMenu(false)}>Sign up</NavLink>
        <NavLink to="/login" className={`py-4 px-4 text-base font-medium transition hover:bg-blue-500/10 border-b ${darkMode ? "text-white border-white/10 hover:text-blue-400" : "text-black border-gray-200 hover:text-blue-600"}`} onClick={()=>setMobileMenu(false)}>Log in</NavLink>
        <NavLink to="/templates" className={`py-4 px-4 text-base font-medium transition hover:bg-blue-500/10 ${darkMode ? "text-white hover:text-blue-400" : "text-black hover:text-blue-600"}`} onClick={()=>setMobileMenu(false)}>Templates</NavLink>
      </div>
    </div>
  );
}

export default Header;
