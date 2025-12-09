import React from 'react';
import ReactDOM from 'react-dom/client';
import RootLayout from './app/layout';
import Page from './app/page';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
// This mimics how Next.js wraps the page in the root layout
root.render(
  <React.StrictMode>
    {/* Fixed: Explicitly passing children prop to satisfy TypeScript requirements */}
    <RootLayout children={<Page />} />
  </React.StrictMode>
);