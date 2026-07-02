import type { Employee } from '@/types/employee';
import { rooms } from '@/data/rooms';
import { OfficeBackground } from './OfficeBackground';
import { OfficeDesk } from './OfficeDesk';
import { SpeechBubble } from './SpeechBubble';
import { Plant, WaterCooler, Whiteboard, MeetingTable, Windows } from './OfficeFurniture';

interface OfficeFloorProps {
  employees: Employee[];
  activeRoomIds: string[];
  sandyThinking: boolean;
  sandyMessage?: string;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string | null) => void;
}

// Department groupings - organized by function with multiple people
const DEPARTMENT_CLUSTERS = [
  {
    name: 'Strategy',
    position: { x: 6, y: 20 },
    employees: ['marketing-director'],
  },
  {
    name: 'Digital',
    position: { x: 20, y: 18 },
    employees: ['website-auditor'],
  },
  {
    name: 'Content',
    position: { x: 35, y: 22 },
    employees: ['proposal-writer', 'case-study-writer'],
  },
  {
    name: 'Growth',
    position: { x: 55, y: 20 },
    employees: ['email-marketing-manager', 'seo-ppc-manager'],
  },
  {
    name: 'Social',
    position: { x: 75, y: 25 },
    employees: ['social-media-manager'],
  },
  {
    name: 'Funding',
    position: { x: 12, y: 65 },
    employees: ['funding-rewards-manager'],
  },
];

const SPEECH_BUBBLES: Record<string, string> = {
  'marketing-director': 'Great work this week!',
  'website-auditor': 'Found a bug to fix',
  'proposal-writer': 'Finalizing the deck',
  'case-study-writer': 'Case study ready',
  'email-marketing-manager': 'Launching Q4 campaign',
  'seo-ppc-manager': 'Metrics are strong',
  'social-media-manager': 'Trending now!',
  'funding-rewards-manager': 'New opportunities',
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

  const getDesksInCluster = (employeeIds: string[]) => {
    return employeeIds.map((id, idx) => ({
      employeeId: id,
      offsetX: idx * 25,
      offsetY: idx * 8,
    }));
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
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      {/* Office background with depth */}
      <OfficeBackground />

      {/* Office furniture - fixed positions */}
      <Windows />
      <Whiteboard x={4} y={8} />
      <Plant x={78} y={12} />
      <WaterCooler x={10} y={72} />
      <Plant x={88} y={68} />
      <MeetingTable x={40} y={50} />

      {/* Marketing Team sign */}
      <div
        style={{
          position: 'absolute',
          top: '6%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          padding: '8px 20px',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '700',
          letterSpacing: '0.5px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      >
        Marketing Team
      </div>

      {/* Sandy - Chief of Staff (central floating area) */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          right: '6%',
          zIndex: 8,
          fontSize: '11px',
          color: '#fff',
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '6px 10px',
          borderRadius: '6px',
          maxWidth: '120px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        {sandyMessage || '🤖 Sandy Ready'}
      </div>

      {/* Department Clusters with Desks */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {DEPARTMENT_CLUSTERS.map((cluster) => {
          const desks = getDesksInCluster(cluster.employees);

          return (
            <div key={cluster.name} style={{ position: 'relative', width: '100%', height: '100%' }}>
              {/* Department label (subtle) */}
              <div
                style={{
                  position: 'absolute',
                  left: `${cluster.position.x}%`,
                  top: `${cluster.position.y - 8}%`,
                  fontSize: '9px',
                  fontWeight: '600',
                  color: 'rgba(0,0,0,0.3)',
                  pointerEvents: 'none',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              >
                {cluster.name}
              </div>

              {/* Desks in cluster */}
              {desks.map((desk) => {
                const employee = employees.find((e) => e.id === desk.employeeId);
                const room = getRoom(desk.employeeId);
                if (!employee) return null;

                const isSelected = selectedRoomId === room?.id;
                const isActive = room && activeRoomIds.includes(room.id);
                const deskX = cluster.position.x + desk.offsetX / 100;
                const deskY = cluster.position.y + desk.offsetY / 100;

                return (
                  <div key={desk.employeeId} style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {/* Speech bubble on selection */}
                    {isSelected && (
                      <SpeechBubble
                        text={SPEECH_BUBBLES[desk.employeeId] || 'Working...'}
                        x={deskX}
                        y={deskY - 8}
                      />
                    )}

                    {/* Desk positioned in cluster */}
                    <div
                      style={{
                        position: 'absolute',
                        left: `${deskX}%`,
                        top: `${deskY}%`,
                        cursor: 'pointer',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <OfficeDesk
                        employee={employee}
                        isSelected={isSelected}
                        isActive={isActive}
                        onClick={() => onSelectRoom(isSelected ? null : room?.id || null)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
