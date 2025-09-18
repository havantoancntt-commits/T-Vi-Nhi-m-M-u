import React, { useState } from 'react';
import { BankIcon, ZaloPayIcon, CopyIcon } from './Icons';

export const SupportInfo: React.FC = () => {
    const [vcbCopied, setVcbCopied] = useState(false);
    const [zaloCopied, setZaloCopied] = useState(false);

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

    return (
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
};