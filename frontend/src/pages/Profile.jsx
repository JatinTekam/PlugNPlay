import React, { useContext } from "react";
import { CiBookmark } from "react-icons/ci";
import codeImg from "../utils/images/codeImg.jpg";
import { DarkMode } from "../context/DarkMode";
import { Link, NavLink } from "react-router-dom";

export const Profile = () => {

  const [darkMode]=useContext(DarkMode);

  return (
    <section className={`w-full h-screen ${darkMode ? "bg-black" : "bg-white"} `}>
      <div className="w-[70%] h-70 text-white m-auto p-4">
        <div className=" flex justify-around items-center">
          <div>
            <h1>Hello 👋,</h1>
            <h1 className="text-3xl">
              <i>Jatin Tekam</i>
            </h1>
            <h3 className="">
              <i>tekamjatin@gmail.com</i>
            </h3>
          </div>
          <div>
            <button className=" hover:cursor-pointer bg-red-500 p-2 rounded-md">
              Logout
            </button>
          </div>
        </div>
        <div className="w-[70%] h-70 m-auto mt-10 ">
          <div className="mb-5 text-2xl"> 
            <h1> My Template</h1>
          </div>


          <div className="flex flex-col gap-3">
          <NavLink to="/templateinfo"
            className={`w-full rounded-lg overflow-hidden p-1 flex gap-10 cursor-pointer border ${darkMode ? "border-white" : "shadow-xl"} `}
          >
            <div>
              <figure className="w-50 shadow-2xl">
                <img src={codeImg} alt="" className="rounded-xl" />
              </figure>
            </div>
            <div className={`code-info  ${darkMode ? "text-white" : ""}`}>
              <h2 className=" text-xl">Java Configuration File</h2>
              <p className=" text-sm">Created By:- Jatin Tekam</p>
              <p className=" text-sm">Total Files:- 0</p>
            </div>
          </NavLink>

        <NavLink to="/templateinfo"
            className={`w-full rounded-lg overflow-hidden p-1 flex gap-10 cursor-pointer border ${darkMode ? "border-white" : "shadow-xl"} `}
          >
            {/* <Link to="/templateinfo"> */}
            <div>
              <figure className="w-50 shadow-2xl">
                <img src={codeImg} alt="" className="rounded-xl" />
              </figure>
            </div>
            <div className={`code-info ${darkMode ? "text-white" : ""}`}>
              <h2 className=" text-xl">Java Configuration File</h2>
              <p className=" text-sm">Created By:- Jatin Tekam</p>
              <p className=" text-sm">Total Files:- 0</p>
            </div>
          </NavLink>

        </div>
        </div>
      </div>
    </section>
  );
};
