import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="mb-6 md:mb-0 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
             <img 
                src="https://i.postimg.cc/PqSbZ0Ls/file-0000000036207206b8f90e59168529fb.png" 
                alt="HACKORIA Logo" 
                className="h-32 w-auto" 
              />
            <div>
                <p className="text-gray-500 text-sm mt-1 max-w-xs">Web Development & Cyber Security Solutions. Building the digital future, securely.</p>
            </div>
          </div>

          {/* Links removed as requested */}
        </div>
        
        <div className="mt-8 border-t border-gray-900 pt-8 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} HACKORIA. All rights reserved. Founder: Abdur Rahman.
        </div>
      </div>
    </footer>
  );
};

export default Footer;