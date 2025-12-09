import Shadow from "./Shadow";
import VSCodeWindow from "./VSCodeWindow";
import { FaArrowRightLong } from "react-icons/fa6";
import { DemoCodes } from "../utils/utils";

function HeroSection({darkMode}) {

  return (
    <div className="pt-4 mb-25 ">
      <div className=" w-[60%] h-90 md:h-60 mx-auto text-center flex flex-col items-center">
      <h1 className={`text-center ${darkMode ? "text-black"  : ""}  text-[#a1a1a1] text-4xl font-bold  text-shadow-white`}>
        Skip Setup. Start <span className="bg-[#a1a1a1] text-black  rounded">Building</span>.
      </h1>
      <h2 className={`text-center ${darkMode ? "text-black"  : ""} text-[#a1a1a1] text-md font-bold mt-3 text-shadow-white`}>Templates <span className="">Designed</span> To Accelerate Development.</h2>
      <h3 className={`${darkMode ? "text-black"  : ""} text-[#a1a1a1] text-md`}>Efficient Code Templates for Modern Projects. Reusable Configs Built for Real Workflows.</h3>
      <button className={` ${darkMode ? "bg-black"  : ""} ${darkMode ? "text-black"  : ""} border-b transition-all duration-300 cursor-pointer hover:bg-white hover:text-black rounded py-2 rounded w-50 mt-9 text-white flex justify-center items-center gap-2`}>Find Your Template <FaArrowRightLong/></button>
      </div>
      <div className="relative w-[60%] h-[500px] text-white block mx-auto flex justify-center overflow-hidden">
        <div className="relative -left-25 hidden xl:block">
          <VSCodeWindow DemoCodes={DemoCodes[0]}/>
        </div>
        <div className="absolute z-1 ">
          <VSCodeWindow DemoCodes={DemoCodes[1]}/>
        </div>
        <div className="relative left-27 z-0 hidden xl:block">
          <VSCodeWindow DemoCodes={DemoCodes[2]}/>
        </div>
       
        <Shadow darkMode={darkMode}/>
      </div>
    </div>
  );
}

export default HeroSection;
