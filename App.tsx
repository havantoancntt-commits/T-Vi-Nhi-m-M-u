import React, { useState, useEffect, useRef, Suspense } from 'react';
import { SparklesIcon, ChatIcon, YinYangIcon, VolumeUpIcon, VolumeOffIcon, CalendarCheckIcon, TalismanIcon } from './components/Icons';
import { Logo } from './components/Logo';
import { useLanguage } from './contexts/LanguageContext';
import { Loader } from './components/UI';

// Lazy load components for better initial performance
const HoroscopeGenerator = React.lazy(() => import('./components/HoroscopeGenerator'));
const AIChat = React.lazy(() => import('./components/AIChat'));
const Divination = React.lazy(() => import('./components/Divination'));
const DateSelector = React.lazy(() => import('./components/DateSelector'));
const TalismanGenerator = React.lazy(() => import('./components/TalismanGenerator'));
const WisdomQuotes = React.lazy(() => import('./components/WisdomQuotes'));


type Tab = 'horoscope' | 'divination' | 'date_selection' | 'talisman' | 'chat';

const SiteControls: React.FC<{
    isMuted: boolean;
    onMuteToggle: () => void;
    language: string;
    onLanguageChange: (lang: 'vi' | 'en') => void;
}> = ({ isMuted, onMuteToggle, language, onLanguageChange }) => {
    const { t } = useLanguage();
    return (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-black/30 backdrop-blur-sm p-1.5 rounded-full border border-white/10">
            <button
                onClick={onMuteToggle}
                className="p-2 text-sm rounded-full transition text-gray-400 hover:text-white hover:bg-white/10"
                aria-label={isMuted ? t('audio.unmute') : t('audio.mute')}
            >
                {isMuted ? <VolumeOffIcon className="w-5 h-5" /> : <VolumeUpIcon className="w-5 h-5" />}
            </button>
            <div className="w-px h-5 bg-white/20"></div> {/* Separator */}
            <button
                onClick={() => onLanguageChange('vi')}
                className={`px-3 py-1.5 text-sm rounded-full transition ${language === 'vi' ? 'bg-amber-400 text-gray-900 font-bold' : 'text-gray-400 hover:bg-white/10'}`}
                aria-label="Switch to Vietnamese"
            >
                VI
            </button>
            <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1.5 text-sm rounded-full transition ${language === 'en' ? 'bg-amber-400 text-gray-900 font-bold' : 'text-gray-400 hover:bg-white/10'}`}
                aria-label="Switch to English"
            >
                EN
            </button>
        </div>
    );
};

const TabButton = ({ tab, activeTab, label, icon, onClick }: { tab: Tab; activeTab: Tab; label: string; icon: React.ReactNode, onClick: (tab: Tab) => void }) => (
    <button
      role="tab"
      aria-selected={activeTab === tab}
      aria-controls={`tab-panel-${tab}`}
      id={`tab-${tab}`}
      onClick={() => onClick(tab)}
      className={`tab-button ${activeTab === tab ? 'active' : ''}`}
    >
      {icon}
      <span>{label}</span>
    </button>
);


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('horoscope');
  const { language, setLanguage, t } = useLanguage();
  const [isMuted, setIsMuted] = useState(true);
  const hasInteracted = useRef(false);

  useEffect(() => {
    const music = document.getElementById('background-music') as HTMLAudioElement | null;
    if (!music) return;
    music.volume = 0.2;
    
    if (!isMuted && hasInteracted.current) {
        music.play().catch(e => console.error("Audio play failed:", e));
    } else {
        music.pause();
    }
  }, [isMuted]);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        const music = document.getElementById('background-music') as HTMLAudioElement | null;
        if (music && !isMuted) {
          music.play().catch(e => console.error("Audio play failed on interaction:", e));
        }
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isMuted]);

  return (
    <div className="min-h-screen bg-transparent text-gray-200">
      <div className="antialiased w-full min-h-screen relative isolate">
        <SiteControls 
          isMuted={isMuted} 
          onMuteToggle={() => setIsMuted(!isMuted)} 
          language={language}
          onLanguageChange={setLanguage}
        />
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
              <Logo className="w-28 h-28" />
            </div>
          <h1 className="text-4xl md:text-6xl font-bold title-glow opacity-0 animate-fade-in-up animation-delay-200">
            {t('header.title')}
          </h1>
          <p className="text-gray-300 mt-3 text-lg opacity-0 animate-fade-in-up animation-delay-400 subtitle-style">{t('header.subtitle')}</p>
        </header>

        <main className="container mx-auto p-4 md:p-8">
          <Suspense fallback={<div className="h-48" />}>
            <WisdomQuotes />
          </Suspense>
          
          <div role="tablist" aria-label="Main features" className="flex justify-center items-center mb-8 opacity-0 animate-fade-in-up animation-delay-800 flex-wrap bg-black/20 p-2 rounded-full border border-white/10 max-w-max mx-auto">
            <TabButton tab="horoscope" activeTab={activeTab} onClick={setActiveTab} label={t('tabs.horoscope')} icon={<SparklesIcon />} />
            <TabButton tab="divination" activeTab={activeTab} onClick={setActiveTab} label={t('tabs.divination')} icon={<YinYangIcon />} />
            <TabButton tab="date_selection" activeTab={activeTab} onClick={setActiveTab} label={t('tabs.date_selection')} icon={<CalendarCheckIcon />} />
            <TabButton tab="talisman" activeTab={activeTab} onClick={setActiveTab} label={t('tabs.talisman')} icon={<TalismanIcon />} />
            <TabButton tab="chat" activeTab={activeTab} onClick={setActiveTab} label={t('tabs.chat')} icon={<ChatIcon />} />
          </div>

          <Suspense fallback={<Loader message={t('loader.component')} />}>
            <div 
              key={activeTab} 
              role="tabpanel"
              id={`tab-panel-${activeTab}`}
              aria-labelledby={`tab-${activeTab}`}
              className="opacity-0 animate-fade-in-up"
            >
              {activeTab === 'horoscope' && <HoroscopeGenerator />}
              {activeTab === 'divination' && <Divination />}
              {activeTab === 'date_selection' && <DateSelector />}
              {activeTab === 'talisman' && <TalismanGenerator />}
              {activeTab === 'chat' && <AIChat />}
            </div>
          </Suspense>
        </main>

        <footer className="text-center p-6 mt-12 border-t border-white/10">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        </footer>
      </div>
    </div>
  );
};

export default App;