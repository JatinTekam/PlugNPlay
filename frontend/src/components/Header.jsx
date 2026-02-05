import { FaGithub } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { MdSunny } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { FiSearch, FiPlus, FiChevronDown, FiLogOut } from "react-icons/fi";
import { useContext, useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DarkMode } from "../context/DarkMode";
import useAuth from "../services/auth/store";

function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const profileRef = useRef(null);

  const [darkMode, setDarkMode] = useContext(DarkMode);

  const checkLoginStatus = useAuth((state) => state.checkLogin);
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);

  const navigate=useNavigate();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search for:", searchQuery);
    // Implement search functionality
  };

  return (
    <div className={`w-full h-16   sm:h-20 pt-2 sm:pt-4`}>
      <nav
        className={`backdrop-blur-lg fixed top-1 left-1/2 -translate-x-1/2 z-3 h-10 sm:h-20 transition-all duration-300 ${darkMode ? "" : ""} px-4 sm:px-6 md:px-8 py-2 sm:py-3 ${darkMode ? "text-white" : "text-black"} flex justify-between items-center border-b ${darkMode ? "border-white/10" : "border-black/10"}
        w-full sm:w-[95%] md:w-[90%] lg:w-[85%] 2xl:w-[75%] max-w-7xl rounded-none sm:rounded-none md:rounded-b-xl
      `}
      >
        <h1 className="text-lg sm:text-2xl font-semibold cursor-pointer flex-shrink-0">
          <NavLink to="/">Plug&Play</NavLink>
        </h1>
        <div className="hidden md:flex items-center justify-center gap-3 sm:gap-4 text-[#a1a1a1]">
          <button
            className={`text-lg sm:text-xl pt-1 cursor-pointer transition hover:scale-110 ${darkMode ? "text-white" : "text-black"}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <MdSunny /> : <GoSun />}
          </button>


          {checkLoginStatus() ? (
            <div className="flex gap-3 items-center">
              <NavLink
                to="/templates"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full transition border ${
                    darkMode
                      ? "border-white/20 text-white hover:bg-white/5"
                      : "border-black/10 text-black hover:bg-black/5"
                  } ${isActive ? "bg-white/10" : ""}`
                }
              >
                <FiSearch className="w-4 h-4" />
                <span>Find</span>
              </NavLink>

              <NavLink
                to="/addtemplate"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full transition border ${
                    darkMode
                      ? "border-white/10 text-white hover:bg-white/5"
                      : "border-black/10 text-black hover:bg-black/5"
                  } ${isActive ? "bg-blue-600 text-white" : ""}`
                }
              >
                <FiPlus className="w-4 h-4" />
                <span>Add</span>
              </NavLink>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className={`flex items-center gap-2 cursor-pointer text-sm font-medium px-3 py-1.5 rounded-full transition border ${
                    darkMode
                      ? "border-white/20 text-white hover:bg-white/5"
                      : "border-black/10 text-black hover:bg-black/5"
                  } ${profileDropdown ? "bg-white/10" : ""}`}
                >
                  <span className="truncate max-w-[100px]">
                    {user?.name || user?.email || "Profile"}
                  </span>
                  <FiChevronDown
                    className={`w-4 h-4 transition-transform ${
                      profileDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {profileDropdown && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl transition-all duration-200 z-50 ${
                      darkMode
                        ? "bg-gray-900 border border-gray-700"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <NavLink
                      to="/profile"
                      className={`block px-4 py-3 text-sm font-medium transition rounded-t-xl ${
                        darkMode
                          ? "text-white hover:bg-gray-800"
                          : "text-black hover:bg-gray-100"
                      }`}
                      onClick={() => setProfileDropdown(false)}
                    >
                      👤 View Profile
                    </NavLink>
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdown(false);
                        navigate("/");
                        
                      }}
                      className={`w-full cursor-pointer text-left px-4 py-3 text-sm font-medium transition rounded-b-xl border-t flex items-center gap-2 ${
                        darkMode
                          ? "text-red-400 hover:bg-gray-800 border-gray-700"
                          : "text-red-600 hover:bg-gray-100 border-gray-200"
                      }`}
                    >
                      <FiLogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <NavLink
                to="/signup"
                className={`text-sm sm:text-base px-3 py-1.5 rounded-full font-medium transition border ${
                  darkMode
                    ? "border-white/20 text-white hover:bg-blue-600/20"
                    : "border-black/10 text-black hover:bg-blue-100"
                } hover:scale-105`}
              >
                Sign up
              </NavLink>
              <NavLink
                to="/login"
                className={`text-sm sm:text-base px-3 py-1.5 rounded-full font-medium transition border ${
                  darkMode
                    ? "border-blue-500/50 text-blue-400 hover:bg-blue-600/20"
                    : "border-blue-500/50 text-blue-600 hover:bg-blue-100"
                } hover:scale-105 bg-blue-600/10`}
              >
                Log in
              </NavLink>
            </>
          )}

          {/* GitHub Link */}
          <a
            href="https://github.com/JatinTekam/PlugNPlay"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-lg sm:text-xl p-2 rounded-full transition hover:scale-110 cursor-pointer ${
              darkMode ? "hover:bg-gray-800 text-white" : "hover:bg-gray-100"
            }`}
          >
            <FaGithub className={`w-5 h-5 ${darkMode ? "text-white" : "text-black"}`} />
          </a>
        </div>
        <div className="md:hidden flex items-center gap-2 sm:gap-4">
          <button
            className={`text-lg sm:text-xl pt-1 cursor-pointer transition hover:scale-110 ${darkMode ? "text-white" : "text-black"}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <MdSunny /> : <GoSun />}
          </button>
          {mobileMenu ? (
            <IoMdClose
              className="w-6 sm:w-8 cursor-pointer transition hover:scale-110"
              onClick={() => setMobileMenu(!mobileMenu)}
            />
          ) : (
            <CiMenuBurger
              className="w-6 sm:w-8 cursor-pointer transition hover:scale-110"
              onClick={() => setMobileMenu(!mobileMenu)}
            />
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`mobile-sideMenu w-full min-h-screen pt-16 sm:pt-20 z-40 flex flex-col gap-1 text-center fixed top-0 left-0 transition-all duration-300 ease-in-out ${mobileMenu ? "block " : "hidden opacity-0 pointer-events-none"} ${darkMode ? "bg-gradient-to-br from-black via-gray-900 to-black" : "bg-gradient-to-br from-white via-gray-50 to-white"} backdrop-blur-sm border-t ${darkMode ? "border-white/10" : "border-gray-200"}`}
      >
        {checkLoginStatus() ? (
          <>
            <NavLink
              to="/profile"
              className={`py-4 px-4 text-base font-medium transition hover:bg-blue-500/10 border-b ${darkMode ? "text-white border-white/10 hover:text-blue-400" : "text-black border-gray-200 hover:text-blue-600"}`}
              onClick={() => setMobileMenu(false)}
            >
              👤 Profile
            </NavLink>
            <NavLink
              to="/addtemplate"
              className={`py-4 px-4 text-base font-medium transition hover:bg-blue-500/10 border-b ${darkMode ? "text-white border-white/10 hover:text-blue-400" : "text-black border-gray-200 hover:text-blue-600"}`}
              onClick={() => setMobileMenu(false)}
            >
              ➕ Add Template
            </NavLink>
            <NavLink
              to="/templates"
              className={`py-4 px-4 text-base font-medium transition hover:bg-blue-500/10 border-b ${darkMode ? "text-white border-white/10 hover:text-blue-400" : "text-black border-gray-200 hover:text-blue-600"}`}
              onClick={() => setMobileMenu(false)}
            >
              🔍 Find Templates
            </NavLink>
            <button
              onClick={() => {
                logout();
                setMobileMenu(false);
              }}
              className={`py-4 px-4 text-base font-medium transition hover:bg-red-500/10 border-b ${darkMode ? "text-red-400 border-white/10 hover:text-red-300" : "text-red-600 border-gray-200 hover:text-red-700"}`}
            >
              🚪 Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/signup"
              className={`py-4 px-4 text-base font-medium transition hover:bg-blue-500/10 border-b ${darkMode ? "text-white border-white/10 hover:text-blue-400" : "text-black border-gray-200 hover:text-blue-600"}`}
              onClick={() => setMobileMenu(false)}
            >
              Sign up
            </NavLink>
            <NavLink
              to="/login"
              className={`py-4 px-4 text-base font-medium transition hover:bg-blue-500/10 border-b ${darkMode ? "text-white border-white/10 hover:text-blue-400" : "text-black border-gray-200 hover:text-blue-600"}`}
              onClick={() => setMobileMenu(false)}
            >
              Log in
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
