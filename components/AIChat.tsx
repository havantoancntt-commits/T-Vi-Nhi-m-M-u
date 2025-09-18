import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import { getAiClient } from '../services/aiClient';
import { UserIcon, WisdomIcon } from './Icons';
import { Card } from './UI';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const AIChat: React.FC = () => {
  const [chatInstance, setChatInstance] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const ai = getAiClient();
      const chat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
              systemInstruction: 'Bạn là một trợ lý AI uyên bác tên là Thiện Giác, chuyên về Phật pháp, mệnh lý và triết lý Đông phương. Hãy trả lời các câu hỏi một cách từ bi, sâu sắc, uyên bác và hữu ích. Luôn trả lời bằng tiếng Việt với văn phong trang trọng, tôn nghiêm.',
          },
      });
      setChatInstance(chat);

      setMessages([
          { sender: 'bot', text: 'A Di Đà Phật! Bần đạo là Thiện Giác. Thí chủ có điều gì cần luận giải về mệnh lý, phong thủy, hay triết lý nhân sinh không?' }
      ]);
    } catch (error) {
      console.error("Failed to initialize AI Chat:", error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setMessages([
          { sender: 'bot', text: `A Di Đà Phật! Đã có lỗi khi khởi tạo AI Thiện Giác. Lỗi: ${errorMessage}` }
      ]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatInstance) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const stream = await chatInstance.sendMessageStream({ message: input });
      
      let botResponse = '';
      setMessages(prev => [...prev, { sender: 'bot', text: '...' }]);

      for await (const chunk of stream) {
        botResponse += chunk.text;
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { sender: 'bot', text: botResponse };
            return newMessages;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card contentClassName="p-0" className="h-[70vh]">
        <div className="flex flex-col h-full">
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'bot' && <div className="w-9 h-9 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0 p-1.5"><WisdomIcon className="w-full h-full text-amber-300"/></div>}
                <div className={`p-3 rounded-lg max-w-sm md:max-w-md shadow-lg opacity-0 animate-fade-in ${msg.sender === 'user' ? 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-br-none animate-slide-in-right' : 'bg-white/10 text-gray-300 rounded-bl-none animate-slide-in-left'}`}>
                  {msg.text === '...' ? (
                     <div className="flex gap-1.5 py-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse delay-0"></span>
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse delay-200"></span>
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse delay-400"></span>
                    </div>
                  ) : msg.text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </div>
                {msg.sender === 'user' && <div className="w-9 h-9 rounded-full bg-indigo-600/50 flex items-center justify-center shrink-0"><UserIcon className="w-5 h-5 text-white"/></div>}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-indigo-400/20 flex gap-4 items-center bg-black/20">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi về mệnh lý, hướng nhà, ngày giờ tốt..."
              className="flex-1 bg-white/10 p-3 rounded-lg border border-white/20 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition text-white placeholder-gray-500 input-glow"
              disabled={isLoading || !chatInstance}
            />
            <button type="submit" disabled={isLoading || !input.trim() || !chatInstance} className="btn-shine bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-bold p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-amber-400/30 transition transform hover:scale-105">
              Gửi
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AIChat;
