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
      }}
    >
      {/* Desk workstation */}
      <div
        style={{
          position: 'relative',
          width: '90px',
          height: '68px',
          backgroundColor: '#A0826D',
          backgroundImage: `linear-gradient(135deg, #B89570 0%, #A0826D 50%, #8B6F47 100%)`,
          borderRadius: '4px',
          border: '1px solid rgba(0,0,0,0.25)',
          boxShadow: `${isSelected ? '0 0 12px rgba(212, 165, 116, 0.6), ' : ''}0 6px 16px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.15)`,
          padding: '6px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: '3px',
          overflow: 'hidden',
        }}
      >
        {/* Monitor */}
        <div
          style={{
            width: '32px',
            height: '24px',
            backgroundColor: '#0a0a0a',
            borderRadius: '2px',
            border: `2px solid ${employee.accentColor}`,
            boxShadow: `0 2px 6px rgba(0,0,0,0.4), 0 0 6px ${employee.accentColor}55`,
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
            height: '12px',
            gap: '2px',
          }}
        >
          {/* Keyboard */}
          <div
            style={{
              flex: 1,
              height: '8px',
              backgroundColor: '#1a1a1a',
              borderRadius: '1px',
              border: '0.5px solid #0a0a0a',
            }}
          />

          {/* Mug */}
          <div
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: '#8B4513',
              borderRadius: '1px',
              border: '0.5px solid #5C2E0F',
            }}
          />

          {/* Plant */}
          <div
            style={{
              width: '8px',
              height: '10px',
              backgroundColor: '#2ba876',
              borderRadius: '1px 1px 0 0',
            }}
          />
        </div>

        {/* Papers/notebook */}
        <div
          style={{
            width: '100%',
            height: '6px',
            backgroundColor: '#F5F1E8',
            borderRadius: '1px',
            opacity: 0.7,
          }}
        />
      </div>

      {/* Employee character - sitting at desk */}
      <div
        style={{
          position: 'relative',
          marginTop: '-8px',
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
          width: '90px',
          lineHeight: '1.2',
          marginTop: '4px',
        }}
      >
        {roleLabel}
      </div>

      {/* Task card */}
      <div style={{ marginTop: '2px', width: '100%' }}>
        <DeskTaskCard employee={employee} isActive={isActive} />
      </div>

      {/* Active indicator glow */}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '100px',
            background: `radial-gradient(circle, rgba(249,112,31,0.15) 0%, rgba(249,112,31,0) 70%)`,
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: 'glow-pulse 2s ease-in-out infinite',
          }}
        />
      )}

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
