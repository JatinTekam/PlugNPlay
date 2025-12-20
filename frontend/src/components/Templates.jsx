import codeImg from "../utils/images/codeImg.jpg";
import { CiBookmark } from "react-icons/ci";

function Templates({setDarkMode,darkMode}) {
  return (
    <section className="w-full h-full">
      <div className="w-[70%] h-screen m-auto">
        <div className="search-box h-80  flex justify-center gap-8 items-center flex-col">
          <p className={`${darkMode ?  "text-white" : "text-black"} text-3xl`}>
            <span className="text-[#a1a1a1]">Think.</span> Build.{" "}
            <span className="text-[#a1a1a1]">Repeat.</span>
          </p>
          <input
            type="text"
            className="w-[60%] h-10 bg-[rgba(256,256,256,0.9)] rounded-lg outline-none p-2"
            placeholder="Search For Templates..."
          />
          <ul className="w-[50%] text-white flex justify-around ">
            <li className="bg-[rgba(256,256,256,0.1)] px-3 py-1 rounded cursor-pointer">All</li>
            <li className="bg-[rgba(256,256,256,0.1)] px-3 py-1 rounded cursor-pointer">Java</li>
            <li className="bg-[rgba(256,256,256,0.1)] px-3 py-1 rounded cursor-pointer">JavaScript</li>
            <li className="bg-[rgba(256,256,256,0.1)] px-3 py-1 rounded cursor-pointer">Python</li>
            <li className="bg-[rgba(256,256,256,0.1)] px-3 py-1 rounded cursor-pointer">TypeScript</li>
          </ul>
        </div> 
        {/* //bg-[rgba(256,256,256,0.9)] */}
        <div className="template-boxs flex justify-center gap-5 items-center flex-col">
          <div className="w-[70%] h-30  rounded-lg overflow-hidden p-1 flex gap-10 cursor-pointer border border-white ">
            <div>
              <figure className="w-50 shadow-2xl">
                <img src={codeImg} alt="" className="rounded-xl" />
              </figure>
            </div>
            <div className="code-info text-white">
              <h2 className=" text-2xl">Java Configuration File</h2>
              <p className=" text-sm">Created By:- Jatin Tekam</p>
              <p className=" text-sm">Total Files:- 0</p>
            </div>
            <div className="w-[30%] flex justify-end">
              <p className="text-3xl text-white p-2">
                <CiBookmark />
              </p>
            </div>
          </div>

           <div className="w-[70%] h-30  rounded-lg overflow-hidden p-1 flex gap-10 cursor-pointer border border-white ">
            <div>
              <figure className="w-50 shadow-2xl">
                <img src={codeImg} alt="" className="rounded-xl" />
              </figure>
            </div>
            <div className="code-info text-white">
              <h2 className=" text-2xl">Java Configuration File</h2>
              <p className=" text-sm">Created By:- Jatin Tekam</p>
              <p className=" text-sm">Total Files:- 0</p>
            </div>
            <div className="w-[30%] flex justify-end">
              <p className="text-3xl text-white p-2">
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
