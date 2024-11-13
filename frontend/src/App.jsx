import React, { createContext, useState, useEffect } from 'react';

// Create context for user state
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect to load user data from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Check for user data in localStorage
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.userId);
      setUserType(user.userType);
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array means this runs on initial load only

  return (
    <UserContext.Provider value={{ userId, userType, isLoggedIn, setUserId, setUserType, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

