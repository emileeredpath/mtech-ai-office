import type { Employee } from '@/types/employee';
import { rooms } from '@/data/rooms';
import { OfficeScene } from './scene/OfficeScene';
import { Desk3D } from './scene/Desk3D';
import { SpeechBubble } from './SpeechBubble';

interface OfficeFloorProps {
  employees: Employee[];
  activeRoomIds: string[];
  sandyThinking: boolean;
  sandyMessage?: string;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string | null) => void;
}

// Desk positions in 3D office space
const DESK_POSITIONS = [
  { employeeId: 'marketing-director', x: 15, z: 20 },
  { employeeId: 'seo-ppc-manager', x: 35, z: 20 },
  { employeeId: 'website-auditor', x: 55, z: 20 },
  { employeeId: 'social-media-manager', x: 12, z: 60 },
  { employeeId: 'proposal-writer', x: 40, z: 60 },
  { employeeId: 'case-study-writer', x: 68, z: 60 },
  { employeeId: 'email-marketing-manager', x: 25, z: 75 },
  { employeeId: 'funding-rewards-manager', x: 55, z: 75 },
];

const SPEECH_MESSAGES: Record<string, string> = {
  'marketing-director': 'Great work on the social campaign!',
  'website-auditor': 'Found 15 issues checking now',
  'proposal-writer': 'Working on client deck',
  'case-study-writer': 'Interview with client @ 2pm',
  'email-marketing-manager': 'New Campaign Build',
  'seo-ppc-manager': 'Keyword research',
  'social-media-manager': 'Scheduled posts for this week!',
  'funding-rewards-manager': 'Building our new nurture sequence',
};

export function OfficeFloor({
  employees,
  activeRoomIds,
  sandyThinking,
  sandyMessage,
  selectedRoomId,
  onSelectRoom,
}: OfficeFloorProps) {
  const getRoom = (employeeId: string) => {
    return rooms.find((r) => r.employeeIds.includes(employeeId));
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Office scene container with 3D perspective */}
      <OfficeScene>
        {/* Desks in the office */}
        {DESK_POSITIONS.map((deskPos) => {
          const employee = employees.find((e) => e.id === deskPos.employeeId);
          const room = getRoom(deskPos.employeeId);
          if (!employee) return null;

          const isSelected = selectedRoomId === room?.id;
          const isActive = room && activeRoomIds.includes(room.id);

          return (
            <div key={deskPos.employeeId} style={{ position: 'relative' }}>
              {/* Speech bubble */}
              {isSelected && (
                <SpeechBubble
                  text={SPEECH_MESSAGES[deskPos.employeeId] || '...'}
                  x={50}
                  y={-60}
                />
              )}

              {/* 3D Desk */}
              <Desk3D
                employee={employee}
                x={deskPos.x}
                z={deskPos.z}
                isSelected={isSelected}
                isActive={isActive}
                onClick={() => onSelectRoom(isSelected ? null : room?.id || null)}
              />
            </div>
          );
        })}
      </OfficeScene>

      {/* Sandy status message */}
      {sandyMessage && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'rgba(0,0,0,0.85)',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '12px',
            maxWidth: '160px',
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            zIndex: 100,
            animation: 'fadeInUp 0.4s ease-out',
          }}
        >
          🤖 {sandyMessage}
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
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
