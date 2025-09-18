import React from 'react';
import type { AnalysisResult, BirthData } from '../types';
import { Logo } from './Logo';

interface PrintableHoroscopeProps {
  analysis: AnalysisResult;
  birthData: BirthData;
}

export const PrintableHoroscope: React.FC<PrintableHoroscopeProps> = ({ analysis, birthData }) => {
    const genderText = birthData.gender === 'male' ? 'Nam' : 'Nữ';

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
                    <h1 className="text-4xl font-bold text-gray-900 font-serif">Huyền Phong Phật Đạo</h1>
                    <p className="text-gray-600">Lá Số Tử Vi Trọn Đời</p>
                </div>
                <Logo className="w-24 h-24" />
            </header>

            <section className="my-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h2 className="text-lg font-bold text-amber-800 font-serif mb-2">Thông Tin Thân Chủ</h2>
                <div className="grid grid-cols-3 gap-4 text-sm">
                    <div><strong>Ngày Sinh:</strong> {new Date(birthData.date).toLocaleDateString('vi-VN')}</div>
                    <div><strong>Giờ Sinh:</strong> {birthData.time}</div>
                    <div><strong>Giới Tính:</strong> {genderText}</div>
                </div>
            </section>

            <main>
                <Section title="Bản Mệnh Tổng Quan">
                    <div className="grid grid-cols-2 gap-4">
                        <p><strong>Bản Mệnh:</strong> {analysis.chartSummary.mainElement}</p>
                        <p><strong>Con Giáp:</strong> {analysis.chartSummary.zodiacAnimal}</p>
                        <p><strong>Cung Hoàng Đạo:</strong> {analysis.chartSummary.westernZodiac}</p>
                        <p><strong>Cung Mệnh:</strong> {analysis.chartSummary.destinyPalace}</p>
                    </div>
                </Section>

                <Section title="Luận Giải Trọn Đời">
                    <h3 className="font-bold text-md text-gray-800 font-serif">Tổng Quan</h3>
                    {renderTextWithNewlines(analysis.lifetimeAnalysis.overview)}
                    
                    <h3 className="font-bold text-md text-gray-800 font-serif mt-4">Sự Nghiệp</h3>
                    {renderTextWithNewlines(analysis.lifetimeAnalysis.career)}

                    <h3 className="font-bold text-md text-gray-800 font-serif mt-4">Tài Lộc</h3>
                    {renderTextWithNewlines(analysis.lifetimeAnalysis.wealth)}

                    <h3 className="font-bold text-md text-gray-800 font-serif mt-4">Tình Duyên & Hôn Nhân</h3>
                    {renderTextWithNewlines(analysis.lifetimeAnalysis.loveAndMarriage)}

                    <h3 className="font-bold text-md text-gray-800 font-serif mt-4">Sức Khỏe</h3>
                    {renderTextWithNewlines(analysis.lifetimeAnalysis.health)}

                    <h3 className="font-bold text-md text-gray-800 font-serif mt-4">Gia Đạo</h3>
                    {renderTextWithNewlines(analysis.lifetimeAnalysis.family)}
                </Section>

                <Section title="Cẩm Nang Cát Tường">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <p><strong>Số May Mắn:</strong> {analysis.luckyAdvice.luckyNumbers.join(', ')}</p>
                        <p><strong>Màu Hợp Mệnh:</strong> {analysis.luckyAdvice.luckyColors.join(', ')}</p>
                        <p><strong>Tuổi Hợp:</strong> {analysis.luckyAdvice.compatibleZodiacs.join(', ')}</p>
                    </div>
                     <div>
                        <h3 className="font-bold text-md text-green-700 font-serif">Việc Nên Làm:</h3>
                        {renderTextWithNewlines(analysis.luckyAdvice.thingsToDo)}
                    </div>
                     <div className="mt-4">
                        <h3 className="font-bold text-md text-red-700 font-serif">Việc Cần Tránh:</h3>
                        {renderTextWithNewlines(analysis.luckyAdvice.thingsToAvoid)}
                    </div>
                </Section>
            </main>

            <footer className="text-center text-xs text-gray-500 pt-4 mt-6 border-t border-gray-200">
                <p>Luận giải bởi Huyền Phong Phật Đạo &copy; {new Date().getFullYear()}. Nội dung chỉ mang tính chất tham khảo và chiêm nghiệm.</p>
            </footer>
        </div>
    );
};
