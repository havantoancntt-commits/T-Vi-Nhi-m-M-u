import React, { useEffect } from 'react';
import { Logo } from './Logo';
import { useLanguage } from '../contexts/LanguageContext';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

export const Card: React.FC<CardProps> = ({ children, title, className = '', titleClassName = '', contentClassName = '' }) => (
  <div className={`relative bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-indigo-900/20 overflow-hidden transition-all duration-500 group ${className}`}>
    <div className="absolute inset-[-2px] -z-10 rounded-[18px] bg-gradient-to-br from-indigo-600/50 via-blue-500/20 to-amber-500/50 opacity-50 transition-all duration-500 group-hover:opacity-100 group-hover:shadow-2xl group-hover:shadow-amber-500/20"></div>
    {title && (
      <div className={`p-5 border-b border-indigo-400/20 bg-white/5 ${titleClassName}`}>
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{title}</h3>
      </div>
    )}
    <div className={`p-6 ${contentClassName}`}>
      {children}
    </div>
  </div>
);


interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message = 'Loading...' }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-fade-in">
      <Logo className="w-24 h-24" />
      <p className="mt-4 text-lg text-white text-center px-4 font-semibold">{message}</p>
  </div>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const { t } = useLanguage();
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="w-full max-w-lg"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <Card className="relative">
             <div className="p-5 border-b border-indigo-400/20 bg-white/5 flex justify-between items-center">
                <h3 id="modal-title" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">{title}</h3>
                <button 
                    onClick={onClose} 
                    className="text-gray-400 hover:text-white transition"
                    aria-label={t('modal.close')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="p-6">
                {children}
            </div>
        </Card>
      </div>
    </div>
  );
};
