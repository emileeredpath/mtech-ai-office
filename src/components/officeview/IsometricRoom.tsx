import { Room } from '@/data/rooms';
import type { Employee } from '@/types/employee';

interface IsometricRoomProps {
  room: Room;
  employees: Employee[];
  isActive: boolean;
  onSelect: () => void;
}

export function IsometricRoom({ room, employees, isActive, onSelect }: IsometricRoomProps) {
  const bgColor = {
    'Strategy Room': '#4a2c5f',
    'Board Room': '#1a3a5c',
    'Content Studio': '#3d2a1f',
    'Campaign Hub': '#2c3a1f',
    'Social Lounge': '#5c2a3f',
    'Design Atelier': '#2d3f5f',
    'Operations Centre': '#3f3c2a',
  }[room.name] || '#2a2f3f';

  return (
    <div
      onClick={onSelect}
      className="relative w-full h-full cursor-pointer transition-all duration-300 group"
      style={{ perspective: '1000px' }}
    >
      <div
        className={`relative w-full h-full rounded-lg overflow-hidden transition-all duration-300 ${
          isActive ? 'shadow-2xl' : 'hover:shadow-lg'
        }`}
        style={{
          backgroundColor: bgColor,
          outline: isActive ? '2px solid var(--accent-primary)' : 'none',
          outlineOffset: isActive ? '-2px' : '0px',
          boxShadow: isActive ? `0 0 20px var(--glow-purple), inset 0 0 30px var(--glow-purple)` : 'inset 0 0 20px rgba(0,0,0,0.3)',
          transform: 'rotateX(8deg) rotateZ(2deg)',
          border: `1px solid var(--border-color)`,
          background: `linear-gradient(135deg, ${bgColor} 0%, ${bgColor}dd 100%)`,
        }}
      >
        {/* Glass walls effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom right, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)`,
          }}
        />

        {/* Room content */}
        <div className="absolute inset-0 p-4 flex flex-col">
          {/* Top label */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold" style={{ color: '#E8ECF1' }}>
                {room.name}
              </h3>
              <p className="text-xs mt-1" style={{ color: '#A8B5C3' }}>
                {employees.length} members
              </p>
            </div>
          </div>

          {/* Desks with people - simplified layout */}
          <div className="flex-1 flex items-center justify-center gap-2">
            {/* Desk 1 */}
            {employees.length > 0 && (
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                  style={{
                    borderColor: 'var(--accent-orange)',
                    backgroundColor: 'rgba(249, 112, 31, 0.2)',
                    color: 'var(--accent-orange)',
                  }}
                >
                  {employees[0].name.charAt(0).toUpperCase()}
                </div>
              </div>
            )}

            {/* Desk 2 */}
            {employees.length > 1 && (
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                  style={{
                    borderColor: 'var(--accent-cyan)',
                    backgroundColor: 'rgba(6, 182, 212, 0.2)',
                    color: 'var(--accent-cyan)',
                  }}
                >
                  {employees[1].name.charAt(0).toUpperCase()}
                </div>
              </div>
            )}

            {/* Desk 3 */}
            {employees.length > 2 && (
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                  style={{
                    borderColor: 'var(--accent-secondary)',
                    backgroundColor: 'rgba(167, 139, 250, 0.2)',
                    color: 'var(--accent-secondary)',
                  }}
                >
                  {employees[2].name.charAt(0).toUpperCase()}
                </div>
              </div>
            )}

            {/* More indicator */}
            {employees.length > 3 && (
              <div
                className="text-xs font-semibold px-2 py-1 rounded"
                style={{ color: 'var(--text-secondary)' }}
              >
                +{employees.length - 3}
              </div>
            )}
          </div>

          {/* Bottom accent bar */}
          <div
            className="h-1 rounded-full mt-2"
            style={{
              background: `linear-gradient(to right, var(--accent-orange), var(--accent-secondary), var(--accent-cyan))`,
              opacity: 0.6,
            }}
          />
        </div>

        {/* Active indicator glow */}
        {isActive && (
          <div
            className="absolute inset-0 rounded-lg pointer-events-none animate-pulse"
            style={{
              boxShadow: `inset 0 0 30px var(--glow-purple)`,
              opacity: 0.3,
            }}
          />
        )}
      </div>
    </div>
  );
}
