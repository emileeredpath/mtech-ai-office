import type { Employee } from '@/types/employee';
import { rooms } from '@/data/rooms';
import { Wall } from './components/Wall';
import { Floor } from './components/Floor';
import { Window } from './components/Window';
import { Desk } from './components/Desk';
import { SpeechBubble } from './SpeechBubble';

interface OfficeRoomProps {
  employees: Employee[];
  activeRoomIds: string[];
  sandyMessage?: string;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string | null) => void;
}

// Desk positions naturally distributed in the office room
const DESK_LAYOUT = [
  { employeeId: 'marketing-director', x: 8, y: 25 },
  { employeeId: 'website-auditor', x: 22, y: 20 },
  { employeeId: 'proposal-writer', x: 35, y: 25 },
  { employeeId: 'case-study-writer', x: 48, y: 20 },
  { employeeId: 'email-marketing-manager', x: 62, y: 25 },
  { employeeId: 'seo-ppc-manager', x: 76, y: 20 },
  { employeeId: 'social-media-manager', x: 15, y: 60 },
  { employeeId: 'funding-rewards-manager', x: 50, y: 65 },
];

const SPEECH_MESSAGES: Record<string, string> = {
  'marketing-director': 'Great work on the campaign!',
  'website-auditor': 'Found a bug to fix',
  'proposal-writer': 'Working on the deck',
  'case-study-writer': 'Case study looks good',
  'email-marketing-manager': 'Q4 launch ready',
  'seo-ppc-manager': 'Metrics are strong',
  'social-media-manager': 'Trending now!',
  'funding-rewards-manager': 'New opportunities',
};

export function OfficeRoom({
  employees,
  activeRoomIds,
  sandyMessage,
  selectedRoomId,
  onSelectRoom,
}: OfficeRoomProps) {
  const getRoom = (employeeId: string) => {
    return rooms.find((r) => r.employeeIds.includes(employeeId));
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#f5f3f0',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      {/* Room structure - walls, floor, windows */}
      <Wall position="back" />
      <Wall position="left" />
      <Wall position="right" />
      <Floor />

      {/* Windows on right wall */}
      <Window x={85} y={8} />
      <Window x={85} y={25} />
      <Window x={85} y={42} />

      {/* Ambient lighting effects */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '50%',
          height: '70%',
          background: 'radial-gradient(ellipse at top right, rgba(200,220,255,0.12) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Marketing Team sign */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          padding: '10px 24px',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '700',
          letterSpacing: '0.5px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        Marketing Team
      </div>

      {/* Desks - assembled from components */}
      {DESK_LAYOUT.map((deskPos) => {
        const employee = employees.find((e) => e.id === deskPos.employeeId);
        const room = getRoom(deskPos.employeeId);
        if (!employee) return null;

        const isSelected = selectedRoomId === room?.id;
        const isActive = room && activeRoomIds.includes(room.id);

        return (
          <div
            key={deskPos.employeeId}
            style={{
              position: 'absolute',
              left: `${deskPos.x}%`,
              top: `${deskPos.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}
          >
            {/* Speech bubble on selection */}
            {isSelected && (
              <SpeechBubble text={SPEECH_MESSAGES[deskPos.employeeId] || '...'} x={50} y={-40} />
            )}

            {/* Desk component */}
            <Desk
              employee={employee}
              isSelected={isSelected}
              isActive={isActive}
              onClick={() => onSelectRoom(isSelected ? null : room?.id || null)}
            />
          </div>
        );
      })}

      {/* Sandy status - floating in office */}
      {sandyMessage && (
        <div
          style={{
            position: 'absolute',
            bottom: '8%',
            right: '6%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '11px',
            maxWidth: '140px',
            textAlign: 'center',
            boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
            zIndex: 5,
            animation: 'sandyPulse 2s ease-in-out infinite',
          }}
        >
          {sandyMessage}
        </div>
      )}

      <style>{`
        @keyframes sandyPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
