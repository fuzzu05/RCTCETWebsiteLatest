import React from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import MeshBackground from './Components/Layout/MeshBackground';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative selection:bg-primary/20">
      {/* Pure CSS Ambient Mesh Background & Noise Overlay */}
      <MeshBackground />
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
