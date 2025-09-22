
import React from 'react';

type LogoProps = {
  className?: string;
};

export const Logo: React.FC<LogoProps> = React.memo(({ className }) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Huyền Phong Phật Đạo Logo"
  >
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FCD34D', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#FBBF24', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <style>
      {`
        @keyframes rotate-logo {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .logo-rotating {
          animation: rotate-logo 60s linear infinite;
          transform-origin: center;
        }
      `}
    </style>

    <g className="logo-rotating" filter="url(#glow)">
        {/* Outer Circle */}
        <circle cx="50" cy="50" r="48" fill="none" stroke="url(#goldGradient)" strokeWidth="2" opacity="0.7" />
        
        {/* Inner Circle (Hub) */}
        <circle cx="50" cy="50" r="10" fill="url(#goldGradient)" />
        
        {/* 8 Spokes of the Dharma Wheel */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <g key={angle} transform={`rotate(${angle} 50 50)`}>
                <path d="M50,10 V2" stroke="url(#goldGradient)" strokeWidth="2" />
                <path d="M50,48 V30" stroke="url(#goldGradient)" strokeWidth="2.5" />
                {/* Decorative element on spoke */}
                <circle cx="50" cy="22" r="3" fill="url(#goldGradient)" />
            </g>
        ))}

        {/* Lotus in center */}
         <g transform="translate(50 50) scale(0.08)">
             <path fill="#fff" d="M 0 -48 C 15 -48, 25 -20, 0 0 C -25 -20, -15 -48, 0 -48 Z" transform="rotate(0)" />
             <path fill="#fff" d="M 0 -48 C 15 -48, 25 -20, 0 0 C -25 -20, -15 -48, 0 -48 Z" transform="rotate(90)" />
             <path fill="#fff" d="M 0 -48 C 15 -48, 25 -20, 0 0 C -25 -20, -15 -48, 0 -48 Z" transform="rotate(45)" />
             <path fill="#fff" d="M 0 -48 C 15 -48, 25 -20, 0 0 C -25 -20, -15 -48, 0 -48 Z" transform="rotate(135)" />
        </g>
    </g>
  </svg>
));
