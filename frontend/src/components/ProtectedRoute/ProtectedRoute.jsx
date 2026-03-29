import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';

/**
 * ProtectedRoute Component
 * Restricts access to routes based on user authentication and role
 * 
 * Props:
 * - children: Component to render if authorized
 * - requiredRoles: Array of roles that can access this route (e.g., ['admin', 'dealer'])
 * - fallbackPath: Path to redirect to if not authenticated (default: '/Login')
 */
const ProtectedRoute = ({ children, requiredRoles = [], fallbackPath = '/Login' }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Not authenticated - redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to={fallbackPath} replace />;
  }

  // Authentication required but roles are specified
  if (requiredRoles.length > 0) {
    const userRole = user?.userRole;

    // Check if user has required role
    if (!userRole || !requiredRoles.includes(userRole)) {
      // Return 403-like unauthorized page
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-red-600">403</h1>
            <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
              Access Denied
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              You don't have permission to access this page. Your role: <span className="font-semibold capitalize">{userRole}</span>
            </p>
            <p className="text-gray-500 dark:text-gray-500 mt-2 text-sm">
              Required roles: {requiredRoles.join(', ')}
            </p>
            <a
              href="/"
              className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Go to Home
            </a>
          </div>
        </div>
      );
    }
  }

  // All checks passed - render the component
  return children;
};

export default ProtectedRoute;
