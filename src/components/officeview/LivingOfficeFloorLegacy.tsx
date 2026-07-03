import { useOfficeStore } from '@/store/officeStore';
import type { Employee } from '@/types/employee';
import { EMPLOYEE_STATUS_COLORS, EMPLOYEE_STATUS_LABELS } from '@/types/employee';
import { SandyDock } from './SandyDock';
import { ROLE_DISPLAY_NAMES } from './OfficeProps';
import { EmployeeCharacter } from './EmployeeCharacter';

interface LivingOfficeViewProps {
  sandyThinking: boolean;
  sandyMessage?: string;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string | null) => void;
  onAskSandy?: () => void;
}

// Desk positions optimized for premium office layout
const DESK_POSITIONS: Record<string, { x: number; y: number }> = {
  'marketing-director': { x: 12, y: 20 },
  'seo-ppc-manager': { x: 38, y: 18 },
  'website-auditor': { x: 64, y: 20 },
  'social-media-manager': { x: 18, y: 60 },
  'email-marketing-manager': { x: 50, y: 65 },
  'case-study-writer': { x: 82, y: 60 },
  'proposal-writer': { x: 85, y: 25 },
  'funding-rewards-manager': { x: 68, y: 60 },
};

// Speech bubbles data
const SPEECH_BUBBLES = [
  { text: 'Great work on the social campaign!', x: 22, y: 8, color: '#C4E5FF', position: 'top' },
  { text: 'Working on keyword research', x: 40, y: 12, color: '#E3F2FF', position: 'top' },
  { text: 'Found 15 issues checking now', x: 65, y: 10, color: '#FFF3CD', position: 'top' },
  { text: 'Shall we align on the new campaign?', x: 50, y: 48, color: '#FFE8E8', position: 'center' },
  { text: 'Interview with client at 2pm', x: 85, y: 42, color: '#E3F2FF', position: 'top' },
  { text: 'Building our new nurture sequence', x: 45, y: 52, color: '#E8F5E9', position: 'center' },
];

