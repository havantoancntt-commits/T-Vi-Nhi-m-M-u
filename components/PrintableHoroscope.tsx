import React from 'react';
import type { AnalysisResult, BirthData } from '../types';
import { Logo } from './Logo';
import { useLanguage } from '../contexts/LanguageContext';

interface PrintableHoroscopeProps {
  analysis: AnalysisResult;
  birthData: BirthData;
}

export const PrintableHoroscope: React.FC<PrintableHoroscopeProps> = ({ analysis, birthData }) => {
    const { t, language } = useLanguage();
    const genderText = birthData.gender === 'male' ? t('horoscope.form.male') : t('horoscope.form.female');
    const locale = language === 'en' ? 'en-US' : 'vi-VN';

    const Section: React.FC<{title: string; children: React.ReactNode}> = ({title, children}) => (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-amber-500 pb-2 mb-3 font-serif">{title}</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
                {children}
            </div>
        </div>
    );

    const renderTextWithNewlines = (text: string) => {
        return text.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ));
    };

    return (
        <div id="printable-horoscope" className="p-8 bg-white text-black w-[800px] font-sans">
            <header className="flex items-center justify-between pb-4 border-b-2 border-gray-200">
                <div className="text-left">
                    <h1 className="text-4xl font-bold text-gray-900 font-serif">{t('header.title')}</h1>
                    <p className="text-gray-600">{t('printable.title')}</p>
                </div>
                <Logo className="w-24 h-24" />
            </header>

            <section className="my-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h2 className="text-lg font-bold text-amber-800 font-serif mb-2">{t('printable.userInfo')}</h2>
                <div className="grid grid-cols-3 gap-4 text-sm">
                    <div><strong>{t('horoscope.form.dob')}:</strong> {new Date(birthData.date).toLocaleDateString(locale)}</div>
                    <div><strong>{t('horoscope.form.tob')}:</strong> {birthData.time}</div>
                    <div><strong>{t('horoscope.form.gender')}:</strong> {genderText}</div>
                </div>
            </section>

            <main>
                <Section title={t('horoscope.result.summary.title')}>
                    <div className="grid grid-cols-2 gap-4">
                        <p><strong>{t('horoscope.result.summary.mainElement')}:</strong> {analysis.chartSummary.mainElement}</p>
                        <p><strong>{t('horoscope.result.summary.zodiacAnimal')}:</strong> {analysis.chartSummary.zodiacAnimal}</p>
                        <p><strong>{t('horoscope.result.summary.westernZodiac')}:</strong> {analysis.chartSummary.westernZodiac}</p>
                        <p><strong>{t('horoscope.result.summary.destinyPalace')}:</strong> {analysis.chartSummary.destinyPalace}</p>
                    </div>
                </Section>

                <Section title={t('horoscope.result.lifetime.title')}>
                    <h3 className="font-bold text-md text-gray-800 font-serif">{t('horoscope.result.lifetime.overview')}</h3>
                    {renderTextWithNewlines(analysis.lifetimeAnalysis.overview)}
                    
                    <h3 className="font-bold text-md text-gray-800 font-serif mt-4">{t('horoscope.result.lifetime.career')}</h3>
                    {renderTextWithNewlines(analysis.lifetimeAnalysis.career)}

                    <h3 className="font-bold text-md text-gray-800 font-serif mt-4">{t('horoscope.result.lifetime.wealth')}</h3>
                    {renderTextWithNewlines(analysis.lifetimeAnalysis.wealth)}

                    <h3 className="font-bold text-md text-gray-800 font-serif mt-4">{t('horoscope.result.lifetime.love')}</h3>
                    {renderTextWithNewlines(analysis.lifetimeAnalysis.loveAndMarriage)}

                    <h3 className="font-bold text-md text-gray-800 font-serif mt-4">{t('horoscope.result.lifetime.health')}</h3>
                    {renderTextWithNewlines(analysis.lifetimeAnalysis.health)}

                    <h3 className="font-bold text-md text-gray-800 font-serif mt-4">{t('horoscope.result.lifetime.family')}</h3>
                    {renderTextWithNewlines(analysis.lifetimeAnalysis.family)}
                </Section>

                <Section title={t('horoscope.result.lucky.title')}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <p><strong>{t('horoscope.result.lucky.numbers')}:</strong> {analysis.luckyAdvice.luckyNumbers.join(', ')}</p>
                        <p><strong>{t('horoscope.result.lucky.colors')}:</strong> {analysis.luckyAdvice.luckyColors.join(', ')}</p>
                        <p><strong>{t('horoscope.result.lucky.zodiacs')}:</strong> {analysis.luckyAdvice.compatibleZodiacs.join(', ')}</p>
                    </div>
                     <div>
                        <h3 className="font-bold text-md text-green-700 font-serif">{t('horoscope.result.lucky.dos')}:</h3>
                        {renderTextWithNewlines(analysis.luckyAdvice.thingsToDo)}
                    </div>
                     <div className="mt-4">
                        <h3 className="font-bold text-md text-red-700 font-serif">{t('horoscope.result.lucky.donts')}:</h3>
                        {renderTextWithNewlines(analysis.luckyAdvice.thingsToAvoid)}
                    </div>
                </Section>
            </main>

            <footer className="text-center text-xs text-gray-500 pt-4 mt-6 border-t border-gray-200">
                <p>{t('printable.footer', { year: new Date().getFullYear() })}</p>
            </footer>
        </div>
    );
};
