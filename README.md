# Plug & Play Frontend - Project Structure & Documentation

**Project Name:** PlugAndPlay  
**Project Type:** React + Vite Frontend Application  
**Version:** 1.0.0  
**Description:** Skip Setup. Start Building. - A template-based development platform designed to accelerate development with efficient code templates for modern projects.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Key Technologies & Dependencies](#key-technologies--dependencies)
3. [Project Structure](#project-structure)
4. [Folder Structure Details](#folder-structure-details)
5. [Pages Overview](#pages-overview)
6. [Components Overview](#components-overview)
7. [Services & API](#services--api)
8. [State Management & Context](#state-management--context)
9. [Configuration Files](#configuration-files)
10. [Scripts & Commands](#scripts--commands)

---


## 🎯  Project Overview

**Plug & Play** is a modern web application built with React and Vite that provides:

- 📚 **Pre-built Code Templates** - Ready-to-use templates for common development patterns
- 🎨 **Theme Support** - Dark and Light mode support throughout the application
- 🔐 **Authentication System** - User authentication and OAuth integration
- 👤 **User Profiles** - User dashboard and profile management
- 📱 **Responsive Design** - Mobile-first responsive design using Tailwind CSS
- ⚡ **Fast Development** - Powered by Vite for instant HMR (Hot Module Replacement)
- 🧩 **Component-based Architecture** - Modular and reusable component structure

---

## 🛠️ Key Technologies & Dependencies

### Core Framework
- **React** (^19.2.0) - UI library
- **React DOM** (^19.2.0) - DOM rendering
- **Vite** (^7.2.4) - Build tool and dev server
- **React Router DOM** (^7.10.1) - Client-side routing

### UI & Styling
- **Tailwind CSS** (^4.1.17) - Utility-first CSS framework
- **@tailwindcss/vite** (^4.1.17) - Vite plugin for Tailwind
- **Material-UI (MUI)** (^7.3.7) - Component library
  - @mui/material - Core components
  - @mui/icons-material - Icon library
- **@emotion/react** (^11.14.0) - CSS-in-JS library
- **@emotion/styled** (^11.14.1) - Styled components

### Code Editor
- **@monaco-editor/react** (^4.7.0) - Monaco editor integration for code display

### State Management & Data Fetching
- **Zustand** (^5.0.10) - Lightweight state management
- **@tanstack/react-query** (^5.90.19) - Server state management
- **@tanstack/react-query-devtools** (^5.91.2) - DevTools for React Query

### HTTP Client
- **Axios** (^1.13.2) - Promise-based HTTP client

### Notifications & Icons
- **react-hot-toast** (^2.6.0) - Toast notifications
- **react-icons** (^5.5.0) - Icon library collection

### Development Tools
- **ESLint** (^9.39.1) - Code linting
- **@vitejs/plugin-react** (^5.1.1) - React plugin for Vite
- **TypeScript Types** - React and React DOM type definitions

---

## 📁 Project Structure

```
frontend/
├── .env                          # Environment variables
├── .env.local                    # Local environment config (not tracked)
├── .git/                         # Git version control
├── .gitignore                    # Git ignore rules
├── node_modules/                 # Dependencies (not tracked)
├── package.json                  # Project dependencies
├── package-lock.json             # Locked dependency versions
├── index.html                    # HTML entry point
├── vite.config.js                # Vite configuration
├── eslint.config.js              # ESLint configuration
├── README.md                     # Project README
├── PROJECT_STRUCTURE.md          # This file - Project documentation
└── src/                          # Source code directory
    ├── main.jsx                  # React entry point
    ├── App.jsx                   # Root App component
    ├── App.css                   # App styles
    ├── index.css                 # Global styles
    ├── components/               # Reusable UI components
    ├── pages/                    # Page components
    ├── services/                 # API services
    ├── context/                  # React Context for global state
    └── utils/                    # Utility functions and constants
```

---

## 📂 Folder Structure Details

### 1. **Root Level Configuration Files**

#### `index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/src/utils/images/cropped_circle_image.png" />
    <title>Plug & Play - Skip Setup Start Building</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```
**Purpose:** Main HTML file. Entry point for the application.

#### `vite.config.js`
**Vite Configuration:**
- React plugin enabled for JSX support
- Tailwind CSS plugin integrated
- Development server configured to listen on `0.0.0.0`
- Strict file serving disabled for flexibility

#### `eslint.config.js`
**ESLint Configuration:**
- Recommended ESLint rules
- React Hooks plugin for hook best practices
- React Refresh plugin for Vite HMR
- Targets ES2020 and browser globals
- Ignores `dist/` directory

#### `package.json`
**Project Metadata:**
- Name: plugandplay
- Private: true (not published to npm)
- Type: ESM (ES modules)
- Contains all dependencies and dev dependencies listed above
- Scripts for dev, build, lint, and preview

#### `.env`
**Environment Variables:**
- Stores API endpoints and configuration
- Not tracked in git for security

---

### 2. **src/ Directory - Source Code**

#### `main.jsx`
**React Application Entry Point:**
- Initializes React 19 with Strict Mode
- Wraps app with providers:
  - `BrowserRouter` - Enables routing
  - `SetDarkMode` - Enables dark mode context
- Renders into `#root` DOM element

#### `App.jsx`
**Root Application Component:**
- Sets up theme context (dark/light mode)
- Initializes React Query with QueryClient
- Defines main routes using React Router
- Manages authentication state via Zustand
- Includes React Query DevTools for debugging
- Routes include:
  - Public pages: Home, Login, SignUp, Auth
  - Protected pages: Dashboard, Profile, Templates, etc.
  - OAuth flow pages: OAuthSuccess, OAuthFailure
  - Admin pages: AddTemplate

#### `App.css`
**Application-wide styles**

#### `index.css`
**Global styles and CSS reset**

---

### 3. **src/components/ - Reusable UI Components**

Reusable React components that are used across multiple pages.

| Component | Purpose |
|-----------|---------|
| **Header.jsx** | Navigation header with dark mode toggle, search, user menu, mobile responsive hamburger menu |
| **Footer.jsx** | Application footer |
| **HeroSection.jsx** | Landing page hero section with CTA buttons |
| **Dashboard.jsx** | Protected dashboard layout with route guarding |
| **AppLayout.jsx** | Main layout wrapper for authenticated pages |
| **BasicCard.jsx** | Reusable card component for displaying content |
| **FeaturedCards.jsx** | Featured templates/items display |
| **Loading.jsx** | Loading spinner/skeleton component |
| **OAuthButton.jsx** | OAuth authentication button (GitHub, etc.) |
| **PlugAndPlayCom.jsx** | Custom branding component |
| **Shadow.jsx** | Decorative shadow element |
| **VSCodeWindow.jsx** | VSCode-like window component for code display |
| **VSCodeIn.jsx** | VSCode integration component |
| **Instruction.jsx** | Instruction/guide display component |
| **LanguageSupport.jsx** | Language selection component |

#### **shared-theme/ Subfolder**

| Component | Purpose |
|-----------|---------|
| **AppTheme.jsx** | MUI theme configuration with dark/light modes |
| **ColorModeSelect.jsx** | Color mode switcher component |

---

### 4. **src/pages/ - Page Components**

Full-page components representing different routes in the application.

| Page | Route | Purpose |
|------|-------|---------|
| **Home.jsx** | `/` | Landing page with hero section and features |
| **Login.jsx** | `/login` | User login page |
| **SignUp.jsx** | `/signup` | User registration page |
| **Auth.jsx** | `/auth` | Protected authentication wrapper page |
| **Dashboard.jsx** | `/dashboard` | Protected user dashboard |
| **Profile.jsx** | `/profile` | User profile management page |
| **Templates.jsx** | `/templates` | Browse all available templates |
| **TemplateInfo.jsx** | `/templates/:id` | Individual template details page |
| **AddTemplate.jsx** | `/add-template` | Admin page to create new templates |
| **OAuthSuccess.jsx** | `/oauth-success` | OAuth callback success page |
| **OAuthFailure.jsx** | `/oauth-failure` | OAuth callback failure page |

---

### 5. **src/services/ - API Services**

API integration layer for backend communication using Axios.

#### **auth/ Subfolder**

##### `auth.js`
**Authentication API Service:**

Functions:
```javascript
- signUp(data)           // Register new user
- login(data)            // Authenticate user
- logout()               // End session
- oauthGithub()          // GitHub OAuth flow
- verifyToken()          // Validate authentication token
- refreshToken()         // Get new access token
```

**Base URL Configuration:**
```javascript
baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8081/api/v1/auth"
Headers: Content-Type: application/json
```

##### `store.js`
**Zustand Auth Store:**
- Manages global authentication state
- Stores: user info, auth token, login status
- Actions:
  - `login(user, token)` - Set authenticated user
  - `logout()` - Clear auth state
  - `checkLogin()` - Verify session
  - `updateUser(userData)` - Update user info

#### **user/ Subfolder**

##### `user.js`
**User API Service:**

Functions:
```javascript
- getUserProfile()       // Fetch user profile
- updateProfile(data)    // Update user information
- deleteAccount()        // Account deletion
- getUserTemplates()     // Get user's saved templates
```

---

### 6. **src/context/ - Global State Context**

React Context API for global state management.

#### **DarkMode.jsx**
**Dark Mode Context:**

```javascript
// Context creation
export const DarkMode = createContext()

// Provider component
export function SetDarkMode({ children })
  - Manages dark mode boolean state
  - Default: true (dark mode enabled)
  - Provides [darkMode, setDarkMode] to all child components
```

**Usage in components:**
```javascript
const [darkMode, setDarkMode] = useContext(DarkMode)
```

---

### 7. **src/utils/ - Utility Functions & Constants**

Helper functions and application data.

#### `utils.js`
**Utility Functions & Constants:**

Exports:
- **DemoCodes** - Array of code template examples
  - Mongoose schema examples
  - React patterns
  - API endpoints
  - Database queries

Functions:
- Text formatting utilities
- Data validation helpers
- Date/time formatters
- String manipulation functions

#### **images/ Subfolder**
Contains image assets:
- `cropped_circle_image.png` - App logo/icon
- `open-source.png` - Feature image
- `code.png` - Code template image
- `easy-installation.png` - Setup feature image
- Other UI assets

---

## 🔌 Pages Overview

### **Home Page** (`Home.jsx`)
- Landing page entry point
- Displays hero section with tagline: "Skip Setup. Start Building"
- Features showcase with featured cards
- Call-to-action buttons directing to templates or signup
- Language support display
- Plugin instructions
- Responsive design for all screen sizes

### **Authentication Pages**
- **Login.jsx** - User login form with email/password and OAuth options
- **SignUp.jsx** - User registration form with validation
- **Auth.jsx** - Protected auth wrapper for guarded routes
- **OAuthSuccess.jsx** - Handles successful OAuth callback
- **OAuthFailure.jsx** - Error handling for failed OAuth

### **Templates Pages**
- **Templates.jsx** - Grid/list view of all available templates
  - Filterable by language, framework, category
  - Search functionality
- **TemplateInfo.jsx** - Detailed template page with:
  - Full template code display
  - Copy to clipboard functionality
  - Documentation
  - Usage examples

### **User Pages**
- **Dashboard.jsx** - Protected user dashboard
  - Requires authentication
  - Navigation hub for authenticated users
- **Profile.jsx** - User profile management
  - Edit user information
  - View saved templates
  - Account settings

### **Admin Pages**
- **AddTemplate.jsx** - Create new templates (admin only)
  - Form for template submission
  - Code editor integration
  - Metadata and documentation

---

## 🧩 Components Overview

### **Layout Components**
- **Header** - Sticky navigation with theme toggle
- **Footer** - Application footer
- **AppLayout** - Main layout wrapper for pages

### **Feature Components**
- **HeroSection** - Landing page hero with CTA
- **FeaturedCards** - Template showcase cards
- **BasicCard** - Generic card component

### **UI Components**
- **Loading** - Loading indicator/spinner
- **Shadow** - Decorative shadow effects

### **Specialized Components**
- **VSCodeWindow** - Monaco editor container for code display
- **VSCodeIn** - VSCode-specific integrations
- **OAuthButton** - OAuth provider button (GitHub, Google, etc.)

### **Feature Components**
- **LanguageSupport** - Language selector
- **Instruction** - Tutorial/instruction display
- **PlugAndPlayCom** - Branding component

### **Theme Components** (shared-theme/)
- **AppTheme** - MUI theme provider with dark/light modes
- **ColorModeSelect** - Theme color picker

---

## 🔐 Services & API Integration

### **Authentication Service** (`services/auth/auth.js`)
```javascript
// Axios instance with base URL from ENV
const baseUrl = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8081/api/v1/auth",
  headers: { "Content-Type": "application/json" }
})

// API Endpoints:
- POST /register       // User signup
- POST /login          // User login
- POST /logout         // User logout
- POST /oauth/:provider // OAuth authentication
- GET /verify          // Token verification
- POST /refresh        // Refresh access token
```

### **User Service** (`services/user/user.js`)
```javascript
// Endpoints:
- GET /profile         // Get user profile
- PUT /profile         // Update profile
- DELETE /account      // Delete account
- GET /my-templates    // User's saved templates
```

### **State Management** (Zustand)
```javascript
// Auth store (services/auth/store.js):
- authStatus: boolean   // Login status
- user: object          // User data
- token: string         // Auth token
- checkLogin()          // Verify session
- logout()              // Clear state
```

---

## 🎨 State Management & Context

### **Dark Mode Context**
- Global theme state
- Default: Dark mode enabled
- Accessed via `useContext(DarkMode)`
- Affects all styled components

### **Zustand Auth Store**
- Global authentication state
- User information storage
- Auth token management
- Prevents prop drilling

### **React Query**
- Server state management
- Caching and synchronization
- DevTools for debugging
- Automatic background refetching

---

## ⚙️ Configuration Files

### **vite.config.js**
```javascript
{
  server: {
    host: "0.0.0.0",      // Listen on all interfaces
    fs: { strict: false }  // Allow file serving outside root
  },
  plugins: [
    react(),               // React plugin
    tailwindcss()          // Tailwind CSS plugin
  ]
}
```

### **eslint.config.js**
- ESLint recommended rules
- React Hooks plugin
- React Refresh for Vite
- ES2020 language version
- Browser globals

### **.env**
```
VITE_BASE_URL=/
VITE_API_ENDPOINT=/
# Add other environment variables as needed
```

### **tailwind.config.js** (Default)
- Uses Tailwind's default configuration
- Customizable for project-specific styles

---

## 🚀 Scripts & Commands

```bash
# Development
npm run dev        # Start Vite dev server with HMR
                   # Access at http://localhost:5173

# Production
npm run build      # Build for production
npm run preview    # Preview production build

# Code Quality
npm run lint       # Run ESLint on all files
```

---

## 📊 Tech Stack Summary

| Category | Technology |
|----------|-----------|
| **Framework** | React 19.2.0 |
| **Build Tool** | Vite 7.2.4 |
| **Styling** | Tailwind CSS 4.1.17 + MUI 7.3.7 |
| **Routing** | React Router DOM 7.10.1 |
| **State Management** | Zustand 5.0.10 + React Context |
| **API Client** | Axios 1.13.2 |
| **Data Fetching** | React Query 5.90.19 |
| **Code Editor** | Monaco Editor 4.7.0 |
| **Notifications** | React Hot Toast 2.6.0 |
| **Icons** | React Icons 5.5.0 |
| **Code Quality** | ESLint 9.39.1 |

---

## 🔗 Routing Structure

```
/                          → Home page
├── /login                 → Login page
├── /signup                → Sign up page
├── /auth                  → Auth wrapper
├── /templates             → Browse templates
│   └── /templates/:id     → Template details
├── /dashboard             → Protected dashboard
├── /profile               → User profile
├── /add-template          → Add new template (admin)
├── /oauth-success         → OAuth success callback
└── /oauth-failure         → OAuth failure callback
```

---

## 🔒 Authentication Flow

1. User visits `/login` or `/signup`
2. Submits credentials or OAuth provider
3. Auth service calls backend API
4. Token stored in Zustand store
5. Zustand store updates global auth state
6. Protected routes check `authStatus`
7. Dashboard wrapper uses `authStatus` to guard routes
8. Header displays user menu if authenticated

---

## 🎯 Key Features

### ✅ Implemented
- ✓ User Authentication (Login/SignUp)
- ✓ OAuth Integration
- ✓ Dark/Light Mode Theme
- ✓ Responsive Design (Mobile-first)
- ✓ Template Browser
- ✓ Code Display with Monaco Editor
- ✓ User Profile Management
- ✓ Template Information Pages

### 🔄 State Management
- Context API for theme
- Zustand for authentication
- React Query for API data
- Local component state for UI

### 📱 Responsive Breakpoints
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md, lg)
- Desktop: > 1024px (xl, 2xl)

---

## 📝 Development Notes

### Best Practices Used
- Component composition and reusability
- Context API for global state
- Zustand for simple, scalable state
- React Query for remote state
- Tailwind CSS for consistent styling
- ESLint for code quality
- Vite for fast development

### Folder Organization
- Components separated by functionality
- Services organized by feature (auth/user)
- Context for global state
- Utils for shared utilities
- Pages as route containers

### Environment Configuration
- Environment variables via `.env`
- Base URL configuration from `VITE_BASE_URL`
- Sensible defaults for development

---

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
# Visit http://localhost:5173
```

### Building
```bash
npm run build
# Output in dist/ folder
```

### Linting
```bash
npm run lint
```

---

## 📞 GitHub Repository

Repository: https://github.com/JatinTekam/PlugAndPlay-Frontend

---

**Last Updated:** February 9, 2026  
**Project Status:** Active Development  
**Maintainer:** Jatin Tekam
