import type { Employee } from '@/types/employee';

interface EmployeeCharacterProps {
  employee: Employee;
  size?: 'small' | 'medium';
}

export function EmployeeCharacter({ employee, size = 'medium' }: EmployeeCharacterProps) {
  const colors = {
    'marketing-director': { hair: '#8B4513', skin: '#EDD5C4', shirt: '#D84C45', shirtDark: '#B83A35', accent: '#F0C8A0' },
    'website-auditor': { hair: '#2F4F4F', skin: '#EDD5C4', shirt: '#2BA876', shirtDark: '#1F7A54', accent: '#C8E6C9' },
    'seo-ppc-manager': { hair: '#333333', skin: '#EDD5C4', shirt: '#1E5A9F', shirtDark: '#164078', accent: '#BBDEFB' },
    'email-marketing-manager': { hair: '#8B7355', skin: '#EDD5C4', shirt: '#00A0C6', shirtDark: '#0081A0', accent: '#B2EBF2' },
    'proposal-writer': { hair: '#654321', skin: '#EDD5C4', shirt: '#5C4ADE', shirtDark: '#463AA0', accent: '#D1C4E9' },
    'social-media-manager': { hair: '#8B0000', skin: '#EDD5C4', shirt: '#D84B8A', shirtDark: '#A83A66', accent: '#F8BBD0' },
    'case-study-writer': { hair: '#1C1C1C', skin: '#EDD5C4', shirt: '#9C6ADE', shirtDark: '#7A509C', accent: '#E1BEE7' },
    'funding-rewards-manager': { hair: '#556B2F', skin: '#EDD5C4', shirt: '#2BA876', shirtDark: '#1F7A54', accent: '#C8E6C9' },
  };

  const palette = colors[employee.id] || { hair: '#333333', skin: '#EDD5C4', shirt: '#666666', shirtDark: '#444444', accent: '#E8E8E8' };

  const sizeMap = {
    small: { scale: 0.8, width: 40, height: 52 },
    medium: { scale: 1, width: 64, height: 80 },
  };

  const dims = sizeMap[size];

  return (
    <svg
      width={dims.width}
      height={dims.height}
      viewBox="0 0 64 80"
      style={{
        overflow: 'visible',
      }}
    >
      <defs>
        <filter id="char-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.28" />
        </filter>
        <linearGradient id="shirt-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.shirt} />
          <stop offset="50%" stopColor={palette.shirt} />
          <stop offset="100%" stopColor={palette.shirtDark} />
        </linearGradient>
        <linearGradient id="skin-face" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E6D3" />
          <stop offset="100%" stopColor={palette.skin} />
        </linearGradient>
        <linearGradient id="hair-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.hair} />
          <stop offset="100%" stopColor={palette.hair} opacity="0.85" />
        </linearGradient>
      </defs>

      {/* Shadow under person */}
      <ellipse cx="32" cy="77" rx="18" ry="2.5" fill="rgba(0,0,0,0.28)" />

      {/* Torso with shirt and collar detail */}
      <g filter="url(#char-shadow)">
        {/* Main shirt body */}
        <path d="M 10 42 Q 8 38 10 34 L 14 28 Q 16 26 32 26 Q 48 26 50 28 L 54 34 Q 56 38 54 42 L 52 62 Q 52 64 50 64 L 14 64 Q 12 64 12 62 Z" fill="url(#shirt-main)" />

        {/* Shirt collar definition left */}
        <path d="M 28 26 L 24 32 L 24 34 L 28 30 Z" fill={palette.shirtDark} opacity="0.35" />

        {/* Shirt collar definition right */}
        <path d="M 36 26 L 40 32 L 40 34 L 36 30 Z" fill={palette.shirtDark} opacity="0.35" />

        {/* Shirt highlight/light side (left shoulder) */}
        <path d="M 12 34 Q 11 38 11 50 L 11 60 Q 12 63 14 63 L 22 63 Q 21 59 21 50 L 21 34 Q 20 28 12 34" fill="rgba(255,255,255,0.22)" />

        {/* Shirt shadow/fold detail (right side) */}
        <path d="M 52 34 Q 53 38 53 50 L 53 60 Q 52 63 50 63 L 42 63 Q 43 59 43 50 L 43 34 Q 44 28 52 34" fill="rgba(0,0,0,0.1)" />
      </g>

      {/* Left arm - extended */}
      <g>
        <path d="M 10 38 Q 6 37 0 35 Q -1 35 -1 36 Q -1 37 0 37 Q 6 39 10 40" fill={palette.skin} />
        {/* Hand with more detail */}
        <circle cx="0" cy="36.5" r="2.8" fill={palette.skin} />
        {/* Thumb */}
        <line x1="-1" y1="34" x2="-2" y2="32" stroke={palette.skin} strokeWidth="0.8" strokeLinecap="round" />
      </g>

      {/* Right arm - extended */}
      <g>
        <path d="M 54 38 Q 58 37 64 35 Q 65 35 65 36 Q 65 37 64 37 Q 58 39 54 40" fill={palette.skin} />
        {/* Hand */}
        <circle cx="64" cy="36.5" r="2.8" fill={palette.skin} />
        {/* Thumb */}
        <line x1="65" y1="34" x2="66" y2="32" stroke={palette.skin} strokeWidth="0.8" strokeLinecap="round" />
      </g>

      {/* Neck */}
      <rect x="29" y="24" width="6" height="4" fill={palette.skin} />

      {/* Head - improved proportions */}
      <circle cx="32" cy="18" r="13" fill="url(#skin-face)" />

      {/* Head shadow/dimension for depth */}
      <circle cx="32" cy="18" r="13" fill="rgba(0,0,0,0.08)" />

      {/* Hair - more volume and realistic */}
      <g>
        {/* Back/top hair */}
        <path d="M 16 18 Q 16 2 32 -2 Q 48 2 48 18 Q 48 13 46 8 Q 44 0 32 -1 Q 20 0 18 8 Q 16 13 16 18" fill="url(#hair-grad)" />

        {/* Hair texture/highlight edge */}
        <path d="M 18 4 Q 24 -1 32 -2 Q 40 -1 46 6" stroke="rgba(255,255,255,0.18)" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* Side hair natural fall */}
        <path d="M 16 8 Q 16 5 17 2" stroke="rgba(0,0,0,0.14)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M 48 8 Q 48 5 47 2" stroke="rgba(0,0,0,0.14)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>

      {/* Ears with more detail */}
      <ellipse cx="17" cy="20" rx="2.4" ry="4" fill={palette.skin} />
      <ellipse cx="47" cy="20" rx="2.4" ry="4" fill={palette.skin} />
      {/* Ear inner - more visible */}
      <ellipse cx="17" cy="20" rx="1.3" ry="2.4" fill={palette.accent} opacity="0.7" />
      <ellipse cx="47" cy="20" rx="1.3" ry="2.4" fill={palette.accent} opacity="0.7" />

      {/* Eyes - very detailed and expressive */}
      <g>
        {/* Left eye white */}
        <ellipse cx="25" cy="16" rx="2.1" ry="2.4" fill="#ffffff" />
        {/* Left iris */}
        <circle cx="25.3" cy="16.8" r="1.2" fill="#8B6F47" />
        {/* Left pupil */}
        <circle cx="25.5" cy="16.5" r="0.75" fill="#000" />
        {/* Left eye highlight/shine - important for life */}
        <circle cx="26" cy="15.9" r="0.6" fill="#fff" />

        {/* Right eye white */}
        <ellipse cx="39" cy="16" rx="2.1" ry="2.4" fill="#ffffff" />
        {/* Right iris */}
        <circle cx="38.7" cy="16.8" r="1.2" fill="#8B6F47" />
        {/* Right pupil */}
        <circle cx="38.5" cy="16.5" r="0.75" fill="#000" />
        {/* Right eye highlight */}
        <circle cx="38" cy="15.9" r="0.6" fill="#fff" />

        {/* Eyebrows - more expressive and visible */}
        <path d="M 23 13 Q 25 12.2 27 13" stroke="#6B5344" strokeWidth="0.95" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 37 13 Q 39 12.2 41 13" stroke="#6B5344" strokeWidth="0.95" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Nose - with more dimension */}
      <g>
        <path d="M 32 16.5 L 32 21" stroke={palette.accent} strokeWidth="1.1" strokeLinecap="round" />
        {/* Nostril shadows for depth */}
        <line x1="30" y1="21" x2="30" y2="22" stroke="rgba(0,0,0,0.14)" strokeWidth="0.7" strokeLinecap="round" />
        <line x1="34" y1="21" x2="34" y2="22" stroke="rgba(0,0,0,0.14)" strokeWidth="0.7" strokeLinecap="round" />
      </g>

      {/* Mouth - friendly and natural */}
      <g>
        <path d="M 27 24 Q 32 25.8 37 24" stroke="#D97070" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Mouth fill - subtle smile depth */}
        <path d="M 27 24 Q 32 25 37 24 Q 32 24.5 27 24" fill="rgba(217,112,112,0.18)" />
      </g>

      {/* Cheek blush - more prominent for warmth */}
      <ellipse cx="18" cy="20" rx="3.5" ry="2.2" fill="rgba(235,150,130,0.22)" />
      <ellipse cx="46" cy="20" rx="3.5" ry="2.2" fill="rgba(235,150,130,0.22)" />

      <style>{`
        @keyframes idle-breath {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-0.5px); }
        }
      `}</style>
    </svg>
  );
}
