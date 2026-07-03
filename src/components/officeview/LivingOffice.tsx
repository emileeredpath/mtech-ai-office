import { useOfficeStore } from '@/store/officeStore';
import type { Employee } from '@/types/employee';
import { EMPLOYEE_STATUS_COLORS, EMPLOYEE_STATUS_LABELS } from '@/types/employee';
import { SandyDock } from './SandyDock';
import { ROLE_DISPLAY_NAMES } from './OfficeProps';
import { EmployeeCharacter } from './EmployeeCharacter';

interface LivingOfficeProps {
  sandyThinking: boolean;
  sandyMessage?: string;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string | null) => void;
  onAskSandy?: () => void;
}

// Premium office workstation positions using CSS Grid + percentage offsets
const WORKSTATION_GRID = {
  'marketing-director': { column: 1, row: 1 },
  'seo-ppc-manager': { column: 2, row: 1 },
  'website-auditor': { column: 3, row: 1 },
  'proposal-writer': { column: 4, row: 1 },
  'social-media-manager': { column: 1, row: 2 },
  'email-marketing-manager': { column: 2, row: 2 },
  'case-study-writer': { column: 3, row: 2 },
  'funding-rewards-manager': { column: 4, row: 2 },
};

const COLLABORATION_MESSAGES = [
  'Great work on the social campaign! 🎯',
  'Found 15 issues - checking now ✅',
  'Keyword research complete 📊',
  'Shall we align on the new campaign? 💬',
  'Interview with client at 2pm 📅',
  'Building our new nurture sequence 🚀',
];

