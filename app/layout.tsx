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
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Included for real Next.js deployments where index.html is ignored */}
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                    mono: ['JetBrains Mono', 'monospace'],
                  },
                  colors: {
                    brand: {
                      black: '#000000',
                      dark: '#0a0a0a',
                      primary: '#00ff9d',
                      secondary: '#00b8ff',
                      accent: '#7000ff',
                    }
                  }
                }
              }
            }
          `
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
            ::-webkit-scrollbar { width: 8px; }
            ::-webkit-scrollbar-track { background: #0a0a0a; }
            ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
            ::-webkit-scrollbar-thumb:hover { background: #00ff9d; }
            .glass-panel { background: rgba(10, 10, 10, 0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }
            .neon-glow { box-shadow: 0 0 10px rgba(0, 255, 157, 0.3); }
          `
        }} />
      </head>
      <body className="bg-black min-h-screen text-white font-sans selection:bg-brand-primary selection:text-black antialiased">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}