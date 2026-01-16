
import React from 'react';

interface LandingPageProps {
  onStartChat: () => void;
}

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Rekayasa Kode Cerdas",
    description: "Akselerasi pengembangan dengan pembuatan kode, debugging, dan optimisasi di semua bahasa modern.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
         <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Asisten Akademik Cerdas",
    description: "Dapatkan bantuan ahli dalam menyusun skripsi, jurnal, presentasi, dan daftar pustaka dengan standar tinggi.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V5a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17v-2a4 4 0 00-4-4h-1a4 4 0 00-4 4v2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7V5a4 4 0 00-4-4h-1a4 4 0 00-4 4v2" />
      </svg>
    ),
    title: "Analisis & Wawasan Mendalam",
    description: "Uraikan data kompleks dan temukan jalur pengetahuan baru melalui referensi silang yang cerdas.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Akselerator Inovasi",
    description: "Hasilkan ide-ide baru, buat draf konten, dan perluas batas-batas kreatif dan intelektual Anda.",
  },
];


const LandingPage: React.FC<LandingPageProps> = ({ onStartChat }) => {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-white font-sans overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(29,78,216,0.15)_0%,_rgba(29,78,216,0)_50%)]"></div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        
        <section className="text-center animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
          <div className="inline-block bg-sky-500/10 text-sky-400 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            Didukung oleh Gemini
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-br from-white to-slate-400 text-transparent bg-clip-text">
            Aetherius AI
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
            Platform kecerdasan generasi berikutnya untuk memecahkan masalah akademis dan teknis paling kompleks di era digital.
          p>
          <button 
            onClick={onStartChat} 
            className="mt-8 px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full font-semibold hover:scale-105 transform transition-transform duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-sky-500/50"
          >
            Mulai Sesi
          </button>
        </section>

        <section 
          className="mt-24 max-w-5xl w-full animate-fade-in-up" 
          style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
        >
           <h2 className="text-3xl font-bold text-center bg-gradient-to-br from-white to-slate-400 text-transparent bg-clip-text">Kemampuan Inti</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-10">
             {features.map((feature, index) => (
               <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/80 backdrop-blur-sm transform transition-transform duration-300 hover:-translate-y-2 flex items-start space-x-4">
                 <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                 <div>
                    <h3 className="font-bold text-lg text-slate-200">{feature.title}</h3>
                    <p className="text-slate-400 mt-2">{feature.description}</p>
                 </div>
               </div>
             ))}
           </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
