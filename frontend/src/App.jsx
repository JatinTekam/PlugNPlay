import "./App.css";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import Templates from "./pages/Templates";
import SignUp from "./pages/SignUp";
import { DarkMode } from "./context/DarkMode";
import { Profile } from "./pages/Profile";
import Home from "./pages/Home";
import TemplateInfo from "./pages/TemplateInfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {

  const [darkMode, setDarkMode] = useContext(DarkMode);
  const queryClient = new QueryClient();




  return (
    <div className={`w-screen  h-full ${darkMode ? "bg-black" : "bg-white"}`}>
      <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
