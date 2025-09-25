import React, { useState, useEffect, useRef } from 'react';
import { UserIcon, WisdomIcon, SendIcon } from './Icons';
import { Card } from './UI';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

type GeminiContent = {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
};

const AIChat: React.FC = () => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasChatted = useRef(false);

  useEffect(() => {
    hasChatted.current = false;
    setMessages([{ sender: 'bot', text: t('chat.initialMessage') }]);
  }, [t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    hasChatted.current = true;
    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const historyToConvert = messages.length === 1 && messages[0].sender === 'bot' 
          ? [] 
          : messages;
      const geminiHistory: GeminiContent[] = historyToConvert.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
      }));

      const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ history: geminiHistory, message: currentInput, lang: language }),
      });

      if (!response.ok || !response.body) {
          const errorData = await response.json().catch(() => ({error: t('chat.error.unknown')}));
          throw new Error(errorData.error || `${t('chat.error.server')}: ${response.status}`);
      }

      setMessages(prev => [...prev, { sender: 'bot', text: '' }]);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let currentBotResponse = '';

      while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          currentBotResponse += decoder.decode(value, { stream: true });
          
          setMessages(prev => {
              const newMessages = [...prev];
              if (newMessages.length > 0) {
                newMessages[newMessages.length - 1] = { sender: 'bot', text: currentBotResponse };
              }
              return newMessages;
          });
      }

    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : t('chat.error.generic');
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages.length > 0 && newMessages[newMessages.length-1].sender === 'bot' && newMessages[newMessages.length-1].text === ''){
             newMessages[newMessages.length-1].text = errorMessage;
             return newMessages;
        }
        return [...newMessages, {sender: 'bot', text: errorMessage}];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const starterPrompts: string[] = t('chat.starterPrompts');

  return (
    <div className="max-w-3xl mx-auto">
      <Card contentClassName="p-0" className="h-[75vh]">
        <div className="flex flex-col h-full">
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'bot' && <div className="w-9 h-9 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0 p-1.5"><WisdomIcon className="w-full h-full text-amber-300"/></div>}
                <div className={`p-3 rounded-2xl max-w-sm md:max-w-md shadow-lg opacity-0 animate-fade-in prose prose-invert max-w-none prose-p:my-2 ${msg.sender === 'user' ? 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-br-none animate-slide-in-right' : 'bg-white/10 text-gray-300 rounded-bl-none animate-slide-in-left'}`}>
                  {msg.text === '' ? (
                     <div className="flex gap-1.5 py-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite_200ms]"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite_400ms]"></span>
                    </div>
                  ) : msg.text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </div>
                {msg.sender === 'user' && <div className="w-9 h-9 rounded-full bg-indigo-600/50 flex items-center justify-center shrink-0"><UserIcon className="w-5 h-5 text-white"/></div>}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {!hasChatted.current && starterPrompts?.length > 0 && (
            <div className="p-4 grid grid-cols-2 gap-2 border-t border-indigo-400/10">
                {starterPrompts.map((prompt, i) => (
                    <button key={i} onClick={() => handlePromptClick(prompt)} className="text-left text-sm p-2 bg-white/5 rounded-md hover:bg-white/10 transition-colors text-gray-400">
                        {prompt}
                    </button>
                ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-4 border-t border-indigo-400/20 flex gap-4 items-center bg-black/20">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('chat.placeholder')}
              className="input-base flex-1"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="btn-primary p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed">
              <SendIcon className="w-6 h-6"/>
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AIChat;