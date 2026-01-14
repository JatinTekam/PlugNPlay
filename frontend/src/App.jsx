import "./App.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturedCards from "./components/FeaturedCards";
import { useContext, useState } from "react";
import LanguageSupport from "./components/LanguageSupport";
import PlugAndPlay from "./components/PlugAndPlayCom";
import Instruction from "./components/Instruction";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import Templates from "./pages/Templates";
import SignUp from "./pages/SignUp";
import { DarkMode } from "./context/DarkMode";

function App() {
  //const [darkMode, setDarkMode] = useState(true);

   const [darkMode,setDarkMode]=useContext(DarkMode);

  function handleDarkMode() {
    setDarkMode(!darkMode);
    //console.log(darkMode)
  }

  return (
    <div className={`w-screen h-full ${darkMode ? "bg-black"  :"bg-white"}`}>
     <Header />
      <Routes>
        <Route
          path="/"
          index
          element={
            <AppLayout/>
          }
        />
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/templates" element={<Templates/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
