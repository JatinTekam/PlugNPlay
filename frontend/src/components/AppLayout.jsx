import { Outlet } from "react-router-dom";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Instruction from "./Instruction";
import FeaturedCards from "./FeaturedCards";
import LanguageSupport from "./LanguageSupport";

function AppLayout({ handleDarkMode, darkMode }) {
  return (
    <div className={`app-container ${darkMode ? "bg-black" : "bg-white"}`}>
      
      <main className="main-content">
        <HeroSection darkMode={darkMode} />
        <Instruction darkMode={darkMode} />
        <FeaturedCards darkMode={darkMode} />
        <LanguageSupport darkMode={darkMode} />
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default AppLayout;
