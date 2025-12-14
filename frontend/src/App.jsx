import "./App.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturedCards from "./components/FeaturedCards";
import { useState } from "react";
import LanguageSupport from "./components/LanguageSupport";
import PlugAndPlay from "./components/PlugAndPlayCom";
import Instruction from "./components/Instruction";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./components/Login";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  function handleDarkMode() {
    setDarkMode(!darkMode);
    console.log(darkMode)
  }

  return (
    <div className={`w-screen h-full ${darkMode ? "bg-black"  :"bg-white"}`}>
     <Header handleDarkMode={handleDarkMode} darkMode={darkMode} />
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout handleDarkMode={handleDarkMode} darkMode={darkMode} />
          }
        />
          <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
