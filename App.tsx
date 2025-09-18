import React, { useState } from 'react';
import HoroscopeGenerator from './components/HoroscopeGenerator';
import AIChat from './components/AIChat';
import WisdomQuotes from './components/WisdomQuotes';
import { SparklesIcon, ChatIcon } from './components/Icons';
import { Logo } from './components/Logo';

type Tab = 'horoscope' | 'chat';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('horoscope');

  const TabButton = ({ tab, label, icon }: { tab: Tab; label: string; icon: JSX.Element }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`relative flex items-center justify-center gap-2 px-6 py-3 text-sm md:text-base font-bold transition-all duration-300 ease-in-out group
        ${activeTab === tab
          ? 'text-amber-300'
          : 'text-gray-400 hover:text-white'
        }`}
    >
      {icon}
      <span>{label}</span>
      <div
        className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full transition-all duration-300 bg-gradient-to-r from-amber-400 to-yellow-500 shadow-[0_0_10px_#fcd34d] ${activeTab === tab ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
      ></div>
    </button>
  );

  return (
    <div className="min-h-screen bg-transparent text-gray-200">
      <div className="antialiased w-full min-h-screen relative isolate">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6366f1] to-[#d946ef] opacity-10 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <header className="text-center p-6 border-b border-white/10 opacity-0 animate-fade-in-up">
           <div className="flex justify-center items-center mb-4">
              <Logo className="w-24 h-24" />
            </div>
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200 opacity-0 animate-fade-in-up animation-delay-200">
            Huyền Phong Phật Đạo
          </h1>
          <p className="text-gray-400 mt-2 text-lg opacity-0 animate-fade-in-up animation-delay-400">Luận Giải Mệnh Lý - Soi Rọi Tương Lai</p>
        </header>

        <main className="container mx-auto p-4 md:p-8">
          <WisdomQuotes />
          
          <div className="flex justify-center mb-8 opacity-0 animate-fade-in-up animation-delay-800">
            <TabButton tab="horoscope" label="Luận Giải Lá Số" icon={<SparklesIcon />} />
            <TabButton tab="chat" label="AI Thiện Giác" icon={<ChatIcon />} />
          </div>

          <div key={activeTab} className="opacity-0 animate-fade-in-up">
            {activeTab === 'horoscope' && <HoroscopeGenerator />}
            {activeTab === 'chat' && <AIChat />}
          </div>
        </main>

        <footer className="text-center p-6 mt-12 border-t border-white/10">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Huyền Phong Phật Đạo. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;