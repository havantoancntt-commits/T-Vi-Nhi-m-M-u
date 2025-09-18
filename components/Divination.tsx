import React, { useState, useEffect } from 'react';
import { getDivinationStick } from '../services/geminiService';
import type { DivinationResult } from '../types';
import { Card } from './UI';
import { YinYangIcon, LotusIcon, DivinationSticksIcon } from './Icons';
import { SupportInfo } from './SupportInfo';
import { useLanguage } from '../contexts/LanguageContext';

type Stage = 'initial' | 'focus' | 'loading' | 'result';

const Divination: React.FC = () => {
    const { language, t } = useLanguage();
    const [result, setResult] = useState<DivinationResult | null>(null);
    const [stage, setStage] = useState<Stage>('initial');
    const [isShaking, setIsShaking] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Reset state when language changes
    useEffect(() => {
      setResult(null);
      setStage('initial');
      setError(null);
      setIsShaking(false);
    }, [language]);


    const handleShake = () => {
        setStage('loading');
        setError(null);
        setIsShaking(true);

        const shakeAudio = document.getElementById('shake-sound') as HTMLAudioElement | null;
        if (shakeAudio) {
            shakeAudio.currentTime = 0;
            shakeAudio.play().catch(e => console.error("Shake sound failed", e));
        }

        setTimeout(async () => {
            try {
                const res = await getDivinationStick(language);
                setResult(res);
                setStage('result');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
                setStage('initial');
            } finally {
                setIsShaking(false);
            }
        }, 1500); // Increased delay for animation and sound
    };

    const resetDivination = () => {
      setResult(null);
      setStage('initial');
      setError(null);
    };
    
    const getStickNameColor = (name: string) => {
        const lowerCaseName = name.toLowerCase();
        if (lowerCaseName.includes('thượng') || lowerCaseName.includes('cát') || lowerCaseName.includes('superior') || lowerCaseName.includes('great luck')) return 'text-green-400';
        if (lowerCaseName.includes('hạ') || lowerCaseName.includes('inferior') || lowerCaseName.includes('bad luck')) return 'text-red-400';
        return 'text-amber-400';
    }
    
    const renderTextWithNewlines = (text: string) => {
        return text.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
            <p key={index} className="mb-2">{paragraph}</p>
        ));
    };

    const renderInitialState = () => (
        <>
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{t('divination.initial.title')}</h2>
            <p className="text-gray-400 mb-8 max-w-xl">{t('divination.initial.description')}</p>
            
            <div className="my-8">
                <DivinationSticksIcon 
                    aria-label={t('divination.initial.alt')}
                    className={`w-40 h-40 text-amber-300/80 transition-transform duration-300`}
                />
            </div>

            <button onClick={() => setStage('focus')} className="btn-shine bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-amber-400/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
                <YinYangIcon className="w-6 h-6" /> {t('divination.initial.button')}
            </button>
        </>
    );

    const renderFocusState = () => (
        <>
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{t('divination.initial.title')}</h2>
            <p className="text-gray-300 mb-8 max-w-xl animate-fade-in">{t('divination.initial.focusMessage')}</p>
            
            <div className="my-8">
                <DivinationSticksIcon 
                    aria-label={t('divination.initial.alt')}
                    className={`w-40 h-40 text-amber-300/80 transition-transform duration-300 ${isShaking ? 'animate-shake' : 'hover:scale-105'}`}
                />
            </div>

            <button onClick={handleShake} disabled={stage === 'loading'} className="btn-shine bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-amber-400/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto">
                 {stage === 'loading' ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('divination.initial.loadingButton')}
                    </>
                 ) : (
                     <><YinYangIcon className="w-6 h-6" /> {t('divination.initial.shakeButton')}</>
                 )}
            </button>
        </>
    );

    return (
        <div className="max-w-4xl mx-auto">
            {stage !== 'result' && (
                <Card>
                    <div className="p-6 text-center flex flex-col items-center min-h-[500px] justify-center">
                       { (stage === 'initial') && renderInitialState() }
                       { (stage === 'focus' || stage === 'loading') && renderFocusState() }
                    </div>
                </Card>
            )}

            {error && <div className="mt-8 text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}

            {stage === 'result' && result && (
                 <div className="mt-10 space-y-8 opacity-0 animate-fade-in-up">
                    <Card>
                        <div className="p-6 text-center">
                            <p className="text-amber-300">{t('divination.result.stickNumberLabel')}</p>
                            <h2 className="text-7xl font-bold my-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{result.stickNumber}</h2>
                            <p className={`text-2xl font-bold ${getStickNameColor(result.name)}`}>{result.name}</p>
                        </div>
                    </Card>

                    <Card title={t('divination.result.poemTitle')}>
                        <div className="text-center font-serif text-xl italic text-gray-300 whitespace-pre-line">
                           {result.poem}
                        </div>
                    </Card>
                    
                    <Card title={t('divination.result.interpretationTitle')}>
                        <div className="space-y-4">
                             <div>
                                <h4 className="font-bold text-amber-400 text-lg">{t('horoscope.result.lifetime.overview')}</h4>
                                <div className="text-gray-300 mt-1">{renderTextWithNewlines(result.interpretation.overview)}</div>
                            </div>
                             <div>
                                <h4 className="font-bold text-amber-400 text-lg">{t('horoscope.result.lifetime.career')}</h4>
                                <div className="text-gray-300 mt-1">{renderTextWithNewlines(result.interpretation.career)}</div>
                            </div>
                             <div>
                                <h4 className="font-bold text-amber-400 text-lg">{t('horoscope.result.lifetime.love')}</h4>
                                <div className="text-gray-300 mt-1">{renderTextWithNewlines(result.interpretation.love)}</div>
                            </div>
                             <div>
                                <h4 className="font-bold text-amber-400 text-lg">{t('horoscope.result.lifetime.health')}</h4>
                                <div className="text-gray-300 mt-1">{renderTextWithNewlines(result.interpretation.health)}</div>
                            </div>
                        </div>
                    </Card>

                    <Card title={t('divination.result.adviceTitle')}>
                         <div className="text-gray-300 mt-1">{renderTextWithNewlines(result.advice)}</div>
                    </Card>
                    
                    <Card>
                        <div className="text-center text-gray-300 space-y-4 p-6">
                            <div className="flex justify-center">
                                <LotusIcon className="w-10 h-10 text-amber-300/80" />
                            </div>
                            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{t('divination.support.title')}</h3>
                            <p className="max-w-2xl mx-auto">{t('divination.support.description')}</p>
                            <div className="pt-4 max-w-md mx-auto">
                               <SupportInfo />
                            </div>
                        </div>
                    </Card>
                    
                    <div className="text-center mt-8">
                         <button onClick={resetDivination} className="btn-shine bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
                           <YinYangIcon className="w-6 h-6"/> {t('divination.result.newButton')}
                        </button>
                    </div>

                 </div>
            )}
        </div>
    );
};

export default Divination;