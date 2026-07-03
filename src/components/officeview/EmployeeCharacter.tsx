import type { Employee } from '@/types/employee';

interface EmployeeCharacterProps {
  employee: Employee;
  size?: 'small' | 'medium';
}

export function EmployeeCharacter({ employee, size = 'medium' }: EmployeeCharacterProps) {
  const colors = {
    'marketing-director': { hair: '#8B4513', skin: '#F2D9C4', shirt: '#D84C45', shirtDark: '#8B2F25', accent: '#FFF0E0' },
    'website-auditor': { hair: '#2F4F4F', skin: '#F2D9C4', shirt: '#2BA876', shirtDark: '#1a5c4a', accent: '#E8F5F0' },
    'seo-ppc-manager': { hair: '#1a1a2e', skin: '#F2D9C4', shirt: '#1E5A9F', shirtDark: '#0d3a64', accent: '#E8F0F8' },
    'email-marketing-manager': { hair: '#8B7355', skin: '#F2D9C4', shirt: '#00A0C6', shirtDark: '#00699a', accent: '#E0F4FF' },
    'proposal-writer': { hair: '#6B4423', skin: '#F2D9C4', shirt: '#5C4ADE', shirtDark: '#3d2e9a', accent: '#F0E8FF' },
    'social-media-manager': { hair: '#7A1C1C', skin: '#F2D9C4', shirt: '#D84B8A', shirtDark: '#933060', accent: '#FFE8F5' },
    'case-study-writer': { hair: '#1C1C1C', skin: '#F2D9C4', shirt: '#9C6ADE', shirtDark: '#6b4aaa', accent: '#F5E8FF' },
    'funding-rewards-manager': { hair: '#556B2F', skin: '#F2D9C4', shirt: '#2BA876', shirtDark: '#1a5c4a', accent: '#E8F5F0' },
  };

  const palette = colors[employee.id] || { hair: '#333333', skin: '#F2D9C4', shirt: '#666666', shirtDark: '#444444', accent: '#F0F0F0' };

  const sizeMap = {
    small: { width: 48, height: 60 },
    medium: { width: 80, height: 104 },
  };

  const dims = sizeMap[size];

  return (
    <svg
      width={dims.width}
      height={dims.height}
      viewBox="0 0 80 104"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="person-shadow" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="4" stdDeviation="2.5" floodOpacity="0.4" />
        </filter>
        <linearGradient id="shirt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.shirt} />
          <stop offset="35%" stopColor={palette.shirt} />
          <stop offset="100%" stopColor={palette.shirtDark} />
        </linearGradient>
        <linearGradient id="skin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF5E6" />
          <stop offset="100%" stopColor={palette.skin} />
        </linearGradient>
        <linearGradient id="hair-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.hair} />
          <stop offset="100%" stopColor={`${palette.hair}dd`} />
        </linearGradient>
      </defs>

      {/* Ground shadow - enhanced */}
      <ellipse cx="40" cy="100" rx="26" ry="3.5" fill="rgba(0,0,0,0.38)" />

      <g filter="url(#person-shadow)">
        {/* Torso - realistic proportions */}
        <path
          d="M 18 62 Q 16 56 18 50 L 24 40 Q 26 38 40 38 Q 54 38 56 40 L 62 50 Q 64 56 62 62 L 60 88 Q 60 92 56 92 L 24 92 Q 20 92 20 88 Z"
          fill="url(#shirt-grad)"
        />

        {/* Shirt collar folds - more realistic */}
        <path d="M 36 38 L 32 48 L 32 50 L 36 44 Z" fill={palette.shirtDark} opacity="0.45" />
        <path d="M 44 38 L 48 48 L 48 50 L 44 44 Z" fill={palette.shirtDark} opacity="0.45" />

        {/* Shirt button line */}
        <line x1="40" y1="50" x2="40" y2="80" stroke={palette.shirtDark} strokeWidth="0.6" opacity="0.3" />

        {/* Shirt front panel highlight */}
        <path
          d="M 20 50 Q 18 56 18 72 L 18 86 Q 20 91 24 91 L 32 91 Q 31 86 31 72 L 31 50 Q 30 40 20 50"
          fill="rgba(255,255,255,0.32)"
        />

        {/* Shirt right shadow */}
        <path
          d="M 60 50 Q 62 56 62 72 L 62 86 Q 60 91 56 91 L 48 91 Q 49 86 49 72 L 49 50 Q 50 40 60 50"
          fill="rgba(0,0,0,0.14)"
        />

        {/* Shoulders/sleeves */}
        <path d="M 18 56 Q 14 54 6 52 Q 5 52 5 54 Q 5 56 6 56 Q 14 58 18 60 Z" fill={palette.skin} />
        <path d="M 62 56 Q 66 54 74 52 Q 75 52 75 54 Q 75 56 74 56 Q 66 58 62 60 Z" fill={palette.skin} />

        {/* Hands */}
        <circle cx="5" cy="55" r="3.6" fill={palette.skin} />
        <circle cx="75" cy="55" r="3.6" fill={palette.skin} />

        {/* Neck */}
        <rect x="37" y="36" width="6" height="6" fill={palette.skin} rx="2" />

        {/* Head - best proportions */}
        <circle cx="40" cy="22" r="17.5" fill="url(#skin-grad)" />

        {/* Head shadow/dimension */}
        <circle cx="40" cy="22" r="17.5" fill="rgba(0,0,0,0.12)" />

        {/* Hair - extremely detailed */}
        <g>
          {/* Main hair volume */}
          <path
            d="M 20 22 Q 20 -2 40 -8 Q 60 -2 60 22 Q 60 10 58 2 Q 56 -6 40 -7 Q 24 -6 22 2 Q 20 10 20 22"
            fill="url(#hair-grad)"
          />

          {/* Hair top highlight */}
          <path
            d="M 22 0 Q 30 -5 40 -8 Q 50 -5 58 2"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Hair side strands */}
          <path d="M 20 4 Q 20 -1 21 -5" stroke="rgba(0,0,0,0.2)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M 60 4 Q 60 -1 59 -5" stroke="rgba(0,0,0,0.2)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>

        {/* Ears - very visible */}
        <ellipse cx="21" cy="24" rx="3.2" ry="5.2" fill={palette.skin} />
        <ellipse cx="59" cy="24" rx="3.2" ry="5.2" fill={palette.skin} />
        <ellipse cx="21" cy="24" rx="1.8" ry="3.2" fill={palette.accent} opacity="0.85" />
        <ellipse cx="59" cy="24" rx="1.8" ry="3.2" fill={palette.accent} opacity="0.85" />

        {/* Eyes - extremely expressive and detailed */}
        <g>
          {/* Left eye white */}
          <ellipse cx="30" cy="20" rx="2.8" ry="3.2" fill="#ffffff" />
          {/* Left iris */}
          <circle cx="30.5" cy="21" r="1.6" fill="#8B6F47" />
          {/* Left pupil */}
          <circle cx="30.8" cy="20.5" r="0.95" fill="#000" />
          {/* Left shine - important for life */}
          <circle cx="31.6" cy="19.6" r="0.95" fill="#fff" />

          {/* Right eye white */}
          <ellipse cx="50" cy="20" rx="2.8" ry="3.2" fill="#ffffff" />
          {/* Right iris */}
          <circle cx="49.5" cy="21" r="1.6" fill="#8B6F47" />
          {/* Right pupil */}
          <circle cx="49.2" cy="20.5" r="0.95" fill="#000" />
          {/* Right shine */}
          <circle cx="48.4" cy="19.6" r="0.95" fill="#fff" />

          {/* Eyebrows - very expressive */}
          <path d="M 27.5 16 Q 30 14.8 32.5 16" stroke="#6B5344" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <path d="M 47.5 16 Q 50 14.8 52.5 16" stroke="#6B5344" strokeWidth="1.3" fill="none" strokeLinecap="round" />

          {/* Eye outline for depth */}
          <ellipse cx="30" cy="20" rx="2.8" ry="3.2" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.4" />
          <ellipse cx="50" cy="20" rx="2.8" ry="3.2" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.4" />
        </g>

        {/* Nose - dimension and depth */}
        <g>
          <path d="M 40 20 L 40 27.5" stroke={palette.accent} strokeWidth="1.4" strokeLinecap="round" />
          <line x1="37" y1="27.5" x2="37" y2="28.5" stroke="rgba(0,0,0,0.18)" strokeWidth="1" strokeLinecap="round" />
          <line x1="43" y1="27.5" x2="43" y2="28.5" stroke="rgba(0,0,0,0.18)" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Mouth - warm and friendly */}
        <g>
          <path d="M 34 34 Q 40 36.5 46 34" stroke="#E88080" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 34 34 Q 40 35.8 46 34 Q 40 34.8 34 34" fill="rgba(232,128,128,0.25)" />
        </g>

        {/* Cheeks - prominent blush */}
        <ellipse cx="22" cy="24" rx="5" ry="3.2" fill="rgba(255,140,120,0.28)" />
        <ellipse cx="58" cy="24" rx="5" ry="3.2" fill="rgba(255,140,120,0.28)" />
      </g>

      <style>{`
        @keyframes idle-breath {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1px); }
        }
      `}</style>
    </svg>
  );
}
