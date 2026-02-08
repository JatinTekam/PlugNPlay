import React, { useState } from "react";
import { DarkMode } from "../context/DarkMode";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth/auth";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
import useAuth from "../services/auth/store";
import OAuthButton from "../components/OAuthButton";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [darkMode] = useContext(DarkMode);

  const navigate = useNavigate();

  const loginFn=useAuth(state=>state.login);
  const loading=useAuth(state=>state.authLoading);


  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Check if email or password fields are empty after trimming whitespace
    if (formData.password.trim() === "" || formData.email.trim() === "") {
      toast.error("Email and Password Should Not Be Empty");
      return;
    }

    // Login Logic
    try {
      //const res = await mutateAsync(formData);
      await loginFn(formData);
      toast.success("Login Successful");
      navigate("/profile");
    } catch (error) {

      if(error?.code==="ERR_NETWORK"){
      toast.error("Network Error: Please check your internet connection.");
      }else if(error?.response?.status >= 500){
        toast.error("Backend Server is Down. Please try again later.");
      }else if(!error?.response){
        toast.error("Cannot reach backend server. Please check if the server is running.");
      }else{
        toast.error(error?.response?.data?.message || "Login Failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-8">
      <div className={`w-full max-w-md p-6 sm:p-8 space-y-6 ${darkMode ? "bg-gradient-to-br from-black via-gray-900 to-black" : "bg-gradient-to-br from-white via-gray-50 to-white"} rounded-xl shadow-2xl backdrop-blur-md border border-white/10`}>
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

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-3 mt-2 font-semibold text-white bg-blue-600 cursor-pointer rounded-lg hover:bg-blue-700 active:scale-95 transition duration-200 shadow-lg text-sm sm:text-base`}
          >
            {loading ? <CircularProgress color="inherit" size={25}/> :"Log in"}
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



        {/* OAuth Buttons */}
        <OAuthButton/>

        <p
          className={`text-sm text-center ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Don't have an account ?{" "}
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