export function LivingOfficeView({
  sandyThinking,
  sandyMessage,
  selectedRoomId,
  onSelectRoom,
  onAskSandy,
}: LivingOfficeViewProps) {
  const employees = useOfficeStore((state) => state.employees);
  const selectedEmployeeId = useOfficeStore((state) => state.selectedEmployeeId);
  const selectEmployee = useOfficeStore((state) => state.selectEmployee);

  const isSelected = (id: string) => selectedEmployeeId === id;
  const isActive = (id: string) => selectedRoomId === id || employees.find((e) => e.id === id)?.status === 'working';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F5F1EB',
      }}
    >
      {/* Top navigation bar */}
      <div
        style={{
          height: '56px',
          backgroundColor: '#2B2B3E',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '20px',
          color: '#fff',
        }}
      >
        <div style={{ fontSize: '16px', fontWeight: '700' }}>Office Floor</div>
      </div>

      {/* Main office scene with background image approach */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          background: `
            linear-gradient(180deg,
              #F0E8DE 0%,
              #EAD9C8 15%,
              #E0CAB5 40%,
              #D4B8A0 70%,
              #C9A887 100%),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 80px,
              rgba(200, 150, 100, 0.03) 80px,
              rgba(200, 150, 100, 0.03) 160px),
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 60px,
              rgba(150, 100, 60, 0.02) 60px,
              rgba(150, 100, 60, 0.02) 120px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 100% 100%',
          perspective: '1200px',
        }}
      >
        {/* Far back wall section */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '25%',
            background: `
              linear-gradient(180deg,
                #EDD9C6 0%,
                #E8CCB5 100%),
              linear-gradient(90deg,
                rgba(0,0,0,0.02) 0%,
                transparent 50%,
                rgba(0,0,0,0.03) 100%)
            `,
            boxShadow: 'inset 0 -15px 30px rgba(0,0,0,0.08)',
          }}
        >
          {/* Wall sign */}
          <div
            style={{
              position: 'absolute',
              left: '5%',
              top: '20%',
              width: '200px',
              padding: '14px 18px',
              backgroundColor: '#F5F1EB',
              border: '3px solid #8B7355',
              borderRadius: '4px',
              boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#2B2B3E', letterSpacing: '2px' }}>
              MARKETING TEAM
            </div>
            <div style={{ fontSize: '11px', color: '#888', fontStyle: 'italic', marginTop: '4px' }}>
              Working together, achieving more 💪
            </div>
          </div>

          {/* Wall clock */}
          <div
            style={{
              position: 'absolute',
              right: '28%',
              top: '18%',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#F5D4A8',
              border: '3px solid #8B6F47',
              boxShadow: '0 5px 14px rgba(0,0,0,0.18), inset 0 -2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
            }}
          >
            ⏰
          </div>

          {/* Team Goals whiteboard */}
          <div
            style={{
              position: 'absolute',
              right: '5%',
              top: '16%',
              width: '200px',
              backgroundColor: '#F5F1EB',
              border: '3px solid #999',
              borderRadius: '3px',
              padding: '12px',
              boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#2B2B3E', marginBottom: '8px' }}>
              Team Goals
            </div>
            <div style={{ fontSize: '11px', color: '#888', lineHeight: '1.5' }}>
              <div>✓ Increase Brand Awareness</div>
              <div>✓ Generate Quality Leads</div>
              <div>✓ Improve Conversion Rate</div>
            </div>
          </div>
        </div>

        {/* Right wall with windows - sunlight */}
        <div
          style={{
            position: 'absolute',
            right: '0',
            top: '0',
            width: '16%',
            height: '100%',
            background: `
              linear-gradient(90deg,
                transparent 0%,
                rgba(255,248,220,0.15) 25%,
                rgba(255,240,180,0.25) 60%,
                rgba(255,235,160,0.3) 100%)
            `,
            boxShadow: 'inset -8px 0 25px rgba(200, 180, 150, 0.2)',
          }}
        >
          {/* Windows */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`window-${i}`}
              style={{
                position: 'absolute',
                right: '6%',
                top: `${10 + i * 22}%`,
                width: '56px',
                height: '42px',
                backgroundColor: '#A8D8FF',
                border: '2px solid #7AC5FF',
                borderRadius: '2px',
                boxShadow: `inset 0 1px 3px rgba(255,255,255,0.8), 0 4px 10px rgba(100,150,200,0.25)`,
              }}
            />
          ))}
        </div>

        {/* Floor - wooden planks */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '45%',
            background: `
              linear-gradient(180deg,
                rgba(200, 160, 110, 0.08) 0%,
                rgba(180, 140, 90, 0.25) 100%),
              linear-gradient(90deg,
                #B59268 0%,
                #AA8B5F 20%,
                #A08456 45%,
                #977D50 70%,
                #8B7245 100%),
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 120px,
                rgba(0,0,0,0.04) 120px,
                rgba(0,0,0,0.04) 130px)
            `,
            boxShadow: 'inset 0 15px 45px rgba(0,0,0,0.12)',
          }}
        />

        {/* Central collaboration area - premium rug and seating */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '56%',
            transform: 'translate(-50%, -50%)',
            width: '320px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: '#C9A877',
            backgroundImage: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(0,0,0,0.1), transparent 50%)
            `,
            boxShadow: '0 12px 32px rgba(0,0,0,0.25), inset 0 -4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
          }}
        >
          {/* Coffee table */}
          <div
            style={{
              width: '90px',
              height: '65px',
              backgroundColor: '#8B6F47',
              borderRadius: '6px',
              boxShadow: '0 6px 14px rgba(0,0,0,0.3)',
              border: '2px solid #6B5435',
              backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
            }}
          />
        </div>

        {/* Water cooler - accent element */}
        <div
          style={{
            position: 'absolute',
            left: '4%',
            bottom: '18%',
            width: '48px',
            height: '76px',
            backgroundColor: '#B3D9FF',
            borderRadius: '6px',
            border: '2px solid #5a9bd4',
            boxShadow: '0 7px 18px rgba(0,0,0,0.2)',
            zIndex: 3,
          }}
        />

        {/* Decorative plants */}
        {[
          { left: '3%', bottom: '10%', size: 'large' },
          { right: '20%', bottom: '14%', size: 'medium' },
          { right: '2%', bottom: '22%', size: 'medium' },
        ].map((plant, i) => (
          <div
            key={`plant-${i}`}
            style={{
              position: 'absolute',
              left: plant.left,
              right: plant.right,
              bottom: plant.bottom,
              width: plant.size === 'large' ? '64px' : '48px',
              height: plant.size === 'large' ? '84px' : '68px',
              backgroundColor: '#2ba876',
              borderRadius: `${plant.size === 'large' ? '4px 4px 0 0' : '3px 3px 0 0'}`,
              boxShadow: '0 5px 14px rgba(0,0,0,0.2)',
              zIndex: 2,
            }}
          />
        ))}

        {/* Clickable employee zones with overlay cards */}
        {employees.map((employee) => {
          const pos = DESK_POSITIONS[employee.id];
          if (!pos) return null;

          const isEmployeeActive = isActive(employee.id);
          const isEmployeeSelected = isSelected(employee.id);
          const statusColor = EMPLOYEE_STATUS_COLORS[employee.status];
          const statusLabel = EMPLOYEE_STATUS_LABELS[employee.status];
          const taskCount = employee.tasks?.length || 0;
          const currentTask = employee.tasks?.[0];

          return (
            <div
              key={employee.id}
              style={{
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                cursor: 'pointer',
              }}
              onClick={() => {
                selectEmployee(employee.id);
                onSelectRoom(employee.id);
              }}
            >
              {/* Employee character */}
              <div
                style={{
                  marginBottom: '8px',
                  filter: isEmployeeActive ? 'drop-shadow(0 8px 20px rgba(249,112,31,0.35))' : 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
                  transition: 'all 0.3s ease',
                }}
              >
                <EmployeeCharacter employee={employee} size="small" />
              </div>

              {/* Glassmorphism employee card overlay */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.65)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: isEmployeeSelected
                    ? '0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 2px rgba(249,112,31,0.5)'
                    : '0 4px 16px rgba(0, 0, 0, 0.1)',
                  minWidth: '200px',
                  transition: 'all 0.2s ease',
                  transform: isEmployeeSelected ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {/* Role and status */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '6px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#2B2B3E',
                      textTransform: 'uppercase',
                      letterSpacing: '0.4px',
                    }}
                  >
                    {ROLE_DISPLAY_NAMES[employee.id] || employee.role}
                  </div>
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: statusColor,
                      animation: isEmployeeActive ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
                    }}
                  />
                </div>

                {/* Status label and task count */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '6px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: '600',
                      color: '#666',
                    }}
                  >
                    {statusLabel}
                  </span>
                  {taskCount > 0 && (
                    <span
                      style={{
                        backgroundColor: statusColor,
                        color: '#fff',
                        borderRadius: '2px',
                        padding: '2px 4px',
                        fontSize: '8px',
                        fontWeight: '600',
                      }}
                    >
                      {taskCount}
                    </span>
                  )}
                </div>

                {/* Current task */}
                <div
                  style={{
                    fontSize: '9px',
                    color: currentTask ? '#555' : '#999',
                    fontStyle: currentTask ? 'normal' : 'italic',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: '1.3',
                  }}
                >
                  {currentTask ? currentTask.title : 'Waiting for Sandy'}
                </div>
              </div>
            </div>
          );
        })}

        {/* Speech bubbles - soft glassmorphism style */}
        {SPEECH_BUBBLES.map((bubble, idx) => (
          <div
            key={`speech-${idx}`}
            style={{
              position: 'absolute',
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              transform: 'translate(-50%, -50%)',
              maxWidth: '130px',
              zIndex: 15,
              animation: 'fadeInSlide 0.5s ease-out',
            }}
          >
            <div
              style={{
                backgroundColor: bubble.color,
                border: '1px solid rgba(255,255,255,0.6)',
                borderRadius: '14px',
                padding: '9px 13px',
                fontSize: '12px',
                fontWeight: '500',
                color: '#333',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                position: 'relative',
              }}
            >
              {bubble.text}
              {/* Tail */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: '20px',
                  width: '0',
                  height: '0',
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: `6px solid ${bubble.color}`,
                }}
              />
            </div>
          </div>
        ))}

        {/* Sandy Dock - center collaboration area prominence */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.2))',
          }}
        >
          <SandyDock onAskSandy={onAskSandy || (() => {})} />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
