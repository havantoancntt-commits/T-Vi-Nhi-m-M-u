import React, { useState, useCallback, useMemo } from 'react';
import { generateHoroscope } from '../services/geminiService';
import type { BirthData, AnalysisResult } from '../types';
import { Card, Loader, Modal } from './UI';
import { SparklesIcon, UserIcon, CalendarIcon, ClockIcon, BriefcaseIcon, DollarSignIcon, HeartIcon, ShieldCheckIcon, UsersIcon, LotusIcon, CopyIcon, BankIcon, ZaloPayIcon, DownloadIcon } from './Icons';
import { PrintableHoroscope } from './PrintableHoroscope';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const HoroscopeGenerator: React.FC = () => {
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

  const [vcbCopied, setVcbCopied] = useState(false);
  const [zaloCopied, setZaloCopied] = useState(false);

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
      const result = await generateHoroscope(birthData);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [birthData]);
  
  const copyToClipboard = async (text: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Không thể sao chép. Vui lòng thử lại.');
    }
  };

  const handleDownloadPdf = async () => {
    const element = document.getElementById('printable-horoscope');
    if (!element) {
        setError("Không tìm thấy nội dung để tạo PDF.");
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

        pdf.save(`LaSo-HuyenPhongPhatDao-${birthData.date}.pdf`);
    } catch(err) {
        console.error("Error generating PDF:", err);
        setError("Đã có lỗi xảy ra khi tạo file PDF. Vui lòng thử lại.");
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

  const SupportInfo = () => (
     <div className="space-y-4 text-left">
        {/* Vietcombank */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-3 mb-2">
                <BankIcon className="w-6 h-6 text-green-400" />
                <h4 className="font-bold text-lg text-green-400">Ngân hàng Vietcombank</h4>
            </div>
            <p><strong>Chủ tài khoản:</strong> HA VAN TOAN</p>
            <div className="flex items-center justify-between mt-1">
                <p><strong>Số tài khoản:</strong> <span className="font-mono text-amber-300">0501000160764</span></p>
                <button onClick={() => copyToClipboard('0501000160764', setVcbCopied)} className={`flex items-center gap-1.5 text-sm px-3 py-1 rounded-md transition ${vcbCopied ? 'bg-green-500 text-white' : 'bg-gray-600 hover:bg-gray-500'}`}>
                    <CopyIcon className="w-4 h-4" /> {vcbCopied ? 'Đã sao chép' : 'Sao chép'}
                </button>
            </div>
        </div>
        {/* ZaloPay */}
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-3 mb-2">
                <ZaloPayIcon className="w-6 h-6 text-blue-400" />
                <h4 className="font-bold text-lg text-blue-400">Ví ZaloPay</h4>
            </div>
            <div className="flex items-center justify-between mt-1">
                <p><strong>Số điện thoại:</strong> <span className="font-mono text-amber-300">0974313633</span></p>
                <button onClick={() => copyToClipboard('0974313633', setZaloCopied)} className={`flex items-center gap-1.5 text-sm px-3 py-1 rounded-md transition ${zaloCopied ? 'bg-green-500 text-white' : 'bg-gray-600 hover:bg-gray-500'}`}>
                      <CopyIcon className="w-4 h-4" /> {zaloCopied ? 'Đã sao chép' : 'Sao chép'}
                </button>
            </div>
        </div>
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
          <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">Nhập Thông Tin Thân Chủ</h2>
          <p className="text-center text-gray-400 mb-8 max-w-xl mx-auto">Cung cấp thông tin ngày sinh chính xác để luận giải lá số tử vi của bạn một cách chuẩn xác nhất.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoField icon={<CalendarIcon />} label="Ngày Sinh Dương Lịch" className="md:col-span-2">
              <div className="grid grid-cols-3 gap-3">
                 <div>
                  <label htmlFor="day-select" className="text-xs text-gray-400">Ngày</label>
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
                  <label htmlFor="month-select" className="text-xs text-gray-400">Tháng</label>
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
                  <label htmlFor="year-select" className="text-xs text-gray-400">Năm</label>
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
              <InfoField icon={<ClockIcon />} label="Giờ Sinh">
                <input
                  type="time"
                  name="time"
                  value={birthData.time}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition text-white input-glow"
                />
              </InfoField>
              <InfoField icon={<UserIcon />} label="Giới Tính">
                <select
                  name="gender"
                  value={birthData.gender}
                  onChange={handleInputChange}
                  className={selectClassName}
                  style={selectStyle}
                >
                  <option value="male" className="bg-gray-800">Nam</option>
                  <option value="female" className="bg-gray-800">Nữ</option>
                </select>
              </InfoField>
            </div>
          </div>
          <div className="text-center mt-8">
            <button type="submit" disabled={isLoading} className="btn-shine bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-amber-400/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto">
              <SparklesIcon /> {isLoading ? 'Đang Luận Giải...' : 'Xem Vận Mệnh'}
            </button>
          </div>
        </form>
      </Card>

      {isLoading && <Loader message="AI Thiện Giác đang phân tích lá số của bạn. Quá trình này có thể mất một chút thời gian..." />}
      {error && <div className="mt-8 text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}

      {analysis && (
        <>
        <div className="mt-10 space-y-8">
          <Card title="Bản Mệnh Tổng Quan" className="opacity-0 animate-fade-in-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SummaryItem label="Bản Mệnh" value={analysis.chartSummary.mainElement} delay="animation-delay-200" />
                <SummaryItem label="Con Giáp" value={analysis.chartSummary.zodiacAnimal} delay="animation-delay-[300ms]" />
                <SummaryItem label="Hoàng Đạo" value={analysis.chartSummary.westernZodiac} delay="animation-delay-[400ms]" />
                <SummaryItem label="Cung Mệnh" value={analysis.chartSummary.destinyPalace} delay="animation-delay-[500ms]" />
            </div>
          </Card>
          
          <Card title="Luận Giải Trọn Đời" className="opacity-0 animate-fade-in-up animation-delay-[600ms]">
            <div className="space-y-6">
              <AnalysisSection icon={<UserIcon className="w-5 h-5"/>} title="Tổng Quan" content={analysis.lifetimeAnalysis.overview} delay="animation-delay-200" />
              <AnalysisSection icon={<BriefcaseIcon className="w-5 h-5"/>} title="Sự Nghiệp" content={analysis.lifetimeAnalysis.career} delay="animation-delay-[300ms]" />
              <AnalysisSection icon={<DollarSignIcon className="w-5 h-5"/>} title="Tài Lộc" content={analysis.lifetimeAnalysis.wealth} delay="animation-delay-[400ms]" />
              <AnalysisSection icon={<HeartIcon className="w-5 h-5"/>} title="Tình Duyên" content={analysis.lifetimeAnalysis.loveAndMarriage} delay="animation-delay-[500ms]" />
              <AnalysisSection icon={<ShieldCheckIcon className="w-5 h-5"/>} title="Sức Khỏe" content={analysis.lifetimeAnalysis.health} delay="animation-delay-[600ms]" />
              <AnalysisSection icon={<UsersIcon className="w-5 h-5"/>} title="Gia Đạo" content={analysis.lifetimeAnalysis.family} delay="animation-delay-[700ms]" />
            </div>
          </Card>
          
          <Card title="Cẩm Nang Cát Tường" className="opacity-0 animate-fade-in-up animation-delay-[1400ms]">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <p><strong className="text-amber-400 font-semibold">Số May Mắn:</strong> <span className="text-white">{analysis.luckyAdvice.luckyNumbers.join(', ')}</span></p>
                <p><strong className="text-amber-400 font-semibold">Màu Hợp Mệnh:</strong> <span className="text-white">{analysis.luckyAdvice.luckyColors.join(', ')}</span></p>
                <p><strong className="text-amber-400 font-semibold">Tuổi Hợp:</strong> <span className="text-white">{analysis.luckyAdvice.compatibleZodiacs.join(', ')}</span></p>
             </div>
             <div className="mt-6 space-y-6">
                <div>
                  <strong className="text-green-400 font-semibold">Việc Nên Làm:</strong>
                  <div className="text-gray-300 space-y-2 mt-1">
                    {analysis.luckyAdvice.thingsToDo.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <strong className="text-red-400 font-semibold">Việc Cần Tránh:</strong>
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
                    Gieo Duyên Lành
                </button>
                <button 
                    onClick={() => setIsDownloadModalOpen(true)}
                    className="btn-shine group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                >
                    <DownloadIcon className="w-6 h-6 transition-transform group-hover:scale-110" />
                    Tải Lá Số PDF
                </button>
            </div>
        </div>
        
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
            <PrintableHoroscope analysis={analysis} birthData={birthData} />
        </div>
      </>
      )}

      <Modal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} title="Gieo Duyên Cùng Phật Đạo">
          <div className="text-center text-gray-300 space-y-6">
              <p>Lời luận giải này là một món quà tri thức mà Huyền Phong Phật Đạo dành tặng bạn. Nếu bạn cảm thấy hữu ích và muốn gieo duyên lành để nền tảng tiếp tục phát triển, lan toả giá trị tới cộng đồng, bạn có thể gửi một chút tịnh tài tuỳ hỷ.</p>
              <SupportInfo />
              <p className="pt-4 border-t border-white/10">Mọi sự đóng góp, dù nhỏ bé, đều là nguồn động viên quý giá để duy trì và phát triển đạo pháp. Xin chân thành công đức!</p>
          </div>
      </Modal>

      <Modal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} title="Tải Về Lá Số Tử Vi">
          <div className="text-center text-gray-300 space-y-6">
              <p>Lá số tử vi chi tiết của quý vị đã sẵn sàng để tải về. Để đạo pháp được lan tỏa, duy trì và phát triển, kính mong quý vị gieo một chút duyên lành tùy hỷ trước khi tải về.</p>
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
                        Đang tạo PDF...
                      </>
                    ) : "Hoàn Tất & Tải Về"}
                </button>
              </div>
          </div>
      </Modal>

    </div>
  );
};

export default HoroscopeGenerator;