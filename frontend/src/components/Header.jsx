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
    <div className="w-screen h-20 pt-4">
      <nav className={`w-[90%] backdrop-blur-lg fixed top-3 z-10 left-80 rounded-xl ${darkMode ? "bg-black/20" : "bg-white/20"} p-3 ${darkMode ? "text-white"  : "text-black"} items-center m-auto   block md:w-[60%] md:mx-auto flex justify-between`}>
        <h1 className="text-2xl cursor-pointer"><NavLink to="/">Plug&Play</NavLink></h1>
      <div className=" items-center justify-center gap-4 text-[#a1a1a1]  hidden md:block md:flex">
        <button className={`w-4 pt-1 cursor-pointer ${darkMode ? "text-white"  : "text-black"}  `} onClick={()=>setDarkMode(!darkMode)}>
          {
            darkMode ? <MdSunny/>  : <GoSun/>
          }
        </button>
        <button className={` hover:border-b p-1 ${darkMode ? "text-[#a1a1a1]"  : "text-black"}  transition duration-150 cursor-pointer ${darkMode ? "" : ""}`}><NavLink to="/signup">Sign up</NavLink></button>
        <button className={`hover:border-b p-1 ${darkMode ? "text-[#a1a1a1]"  : "text-black"}  cursor-pointer`} ><NavLink to="/login">Log in</NavLink></button>
        <div className={`text-xl p-1 ${darkMode ? "bg-black rounded-2xl"  : "text-black"}  cursor-pointer hover:text-white`}><FaGithub className={`${darkMode ? "text-white" : "text-black"}`}/></div>
      </div>
      <div className="block md:hidden flex items-center gap-4">
         <button className={`w-4 pt-1 cursor-pointer ${darkMode ? "text-black"  : "text-white"}  `} onClick={()=>setDarkMode(!darkMode)}>
          {
            darkMode ? <MdSunny/>  : <GoSun/>
          }
        </button>
        {
          mobileMenu ?  <IoMdClose className="w-8" onClick={()=>setMobileMenu(!mobileMenu)}/>  : <CiMenuBurger className="w-8" onClick={()=>setMobileMenu(!mobileMenu)}/>
        }
      </div>
      </nav>

      {/* Mobile  */}
      <div className={`mobile-sideMenu w-95 z-11 flex flex-col gap-5 h-[108rem] pt-30 text-center ${mobileMenu ? "block" : "hidden"}  backdrop-blur-md top-15 absolute right-0`}>
          <NavLink to="/signup" className={`text-2xl  hover:border hover:border-2xl ${darkMode ? "text-white": "text-black"}`}>Sign up</NavLink>
          <NavLink to="/login" className={`text-2xl ${darkMode ? "text-white": "text-black"}`}>Log in</NavLink>
          <NavLink to="/templates" className={`text-2xl ${darkMode ? "text-white": "text-black"}`}>Show Template's</NavLink>
      </div>
    </div>
  );
}

export default Header;
