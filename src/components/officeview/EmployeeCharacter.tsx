import type { Employee } from '@/types/employee';

interface EmployeeCharacterProps {
  employee: Employee;
  size?: 'small' | 'medium';
}

export function EmployeeCharacter({ employee, size = 'medium' }: EmployeeCharacterProps) {
  const colors = {
    'marketing-director': { hair: '#8B5A2B', skin: '#F5DCC4', shirt: '#C84545', shirtDark: '#8B3A3A', shirtLight: '#E85C5C' },
    'website-auditor': { hair: '#4A5A6A', skin: '#F5DCC4', shirt: '#2BA876', shirtDark: '#1a6e58', shirtLight: '#4ECBA3' },
    'seo-ppc-manager': { hair: '#2A3A4A', skin: '#F5DCC4', shirt: '#2570B5', shirtDark: '#1a4a8a', shirtLight: '#4A90E2' },
    'email-marketing-manager': { hair: '#8B7355', skin: '#F5DCC4', shirt: '#1FA0C6', shirtDark: '#0D7A99', shirtLight: '#4ABDDB' },
    'proposal-writer': { hair: '#7A5A3A', skin: '#F5DCC4', shirt: '#6B5ADE', shirtDark: '#5040AA', shirtLight: '#8B7DEE' },
    'social-media-manager': { hair: '#8B3A3A', skin: '#F5DCC4', shirt: '#D84B8A', shirtDark: '#A83A66', shirtLight: '#FF6EB4' },
    'case-study-writer': { hair: '#2A2A3A', skin: '#F5DCC4', shirt: '#9C6ADE', shirtDark: '#6B4AAA', shirtLight: '#B88DEE' },
    'funding-rewards-manager': { hair: '#5A6B3A', skin: '#F5DCC4', shirt: '#2BA876', shirtDark: '#1a6e58', shirtLight: '#4ECBA3' },
  };

  const palette = colors[employee.id] || { hair: '#3A3A4A', skin: '#F5DCC4', shirt: '#666666', shirtDark: '#444444', shirtLight: '#888888' };

  const sizeMap = {
    small: { width: 52, height: 68 },
    medium: { width: 88, height: 116 },
  };

  const dims = sizeMap[size];

  return (
    <svg
      width={dims.width}
      height={dims.height}
      viewBox="0 0 88 116"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="char-drop-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.45" />
        </filter>
        <linearGradient id="body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.shirtLight} />
          <stop offset="40%" stopColor={palette.shirt} />
          <stop offset="100%" stopColor={palette.shirtDark} />
        </linearGradient>
        <linearGradient id="skin-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF0E0" />
          <stop offset="100%" stopColor={palette.skin} />
        </linearGradient>
        <linearGradient id="hair-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.hair} />
          <stop offset="100%" stopColor={`${palette.hair}dd`} />
        </linearGradient>
      </defs>

      <ellipse cx="44" cy="112" rx="32" ry="4" fill="rgba(0,0,0,0.4)" />

      <g filter="url(#char-drop-shadow)">
        {/* Torso - realistic shirt body */}
        <path
          d="M 20 70 Q 18 62 20 54 L 28 40 Q 30 38 44 38 Q 58 38 60 40 L 68 54 Q 70 62 68 70 L 66 100 Q 66 106 60 106 L 28 106 Q 22 106 22 100 Z"
          fill="url(#body-grad)"
        />

        {/* Shirt collar - defined */}
        <path d="M 40 38 L 36 50 L 36 52 L 40 46 Z" fill={palette.shirtDark} opacity="0.5" />
        <path d="M 48 38 L 52 50 L 52 52 L 48 46 Z" fill={palette.shirtDark} opacity="0.5" />

        {/* Shirt front panel highlight */}
        <path
          d="M 22 54 Q 20 62 20 80 L 20 100 Q 22 105 28 105 L 38 105 Q 37 100 37 80 L 37 54 Q 36 40 22 54"
          fill="rgba(255,255,255,0.35)"
        />

        {/* Shirt sleeve/shoulder definition */}
        <path d="M 20 62 Q 14 60 4 56 Q 2 56 2 58 Q 2 60 4 61 Q 14 65 20 68 Z" fill={palette.skin} />
        <path d="M 68 62 Q 74 60 84 56 Q 86 56 86 58 Q 86 60 84 61 Q 74 65 68 68 Z" fill={palette.skin} />

        {/* Hands */}
        <circle cx="2" cy="60" r="4" fill={palette.skin} />
        <circle cx="86" cy="60" r="4" fill={palette.skin} />

        {/* Neck */}
        <rect x="41" y="36" width="6" height="7" fill={palette.skin} rx="2" />

        {/* Head - detailed */}
        <circle cx="44" cy="20" r="19" fill="url(#skin-main)" />

        {/* Head shading */}
        <circle cx="44" cy="20" r="19" fill="rgba(0,0,0,0.14)" />

        {/* Hair - volume and texture */}
        <g>
          <path
            d="M 22 20 Q 22 -4 44 -12 Q 66 -4 66 20 Q 66 6 64 -2 Q 62 -10 44 -11 Q 26 -10 26 -2 Q 22 6 22 20"
            fill="url(#hair-main)"
          />

          {/* Hair highlight */}
          <path
            d="M 26 -2 Q 34 -8 44 -12 Q 54 -8 62 4"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Ears */}
        <ellipse cx="23" cy="22" rx="3.5" ry="6" fill={palette.skin} />
        <ellipse cx="65" cy="22" rx="3.5" ry="6" fill={palette.skin} />
        <ellipse cx="23" cy="22" rx="2" ry="3.5" fill="rgba(255,200,150,0.8)" />
        <ellipse cx="65" cy="22" rx="2" ry="3.5" fill="rgba(255,200,150,0.8)" />

        {/* Eyes - highly detailed */}
        <g>
          {/* Left eye */}
          <ellipse cx="32" cy="18" rx="3.2" ry="3.8" fill="#ffffff" />
          <circle cx="32.6" cy="19.5" r="1.8" fill="#9B7A5E" />
          <circle cx="33" cy="18.8" r="1.1" fill="#000" />
          <circle cx="34" cy="17.5" r="1" fill="#fff" opacity="0.9" />

          {/* Right eye */}
          <ellipse cx="56" cy="18" rx="3.2" ry="3.8" fill="#ffffff" />
          <circle cx="55.4" cy="19.5" r="1.8" fill="#9B7A5E" />
          <circle cx="55" cy="18.8" r="1.1" fill="#000" />
          <circle cx="54" cy="17.5" r="1" fill="#fff" opacity="0.9" />

          {/* Eyebrows */}
          <path d="M 29 14.5 Q 32 13 35 14.5" stroke="#5A4A3A" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M 53 14.5 Q 56 13 59 14.5" stroke="#5A4A3A" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>

        {/* Nose */}
        <g>
          <path d="M 44 18 L 44 28" stroke="rgba(220,180,140,0.8)" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="41" y1="28" x2="41" y2="29.5" stroke="rgba(0,0,0,0.2)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="47" y1="28" x2="47" y2="29.5" stroke="rgba(0,0,0,0.2)" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Mouth - warm and inviting */}
        <g>
          <path d="M 37 36 Q 44 38.5 51 36" stroke="#E88888" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 37 36 Q 44 37.5 51 36 Q 44 37 37 36" fill="rgba(232,136,136,0.3)" />
        </g>

        {/* Cheeks - rosy blush */}
        <ellipse cx="24" cy="24" rx="5.5" ry="3.5" fill="rgba(255,150,120,0.32)" />
        <ellipse cx="64" cy="24" rx="5.5" ry="3.5" fill="rgba(255,150,120,0.32)" />
      </g>
    </svg>
  );
}
