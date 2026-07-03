import type { Employee } from '@/types/employee';

interface EmployeeCharacterProps {
  employee: Employee;
  size?: 'small' | 'medium';
}

export function EmployeeCharacter({ employee, size = 'medium' }: EmployeeCharacterProps) {
  const colors = {
    'marketing-director': { hair: '#8B4513', skin: '#E8C5A5', shirt: '#D84C45', shirtDark: '#B83A35' },
    'website-auditor': { hair: '#2F4F4F', skin: '#E8C5A5', shirt: '#2BA876', shirtDark: '#1F7A54' },
    'seo-ppc-manager': { hair: '#333333', skin: '#E8C5A5', shirt: '#1E5A9F', shirtDark: '#164078' },
    'email-marketing-manager': { hair: '#8B7355', skin: '#E8C5A5', shirt: '#00A0C6', shirtDark: '#0081A0' },
    'proposal-writer': { hair: '#654321', skin: '#E8C5A5', shirt: '#5C4ADE', shirtDark: '#463AA0' },
    'social-media-manager': { hair: '#8B0000', skin: '#E8C5A5', shirt: '#D84B8A', shirtDark: '#A83A66' },
    'case-study-writer': { hair: '#1C1C1C', skin: '#E8C5A5', shirt: '#9C6ADE', shirtDark: '#7A509C' },
    'funding-rewards-manager': { hair: '#556B2F', skin: '#E8C5A5', shirt: '#2BA876', shirtDark: '#1F7A54' },
  };

  const palette = colors[employee.id] || { hair: '#333333', skin: '#E8C5A5', shirt: '#666666', shirtDark: '#444444' };

  const sizeMap = {
    small: { scale: 0.8, width: 36, height: 48 },
    medium: { scale: 1, width: 56, height: 68 },
  };

  const dims = sizeMap[size];
  const scale = size === 'small' ? 36/56 : 1;

  return (
    <svg
      width={dims.width}
      height={dims.height}
      viewBox="0 0 56 68"
      style={{
        overflow: 'visible',
      }}
    >
      <defs>
        <filter id="shadow-filter">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.2" />
        </filter>
        <linearGradient id="shirt-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.shirt} />
          <stop offset="50%" stopColor={palette.shirt} />
          <stop offset="100%" stopColor={palette.shirtDark} />
        </linearGradient>
        <linearGradient id="skin-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0D9C8" />
          <stop offset="100%" stopColor={palette.skin} />
        </linearGradient>
      </defs>

      {/* Shadow under person */}
      <ellipse cx="28" cy="65" rx="14" ry="2.5" fill="rgba(0,0,0,0.2)" />

      {/* Torso/Shirt - more realistic proportions */}
      <g filter="url(#shadow-filter)">
        {/* Main shirt body */}
        <path d="M 14 32 Q 12 30 14 28 L 18 26 Q 20 24 28 24 Q 36 24 38 26 L 42 28 Q 44 30 42 32 L 40 48 Q 40 50 38 50 L 18 50 Q 16 50 16 48 Z" fill="url(#shirt-gradient)" />

        {/* Shirt highlight/light side */}
        <path d="M 15 28 Q 14 30 14 38 L 14 45 Q 15 48 17 48 L 20 48 Q 19 45 19 40 L 19 28 Q 18 26 15 28" fill="rgba(255,255,255,0.15)" />
      </g>

      {/* Left arm */}
      <g>
        <path d="M 14 32 Q 10 31 6 30 Q 5 30 5 31 Q 5 32 6 32 Q 10 33 14 34" fill={palette.skin} />
        {/* Hand */}
        <circle cx="5" cy="31" r="2.2" fill={palette.skin} />
        {/* Fingers suggestion */}
        <line x1="3.5" y1="30" x2="3.5" y2="31.5" stroke={palette.skin} strokeWidth="0.6" />
        <line x1="5" y1="28.8" x2="5" y2="29.5" stroke={palette.skin} strokeWidth="0.6" />
      </g>

      {/* Right arm */}
      <g>
        <path d="M 42 32 Q 46 31 50 30 Q 51 30 51 31 Q 51 32 50 32 Q 46 33 42 34" fill={palette.skin} />
        {/* Hand */}
        <circle cx="51" cy="31" r="2.2" fill={palette.skin} />
        {/* Fingers suggestion */}
        <line x1="52.5" y1="30" x2="52.5" y2="31.5" stroke={palette.skin} strokeWidth="0.6" />
        <line x1="51" y1="28.8" x2="51" y2="29.5" stroke={palette.skin} strokeWidth="0.6" />
      </g>

      {/* Neck */}
      <rect x="25" y="24" width="6" height="3.5" fill={palette.skin} />

      {/* Head */}
      <circle cx="28" cy="16" r="10" fill="url(#skin-gradient)" />

      {/* Head shadow/cheek definition */}
      <circle cx="28" cy="16" r="10" fill="rgba(0,0,0,0.05)" />

      {/* Hair - fuller and more detailed */}
      <g>
        {/* Main hair */}
        <path d="M 16 16 Q 16 4 28 2 Q 40 4 40 16 Q 40 13 38 10 Q 36 6 28 4 Q 20 6 18 10 Q 16 13 16 16" fill={palette.hair} />
        {/* Hair shading/depth */}
        <path d="M 18 7 Q 20 5 28 4 Q 36 5 38 10 Q 37 6 28 5 Q 22 5 18 7" fill="rgba(0,0,0,0.15)" />
      </g>

      {/* Ears */}
      <ellipse cx="15" cy="17" rx="2" ry="3" fill={palette.skin} />
      <ellipse cx="41" cy="17" rx="2" ry="3" fill={palette.skin} />

      {/* Eyes - detailed */}
      <g>
        {/* Left eye white */}
        <ellipse cx="23" cy="15" rx="1.5" ry="1.8" fill="#ffffff" />
        {/* Left pupil */}
        <circle cx="23.2" cy="15.2" r="0.9" fill="#000" />
        {/* Left eye shine */}
        <circle cx="23.5" cy="14.8" r="0.4" fill="#fff" />

        {/* Right eye white */}
        <ellipse cx="33" cy="15" rx="1.5" ry="1.8" fill="#ffffff" />
        {/* Right pupil */}
        <circle cx="32.8" cy="15.2" r="0.9" fill="#000" />
        {/* Right eye shine */}
        <circle cx="33.5" cy="14.8" r="0.4" fill="#fff" />

        {/* Eyebrows */}
        <path d="M 21.5 12.5 Q 23 12 24.5 12.5" stroke="#8B6F47" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M 31.5 12.5 Q 33 12 34.5 12.5" stroke="#8B6F47" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      </g>

      {/* Nose */}
      <g>
        <line x1="28" y1="15" x2="28" y2="18.5" stroke="#D4A574" strokeWidth="0.9" strokeLinecap="round" />
        {/* Nostril shadows */}
        <line x1="26.5" y1="18.5" x2="26.5" y2="19" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
        <line x1="29.5" y1="18.5" x2="29.5" y2="19" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
      </g>

      {/* Mouth - friendly smile */}
      <path d="M 24 21 Q 28 22.5 32 21" stroke="#C97070" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Cheek blush - subtle */}
      <ellipse cx="18" cy="17" rx="2.5" ry="1.5" fill="rgba(217,124,99,0.15)" />
      <ellipse cx="38" cy="17" rx="2.5" ry="1.5" fill="rgba(217,124,99,0.15)" />

      <style>{`
        @keyframes idle-breath {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1px); }
        }
      `}</style>
    </svg>
  );
}
