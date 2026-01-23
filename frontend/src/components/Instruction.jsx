import { useContext } from "react";
import { DarkMode } from "../context/DarkMode";
import { FaCopy, FaLightbulb } from "react-icons/fa";
import img1 from "../utils/images/pc.jpg"
import img2 from "../utils/images/img20.jpeg"
import img3 from "../utils/images/img3.jpeg"

function Instruction() {
  const [darkMode]=useContext(DarkMode);

  return (
    <section className="w-full sm:px-6 md:px-8 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
          {/* How to Use Section */}
          <div className={`mt-5 sm:mt-12 pt-8 sm:pt-10 border-t ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 ${darkMode ? "text-white" : "text-black"}`}>
              How to Use Plug & Play
            </h2>

            {/* Card 1: Search & Browse */}
            <div className={`rounded-lg sm:rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transition mb-6 ${darkMode ? "bg-[rgba(256,256,256,0.08)]" : "bg-[rgba(0,0,0,0.08)]"}`}>
              <div className="w-90  rounded-lg" style={{background: darkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)"}}>
                <img src={img1} alt="Image" className="rounded-xl"/>
              </div>
              <div className="flex-1">
                <h3 className={`text-lg sm:text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                  1. Search & Browse Templates
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Browse our extensive collection of production-ready code templates. Filter by programming language, framework, or use case to find exactly what you need. Each template is crafted by experienced developers.
                </p>
              </div>
            </div>

            {/* Card 2: Copy & Customize */}
            <div className={`rounded-lg sm:rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row-reverse items-center gap-4 sm:gap-6 transition mb-6 ${darkMode ? "bg-[rgba(256,256,256,0.08)]" : "bg-[rgba(0,0,0,0.08)]"}`}>
              <div className="w-90  rounded-lg" style={{background: darkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)"}}>
                <img src={img2} alt="Image" className="rounded-xl"/>
              </div>
              <div className="flex-1">
                <h3 className={`text-lg sm:text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                  2. Copy & Customize with Ease
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  One-click copy functionality lets you instantly grab any template and paste it into your project. Customize the code to match your specific requirements. All templates follow industry best practices and are production-ready.
                </p>
              </div>
            </div>

            {/* Card 3: Build & Deploy */}
            <div className={`rounded-lg sm:rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transition ${darkMode ? "bg-[rgba(256,256,256,0.08)]" : "bg-[rgba(0,0,0,0.08)]"}`}>
              <div className="w-90  rounded-lg" style={{background: darkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)"}}>
                <img src={img3} alt="Image" className="rounded-xl"/>
              </div>
              <div className="flex-1">
                <h3 className={`text-lg sm:text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                  3. Build Faster & Launch Quicker
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Skip boilerplate code and jump straight to building features that matter. Our templates accelerate development by up to 70%, allowing you to focus on innovation rather than repetitive setup. Deploy with confidence using tested, reliable code.
                </p>
              </div>
            </div>
          </div>
        </div>
  
      
    </section>
  );
}

export default Instruction;
