# Plug & Play - Project Folder Structure

## 📁 Complete Project Structure

```
frontend/
├── public/                          # Static files
│   └── vite.svg
├── src/
│   ├── assets/                      # Images, fonts, and other static assets
│   │   └── images/
│   ├── components/                  # React components
│   │   ├── common/                  # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Modal.jsx
│   │   ├── layout/                  # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── AppLayout.jsx
│   │   ├── shared-theme/            # Theme configuration
│   │   │   ├── AppTheme.jsx
│   │   │   └── ColorModeSelect.jsx
│   │   ├── BasicCard.jsx
│   │   ├── FeaturedCards.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Instruction.jsx
│   │   ├── LanguageSupport.jsx
│   │   ├── PlugAndPlayCom.jsx
│   │   ├── Shadow.jsx
│   │   ├── VSCodeIn.jsx
│   │   └── VSCodeWindow.jsx
│   ├── context/                     # React Context API (State management)
│   │   └── DarkMode.jsx
│   ├── hooks/                       # Custom React hooks
│   │   ├── useFetch.js
│   │   ├── useDarkMode.js
│   │   └── useLocalStorage.js
│   ├── pages/                       # Page components (Route pages)
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   ├── Profile.jsx
│   │   ├── Templates.jsx
│   │   └── TemplateInfo.jsx
│   ├── services/                    # API service functions
│   │   ├── api.js
│   │   ├── templateService.js
│   │   ├── authService.js
│   │   └── userService.js
│   ├── utils/                       # Utility functions and constants
│   │   ├── utils.js
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   └── images/
│   ├── constants/                   # Global constants
│   │   ├── routes.js
│   │   ├── apiEndpoints.js
│   │   └── messages.js
│   ├── config/                      # Configuration files
│   │   ├── axios.config.js
│   │   └── app.config.js
│   ├── types/                       # TypeScript types/interfaces (if using TS)
│   │   ├── template.types.js
│   │   ├── user.types.js
│   │   └── common.types.js
│   ├── styles/                      # Global styles
│   │   ├── variables.css
│   │   └── globals.css
│   ├── Api/                         # Old API folder (consider moving to services/)
│   │   └── api.js
│   ├── App.jsx                      # Main App component
│   ├── App.css                      # App styles
│   ├── index.css                    # Global CSS
│   └── main.jsx                     # Application entry point
├── index.html                       # HTML template
├── package.json                     # Project dependencies
├── vite.config.js                   # Vite configuration
├── eslint.config.js                 # ESLint configuration
├── tailwind.config.js               # Tailwind CSS configuration (if used)
├── README.md                        # Project documentation
├── .env.example                     # Environment variables example
├── .gitignore                       # Git ignore rules
└── PROJECT_STRUCTURE.md             # This file
```
