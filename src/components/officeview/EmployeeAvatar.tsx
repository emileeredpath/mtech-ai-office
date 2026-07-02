import type { Employee } from '@/types/employee';

interface EmployeeAvatarProps {
  employee: Employee;
  size?: number;
  animated?: boolean;
}

const AVATAR_STYLES: Record<string, any> = {
  'marketing-director': {
    // Emilee - warm, leader
    skinColor: '#F4A460',
    hairColor: '#8B4513',
    accentColor: '#8B5CF6',
    outfit: '#2563EB',
  },
  'website-auditor': {
    // Sarah - analytical
    skinColor: '#DEB887',
    hairColor: '#4A4A4A',
    accentColor: '#F9701F',
    outfit: '#10B981',
  },
  'proposal-writer': {
    // Alex - creative
    skinColor: '#E8B4A0',
    hairColor: '#7B4397',
    accentColor: '#34D399',
    outfit: '#F9701F',
  },
  'case-study-writer': {
    // Sophie - thorough
    skinColor: '#F5DEB3',
    hairColor: '#B8860B',
    accentColor: '#8B5CF6',
    outfit: '#2563EB',
  },
  'email-marketing-manager': {
    // David - organized
    skinColor: '#D2B48C',
    hairColor: '#5A5A5A',
    accentColor: '#F97316',
    outfit: '#059669',
  },
  'seo-ppc-manager': {
    // James - metric-focused
    skinColor: '#DDBEA9',
    hairColor: '#3E3E3E',
    accentColor: '#0EA5E9',
    outfit: '#2563EB',
  },
  'social-media-manager': {
    // Tisha - creative, energetic
    skinColor: '#D6A599',
    hairColor: '#8B4789',
    accentColor: '#EC4899',
    outfit: '#F9701F',
  },
  'funding-rewards-manager': {
    // Marcus - opportunity-seeking
    skinColor: '#C6AC7D',
    hairColor: '#4A4A4A',
    accentColor: '#14B8A6',
    outfit: '#2563EB',
  },
};

export function EmployeeAvatar({ employee, size = 48, animated = true }: EmployeeAvatarProps) {
  const style = AVATAR_STYLES[employee.id] || AVATAR_STYLES['marketing-director'];

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${style.skinColor}dd 0%, ${style.skinColor} 100%)`,
        border: `2px solid ${style.accentColor}`,
        boxShadow: `0 4px 12px rgba(0,0,0,0.15), 0 0 0 3px rgba(255,255,255,0.5), inset -2px -2px 4px rgba(0,0,0,0.1)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: animated ? `avatarFloat 3s ease-in-out infinite` : undefined,
      }}
    >
      <svg
        width={size * 0.95}
        height={size * 0.95}
        viewBox="0 0 100 120"
        style={{ overflow: 'visible' }}
      >
        {/* Head */}
        <circle cx="50" cy="30" r="22" fill={style.skinColor} opacity="0.95" />
        <circle cx="50" cy="30" r="22" fill={`url(#grad-${employee.id})`} />

        {/* Hair */}
        <path
          d="M 28 30 Q 28 8 50 8 Q 72 8 72 30"
          fill={style.hairColor}
          opacity="0.9"
        />
        <ellipse cx="50" cy="10" rx="18" ry="8" fill={style.hairColor} opacity="0.5" />

        {/* Eyes */}
        <circle cx="43" cy="27" r="2.5" fill="#2c3e50" opacity="0.8" />
        <circle cx="57" cy="27" r="2.5" fill="#2c3e50" opacity="0.8" />
        <circle cx="44" cy="26" r="1" fill="#fff" opacity="0.9" />
        <circle cx="58" cy="26" r="1" fill="#fff" opacity="0.9" />

        {/* Smile */}
        <path d="M 43 35 Q 50 38 57 35" stroke="#2c3e50" strokeWidth="1.5" fill="none" opacity="0.6" />

        {/* Neck */}
        <line x1="47" y1="52" x2="47" y2="60" stroke={style.skinColor} strokeWidth="2" opacity="0.8" />
        <line x1="53" y1="52" x2="53" y2="60" stroke={style.skinColor} strokeWidth="2" opacity="0.8" />

        {/* Shoulder/Outfit top */}
        <rect x="28" y="58" width="44" height="35" fill={style.outfit} opacity="0.85" rx="2" />

        {/* Outfit accent/shirt */}
        <line x1="50" y1="62" x2="50" y2="85" stroke={style.accentColor} strokeWidth="2" opacity="0.6" />

        {/* Arms (simplified) */}
        <line x1="28" y1="65" x2="18" y2="75" stroke={style.skinColor} strokeWidth="3" opacity="0.9" strokeLinecap="round" />
        <line x1="72" y1="65" x2="82" y2="75" stroke={style.skinColor} strokeWidth="3" opacity="0.9" strokeLinecap="round" />

        {/* Subtle 3D effect */}
        <circle cx="50" cy="30" r="22" fill="none" stroke={style.accentColor} strokeWidth="0.5" opacity="0.4" />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id={`grad-${employee.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={style.accentColor} stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      <style>{`
        @keyframes avatarFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}
