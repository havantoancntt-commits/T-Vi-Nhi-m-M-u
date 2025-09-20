import React, { useState, useCallback, useMemo } from 'react';
import { selectAuspiciousDate } from '../services/geminiService';
import type { AuspiciousDate, DateSelectionData } from '../types';
import { Card, Loader } from './UI';
import { CalendarIcon, CalendarCheckIcon, ClockIcon, SparklesIcon, AlertTriangleIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

const ScoreCircle = ({ score }: { score: number }) => {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    // Ensure the offset calculation is safe for scores outside 0-100
    const scorePercentage = Math.max(0, Math.min(100, score));
    const offset = circumference - (scorePercentage / 100) * circumference;
    const color = score >= 85 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400';

    return (
        <div className={`relative w-20 h-20 ${color}`}>
            <svg className="w-full h-full" viewBox="0 0 70 70">
                <circle className="text-gray-600" strokeWidth="5" stroke="currentColor" fill="transparent" r={radius} cx="35" cy="35" />
                <circle
                    className="transition-all duration-1000 ease-out"
                    strokeWidth="5"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="35"
                    cy="35"
                    transform="rotate(-90 35 35)"
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
                {score}
            </span>
        </div>
    );
};

const DateSelector: React.FC = () => {
    const { language, t } = useLanguage();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const [birthDate, setBirthDate] = useState('1990-01-01');
    const [targetYear, setTargetYear] = useState(currentYear);
    const [targetMonth, setTargetMonth] = useState(currentMonth);
    const [eventType, setEventType] = useState(Object.keys(t('dateSelection.form.eventTypes'))[0]);

    const [results, setResults] = useState<AuspiciousDate[] | null>(null);
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
        setIsLoading(true);
        setError(null);
        setResults(null);

        const requestData: DateSelectionData = {
            eventType: t('dateSelection.form.eventTypes')[eventType],
            birthDate: birthDate,
            targetMonth: targetMonth,
            targetYear: targetYear
        };

        try {
            const result = await selectAuspiciousDate(requestData, language);
            setResults(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [eventType, birthDate, targetMonth, targetYear, language, t]);

    const selectClassName = "w-full bg-white/10 p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition appearance-none text-white input-glow";
    const selectStyle = { backgroundPosition: 'right 0.7rem center', backgroundRepeat: 'no-repeat', backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="%23fcd34d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 8 4 4 4-4"/></svg>')` };
    
    const years = Array.from({ length: 101 }, (_, i) => currentYear - i);
    const searchYears = Array.from({ length: 5 }, (_, i) => currentYear + i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const eventTypes = t('dateSelection.form.eventTypes');

    const ResultCard: React.FC<{ date: AuspiciousDate, delay: string }> = ({ date, delay }) => {
        const locale = language === 'en' ? 'en-US' : 'vi-VN';
        const formattedDate = new Date(date.gregorianDate + 'T00:00:00').toLocaleDateString(locale, {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        return (
            <div className={`opacity-0 animate-fade-in-up ${delay}`}>
                <Card className="h-full">
                    <div className="p-4 bg-white/5 border-b border-indigo-400/20 flex flex-col items-center gap-2">
                        <h3 className="font-bold text-xl text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{formattedDate}</h3>
                        <p className="text-center text-gray-400 text-sm">{date.lunarDate}</p>
                         <div className="mt-2">
                            <ScoreCircle score={date.suitabilityScore} />
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                       <div className="flex items-start gap-3">
                            <SparklesIcon className="w-5 h-5 text-amber-300 mt-1 shrink-0" />
                            <div>
                                <h4 className="font-semibold text-amber-400">{t('dateSelection.results.explanation')}</h4>
                                <p className="text-gray-300 text-sm">{date.explanation}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 mt-2 border-t border-white/10">
                            <div>
                                <h4 className="font-semibold text-green-400 mb-1 flex items-center gap-2"><SparklesIcon className="w-4 h-4"/>{t('dateSelection.results.auspiciousStars')}</h4>
                                <p className="text-gray-300 text-sm">{date.auspiciousStars.join(', ')}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-red-400 mb-1 flex items-center gap-2"><AlertTriangleIcon className="w-4 h-4"/>{t('dateSelection.results.inauspiciousStars')}</h4>
                                <p className="text-gray-300 text-sm">{date.inauspiciousStars.join(', ')}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 pt-4 border-t border-white/10">
                            <ClockIcon className="w-5 h-5 text-amber-300 mt-1 shrink-0" />
                            <div>
                                <h4 className="font-semibold text-amber-400">{t('dateSelection.results.goodHours')}</h4>
                                <p className="text-gray-300 text-sm">{date.goodHours}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <AlertTriangleIcon className="w-5 h-5 text-yellow-500 mt-1 shrink-0" />
                            <div>
                                <h4 className="font-semibold text-yellow-500">{t('dateSelection.results.conflictingZodiacs')}</h4>
                                <p className="text-gray-300 text-sm">{date.conflictingZodiacs.join(', ')}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{t('dateSelection.form.title')}</h2>
                    <p className="text-center text-gray-400 mb-8 max-w-xl mx-auto">{t('dateSelection.form.description')}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-amber-300 mb-2">{t('dateSelection.form.eventType')}</label>
                            <select value={eventType} onChange={(e) => setEventType(e.target.value)} className={selectClassName} style={selectStyle}>
                                {Object.entries(eventTypes).map(([key, value]) => (
                                    <option key={key} value={key} className="bg-gray-800">{value as string}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm font-medium text-amber-300 mb-2">{t('dateSelection.form.targetMonth')}</label>
                                <select value={targetMonth} onChange={(e) => setTargetMonth(Number(e.target.value))} className={selectClassName} style={selectStyle}>
                                    {months.map(m => <option key={m} value={m} className="bg-gray-800">{m}</option>)}
                                </select>
                            </div>
                             <div>
                                <label className="text-sm font-medium text-amber-300 mb-2">{t('dateSelection.form.targetYear')}</label>
                                <select value={targetYear} onChange={(e) => setTargetYear(Number(e.target.value))} className={selectClassName} style={selectStyle}>
                                    {searchYears.map(y => <option key={y} value={y} className="bg-gray-800">{y}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <label className="flex items-center gap-2 text-sm font-medium text-amber-300 mb-2"><CalendarIcon/> {t('dateSelection.form.birthDate')}</label>
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

                    <div className="text-center mt-8">
                        <button type="submit" disabled={isLoading} className="btn-shine bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-amber-400/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto">
                            <CalendarCheckIcon /> {isLoading ? t('dateSelection.form.loadingButton') : t('dateSelection.form.submitButton')}
                        </button>
                    </div>
                </form>
            </Card>

            {isLoading && <Loader message={t('dateSelection.loaderMessage')} />}
            {error && <div className="mt-8 text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}

            {results && (
                <div className="mt-10">
                    {results.length > 0 ? (
                        <>
                         <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400 opacity-0 animate-fade-in-up">{t('dateSelection.results.title')}</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {results.map((date, index) => (
                                <ResultCard key={date.gregorianDate} date={date} delay={`animation-delay-[${index * 200}ms]`} />
                            ))}
                        </div>
                        </>
                    ) : (
                         <div className="mt-8 text-center text-amber-300 bg-amber-900/50 p-4 rounded-lg">{t('dateSelection.results.noResults')}</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DateSelector;
