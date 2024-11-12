import React, { useContext, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from './App'; // Import the context

export default function Layout() {
  const { user, isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/Home');
    }
  }, [isAuthenticated, navigate]);

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
