// Determine backend URL based on environment
const getBackendUrl = () => {
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    // Use Vite environment variable or default to localhost
    return import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  }
  // Production - use deployed backend
  return import.meta.env.VITE_BACKEND_URL || "https://recyclehub-d3gj.onrender.com";
};

export const backendUrl = getBackendUrl();
export const frontendUrl = "https://recycle-8enlcickf-anupam-kushwahas-projects-0ac39bbc.vercel.app";