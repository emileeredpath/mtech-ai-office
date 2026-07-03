import type { Employee } from '@/types/employee';

interface EmployeeCharacterProps {
  employee: Employee;
  size?: 'small' | 'medium';
}

export function EmployeeCharacter({ employee, size = 'medium' }: EmployeeCharacterProps) {
  const colors = {
    'marketing-director': { hair: '#9B6B3B', skin: '#F8DCC8', shirt: '#C74545', shirtDark: '#7A2A2A', shirtMid: '#E05555' },
    'website-auditor': { hair: '#5A7A8A', skin: '#F8DCC8', shirt: '#2BA876', shirtDark: '#0D6B48', shirtMid: '#4ECBA3' },
    'seo-ppc-manager': { hair: '#3A4A5A', skin: '#F8DCC8', shirt: '#2570B5', shirtDark: '#0D3A7A', shirtMid: '#4A90E2' },
    'email-marketing-manager': { hair: '#8B8060', skin: '#F8DCC8', shirt: '#1FA0C6', shirtDark: '#0A6A8A', shirtMid: '#4ABDDB' },
    'proposal-writer': { hair: '#8A6A4A', skin: '#F8DCC8', shirt: '#6B5ADE', shirtDark: '#3A2AAA', shirtMid: '#8B7DEE' },
    'social-media-manager': { hair: '#9A4A4A', skin: '#F8DCC8', shirt: '#D84B8A', shirtDark: '#7A2A4A', shirtMid: '#FF6EB4' },
    'case-study-writer': { hair: '#3A3A4A', skin: '#F8DCC8', shirt: '#9C6ADE', shirtDark: '#5A3AAA', shirtMid: '#B88DEE' },
    'funding-rewards-manager': { hair: '#6A7B4A', skin: '#F8DCC8', shirt: '#2BA876', shirtDark: '#0D6B48', shirtMid: '#4ECBA3' },
  };

  const palette = colors[employee.id] || { hair: '#4A4A5A', skin: '#F8DCC8', shirt: '#666666', shirtDark: '#333333', shirtMid: '#888888' };

  const sizeMap = {
    small: { width: 56, height: 72 },
    medium: { width: 96, height: 128 },
  };

  const dims = sizeMap[size];

  return (
    <svg width={dims.width} height={dims.height} viewBox="0 0 96 128" style={{ overflow: 'visible' }}>
      <defs>
        <filter id="char-shadow" x="-100%" y="-100%" width="300%" height="300%">
          <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodOpacity="0.5" />
        </filter>
        <linearGradient id="shirt-grad-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.shirtMid} />
          <stop offset="50%" stopColor={palette.shirt} />
          <stop offset="100%" stopColor={palette.shirtDark} />
        </linearGradient>
        <linearGradient id="skin-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFAEF" />
          <stop offset="100%" stopColor={palette.skin} />
        </linearGradient>
        <linearGradient id="hair-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.hair} />
          <stop offset="100%" stopColor={`${palette.hair}dd`} />
        </linearGradient>
      </defs>

      <ellipse cx="48" cy="124" rx="36" ry="4.5" fill="rgba(0,0,0,0.45)" />

      <g filter="url(#char-shadow)">
        {/* Torso - realistic body shape */}
        <path
          d="M 22 78 Q 20 68 22 58 L 32 40 Q 34 38 48 38 Q 62 38 64 40 L 74 58 Q 76 68 74 78 L 72 110 Q 72 118 66 118 L 30 118 Q 24 118 24 110 Z"
          fill="url(#shirt-grad-main)"
        />

        {/* Shirt collar folds */}
        <path d="M 44 38 L 40 54 L 40 56 L 44 48 Z" fill={palette.shirtDark} opacity="0.55" />
        <path d="M 52 38 L 56 54 L 56 56 L 52 48 Z" fill={palette.shirtDark} opacity="0.55" />

        {/* Shirt button line */}
        <line x1="48" y1="54" x2="48" y2="95" stroke={palette.shirtDark} strokeWidth="0.8" opacity="0.35" />

        {/* Front panel highlight */}
        <path
          d="M 24 58 Q 22 68 22 88 L 22 108 Q 24 116 30 116 L 42 116 Q 41 110 41 88 L 41 58 Q 40 40 24 58"
          fill="rgba(255,255,255,0.38)"
        />

        {/* Back shadow */}
        <path
          d="M 72 58 Q 74 68 74 88 L 74 108 Q 72 116 66 116 L 54 116 Q 55 110 55 88 L 55 58 Q 56 40 72 58"
          fill="rgba(0,0,0,0.16)"
        />

        {/* Left sleeve */}
        <path d="M 22 68 Q 14 66 2 62 Q 0 62 0 64 Q 0 67 2 68 Q 14 72 22 76 Z" fill={palette.skin} />

        {/* Right sleeve */}
        <path d="M 74 68 Q 82 66 94 62 Q 96 62 96 64 Q 96 67 94 68 Q 82 72 74 76 Z" fill={palette.skin} />

        {/* Hands */}
        <circle cx="0" cy="66" r="4.5" fill={palette.skin} />
        <circle cx="96" cy="66" r="4.5" fill={palette.skin} />

        {/* Neck */}
        <rect x="45" y="36" width="6" height="8" fill={palette.skin} rx="2" />

        {/* Head */}
        <circle cx="48" cy="18" r="21" fill="url(#skin-main)" />

        {/* Head contour */}
        <circle cx="48" cy="18" r="21" fill="rgba(0,0,0,0.15)" />

        {/* Hair */}
        <g>
          <path
            d="M 24 18 Q 24 -6 48 -16 Q 72 -6 72 18 Q 72 2 70 -8 Q 68 -14 48 -15 Q 28 -14 26 -8 Q 24 2 24 18"
            fill="url(#hair-main)"
          />
          <path d="M 28 -6 Q 38 -12 48 -16 Q 58 -12 68 -2" stroke="rgba(255,255,255,0.4)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </g>

        {/* Ears */}
        <ellipse cx="25" cy="22" rx="4" ry="7" fill={palette.skin} />
        <ellipse cx="71" cy="22" rx="4" ry="7" fill={palette.skin} />
        <ellipse cx="25" cy="22" rx="2.2" ry="4" fill="rgba(255,200,150,0.85)" />
        <ellipse cx="71" cy="22" rx="2.2" ry="4" fill="rgba(255,200,150,0.85)" />

        {/* Eyes - highly detailed and expressive */}
        <g>
          <ellipse cx="36" cy="16" rx="3.8" ry="4.5" fill="#ffffff" />
          <circle cx="36.8" cy="18" r="2.1" fill="#9B7A5E" />
          <circle cx="37.2" cy="17" r="1.3" fill="#000" />
          <circle cx="38.5" cy="15.2" r="1.2" fill="#fff" opacity="0.95" />

          <ellipse cx="60" cy="16" rx="3.8" ry="4.5" fill="#ffffff" />
          <circle cx="59.2" cy="18" r="2.1" fill="#9B7A5E" />
          <circle cx="58.8" cy="17" r="1.3" fill="#000" />
          <circle cx="57.5" cy="15.2" r="1.2" fill="#fff" opacity="0.95" />

          <path d="M 32 12 Q 36 10.5 40 12" stroke="#6A5A4A" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M 56 12 Q 60 10.5 64 12" stroke="#6A5A4A" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>

        {/* Nose */}
        <g>
          <path d="M 48 16 L 48 30" stroke="rgba(220,180,140,0.9)" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="44.5" y1="30" x2="44.5" y2="32" stroke="rgba(0,0,0,0.22)" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="51.5" y1="30" x2="51.5" y2="32" stroke="rgba(0,0,0,0.22)" strokeWidth="1.4" strokeLinecap="round" />
        </g>

        {/* Mouth - warm smile */}
        <g>
          <path d="M 40 40 Q 48 42.5 56 40" stroke="#E8A0A0" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M 40 40 Q 48 41.8 56 40 Q 48 41 40 40" fill="rgba(232,160,160,0.32)" />
        </g>

        {/* Cheeks - prominent rosy blush */}
        <ellipse cx="28" cy="24" rx="6.5" ry="4.2" fill="rgba(255,160,130,0.36)" />
        <ellipse cx="68" cy="24" rx="6.5" ry="4.2" fill="rgba(255,160,130,0.36)" />
      </g>
    </svg>
  );
}
