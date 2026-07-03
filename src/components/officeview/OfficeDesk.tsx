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
        gap: '4px',
        transition: 'all 0.2s ease',
        position: 'relative',
      }}
    >
      {/* Premium shadow under desk */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '180px',
          height: '12px',
          background: `
            radial-gradient(ellipse 180px 12px at center,
              rgba(0,0,0,0.42) 0%,
              rgba(0,0,0,0.18) 45%,
              transparent 100%)
          `,
          borderRadius: '50%',
          zIndex: 0,
          filter: 'blur(1.5px)',
        }}
      />

      {/* Desk workstation - premium wood appearance */}
      <div
        style={{
          position: 'relative',
          width: '176px',
          height: '128px',
          backgroundColor: '#E0C4A0',
          backgroundImage: `
            linear-gradient(90deg,
              #F0D9BC 0%,
              #E8C8A4 6%,
              #DDB890 18%,
              #D2A878 35%,
              #C69860 52%,
              #B8865C 70%,
              #A87454 88%,
              #9C6A48 100%),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 1.5px,
              rgba(0,0,0,0.025) 1.5px,
              rgba(0,0,0,0.025) 3px),
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 3px,
              rgba(139,111,78,0.03) 3px,
              rgba(139,111,78,0.03) 6px),
            linear-gradient(135deg,
              rgba(255,255,255,0.15) 0%,
              transparent 50%,
              rgba(0,0,0,0.2) 100%)
          `,
          borderRadius: '1px',
          border: '1px solid rgba(0,0,0,0.45)',
          boxShadow: `
            ${isSelected ? '0 0 26px rgba(240, 200, 160, 0.95), ' : ''}
            0 18px 48px rgba(0,0,0,0.52),
            inset 0 1px 6px rgba(255,255,255,0.35),
            inset 0 -3px 12px rgba(0,0,0,0.35)
          `,
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'visible',
          zIndex: 1,
        }}
      >
        {/* Monitor section */}
        <div style={{ display: 'flex', justifyContent: 'center', height: '54px', position: 'relative', marginBottom: '6px' }}>
          {/* Monitor stand base - premium */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              width: '64px',
              height: '14px',
              backgroundColor: '#6B5E50',
              backgroundImage: `
                linear-gradient(90deg,
                  #7A7060 0%,
                  #6B5E50 50%,
                  #5C5045 100%),
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  transparent 2px,
                  rgba(0,0,0,0.06) 2px,
                  rgba(0,0,0,0.06) 4px)
              `,
              borderRadius: '1px 1px 5px 5px',
              boxShadow: `
                0 5px 10px rgba(0,0,0,0.48),
                inset 0 1px 2px rgba(255,255,255,0.14),
                inset 0 -1px 4px rgba(0,0,0,0.35)
              `,
              border: '1px solid rgba(0,0,0,0.55)',
            }}
          />
          {/* Monitor frame */}
          <div
            style={{
              position: 'absolute',
              top: '4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '44px',
              backgroundColor: '#1f1f1f',
              borderRadius: '3px',
              border: `3.5px solid ${employee.accentColor}`,
              boxShadow: `
                0 6px 14px rgba(0,0,0,0.55),
                0 0 18px ${employee.accentColor}BB,
                inset 0 1px 5px rgba(255,255,255,0.18),
                inset 0 -2px 5px rgba(0,0,0,0.35)
              `,
            }}
          />
        </div>

        {/* Keyboard and accessories section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
            height: '24px',
            gap: '6px',
            marginBottom: '6px',
          }}
        >
          {/* Keyboard - premium */}
          <div
            style={{
              flex: 1,
              height: '14px',
              backgroundColor: '#2f2f2f',
              borderRadius: '2px',
              border: '0.7px solid #1a1a1a',
              boxShadow: `
                inset 0 1px 4px rgba(0,0,0,0.85),
                0 4px 6px rgba(0,0,0,0.50),
                inset 0 -0.5px 1px rgba(255,255,255,0.12)
              `,
            }}
          />

          {/* Mug - ceramic premium */}
          <div
            style={{
              position: 'relative',
              width: '20px',
              height: '22px',
              backgroundColor: '#C4956B',
              borderRadius: '2px 2px 4px 4px',
              border: '1px solid #9A7050',
              boxShadow: `
                0 5px 8px rgba(0,0,0,0.45),
                inset 0 1px 3px rgba(0,0,0,0.35),
                inset -2px 0 3px rgba(255,255,255,0.2)
              `,
            }}
          >
            {/* Mug handle */}
            <div
              style={{
                position: 'absolute',
                right: '-6px',
                top: '3px',
                width: '6px',
                height: '12px',
                border: '1px solid #9A7050',
                borderLeft: 'none',
                borderRadius: '0 5px 5px 0',
                backgroundColor: 'transparent',
              }}
            />
          </div>

          {/* Plant pot - ceramic with leaves */}
          <div
            style={{
              position: 'relative',
              width: '18px',
              height: '22px',
              backgroundColor: '#D4A574',
              borderRadius: '2px 2px 4px 4px',
              border: '1px solid #B89060',
              boxShadow: `
                0 5px 8px rgba(0,0,0,0.40),
                inset 0 1px 2px rgba(0,0,0,0.25)
              `,
            }}
          >
            {/* Plant leaves - green */}
            <div
              style={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '12px',
                height: '14px',
                backgroundColor: '#3BB877',
                borderRadius: '3px 3px 0 0',
                boxShadow: `
                  0 4px 5px rgba(0,0,0,0.35),
                  inset 0 1px 2px rgba(255,255,255,0.25)
                `,
              }}
            />
          </div>
        </div>

        {/* Workspace surface */}
        <div
          style={{
            width: '100%',
            height: '14px',
            backgroundColor: '#FAF6EF',
            borderRadius: '2px',
            opacity: 0.88,
            boxShadow: `
              inset 0 1px 3px rgba(0,0,0,0.18),
              0 2px 3px rgba(0,0,0,0.20)
            `,
          }}
        />
      </div>

      {/* Chair - premium office chair */}
      <div
        style={{
          position: 'absolute',
          top: '64px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '56px',
          height: '50px',
          backgroundColor: '#76756B',
          backgroundImage: `
            linear-gradient(135deg, #86857B 0%, #76756B 50%, #665F57 100%),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 2px,
              rgba(0,0,0,0.07) 2px,
              rgba(0,0,0,0.07) 4px)
          `,
          borderRadius: '2px 2px 7px 7px',
          border: '1px solid rgba(0,0,0,0.55)',
          boxShadow: `
            0 6px 12px rgba(0,0,0,0.40),
            inset 0 1px 3px rgba(255,255,255,0.14),
            inset 0 -1px 5px rgba(0,0,0,0.35)
          `,
          zIndex: 8,
        }}
      />

      {/* Employee character - sitting */}
      <div
        style={{
          position: 'relative',
          marginTop: '-12px',
          zIndex: 10,
        }}
      >
        <EmployeeCharacter employee={employee} size="medium" />
      </div>

      {/* Role title - premium styling */}
      <div
        style={{
          fontSize: '12px',
          fontWeight: '900',
          color: 'var(--text-primary)',
          textAlign: 'center',
          width: '176px',
          lineHeight: '1.15',
          marginTop: '12px',
          zIndex: 1,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}
      >
        {roleLabel}
      </div>

      {/* Task card - premium */}
      <div
        style={{
          marginTop: '8px',
          width: '176px',
          zIndex: 1,
          filter: 'drop-shadow(0 5px 14px rgba(0,0,0,0.28))',
        }}
      >
        <DeskTaskCard employee={employee} isActive={isActive} />
      </div>

      {/* Active indicator glow - enhanced */}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: '-28px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '224px',
            height: '180px',
            background: `radial-gradient(circle, rgba(249,112,31,0.38) 0%, rgba(249,112,31,0) 68%)`,
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: 'glow-pulse 3s ease-in-out infinite',
            zIndex: 0,
          }}
        />
      )}

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}
