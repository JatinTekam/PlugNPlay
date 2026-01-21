import { Outlet } from "react-router-dom";
import Header from "./Header";
import { DarkMode } from "../context/DarkMode";
import { useContext } from "react";

function AppLayout() {
   const [darkMode]=useContext(DarkMode);
  return (
    <div className={`app-container ${darkMode ? "bg-black" : "bg-white"}`}>
      <main className="main-content">
        <Header/>
        <Outlet />
        {/* <Footer/> */}
      </main>
    </div>
  );
}

export default AppLayout;
