import type { Employee } from '@/types/employee';

interface OfficeDeskProps {
  employee: Employee;
  isSelected: boolean;
  isActive: boolean;
}

export function OfficeDesk({ employee, isSelected, isActive }: OfficeDeskProps) {
  return (
    <div
      className="transition-all duration-300"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {/* Wooden Desk */}
      <div
        style={{
          position: 'relative',
          width: '100px',
          height: '70px',
          backgroundColor: '#A0826D',
          background: 'linear-gradient(135deg, #B8945F 0%, #A0826D 50%, #8B7355 100%)',
          border: isSelected ? '3px solid #F97021' : '2px solid rgba(0,0,0,0.3)',
          borderRadius: '4px',
          boxShadow: isSelected
            ? '0 0 16px rgba(249,112,31,0.6), inset 0 0 8px rgba(255,255,255,0.1)'
            : 'inset 0 0 6px rgba(0,0,0,0.3), 0 3px 8px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          transform: isSelected ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        {/* Wood texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 6px)`,
            opacity: 0.5,
            pointerEvents: 'none',
          }}
        />

        {/* Monitor on desk */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '10px',
            width: '32px',
            height: '26px',
            backgroundColor: '#1a1a2e',
            borderRadius: '2px',
            border: `2px solid ${employee.accentColor}`,
            boxShadow: `0 0 10px ${employee.accentColor}cc, inset 0 0 6px ${employee.accentColor}44`,
          }}
        />

        {/* Person sitting at desk */}
        <div
          style={{
            position: 'absolute',
            left: '12px',
            top: '18px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1px',
          }}
        >
          {/* Head */}
          <div
            style={{
              width: '13px',
              height: '13px',
              borderRadius: '50%',
              backgroundColor: '#D2B48C',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
          />
          {/* Torso (seated) */}
          <div
            style={{
              width: '11px',
              height: '11px',
              backgroundColor: employee.accentColor,
              borderRadius: '2px',
              opacity: 0.85,
            }}
          />
        </div>
      </div>

      {/* Desk Card - Black Header with Job Title */}
      <div
        style={{
          width: '100px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          fontSize: '11px',
          transition: 'all 0.2s ease',
        }}
      >
        {/* Black header bar */}
        <div
          style={{
            backgroundColor: '#2c2c2c',
            color: '#fff',
            padding: '6px 6px',
            fontWeight: 'bold',
            fontSize: '9px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            minHeight: '24px',
          }}
        >
          {/* Status dot */}
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 4px #10B981',
            }}
          />
          <div style={{ flex: 1 }}>{employee.role}</div>
        </div>

        {/* Job title (also in body) */}
        <div
          style={{
            padding: '6px 6px',
            borderBottom: '1px solid #eee',
            fontSize: '10px',
            fontWeight: '600',
            color: '#333',
            textAlign: 'center',
            lineHeight: '1.3',
          }}
        >
          {employee.role}
        </div>

        {/* Today's Tasks */}
        <div style={{ padding: '4px 6px' }}>
          <div
            style={{
              fontSize: '8px',
              fontWeight: 'bold',
              color: '#666',
              marginBottom: '3px',
            }}
          >
            Today
          </div>
          <div style={{ fontSize: '8px', color: '#999', lineHeight: '1.4' }}>
            {employee.tasks && employee.tasks.length > 0 ? (
              <>
                {employee.tasks.slice(0, 2).map((task, idx) => (
                  <div key={idx} style={{ marginBottom: '2px' }}>
                    ☐ {task.title.substring(0, 18)}...
                  </div>
                ))}
                {employee.tasks.length > 2 && (
                  <div style={{ marginTop: '2px', fontSize: '7px', color: '#bbb' }}>
                    +{employee.tasks.length - 2} more
                  </div>
                )}
              </>
            ) : (
              <div style={{ fontStyle: 'italic', color: '#ccc' }}>No tasks</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
