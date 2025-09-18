


import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const SparklesIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L15 10m-3 3l-2.293 2.293a1 1 0 01-1.414 0L6 13m12-3h-4M15 3h4m-2 18v-4m-2-2h4m-4 0l2.293-2.293a1 1 0 011.414 0L19 13" />
  </svg>
);

export const ChatIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export const UserIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export const CalendarIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const ClockIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const WisdomIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <defs>
            <linearGradient id="wisdomGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fcd34d" />
                <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
        </defs>
        <path fill="url(#wisdomGradient)" d="M12 2.25a.75.75 0 01.75.75v.541a8.47 8.47 0 014.88 2.564.75.75 0 01-.94 1.168 6.97 6.97 0 00-8.88 0 .75.75 0 11-.94-1.168A8.47 8.47 0 0111.25 3.54V3a.75.75 0 01.75-.75zM8.25 9.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6zM12 15a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5a.75.75 0 01.75-.75zm6.425-4.23a.75.75 0 01.218 1.04l-3.375 5.5a.75.75 0 01-1.286-.78l3.375-5.5a.75.75 0 011.068-.26zM5.575 10.77a.75.75 0 011.068.26l3.375 5.5a.75.75 0 01-1.286.78l-3.375-5.5a.75.75 0 01.218-1.04z" />
    </svg>
);

export const YinYangIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-9a9 9 0 00-9 9h18a9 9 0 00-9-9zM12 3a9 9 0 019 9H3a9 9 0 019-9z" />
        <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
        <circle cx="12" cy="16.5" r="1.5" fill="currentColor" stroke="none" className="text-gray-900 group-hover:text-white transition" />
    </svg>
);

export const BriefcaseIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.03 23.03 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);

export const DollarSignIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2m0-6h.01M6 12a6 6 0 1112 0 6 6 0 01-12 0z" /></svg>
);

export const HeartIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
);

export const ShieldCheckIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l5.318-3.047a12.014 12.014 0 011.682-1.326l.5-2.882 2-1.155a3.11 3.11 0 001.636 0l2 1.155.5 2.882a12.014 12.014 0 011.682 1.326L21 20.417c0-3.552-1.354-6.837-3.618-9.373z" /></svg>
);

export const UsersIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

export const LotusIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75a8.997 8.997 0 006.13-2.316c.82- .78 1.4-1.73 1.62-2.768a5.25 5.25 0 00-.02-3.832 5.17 5.17 0 00-1.2-2.132 5.25 5.25 0 00-7.06 0 5.17 5.17 0 00-1.2 2.132 5.25 5.25 0 00-.02 3.832c.22.038 1.04.84 1.62 2.768A8.997 8.997 0 0012 21.75zM12 21.75v-8.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.375 13.5A2.625 2.625 0 1112 10.875a2.625 2.625 0 01-2.625 2.625z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75a8.963 8.963 0 016.13 2.316m-12.26 0A8.963 8.963 0 0112 3.75z" />
  </svg>
);


export const CopyIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 4.625-2.25-2.25m0 0a3.375 3.375 0 01-4.773 0l-2.25 2.25m-4.5 0"/>
    </svg>
);

export const BankIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
);

export const ZaloPayIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.238 16.556c-.11.22-.33.33-.55.33-.11 0-.22 0-.33-.11l-2.55-1.44-2.55 1.44c-.22.11-.55.11-.77 0-.22-.11-.33-.33-.33-.55V8.222c0-.33.22-.55.55-.55h6.21c.33 0 .55.22.55.55v8.334z" />
        <path fill="#FFF" d="M11.95 12.333l-1.44-2.106h2.88l-1.44 2.106zM13.73 9.333h-3.46l1.73 2.55 1.73-2.55z" />
    </svg>
);

export const DownloadIcon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const DivinationSticksIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
    {/* Sticks - thinner stroke */}
    <g strokeWidth="1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9V4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 9V5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 9V5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9V6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V6" />
    </g>
    {/* Container */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 21V10c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v11" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 21a4 4 0 008 0" />
    <ellipse cx="12" cy="10" rx="4" ry="1.5" />
  </svg>
);

export const VolumeUpIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
);

export const VolumeOffIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
);

export const CalendarCheckIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9M10.5 6a2.25 2.25 0 01-4.5 0M10.5 6V4.5m0 1.5v1.5m-4.5-3v1.5m0-1.5a2.25 2.25 0 00-4.5 0v1.5m13.5 1.5v1.5m0-1.5a2.25 2.25 0 004.5 0v-1.5m-4.5 3V9M6 12.75h.008v.008H6v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm1.5-.375h.008v.008h-.008v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm1.5-.375h.008v.008h-.008v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM9 15.75h.008v.008H9v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm1.5-.375h.008v.008h-.008v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm1.5-.375h.008v.008h-.008v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3 3.75h18v16.5a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5V3.75z" />
  </svg>
);

export const AlertTriangleIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);
