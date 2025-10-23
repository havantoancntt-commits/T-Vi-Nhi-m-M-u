import React, { useState } from 'react';
import { BankIcon, ZaloPayIcon, CopyIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

const CheckmarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export const SupportInfo: React.FC = React.memo(() => {
    const { t } = useLanguage();
    const [copiedState, setCopiedState] = useState<'vcb' | 'zalo' | null>(null);

    const copyToClipboard = async (text: string, type: 'vcb' | 'zalo') => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedState(type);
            setTimeout(() => setCopiedState(null), 2500);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert(t('support.copyError'));
        }
    };

    const VCB_ACCOUNT = '0501000160764';
    const ZALO_PHONE = '0974313633';
    const isVcbCopied = copiedState === 'vcb';
    const isZaloCopied = copiedState === 'zalo';

    return (
        <div className="space-y-6 text-left">
            <p className="text-center text-sm text-gray-400">{t('support.scan_qr')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Vietcombank Card */}
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center flex flex-col justify-between transform transition hover:border-green-400/50 hover:shadow-2xl hover:shadow-green-500/10">
                    <div>
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <BankIcon className="w-6 h-6 text-green-400" />
                            <h4 className="font-bold text-lg text-green-400">{t('support.vcb.bank')}</h4>
                        </div>
                        <div className="flex justify-center p-2 bg-white rounded-md aspect-square w-40 h-40 mx-auto">
                            <img src="https://i.imgur.com/s8mfQ21.png" alt="Vietcombank QR Code" className="object-contain" />
                        </div>
                        <div className="mt-3 text-sm">
                            <p className="text-gray-300"><strong>{t('support.vcb.nameLabel')}:</strong> {t('support.vcb.name')}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{t('support.vcb.accountLabel')}</p>
                        <div className="relative mt-1">
                            <input 
                                type="text" 
                                readOnly 
                                value={VCB_ACCOUNT} 
                                className="input-base text-center w-full font-mono !bg-black/30 text-amber-300 pr-10"
                                aria-label="Vietcombank Account Number"
                            />
                            <button 
                                onClick={() => copyToClipboard(VCB_ACCOUNT, 'vcb')} 
                                className={`absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-colors ${isVcbCopied ? 'bg-green-500/20 text-green-400' : 'text-gray-400 hover:text-white hover:bg-white/10'}`} 
                                title={t('support.copy')}
                            >
                                {isVcbCopied ? <CheckmarkIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
                            </button>
                        </div>
                         {isVcbCopied && <p className="text-xs text-green-400 mt-1 animate-fade-in">{t('support.copied')}!</p>}
                    </div>
                </div>

                {/* ZaloPay Card */}
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center flex flex-col justify-between transform transition hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10">
                    <div>
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <ZaloPayIcon className="w-6 h-6 text-blue-400" />
                            <h4 className="font-bold text-lg text-blue-400">{t('support.zalo.wallet')}</h4>
                        </div>
                        <div className="flex justify-center p-2 bg-white rounded-md aspect-square w-40 h-40 mx-auto">
                            <img src="https://i.imgur.com/s8mfQ21.png" alt="ZaloPay QR Code" className="object-contain" />
                        </div>
                        <div className="mt-3 text-sm">
                            <p className="text-gray-300"><strong>{t('support.vcb.nameLabel')}:</strong> {t('support.vcb.name')}</p>
                        </div>
                    </div>
                     <div className="mt-4">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{t('support.zalo.phoneLabel')}</p>
                         <div className="relative mt-1">
                            <input 
                                type="text" 
                                readOnly 
                                value={ZALO_PHONE} 
                                className="input-base text-center w-full font-mono !bg-black/30 text-amber-300 pr-10"
                                aria-label="ZaloPay Phone Number"
                            />
                            <button 
                                onClick={() => copyToClipboard(ZALO_PHONE, 'zalo')} 
                                className={`absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-colors ${isZaloCopied ? 'bg-green-500/20 text-green-400' : 'text-gray-400 hover:text-white hover:bg-white/10'}`} 
                                title={t('support.copy')}
                            >
                                {isZaloCopied ? <CheckmarkIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
                            </button>
                        </div>
                        {isZaloCopied && <p className="text-xs text-green-400 mt-1 animate-fade-in">{t('support.copied')}!</p>}
                    </div>
                </div>
            </div>
        </div>
    );
});