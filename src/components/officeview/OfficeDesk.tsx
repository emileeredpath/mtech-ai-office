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
        gap: '3px',
        transition: 'all 0.2s ease',
        position: 'relative',
      }}
    >
      {/* Enhanced shadow under desk */}
      <div
        style={{
          position: 'absolute',
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '160px',
          height: '10px',
          background: `
            radial-gradient(ellipse 160px 10px at center,
              rgba(0,0,0,0.35) 0%,
              rgba(0,0,0,0.15) 40%,
              transparent 100%)
          `,
          borderRadius: '50%',
          zIndex: 0,
          filter: 'blur(1px)',
        }}
      />

      {/* Desk workstation - highly realistic wood */}
      <div
        style={{
          position: 'relative',
          width: '156px',
          height: '112px',
          backgroundColor: '#D9B89C',
          backgroundImage: `
            linear-gradient(90deg,
              #E5C5A8 0%,
              #D9B89C 8%,
              #CCA882 20%,
              #BF9D72 35%,
              #B59268 50%,
              #A68760 65%,
              #9A7C58 80%,
              #8E7150 100%),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 1px,
              rgba(0,0,0,0.02) 1px,
              rgba(0,0,0,0.02) 3px),
            repeating-linear-gradient(
              180deg,
              transparent 0px,
              transparent 2px,
              rgba(139,111,78,0.04) 2px,
              rgba(139,111,78,0.04) 5px),
            linear-gradient(135deg,
              rgba(255,255,255,0.1) 0%,
              transparent 50%,
              rgba(0,0,0,0.15) 100%)
          `,
          borderRadius: '2px',
          border: '1px solid rgba(0,0,0,0.4)',
          boxShadow: `
            ${isSelected ? '0 0 22px rgba(230, 180, 130, 0.9), ' : ''}
            0 16px 40px rgba(0,0,0,0.48),
            inset 0 1px 5px rgba(255,255,255,0.3),
            inset 0 -2px 10px rgba(0,0,0,0.3)
          `,
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'visible',
          zIndex: 1,
        }}
      >
        {/* Monitor section with stand */}
        <div style={{ display: 'flex', justifyContent: 'center', height: '46px', position: 'relative', marginBottom: '4px' }}>
          {/* Monitor stand base - wood matching */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              width: '56px',
              height: '12px',
              backgroundColor: '#7A6E60',
              backgroundImage: `
                linear-gradient(90deg,
                  #7A6E60 0%,
                  #726860 50%,
                  #6A6258 100%),
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  transparent 2px,
                  rgba(0,0,0,0.05) 2px,
                  rgba(0,0,0,0.05) 4px)
              `,
              borderRadius: '1px 1px 4px 4px',
              boxShadow: `
                0 4px 8px rgba(0,0,0,0.42),
                inset 0 1px 2px rgba(255,255,255,0.12),
                inset 0 -1px 3px rgba(0,0,0,0.3)
              `,
              border: '1px solid rgba(0,0,0,0.5)',
            }}
          />
          {/* Monitor frame */}
          <div
            style={{
              position: 'absolute',
              top: '4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '52px',
              height: '38px',
              backgroundColor: '#242424',
              borderRadius: '2px',
              border: `3px solid ${employee.accentColor}`,
              boxShadow: `
                0 5px 12px rgba(0,0,0,0.5),
                0 0 16px ${employee.accentColor}AA,
                inset 0 1px 4px rgba(255,255,255,0.15),
                inset 0 -2px 4px rgba(0,0,0,0.3)
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
            height: '20px',
            gap: '5px',
            marginBottom: '4px',
          }}
        >
          {/* Keyboard - detailed */}
          <div
            style={{
              flex: 1,
              height: '12px',
              backgroundColor: '#2a2a2a',
              borderRadius: '2px',
              border: '0.6px solid #151515',
              boxShadow: `
                inset 0 1px 4px rgba(0,0,0,0.8),
                0 3px 5px rgba(0,0,0,0.45),
                inset 0 -0.5px 1px rgba(255,255,255,0.1)
              `,
            }}
          />

          {/* Mug - ceramic look */}
          <div
            style={{
              position: 'relative',
              width: '17px',
              height: '18px',
              backgroundColor: '#B89968',
              borderRadius: '1px 1px 3px 3px',
              border: '0.8px solid #8B7355',
              boxShadow: `
                0 4px 6px rgba(0,0,0,0.4),
                inset 0 1px 3px rgba(0,0,0,0.3),
                inset -2px 0 2px rgba(255,255,255,0.18)
              `,
            }}
          >
            {/* Mug handle */}
            <div
              style={{
                position: 'absolute',
                right: '-5px',
                top: '2px',
                width: '5px',
                height: '10px',
                border: '0.8px solid #8B7355',
                borderLeft: 'none',
                borderRadius: '0 4px 4px 0',
                backgroundColor: 'transparent',
              }}
            />
          </div>

          {/* Plant pot - ceramic */}
          <div
            style={{
              position: 'relative',
              width: '15px',
              height: '18px',
              backgroundColor: '#C49060',
              borderRadius: '1px 1px 3px 3px',
              border: '0.8px solid #A67040',
              boxShadow: `
                0 4px 6px rgba(0,0,0,0.35),
                inset 0 1px 2px rgba(0,0,0,0.2)
              `,
            }}
          >
            {/* Plant leaves */}
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '10px',
                height: '12px',
                backgroundColor: '#3DB878',
                borderRadius: '2px 2px 0 0',
                boxShadow: `
                  0 3px 4px rgba(0,0,0,0.3),
                  inset 0 1px 1px rgba(255,255,255,0.2)
                `,
              }}
            />
          </div>
        </div>

        {/* Workspace papers/surface */}
        <div
          style={{
            width: '100%',
            height: '12px',
            backgroundColor: '#F7F3EB',
            borderRadius: '1px',
            opacity: 0.85,
            boxShadow: `
              inset 0 1px 3px rgba(0,0,0,0.15),
              0 1px 2px rgba(0,0,0,0.18)
            `,
          }}
        />
      </div>

      {/* Chair - more realistic office chair */}
      <div
        style={{
          position: 'absolute',
          top: '54px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '50px',
          height: '42px',
          backgroundColor: '#6F6F60',
          backgroundImage: `
            linear-gradient(135deg, #808074 0%, #6F6F60 50%, #5E5E50 100%),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 2px,
              rgba(0,0,0,0.06) 2px,
              rgba(0,0,0,0.06) 4px)
          `,
          borderRadius: '2px 2px 6px 6px',
          border: '1px solid rgba(0,0,0,0.5)',
          boxShadow: `
            0 5px 10px rgba(0,0,0,0.35),
            inset 0 1px 2px rgba(255,255,255,0.12),
            inset 0 -1px 4px rgba(0,0,0,0.3)
          `,
          zIndex: 8,
        }}
      />

      {/* Employee character - sitting */}
      <div
        style={{
          position: 'relative',
          marginTop: '-8px',
          zIndex: 10,
        }}
      >
        <EmployeeCharacter employee={employee} size="medium" />
      </div>

      {/* Role title - styled */}
      <div
        style={{
          fontSize: '11px',
          fontWeight: '800',
          color: 'var(--text-primary)',
          textAlign: 'center',
          width: '156px',
          lineHeight: '1.2',
          marginTop: '10px',
          zIndex: 1,
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
        }}
      >
        {roleLabel}
      </div>

      {/* Task card - matching improved styling */}
      <div
        style={{
          marginTop: '6px',
          width: '156px',
          zIndex: 1,
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.24))',
        }}
      >
        <DeskTaskCard employee={employee} isActive={isActive} />
      </div>

      {/* Active indicator glow - enhanced */}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: '-24px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '160px',
            background: `radial-gradient(circle, rgba(249,112,31,0.32) 0%, rgba(249,112,31,0) 70%)`,
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: 'glow-pulse 2.8s ease-in-out infinite',
            zIndex: 0,
          }}
        />
      )}

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.75; }
        }
      `}</style>
    </div>
  );
}
