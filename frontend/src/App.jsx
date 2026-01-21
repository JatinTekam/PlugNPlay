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
import { Profile } from "./pages/Profile";
import Home from "./pages/Home";
import TemplateInfo from "./pages/TemplateInfo";

function App() {
  //const [darkMode, setDarkMode] = useState(true);

  const [darkMode, setDarkMode] = useContext(DarkMode);

  function handleDarkMode() {
    setDarkMode(!darkMode);
    //console.log(darkMode)
  }

  return (
    <div className={`w-screen h-full ${darkMode ? "bg-black" : "bg-white"}`}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
        <Route index element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/templateinfo" element={<TemplateInfo />} />
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
