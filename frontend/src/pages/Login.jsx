import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { DarkMode } from "../context/DarkMode";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserId } from "../services/auth/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [darkMode] = useContext(DarkMode);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const { data, isLoading ,refetch} = useQuery({
    queryKey: ["user"],
    queryFn: getUserId,
    enabled: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (formData.password.trim() === "" || formData.email.trim() === "") {
      alert("All Field Are Required");
      return;
    }
    console.log("Form Submitted:", formData);

    // Add your API call logic here
    await refetch();
    console.log(data);
  };

 
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-8">
      <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-[rgba(256,256,256,0.1)] rounded-xl shadow-2xl backdrop-blur-md border border-white/10">
        <div className="text-center space-y-2">
          <h2
            className={`text-2xl sm:text-3xl font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            Welcome Back
          </h2>
          <p
            className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Log in to your account to continue
          </p>
        </div>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              className={`block text-sm font-semibold ${darkMode ? "text-white" : "text-black"}`}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="off"
              className={`w-full px-4 py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                darkMode
                  ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-black placeholder-gray-500"
              }`}
              placeholder="example@gmail.com"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label
              className={`block text-sm font-semibold ${darkMode ? "text-white" : "text-black"}`}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              autoComplete="off"
              className={`w-full px-4 py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                darkMode
                  ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-black placeholder-gray-500"
              }`}
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 font-medium transition"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition duration-200 shadow-lg text-sm sm:text-base"
          >
            Log in
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div
              className={`w-full h-px ${darkMode ? "bg-white/20" : "bg-gray-300"}`}
            ></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span
              className={`px-2 ${darkMode ? "bg-black/40 text-gray-400" : "bg-white text-gray-500"}`}
            >
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            className={`py-2.5 px-4 rounded-lg font-medium text-sm sm:text-base transition border flex items-center justify-center gap-2 hover:opacity-80 ${
              darkMode
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                : "bg-gray-100 border-gray-300 text-black hover:bg-gray-200"
            }`}
          >
            <FcGoogle className="text-xl" />
            <span className="hidden sm:inline">Google</span>
          </button>
          <button
            className={`py-2.5 px-4 rounded-lg font-medium text-sm sm:text-base transition border flex items-center justify-center gap-2 hover:opacity-80 ${
              darkMode
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                : "bg-gray-100 border-gray-300 text-black hover:bg-gray-200"
            }`}
          >
            <RxGithubLogo className="text-xl" />
            <span className="hidden sm:inline">GitHub</span>
          </button>
        </div>

        <p
          className={`text-sm text-center ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Don't have an account?{" "}
          <NavLink
            to="/signup"
            className="text-blue-600 hover:text-blue-700 font-semibold transition"
          >
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
