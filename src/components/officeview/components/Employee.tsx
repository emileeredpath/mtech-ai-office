import type { Employee as EmployeeType } from '@/types/employee';

interface EmployeeProps {
  employee: EmployeeType;
  isTyping?: boolean;
  isSelected?: boolean;
}

const EMPLOYEE_COLORS: Record<string, any> = {
  'marketing-director': { skin: '#F4A460', hair: '#8B4513', outfit: '#2563EB' },
  'website-auditor': { skin: '#DEB887', hair: '#4A4A4A', outfit: '#10B981' },
  'proposal-writer': { skin: '#E8B4A0', hair: '#7B4397', outfit: '#F9701F' },
  'case-study-writer': { skin: '#F5DEB3', hair: '#B8860B', outfit: '#2563EB' },
  'email-marketing-manager': { skin: '#D2B48C', hair: '#5A5A5A', outfit: '#059669' },
  'seo-ppc-manager': { skin: '#DDBEA9', hair: '#3E3E3E', outfit: '#2563EB' },
  'social-media-manager': { skin: '#D6A599', hair: '#8B4789', outfit: '#F9701F' },
  'funding-rewards-manager': { skin: '#C6AC7D', hair: '#4A4A4A', outfit: '#2563EB' },
};

export function Employee({ employee, isTyping = false, isSelected = false }: EmployeeProps) {
  const colors = EMPLOYEE_COLORS[employee.id] || EMPLOYEE_COLORS['marketing-director'];

  return (
    <div
      style={{
        position: 'relative',
        width: '32px',
        height: '44px',
        animation: 'employeeBreath 4s ease-in-out infinite',
      }}
    >
      {/* Head */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          backgroundColor: colors.skin,
          boxShadow: `
            0 2px 6px rgba(0,0,0,0.2),
            inset -2px -2px 4px rgba(0,0,0,0.1),
            0 0 0 1px ${colors.skin}dd
          `,
          overflow: 'hidden',
        }}
      >
        {/* Hair */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '65%',
            backgroundColor: colors.hair,
            borderRadius: '50% 50% 0 0',
            boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.2)',
          }}
        />

        {/* Eyes */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '35%',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            backgroundColor: '#2c3e50',
            boxShadow: `inset -1px -1px 1px rgba(0,0,0,0.3), 0 1px 2px rgba(255,255,255,0.1)`,
            animation: isSelected ? 'employeeLook 3s ease-in-out infinite' : 'employeeBlink 3s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '40%',
            right: '35%',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            backgroundColor: '#2c3e50',
            boxShadow: `inset -1px -1px 1px rgba(0,0,0,0.3), 0 1px 2px rgba(255,255,255,0.1)`,
            animation: isSelected ? 'employeeLook 3s ease-in-out infinite' : 'employeeBlink 3s ease-in-out infinite',
          }}
        />

        {/* Mouth/smile */}
        <path
          d="M 8 12 Q 9 14 10 12"
          stroke="#2c3e50"
          strokeWidth="0.8"
          fill="none"
          style={{
            position: 'absolute',
            bottom: '2px',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0.6,
          }}
        />
      </div>

      {/* Neck connector */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '3px',
          height: '4px',
          backgroundColor: colors.skin,
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        }}
      />

      {/* Body/Outfit */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '16px',
          height: '18px',
          backgroundColor: colors.outfit,
          borderRadius: '2px',
          boxShadow: `
            0 2px 6px rgba(0,0,0,0.2),
            inset -1px -1px 2px rgba(0,0,0,0.1),
            0 0 0 0.5px rgba(0,0,0,0.1)
          `,
        }}
      >
        {/* Shirt detail */}
        <div
          style={{
            position: 'absolute',
            top: '2px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '2px',
            height: '4px',
            backgroundColor: '#fff',
            opacity: 0.3,
          }}
        />
      </div>

      {/* Arms */}
      <div
        style={{
          position: 'absolute',
          top: '22px',
          left: '2px',
          width: '3px',
          height: '10px',
          backgroundColor: colors.skin,
          borderRadius: '1px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          animation: isTyping ? 'employeeType 0.4s ease-in-out infinite' : 'none',
          transformOrigin: 'top',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '22px',
          right: '2px',
          width: '3px',
          height: '10px',
          backgroundColor: colors.skin,
          borderRadius: '1px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          animation: isTyping ? 'employeeType 0.4s ease-in-out infinite' : 'none',
          transformOrigin: 'top',
          animationDelay: '0.1s',
        }}
      />

      {/* Selection glow */}
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            border: '2px solid #F97021',
            boxShadow: '0 0 8px #F97021',
            animation: 'glow 1.5s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
      )}

      <style>{`
        @keyframes employeeBreath {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.02); }
        }

        @keyframes employeeBlink {
          0%, 10%, 100% { height: 3px; }
          5% { height: 0px; }
        }

        @keyframes employeeLook {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-1px); }
          50% { transform: translateX(0); }
          75% { transform: translateX(1px); }
        }

        @keyframes employeeType {
          0%, 100% { transform: rotateZ(0deg); }
          50% { transform: rotateZ(-15deg); }
        }

        @keyframes glow {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #F97021; }
          50% { opacity: 0.6; box-shadow: 0 0 12px #F97021; }
        }
      `}</style>
    </div>
  );
}
