import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { DarkMode } from "../context/DarkMode";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";

function AppLayout() {
  const [darkMode] = useContext(DarkMode);
  return (
    <div
      className={`app-container overflow-x-hidden flex flex-col min-h-screen ${darkMode ? "bg-black" : "bg-white"}`}
    >
      <main className="main-content flex-1">
        <Header />
        <Outlet />
        <Footer />
        <Toaster/>
      </main>
    </div>
  );
}

export default AppLayout;
