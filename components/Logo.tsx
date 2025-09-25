import React from 'react';

type LogoProps = {
  className?: string;
};

export const Logo: React.FC<LogoProps> = React.memo(({ className }) => {
  const [angle, setAngle] = React.useState(0);
  React.useEffect(() => {
    let frameId: number;
    const rotate = (timestamp: number) => {
      setAngle(timestamp / 100);
      frameId = requestAnimationFrame(rotate);
    };
    requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Huyền Phong Phật Đạo Logo"
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FDE047', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#FBBF24', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
         <style>
          {`
            @keyframes pulse-logo {
              0%, 100% { filter: url(#glow) drop-shadow(0 0 3px #fde047); }
              50% { filter: url(#glow) drop-shadow(0 0 8px #f59e0b); }
            }
            .logo-pulsing {
              animation: pulse-logo 6s ease-in-out infinite;
            }
          `}
        </style>
      </defs>

      <g className="logo-pulsing" transform={`rotate(${angle} 50 50)`}>
        {/* Outer petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map(rot => (
          <path
            key={rot}
            d="M 50 0 C 65 20, 65 35, 50 50 C 35 35, 35 20, 50 0 Z"
            fill="url(#goldGradient)"
            opacity="0.7"
            transform={`rotate(${rot} 50 50)`}
          />
        ))}
        {/* Inner petals */}
         {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(rot => (
          <path
            key={rot}
            d="M 50 15 C 58 30, 58 40, 50 50 C 42 40, 42 30, 50 15 Z"
            fill="url(#goldGradient)"
             opacity="0.9"
            transform={`rotate(${rot} 50 50)`}
          />
        ))}
        {/* Center circle */}
        <circle cx="50" cy="50" r="10" fill="url(#goldGradient)" />
      </g>
    </svg>
  );
});