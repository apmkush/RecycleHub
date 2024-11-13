// import React, { createContext, useState, useEffect } from 'react';

// // Create context for user state
// export const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [userId, setUserId] = useState(null);
//   const [userType, setUserType] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // useEffect to load user data from localStorage on app load
//   useEffect(() => {
//     // const storedUser = localStorage.getItem('user'); // Check for user data in localStorage
//     // console.log(storedUser);
//     // if (storedUser) {
//     //   const user = JSON.parse(storedUser);
//     //   setUserId(user.id);
//     //   setUserType(user.userRole);
//     //   setIsLoggedIn(true);
//     // }
//   }, []); // Empty dependency array means this runs on initial load only

//   useEffect(() => {
//     if (isLoggedIn) {
//       localStorage.setItem(
//         'user',
//         JSON.stringify({ userId, userType })
//       );
//     } else {
//       localStorage.removeItem('user'); // Clear localStorage on logout
//     }
//   }, [isLoggedIn, userId, userType]);

//   return (
//     <UserContext.Provider value={{ userId, userType, isLoggedIn, setUserId, setUserType, setIsLoggedIn }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

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
      localStorage.removeItem('user'); // Clear corrupted data if any
    }
    setIsLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ userId, userType, isLoggedIn, setUserId, setUserType, setIsLoggedIn }}>
      {!isLoading && children} {/* Render children only after loading completes */}
    </UserContext.Provider>
  );
}


