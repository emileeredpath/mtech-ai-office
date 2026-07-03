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
      {/* Shadow under desk */}
      <div
        style={{
          position: 'absolute',
          bottom: '-3px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '108px',
          height: '6px',
          background: 'radial-gradient(ellipse 108px 6px at center, rgba(0,0,0,0.2), transparent)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      {/* Desk workstation - larger and more realistic */}
      <div
        style={{
          position: 'relative',
          width: '120px',
          height: '88px',
          backgroundColor: '#C9A877',
          backgroundImage: `
            linear-gradient(135deg, #D4B895 0%, #C9A877 30%, #B89570 100%),
            linear-gradient(90deg,
              rgba(0,0,0,0.05) 0%,
              transparent 20%,
              transparent 80%,
              rgba(0,0,0,0.1) 100%)
          `,
          backgroundBlendMode: 'normal, multiply',
          borderRadius: '4px',
          border: '1px solid rgba(0,0,0,0.25)',
          boxShadow: `
            ${isSelected ? '0 0 16px rgba(212, 165, 116, 0.8), ' : ''}
            0 12px 28px rgba(0,0,0,0.35),
            inset 0 1px 3px rgba(255,255,255,0.2),
            inset 0 -3px 6px rgba(0,0,0,0.2)
          `,
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* Top section with monitor stand */}
        <div style={{ display: 'flex', justifyContent: 'center', height: '36px' }}>
          {/* Monitor stand */}
          <div
            style={{
              position: 'relative',
              width: '42px',
              height: '8px',
              backgroundColor: '#8B7355',
              borderRadius: '2px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {/* Monitor */}
            <div
              style={{
                position: 'absolute',
                top: '-28px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '28px',
                backgroundColor: '#0f0f0f',
                borderRadius: '2px',
                border: `2px solid ${employee.accentColor}`,
                boxShadow: `0 3px 8px rgba(0,0,0,0.4), 0 0 12px ${employee.accentColor}88, inset 0 1px 2px rgba(255,255,255,0.1)`,
              }}
            />
          </div>
        </div>

        {/* Middle section with keyboard and accessories */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
            height: '16px',
            gap: '3px',
          }}
        >
          {/* Keyboard */}
          <div
            style={{
              flex: 1,
              height: '10px',
              backgroundColor: '#1f1f1f',
              borderRadius: '1px',
              border: '0.5px solid #0a0a0a',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6), 0 1px 2px rgba(255,255,255,0.1)',
            }}
          />

          {/* Mug with more detail */}
          <div
            style={{
              width: '13px',
              height: '14px',
              backgroundColor: '#A0673D',
              borderRadius: '1px 1px 2px 2px',
              border: '0.5px solid #6B4623',
              boxShadow: '0 2px 3px rgba(0,0,0,0.3), inset 0 1px 1px rgba(0,0,0,0.2)',
              position: 'relative',
            }}
          >
            {/* Mug handle */}
            <div
              style={{
                position: 'absolute',
                right: '-3px',
                top: '2px',
                width: '3px',
                height: '7px',
                border: '0.5px solid #6B4623',
                borderLeft: 'none',
                borderRadius: '0 2px 2px 0',
                backgroundColor: 'transparent',
              }}
            />
          </div>

          {/* Plant pot */}
          <div
            style={{
              width: '11px',
              height: '14px',
              backgroundColor: '#C97070',
              borderRadius: '1px 1px 2px 2px',
              border: '0.5px solid #A85555',
              boxShadow: '0 2px 3px rgba(0,0,0,0.25)',
            }}
          >
            {/* Plant leaves */}
            <div
              style={{
                position: 'absolute',
                top: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '6px',
                height: '8px',
                backgroundColor: '#2ba876',
                borderRadius: '1px 1px 0 0',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }}
            />
          </div>
        </div>

        {/* Bottom section - paper/notes */}
        <div
          style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#F5F1E8',
            borderRadius: '1px',
            opacity: 0.85,
            boxShadow: 'inset 0 0.5px 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.15)',
          }}
        />
      </div>

      {/* Chair behind person - more realistic */}
      <div
        style={{
          position: 'absolute',
          top: '42px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '38px',
          height: '32px',
          backgroundColor: '#6B6B5C',
          backgroundImage: 'linear-gradient(135deg, #7A7A6B 0%, #6B6B5C 50%, #5A5A4B 100%)',
          borderRadius: '2px 2px 4px 4px',
          border: '1px solid rgba(0,0,0,0.35)',
          boxShadow: '0 3px 6px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.1)',
          zIndex: 8,
        }}
      />

      {/* Employee character - sitting at desk */}
      <div
        style={{
          position: 'relative',
          marginTop: '-4px',
          zIndex: 10,
        }}
      >
        <EmployeeCharacter employee={employee} size="medium" />
      </div>

      {/* Role title */}
      <div
        style={{
          fontSize: '11px',
          fontWeight: '600',
          color: 'var(--text-primary)',
          textAlign: 'center',
          width: '106px',
          lineHeight: '1.25',
          marginTop: '6px',
          zIndex: 1,
        }}
      >
        {roleLabel}
      </div>

      {/* Task card - with enhanced styling */}
      <div
        style={{
          marginTop: '6px',
          width: '120px',
          zIndex: 1,
          filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.18))',
        }}
      >
        <DeskTaskCard employee={employee} isActive={isActive} />
      </div>

      {/* Active indicator glow */}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '110px',
            background: `radial-gradient(circle, rgba(249,112,31,0.2) 0%, rgba(249,112,31,0) 70%)`,
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: 'glow-pulse 2s ease-in-out infinite',
            zIndex: 0,
          }}
        />
      )}

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.65; }
        }
      `}</style>
    </div>
  );
}
