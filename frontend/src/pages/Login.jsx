import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { DarkMode } from "../context/DarkMode";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

   const [darkMode]=useContext(DarkMode);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(password);
    if (formData.password.trim()=="" || formData.email.trim()=="") {
      alert("All Field Are Required");
      return;
    }
    console.log("Form Submitted:", formData);
    // Add your API call logic here
  };

  return (
    <div className="flex justify-center h-screen pt-2">
      <div className="w-full max-w-md p-8 space-y-6 mx-10 bg-[rgba(256,256,256,0.1)] h-110 mt-10 rounded-xl shadow-2xl">
        <h2 className={`text-xl sm:text-xl md:text-2xl font-bold text-center ${darkMode ?  "text-white" : "text-black"}`}>
          Log in to Account
        </h2>
        <p className="text-center text-white">
          
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <div>
            <label className={`block mb-1 text-sm font-medium ${darkMode ?  "text-white" : "text-black"}`}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="off"
              className="w-full px-4 py-2 border bg-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="example@gmail.com"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={`block mb-1 text-sm font-medium ${darkMode ?  "text-white" : "text-black"}`}>
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              autoComplete="off"
              className="w-full px-4 py-2 border bg-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>


          <button
            type="submit"
            className="w-full py-3 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Log in
          </button>
        </form>

        <p className={`text-sm text-center ${darkMode ?  "text-white" : "text-black"}`}>
          Already have an account ?{" "}
          <NavLink to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </NavLink>
        </p>
        <div className="w-full flex justify-center gap-5 text-2xl">
            <FcGoogle className="cursor-pointer"/>
            <RxGithubLogo className={`${darkMode ?  "text-white" : "text-black"} cursor-pointer`}/>
        </div>
      </div>
    </div>
  );
};

export default Login;
