import React, { useState } from 'react';
import { BankIcon, ZaloPayIcon, CopyIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

export const SupportInfo: React.FC = () => {
    const { t } = useLanguage();
    const [vcbCopied, setVcbCopied] = useState(false);
    const [zaloCopied, setZaloCopied] = useState(false);

    const copyToClipboard = async (text: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        try {
            await navigator.clipboard.writeText(text);
            setter(true);
            setTimeout(() => setter(false), 2500);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert(t('support.copyError'));
        }
    };

    return (
        <div className="space-y-4 text-left">
            {/* Vietcombank */}
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                    <BankIcon className="w-6 h-6 text-green-400" />
                    <h4 className="font-bold text-lg text-green-400">{t('support.vcb.bank')}</h4>
                </div>
                <p><strong>{t('support.vcb.nameLabel')}:</strong> {t('support.vcb.name')}</p>
                <div className="flex items-center justify-between mt-1">
                    <p><strong>{t('support.vcb.accountLabel')}:</strong> <span className="font-mono text-amber-300">0501000160764</span></p>
                    <button onClick={() => copyToClipboard('0501000160764', setVcbCopied)} className={`flex items-center gap-1.5 text-sm px-3 py-1 rounded-md transition ${vcbCopied ? 'bg-green-500 text-white' : 'bg-gray-600 hover:bg-gray-500'}`}>
                        <CopyIcon className="w-4 h-4" /> {vcbCopied ? t('support.copied') : t('support.copy')}
                    </button>
                </div>
            </div>
            {/* ZaloPay */}
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                    <ZaloPayIcon className="w-6 h-6 text-blue-400" />
                    <h4 className="font-bold text-lg text-blue-400">{t('support.zalo.wallet')}</h4>
                </div>
                <div className="flex items-center justify-between mt-1">
                    <p><strong>{t('support.zalo.phoneLabel')}:</strong> <span className="font-mono text-amber-300">0974313633</span></p>
                    <button onClick={() => copyToClipboard('0974313633', setZaloCopied)} className={`flex items-center gap-1.5 text-sm px-3 py-1 rounded-md transition ${zaloCopied ? 'bg-green-500 text-white' : 'bg-gray-600 hover:bg-gray-500'}`}>
                        <CopyIcon className="w-4 h-4" /> {zaloCopied ? t('support.copied') : t('support.copy')}
                    </button>
                </div>
            </div>
        </div>
    );
};
