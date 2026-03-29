import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './ScrollTop';
import { useDispatch } from 'react-redux';
import { restoreAuthFromStorage } from './store/authSlice.js';

export default function Layout() {
  const dispatch = useDispatch();

  // Restore authentication state from localStorage on app load
  useEffect(() => {
    dispatch(restoreAuthFromStorage());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop/>
      <Header />
      <main className="flex-grow overflow-y-auto p-0 m-0">
        {/* Full-width container */}
        <div className="w-full">
          <Outlet /> 
        </div>
      </main>
      <Footer />
    </div>
  );
}
