import type { Employee } from '@/types/employee';

interface EmployeeCharacterProps {
  employee: Employee;
  size?: 'small' | 'medium';
}

export function EmployeeCharacter({ employee, size = 'medium' }: EmployeeCharacterProps) {
  const colors = {
    'marketing-director': { hair: '#8B4513', skin: '#E8C5A5', shirt: '#D84C45' },
    'website-auditor': { hair: '#2F4F4F', skin: '#E8C5A5', shirt: '#2BA876' },
    'seo-ppc-manager': { hair: '#333333', skin: '#E8C5A5', shirt: '#1E5A9F' },
    'email-marketing-manager': { hair: '#8B7355', skin: '#E8C5A5', shirt: '#00A0C6' },
    'proposal-writer': { hair: '#654321', skin: '#E8C5A5', shirt: '#5C4ADE' },
    'social-media-manager': { hair: '#8B0000', skin: '#E8C5A5', shirt: '#D84B8A' },
    'case-study-writer': { hair: '#1C1C1C', skin: '#E8C5A5', shirt: '#9C6ADE' },
    'funding-rewards-manager': { hair: '#556B2F', skin: '#E8C5A5', shirt: '#2BA876' },
  };

  const palette = colors[employee.id] || { hair: '#333333', skin: '#E8C5A5', shirt: '#666666' };

  const sizeMap = {
    small: { scale: 0.8, width: 32, height: 40 },
    medium: { scale: 1, width: 48, height: 56 },
  };

  const dims = sizeMap[size];

  return (
    <svg
      width={dims.width}
      height={dims.height}
      viewBox="0 0 48 56"
      style={{
        overflow: 'visible',
      }}
    >
      {/* Shadow under person */}
      <ellipse cx="24" cy="53" rx="12" ry="2" fill="rgba(0,0,0,0.15)" />

      {/* Body/Shirt - wider and rounder */}
      <path d="M 16 28 Q 16 26 18 26 L 30 26 Q 32 26 32 28 L 32 38 Q 32 40 30 40 L 18 40 Q 16 40 16 38 Z" fill={palette.shirt} />

      {/* Neck */}
      <rect x="21" y="24" width="6" height="3" fill={palette.skin} />

      {/* Left arm - with hand */}
      <g>
        <line x1="16" y1="30" x2="8" y2="28" stroke={palette.skin} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="7" cy="28" r="1.8" fill={palette.skin} />
      </g>

      {/* Right arm - with hand */}
      <g>
        <line x1="32" y1="30" x2="40" y2="28" stroke={palette.skin} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="41" cy="28" r="1.8" fill={palette.skin} />
      </g>

      {/* Head */}
      <circle cx="24" cy="16" r="8.5" fill={palette.skin} />

      {/* Hair - fuller, more natural */}
      <path d="M 15 16 Q 15 6 24 4 Q 33 6 33 16 Q 33 14 32 12 Q 32 10 24 8 Q 16 10 16 12 Q 15 14 15 16" fill={palette.hair} />

      {/* Ears - subtle */}
      <ellipse cx="14.5" cy="17" rx="1.5" ry="2.5" fill={palette.skin} />
      <ellipse cx="33.5" cy="17" rx="1.5" ry="2.5" fill={palette.skin} />

      {/* Eyes - more expressive */}
      <circle cx="20" cy="14" r="1.2" fill="#000" />
      <circle cx="20.5" cy="13.5" r="0.5" fill="#fff" />
      <circle cx="28" cy="14" r="1.2" fill="#000" />
      <circle cx="28.5" cy="13.5" r="0.5" fill="#fff" />

      {/* Nose - simple */}
      <line x1="24" y1="14" x2="24" y2="17" stroke={palette.skin} strokeWidth="0.8" strokeLinecap="round" />

      {/* Mouth - friendly smile */}
      <path d="M 21 19 Q 24 20.5 27 19" stroke="#000" strokeWidth="1" fill="none" strokeLinecap="round" />

      <style>{`
        @keyframes idle-breath {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1.5px); }
        }
      `}</style>
    </svg>
  );
}
