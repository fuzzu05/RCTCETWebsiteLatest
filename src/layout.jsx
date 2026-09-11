import React from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import AuroraBackground from './Components/ReactBits/AuroraBackground';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#1a1410] relative selection:bg-primary/20">
      {/* 1. Dynamic React Bits Aurora Canvas (Light Mode Only, High Contrast Rotaract Palette) */}
      <AuroraBackground
        colorStops={["#C2131A", "#E05A0B", "#E6AF19"]}
        opacity={0.52}
        speed={0.6}
        className="dark:hidden"
      />

      {/* 2. Subtle organic noise/grain texture overlay across continuous canvas */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] dark:opacity-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-20">
        <Header />
      </div>
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
