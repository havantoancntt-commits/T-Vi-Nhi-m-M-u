import React, { useState, useEffect } from 'react';
import { LotusIcon } from './Icons';

const quotes = [
  {
    text: "Gieo nhân nào, gặt quả nấy. Vận mệnh của bạn hôm nay là kết quả của những suy nghĩ và hành động trong quá khứ.",
    author: "Luật Nhân Quả"
  },
  {
    text: "Tâm an vạn sự an, tâm bình thế giới bình. Sự bình yên thực sự đến từ bên trong, không phải từ hoàn cảnh bên ngoài.",
    author: "Lời Phật Dạy"
  },
  {
    text: "Thiện念 một lần, phúc đức tựa mây trời. Ác tâm một khắc, tai ương liền đến.",
    author: "Triết Lý Đông Phương"
  },
  {
    text: "Nguồn gốc của mọi khổ đau là tham, sân, si. Diệt trừ được ba độc, tâm sẽ tự tại, đời sẽ an vui.",
    author: "Kinh Pháp Cú"
  },
  {
    text: "Tha thứ cho người khác không phải vì họ xứng đáng, mà vì bạn xứng đáng được bình yên.",
    author: "Thiền Sư Thích Nhất Hạnh"
  },
  {
    text: "Đừng tìm lỗi người, hãy nhìn lại chính mình. Tu sửa bản thân là con đường giác ngộ chân chính nhất.",
    author: "Lời Vàng Ý Ngọc"
  }
];

const WisdomQuotes: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 8000); // Change quote every 8 seconds

    return () => clearInterval(timer);
  }, []);

  const currentQuote = quotes[currentIndex];

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

export default WisdomQuotes;
