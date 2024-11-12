import React, { createContext, useState, useEffect } from 'react';
import 'aos/dist/aos.css'; // Importing AOS (if you are using it for animations)

// Create a context for user information
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Holds user type and login status
  const isAuthenticated = Boolean(user); // Determine if a user is logged in

  // Fetch user type and login status from the backend
  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const response = await fetch('/api/getUserType'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data.type ? data : null); // Set user type or null if not logged in
      } catch (error) {
        console.error('Error fetching user type:', error);
        setUser(null); // Ensure no user state is set in case of error
      }
    };

    fetchUserType();
  }, []);

  return (
    <UserContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
}

function App() {
  return (
    <>
      {/* App-level global state like theme handling can be added here */}
    </>
  );
}

export default App;
