import React, { useContext, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from './App';
export default function Layout() {
  const { userId, userType, isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if the user is not authenticated
    if (!isLoggedIn) {
      navigate('/Home');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
