import type { Employee } from '@/types/employee';
import { EmployeeAvatar } from './EmployeeAvatar';

interface OfficeDeskProps {
  employee: Employee;
  isSelected: boolean;
  isActive: boolean;
  onClick?: () => void;
}

export function OfficeDesk({ employee, isSelected, isActive, onClick }: OfficeDeskProps) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {/* Desk surface */}
      <div
        style={{
          position: 'relative',
          width: '140px',
          height: '85px',
          backgroundColor: '#A0826D',
          background: 'linear-gradient(135deg, #B8945F 0%, #A0826D 40%, #8B7355 100%)',
          borderRadius: '6px',
          border: isSelected ? '3px solid #F97021' : '1px solid rgba(0,0,0,0.2)',
          boxShadow: isSelected
            ? '0 12px 24px rgba(249,112,31,0.3), inset 0 1px 2px rgba(255,255,255,0.2), inset -2px -2px 4px rgba(0,0,0,0.15)'
            : '0 8px 16px rgba(0,0,0,0.12), inset 0 1px 2px rgba(255,255,255,0.15), inset -1px -1px 2px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
          transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        {/* Wood texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              repeating-linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.02) 1px, transparent 2px, transparent 40px),
              repeating-linear-gradient(0deg, transparent 0%, rgba(0,0,0,0.015) 1px, transparent 2px, transparent 40px)
            `,
            opacity: 0.6,
          }}
        />

        {/* Desk contents layout */}
        <div style={{ position: 'relative', width: '100%', height: '100%', padding: '8px' }}>
          {/* Monitor - right side */}
          <div
            style={{
              position: 'absolute',
              right: '8px',
              top: '8px',
              width: '50px',
              height: '38px',
              backgroundColor: '#1a1a2e',
              borderRadius: '3px',
              border: `2px solid ${employee.accentColor}`,
              boxShadow: `0 4px 8px rgba(0,0,0,0.2), 0 0 12px ${employee.accentColor}66, inset 0 0 4px ${employee.accentColor}33`,
              overflow: 'hidden',
            }}
          >
            {/* Monitor screen content */}
            <div
              style={{
                position: 'absolute',
                inset: '2px',
                backgroundColor: '#0f0f1e',
                borderRadius: '1px',
                background: `linear-gradient(135deg, rgba(${employee.accentColor === '#F97021' ? '249,112,31' : '139,92,246'},0.15) 0%, rgba(0,0,0,0.8) 100%)`,
              }}
            />
          </div>

          {/* Coffee mug - right corner */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            style={{
              position: 'absolute',
              bottom: '6px',
              right: '8px',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
            }}
          >
            <path
              d="M 6 8 L 8 20 Q 8 22 10 22 L 18 22 Q 20 22 20 20 L 22 8"
              fill="#8B4513"
              stroke="#654321"
              strokeWidth="0.5"
            />
            <ellipse cx="14" cy="8" rx="8" ry="3" fill="#A0522D" stroke="#654321" strokeWidth="0.5" />
            <path
              d="M 20 12 Q 23 12 23 15 Q 23 18 20 18"
              fill="none"
              stroke="#654321"
              strokeWidth="1"
            />
            <ellipse cx="14" cy="18" rx="6" ry="2" fill="#6B4423" opacity="0.6" />
          </svg>

          {/* Keyboard - bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: '6px',
              left: '8px',
              width: '60px',
              height: '18px',
              backgroundColor: '#2c2c2c',
              borderRadius: '3px',
              border: '1px solid #1a1a1a',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.05)',
              backgroundImage: `
                repeating-linear-gradient(90deg, transparent 0%, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 4px),
                repeating-linear-gradient(0deg, transparent 0%, transparent 3px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.04) 4px)
              `,
            }}
          />

          {/* Papers/documents stack - center */}
          <div
            style={{
              position: 'absolute',
              left: '12px',
              top: '12px',
              width: '35px',
              height: '28px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '32px',
                height: '24px',
                backgroundColor: '#fff',
                border: '1px solid #d0d0d0',
                borderRadius: '1px',
                transform: 'rotate(2deg)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '32px',
                height: '24px',
                backgroundColor: '#f8f8f8',
                border: '1px solid #d0d0d0',
                borderRadius: '1px',
                transform: 'rotate(-1deg) translateY(2px)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
              }}
            />
          </div>

          {/* Small plant on desk - left center */}
          <svg width="24" height="32" viewBox="0 0 24 32" style={{ position: 'absolute', left: '6px', bottom: '22px' }}>
            <ellipse cx="12" cy="26" rx="6" ry="4" fill="#8B6F47" opacity="0.8" />
            <ellipse cx="10" cy="18" rx="5" ry="12" fill="#22c55e" opacity="0.7" transform="rotate(-20 10 18)" />
            <ellipse cx="14" cy="15" rx="4" ry="13" fill="#22c55e" opacity="0.8" />
            <ellipse cx="18" cy="18" rx="5" ry="12" fill="#22c55e" opacity="0.7" transform="rotate(20 18 18)" />
          </svg>
        </div>
      </div>

      {/* Avatar sitting at desk */}
      <div style={{ marginTop: '4px' }}>
        <EmployeeAvatar employee={employee} size={44} animated={true} />
      </div>

      {/* Job title label */}
      <div
        style={{
          backgroundColor: '#2c2c2c',
          color: '#fff',
          padding: '6px 10px',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: '600',
          textAlign: 'center',
          minWidth: '140px',
          transition: 'all 0.2s',
          boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.2)' : '0 2px 6px rgba(0,0,0,0.1)',
        }}
      >
        {employee.role}
      </div>

      {/* Status indicator and tasks */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '10px',
          color: 'var(--text-secondary)',
        }}
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#10B981',
            boxShadow: '0 0 4px #10B981',
          }}
        />
        <span>{employee.tasks?.length || 0} tasks</span>
      </div>

      {/* Active badge */}
      {isActive && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '9px',
            color: '#10B981',
            backgroundColor: 'rgba(16,185,129,0.15)',
            padding: '2px 6px',
            borderRadius: '3px',
            border: '1px solid rgba(16,185,129,0.3)',
          }}
        >
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#10B981' }} />
          Active
        </div>
      )}
    </div>
  );
}
