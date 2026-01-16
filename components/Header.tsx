
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-800/50 backdrop-blur-sm shadow-md w-full z-10">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Aetherius AI
        </h1>
      </div>
    </header>
  );
};

export default Header;
