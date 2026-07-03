import type { Employee } from '@/types/employee';
import { EmployeeCharacter } from './EmployeeCharacter';
import { DeskTaskCard } from './DeskTaskCard';
import { ROLE_DISPLAY_NAMES } from './OfficeProps';

interface OfficeDeskProps {
  employee: Employee;
  isSelected: boolean;
  isActive: boolean;
  onSelect: () => void;
}

export function OfficeDesk({ employee, isSelected, isActive, onSelect }: OfficeDeskProps) {
  const roleLabel = ROLE_DISPLAY_NAMES[employee.id] || employee.role;

  return (
    <div
      onClick={onSelect}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}
    >
      {/* Deep shadow under desk */}
      <div
        style={{
          position: 'absolute',
          bottom: '-14px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '220px',
          height: '16px',
          background: `
            radial-gradient(ellipse 220px 16px at center,
              rgba(0,0,0,0.5) 0%,
              rgba(0,0,0,0.2) 50%,
              transparent 100%)
          `,
          borderRadius: '50%',
          zIndex: 0,
          filter: 'blur(2px)',
        }}
      />

      {/* Desk workstation - premium quality */}
      <div
        style={{
          position: 'relative',
          width: '200px',
          height: '148px',
          backgroundColor: '#E8C8A0',
          backgroundImage: `
            linear-gradient(100deg,
              #F5D9B8 0%,
              #F0CEA4 5%,
              #E8C4A0 12%,
              #DDB890 25%,
              #CFA878 40%,
              #BF9570 58%,
              #AD8560 72%,
              #9B7350 88%,
              #8B6340 100%),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 2px,
              rgba(0,0,0,0.03) 2px,
              rgba(0,0,0,0.03) 4px),
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 4px,
              rgba(139,111,78,0.02) 4px,
              rgba(139,111,78,0.02) 8px),
            linear-gradient(135deg,
              rgba(255,255,255,0.2) 0%,
              transparent 50%,
              rgba(0,0,0,0.25) 100%)
          `,
          borderRadius: '1px',
          border: '1px solid rgba(0,0,0,0.5)',
          boxShadow: `
            ${isSelected ? '0 0 32px rgba(255, 200, 150, 1), ' : ''}
            0 20px 56px rgba(0,0,0,0.56),
            inset 0 1px 8px rgba(255,255,255,0.4),
            inset 0 -4px 16px rgba(0,0,0,0.4)
          `,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'visible',
          zIndex: 1,
        }}
      >
        {/* Monitor section */}
        <div style={{ display: 'flex', justifyContent: 'center', height: '62px', position: 'relative', marginBottom: '8px' }}>
          {/* Monitor stand - wood */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              width: '72px',
              height: '16px',
              backgroundColor: '#704A38',
              backgroundImage: `
                linear-gradient(100deg,
                  #7A5A48 0%,
                  #704A38 50%,
                  #684240 100%),
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  transparent 2px,
                  rgba(0,0,0,0.08) 2px,
                  rgba(0,0,0,0.08) 4px)
              `,
              borderRadius: '1px 1px 6px 6px',
              boxShadow: `
                0 6px 14px rgba(0,0,0,0.52),
                inset 0 1px 3px rgba(255,255,255,0.16),
                inset 0 -2px 6px rgba(0,0,0,0.4)
              `,
              border: '1px solid rgba(0,0,0,0.6)',
            }}
          />
          {/* Monitor */}
          <div
            style={{
              position: 'absolute',
              top: '4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '68px',
              height: '52px',
              backgroundColor: '#1a1a1a',
              borderRadius: '4px',
              border: `4px solid ${employee.accentColor}`,
              boxShadow: `
                0 8px 18px rgba(0,0,0,0.6),
                0 0 22px ${employee.accentColor}DD,
                inset 0 1px 6px rgba(255,255,255,0.2),
                inset 0 -3px 8px rgba(0,0,0,0.4)
              `,
            }}
          />
        </div>

        {/* Keyboard and accessories */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
            height: '28px',
            gap: '8px',
            marginBottom: '8px',
          }}
        >
          {/* Keyboard */}
          <div
            style={{
              flex: 1,
              height: '16px',
              backgroundColor: '#313131',
              borderRadius: '3px',
              border: '0.8px solid #1a1a1a',
              boxShadow: `
                inset 0 2px 6px rgba(0,0,0,0.9),
                0 5px 8px rgba(0,0,0,0.55),
                inset 0 -0.5px 2px rgba(255,255,255,0.14)
              `,
            }}
          />

          {/* Mug */}
          <div
            style={{
              position: 'relative',
              width: '24px',
              height: '26px',
              backgroundColor: '#C9956B',
              borderRadius: '2px 2px 5px 5px',
              border: '1.2px solid #9A7050',
              boxShadow: `
                0 6px 10px rgba(0,0,0,0.50),
                inset 0 1px 4px rgba(0,0,0,0.4),
                inset -3px 0 4px rgba(255,255,255,0.22)
              `,
            }}
          >
            <div
              style={{
                position: 'absolute',
                right: '-8px',
                top: '4px',
                width: '8px',
                height: '14px',
                border: '1.2px solid #9A7050',
                borderLeft: 'none',
                borderRadius: '0 6px 6px 0',
                backgroundColor: 'transparent',
              }}
            />
          </div>

          {/* Plant pot */}
          <div
            style={{
              position: 'relative',
              width: '22px',
              height: '26px',
              backgroundColor: '#D4A574',
              borderRadius: '2px 2px 5px 5px',
              border: '1.2px solid #B89060',
              boxShadow: `
                0 6px 10px rgba(0,0,0,0.48),
                inset 0 1px 3px rgba(0,0,0,0.3)
              `,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '14px',
                height: '16px',
                backgroundColor: '#3BB877',
                borderRadius: '4px 4px 0 0',
                boxShadow: `
                  0 4px 6px rgba(0,0,0,0.40),
                  inset 0 1px 2px rgba(255,255,255,0.28)
                `,
              }}
            />
          </div>
        </div>

        {/* Desk surface */}
        <div
          style={{
            width: '100%',
            height: '16px',
            backgroundColor: '#FEFAF4',
            borderRadius: '2px',
            opacity: 0.9,
            boxShadow: `
              inset 0 1px 4px rgba(0,0,0,0.2),
              0 2px 4px rgba(0,0,0,0.22)
            `,
          }}
        />
      </div>

      {/* Chair */}
      <div
        style={{
          position: 'absolute',
          top: '78px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '64px',
          height: '58px',
          backgroundColor: '#7A7970',
          backgroundImage: `
            linear-gradient(135deg, #8A8980 0%, #7A7970 50%, #6A6960 100%),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 3px,
              rgba(0,0,0,0.08) 3px,
              rgba(0,0,0,0.08) 6px)
          `,
          borderRadius: '2px 2px 8px 8px',
          border: '1px solid rgba(0,0,0,0.6)',
          boxShadow: `
            0 7px 14px rgba(0,0,0,0.45),
            inset 0 1px 3px rgba(255,255,255,0.16),
            inset 0 -1px 6px rgba(0,0,0,0.4)
          `,
          zIndex: 8,
        }}
      />

      {/* Character */}
      <div
        style={{
          position: 'relative',
          marginTop: '-16px',
          zIndex: 10,
        }}
      >
        <EmployeeCharacter employee={employee} size="medium" />
      </div>

      {/* Role title */}
      <div
        style={{
          fontSize: '13px',
          fontWeight: '900',
          color: 'var(--text-primary)',
          textAlign: 'center',
          width: '200px',
          lineHeight: '1.1',
          marginTop: '14px',
          zIndex: 1,
          letterSpacing: '0.6px',
          textTransform: 'uppercase',
        }}
      >
        {roleLabel}
      </div>

      {/* Task card */}
      <div
        style={{
          marginTop: '10px',
          width: '200px',
          zIndex: 1,
          filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.32))',
        }}
      >
        <DeskTaskCard employee={employee} isActive={isActive} />
      </div>

      {/* Active glow */}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: '-36px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '280px',
            height: '220px',
            background: `radial-gradient(circle, rgba(249,112,31,0.42) 0%, rgba(249,112,31,0) 65%)`,
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: 'glow-pulse 3.2s ease-in-out infinite',
            zIndex: 0,
          }}
        />
      )}

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
