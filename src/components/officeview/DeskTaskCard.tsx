import type { Employee } from '@/types/employee';
import { EMPLOYEE_STATUS_COLORS, EMPLOYEE_STATUS_LABELS } from '@/types/employee';

interface DeskTaskCardProps {
  employee: Employee;
  isActive: boolean;
}

export function DeskTaskCard({ employee, isActive }: DeskTaskCardProps) {
  const statusColor = EMPLOYEE_STATUS_COLORS[employee.status];
  const statusLabel = EMPLOYEE_STATUS_LABELS[employee.status];
  const taskCount = employee.tasks?.length || 0;
  const currentTask = employee.tasks?.[0];

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: `1px solid var(--border-color)`,
        borderRadius: '8px',
        padding: '11px 13px',
        fontSize: '10px',
        transition: 'all 0.2s ease',
        boxShadow: isActive ? '0 6px 18px rgba(0,0,0,0.28)' : '0 3px 10px rgba(0,0,0,0.2)',
        maxWidth: '200px',
        minWidth: '200px',
      }}
    >
      {/* Status with dot and count */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginBottom: '3px',
        }}
      >
        <div
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: statusColor,
            flexShrink: 0,
            animation: isActive ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
          }}
        />
        <span style={{ fontWeight: '600', color: 'var(--text-primary)', flex: 1, fontSize: '9px' }}>
          {statusLabel}
        </span>
        {taskCount > 0 && (
          <span
            style={{
              backgroundColor: statusColor,
              color: '#fff',
              borderRadius: '2px',
              padding: '0px 3px',
              fontSize: '9px',
              fontWeight: '600',
              minWidth: '16px',
              textAlign: 'center',
              flexShrink: 0,
            }}
          >
            {taskCount}
          </span>
        )}
      </div>

      {/* Current task if available */}
      {currentTask ? (
        <div
          style={{
            color: 'var(--text-secondary)',
            fontSize: '9px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '1.2',
          }}
        >
          {currentTask.title}
        </div>
      ) : (
        <div
          style={{
            color: 'var(--text-tertiary)',
            fontSize: '9px',
            fontStyle: 'italic',
            lineHeight: '1.2',
          }}
        >
          Waiting for Sandy
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
