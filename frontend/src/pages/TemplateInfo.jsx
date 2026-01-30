import React, { useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { DarkMode } from '../context/DarkMode'
import { FiCopy, FiDownload } from 'react-icons/fi'

const TemplateInfo = () => {
  const { state } = useLocation()
  const [darkMode] = useContext(DarkMode)
  const [copiedId, setCopiedId] = useState(null)

  const template = state?.template || {
    id: 1,
    name: 'Java Configuration Template',
    description: 'A complete Java project configuration template with Spring Boot setup',
    language: 'Java',
    author: 'Jatin Tekam',
    createdAt: '2024-01-15',
    downloads: 245,
    files: [
      {
        id: 1,
        name: 'application.properties',
        extension: 'properties',
        code: `spring.application.name=my-app
spring.datasource.url=jdbc:mysql://localhost:3306/db_name
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8081`
      },
      {
        id: 2,
        name: 'pom.xml',
        extension: 'xml',
        code: `<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0-SNAPSHOT</version>
  
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
      <version>3.0.0</version>
    </dependency>
  </dependencies>
</project>`
      }
    ]
  }

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className={`w-full min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header Section */}
        <div className={`mb-8 sm:mb-12 pb-8 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {template.name}
          </h1>
          <p className={`text-sm sm:text-base mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {template.description}
          </p>
          
          <div className="flex flex-wrap gap-4 items-center text-xs sm:text-sm mt-6">
            <div className={`px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
              {template.language}
            </div>
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              By <strong>{template.author}</strong>
            </span>
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {new Date(template.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
            <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <FiDownload className="w-4 h-4" />
              {template.downloads} downloads
            </span>
          </div>
        </div>

        {/* Files Section */}
        <div>
          <h2 className={`text-xl sm:text-2xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Files ({template.files.length})
          </h2>
          
          <div className="space-y-4 sm:space-y-6">
            {template.files.map((file) => (
              <div
                key={file.id}
                className={`rounded-lg overflow-hidden border transition-all duration-200 ${
                  darkMode 
                    ? 'border-gray-700 bg-gray-900 hover:border-gray-600' 
                    : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm hover:shadow-md'
                }`}
              >
                {/* File Header */}
                <div className={`px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}>
                  <div className="flex-1">
                    <p className={`font-mono text-sm sm:text-base font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {file.name}
                    </p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {file.extension.toUpperCase()}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(file.code, file.id)}
                    className={`ml-2 sm:ml-4 px-3 sm:px-4 py-2 rounded-md flex items-center gap-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
                      copiedId === file.id
                        ? darkMode
                          ? 'bg-green-900 text-green-200'
                          : 'bg-green-100 text-green-700'
                        : darkMode
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <FiCopy className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {copiedId === file.id ? 'Copied!' : 'Copy'}
                    </span>
                    <span className="sm:hidden">
                      {copiedId === file.id ? '✓' : 'Copy'}
                    </span>
                  </button>
                </div>

                {/* Code Block */}
                <div className={`p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto ${
                  darkMode ? 'bg-gray-950' : 'bg-gray-50'
                }`}>
                  <pre className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-wrap word-break`}>
                    <code>{file.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button className={`flex-1 px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 ${
            darkMode
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}>
            Download Template
          </button>
          <button className={`flex-1 px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 ${
            darkMode
              ? 'border border-gray-700 text-gray-300 hover:bg-gray-800'
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}>
            Fork Template
          </button>
        </div>
      </div>
    </div>
  )
}

export default TemplateInfo
