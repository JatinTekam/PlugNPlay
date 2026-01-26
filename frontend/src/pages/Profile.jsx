import React, { useContext } from "react";
import { CiBookmark } from "react-icons/ci";
import codeImg from "../utils/images/codeImg.jpg";
import { DarkMode } from "../context/DarkMode";
import { Link, NavLink } from "react-router-dom";

export const Profile = () => {

  const [darkMode]=useContext(DarkMode);

  return (
    <section className={`w-full min-h-screen transition-colors duration-300 ${darkMode ? "bg-gradient-to-br from-black via-gray-900 to-black" : "bg-gradient-to-br from-white via-gray-50 to-white"}`}>
      <div className="w-full md:w-[85%] lg:w-[70%] h-auto m-auto p-4 sm:p-6 md:p-8 lg:p-10">
        {/* Header Section */}
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 pb-8 border-b transition-colors ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div>
            <h1 className={`text-lg sm:text-xl mb-2 transition-colors ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Hello 👋,</h1>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 transition-colors ${darkMode ? "text-white" : "text-gray-900"}`}>
              Jatin Tekam
            </h1>
            <p className={`text-sm sm:text-base transition-colors ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              tekamjatin@gmail.com
            </p>
          </div>
          <button className={`px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl`}>
            Logout
          </button>
        </div>

        {/* Templates Section */}
        <div>
          <div className="mb-8"> 
            <h2 className={`text-2xl sm:text-3xl font-bold transition-colors ${darkMode ? "text-white" : "text-gray-900"}`}>My Templates</h2>
            <p className={`text-sm mt-2 transition-colors ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Manage and organize your code templates</p>
          </div>

          <div className="flex flex-col gap-4 sm:gap-5">
          <NavLink to="/templateinfo"
            className={`group w-full rounded-xl overflow-hidden p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-8 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
              darkMode 
                ? "bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600 hover:shadow-lg hover:shadow-red-500/10" 
                : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl"
            }`}
          >
            <div className="flex-shrink-0">
              <figure className="w-40 sm:w-48 md:w-56 rounded-xl overflow-hidden shadow-lg">
                <img src={codeImg} alt="Template" className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
              </figure>
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h3 className={`text-lg sm:text-xl font-bold mb-3 transition-colors group-hover:text-red-500 ${darkMode ? "text-white" : "text-gray-900"}`}>Java Configuration File</h3>
                <div className="space-y-2">
                  <p className={`text-sm transition-colors ${darkMode ? "text-gray-400" : "text-gray-600"}`}><span className="font-semibold">Created By:</span> Jatin Tekam</p>
                  <p className={`text-sm transition-colors ${darkMode ? "text-gray-400" : "text-gray-600"}`}><span className="font-semibold">Total Files:</span> 0</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                  darkMode 
                    ? "bg-red-500/20 text-red-300" 
                    : "bg-red-100 text-red-700"
                }`}>View Details</span>
              </div>
            </div>
          </NavLink>

        <NavLink to="/templateinfo"
            className={`group w-full rounded-xl overflow-hidden p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-8 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
              darkMode 
                ? "bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600 hover:shadow-lg hover:shadow-red-500/10" 
                : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl"
            }`}
          >
            <div className="flex-shrink-0">
              <figure className="w-40 sm:w-48 md:w-56 rounded-xl overflow-hidden shadow-lg">
                <img src={codeImg} alt="Template" className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
              </figure>
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h3 className={`text-lg sm:text-xl font-bold mb-3 transition-colors group-hover:text-red-500 ${darkMode ? "text-white" : "text-gray-900"}`}>Java Configuration File</h3>
                <div className="space-y-2">
                  <p className={`text-sm transition-colors ${darkMode ? "text-gray-400" : "text-gray-600"}`}><span className="font-semibold">Created By:</span> Jatin Tekam</p>
                  <p className={`text-sm transition-colors ${darkMode ? "text-gray-400" : "text-gray-600"}`}><span className="font-semibold">Total Files:</span> 0</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                  darkMode 
                    ? "bg-red-500/20 text-red-300" 
                    : "bg-red-100 text-red-700"
                }`}>View Details</span>
              </div>
            </div>
          </NavLink>

        </div>
        </div>
      </div>
    </section>
  );
};
