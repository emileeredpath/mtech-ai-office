import type { Employee } from '@/types/employee';
import { Chair } from './Chair';
import { Monitor } from './Monitor';
import { Keyboard } from './Keyboard';
import { CoffeeMug } from './CoffeeMug';
import { Employee as EmployeeComponent } from './Employee';
import { TaskCard } from './TaskCard';

interface DeskProps {
  employee: Employee;
  isSelected?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

export function Desk({ employee, isSelected = false, isActive = false, onClick }: DeskProps) {
  const isTyping = isActive;

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {/* Desk surface */}
      <div
        style={{
          position: 'relative',
          width: '140px',
          height: '80px',
          backgroundColor: '#A0826D',
          background: 'linear-gradient(135deg, #B8945F 0%, #A0826D 40%, #8B7355 100%)',
          borderRadius: '8px',
          border: isSelected ? '2px solid #F97021' : '1px solid rgba(0,0,0,0.2)',
          boxShadow: `
            0 8px 20px rgba(0,0,0,0.25),
            inset 0 1px 2px rgba(255,255,255,0.2),
            inset -2px -2px 6px rgba(0,0,0,0.15)
          `,
          overflow: 'visible',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isSelected ? 'translateY(-6px)' : 'translateY(0)',
        }}
      >
        {/* Wood texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '8px',
            backgroundImage: `
              repeating-linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.02) 1px, transparent 2px, transparent 40px),
              repeating-linear-gradient(0deg, transparent 0%, rgba(0,0,0,0.015) 1px, transparent 2px, transparent 40px)
            `,
            opacity: 0.6,
            pointerEvents: 'none',
          }}
        />

        {/* Desk layout - organized workspace */}
        <div style={{ position: 'relative', width: '100%', height: '100%', padding: '10px' }}>
          {/* Left side - Monitor area */}
          <div style={{ position: 'absolute', left: '10px', top: '10px' }}>
            <Monitor accentColor={employee.accentColor} isActive={isActive} />
          </div>

          {/* Right side - Keyboard */}
          <div style={{ position: 'absolute', right: '8px', bottom: '10px' }}>
            <Keyboard isTyping={isTyping} />
          </div>

          {/* Center - Coffee mug */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <CoffeeMug />
          </div>

          {/* Papers/documents */}
          <div style={{ position: 'absolute', right: '12px', top: '15px', width: '28px', height: '24px' }}>
            <div
              style={{
                position: 'absolute',
                width: '26px',
                height: '22px',
                backgroundColor: '#fff',
                border: '0.5px solid #d0d0d0',
                borderRadius: '2px',
                transform: 'rotate(3deg)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '26px',
                height: '22px',
                backgroundColor: '#f8f8f8',
                border: '0.5px solid #d0d0d0',
                borderRadius: '2px',
                transform: 'rotate(-2deg) translateY(2px)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Chair behind desk */}
      <div
        style={{
          position: 'absolute',
          bottom: '-25px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 0,
        }}
      >
        <Chair />
      </div>

      {/* Employee sitting at desk - positioned in chair */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -45%)',
          zIndex: 2,
        }}
      >
        <EmployeeComponent employee={employee} isTyping={isTyping} isSelected={isSelected} />
      </div>

      {/* Task card - attached to desk */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '100%',
          marginTop: '8px',
          minWidth: '100px',
        }}
      >
        <TaskCard employee={employee} isActive={isActive} />
      </div>

      {/* Desk name label - subtle */}
      <div
        style={{
          position: 'absolute',
          bottom: '-16px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '10px',
          fontWeight: '600',
          color: 'var(--text-secondary)',
          whiteSpace: 'nowrap',
          opacity: 0.7,
        }}
      >
        {employee.role}
      </div>
    </div>
  );
}
