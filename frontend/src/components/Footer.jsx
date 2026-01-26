import { useContext } from "react";
import { DarkMode } from "../context/DarkMode";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  const [darkMode] = useContext(DarkMode);

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`w-full ${darkMode ? "bg-gradient-to-br from-black via-gray-900 to-black" : "bg-gradient-to-br from-white via-gray-50 to-white"} transition-colors duration-300`}>
      <div className="border-t border-gray-300 dark:border-gray-700"></div>
      
      <div className="w-full px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main content grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
            {/* Brand Section */}
            <div className="flex flex-col gap-3">
              <h3 className={`text-lg sm:text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                Plug & Play
              </h3>
              <p className={`text-sm sm:text-base ${darkMode ? "text-gray-400" : "text-gray-600"} leading-relaxed`}>
                Building the future of code templates with powerful AI insights.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-3">
              <h4 className={`text-base sm:text-lg font-semibold ${darkMode ? "text-white" : "text-black"}`}>
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className={`text-sm sm:text-base transition-colors hover:text-blue-500 ${darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-600"}`}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="/templates" className={`text-sm sm:text-base transition-colors hover:text-blue-500 ${darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-600"}`}>
                    Templates
                  </a>
                </li>
                <li>
                  <a href="/profile" className={`text-sm sm:text-base transition-colors hover:text-blue-500 ${darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-600"}`}>
                    Profile
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-3">
              <h4 className={`text-base sm:text-lg font-semibold ${darkMode ? "text-white" : "text-black"}`}>
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className={`text-sm sm:text-base transition-colors hover:text-blue-500 ${darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-600"}`}>
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-sm sm:text-base transition-colors hover:text-blue-500 ${darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-600"}`}>
                    API Docs
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-sm sm:text-base transition-colors hover:text-blue-500 ${darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-600"}`}>
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-3">
              <h4 className={`text-base sm:text-lg font-semibold ${darkMode ? "text-white" : "text-black"}`}>
                Follow Us
              </h4>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="#"
                  className={`text-xl sm:text-2xl transition-colors duration-300 hover:text-blue-500 ${darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-600"}`}
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="#"
                  className={`text-xl sm:text-2xl transition-colors duration-300 hover:text-blue-500 ${darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-600"}`}
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="#"
                  className={`text-xl sm:text-2xl transition-colors duration-300 hover:text-blue-500 ${darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-600"}`}
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-300 dark:border-gray-700 pt-6 sm:pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <p className={`text-xs sm:text-sm ${darkMode ? "text-gray-500" : "text-gray-600"} text-center sm:text-left`}>
                &copy; {currentYear} Plug & Play. All rights reserved.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end text-xs sm:text-sm">
                <a href="#" className={`transition-colors hover:text-blue-500 ${darkMode ? "text-gray-500 hover:text-blue-400" : "text-gray-600"}`}>
                  Privacy Policy
                </a>
                <a href="#" className={`transition-colors hover:text-blue-500 ${darkMode ? "text-gray-500 hover:text-blue-400" : "text-gray-600"}`}>
                  Terms of Service
                </a>
                <a href="#" className={`transition-colors hover:text-blue-500 ${darkMode ? "text-gray-500 hover:text-blue-400" : "text-gray-600"}`}>
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
