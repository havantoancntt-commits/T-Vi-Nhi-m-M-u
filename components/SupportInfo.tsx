
import React, { useState } from 'react';
import { BankIcon, ZaloPayIcon, CopyIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

export const SupportInfo: React.FC = React.memo(() => {
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

    const VCB_ACCOUNT = '0501000160764';
    const ZALO_PHONE = '0974313633';

    return (
        <div className="space-y-6 text-left">
            <p className="text-center text-gray-400">{t('support.scan_qr')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vietcombank */}
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center flex flex-col">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <BankIcon className="w-6 h-6 text-green-400" />
                        <h4 className="font-bold text-lg text-green-400">{t('support.vcb.bank')}</h4>
                    </div>
                    <div className="flex justify-center p-2 bg-white rounded-md">
                        <img src="https://i.imgur.com/s8mfQ21.png" alt="Vietcombank QR Code" className="w-36 h-36" />
                    </div>
                    <div className="mt-3 text-sm flex-grow flex flex-col justify-center">
                        <p><strong>{t('support.vcb.nameLabel')}:</strong> {t('support.vcb.name')}</p>
                        <div className="flex items-center justify-center gap-2 mt-1">
                             <p className="truncate"><strong>{t('support.vcb.accountLabel')}:</strong> <span className="font-mono text-amber-300">{VCB_ACCOUNT}</span></p>
                             <button onClick={() => copyToClipboard(VCB_ACCOUNT, setVcbCopied)} className={`transition ${vcbCopied ? 'text-green-400' : 'text-gray-400 hover:text-white'}`} title={t('support.copy')}>
                                <CopyIcon className="w-4 h-4" />
                            </button>
                        </div>
                         {vcbCopied && <p className="text-xs text-green-400 mt-1 animate-fade-in">{t('support.copied')}!</p>}
                    </div>
                </div>
                {/* ZaloPay */}
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center flex flex-col">
                     <div className="flex items-center justify-center gap-2 mb-3">
                        <ZaloPayIcon className="w-6 h-6 text-blue-400" />
                        <h4 className="font-bold text-lg text-blue-400">{t('support.zalo.wallet')}</h4>
                    </div>
                    <div className="flex justify-center p-2 bg-white rounded-md">
                        <img src="https://i.imgur.com/s8mfQ21.png" alt="ZaloPay QR Code" className="w-36 h-36" />
                    </div>
                    <div className="mt-3 text-sm flex-grow flex flex-col justify-center">
                        <p><strong>{t('support.vcb.nameLabel')}:</strong> {t('support.vcb.name')}</p>
                        <div className="flex items-center justify-center gap-2 mt-1">
                             <p><strong>{t('support.zalo.phoneLabel')}:</strong> <span className="font-mono text-amber-300">{ZALO_PHONE}</span></p>
                             <button onClick={() => copyToClipboard(ZALO_PHONE, setZaloCopied)} className={`transition ${zaloCopied ? 'text-green-400' : 'text-gray-400 hover:text-white'}`} title={t('support.copy')}>
                                <CopyIcon className="w-4 h-4" />
                            </button>
                        </div>
                        {zaloCopied && <p className="text-xs text-green-400 mt-1 animate-fade-in">{t('support.copied')}!</p>}
                    </div>
                </div>
            </div>
        </div>
    );
});