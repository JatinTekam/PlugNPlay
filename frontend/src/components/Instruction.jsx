import { useContext } from "react";
import { DarkMode } from "../context/DarkMode";
import { FaJava } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";

function Instruction() {

  const [darkMode]=useContext(DarkMode);

  return (
    <section className="w-[70%] flex flex-col gap-20 m-auto mb-10 p-3">
      <div className={`sm:w-[25rem]  md:w-[40rem] w-[15rem] 2xl:w-[60rem]   m-auto`}>
        <div className="w-full rounded-xl">
          <div className="w-full flex flex-col">
          <div className={`${darkMode ? "bg-[rgba(256,256,256,0.1)]" : "bg-[rgba(0,0,0,0.1)]" } rounded-xl text-center text-2xl/20 text-wrap mb-4 flex`}>
            <h1 className={`w-full text-lg sm:text-2xl pl-2 ${darkMode ? "text-[#a1a1a1]" :  "text-black"} font-mono text-start`}>“ <span className={`${darkMode ? "text-white" :  "text-black font-bold"} `}>{`{Production-Ready Templates}`}</span> for <span className="">Modern Developers.</span>”../</h1>
            <div className="p-4">
              <FaJava className={`${darkMode ?  "text-white" :"text-black" } text-5xl`}/>
            </div>
          </div>

          
          <div className={` ${darkMode ? "bg-[rgba(256,256,256,0.1)]" : "bg-[rgba(0,0,0,0.1)]"} rounded-xl text-center text-2xl/20 text-wrap flex items-center mb-4`}>
          <div className=" p-4">
              <FaPython className={`${darkMode ?  "text-white" :"text-black" } text-4xl md:text-5xl`}/>
            </div>
            <h1 className={`w-full text-lg sm:text-2xl ${darkMode ? "text-[#a1a1a1]" :  "text-black"} font-mono text-end pr-2`}>
              “Ready-to-Use Code. <span className={`${darkMode ? "text-white" :  "text-black font-bold"} `}>{`{Faster Development}`}</span>.”../</h1>
          </div>


          <div className={` ${darkMode ? "bg-[rgba(256,256,256,0.1)]" : "bg-[rgba(0,0,0,0.1)]"} rounded-xl text-center text-2xl/20 text-wrap flex items-center mb-4`}>
            <h1 className={`w-full text-lg sm:text-2xl ${darkMode ? "text-[#a1a1a1]" :  "text-black"} font-mono text-start pl-2`}>
              “Your Shortcut to Clean, <span className={`${darkMode ? "text-white" :  "text-black font-bold"} `}>{`{Reusable Code}`}</span>.”../</h1>
              <div className="p-4">
              <IoLogoJavascript className={`${darkMode ?  "text-white" :"text-black" } text-5xl`}/>
            </div>
          </div>

           <div className={` ${darkMode ? "bg-[rgba(256,256,256,0.1)]" : "bg-[rgba(0,0,0,0.1)]"} rounded-xl text-center text-2xl/20 text-wrap flex items-center mb-4`}>
          <div className="p-4">
              <SiTypescript className={`${darkMode ?  "text-white" :"text-black" } text-5xl`}/>
            </div>
            <h1 className={`w-full text-lg sm:text-2xl ${darkMode ? "text-[#a1a1a1]" :  "text-black"} font-mono text-end pr-2`}>
              “Ready-to-Use Code. <span className={`${darkMode ? "text-white" :  "text-black font-bold"} `}>{`{Faster Development}`}</span>.”../</h1>
          </div>

          </div>

          <div>

          </div>
        </div>
      </div>

      
       </section>
  );
}

export default Instruction;
