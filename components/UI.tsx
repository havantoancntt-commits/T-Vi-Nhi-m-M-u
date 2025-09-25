import React, { useEffect } from 'react';
import { Logo } from './Logo';
import { useLanguage } from '../contexts/LanguageContext';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', contentClassName = '' }) => (
  <div className={`card-base ${className}`}>
    <div className={`card-content ${contentClassName}`}>
      {children}
    </div>
  </div>
);


interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  const { t } = useLanguage();
  const displayMessage = message || t('loader.component');
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-fade-in">
        <Logo className="w-28 h-28 opacity-80" />
        <p className="mt-4 text-lg text-white text-center px-4 font-semibold">{displayMessage}</p>
    </div>
  );
};


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
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
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
        className="w-full max-w-lg opacity-0 animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        <Card>
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