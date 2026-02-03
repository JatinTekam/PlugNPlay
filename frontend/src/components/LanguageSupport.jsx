import { FaJava } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript, SiCplusplus, SiDotnet, SiPhp, SiRuby, SiGo, SiRust} from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { DarkMode } from "../context/DarkMode";
import { useContext } from "react";

function LanguageSupport(){

  const [darkMode] = useContext(DarkMode);

  const languages = [
    { Icon: FaJava, label: "Java", color: "text-orange-600" },
    { Icon: IoLogoJavascript, label: "JavaScript", color: "text-yellow-600" },
    { Icon: SiTypescript, label: "TypeScript", color: "text-blue-700" },
    { Icon: FaPython, label: "Python", color: "text-blue-600" },
    { Icon: SiCplusplus, label: "C++", color: "text-blue-600" },
    { Icon: SiDotnet, label: ".Net", color: "text-purple-500" },
    { Icon: SiPhp, label: "PHP", color: "text-blue-400" },
    { Icon: SiRuby, label: "Ruby", color: "text-red-600" },
    { Icon: SiGo, label: "Go", color: "text-blue-600" }
    //{ Icon: SiRust, label: "Rust", color: "text-orange-600" }
  ];

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 ${darkMode ? "text-white" : "text-black"}`}>
          Supported Languages
        </h1>
        <div className={`flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 ${darkMode ? "text-white" : "text-black"}`}>
          {languages.map(({ Icon, label, color }) => (
            <div key={label} className="flex flex-col items-center gap-2 group">
              <div className={`${color} text-4xl sm:text-5xl md:text-6xl transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1`}>
                <Icon />
              </div>
              <span className={`text-xs sm:text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LanguageSupport;