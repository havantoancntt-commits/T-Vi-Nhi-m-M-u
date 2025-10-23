import React, { useState } from 'react';
import { InformationCircleIcon, ChevronDownIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

interface UserInputGuideProps {
  title: string;
  content: string;
}

export const UserInputGuide: React.FC<UserInputGuideProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="mb-6 bg-black/20 rounded-lg border border-white/10 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-white/5 transition"
        aria-expanded={isOpen}
        aria-controls="guide-content"
      >
        <div className="flex items-center gap-2">
          <InformationCircleIcon className="w-6 h-6 text-amber-300" />
          <span className="font-semibold text-amber-300">{t('guide.title')}: {title}</span>
        </div>
        <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        id="guide-content"
        className={`transition-all duration-300 ease-in-out grid ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
             <div className="p-4 border-t border-white/10 text-gray-400 text-sm space-y-2 prose prose-invert max-w-none prose-p:my-1 prose-strong:text-amber-300 prose-strong:font-semibold">
                {content.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
        </div>
      </div>
    </div>
  );
};