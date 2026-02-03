import React, { useContext, useEffect, useState } from "react";
import { CiBookmark, CiFolderOn } from "react-icons/ci";
import { FiEdit2, FiCheck, FiX, FiTrash2 } from "react-icons/fi";
import codeImg from "../utils/images/codeImg.jpg";
import { DarkMode } from "../context/DarkMode";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../services/auth/store";

export const Profile = () => {
  const [darkMode] = useContext(DarkMode);

  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);
  const codeSnippests = useAuth((state) => state.snippests);
  const codes = useAuth((state) => state.codes);

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [sortBy, setSortBy] = useState("newest");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    console.log("User's code snippets:", codes);
    setEditData({
      name: user?.name || "",
      email: user?.email || "",
    });
  }, [user]);

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = () => {
    if (editData.name.trim() && editData.email.trim()) {
      // Call API to update user
      console.log("Updating user:", editData);
      setIsEditMode(false);
    }
  };

  const handleDeleteTemplate = (templateId) => {
    console.log("Deleting template:", templateId);
    setDeleteConfirm(null);
  };

  const sortedTemplates = [...(codeSnippests || [])].sort((a, b) => {
    if (sortBy === "newest") return b.id - a.id;
    if (sortBy === "oldest") return a.id - b.id;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <section
      className={`w-full min-h-screen transition-colors duration-300 ${darkMode ? "bg-gradient-to-br from-black via-gray-900 to-black" : "bg-gradient-to-br from-white via-gray-50 to-white"}`}
    >
      <div className="w-full md:w-[85%] lg:w-[70%] h-auto m-auto p-4 sm:p-6 md:p-8 lg:p-10">
        {/* Header Section */}
        <div
          className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 pb-8 border-b transition-colors ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          {isEditMode ? (
            <div className="flex-grow w-full">
              <h1
                className={`text-lg sm:text-xl mb-4 transition-colors ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Edit Profile
              </h1>
              <div className="space-y-4">
                <div>
                  <label
                    className={`text-sm font-semibold block mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleEditChange("name", e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      darkMode
                        ? "bg-gray-800 border-gray-700 text-white focus:border-red-500"
                        : "bg-white border-gray-300 text-black focus:border-red-500"
                    } focus:outline-none focus:ring-2 focus:ring-red-500/20`}
                  />
                </div>
                <div>
                  <label
                    className={`text-sm font-semibold block mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleEditChange("email", e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      darkMode
                        ? "bg-gray-800 border-gray-700 text-white focus:border-red-500"
                        : "bg-white border-gray-300 text-black focus:border-red-500"
                    } focus:outline-none focus:ring-2 focus:ring-red-500/20`}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h1
                className={`text-lg sm:text-xl mb-2 transition-colors ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Hello 👋,
              </h1>
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 transition-colors ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                {user?.name || "User"}
              </h1>
              <p
                className={`text-sm sm:text-base transition-colors ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                {user?.email || "No Email Provided"}
              </p>
            </div>
          )}

          <div className="flex gap-3 flex-shrink-0">
            {isEditMode ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  className={`p-3 rounded-lg transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center gap-2 font-semibold ${
                    darkMode
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  <FiCheck className="w-5 h-5" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => {
                    setIsEditMode(false);
                    setEditData({
                      name: user?.name || "",
                      email: user?.email || "",
                    });
                  }}
                  className={`p-3 rounded-lg transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center gap-2 font-semibold ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-300 hover:bg-gray-400 text-black"
                  }`}
                >
                  <FiX className="w-5 h-5" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditMode(true)}
                  className={`px-6 sm:px-8 py-3 cursor-pointer rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl`}
                >
                  <FiEdit2 className="w-4 h-4" />
                  Edit Profile
                </button>
                <button
                  className={`px-6 sm:px-8 py-3 cursor-pointer rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl`}
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Templates Section */}
        <div>
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2
                className={`text-2xl sm:text-3xl font-bold transition-colors ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                My Templates
              </h2>
              <p
                className={`text-sm mt-2 transition-colors ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Manage and organize your code templates (
                {codeSnippests?.length || 0})
              </p>
            </div>

            {/* Sort Dropdown */}
            {(codeSnippests?.length || 0) > 0 && (
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-black"
                } focus:outline-none focus:ring-2 focus:ring-red-500/20`}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A-Z)</option>
              </select>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:gap-5">
            {sortedTemplates.length > 0 ? (
              sortedTemplates.map((snippests) => {
                return (
                  <div
                    key={snippests.id}
                    className={`group w-full rounded-xl overflow-hidden p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-8 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                      darkMode
                        ? "bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-red-600 hover:shadow-lg"
                        : "bg-white border border-gray-200 hover:border-red-500 hover:shadow-xl"
                    }`}
                  >
                    <NavLink
                      to="/templateinfo"
                      className="flex-1 flex flex-col sm:flex-row gap-4 sm:gap-8"
                    >
                      <div className="flex-shrink-0">
                        <figure className="w-40 sm:w-48 md:w-56 rounded-xl overflow-hidden shadow-lg">
                          <img
                            src={codeImg}
                            alt="Template"
                            className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </figure>
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h3
                            className={`text-lg sm:text-xl font-bold mb-3 transition-colors group-hover:text-red-500 ${darkMode ? "text-white" : "text-gray-900"}`}
                          >
                            {snippests.name}
                          </h3>
                          <h4
                            className={`text-md mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}
                          >
                            {snippests.description}
                          </h4>
                          <div className="space-y-2">
                            <p
                              className={`text-sm transition-colors ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                            >
                              <span className="font-semibold">Created By:</span>{" "}
                              {user?.name || user?.email}
                            </p>
                            <p
                              className={`text-sm transition-colors flex items-center gap-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                            >
                              <CiFolderOn className="w-4 h-4" />
                              <span className="font-semibold">
                                Total Files: {codes.length}
                              </span>
                             
                            </p>
                          </div>
                        </div>
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

                    {/* Delete Button */}
                    <div className="flex items-start justify-end flex-shrink-0">
                      {deleteConfirm === snippests.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDeleteTemplate(snippests.id)}
                            className="px-3 py-2 rounded-lg bg-red-600 text-white font-semibold text-xs hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className={`px-3 py-2 rounded-lg font-semibold text-xs transition ${
                              darkMode
                                ? "bg-gray-700 text-white hover:bg-gray-600"
                                : "bg-gray-300 text-black hover:bg-gray-400"
                            }`}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(snippests.id)}
                          className={`text-2xl sm:text-3xl transition-all duration-300 transform hover:scale-125 ${
                            darkMode
                              ? "text-red-400 hover:text-red-500"
                              : "text-red-400 hover:text-red-600"
                          }`}
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                className={`text-center w-full py-16 rounded-xl border-2 border-dashed transition-colors ${
                  darkMode
                    ? "border-gray-700 bg-gray-800/50"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <p
                  className={`text-base sm:text-lg transition-colors ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  You have no templates yet. Start by creating a new template!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
