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

---

## 📚 Folder Descriptions

### `src/components/`
Contains all React components organized by type:
- **common/**: Reusable UI components (buttons, cards, modals, etc.)
- **layout/**: Layout-level components (header, footer, sidebar, app layout)
- **shared-theme/**: Theme and styling components
- Other component files for specific features

### `src/pages/`
Page components that map directly to routes:
- Home, Login, SignUp, Profile, Templates, TemplateInfo

### `src/context/`
React Context for global state management:
- DarkMode context and other global states

### `src/hooks/`
Custom React hooks for reusable logic:
- `useFetch()` - for API calls
- `useDarkMode()` - for dark mode logic
- `useLocalStorage()` - for local storage management

### `src/services/`
API service functions and backend communication:
- `api.js` - Base API configuration
- `templateService.js` - Template-related API calls
- `authService.js` - Authentication API calls
- `userService.js` - User profile API calls

### `src/utils/`
Helper functions and utilities:
- `utils.js` - General utilities
- `helpers.js` - Helper functions
- `validators.js` - Validation functions
- `images/` - Image assets

### `src/constants/`
Global constants and configuration values:
- `routes.js` - Route constants
- `apiEndpoints.js` - API endpoint URLs
- `messages.js` - Notification/error messages

### `src/config/`
Configuration files:
- `axios.config.js` - Axios HTTP client setup
- `app.config.js` - App-wide configuration

### `src/types/`
TypeScript types/interfaces (for future TS migration):
- Type definitions for templates, users, and common types

### `src/styles/`
Global and reusable styles:
- CSS variables
- Global styles

---

## 🎯 Best Practices

1. **Component Organization**: Group related components in subdirectories
2. **Service Layer**: Keep API calls in `services/` folder
3. **Constants**: Define all magic strings in `constants/` folder
4. **Custom Hooks**: Extract reusable logic into custom hooks
5. **Naming Conventions**:
   - Components: PascalCase (e.g., `UserProfile.jsx`)
   - Utils/Services: camelCase (e.g., `userService.js`)
   - Constants: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS`)

6. **Import Organization**:
   ```javascript
   // External imports
   import React from 'react';
   import { useContext } from 'react';
   
   // Internal imports
   import { DarkMode } from '../context/DarkMode';
   import { userService } from '../services/userService';
   import { ROUTES } from '../constants/routes';
   ```

---

## 📝 File Organization Tips

### Components
```javascript
// src/components/common/Button.jsx
export default function Button({ label, onClick, variant = 'primary' }) {
  // Component logic
}
```

### Services
```javascript
// src/services/templateService.js
export const getTemplates = async () => {
  // API call
};

export const getTemplateById = async (id) => {
  // API call
};
```

### Constants
```javascript
// src/constants/routes.js
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  TEMPLATES: '/templates',
  PROFILE: '/profile'
};
```

### Custom Hooks
```javascript
// src/hooks/useFetch.js
export const useFetch = (url) => {
  // Hook logic
  return { data, loading, error };
};
```

---

## 🚀 Next Steps

1. Move `Api/` folder contents to `src/services/`
2. Create custom hooks for frequently used logic
3. Move magic strings to `src/constants/`
4. Add `.env.example` file for environment setup
5. Consider TypeScript migration in the future

