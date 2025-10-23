import React, { useState, useCallback, useMemo } from 'react';
import { generateHoroscope } from '../services/geminiService';
import type { BirthData, AnalysisResult } from '../types';
import { Card, Loader, Modal } from './UI';
import { SparklesIcon, UserIcon, CalendarIcon, ClockIcon, BriefcaseIcon, DollarSignIcon, HeartIcon, ShieldCheckIcon, UsersIcon, LotusIcon, DownloadIcon, ChartBarIcon, GiftIcon } from './Icons';
import { PrintableHoroscope } from './PrintableHoroscope';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SupportInfo } from './SupportInfo';
import { useLanguage } from '../contexts/LanguageContext';
import { UserInputGuide } from './UserInputGuide';

type ResultTab = 'summary' | 'lifetime' | 'lucky';

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
  const [activeResultTab, setActiveResultTab] = useState<ResultTab>('summary');

  const { year, month, day } = useMemo(() => {
    const [y, m, d] = birthData.date.split('-').map(Number);
    return { year: y, month: m, day: d };
  }, [birthData.date]);

  const handleDateChange = (part: 'day' | 'month' | 'year', value: string) => {
    let newYear = year, newMonth = month, newDay = day;
    if (part === 'year') newYear = parseInt(value, 10);
    if (part === 'month') newMonth = parseInt(value, 10);
    if (part === 'day') newDay = parseInt(value, 10);

    const daysInNewMonth = new Date(newYear, newMonth, 0).getDate();
    if (newDay > daysInNewMonth) newDay = daysInNewMonth;

    setBirthData(prev => ({ ...prev, date: `${newYear}-${String(newMonth).padStart(2, '0')}-${String(newDay).padStart(2, '0')}` }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBirthData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
        const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        let position = 0;
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        let heightLeft = pdfHeight - pdf.internal.pageSize.getHeight();

        while (heightLeft > 0) {
            position = -heightLeft;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();
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

  const AnalysisSection = ({ icon, title, content }: { icon: React.ReactNode; title: string; content: string; }) => (
      <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-amber-400/10 text-amber-300">{icon}</div>
          <div>
              <h4 className="font-bold text-amber-400 text-lg">{title}</h4>
              <div className="text-gray-300 mt-1 space-y-3 prose prose-invert max-w-none prose-p:my-2">
                {content.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
          </div>
      </div>
  );
  
  const SummaryItem = ({ label, value }: { label: string; value: string; }) => (
      <div className="p-4 bg-white/5 rounded-lg text-center transform transition hover:bg-white/10 hover:-translate-y-1">
          <p className="text-sm text-amber-300 font-semibold">{label}</p>
          <p className="font-bold text-lg text-white">{value}</p>
      </div>
  );

  const ResultTabButton = ({ tab, label, icon }: { tab: ResultTab, label: string, icon: React.ReactNode}) => (
    <button onClick={() => setActiveResultTab(tab)} className={`flex-1 p-3 text-sm font-bold flex items-center justify-center gap-2 rounded-t-lg transition-colors ${activeResultTab === tab ? 'bg-white/5 text-amber-300' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
        {icon}
        <span>{label}</span>
    </button>
  );

  const selectClassName = "input-base appearance-none";
  const selectStyle = { backgroundPosition: 'right 0.7rem center', backgroundRepeat: 'no-repeat', backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="%23fcd34d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 8 4 4 4-4"/></svg>')`};
  const years = Array.from({ length: 101 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => i + 1);

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{t('horoscope.form.title')}</h2>
          <p className="text-center text-gray-400 mb-8 max-w-xl mx-auto">{t('horoscope.form.description')}</p>
          
          <UserInputGuide title={t('guide.horoscope.title')} content={t('guide.horoscope.content')} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-amber-300 mb-2"><CalendarIcon />{t('horoscope.form.dob')}</label>
                <div className="grid grid-cols-3 gap-3">
                    <select value={day} onChange={(e) => handleDateChange('day', e.target.value)} className={selectClassName} style={selectStyle} aria-label="Day">{days.map(d => <option key={d} value={d} className="bg-gray-800">{d}</option>)}</select>
                    <select value={month} onChange={(e) => handleDateChange('month', e.target.value)} className={selectClassName} style={selectStyle} aria-label="Month">{months.map(m => <option key={m} value={m} className="bg-gray-800">{m}</option>)}</select>
                    <select value={year} onChange={(e) => handleDateChange('year', e.target.value)} className={selectClassName} style={selectStyle} aria-label="Year">{years.map(y => <option key={y} value={y} className="bg-gray-800">{y}</option>)}</select>
                </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-amber-300 mb-2"><ClockIcon />{t('horoscope.form.tob')}</label>
                    <input type="time" name="time" value={birthData.time} onChange={handleInputChange} className="input-base"/>
                </div>
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-amber-300 mb-2"><UserIcon />{t('horoscope.form.gender')}</label>
                    <select name="gender" value={birthData.gender} onChange={handleInputChange} className={selectClassName} style={selectStyle}>
                        <option value="male" className="bg-gray-800">{t('horoscope.form.male')}</option>
                        <option value="female" className="bg-gray-800">{t('horoscope.form.female')}</option>
                    </select>
                </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <button type="submit" disabled={isLoading} className="btn-primary flex items-center gap-2 mx-auto">
              <SparklesIcon /> {isLoading ? t('horoscope.form.loadingButton') : t('horoscope.form.submitButton')}
            </button>
          </div>
        </form>
      </Card>

      {isLoading && <Loader message={t('horoscope.loaderMessage')} />}
      {error && <div className="mt-8 text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}

      {analysis && (
        <>
        <div className="mt-10 space-y-8 animate-fade-in">
            <Card contentClassName="p-0">
                <div className="flex border-b border-white/10 bg-black/20">
                    <ResultTabButton tab="summary" label={t('horoscope.result.tabs.summary')} icon={<ChartBarIcon className="w-5 h-5" />} />
                    <ResultTabButton tab="lifetime" label={t('horoscope.result.tabs.lifetime')} icon={<UserIcon className="w-5 h-5" />} />
                    <ResultTabButton tab="lucky" label={t('horoscope.result.tabs.lucky')} icon={<GiftIcon className="w-5 h-5" />} />
                </div>

                <div className="p-6">
                    {activeResultTab === 'summary' && (
                        <div className="animate-fade-in grid grid-cols-2 md:grid-cols-4 gap-4">
                            <SummaryItem label={t('horoscope.result.summary.mainElement')} value={analysis.chartSummary.mainElement} />
                            <SummaryItem label={t('horoscope.result.summary.zodiacAnimal')} value={analysis.chartSummary.zodiacAnimal} />
                            <SummaryItem label={t('horoscope.result.summary.westernZodiac')} value={analysis.chartSummary.westernZodiac} />
                            <SummaryItem label={t('horoscope.result.summary.destinyPalace')} value={analysis.chartSummary.destinyPalace} />
                        </div>
                    )}
                    {activeResultTab === 'lifetime' && (
                        <div className="animate-fade-in space-y-6">
                            <AnalysisSection icon={<UserIcon className="w-5 h-5"/>} title={t('horoscope.result.lifetime.overview')} content={analysis.lifetimeAnalysis.overview} />
                            <AnalysisSection icon={<BriefcaseIcon className="w-5 h-5"/>} title={t('horoscope.result.lifetime.career')} content={analysis.lifetimeAnalysis.career} />
                            <AnalysisSection icon={<DollarSignIcon className="w-5 h-5"/>} title={t('horoscope.result.lifetime.wealth')} content={analysis.lifetimeAnalysis.wealth} />
                            <AnalysisSection icon={<HeartIcon className="w-5 h-5"/>} title={t('horoscope.result.lifetime.love')} content={analysis.lifetimeAnalysis.loveAndMarriage} />
                            <AnalysisSection icon={<ShieldCheckIcon className="w-5 h-5"/>} title={t('horoscope.result.lifetime.health')} content={analysis.lifetimeAnalysis.health} />
                            <AnalysisSection icon={<UsersIcon className="w-5 h-5"/>} title={t('horoscope.result.lifetime.family')} content={analysis.lifetimeAnalysis.family} />
                            <hr className="border-white/10 my-4" />
                            <AnalysisSection icon={<SparklesIcon className="w-5 h-5"/>} title={t('horoscope.result.lifetime.synthesis')} content={analysis.lifetimeAnalysis.synthesis} />
                        </div>
                    )}
                    {activeResultTab === 'lucky' && (
                        <div className="animate-fade-in space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
                                <p><strong className="text-amber-400 font-semibold">{t('horoscope.result.lucky.numbers')}:</strong> <span className="text-white">{analysis.luckyAdvice.luckyNumbers.join(', ')}</span></p>
                                <p><strong className="text-amber-400 font-semibold">{t('horoscope.result.lucky.colors')}:</strong> <span className="text-white">{analysis.luckyAdvice.luckyColors.join(', ')}</span></p>
                                <p><strong className="text-amber-400 font-semibold">{t('horoscope.result.lucky.zodiacs')}:</strong> <span className="text-white">{analysis.luckyAdvice.compatibleZodiacs.join(', ')}</span></p>
                            </div>
                            <div className="mt-6 space-y-6">
                                <div>
                                    <strong className="text-green-400 font-semibold">{t('horoscope.result.lucky.dos')}:</strong>
                                    <div className="text-gray-300 space-y-2 mt-1">{analysis.luckyAdvice.thingsToDo.split('\n').filter(p => p.trim() !== '').map((p, i) => <p key={i}>{p}</p>)}</div>
                                </div>
                                <div>
                                    <strong className="text-red-400 font-semibold">{t('horoscope.result.lucky.donts')}:</strong>
                                    <div className="text-gray-300 space-y-2 mt-1">{analysis.luckyAdvice.thingsToAvoid.split('\n').filter(p => p.trim() !== '').map((p, i) => <p key={i}>{p}</p>)}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>

           <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={() => setIsDownloadModalOpen(true)} className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                    <DownloadIcon className="w-6 h-6" /> {t('horoscope.pdf.button')}
                </button>
                <button onClick={() => setIsSupportModalOpen(true)} className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2">
                    <LotusIcon className="w-6 h-6" /> {t('horoscope.support.button')}
                </button>
            </div>
        </div>
        
        <div style={{ position: 'absolute', left: '-9999px', top: 0, zIndex: -100 }}>
            <PrintableHoroscope analysis={analysis} birthData={birthData} />
        </div>
      </>
      )}

      <Modal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} title={t('horoscope.support.modalTitle')}>
          <div className="text-center text-gray-300 space-y-6"><p>{t('horoscope.support.modalText1')}</p><SupportInfo /><p className="pt-4 border-t border-white/10">{t('horoscope.support.modalText2')}</p></div>
      </Modal>

      <Modal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} title={t('horoscope.pdf.modalTitle')}>
          <div className="text-center text-gray-300 space-y-6">
              <p>{t('horoscope.pdf.modalText')}</p><SupportInfo />
              <div className="pt-6 border-t border-white/10">
                <button onClick={handleDownloadPdf} disabled={isDownloading} className="btn-primary w-full flex items-center justify-center gap-2">
                    {isDownloading ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>{t('horoscope.pdf.loadingButton')}</>) : t('horoscope.pdf.completeButton')}
                </button>
              </div>
          </div>
      </Modal>

    </div>
  );
};

export default HoroscopeGenerator;