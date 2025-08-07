interface UruguayFlagProps {
  className?: string;
  size?: number;
}

export default function UruguayFlag({ className = "", size = 24 }: UruguayFlagProps) {
  return (
    <svg 
      width={size} 
      height={size * 0.67} 
      viewBox="0 0 30 20" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Franjas blancas y celestes */}
      <rect width="30" height="20" fill="#ffffff"/>
      <rect width="30" height="2.22" y="2.22" fill="#0038a8"/>
      <rect width="30" height="2.22" y="6.67" fill="#0038a8"/>
      <rect width="30" height="2.22" y="11.11" fill="#0038a8"/>
      <rect width="30" height="2.22" y="15.56" fill="#0038a8"/>
      
      {/* Cantón blanco */}
      <rect width="12" height="11.11" fill="#ffffff"/>
      
      {/* Sol de Mayo */}
      <g transform="translate(6, 5.56)">
        {/* Círculo central del sol */}
        <circle cx="0" cy="0" r="1.5" fill="#fcdd09" stroke="#d52b1e" strokeWidth="0.1"/>
        
        {/* Rayos del sol */}
        {Array.from({ length: 16 }, (_, i) => {
          const angle = (i * 22.5) * Math.PI / 180;
          const x1 = Math.cos(angle) * 1.8;
          const y1 = Math.sin(angle) * 1.8;
          const x2 = Math.cos(angle) * 2.8;
          const y2 = Math.sin(angle) * 2.8;
          
          return (
            <line 
              key={i}
              x1={x1} 
              y1={y1} 
              x2={x2} 
              y2={y2} 
              stroke="#fcdd09" 
              strokeWidth="0.3"
            />
          );
        })}
        
        {/* Cara del sol */}
        <circle cx="-0.3" cy="-0.3" r="0.1" fill="#d52b1e"/>
        <circle cx="0.3" cy="-0.3" r="0.1" fill="#d52b1e"/>
        <path d="M -0.5 0.3 Q 0 0.7 0.5 0.3" stroke="#d52b1e" strokeWidth="0.1" fill="none"/>
      </g>
    </svg>
  );
}
