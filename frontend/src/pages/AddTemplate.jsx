import React, { useState, useContext } from "react";
import { DarkMode } from "../context/DarkMode";
import { FiArrowLeft, FiPlus, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { addTemplate } from "../services/user/user";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const AddTemplate = () => {
  const [darkMode] = useContext(DarkMode);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    language: "",
    codeFiles: [
      {
        name: "",
        extension: "js",
        content: "",
      },
    ],
  });

  const languages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "PHP",
    "Ruby",
    "Go",
    "Rust",
    "HTML",
    "CSS",
    "SQL",
  ];

  const extensionMap = {
    JavaScript: "js",
    TypeScript: "ts",
    Python: "py",
    Java: "java",
    "C++": "cpp",
    "C#": "cs",
    PHP: "php",
    Ruby: "rb",
    Go: "go",
    Rust: "rs",
    HTML: "html",
    CSS: "css",
    SQL: "sql",
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addTemplate,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      codeFiles: prev.codeFiles.map((file, i) =>
        i === index ? { ...file, [field]: value } : file,
      ),
    }));
  };

  const addFile = () => {
    setFormData((prev) => ({
      ...prev,
      codeFiles: [
        ...prev.codeFiles,
        {
          name: "",
          extension: extensionMap[formData.language] || "txt",
          content: "",
        },
      ],
    }));
  };

  const removeFile = (index) => {
    if (formData.codeFiles.length === 1) {
      toast.error("You must have at least one file");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      codeFiles: prev.codeFiles.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    // Validation
    if (!formData.name.trim()) {
      toast.error("Template name is required");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Template description is required");
      return;
    }

    const invalidFiles = formData.codeFiles.some(
      (file) => !file.name.trim() || !file.content.trim(),
    );

    if (invalidFiles) {
      toast.error("All files must have a name and code content");
      return;
    }

    try {
      await mutateAsync(formData);
      toast.success("Template created successfully!");
      setFormData({
        name: "",
        description: "",
        language: "",
        codeFiles: [
          {
            name: "",
            extension: "js",
            content: "",
          },
        ],
      });
    } catch (error) {
      toast.error("Failed to create template");
    }
  };

  return (
    <div
      className={`w-full min-h-screen ${darkMode ? "bg-gray-950" : "bg-gray-50"} transition-colors duration-200`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1
            className={`text-3xl sm:text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Create New Template
          </h1>
          <p
            className={`text-sm sm:text-base ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Share your code snippets and templates with the community
          </p>
        </div>

        {/* Error/Success Messages
        {submitError && (
          <div className={`mb-6 p-4 rounded-lg text-sm sm:text-base ${
            darkMode
              ? 'bg-red-900 text-red-200 border border-red-700'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {submitError}
          </div>
        )}

        {submitSuccess && (
          <div className={`mb-6 p-4 rounded-lg text-sm sm:text-base ${
            darkMode
              ? 'bg-green-900 text-green-200 border border-green-700'
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            ✓ Template created successfully!
          </div>
        )} */}

        <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
          {/* Template Name */}
          <div>
            <label
              className={`block text-sm sm:text-base font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              Template Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., React Hook Setup"
              className={`w-full px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base transition-all duration-200 ${
                darkMode
                  ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              } focus:outline-none`}
            />
          </div>

          {/* Description */}
          <div>
            <label
              className={`block text-sm sm:text-base font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe what this template does..."
              rows="4"
              className={`w-full px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base transition-all duration-200 resize-none ${
                darkMode
                  ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              } focus:outline-none`}
            />
          </div>

          {/* Language Selection */}
          <div>
            <label
              className={`block text-sm sm:text-base font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              Primary Language *
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base transition-all duration-200 ${
                darkMode
                  ? "bg-gray-800 border border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  : "bg-white border border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              } focus:outline-none`}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Files Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label
                className={`text-sm sm:text-base font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Code Files *
              </label>
              <button
                type="button"
                onClick={addFile}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                  darkMode
                    ? "bg-gray-800 text-blue-400 border border-gray-700 hover:bg-gray-700"
                    : "bg-gray-100 text-blue-600 border border-gray-300 hover:bg-gray-200"
                }`}
              >
                <FiPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Add File</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {formData.codeFiles.map((file, index) => (
                <div
                  key={index}
                  className={`rounded-lg border p-4 sm:p-6 transition-all duration-200 ${
                    darkMode
                      ? "border-gray-700 bg-gray-900"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {/* File Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3
                        className={`text-sm sm:text-base font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                      >
                        File {index + 1}
                      </h3>
                    </div>
                    {formData.codeFiles.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          darkMode
                            ? "text-red-400 hover:bg-gray-800"
                            : "text-red-600 hover:bg-red-50"
                        }`}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* File Name and Extension */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                    <div className="sm:col-span-2">
                      <label
                        className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        File Name *
                      </label>
                      <input
                        type="text"
                        value={file.name}
                        onChange={(e) =>
                          handleFileChange(index, "name", e.target.value)
                        }
                        placeholder="e.g., index.js"
                        className={`w-full px-3 py-2 rounded-lg text-xs sm:text-sm transition-all duration-200 ${
                          darkMode
                            ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        } focus:outline-none`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Extension
                      </label>
                      <input
                        name="extension"
                        type="text"
                        value={file.extension.toLocaleLowerCase()}
                        onChange={(e) =>
                          handleFileChange(index, "extension", e.target.value)
                        }
                        placeholder="js"
                        className={`w-full px-3 py-2 rounded-lg text-xs sm:text-sm transition-all duration-200 ${
                          darkMode
                            ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        } focus:outline-none`}
                      />
                    </div>
                  </div>

                  {/* Code Content */}
                  <div>
                    <label
                      className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Code Content *
                    </label>
                    <textarea
                      value={file.content}
                      onChange={(e) =>
                        handleFileChange(index, "content", e.target.value)
                      }
                      placeholder="Paste your code here..."
                      rows="10"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-mono text-xs sm:text-sm transition-all duration-200 resize-none ${
                        darkMode
                          ? "bg-gray-800 border border-gray-700 text-gray-300 placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          : "bg-gray-50 border border-gray-300 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      } focus:outline-none`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-8 border-t"
            style={{ borderTopColor: darkMode ? "#374151" : "#e5e7eb" }}
          >
            <button
              type="submit"
              className={`flex-1 px-6 py-3 rounded-lg font-semibold cursor-pointer text-sm sm:text-base transition-all duration-200 ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isPending ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                "Create Template"
              )}
            </button>
            <button
              type="button"
              onClick={()=>navigate(-1)}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold cursor-pointer text-sm sm:text-base transition-all duration-200 ${
                darkMode
                  ? "border border-gray-700 text-gray-300 hover:bg-gray-800"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTemplate;
