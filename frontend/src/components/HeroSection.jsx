import Shadow from "./Shadow";
import VSCodeWindow from "./VSCodeWindow";
import { FaArrowRightLong } from "react-icons/fa6";
import { DemoCodes } from "../utils/utils";
import { NavLink } from "react-router-dom";
import { DarkMode } from "../context/DarkMode";
import { useContext, useState } from "react";

function HeroSection() {
  const [darkMode] = useContext(DarkMode);
  const [activeCodeIndex, setActiveCodeIndex] = useState(1);

  return (
    <div className="pt-4 sm:pt-8 md:pt-12 pb-2 sm:pb-16 md:pb-24 px-4 sm:px-6">
      <div className="w-full max-w-5xl mx-auto text-center flex flex-col items-center gap-3 sm:gap-4">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
          Skip Setup. Start{" "}
          <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 sm:px-4 py-1 rounded-lg inline-block hover:shadow-lg cursor-pointer">
            Building
          </span>
          .
        </h1>
        <h2 className={`text-lg sm:text-xl md:text-2xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
          Templates <span className="text-blue-500 font-bold">Designed</span> To Accelerate Development.
        </h2>
        <h3 className={`text-sm sm:text-base md:text-lg max-w-2xl ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Efficient Code Templates for Modern Projects. Reusable Configs Built for Real Workflows.
        </h3>
        <NavLink
          to="/templates"
          className={`mt-3 sm:mt-4 md:mt-6 px-6 sm:px-8 py-3 font-semibold text-sm sm:text-base rounded-lg flex items-center gap-2 hover:shadow-xl active:scale-95 ${
            darkMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Find Your Template <FaArrowRightLong className="text-sm" />
        </NavLink>
      </div>

      <div className="relative w-full max-w-6xl z-2 mx-auto mt-8 sm:mt-10 md:mt-14 h-auto md:h-[500px] flex justify-center items-center px-4 sm:px-6">
        {/* Left Code Window - Hidden on smaller screens */}
        <div className="relative hidden xl:block w-full opacity-80 max-w-xs -mr-32 z-0">
          <VSCodeWindow DemoCodes={DemoCodes[0]} />
        </div>

        {/* Center Code Window - Main Display */}
        <div className="relative z-9 w-full max-w-xs sm:max-w-sm md:max-w-md">
          <div className="group">
            <VSCodeWindow DemoCodes={DemoCodes[activeCodeIndex]} />
          </div>
        </div>

        {/* Right Code Window - Hidden on smaller screens */}
        <div className="relative hidden xl:block opacity-80 w-full max-w-xs -ml-32 z-8">
          <VSCodeWindow DemoCodes={DemoCodes[2]} />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
