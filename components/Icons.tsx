import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const SparklesIcon = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.456-2.456L12.5 18l1.178-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" /></svg>
);

export const ChatIcon = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72-3.72a1.063 1.063 0 00-1.5 0l-3.72 3.72a2.123 2.123 0 01-3.004 0l-3.72-3.72a1.063 1.063 0 00-1.5 0l-3.72 3.72A2.122 2.122 0 013 19.182V12.75c0-1.136.847-2.1 1.98-2.193l3.72 3.72a1.063 1.063 0 001.5 0l3.72-3.72a2.123 2.123 0 013.004 0l3.72 3.72a1.063 1.063 0 001.5 0l3.72-3.72zM4.5 3.75a2.121 2.121 0 012.121-2.121h6.858c.631 0 1.213.243 1.65.679l4.5 4.5a2.121 2.121 0 010 2.999l-4.5 4.5a2.121 2.121 0 01-2.999 0l-4.5-4.5a2.121 2.121 0 01-.679-1.65v-6.858a2.121 2.121 0 012.121-2.121z" /></svg>
);

export const UserIcon = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
);

export const CalendarIcon = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 12.75h.008v.008H12v-.008z" /></svg>
);

export const ClockIcon = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

export const WisdomIcon = (props: IconProps) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.071L12 4.429l-1.135-1.136a.75.75 0 00-1.06 1.06l1.135 1.136-1.135 1.136a.75.75 0 001.06 1.06l1.135-1.136 1.136 1.135a.75.75 0 001.06-1.06L13.06 6.57l1.135-1.135a.75.75 0 00-1.06-1.06L12 5.501l1.136-1.135a.75.75 0 00-1.071-1.071L12 3.357l-.963-.963zM10.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm1.5-9a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM12 22.5a.75.75 0 00.75-.75v-3a.75.75 0 00-1.5 0v3a.75.75 0 00.75.75z" clipRule="evenodd" />
  </svg>
);

export const YinYangIcon = (props: IconProps) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 100 18 9 9 0 000-18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9a9 9 0 100-18v18" />
        <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
        <circle cx="12" cy="16.5" r="1.5" fill="currentColor" stroke="none" className="text-gray-900 group-hover:text-white transition" />
    </svg>
);

export const BriefcaseIcon = (props: IconProps) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075c0 1.313-.964 2.5-2.25 2.5h-12c-1.286 0-2.25-.964-2.25-2.25V14.15M15.75 8.849v-4.524a2.25 2.25 0 00-2.25-2.25h-3.75a2.25 2.25 0 00-2.25 2.25v4.524" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 8.849h-7.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5v3.375c0 .621-.504 1.125-1.125 1.125H4.875a1.125 1.125 0 01-1.125-1.125V9.75z" /></svg>
);

export const DollarSignIcon = (props: IconProps) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.826-1.106-2.156 0-2.982C10.544 8.219 11.272 8 12 8c.768 0 1.536.219 2.121.659l.879.659" /></svg>
);

export const HeartIcon = (props: IconProps) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
);

export const ShieldCheckIcon = (props: IconProps) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" /></svg>
);

export const UsersIcon = (props: IconProps) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.226c-3.42.042-6.83-.933-9.586-2.967l2.29-2.29a8.25 8.25 0 0110.89 0l2.29 2.29c-2.756 2.034-6.166 3.009-9.586 2.967z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);

export const LotusIcon = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75a8.997 8.997 0 006.13-2.316c.82-.78 1.4-1.73 1.62-2.768a5.25 5.25 0 00-.02-3.832 5.17 5.17 0 00-1.2-2.132 5.25 5.25 0 00-7.06 0 5.17 5.17 0 00-1.2 2.132 5.25 5.25 0 00-.02 3.832c.22.038 1.04.84 1.62 2.768A8.997 8.997 0 0012 21.75zM12 21.75v-8.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.375 13.5A2.625 2.625 0 1112 10.875a2.625 2.625 0 01-2.625 2.625z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75a8.963 8.963 0 016.13 2.316m-12.26 0A8.963 8.963 0 0112 3.75z" />
  </svg>
);

export const CopyIcon = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 4.625v-2.625m0 0l-2.25-2.25m2.25 2.25l2.25-2.25" /></svg>
);

export const BankIcon = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>
);

export const ZaloPayIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.238 16.556c-.11.22-.33.33-.55.33-.11 0-.22 0-.33-.11l-2.55-1.44-2.55 1.44c-.22.11-.55.11-.77 0-.22-.11-.33-.33-.33-.55V8.222c0-.33.22-.55.55-.55h6.21c.33 0 .55.22.55.55v8.334z" /><path fill="#FFF" d="M11.95 12.333l-1.44-2.106h2.88l-1.44 2.106zM13.73 9.333h-3.46l1.73 2.55 1.73-2.55z" /></svg>
);

export const DownloadIcon = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
);

export const DivinationSticksIcon = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    <g strokeWidth="1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9V4" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 9V5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 9V5" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 9V6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V6" />
    </g>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 21V10c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v11" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 21a4 4 0 008 0" /><ellipse cx="12" cy="10" rx="4" ry="1.5" />
  </svg>
);

export const VolumeUpIcon = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>
);

export const VolumeOffIcon = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>
);

export const CalendarCheckIcon = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M9.75 12.75h4.5" /></svg>
);

export const AlertTriangleIcon = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
);

export const TalismanIcon = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75l5.25-5.25L21 12l-3.75-4.5L12 2.25 6.75 7.5 3 12l3.75 4.5 5.25 5.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);

export const ChartBarIcon = (props: IconProps) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
);

export const GiftIcon = (props: IconProps) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A3.375 3.375 0 006.375 8.25H17.625A3.375 3.375 0 0012 4.875z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.875v16.5M21 11.25H3v1.5a1.5 1.5 0 001.5 1.5h15a1.5 1.5 0 001.5-1.5v-1.5z" /></svg>
);

export const SendIcon = (props: IconProps) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);

export const InformationCircleIcon = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
);