export function LivingOffice({
  sandyThinking,
  sandyMessage,
  selectedRoomId,
  onSelectRoom,
  onAskSandy,
}: LivingOfficeProps) {
  const employees = useOfficeStore((state) => state.employees);
  const selectedEmployeeId = useOfficeStore((state) => state.selectedEmployeeId);
  const selectEmployee = useOfficeStore((state) => state.selectEmployee);

  const isSelected = (id: string) => selectedEmployeeId === id;
  const isActive = (id: string) =>
    selectedRoomId === id || employees.find((e) => e.id === id)?.status === 'working';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#FAF8F5',
      }}
    >
      {/* Top navigation bar */}
      <header
        style={{
          height: '56px',
          backgroundColor: '#2B2B3E',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          zIndex: 100,
        }}
      >
        <h1
          style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#fff',
            margin: 0,
            letterSpacing: '0.5px',
          }}
        >
          Living Office
        </h1>
      </header>

      {/* Main office canvas */}
      <main
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'auto',
          background: `
            linear-gradient(135deg, #FAF8F5 0%, #F5F0EA 40%, #EFE9E1 100%),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 200px,
              rgba(150,130,110,0.02) 200px,
              rgba(150,130,110,0.02) 400px
            )
          `,
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Premium office workspace grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(280px, 1fr))',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '32px',
            padding: '40px',
            minHeight: '100vh',
            alignContent: 'start',
          }}
        >
          {/* Workstations */}
          {employees.map((employee) => {
            const gridPos = WORKSTATION_GRID[employee.id as keyof typeof WORKSTATION_GRID];
            if (!gridPos) return null;

            const isEmployeeSelected = isSelected(employee.id);
            const isEmployeeActive = isActive(employee.id);
            const statusColor = EMPLOYEE_STATUS_COLORS[employee.status];
            const statusLabel = EMPLOYEE_STATUS_LABELS[employee.status];
            const taskCount = employee.tasks?.length || 0;
            const currentTask = employee.tasks?.[0];

            return (
              <div
                key={employee.id}
                style={{
                  gridColumn: gridPos.column,
                  gridRow: gridPos.row,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  perspective: '1000px',
                }}
                onClick={() => {
                  selectEmployee(employee.id);
                  onSelectRoom(employee.id);
                }}
              >
                {/* Workstation base - premium desk */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    position: 'relative',
                    borderRadius: '16px',
                    background: `
                      linear-gradient(135deg,
                        rgba(255,255,255,0.8) 0%,
                        rgba(245,240,230,0.6) 50%,
                        rgba(235,225,210,0.4) 100%),
                      radial-gradient(
                        circle at 30% 30%,
                        rgba(255,255,255,0.4) 0%,
                        transparent 50%
                      )
                    `,
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.7)',
                    boxShadow: isEmployeeSelected
                      ? `
                        0 0 40px rgba(249,112,31,0.3),
                        0 20px 60px rgba(0,0,0,0.12),
                        inset 0 1px 2px rgba(255,255,255,0.6)
                      `
                      : `
                        0 12px 40px rgba(0,0,0,0.08),
                        inset 0 1px 2px rgba(255,255,255,0.6)
                      `,
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform: isEmployeeSelected ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '24px',
                    gap: '16px',
                  }}
                >
                  {/* Employee character - large prominent display */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      filter: isEmployeeActive
                        ? 'drop-shadow(0 10px 25px rgba(249,112,31,0.3))'
                        : 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',
                      transition: 'filter 0.3s ease',
                    }}
                  >
                    <EmployeeCharacter employee={employee} size="medium" />
                  </div>

                  {/* Employee information card - nested glass effect */}
                  <div
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.5)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      border: '1px solid rgba(255,255,255,0.8)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {/* Role and status line */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '11px',
                          fontWeight: '800',
                          color: '#2B2B3E',
                          textTransform: 'uppercase',
                          letterSpacing: '0.6px',
                          flex: 1,
                        }}
                      >
                        {ROLE_DISPLAY_NAMES[employee.id] || employee.role}
                      </div>
                      <div
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          backgroundColor: statusColor,
                          flexShrink: 0,
                          boxShadow: `0 0 8px ${statusColor}`,
                          animation: isEmployeeActive ? 'pulse-dot 2s ease-in-out infinite' : 'none',
                        }}
                      />
                    </div>

                    {/* Status and task count */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '9px',
                          fontWeight: '600',
                          color: '#888',
                          textTransform: 'capitalize',
                        }}
                      >
                        {statusLabel}
                      </span>
                      {taskCount > 0 && (
                        <span
                          style={{
                            backgroundColor: statusColor,
                            color: '#fff',
                            borderRadius: '3px',
                            padding: '2px 6px',
                            fontSize: '8px',
                            fontWeight: '700',
                            marginLeft: 'auto',
                          }}
                        >
                          {taskCount} task{taskCount !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    {/* Current task or waiting state */}
                    <div
                      style={{
                        fontSize: '10px',
                        color: currentTask ? '#555' : '#aaa',
                        fontStyle: currentTask ? 'normal' : 'italic',
                        lineHeight: '1.4',
                        minHeight: '20px',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {currentTask ? currentTask.title : 'Waiting for Sandy'}
                    </div>
                  </div>

                  {/* Speech bubble - floating above */}
                  {Math.random() > 0.5 && (
                    <div
                      style={{
                        backgroundColor: 'rgba(200, 220, 255, 0.7)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        border: '1px solid rgba(255,255,255,0.6)',
                        fontSize: '9px',
                        color: '#334',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        position: 'relative',
                        animation: 'float-up 3s ease-in-out infinite',
                      }}
                    >
                      {COLLABORATION_MESSAGES[employee.tasks?.length || 0 % COLLABORATION_MESSAGES.length]}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-5px',
                          left: '12px',
                          width: '0',
                          height: '0',
                          borderLeft: '5px solid transparent',
                          borderRight: '5px solid transparent',
                          borderTop: '5px solid rgba(200, 220, 255, 0.7)',
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Sandy collaboration center - overlays the grid */}
        <div
          style={{
            position: 'fixed',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
            animation: 'float-subtle 6s ease-in-out infinite',
            filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.15))',
          }}
        >
          <SandyDock onAskSandy={onAskSandy || (() => {})} />
        </div>
      </main>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }

        @keyframes float-up {
          0%, 100% {
            opacity: 0;
            transform: translateY(0);
          }
          10%, 90% {
            opacity: 1;
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes float-subtle {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-8px);
          }
        }

        /* Smooth scrolling */
        main::-webkit-scrollbar {
          width: 8px;
        }

        main::-webkit-scrollbar-track {
          background: transparent;
        }

        main::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.15);
          border-radius: 4px;
          transition: background 0.2s;
        }

        main::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.25);
        }
      `}</style>
    </div>
  );
}
