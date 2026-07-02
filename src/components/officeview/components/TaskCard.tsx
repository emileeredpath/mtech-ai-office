import type { Employee } from '@/types/employee';

interface TaskCardProps {
  employee: Employee;
  isActive?: boolean;
}

export function TaskCard({ employee, isActive = false }: TaskCardProps) {
  const tasks = (employee.tasks || []).slice(0, 3);

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        padding: '8px',
        fontSize: '9px',
        minWidth: '90px',
        boxShadow: isActive ? '0 6px 12px rgba(249,112,31,0.2)' : '0 2px 6px rgba(0,0,0,0.1)',
        animation: isActive ? 'taskCardPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
      }}
    >
      {/* Header */}
      <div
        style={{
          fontWeight: 'bold',
          color: '#6b7280',
          marginBottom: '4px',
          fontSize: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        Tasks Today
      </div>

      {/* Task list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {tasks.length > 0 ? (
          tasks.map((task, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '3px',
                padding: '2px 0',
                borderBottom: idx < tasks.length - 1 ? '1px solid #f3f4f6' : 'none',
                animation: isActive ? `taskCheckAnim 0.5s ease-out ${idx * 0.1}s both` : 'none',
              }}
            >
              <input
                type="checkbox"
                style={{
                  width: '10px',
                  height: '10px',
                  marginTop: '1px',
                  cursor: 'pointer',
                  accentColor: employee.accentColor,
                }}
                disabled
              />
              <span
                style={{
                  color: '#4b5563',
                  lineHeight: '1.2',
                  wordBreak: 'break-word',
                  flex: 1,
                }}
              >
                {task.title.substring(0, 35)}
              </span>
            </div>
          ))
        ) : (
          <div style={{ color: '#9ca3af', fontStyle: 'italic', padding: '2px 0' }}>No tasks</div>
        )}
      </div>

      {/* Status indicator */}
      <div
        style={{
          marginTop: '4px',
          paddingTop: '4px',
          borderTop: '1px solid #f3f4f6',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          fontSize: '7px',
          color: '#6b7280',
        }}
      >
        <div
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            boxShadow: '0 0 3px #10b981',
          }}
        />
        <span>Online</span>
      </div>

      <style>{`
        @keyframes taskCardPop {
          0% {
            transform: scale(0.8) translateY(10px);
            opacity: 0;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes taskCheckAnim {
          0% {
            opacity: 0;
            transform: translateX(-8px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
