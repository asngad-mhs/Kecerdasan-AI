
import React from 'react';

interface WelcomeScreenProps {
  onPromptClick: (prompt: string) => void;
}

const examplePrompts = [
  "Buatkan kerangka untuk makalah tentang dampak AI pada pendidikan.",
  "Tulis abstrak untuk jurnal penelitian tentang energi terbarukan.",
  "Berikan saya daftar pustaka dalam format APA tentang psikologi kognitif.",
  "Rancang 3 slide pertama untuk presentasi tentang sejarah internet.",
];

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onPromptClick }) => {
  return (
    <div className="text-center px-4 py-8">
      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">Selamat Datang di Aetherius AI</h1>
      <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
        Saya adalah asisten cerdas generasi berikutnya. Bagaimana saya bisa membantu Anda memecahkan masalah kompleks hari ini?
      </p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {examplePrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(prompt)}
            className="p-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
          >
            <p className="font-semibold text-slate-700 dark:text-slate-300">{prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
