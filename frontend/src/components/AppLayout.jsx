import { Outlet } from "react-router-dom";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Instruction from "./Instruction";
import FeaturedCards from "./FeaturedCards";
import LanguageSupport from "./LanguageSupport";
import { DarkMode } from "../context/DarkMode";
import { useContext } from "react";

function AppLayout() {
   const [darkMode]=useContext(DarkMode);
  return (
    <div className={`app-container ${darkMode ? "bg-black" : "bg-white"}`}>
      
      <main className="main-content">
        <HeroSection/>
        <Instruction/>
        <FeaturedCards/>
        <LanguageSupport/>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default AppLayout;
