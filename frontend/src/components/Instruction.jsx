import VSCodeIn from "./VSCodeIn";

function Instruction({ darkMode }) {
  return (
    <div className="w-[70%] flex flex-col gap-20 m-auto p-3">
      <div className="flex items-center">
        <div className="hidden sm:block relative w-[500px]">
          <VSCodeIn />
          <div
            className={`absolute w-50 h-40 top-0 right-0 h-full bg-gradient-to-l ${darkMode ? "from-white" : "from-[#0A0A0A]"} `}
          ></div>
        </div>
        <div
          className={`text-5xl text-center font-bold ${
            darkMode ? "text-black" : "text-white"
          }`}
        >
         <h1>Search Your Template</h1> 
         <h1>And</h1> 
         <h1 className="font-bold"> <span className="text-[#a1a1a1] font-bold">{`{Code}`}</span> Snippets !</h1>
        </div>
      </div>

      <div className="flex items-center">
        <div className={`${darkMode ? "text-black" : "text-white"} text-5xl text-center font-bold`}>
          <h1>Just Replace</h1>
          <h1>The</h1>
          <h1 className="text-[#a1a1a1] font-bold">{`{Environment Variable}`}</h1>
          <h2>And Done</h2>
          <h2>You Are Good To Go. </h2>
        </div>
        <div className="relative w-[500px]">
          <VSCodeIn />
          <div
            className={`absolute w-50 h-40 top-0 left-0 h-full bg-gradient-to-r ${
              darkMode ? "from-white" : "from-[#0A0A0A]"
            }  `}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Instruction;
