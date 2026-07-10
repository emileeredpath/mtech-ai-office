import { useOfficeStore } from '@/store/officeStore';
import type { Employee } from '@/types/employee';
import { EMPLOYEE_STATUS_COLORS, EMPLOYEE_STATUS_LABELS } from '@/types/employee';
import { SandyDock } from './SandyDock';
import { ROLE_DISPLAY_NAMES } from './OfficeProps';
import { EmployeeCharacter } from './EmployeeCharacter';
import { useState, useEffect } from 'react';

interface LivingOfficeProps {
  sandyThinking: boolean;
  sandyMessage?: string;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string | null) => void;
  onAskSandy?: () => void;
}

// Premium office workstation positions - responsive 4-column layout
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
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const isSelected = (id: string) => selectedEmployeeId === id;
  const isActive = (id: string) =>
    selectedRoomId === id || employees.find((e) => e.id === id)?.status === 'working';
  const isHovered = (id: string) => hoveredId === id;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#FDFBF7',
      }}
    >
      {/* Top section - Introduction & Status */}
      <header
        style={{
          padding: '28px 40px',
          background: `
            linear-gradient(135deg,
              rgba(255,255,255,0.4) 0%,
              rgba(250,245,238,0.2) 100%),
            linear-gradient(180deg,
              #FDFBF7 0%,
              #F9F5F0 100%)
          `,
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(200,180,160,0.2)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '24px',
                fontWeight: '800',
                color: '#2B2B3E',
                margin: 0,
                marginBottom: '4px',
                letterSpacing: '-0.5px',
              }}
            >
              Team Workspace
            </h1>
            <p
              style={{
                fontSize: '13px',
                color: '#999',
                margin: 0,
                fontWeight: '500',
              }}
            >
              {employees.filter(e => e.status === 'working').length} team members working •{' '}
              {employees.reduce((sum, e) => sum + (e.tasks?.length || 0), 0)} active tasks
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#2E7D32',
              }}
            >
              ✓ All systems operational
            </div>
          </div>
        </div>
      </header>

      {/* Main office workspace grid */}
      <main
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'auto',
          background: `
            linear-gradient(135deg,
              #FDFBF7 0%,
              #FAF6F0 35%,
              #F5EFE7 70%,
              #F0E8DF 100%),
            radial-gradient(
              circle at 20% 50%,
              rgba(255,200,140,0.03) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 80%,
              rgba(150,120,90,0.02) 0%,
              transparent 50%
            )
          `,
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Workstations grid - responsive premium layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px',
            padding: '48px 40px',
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            justifyItems: 'center',
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
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: '300px',
                  cursor: 'pointer',
                  perspective: '1000px',
                }}
                onClick={() => {
                  selectEmployee(employee.id);
                  onSelectRoom(employee.id);
                }}
                onMouseEnter={() => setHoveredId(employee.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Premium workstation card - sophisticated glassmorphism */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    position: 'relative',
                    borderRadius: '20px',
                    background: `
                      linear-gradient(135deg,
                        rgba(255,255,255,0.9) 0%,
                        rgba(252,248,242,0.75) 25%,
                        rgba(245,240,232,0.6) 65%,
                        rgba(235,225,210,0.35) 100%),
                      radial-gradient(
                        circle at 20% 20%,
                        rgba(255,255,255,0.6) 0%,
                        transparent 40%
                      ),
                      radial-gradient(
                        circle at 80% 80%,
                        rgba(0,0,0,0.04) 0%,
                        transparent 50%
                      )
                    `,
                    backdropFilter: 'blur(28px)',
                    border: '1.5px solid rgba(255,255,255,0.8)',
                    boxShadow: isEmployeeSelected
                      ? `
                        0 0 60px rgba(249,112,31,0.4),
                        0 30px 80px rgba(0,0,0,0.16),
                        inset 0 1px 4px rgba(255,255,255,0.8),
                        inset 0 -1px 3px rgba(0,0,0,0.03)
                      `
                      : isHovered
                      ? `
                        0 18px 60px rgba(0,0,0,0.12),
                        inset 0 1px 4px rgba(255,255,255,0.8),
                        inset 0 -1px 3px rgba(0,0,0,0.03)
                      `
                      : `
                        0 12px 42px rgba(0,0,0,0.08),
                        inset 0 1px 4px rgba(255,255,255,0.8),
                        inset 0 -1px 3px rgba(0,0,0,0.03)
                      `,
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform: isEmployeeSelected
                      ? 'translateY(-14px) scale(1.04)'
                      : isHovered
                      ? 'translateY(-6px) scale(1.01)'
                      : 'translateY(0) scale(1)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '28px',
                    gap: '18px',
                    willChange: 'transform, box-shadow',
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

                  {/* Employee information card - premium glassmorphism */}
                  <div
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.55)',
                      backdropFilter: 'blur(16px)',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      border: '1px solid rgba(255,255,255,0.85)',
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5), 0 4px 12px rgba(0,0,0,0.05)',
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

                  {/* Speech bubble - collaborative message */}
                  {taskCount > 0 && (
                    <div
                      style={{
                        backgroundColor: 'rgba(210, 225, 255, 0.75)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: '11px',
                        padding: '9px 13px',
                        border: '1px solid rgba(255,255,255,0.7)',
                        fontSize: '9px',
                        fontWeight: '500',
                        color: '#445',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.08), inset 0 1px 2px rgba(255,255,255,0.5)',
                        position: 'relative',
                        animation: 'float-message 3.5s ease-in-out infinite',
                        lineHeight: '1.3',
                      }}
                    >
                      {COLLABORATION_MESSAGES[Math.abs(employee.id.charCodeAt(0)) % COLLABORATION_MESSAGES.length]}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-6px',
                          left: '14px',
                          width: '0',
                          height: '0',
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderTop: '6px solid rgba(210, 225, 255, 0.75)',
                          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))',
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Sandy collaboration center - prominent centerpiece */}
        <div
          style={{
            position: 'fixed',
            bottom: '48px',
            left: '50%',
            zIndex: 50,
            animation: 'float-subtle 6s ease-in-out infinite',
            filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.18))',
            pointerEvents: 'auto',
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
            box-shadow: 0 0 12px currentColor;
          }
          50% {
            opacity: 0.5;
            transform: scale(1.3);
            box-shadow: 0 0 20px currentColor;
          }
        }

        @keyframes float-message {
          0%, 100% {
            opacity: 0.2;
            transform: translateY(3px);
          }
          15%, 85% {
            opacity: 1;
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes float-subtle {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
            filter: drop-shadow(0 24px 60px rgba(0,0,0,0.16));
          }
          50% {
            transform: translateX(-50%) translateY(-14px);
            filter: drop-shadow(0 32px 72px rgba(0,0,0,0.2));
          }
        }

        @keyframes breathe {
          0%, 100% {
            opacity: 0.85;
          }
          50% {
            opacity: 1;
          }
        }

        /* Premium scrollbar styling */
        main::-webkit-scrollbar {
          width: 11px;
        }

        main::-webkit-scrollbar-track {
          background: linear-gradient(180deg,
            rgba(150,130,110,0.03) 0%,
            transparent 50%,
            rgba(150,130,110,0.03) 100%);
        }

        main::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg,
            rgba(120,100,80,0.3) 0%,
            rgba(120,100,80,0.4) 50%,
            rgba(120,100,80,0.3) 100%);
          border-radius: 6px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        main::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg,
            rgba(100,80,60,0.45) 0%,
            rgba(100,80,60,0.55) 50%,
            rgba(100,80,60,0.45) 100%);
          background-clip: padding-box;
        }
      `}</style>
    </div>
  );
}
