import { useContext, useEffect, useState } from "react";
import { DarkMode } from "../context/DarkMode";
import codeImg from "../utils/images/codeImg.jpg";
import { CiBookmark, CiFolderOn } from "react-icons/ci";
import { FiArrowLeft } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../services/auth/store";

function Templates() {
  const [darkMode] = useContext(DarkMode);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [bookmarkedTemplates, setBookmarkedTemplates] = useState(new Set());

  const template = useAuth((state) => state.templates);
  const allTemplates = useAuth((state) => state.allTemplates);

  useEffect(() => {
    allTemplates();
  }, []);

  // Mock templates data
  // const mockTemplates = [
  //   {
  //     id: 1,
  //     name: "Java Configuration File",
  //     description: "Complete Java configuration setup with best practices",
  //     createdBy: "Jatin Tekam",
  //     category: "Java",
  //     files: 5,
  //   },
  //   {
  //     id: 2,
  //     name: "Node Express API",
  //     description: "Express.js API boilerplate with routing and middleware",
  //     createdBy: "Jatin Tekam",
  //     category: "Node",
  //     files: 8,
  //   },
  //   {
  //     id: 3,
  //     name: "Python Django Setup",
  //     description: "Django project structure with models and views",
  //     createdBy: "Developer",
  //     category: "Python",
  //     files: 6,
  //   },
  //   {
  //     id: 4,
  //     name: "TypeScript React App",
  //     description: "React + TypeScript starter with hooks and context",
  //     createdBy: "Jatin Tekam",
  //     category: "TypeScript",
  //     files: 12,
  //   },
  // ];

  const categories = [
    "All",
    "Java",
    "Node",
    "Python",
    "JavaScript",
    "TypeScript",
    "C++",
    ".Net",
    "Go",
    "Ruby",
    "PHP",
  ];

  const filteredTemplates = (template || []).filter((template) => {
    const matchesCategory =
      activeCategory === "All" || template.language === activeCategory;
    const matchesSearch = template.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleBookmark = (templateId) => {
    const newBookmarked = new Set(bookmarkedTemplates);
    if (newBookmarked.has(templateId)) {
      newBookmarked.delete(templateId);
    } else {
      newBookmarked.add(templateId);
    }
    setBookmarkedTemplates(newBookmarked);
  };

  return (
    <section
      className={`w-full min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-black via-gray-900 to-black"
          : "bg-gradient-to-br from-white via-gray-50 to-white"
      } px-4 sm:px-6 md:px-8 py-8 md:py-10`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`mb-6 p-2 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center gap-2 font-semibold ${
            darkMode
              ? "text-gray-400 hover:bg-gray-800 hover:text-white"
              : "text-gray-600 hover:bg-gray-200 hover:text-black"
          }`}
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Header Section */}
        <div className="mb-12">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 transition-colors ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Discover Templates
          </h1>
          <p
            className={`text-sm sm:text-base transition-colors ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Think. Build. Repeat. — Explore curated code templates for every
            project.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-10">
          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full h-11 mb-6 rounded-lg outline-none px-4 py-2 transition-all duration-300 ${
              darkMode
                ? "bg-gray-800 text-white border border-gray-700 focus:border-red-500"
                : "bg-white text-black border border-gray-300 focus:border-red-500"
            } shadow-md focus:shadow-lg`}
            placeholder="Search templates by name..."
          />

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full cursor-pointer font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category
                    ? darkMode
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-red-600 text-white shadow-lg"
                    : darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex flex-col gap-5">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <NavLink
                key={template.id}
                to={`/templateinfo/${template.id}`}
                className={`group w-full rounded-xl overflow-hidden p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-8 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                  darkMode
                    ? "bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-red-600 hover:shadow-2xl hover:shadow-red-500/10"
                    : "bg-white border border-gray-200 hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/20"
                }`}
              >
                {/* Image */}
                <div className="flex-shrink-0">
                  <figure className="w-full sm:w-48 md:w-56 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={codeImg}
                      alt={template.name}
                      className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </figure>
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3
                      className={`text-lg sm:text-xl font-bold mb-2 transition-colors group-hover:text-red-500 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {template.name}
                    </h3>
                    <p
                      className={`text-sm mb-4 transition-colors ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {template.description}
                    </p>
                    <p
                      className={`text-sm mb-2 transition-colors ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Category:- {template.language}
                    </p>
                    <div className="space-y-2">
                      <p
                        className={`text-sm transition-colors ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <span className="font-semibold">Created By:</span>{" "}
                        {template.username}
                      </p>
                        <span
                          className={`text-sm
                           ${darkMode ? "text-gray-400" : "text-gray-600"}
                          `}
                        >
                          Created At{": "}
                          {new Date(template?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      <p
                        className={`text-sm flex mt-2 items-center gap-1 transition-colors ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <CiFolderOn className="w-4 h-4" />
                        <span className="font-semibold">Total Files:</span>{" "}
                        {template.codeFiles.length}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-opacity-20 flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                        darkMode
                          ? "bg-red-500/20 text-red-300"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      View Details
                    </span>
                    
                  </div>
                </div>
              </NavLink>
            ))
          ) : (
            <div
              className={`text-center w-full py-16 rounded-xl border-2 border-dashed transition-colors ${
                darkMode
                  ? "border-gray-700 bg-gray-800/50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <p
                className={`text-base sm:text-lg transition-colors ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                No templates found. Try adjusting your search or filters!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Templates;
