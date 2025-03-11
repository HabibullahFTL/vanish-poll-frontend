'use client';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './navbar';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl xl:max-w-5xl mx-auto flex justify-between gap-6 h-[calc(100vh-75px)] overflow-y-auto">
        {children}
      </main>
      <Toaster />
    </>
  );
};

export default MainLayout;
