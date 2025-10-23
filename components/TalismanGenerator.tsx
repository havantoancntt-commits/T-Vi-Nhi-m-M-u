

import React, { useState, useCallback, useMemo } from 'react';
import { generateTalisman } from '../services/geminiService';
import type { TalismanResult } from '../types';
import { Card, Loader } from './UI';
import { UserIcon, CalendarIcon, TalismanIcon, DownloadIcon, LotusIcon, SparklesIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';
import { SupportInfo } from './SupportInfo';

const TalismanGenerator: React.FC = () => {
    const { language, t } = useLanguage();
    const currentYear = new Date().getFullYear();

    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('1990-01-01');
    const [wish, setWish] = useState(Object.keys(t('talisman.wishTypes'))[0]);
    
    const [result, setResult] = useState<TalismanResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { year, month, day } = useMemo(() => {
        const [y, m, d] = birthDate.split('-').map(Number);
        return { year: y, month: m, day: d };
    }, [birthDate]);

    const handleDateChange = (part: 'day' | 'month' | 'year', value: string) => {
        let newYear = year, newMonth = month, newDay = day;
        if (part === 'year') newYear = parseInt(value, 10);
        if (part === 'month') newMonth = parseInt(value, 10);
        if (part === 'day') newDay = parseInt(value, 10);

        const daysInNewMonth = new Date(newYear, newMonth, 0).getDate();
        if (newDay > daysInNewMonth) newDay = daysInNewMonth;

        setBirthDate(`${newYear}-${String(newMonth).padStart(2, '0')}-${String(newDay).padStart(2, '0')}`);
    };

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError(language === 'vi' ? 'Vui lòng nhập họ và tên của bạn.' : 'Please enter your full name.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await generateTalisman({ name, birthDate, wish: t('talisman.wishTypes')[wish] }, language);
            setResult(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [name, birthDate, wish, language, t]);

    const handleDownload = () => {
        if (!result) return;
        const extension = result.mimeType === 'image/svg+xml' ? 'svg' : 'png';
        const link = document.createElement('a');
        link.href = `data:${result.mimeType};base64,${result.imageData}`;
        link.download = `Talisman-HuyenPhongPhatDao-${name.replace(/\s/g, '_')}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const resetForm = () => {
        setResult(null);
        setError(null);
    };

    const selectClassName = "input-base";
    const selectStyle = { backgroundPosition: 'right 0.7rem center', backgroundRepeat: 'no-repeat', backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="%23fcd34d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 8 4 4 4-4"/></svg>')` };
    
    const years = Array.from({ length: 101 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const wishTypes = t('talisman.wishTypes');

    if (isLoading) {
        return <Loader message={t('talisman.loaderMessage')} />;
    }

    if (result) {
        return (
            <div className="max-w-md mx-auto space-y-6 opacity-0 animate-fade-in-up">
                 <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{t('talisman.result.title')}</h2>
                <Card contentClassName="p-0">
                    <img src={`data:${result.mimeType};base64,${result.imageData}`} alt={t('talisman.result.title')} className="w-full h-auto" />
                     <div className="p-6 space-y-6">
                        <p className="text-center text-gray-300 italic text-lg">"{result.blessingText}"</p>
                        
                        <div className="pt-4 border-t border-white/10 space-y-2">
                             <h4 className="flex items-center gap-2 font-bold text-amber-400 text-md">
                                <SparklesIcon className="w-5 h-5" />
                                {t('talisman.result.symbolismTitle')}
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{result.explanation}</p>
                        </div>

                         <div className="pt-4 border-t border-white/10 space-y-2">
                             <h4 className="flex items-center gap-2 font-bold text-amber-400 text-md">
                                <LotusIcon className="w-5 h-5" />
                                {t('talisman.result.instructionsTitle')}
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{result.instructions}</p>
                        </div>
                    </div>
                </Card>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={handleDownload} className="w-full btn-primary flex items-center justify-center gap-2">
                        <DownloadIcon className="w-5 h-5" /> {t('talisman.result.downloadButton')}
                    </button>
                    <button onClick={resetForm} className="w-full btn-secondary flex items-center justify-center gap-2">
                        <TalismanIcon className="w-5 h-5" /> {t('talisman.result.newButton')}
                    </button>
                </div>
                 <Card>
                    <div className="text-center text-gray-300 space-y-4 p-6">
                        <div className="flex justify-center"><LotusIcon className="w-10 h-10 text-amber-300/80" /></div>
                        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{t('talisman.support.title')}</h3>
                        <p className="max-w-2xl mx-auto text-sm">{t('talisman.support.description')}</p>
                        <div className="pt-4 max-w-xl mx-auto"><SupportInfo /></div>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{t('talisman.form.title')}</h2>
                    <p className="text-center text-gray-400 mb-8 max-w-xl mx-auto">{t('talisman.form.description')}</p>
                    
                    <div className="space-y-6">
                        <div>
                             <label htmlFor="name-input" className="flex items-center gap-2 text-sm font-medium text-amber-300 mb-2"><UserIcon className="w-4 h-4" />{t('talisman.form.name')}</label>
                             <input 
                                id="name-input"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="input-base"
                                required
                             />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-amber-300 mb-2"><CalendarIcon/> {t('talisman.form.dob')}</label>
                            <div className="grid grid-cols-3 gap-3">
                                <select value={day} onChange={(e) => handleDateChange('day', e.target.value)} className={selectClassName} style={selectStyle}>
                                    {days.map(d => <option key={d} value={d} className="bg-gray-800">{d}</option>)}
                                </select>
                                <select value={month} onChange={(e) => handleDateChange('month', e.target.value)} className={selectClassName} style={selectStyle}>
                                    {months.map(m => <option key={m} value={m} className="bg-gray-800">{m}</option>)}
                                </select>
                                <select value={year} onChange={(e) => handleDateChange('year', e.target.value)} className={selectClassName} style={selectStyle}>
                                    {years.map(y => <option key={y} value={y} className="bg-gray-800">{y}</option>)}
                                </select>
                            </div>
                        </div>

                         <div>
                            <label htmlFor="wish-select" className="flex items-center gap-2 text-sm font-medium text-amber-300 mb-2"><TalismanIcon className="w-4 h-4" />{t('talisman.form.wish')}</label>
                            <select id="wish-select" value={wish} onChange={(e) => setWish(e.target.value)} className={`${selectClassName} appearance-none`} style={selectStyle}>
                                {Object.entries(wishTypes).map(([key, value]) => (
                                    <option key={key} value={key} className="bg-gray-800">{value as string}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {error && <div className="mt-6 text-center text-red-400 bg-red-900/50 p-3 rounded-lg text-sm">{error}</div>}

                    <div className="text-center mt-8">
                        <button type="submit" disabled={isLoading} className="btn-primary flex items-center gap-2 mx-auto">
                            <TalismanIcon /> {isLoading ? t('talisman.form.loadingButton') : t('talisman.form.submitButton')}
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default TalismanGenerator;