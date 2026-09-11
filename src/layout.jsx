import React from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FAF7F2] via-[#F6ECE0] to-[#FAF7F2] dark:from-[#1a1410] dark:via-[#1a1410] dark:to-[#1a1410] relative">
      {/* 1. Subtle organic noise/grain texture overlay across continuous canvas */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] dark:opacity-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* 2. Flowing Ambient Mesh Accents (Large floating blur spheres at key transition points) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden dark:opacity-0" aria-hidden="true">
        {/* Top/Behind Hero */}
        <div className="absolute top-16 -right-24 w-[550px] h-[550px] bg-gradient-to-br from-[#D71921]/8 to-[#F37021]/8 rounded-full blur-[130px] transform-gpu" />
        {/* Mid-page showcase */}
        <div className="absolute top-[45%] -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-[#F37021]/8 to-[#FFC72C]/8 rounded-full blur-[140px] transform-gpu" />
        {/* Lower page / Pre-footer */}
        <div className="absolute bottom-20 right-10 w-[650px] h-[650px] bg-gradient-to-tl from-[#D71921]/8 to-[#FFC72C]/8 rounded-full blur-[140px] transform-gpu" />
      </div>

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
