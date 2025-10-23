import React, { useState, useEffect } from 'react';
import { getDivinationStick } from '../services/geminiService';
import type { DivinationResult } from '../types';
import { Card } from './UI';
import { YinYangIcon, LotusIcon, DivinationSticksIcon, SparklesIcon } from './Icons';
import { SupportInfo } from './SupportInfo';
import { useLanguage } from '../contexts/LanguageContext';

type Stage = 'initial' | 'focus' | 'loading' | 'result';

const Divination: React.FC = () => {
    const { language, t } = useLanguage();
    const [result, setResult] = useState<DivinationResult | null>(null);
    const [stage, setStage] = useState<Stage>('initial');
    const [isShaking, setIsShaking] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      setResult(null); setStage('initial'); setError(null); setIsShaking(false);
    }, [language]);

    const handleShake = () => {
        setStage('loading'); setError(null); setIsShaking(true);
        const shakeAudio = document.getElementById('shake-sound') as HTMLAudioElement | null;
        if (shakeAudio) { shakeAudio.currentTime = 0; shakeAudio.play().catch(e => console.error("Shake sound failed", e)); }

        setTimeout(async () => {
            try {
                const res = await getDivinationStick(language);
                setResult(res); setStage('result');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.'); setStage('initial');
            } finally {
                setIsShaking(false);
            }
        }, 1500);
    };

    const resetDivination = () => {
      setResult(null); setStage('initial'); setError(null);
    };
    
    const getStickNameColor = (name: string) => {
        const lowerCaseName = name.toLowerCase();
        if (lowerCaseName.includes('thượng') || lowerCaseName.includes('cát') || lowerCaseName.includes('superior') || lowerCaseName.includes('great luck')) return 'text-green-400';
        if (lowerCaseName.includes('hạ') || lowerCaseName.includes('inferior') || lowerCaseName.includes('bad luck')) return 'text-red-400';
        return 'text-amber-400';
    }
    
    const renderTextWithNewlines = (text: string) => text.split('\n').filter(p => p.trim() !== '').map((p, i) => <p key={i} className="mb-2">{p}</p>);

    const InitialContent = ({ onNext }: { onNext: () => void }) => (
        <>
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{t('divination.initial.title')}</h2>
            <p className="text-gray-400 mb-8 max-w-xl">{t('divination.initial.description')}</p>
            <DivinationSticksIcon aria-label={t('divination.initial.alt')} className="w-40 h-40 text-amber-300/80 my-8"/>
            <button onClick={onNext} className="btn-primary flex items-center gap-2 mx-auto">
                <YinYangIcon className="w-6 h-6" /> {t('divination.initial.button')}
            </button>
        </>
    );

    const FocusContent = ({ onShake, isLoading }: { onShake: () => void; isLoading: boolean; }) => (
        <>
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{t('divination.initial.title')}</h2>
            <p className="text-gray-300 mb-8 max-w-xl animate-fade-in">{t('divination.initial.focusMessage')}</p>
            <div className={`my-8 relative ${isLoading ? '' : 'animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]'}`}>
                 <DivinationSticksIcon 
                    aria-label={t('divination.initial.alt')}
                    className={`w-40 h-40 text-amber-300/80 transition-transform duration-300 ${isShaking ? 'animate-shake' : 'hover:scale-105'}`}
                />
            </div>
            <button onClick={onShake} disabled={isLoading} className="btn-primary flex items-center gap-2 mx-auto">
                 {isLoading ? (
                    <><svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> {t('divination.initial.loadingButton')}</>
                 ) : (
                     <><YinYangIcon className="w-6 h-6" /> {t('divination.initial.shakeButton')}</>
                 )}
            </button>
        </>
    );

    return (
        <div className="max-w-4xl mx-auto">
            {stage !== 'result' && (
                <Card><div className="p-6 text-center flex flex-col items-center min-h-[500px] justify-center">
                   {stage === 'initial' && <InitialContent onNext={() => setStage('focus')} />}
                   {(stage === 'focus' || stage === 'loading') && <FocusContent onShake={handleShake} isLoading={stage === 'loading'} />}
                </div></Card>
            )}

            {error && <div className="mt-8 text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}

            {stage === 'result' && result && (
                 <div className="space-y-8 animate-fade-in-up">
                    <Card><div className="p-6 text-center">
                        <p className="text-amber-300">{t('divination.result.stickNumberLabel')}</p>
                        <h2 className="text-7xl font-bold my-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{result.stickNumber}</h2>
                        <p className={`text-2xl font-bold ${getStickNameColor(result.name)}`}>{result.name}</p>
                    </div></Card>

                    <Card>
                        <div className="p-6 bg-black/20">
                            <h3 className="text-xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{t('divination.result.poemTitle')}</h3>
                            <div className="text-center font-serif text-xl italic text-gray-300 whitespace-pre-line">{result.poem}</div>
                        </div>
                    </Card>
                    
                    <Card>
                        <div className="p-6 space-y-4">
                            <h3 className="text-xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{t('divination.result.interpretationTitle')}</h3>
                             <div className="space-y-4">
                                <p><strong className="text-amber-400">{t('horoscope.result.lifetime.overview')}:</strong> {renderTextWithNewlines(result.interpretation.overview)}</p>
                                <p><strong className="text-amber-400">{t('horoscope.result.lifetime.career')}:</strong> {renderTextWithNewlines(result.interpretation.career)}</p>
                                <p><strong className="text-amber-400">{t('horoscope.result.lifetime.love')}:</strong> {renderTextWithNewlines(result.interpretation.love)}</p>
                                <p><strong className="text-amber-400">{t('horoscope.result.lifetime.health')}:</strong> {renderTextWithNewlines(result.interpretation.health)}</p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400 flex items-center justify-center gap-2"><SparklesIcon className="w-6 h-6" /> {t('divination.result.adviceTitle')}</h3>
                            <div className="text-gray-300 mt-1">{renderTextWithNewlines(result.advice)}</div>
                        </div>
                    </Card>
                    
                    <Card>
                        <div className="text-center text-gray-300 space-y-4 p-6">
                            <div className="flex justify-center"><LotusIcon className="w-10 h-10 text-amber-300/80" /></div>
                            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{t('divination.support.title')}</h3>
                            <p className="max-w-2xl mx-auto">{t('divination.support.description')}</p>
                            <div className="pt-4 max-w-xl mx-auto"><SupportInfo /></div>
                        </div>
                    </Card>
                    
                    <div className="text-center mt-8">
                         <button onClick={resetDivination} className="btn-secondary flex items-center gap-2 mx-auto">
                           <YinYangIcon className="w-6 h-6"/> {t('divination.result.newButton')}
                        </button>
                    </div>

                 </div>
            )}
        </div>
    );
};

export default Divination;