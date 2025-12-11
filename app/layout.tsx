import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import type { Metadata } from 'next';

const siteUrl = 'https://hackoria.space'; 

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'HACKORIA | Elite Web Development & Cyber Security Agency',
    template: '%s | HACKORIA',
  },
  description: 'HACKORIA delivers military-grade Cyber Security Audits, Penetration Testing, and high-performance Custom Web Development. Protect your digital assets with Bangladesh\'s premier tech agency.',
  keywords: [
    'Cyber Security Company', 
    'Web Development Bangladesh', 
    'Penetration Testing', 
    'Ethical Hacking Services', 
    'Secure Software Development', 
    'Vulnerability Assessment', 
    'HACKORIA', 
    'Abdur Rahman', 
    'Next.js Developers', 
    'Cloud Security'
  ],
  authors: [{ name: 'Abdur Rahman', url: 'https://hackoria.space' }],
  creator: 'Abdur Rahman',
  publisher: 'HACKORIA',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'HACKORIA | Web Development & Cyber Security',
    description: 'Secure your future with HACKORIA. Expert Web Development, Penetration Testing, and Cyber Security Audits by industry leaders.',
    siteName: 'HACKORIA',
    images: [
      {
        url: 'https://i.postimg.cc/PqSbZ0Ls/file-0000000036207206b8f90e59168529fb.png', // Using logo as fallback, ideally use a large banner image
        width: 1200,
        height: 630,
        alt: 'HACKORIA Cyber Security & Web Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HACKORIA | Elite Cyber Security & Web Dev',
    description: 'Military-grade security and cutting-edge web development. Founded by Abdur Rahman.',
    images: ['https://i.postimg.cc/PqSbZ0Ls/file-0000000036207206b8f90e59168529fb.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/vite.svg',
    shortcut: '/vite.svg',
    apple: '/vite.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'HACKORIA',
    'url': siteUrl,
    'logo': 'https://i.postimg.cc/PqSbZ0Ls/file-0000000036207206b8f90e59168529fb.png',
    'image': 'https://i.postimg.cc/PqSbZ0Ls/file-0000000036207206b8f90e59168529fb.png',
    'description': 'Professional Web Development and Cyber Security solutions including Penetration Testing and Secure Cloud Setup.',
    'founder': {
      '@type': 'Person',
      'name': 'Abdur Rahman'
    },
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'BD',
      'addressLocality': 'Dhaka'
    },
    'telephone': '+8801410199221',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+8801410199221',
      'contactType': 'customer service',
      'availableLanguage': ['English', 'Bengali']
    },
    'sameAs': [
      'https://wa.me/8801410199221'
    ],
    'priceRange': '$$$'
  };

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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