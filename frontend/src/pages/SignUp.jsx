import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { DarkMode } from "../context/DarkMode";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../services/auth/auth";
import toast from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //const[check,isCheck]=useState(true);

  const [darkMode] = useContext(DarkMode);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prve) => ({ ...prve, [e.target.name]: e.target.value }));
  };

  // Mutation for sign up
  const { mutateAsync, isPending } = useMutation({
    mutationFn: signUp,
  });

  const handleSubmit = async (e) => {
    //Prevent default form submission behavior
    e.preventDefault();
    
    // Check if name field is empty (trim removes whitespace)
    if (formData.name.trim() === "") {
      toast.error("Name Is Required");
      return;
    }

    // Check if password or confirm password fields are empty
    else if (
      formData.password.trim() === "" ||
      formData.confirmPassword.trim() === ""
    ) {
      toast.error("Password Should Not Be Empty");
      return;
    }

    // Check if password and confirm password values match
    else if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords Do Not Match!");
      return;
    }

    //SignUp Logic
    try {
      const res = await mutateAsync(formData);
      console.log(res);

      // Show success message
      toast.success("Account Created Successfully!");

      // Reset form data
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login page after successful signup
      navigate("/login");

    } catch (error) {
      console.log(error);
      toast.error(`Account Not Created Due To ${error?.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className={`min-h-screen flex items-center ${darkMode ? "bg-gradient-to-br from-black via-gray-900 to-black" : "bg-gradient-to-br from-white via-gray-50 to-white"} justify-center px-4 sm:px-6 md:px-8 py-8`}>
      <div className={`w-full max-w-md p-6 sm:p-8 space-y-6 ${darkMode ? "bg-gradient-to-br from-black via-gray-900 to-black" : "bg-gradient-to-br from-white via-gray-50 to-white"}  rounded-xl shadow-2xl backdrop-blur-md border border-white/10`}>
        <div className="text-center space-y-2">
          <h2
            className={`text-2xl sm:text-3xl font-bold ${darkMode ? "text-white" : "text-black"}`}
          >
            Create Account
          </h2>
          <p
            className={`text-sm sm:text-base ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Join us today! It only takes a minute.
          </p>
        </div>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              className={`block text-sm font-semibold ${darkMode ? "text-white" : "text-black"}`}
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              className={`w-full px-4 py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                darkMode
                  ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-black placeholder-gray-500"
              }`}
              placeholder="John Doe"
              onChange={handleChange}
            />
          </div>

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
              autoComplete="email"
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
              autoComplete="new-password"
              className={`w-full px-4 py-2.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
                darkMode
                  ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-black placeholder-gray-500"
              }`}
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label
              className={`block text-sm font-semibold ${darkMode ? "text-white" : "text-black"}`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              autoComplete="new-password"
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
            //disabled={isLoading}
            className={`w-full py-3 mt-2 cursor-pointer font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition duration-200 shadow-lg text-sm sm:text-base ${isPending ? 'opacity-80 cursor-not-allowed' : ''}`}
          >
            {isPending ? <CircularProgress color="inherit" size={25} /> : "Sign Up"}
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
              Or sign up with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            className={`py-2.5 px-4 cursor-pointer rounded-lg font-medium text-sm sm:text-base transition border flex items-center justify-center gap-2 hover:opacity-80 ${
              darkMode
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                : "bg-gray-100 border-gray-300 text-black hover:bg-gray-200"
            }`}
          >
            <FcGoogle className="text-xl" />
            <span className="hidden sm:inline">Google</span>
          </button>
          <button
            className={`py-2.5 px-4 cursor-pointer rounded-lg font-medium text-sm sm:text-base transition border flex items-center justify-center gap-2 hover:opacity-80 ${
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
          Already have an account ? {" "}
          <NavLink
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-semibold transition"
          >
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
