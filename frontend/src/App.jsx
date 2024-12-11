import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserId(user.userId);
        setUserType(user.userType);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      localStorage.removeItem('user');
    }
    setIsLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ userId, userType, isLoggedIn, setUserId, setUserType, setIsLoggedIn }}>
      {!isLoading && children}
    </UserContext.Provider>
  );
}
