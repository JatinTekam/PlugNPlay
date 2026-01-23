import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { DarkMode } from "../context/DarkMode";
import { useContext } from "react";

function AppLayout() {
   const [darkMode]=useContext(DarkMode);
  return (
    <div className={`app-container flex flex-col min-h-screen ${darkMode ? "bg-black" : "bg-white"}`}>
      <main className="main-content flex-1">
        <Header />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
