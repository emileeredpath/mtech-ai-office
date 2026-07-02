import type { Employee } from '@/types/employee';
import { rooms } from '@/data/rooms';
import { OfficeDesk } from './OfficeDesk';
import { SpeechBubble } from './SpeechBubble';

interface OfficeFloorProps {
  employees: Employee[];
  activeRoomIds: string[];
  sandyThinking: boolean;
  sandyMessage?: string;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string | null) => void;
}

const DESK_POSITIONS = [
  { x: 8, y: 25, employeeId: 'marketing-director' },
  { x: 22, y: 20, employeeId: 'website-auditor' },
  { x: 36, y: 25, employeeId: 'proposal-writer' },
  { x: 50, y: 20, employeeId: 'case-study-writer' },
  { x: 64, y: 25, employeeId: 'email-marketing-manager' },
  { x: 78, y: 20, employeeId: 'seo-ppc-manager' },
  { x: 8, y: 65, employeeId: 'social-media-manager' },
  { x: 36, y: 70, employeeId: 'funding-rewards-manager' },
];

const SPEECH_BUBBLES: Record<string, string> = {
  'marketing-director': 'Great work on the campaign',
  'website-auditor': 'Found issues to review',
  'proposal-writer': 'Working on client deck',
  'case-study-writer': 'Finalizing case study',
  'email-marketing-manager': 'Launching Q4 campaign',
  'seo-ppc-manager': 'Keyword research ongoing',
  'social-media-manager': 'Trending topic alert',
  'funding-rewards-manager': 'Processing new leads',
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
    <div
      className="w-full h-full relative rounded-lg overflow-hidden"
      style={{
        backgroundColor: '#E8DCC8',
        background: 'linear-gradient(180deg, #F0E8D8 0%, #E8DCC8 100%)',
        backgroundImage: `
          linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.05) 50%, transparent 100%),
          linear-gradient(180deg, #F0E8D8 0%, #E8DCC8 100%)
        `,
      }}
    >
      {/* Floor texture/perspective */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.02) 40px, rgba(0,0,0,0.02) 80px),
            repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,0,0,0.01) 40px, rgba(0,0,0,0.01) 80px)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Top back wall */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: 'linear-gradient(180deg, #E5D5C0 0%, #D9CCC0 100%)',
          boxShadow: 'inset 0 20px 40px rgba(0,0,0,0.08)',
        }}
      />

      {/* Windows on right side */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '2%',
          width: '12%',
          height: '60%',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={`window-${i}`}
            style={{
              flex: 1,
              backgroundColor: 'rgba(135,206,250,0.4)',
              border: '2px solid rgba(135,206,250,0.6)',
              borderRadius: '4px',
              boxShadow: 'inset 0 0 12px rgba(135,206,250,0.3), 0 2px 6px rgba(0,0,0,0.1)',
              background: 'linear-gradient(135deg, rgba(200,230,255,0.3), rgba(135,206,250,0.2))',
            }}
          />
        ))}
      </div>

      {/* Whiteboard with team goals */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          left: '4%',
          width: '22%',
          height: '28%',
          backgroundColor: '#F5F5F5',
          border: '3px solid #8B5435',
          borderRadius: '2px',
          padding: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
          Team Goals
        </div>
        <div style={{ fontSize: '10px', color: '#555', lineHeight: '1.6' }}>
          <div>✓ Q4 Campaign</div>
          <div>✓ Website Update</div>
          <div>✓ Lead Growth</div>
        </div>
      </div>

      {/* Marketing Team wall sign */}
      <div
        style={{
          position: 'absolute',
          top: '42%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#2c2c2c',
          color: '#fff',
          padding: '8px 20px',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      >
        Marketing Team
      </div>

      {/* Round rug in center */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '140px',
          backgroundColor: 'rgba(220,180,140,0.4)',
          border: '2px solid rgba(160,120,90,0.3)',
          borderRadius: '50%',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Central meeting area - placeholder */}
      <div
        style={{
          position: 'absolute',
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60px',
          height: '50px',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        {/* Small round table */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40px',
            height: '40px',
            backgroundColor: '#8B6F47',
            borderRadius: '50%',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            border: '1px solid rgba(0,0,0,0.2)',
          }}
        />
      </div>

      {/* Plant - back left */}
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '3%',
          width: '50px',
          height: '70px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '35px',
            height: '25px',
            backgroundColor: '#8B6F47',
            borderRadius: '0 0 3px 3px',
            border: '1px solid #6B5435',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '45px',
            height: '55px',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            borderRadius: '50% 50% 35% 35%',
            opacity: 0.8,
          }}
        />
      </div>

      {/* Plant - back right */}
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          right: '3%',
          width: '50px',
          height: '70px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '35px',
            height: '25px',
            backgroundColor: '#8B6F47',
            borderRadius: '0 0 3px 3px',
            border: '1px solid #6B5435',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '45px',
            height: '55px',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            borderRadius: '50% 50% 35% 35%',
            opacity: 0.8,
          }}
        />
      </div>

      {/* Water cooler - back left lower */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '14%',
          width: '30px',
          height: '45px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '20px',
            height: '15px',
            backgroundColor: 'rgba(135,206,250,0.6)',
            borderRadius: '50%',
            border: '1px solid rgba(100,180,220,0.8)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '24px',
            height: '28px',
            backgroundColor: '#E8DCC8',
            border: '2px solid #999',
            borderRadius: '2px',
          }}
        />
      </div>

      {/* Desks */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {DESK_POSITIONS.map((pos) => {
          const employee = employees.find((e) => e.id === pos.employeeId);
          const room = getRoom(pos.employeeId);
          if (!employee) return null;

          const isSelected = selectedRoomId === room?.id;
          const isActive = room && activeRoomIds.includes(room.id);

          return (
            <div key={pos.employeeId} style={{ position: 'relative', width: '100%', height: '100%' }}>
              {/* Speech bubble */}
              {isSelected && (
                <SpeechBubble
                  text={SPEECH_BUBBLES[pos.employeeId] || ''}
                  x={pos.x}
                  y={pos.y - 15}
                />
              )}

              {/* Desk */}
              <div
                style={{
                  position: 'absolute',
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  cursor: 'pointer',
                }}
                onClick={() => onSelectRoom(isSelected ? null : room?.id || null)}
              >
                <OfficeDesk
                  employee={employee}
                  isSelected={isSelected}
                  isActive={isActive}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Sandy control overlay - top right */}
      <div
        style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          zIndex: 20,
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '11px',
          color: '#fff',
          maxWidth: '150px',
          textAlign: 'center',
        }}
      >
        {sandyMessage ? (
          <div>{sandyMessage}</div>
        ) : (
          <div style={{ color: 'rgba(255,255,255,0.7)' }}>Sandy Ready</div>
        )}
      </div>
    </div>
  );
}
