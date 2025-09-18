import React, { useState, useCallback, useMemo } from 'react';
import { generateHoroscope } from '../services/geminiService';
import type { BirthData, AnalysisResult } from '../types';
import { Card, Loader, Modal } from './UI';
import { SparklesIcon, UserIcon, CalendarIcon, ClockIcon, BriefcaseIcon, DollarSignIcon, HeartIcon, ShieldCheckIcon, UsersIcon, LotusIcon, DownloadIcon } from './Icons';
import { PrintableHoroscope } from './PrintableHoroscope';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SupportInfo } from './SupportInfo';
import { useLanguage } from '../contexts/LanguageContext';

const HoroscopeGenerator: React.FC = () => {
  const { language, t } = useLanguage();
  const [birthData, setBirthData] = useState<BirthData>({
    date: '1990-01-01',
    time: '12:00',
    gender: 'male',
  });
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const { year, month, day } = useMemo(() => {
    const [y, m, d] = birthData.date.split('-').map(Number);
    return { year: y, month: m, day: d };
  }, [birthData.date]);

  const handleDateChange = (part: 'day' | 'month' | 'year', value: string) => {
    let newYear = year;
    let newMonth = month;
    let newDay = day;

    switch (part) {
      case 'year':
        newYear = parseInt(value, 10);
        break;
      case 'month':
        newMonth = parseInt(value, 10);
        break;
      case 'day':
        newDay = parseInt(value, 10);
        break;
    }

    const daysInNewMonth = new Date(newYear, newMonth, 0).getDate();
    if (newDay > daysInNewMonth) {
      newDay = daysInNewMonth;
    }

    const formattedDate = `${newYear}-${String(newMonth).padStart(2, '0')}-${String(newDay).padStart(2, '0')}`;
    setBirthData(prev => ({ ...prev, date: formattedDate }));
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBirthData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await generateHoroscope(birthData, language);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [birthData, language]);
  
  const handleDownloadPdf = async () => {
    const element = document.getElementById('printable-horoscope');
    if (!element) {
        setError(t('horoscope.pdf.errorNotFound'));
        return;
    }
    setIsDownloading(true);
    try {
        const canvas = await html2canvas(element, { 
            scale: 2,
            useCORS: true,
            backgroundColor: null,
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        let heightLeft = pdfHeight;
        let position = 0;
        const pageHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = -heightLeft;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(`Horoscope-HuyenPhongPhatDao-${birthData.date}.pdf`);
    } catch(err) {
        console.error("Error generating PDF:", err);
        setError(t('horoscope.pdf.errorGeneric'));
    } finally {
        setIsDownloading(false);
        setIsDownloadModalOpen(false);
    }
  };


  const InfoField = ({ icon, label, children, className = '' }: { icon: JSX.Element; label: string; children: React.ReactNode, className?: string }) => (
    <div className={className}>
      <label className="flex items-center gap-2 text-sm font-medium text-amber-300 mb-2">
        {icon} {label}
      </label>
      {children}
    </div>
  );

  const AnalysisSection = ({ icon, title, content, delay }: { icon: JSX.Element; title: string; content: string; delay: string; }) => (
      <div className={`flex items-start gap-4 opacity-0 animate-fade-in-up ${delay}`}>
          <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-amber-400/10 text-amber-300">
              {icon}
          </div>
          <div>
              <h4 className="font-bold text-amber-400 text-lg">{title}</h4>
              <div className="text-gray-300 mt-1 space-y-3">
                {content.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
          </div>
      </div>
  );
  
  const SummaryItem = ({ label, value, delay }: { label: string; value: string; delay: string; }) => (
      <div className={`p-4 bg-white/5 rounded-lg text-center transform transition hover:bg-white/10 hover:scale-105 opacity-0 animate-fade-in-up ${delay}`}>
          <p className="text-sm text-amber-300 font-semibold">{label}</p>
          <p className="font-bold text-lg text-white">{value}</p>
      </div>
  );

  const selectClassName = "w-full bg-white/10 p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition appearance-none text-white input-glow";
  const selectStyle = { backgroundPosition: 'right 0.7rem center', backgroundRepeat: 'no-repeat', backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="%23fcd34d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 8 4 4 4-4"/></svg>')`};
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);


  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{t('horoscope.form.title')}</h2>
          <p className="text-center text-gray-400 mb-8 max-w-xl mx-auto">{t('horoscope.form.description')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoField icon={<CalendarIcon />} label={t('horoscope.form.dob')} className="md:col-span-2">
              <div className="grid grid-cols-3 gap-3">
                 <div>
                  <label htmlFor="day-select" className="text-xs text-gray-400">{t('horoscope.form.day')}</label>
                  <select
                    id="day-select"
                    name="day"
                    value={day}
                    onChange={(e) => handleDateChange('day', e.target.value)}
                    className={selectClassName}
                    style={selectStyle}
                    aria-label="Day"
                  >
                    {days.map(d => <option key={d} value={d} className="bg-gray-800">{d}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="month-select" className="text-xs text-gray-400">{t('horoscope.form.month')}</label>
                  <select
                    id="month-select"
                    name="month"
                    value={month}
                    onChange={(e) => handleDateChange('month', e.target.value)}
                    className={selectClassName}
                    style={selectStyle}
                    aria-label="Month"
                  >
                    {months.map(m => <option key={m} value={m} className="bg-gray-800">{m}</option>)}
                  </select>
                </div>
                 <div>
                  <label htmlFor="year-select" className="text-xs text-gray-400">{t('horoscope.form.year')}</label>
                  <select
                    id="year-select"
                    name="year"
                    value={year}
                    onChange={(e) => handleDateChange('year', e.target.value)}
                    className={selectClassName}
                    style={selectStyle}
                    aria-label="Year"
                  >
                    {years.map(y => <option key={y} value={y} className="bg-gray-800">{y}</option>)}
                  </select>
                </div>
              </div>
            </InfoField>
            
            <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
              <InfoField icon={<ClockIcon />} label={t('horoscope.form.tob')}>
                <input
                  type="time"
                  name="time"
                  value={birthData.time}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition text-white input-glow"
                />
              </InfoField>
              <InfoField icon={<UserIcon />} label={t('horoscope.form.gender')}>
                <select
                  name="gender"
                  value={birthData.gender}
                  onChange={handleInputChange}
                  className={selectClassName}
                  style={selectStyle}
                >
                  <option value="male" className="bg-gray-800">{t('horoscope.form.male')}</option>
                  <option value="female" className="bg-gray-800">{t('horoscope.form.female')}</option>
                </select>
              </InfoField>
            </div>
          </div>
          <div className="text-center mt-8">
            <button type="submit" disabled={isLoading} className="btn-shine bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-amber-400/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto">
              <SparklesIcon /> {isLoading ? t('horoscope.form.loadingButton') : t('horoscope.form.submitButton')}
            </button>
          </div>
        </form>
      </Card>

      {isLoading && <Loader message={t('horoscope.loaderMessage')} />}
      {error && <div className="mt-8 text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}

      {analysis && (
        <>
        <div className="mt-10 space-y-8">
          <Card title={t('horoscope.result.summary.title')} className="opacity-0 animate-fade-in-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SummaryItem label={t('horoscope.result.summary.mainElement')} value={analysis.chartSummary.mainElement} delay="animation-delay-200" />
                <SummaryItem label={t('horoscope.result.summary.zodiacAnimal')} value={analysis.chartSummary.zodiacAnimal} delay="animation-delay-[300ms]" />
                <SummaryItem label={t('horoscope.result.summary.westernZodiac')} value={analysis.chartSummary.westernZodiac} delay="animation-delay-[400ms]" />
                <SummaryItem label={t('horoscope.result.summary.destinyPalace')} value={analysis.chartSummary.destinyPalace} delay="animation-delay-[500ms]" />
            </div>
          </Card>
          
          <Card title={t('horoscope.result.lifetime.title')} className="opacity-0 animate-fade-in-up animation-delay-[600ms]">
            <div className="space-y-6">
              <AnalysisSection icon={<UserIcon className="w-5 h-5"/>} title={t('horoscope.result.lifetime.overview')} content={analysis.lifetimeAnalysis.overview} delay="animation-delay-200" />
              <AnalysisSection icon={<BriefcaseIcon className="w-5 h-5"/>} title={t('horoscope.result.lifetime.career')} content={analysis.lifetimeAnalysis.career} delay="animation-delay-[300ms]" />
              <AnalysisSection icon={<DollarSignIcon className="w-5 h-5"/>} title={t('horoscope.result.lifetime.wealth')} content={analysis.lifetimeAnalysis.wealth} delay="animation-delay-[400ms]" />
              <AnalysisSection icon={<HeartIcon className="w-5 h-5"/>} title={t('horoscope.result.lifetime.love')} content={analysis.lifetimeAnalysis.loveAndMarriage} delay="animation-delay-[500ms]" />
              <AnalysisSection icon={<ShieldCheckIcon className="w-5 h-5"/>} title={t('horoscope.result.lifetime.health')} content={analysis.lifetimeAnalysis.health} delay="animation-delay-[600ms]" />
              <AnalysisSection icon={<UsersIcon className="w-5 h-5"/>} title={t('horoscope.result.lifetime.family')} content={analysis.lifetimeAnalysis.family} delay="animation-delay-[700ms]" />
            </div>
          </Card>
          
          <Card title={t('horoscope.result.lucky.title')} className="opacity-0 animate-fade-in-up animation-delay-[1400ms]">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <p><strong className="text-amber-400 font-semibold">{t('horoscope.result.lucky.numbers')}:</strong> <span className="text-white">{analysis.luckyAdvice.luckyNumbers.join(', ')}</span></p>
                <p><strong className="text-amber-400 font-semibold">{t('horoscope.result.lucky.colors')}:</strong> <span className="text-white">{analysis.luckyAdvice.luckyColors.join(', ')}</span></p>
                <p><strong className="text-amber-400 font-semibold">{t('horoscope.result.lucky.zodiacs')}:</strong> <span className="text-white">{analysis.luckyAdvice.compatibleZodiacs.join(', ')}</span></p>
             </div>
             <div className="mt-6 space-y-6">
                <div>
                  <strong className="text-green-400 font-semibold">{t('horoscope.result.lucky.dos')}:</strong>
                  <div className="text-gray-300 space-y-2 mt-1">
                    {analysis.luckyAdvice.thingsToDo.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <strong className="text-red-400 font-semibold">{t('horoscope.result.lucky.donts')}:</strong>
                   <div className="text-gray-300 space-y-2 mt-1">
                    {analysis.luckyAdvice.thingsToAvoid.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
             </div>
          </Card>

           <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up animation-delay-[1800ms]">
                <button 
                    onClick={() => setIsSupportModalOpen(true)}
                    className="btn-shine group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                >
                    <LotusIcon className="w-6 h-6 transition-transform group-hover:scale-110" />
                    {t('horoscope.support.button')}
                </button>
                <button 
                    onClick={() => setIsDownloadModalOpen(true)}
                    className="btn-shine group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                >
                    <DownloadIcon className="w-6 h-6 transition-transform group-hover:scale-110" />
                    {t('horoscope.pdf.button')}
                </button>
            </div>
        </div>
        
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
            <PrintableHoroscope analysis={analysis} birthData={birthData} />
        </div>
      </>
      )}

      <Modal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} title={t('horoscope.support.modalTitle')}>
          <div className="text-center text-gray-300 space-y-6">
              <p>{t('horoscope.support.modalText1')}</p>
              <SupportInfo />
              <p className="pt-4 border-t border-white/10">{t('horoscope.support.modalText2')}</p>
          </div>
      </Modal>

      <Modal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} title={t('horoscope.pdf.modalTitle')}>
          <div className="text-center text-gray-300 space-y-6">
              <p>{t('horoscope.pdf.modalText')}</p>
              <SupportInfo />
              <div className="pt-6 border-t border-white/10">
                <button 
                    onClick={handleDownloadPdf}
                    disabled={isDownloading}
                    className="btn-shine w-full group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-amber-400/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isDownloading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('horoscope.pdf.loadingButton')}
                      </>
                    ) : t('horoscope.pdf.completeButton')}
                </button>
              </div>
          </div>
      </Modal>

    </div>
  );
};

export default HoroscopeGenerator;