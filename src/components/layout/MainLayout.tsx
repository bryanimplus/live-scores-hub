
import React from 'react';
import Navigation from './Navigation';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  hideNav?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  title,
  subtitle,
  hideNav = false
}) => {
  return (
    <div className="flex flex-col min-h-screen pb-16">
      <Header title={title} subtitle={subtitle} />
      
      <main className="flex-1 px-4 py-4 max-w-6xl mx-auto w-full">
        {children}
      </main>
      
      {!hideNav && <Navigation />}
    </div>
  );
};

export default MainLayout;
