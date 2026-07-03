import type { Employee } from '@/types/employee';

interface EmployeeCharacterProps {
  employee: Employee;
  size?: 'small' | 'medium';
}

export function EmployeeCharacter({ employee, size = 'medium' }: EmployeeCharacterProps) {
  const colors = {
    'marketing-director': { hair: '#8B4513', skin: '#F0DCC8', shirt: '#D84C45', shirtDark: '#9B3230', accent: '#F5D4B8' },
    'website-auditor': { hair: '#2F4F4F', skin: '#F0DCC8', shirt: '#2BA876', shirtDark: '#1a6b4f', accent: '#D4F1E4' },
    'seo-ppc-manager': { hair: '#1a1a2e', skin: '#F0DCC8', shirt: '#1E5A9F', shirtDark: '#0f3a66', accent: '#D6E8F7' },
    'email-marketing-manager': { hair: '#8B7355', skin: '#F0DCC8', shirt: '#00A0C6', shirtDark: '#0070a0', accent: '#D4EEF7' },
    'proposal-writer': { hair: '#6B4423', skin: '#F0DCC8', shirt: '#5C4ADE', shirtDark: '#3e2d9a', accent: '#E8DFF7' },
    'social-media-manager': { hair: '#7A1C1C', skin: '#F0DCC8', shirt: '#D84B8A', shirtDark: '#9a2f5f', accent: '#F5D9E8' },
    'case-study-writer': { hair: '#1C1C1C', skin: '#F0DCC8', shirt: '#9C6ADE', shirtDark: '#6b4a9a', accent: '#E8D9F5' },
    'funding-rewards-manager': { hair: '#556B2F', skin: '#F0DCC8', shirt: '#2BA876', shirtDark: '#1a6b4f', accent: '#D4F1E4' },
  };

  const palette = colors[employee.id] || { hair: '#333333', skin: '#F0DCC8', shirt: '#666666', shirtDark: '#444444', accent: '#E8E8E8' };

  const sizeMap = {
    small: { width: 44, height: 56 },
    medium: { width: 72, height: 92 },
  };

  const dims = sizeMap[size];

  return (
    <svg
      width={dims.width}
      height={dims.height}
      viewBox="0 0 72 92"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="person-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.35" />
        </filter>
        <linearGradient id="shirt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.shirt} />
          <stop offset="40%" stopColor={palette.shirt} />
          <stop offset="100%" stopColor={palette.shirtDark} />
        </linearGradient>
        <linearGradient id="skin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAECD5" />
          <stop offset="100%" stopColor={palette.skin} />
        </linearGradient>
        <linearGradient id="hair-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.hair} />
          <stop offset="100%" stopColor={`${palette.hair}cc`} />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="36" cy="88" rx="22" ry="3" fill="rgba(0,0,0,0.32)" />

      <g filter="url(#person-shadow)">
        {/* Torso - wider, more realistic */}
        <path
          d="M 16 52 Q 14 48 16 44 L 20 36 Q 22 34 36 34 Q 50 34 52 36 L 56 44 Q 58 48 56 52 L 54 72 Q 54 76 50 76 L 22 76 Q 18 76 18 72 Z"
          fill="url(#shirt-grad)"
        />

        {/* Shirt collar fold left */}
        <path d="M 32 34 L 28 42 L 28 44 L 32 38 Z" fill={palette.shirtDark} opacity="0.4" />
        {/* Shirt collar fold right */}
        <path d="M 40 34 L 44 42 L 44 44 L 40 38 Z" fill={palette.shirtDark} opacity="0.4" />

        {/* Shirt highlight - left shoulder */}
        <path
          d="M 18 44 Q 16 48 16 60 L 16 70 Q 18 75 22 75 L 28 75 Q 27 70 27 60 L 27 44 Q 26 36 18 44"
          fill="rgba(255,255,255,0.28)"
        />

        {/* Shirt shadow - right side */}
        <path
          d="M 54 44 Q 56 48 56 60 L 56 70 Q 54 75 50 75 L 44 75 Q 45 70 45 60 L 45 44 Q 46 36 54 44"
          fill="rgba(0,0,0,0.12)"
        />

        {/* Sleeves - better definition */}
        <path
          d="M 16 48 Q 12 46 6 44 Q 5 44 5 45 Q 5 47 6 47 Q 12 49 16 51 Z"
          fill={palette.skin}
        />
        <path
          d="M 56 48 Q 60 46 66 44 Q 67 44 67 45 Q 67 47 66 47 Q 60 49 56 51 Z"
          fill={palette.skin}
        />

        {/* Hands - better detail */}
        <g>
          <circle cx="5" cy="45" r="3.2" fill={palette.skin} />
          <line x1="2.5" y1="43" x2="1" y2="40" stroke={palette.skin} strokeWidth="1" strokeLinecap="round" />
        </g>
        <g>
          <circle cx="67" cy="45" r="3.2" fill={palette.skin} />
          <line x1="69.5" y1="43" x2="71" y2="40" stroke={palette.skin} strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Neck */}
        <rect x="33" y="32" width="6" height="5" fill={palette.skin} rx="1" />

        {/* Head - larger, better proportions */}
        <circle cx="36" cy="20" r="15.5" fill="url(#skin-grad)" />

        {/* Head contour shadow */}
        <circle cx="36" cy="20" r="15.5" fill="rgba(0,0,0,0.1)" />

        {/* Hair - very detailed */}
        <g>
          {/* Main hair volume */}
          <path
            d="M 18 20 Q 18 0 36 -4 Q 54 0 54 20 Q 54 12 52 6 Q 50 -2 36 -3 Q 22 -2 20 6 Q 18 12 18 20"
            fill="url(#hair-grad)"
          />

          {/* Hair texture - top highlight */}
          <path
            d="M 20 2 Q 26 -2 36 -4 Q 46 -2 52 5"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Hair side definition */}
          <path d="M 18 6 Q 18 2 19 -2" stroke="rgba(0,0,0,0.18)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M 54 6 Q 54 2 53 -2" stroke="rgba(0,0,0,0.18)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>

        {/* Ears - better detail */}
        <ellipse cx="19" cy="22" rx="2.8" ry="4.5" fill={palette.skin} />
        <ellipse cx="53" cy="22" rx="2.8" ry="4.5" fill={palette.skin} />
        <ellipse cx="19" cy="22" rx="1.6" ry="2.8" fill={palette.accent} opacity="0.8" />
        <ellipse cx="53" cy="22" rx="1.6" ry="2.8" fill={palette.accent} opacity="0.8" />

        {/* Eyes - very detailed and expressive */}
        <g>
          {/* Left eye */}
          <ellipse cx="28" cy="18" rx="2.4" ry="2.8" fill="#ffffff" />
          <circle cx="28.4" cy="19" r="1.4" fill="#8B6F47" />
          <circle cx="28.7" cy="18.5" r="0.8" fill="#000" />
          <circle cx="29.4" cy="17.6" r="0.8" fill="#fff" />

          {/* Right eye */}
          <ellipse cx="44" cy="18" rx="2.4" ry="2.8" fill="#ffffff" />
          <circle cx="43.6" cy="19" r="1.4" fill="#8B6F47" />
          <circle cx="43.3" cy="18.5" r="0.8" fill="#000" />
          <circle cx="42.6" cy="17.6" r="0.8" fill="#fff" />

          {/* Eyebrows - expressive */}
          <path d="M 25.5 14.5 Q 28 13.5 30.5 14.5" stroke="#6B5344" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <path d="M 41.5 14.5 Q 44 13.5 46.5 14.5" stroke="#6B5344" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        </g>

        {/* Nose - dimension */}
        <g>
          <path d="M 36 18 L 36 24" stroke={palette.accent} strokeWidth="1.2" strokeLinecap="round" />
          <line x1="33.5" y1="24" x2="33.5" y2="25" stroke="rgba(0,0,0,0.16)" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="38.5" y1="24" x2="38.5" y2="25" stroke="rgba(0,0,0,0.16)" strokeWidth="0.8" strokeLinecap="round" />
        </g>

        {/* Mouth - friendly smile */}
        <g>
          <path d="M 31 28 Q 36 30.2 41 28" stroke="#E07070" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M 31 28 Q 36 29.5 41 28 Q 36 28.8 31 28" fill="rgba(224,112,112,0.22)" />
        </g>

        {/* Cheeks - blush */}
        <ellipse cx="21" cy="22" rx="4.2" ry="2.8" fill="rgba(245,140,120,0.25)" />
        <ellipse cx="51" cy="22" rx="4.2" ry="2.8" fill="rgba(245,140,120,0.25)" />
      </g>

      <style>{`
        @keyframes idle-breath {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-0.8px); }
        }
      `}</style>
    </svg>
  );
}
