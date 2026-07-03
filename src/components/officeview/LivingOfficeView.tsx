import { useOfficeStore } from '@/store/officeStore';
import type { Employee } from '@/types/employee';
import { OfficeDesk } from './OfficeDesk';
import { SandyDock } from './SandyDock';
import { SpeechBubble } from './SpeechBubble';
import { ROLE_DISPLAY_NAMES } from './OfficeProps';

interface LivingOfficeViewProps {
  sandyThinking: boolean;
  sandyMessage?: string;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string | null) => void;
  onAskSandy?: () => void;
}

// Custom desk positions for better layout
const CUSTOM_DESK_POSITIONS: Record<string, { x: number; y: number }> = {
  'marketing-director': { x: 10, y: 20 },
  'website-auditor': { x: 50, y: 15 },
  'seo-ppc-manager': { x: 32, y: 22 },
  'email-marketing-manager': { x: 50, y: 68 },
  'proposal-writer': { x: 70, y: 24 },
  'social-media-manager': { x: 14, y: 62 },
  'case-study-writer': { x: 66, y: 62 },
  'funding-rewards-manager': { x: 86, y: 48 },
};

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
        backgroundColor: '#A68560',
        backgroundImage: `
          linear-gradient(180deg, #DCC8B8 0%, #B89570 30%, #A68560 60%, #9B7A50 100%),
          repeating-linear-gradient(90deg, #B89570 0px, #B89570 2px, #A68560 2px, #A68560 4px)
        `,
        backgroundSize: '100% 100%, 4px 100%',
        backgroundPosition: '0 0, 0 0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top wall area - warmer */}
      <div
        style={{
          height: '36px',
          backgroundColor: '#E0D4C4',
          backgroundImage: 'linear-gradient(180deg, #F0E8D8 0%, #E0D4C4 100%)',
          borderBottom: '2px solid #D0C4B4',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '20px',
          boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.5), 0 2px 6px rgba(0,0,0,0.12)',
        }}
      >
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#666' }}>
          Marketing Office
        </div>
      </div>

      {/* Main office floor */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          background: `
            linear-gradient(180deg, #B89A7F 0%, #AA8566 40%, #9B7A55 100%),
            radial-gradient(ellipse 200% 100% at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 70%)
          `,
          backgroundSize: '100% 100%, 100% 100%',
        }}
      >
        {/* Right wall with windows - warmer with glow */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '36px',
            width: '50px',
            height: 'calc(100% - 36px)',
            backgroundColor: '#E0D4C4',
            backgroundImage: 'linear-gradient(90deg, #F0E8D8 0%, #E0D4C4 100%)',
            borderLeft: '2px solid #D0C4B4',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '10px',
            padding: '10px 6px',
            boxShadow: 'inset 2px 0 6px rgba(0,0,0,0.08)',
          }}
        >
          {/* Windows */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`window-${i}`}
              style={{
                width: '38px',
                height: '28px',
                backgroundColor: '#A8D8FF',
                borderRadius: '3px',
                border: '1px solid #7AC5FF',
                boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.5), 0 2px 6px rgba(100,150,200,0.2)',
              }}
            />
          ))}
        </div>

        {/* Bottom wall/skirting with plants - warmer */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: '50px',
            height: '45px',
            backgroundColor: '#D4C8B8',
            borderTop: '2px solid #E4D8C8',
            display: 'flex',
            alignItems: 'flex-end',
            paddingBottom: '4px',
            paddingLeft: '12px',
            gap: '14px',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.12)',
          }}
        >
          {/* Corner plants */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={`plant-${i}`}
              style={{
                width: '14px',
                height: '28px',
                backgroundColor: '#2ba876',
                borderRadius: '2px 2px 0 0',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Desks positioned around the office */}
        {employees.map((employee) => {
          const pos = CUSTOM_DESK_POSITIONS[employee.id];
          if (!pos) return null;

          const isEmployeeActive = isActive(employee.id);

          return (
            <div
              key={employee.id}
              style={{
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <OfficeDesk
                employee={employee}
                isSelected={isSelected(employee.id)}
                isActive={isEmployeeActive}
                onSelect={() => {
                  selectEmployee(employee.id);
                  onSelectRoom(employee.id);
                }}
              />

              {/* Speech bubble for active employees */}
              {isEmployeeActive && employee.status === 'working' && employee.tasks?.[0] && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-28px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100px',
                    zIndex: 20,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid #999',
                      borderRadius: '6px',
                      padding: '5px 7px',
                      fontSize: '9px',
                      color: '#333',
                      fontWeight: '500',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      position: 'relative',
                    }}
                  >
                    {employee.tasks[0].title}
                    {/* Tail */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-5px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '0',
                        height: '0',
                        borderLeft: '5px solid transparent',
                        borderRight: '5px solid transparent',
                        borderTop: '5px solid #fff',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-6px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '0',
                        height: '0',
                        borderLeft: '5px solid transparent',
                        borderRight: '5px solid transparent',
                        borderTop: '5px solid #999',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Whiteboard with goals - left side */}
        <div
          style={{
            position: 'absolute',
            left: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '100px',
            height: '80px',
            backgroundColor: '#F5F1E8',
            borderRadius: '4px',
            border: '2px solid #999',
            boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          <div style={{ fontSize: '9px', fontWeight: '700', color: '#333' }}>
            Team Goals
          </div>
          <div
            style={{
              width: '70%',
              height: '1px',
              backgroundColor: '#D84C45',
            }}
          />
          <div
            style={{
              width: '70%',
              height: '1px',
              backgroundColor: '#2BA876',
            }}
          />
          <div
            style={{
              width: '70%',
              height: '1px',
              backgroundColor: '#1E5A9F',
            }}
          />
        </div>

        {/* Sandy Dock - bottom center */}
        <SandyDock onAskSandy={onAskSandy || (() => {})} />

        {/* Speech bubble when Sandy sends a message */}
        {sandyMessage && <SpeechBubble text={sandyMessage} x={50} y={35} />}

        {/* Sandy thinking indicator */}
        {sandyThinking && (
          <div
            style={{
              position: 'absolute',
              bottom: '90px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 50,
              display: 'flex',
              gap: '3px',
              alignItems: 'center',
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={`dot-${i}`}
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--text-secondary)',
                  animation: `bounce 1.4s infinite ${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          40% {
            transform: translateY(-6px);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
