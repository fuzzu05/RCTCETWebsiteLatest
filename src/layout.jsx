import React from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import MeshBackground from './Components/Layout/MeshBackground';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative selection:bg-primary/20 bg-background">
      {/* Pure CSS Ambient Mesh Background & Noise Overlay */}
      <MeshBackground />
      <div className="fixed top-0 inset-x-0 z-[100] w-full flex justify-center pointer-events-none">
        <Header />
      </div>
      {/* Flow spacer to prevent layout shift and content overlap */}
      <div className="h-[72px] md:h-[76px] w-full pointer-events-none shrink-0" aria-hidden="true" />
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
