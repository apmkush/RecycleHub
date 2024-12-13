import React, { useContext, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from './App';
export default function Layout() {

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
