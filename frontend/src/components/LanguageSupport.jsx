import { FaJava } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { DarkMode } from "../context/DarkMode";
import { useContext } from "react";

function LanguageSupport(){

     const [darkMode]=useContext(DarkMode);

   return(
   <div className="m-auto w-[70%] h-[160px]">
    <h1 className={`text-center text-2xl ${darkMode ? "text-white" : "text-black"} `}>Supported Language's</h1>
    <div className={` mt-5 flex justify-center items-center gap-3 ${darkMode ? "text-white" : "text-black"} `}>
        <FaJava className="text-5xl"/>
        <IoLogoJavascript className="text-5xl"/>
        <SiTypescript className="text-[40px]"/>
        <FaPython className="text-4xl"/>
    </div>
   </div>)
}

export default LanguageSupport;