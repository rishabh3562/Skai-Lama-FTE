
// Base URL for API requests

export const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

// console.log("import.meta.env.VITE_REACT_APP_BASE_URL in constats",import.meta.env.VITE_REACT_APP_BASE_URL)
  
// API endpoints
export const API_ENDPOINTS = {
  user: '/api/users',
  email: "/api/users/email",
  projects: '/api/projects',
  projectList:`/api/users/projects-list`,
};

// Routes
export const ROUTES = {
  home: '/',
  project: '/project',
  editTranscript: '/edit-transcript',
  configuration: '/configuration',
  accountSettings: '/account-settings',
 
  error404: '*', // 404 page

};

// Image URLs
export const IMAGE_URLS = {
  
 
};
