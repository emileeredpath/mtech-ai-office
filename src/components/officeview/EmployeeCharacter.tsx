import type { Employee } from '@/types/employee';

interface EmployeeCharacterProps {
  employee: Employee;
  size?: 'small' | 'medium';
}

export function EmployeeCharacter({ employee, size = 'medium' }: EmployeeCharacterProps) {
  const colors = {
    'marketing-director': { hair: '#8B4513', skin: '#F4A460', shirt: '#D84C45' },
    'website-auditor': { hair: '#2F4F4F', skin: '#F4A460', shirt: '#2BA876' },
    'seo-ppc-manager': { hair: '#333333', skin: '#F4A460', shirt: '#1E5A9F' },
    'email-marketing-manager': { hair: '#8B7355', skin: '#F4A460', shirt: '#00A0C6' },
    'proposal-writer': { hair: '#654321', skin: '#F4A460', shirt: '#5C4ADE' },
    'social-media-manager': { hair: '#8B0000', skin: '#F4A460', shirt: '#D84B8A' },
    'case-study-writer': { hair: '#1C1C1C', skin: '#F4A460', shirt: '#9C6ADE' },
    'funding-rewards-manager': { hair: '#556B2F', skin: '#F4A460', shirt: '#2BA876' },
  };

  const palette = colors[employee.id] || { hair: '#333333', skin: '#F4A460', shirt: '#666666' };

  const sizeMap = {
    small: { scale: 0.8, width: 32, height: 40 },
    medium: { scale: 1, width: 40, height: 50 },
  };

  const dims = sizeMap[size];

  return (
    <svg
      width={dims.width}
      height={dims.height}
      viewBox="0 0 40 50"
      style={{
        overflow: 'visible',
      }}
    >
      {/* Chair back */}
      <ellipse cx="20" cy="42" rx="8" ry="4" fill="#8B6F47" opacity="0.6" />

      {/* Body/Shirt */}
      <rect x="14" y="24" width="12" height="14" rx="2" fill={palette.shirt} />

      {/* Arms */}
      <line x1="14" y1="28" x2="6" y2="26" stroke={palette.skin} strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="28" x2="34" y2="26" stroke={palette.skin} strokeWidth="2" strokeLinecap="round" />

      {/* Head */}
      <circle cx="20" cy="14" r="7" fill={palette.skin} />

      {/* Hair */}
      <path d="M 13 14 Q 13 6 20 5 Q 27 6 27 14" fill={palette.hair} />

      {/* Eyes */}
      <circle cx="17" cy="12" r="1.5" fill="#000" />
      <circle cx="23" cy="12" r="1.5" fill="#000" />

      {/* Mouth - subtle smile */}
      <path d="M 18 16 Q 20 17 22 16" stroke="#000" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* Idle animation group */}
      <g style={{ animation: 'idle-breath 3s ease-in-out infinite', transformOrigin: '20px 20px' }}>
        <style>{`
          @keyframes idle-breath {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-1px); }
          }
        `}</style>
      </g>
    </svg>
  );
}
