import { useContext } from "react";
import { DarkMode } from "../context/DarkMode";
import VSCodeIn from "./VSCodeIn";
import img1 from "../utils/images/pc.jpg"
import img20 from "../utils/images/img20.jpeg"
import { DemoCodes } from "../utils/utils";
import VSCodeWindow from "./VSCodeWindow";

function Instruction() {

  const [darkMode]=useContext(DarkMode);

  return (
    <div className="w-[70%] flex flex-col gap-20 m-auto mb-10 p-3">
      <div className={`flex xl:justify-center  ${darkMode ? "bg-[rgba(256,256,256,0.1)]" : "bg-[rgba(256,256,256,0.1)]"} gap-3 rounded-xl items-center`}>
        {/* <div className="hidden  2xl:block w-[900px]">
          <img src={img1} alt=""  className=" rounded-xl bg-cover"/>
        </div> */}
        <div
          className={`text-xl text:text-left 2xl:text-center  font-bold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
         <div className="text-[1.3rem] 2xl:text-[1.5rem] h-160 flex flex-col gap-4">
         <div className="w-60 2xl:w-full">
           <h2 className="">
          <i>Search Your Template And 
         <span className="text-[#a1a1a1] font-bold">{` {Code}`}</span> Snippets !
         Build Faster. Code Smarter
         </i>
         </h2>
         </div>
          <div className="">
            <VSCodeIn code={1} width={true}/>
          </div>
         </div>
        </div>
       </div>

       <div className={`flex  ${darkMode ? "bg-[rgba(256,256,256,0.1)]" : "bg-[rgba(256,256,256,0.1)]"} gap-3 rounded-xl items-center`}>
        <div
          className={`text-xl  text-center font-bold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
         <div className="text-xl h-160 flex flex-col gap-4">
         <div className="w-60 2xl:w-full">
           <h2 className="">
          <i>Search Your Template And 
         <span className="text-[#a1a1a1] font-bold">{` {Code}`}</span> Snippets !
         Build Faster. Code Smarter
         </i>
         </h2>
         </div>
          <div className="">
            <VSCodeIn code={1} width={true}/>
          </div>
         </div>
        </div>
        {/* <div className="hidden  md:block w-[700px]">
          <img src={img20} alt=""  className=" rounded-xl bg-cover"/>
        </div> */}
       </div>

       
    </div>
  );
}

export default Instruction;
