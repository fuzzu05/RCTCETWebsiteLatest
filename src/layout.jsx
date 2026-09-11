import React from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-[#1a1410] relative">
      {/* Scroll-driven ambient Rotaract glow (Light Mode only, hidden in Dark Mode) */}
      <div
        id="rotaract-ambient-glow"
        className="fixed inset-0 pointer-events-none z-0 opacity-100 dark:opacity-0 transition-opacity duration-500"
        aria-hidden="true"
      />
      <Header />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
