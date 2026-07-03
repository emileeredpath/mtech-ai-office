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
        gap: '2px',
        transition: 'all 0.2s ease',
        position: 'relative',
      }}
    >
      {/* Shadow under desk - enhanced */}
      <div
        style={{
          position: 'absolute',
          bottom: '-5px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '140px',
          height: '8px',
          background: 'radial-gradient(ellipse 140px 8px at center, rgba(0,0,0,0.28), transparent)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      {/* Desk workstation - larger with better wood texture */}
      <div
        style={{
          position: 'relative',
          width: '140px',
          height: '100px',
          backgroundColor: '#D4B896',
          backgroundImage: `
            linear-gradient(90deg,
              #D4B896 0%,
              #CAA876 15%,
              #C29C6D 35%,
              #B89570 50%,
              #AA8560 70%,
              #9D7A52 85%,
              #907050 100%),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 2px,
              rgba(0,0,0,0.03) 2px,
              rgba(0,0,0,0.03) 4px)
          `,
          borderRadius: '3px',
          border: '1px solid rgba(0,0,0,0.3)',
          boxShadow: `
            ${isSelected ? '0 0 18px rgba(212, 165, 116, 0.85), ' : ''}
            0 14px 32px rgba(0,0,0,0.4),
            inset 0 1px 4px rgba(255,255,255,0.25),
            inset 0 -2px 8px rgba(0,0,0,0.25)
          `,
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* Top section with monitor stand */}
        <div style={{ display: 'flex', justifyContent: 'center', height: '40px', position: 'relative' }}>
          {/* Monitor stand base */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              width: '48px',
              height: '10px',
              backgroundColor: '#6B5E4D',
              borderRadius: '1px 1px 3px 3px',
              boxShadow: '0 3px 6px rgba(0,0,0,0.35), inset 0 1px 2px rgba(255,255,255,0.1)',
              border: '1px solid rgba(0,0,0,0.4)',
            }}
          />
          {/* Monitor */}
          <div
            style={{
              position: 'absolute',
              top: '2px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '46px',
              height: '32px',
              backgroundColor: '#1a1a1a',
              borderRadius: '2px',
              border: `2.5px solid ${employee.accentColor}`,
              boxShadow: `
                0 4px 10px rgba(0,0,0,0.45),
                0 0 14px ${employee.accentColor}99,
                inset 0 1px 3px rgba(255,255,255,0.12)
              `,
            }}
          />
        </div>

        {/* Middle section with keyboard and accessories */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
            height: '18px',
            gap: '4px',
          }}
        >
          {/* Keyboard - improved */}
          <div
            style={{
              flex: 1,
              height: '11px',
              backgroundColor: '#222222',
              borderRadius: '2px',
              border: '0.5px solid #0f0f0f',
              boxShadow: `
                inset 0 1px 3px rgba(0,0,0,0.7),
                0 2px 3px rgba(0,0,0,0.4),
                inset 0 -0.5px 1px rgba(255,255,255,0.08)
              `,
            }}
          />

          {/* Mug - more realistic */}
          <div
            style={{
              position: 'relative',
              width: '15px',
              height: '16px',
              backgroundColor: '#B08050',
              borderRadius: '1px 1px 3px 3px',
              border: '0.7px solid #7A5A30',
              boxShadow: `
                0 3px 5px rgba(0,0,0,0.35),
                inset 0 1px 2px rgba(0,0,0,0.25),
                inset -1px 0 1px rgba(255,255,255,0.15)
              `,
            }}
          >
            {/* Mug handle */}
            <div
              style={{
                position: 'absolute',
                right: '-4px',
                top: '2px',
                width: '4px',
                height: '8px',
                border: '0.7px solid #7A5A30',
                borderLeft: 'none',
                borderRadius: '0 3px 3px 0',
                backgroundColor: 'transparent',
              }}
            />
          </div>

          {/* Plant pot - with leaves */}
          <div
            style={{
              position: 'relative',
              width: '13px',
              height: '16px',
              backgroundColor: '#C08070',
              borderRadius: '1px 1px 3px 3px',
              border: '0.7px solid #9A5F4A',
              boxShadow: '0 3px 5px rgba(0,0,0,0.3)',
            }}
          >
            {/* Plant leaves - improved */}
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '8px',
                height: '10px',
                backgroundColor: '#3BB877',
                borderRadius: '2px 2px 0 0',
                boxShadow: '0 2px 3px rgba(0,0,0,0.25)',
              }}
            />
          </div>
        </div>

        {/* Bottom section - papers/workspace surface */}
        <div
          style={{
            width: '100%',
            height: '10px',
            backgroundColor: '#F5F0E5',
            borderRadius: '1px',
            opacity: 0.8,
            boxShadow: `
              inset 0 1px 2px rgba(0,0,0,0.12),
              0 1px 2px rgba(0,0,0,0.15)
            `,
          }}
        />
      </div>

      {/* Chair behind person - more realistic */}
      <div
        style={{
          position: 'absolute',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '44px',
          height: '36px',
          backgroundColor: '#6B6B5C',
          backgroundImage: 'linear-gradient(135deg, #7A7A6B 0%, #6B6B5C 50%, #5A5A4B 100%)',
          borderRadius: '2px 2px 5px 5px',
          border: '1px solid rgba(0,0,0,0.4)',
          boxShadow: `
            0 4px 8px rgba(0,0,0,0.3),
            inset 0 1px 2px rgba(255,255,255,0.12)
          `,
          zIndex: 8,
        }}
      />

      {/* Employee character - sitting at desk */}
      <div
        style={{
          position: 'relative',
          marginTop: '0px',
          zIndex: 10,
        }}
      >
        <EmployeeCharacter employee={employee} size="medium" />
      </div>

      {/* Role title */}
      <div
        style={{
          fontSize: '11px',
          fontWeight: '700',
          color: 'var(--text-primary)',
          textAlign: 'center',
          width: '140px',
          lineHeight: '1.25',
          marginTop: '8px',
          zIndex: 1,
          letterSpacing: '0.3px',
        }}
      >
        {roleLabel}
      </div>

      {/* Task card - enhanced styling */}
      <div
        style={{
          marginTop: '6px',
          width: '140px',
          zIndex: 1,
          filter: 'drop-shadow(0 3px 10px rgba(0,0,0,0.2))',
        }}
      >
        <DeskTaskCard employee={employee} isActive={isActive} />
      </div>

      {/* Active indicator glow - enhanced */}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: '-18px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '160px',
            height: '130px',
            background: `radial-gradient(circle, rgba(249,112,31,0.25) 0%, rgba(249,112,31,0) 70%)`,
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: 'glow-pulse 2.5s ease-in-out infinite',
            zIndex: 0,
          }}
        />
      )}

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
