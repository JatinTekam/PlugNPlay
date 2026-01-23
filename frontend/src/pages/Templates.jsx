import { useContext } from "react";
import { DarkMode } from "../context/DarkMode";
import codeImg from "../utils/images/codeImg.jpg";
import { CiBookmark } from "react-icons/ci";

function Templates() {

   const [darkMode]=useContext(DarkMode);

  return (
    <section className="w-full min-h-screen px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="search-box min-h-[150px] md:h-auto flex  gap-4 sm:gap-6 md:gap-8 items-center flex-col py-8 md:py-10">
          <p className={`${darkMode ?  "text-white" : "text-black"} text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center`}>
            <span className="text-[#a1a1a1]">Think.</span> Build.{" "}
            <span className="text-[#a1a1a1]">Repeat.</span>
          </p>
          <input
            type="text"
            className={`w-full sm:w-[80%] md:w-[70%] lg:w-[60%] h-10 bg-[rgba(256,256,256,0.9)] rounded-lg outline-none p-2 ${darkMode ? "" : "border" }`}
            placeholder="Search For Templates..."
          />
          <ul className="w-full sm:w-[90%] md:w-[80%] lg:w-[60%] text-white flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            <li className={`${darkMode ?"bg-[rgba(256,256,256,0.1)]" : "bg-black" } px-3 py-1 text-sm sm:text-base rounded cursor-pointer hover:opacity-80 transition`}>All</li>
            <li className={`${darkMode ?"bg-[rgba(256,256,256,0.1)]" : "bg-black" } px-3 py-1 text-sm sm:text-base rounded cursor-pointer hover:opacity-80 transition`}>Java</li>
            <li className={`${darkMode ?"bg-[rgba(256,256,256,0.1)]" : "bg-black" } px-3 py-1 text-sm sm:text-base rounded cursor-pointer hover:opacity-80 transition`}>Node</li>
            <li className={`${darkMode ?"bg-[rgba(256,256,256,0.1)]" : "bg-black" } px-3 py-1 text-sm sm:text-base rounded cursor-pointer hover:opacity-80 transition`}>Python</li>
            <li className={`${darkMode ?"bg-[rgba(256,256,256,0.1)]" : "bg-black" } px-3 py-1 text-sm sm:text-base rounded cursor-pointer hover:opacity-80 transition`}>TypeScript</li>
          </ul>
        </div> 
        {/* //bg-[rgba(256,256,256,0.9)] */}
        <div className="template-boxs flex justify-center gap-3 sm:gap-5 items-center flex-col py-8 md:py-12">
          <div className={`w-full sm:w-[95%] md:w-[90%] lg:w-[85%] rounded-lg overflow-hidden p-2 sm:p-3 md:p-4 flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 cursor-pointer border ${darkMode ? "border-white" : "shadow-xl"} `}>
            <div className="flex-shrink-0 w-full sm:w-48 md:w-56">
              <figure className="w-full shadow-2xl">
                <img src={codeImg} alt="template" className="rounded-xl w-full h-auto object-cover" />
              </figure>
            </div>
            <div className={`code-info flex-grow ${darkMode ? "text-white" : ""}`}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Java Configuration File</h2>
              <p className="text-xs sm:text-sm mt-1 md:mt-2">Created By:- Jatin Tekam</p>
              <p className="text-xs sm:text-sm">Total Files:- 0</p>
            </div>
            <div className="flex justify-end items-start flex-shrink-0">
              <p className={`text-2xl sm:text-3xl ${darkMode ? "text-white" : "text-black"} p-2 hover:scale-110 transition`}>
                <CiBookmark />
              </p>
            </div>
          </div>

          <div className={`w-full sm:w-[95%] md:w-[90%] lg:w-[85%] rounded-lg overflow-hidden p-2 sm:p-3 md:p-4 flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 cursor-pointer border ${darkMode ? "border-white " : "shadow-xl"} `}>
            <div className="flex-shrink-0 w-full sm:w-48 md:w-56">
              <figure className="w-full shadow-2xl">
                <img src={codeImg} alt="template" className="rounded-xl w-full h-auto object-cover" />
              </figure>
            </div>
            <div className={`code-info flex-grow ${darkMode ? "text-white" : ""}`}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Java Configuration File</h2>
              <p className="text-xs sm:text-sm mt-1 md:mt-2">Created By:- Jatin Tekam</p>
              <p className="text-xs sm:text-sm">Total Files:- 0</p>
            </div>
            <div className="flex justify-end items-start flex-shrink-0">
              <p className={`text-2xl sm:text-3xl ${darkMode ? "text-white" : "text-black"} p-2 hover:scale-110 transition`}>
                <CiBookmark />
              </p>
            </div>
          </div>
         
        </div>
      </div>
    </section>
  );
}

export default Templates;
