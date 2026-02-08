import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { DarkMode } from "../context/DarkMode";
import { NavLink } from "react-router-dom";

const OAuthButton = () => {
  const [darkMode] = useContext(DarkMode);

  return (
    <div className="grid grid-cols-2 gap-3">
      <NavLink
      type="submit"
        to={`${import.meta.env.VITE_OAUTH_URL}/oauth2/authorization/google`}
        className={`py-2.5 px-4 cursor-pointer rounded-lg font-medium text-sm sm:text-base transition border flex items-center justify-center gap-2 hover:opacity-80 ${
          darkMode
            ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
            : "bg-gray-100 border-gray-300 text-black hover:bg-gray-200"
        }`}
      >
        <FcGoogle className="text-xl" />
        <span className="hidden sm:inline">Google</span>
      </NavLink>
      <NavLink
      type="submit"
        to={`${import.meta.env.VITE_OAUTH_URL}/oauth2/authorization/github`}
        className={`py-2.5 px-4 cursor-pointer rounded-lg font-medium text-sm sm:text-base transition border flex items-center justify-center gap-2 hover:opacity-80 ${
          darkMode
            ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
            : "bg-gray-100 border-gray-300 text-black hover:bg-gray-200"
        }`}
      >
        <RxGithubLogo className="text-xl" />
        <span className="hidden sm:inline">GitHub</span>
      </NavLink>
    </div>
  );
};

export default OAuthButton;
