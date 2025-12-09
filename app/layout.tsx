import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';

export const metadata = {
  title: 'HACKORIA | Web Development & Cyber Security',
  description: 'Professional Web Development and Cyber Security solutions by HACKORIA.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // In a real Next.js app, you would include <html> and <body> tags here.
    // For this preview environment, we return the container div.
    <div className="bg-black min-h-screen text-white font-sans selection:bg-brand-primary selection:text-black antialiased">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}