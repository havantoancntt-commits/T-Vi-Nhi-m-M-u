
import React, { useState, useEffect } from 'react';
import { LotusIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

interface Quote {
  text: string;
  author: string;
}

const WisdomQuotes: React.FC = () => {
  const { t } = useLanguage();
  const quotes: Quote[] = t('quotes');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 8000); // Change quote every 8 seconds

    return () => clearInterval(timer);
  }, [quotes.length]);

  const currentQuote = quotes[currentIndex];

  if (!currentQuote) return null;

  return (
    <div className="my-8 text-center opacity-0 animate-fade-in-up animation-delay-600">
      <div className="max-w-3xl mx-auto p-6 bg-black/20 rounded-xl border border-white/10 relative overflow-hidden">
        <LotusIcon className="w-12 h-12 text-amber-300/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <div key={currentIndex} className="animate-fade-in">
          <p className="text-xl md:text-2xl font-serif text-gray-200 italic">
            "{currentQuote.text}"
          </p>
          <p className="mt-4 text-amber-300 font-semibold text-sm tracking-wider">
            — {currentQuote.author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(WisdomQuotes);
