import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkMode } from "../context/DarkMode";
import { MdErrorOutline } from "react-icons/md";

const OAuthFailure = () => {
  const navigate = useNavigate();
  const [darkMode] = useContext(DarkMode);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className={`max-w-md w-full rounded-2xl p-6 shadow-lg text-center ${
          darkMode
            ? "bg-white/10 border border-white/20 text-white"
            : "bg-white border border-gray-200 text-gray-900"
        }`}
      >
        <MdErrorOutline className="mx-auto text-5xl mb-4 text-red-500" />

        <h1 className="text-2xl font-semibold mb-2">
          Authentication Failed
        </h1>

        <p className="text-sm opacity-80 mb-6">
          Something went wrong while signing you in with the provider.
          Please try again.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-lg cursor-pointer font-medium bg-blue-600 text-white hover:opacity-90"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/")}
            className={`px-5 py-2 rounded-lg cursor-pointer font-medium border ${
              darkMode
                ? "border-white/20 hover:bg-white/10"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OAuthFailure;

