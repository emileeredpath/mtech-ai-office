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

      {/* Desk workstation - larger */}
      <div
        style={{
          position: 'relative',
          width: '106px',
          height: '76px',
          backgroundColor: '#A0826D',
          backgroundImage: `linear-gradient(135deg, #B89570 0%, #A0826D 50%, #8B6F47 100%)`,
          borderRadius: '5px',
          border: '1px solid rgba(0,0,0,0.3)',
          boxShadow: `${isSelected ? '0 0 14px rgba(212, 165, 116, 0.7), ' : ''}0 8px 20px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.2)`,
          padding: '7px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: '4px',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* Monitor */}
        <div
          style={{
            width: '36px',
            height: '28px',
            backgroundColor: '#0a0a0a',
            borderRadius: '2px',
            border: `2px solid ${employee.accentColor}`,
            boxShadow: `0 2px 6px rgba(0,0,0,0.4), 0 0 8px ${employee.accentColor}66`,
            margin: '0 auto',
          }}
        />

        {/* Keyboard and mouse area */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '13px',
            gap: '2px',
          }}
        >
          {/* Keyboard */}
          <div
            style={{
              flex: 1,
              height: '9px',
              backgroundColor: '#1a1a1a',
              borderRadius: '1px',
              border: '0.5px solid #0a0a0a',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)',
            }}
          />

          {/* Mug */}
          <div
            style={{
              width: '11px',
              height: '12px',
              backgroundColor: '#8B4513',
              borderRadius: '2px',
              border: '0.5px solid #5C2E0F',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
          />

          {/* Plant */}
          <div
            style={{
              width: '9px',
              height: '12px',
              backgroundColor: '#2ba876',
              borderRadius: '1px 1px 0 0',
              boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
            }}
          />
        </div>

        {/* Papers/notebook */}
        <div
          style={{
            width: '100%',
            height: '7px',
            backgroundColor: '#F5F1E8',
            borderRadius: '1px',
            opacity: 0.75,
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
          }}
        />
      </div>

      {/* Chair behind person */}
      <div
        style={{
          position: 'absolute',
          top: '48px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '32px',
          height: '28px',
          backgroundColor: '#7A6F5D',
          borderRadius: '4px',
          border: '1px solid rgba(0,0,0,0.3)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
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

      {/* Task card - with better shadow */}
      <div
        style={{
          marginTop: '4px',
          width: '100%',
          zIndex: 1,
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))',
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
