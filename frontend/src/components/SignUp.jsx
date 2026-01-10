import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form Submitted:", formData);
    // Add your API call logic here
  };

  return (
    <div className="flex justify-center h-screen pt-5">
      <div className="w-full max-w-md p-8 space-y-6 bg-[rgba(256,256,256,0.1)] h-160  rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">
          Create Account
        </h2>
        <p className="text-center text-white">
          Join us today ! It only takes a minute.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-white">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border bg-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Jhon Doe"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-white">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="nope"
              className="w-full px-4 py-2 border bg-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="example@gmail.com"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-white">
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

          <div>
            <label className="block mb-1 text-sm font-medium text-white">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
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
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-white">
          Already have an account ?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
        <div className="w-full flex justify-center gap-5 text-2xl">
          <FcGoogle className="cursor-pointer" />
          <RxGithubLogo className="text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
