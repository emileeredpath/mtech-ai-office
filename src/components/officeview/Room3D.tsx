import type { Room } from '@/data/rooms';
import type { Employee } from '@/types/employee';

interface Room3DProps {
  room: Room;
  employees: Employee[];
  isActive: boolean;
  onSelect: () => void;
}

export function Room3D({ room, employees, isActive, onSelect }: Room3DProps) {
  // Room-specific configurations
  const roomConfigs: Record<string, { wallColor: string; floorColor: string; accentColor: string }> = {
    'Strategy Room': {
      wallColor: '#2a1f4a',
      floorColor: '#8B7355',
      accentColor: '#8B5CF6',
    },
    'Board Room': {
      wallColor: '#1a2f4a',
      floorColor: '#A0826D',
      accentColor: '#06B6D4',
    },
    'Content Studio': {
      wallColor: '#3a2f1f',
      floorColor: '#9B8B7E',
      accentColor: '#F97021',
    },
    'Campaign Hub': {
      wallColor: '#2a3a1f',
      floorColor: '#8B9B7E',
      accentColor: '#A78BFA',
    },
    'Social Lounge': {
      wallColor: '#3a2a3f',
      floorColor: '#9B8B9E',
      accentColor: '#EC4899',
    },
    'Design Atelier': {
      wallColor: '#1f2f3f',
      floorColor: '#8B8B9B',
      accentColor: '#06B6D4',
    },
    'Operations Centre': {
      wallColor: '#3f3c2a',
      floorColor: '#9B9B8B',
      accentColor: '#F9A121',
    },
  };

  const config = roomConfigs[room.name] || roomConfigs['Strategy Room'];

  return (
    <button
      onClick={onSelect}
      className="relative w-full h-full cursor-pointer transition-all duration-300"
      style={{
        perspective: '1200px',
      }}
    >
      {/* Isometric Room Container */}
      <div
        className="relative w-full h-full rounded-lg overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(8deg) rotateY(-2deg)',
        }}
      >
        {/* Floor lighting glow - warm ambient light */}
        <div
          style={{
            position: 'absolute',
            inset: '50% 5% 2% 5%',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            background: `radial-gradient(ellipse at center, rgba(255,159,64,0.2), transparent 70%)`,
            filter: 'blur(8px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Floor (isometric base) */}
        <div
          className="absolute transition-all duration-300"
          style={{
            inset: '50% 5% 2% 5%',
            background: `linear-gradient(135deg, ${config.floorColor}ff 0%, ${config.floorColor}dd 100%)`,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            boxShadow: isActive
              ? `inset 0 0 40px rgba(0,0,0,0.4), 0 10px 30px rgba(0,0,0,0.3), inset 0 0 30px rgba(255,159,64,0.15)`
              : 'inset 0 0 20px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,159,64,0.1)',
            zIndex: 2,
          }}
        >
          {/* Floor pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)`,
              opacity: 0.3,
            }}
          />

          {/* Furniture layer - desks and chairs */}
          <div style={{ position: 'absolute', inset: '15%' }}>
            {/* Desk 1 (left) */}
            <div
              style={{
                position: 'absolute',
                left: '10%',
                top: '15%',
                width: '25%',
                height: '20%',
                backgroundColor: '#5a4a3a',
                borderRadius: '2px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset -1px -1px 2px rgba(0,0,0,0.3)',
              }}
            >
              {/* Monitor on desk */}
              <div
                style={{
                  position: 'absolute',
                  right: '5%',
                  top: '30%',
                  width: '40%',
                  height: '35%',
                  backgroundColor: '#0f0f1e',
                  borderRadius: '2px',
                  boxShadow: `0 0 8px ${config.accentColor}88, inset 0 0 8px ${config.accentColor}44`,
                  border: `1px solid ${config.accentColor}66`,
                }}
              />
              {/* Chair */}
              <div
                style={{
                  position: 'absolute',
                  left: '-15%',
                  bottom: '-10%',
                  width: '20%',
                  height: '25%',
                  backgroundColor: '#4a3a2a',
                  borderRadius: '50% 50% 40% 40%',
                }}
              />
            </div>

            {/* Desk 2 (center-right) */}
            {employees.length > 1 && (
              <div
                style={{
                  position: 'absolute',
                  right: '10%',
                  top: '15%',
                  width: '25%',
                  height: '20%',
                  backgroundColor: '#5a4a3a',
                  borderRadius: '2px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset -1px -1px 2px rgba(0,0,0,0.3)',
                }}
              >
                {/* Monitor */}
                <div
                  style={{
                    position: 'absolute',
                    left: '5%',
                    top: '30%',
                    width: '40%',
                    height: '35%',
                    backgroundColor: '#0f0f1e',
                    borderRadius: '2px',
                    boxShadow: `0 0 8px ${config.accentColor}88, inset 0 0 8px ${config.accentColor}44`,
                    border: `1px solid ${config.accentColor}66`,
                  }}
                />
                {/* Chair */}
                <div
                  style={{
                    position: 'absolute',
                    right: '-15%',
                    bottom: '-10%',
                    width: '20%',
                    height: '25%',
                    backgroundColor: '#4a3a2a',
                    borderRadius: '50% 50% 40% 40%',
                  }}
                />
              </div>
            )}

            {/* Plant */}
            <div
              style={{
                position: 'absolute',
                left: '5%',
                bottom: '10%',
                width: '15%',
                height: '30%',
              }}
            >
              {/* Pot */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '15%',
                  width: '70%',
                  height: '30%',
                  backgroundColor: '#8B6F47',
                  borderRadius: '0 0 4px 4px',
                  boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.3)',
                }}
              />
              {/* Leaves */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '25%',
                  left: '10%',
                  width: '80%',
                  height: '70%',
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  borderRadius: '50% 50% 60% 40%',
                  opacity: 0.8,
                }}
              />
            </div>
          </div>

          {/* Characters/People positioning areas */}
          <div style={{ position: 'absolute', inset: '0' }}>
            {employees.slice(0, 4).map((emp, idx) => {
              const positions = [
                { left: '20%', top: '25%' },
                { left: '75%', top: '25%' },
                { left: '35%', top: '60%' },
                { left: '60%', top: '60%' },
              ];
              const pos = positions[idx] || positions[0];

              return (
                <div
                  key={emp.id}
                  style={{
                    position: 'absolute',
                    left: pos.left,
                    top: pos.top,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Simple character figure */}
                  <div
                    style={{
                      position: 'relative',
                      width: '20px',
                      height: '30px',
                    }}
                  >
                    {/* Head */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#D2B48C',
                        boxShadow: '0 0 2px rgba(0,0,0,0.3)',
                      }}
                    />
                    {/* Torso */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '10px',
                        height: '12px',
                        backgroundColor: '#3B82F6',
                        borderRadius: '1px',
                        boxShadow: '0 0 2px rgba(0,0,0,0.3)',
                      }}
                    />
                    {/* Legs */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '8px',
                        height: '10px',
                        backgroundColor: '#1F2937',
                        borderRadius: '1px',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ceiling light glow - warm accent from above */}
        <div
          style={{
            position: 'absolute',
            top: '8%',
            left: '5%',
            width: '90%',
            height: '35%',
            background: `radial-gradient(ellipse at top center, rgba(255,159,64,0.25), transparent 60%)`,
            filter: 'blur(12px)',
            zIndex: 0,
            borderRadius: '4px 4px 0 0',
          }}
        />

        {/* Back wall */}
        <div
          className="absolute transition-all duration-300"
          style={{
            top: '10%',
            left: '5%',
            width: '90%',
            height: '40%',
            background: `linear-gradient(to bottom, ${config.wallColor}ff 0%, ${config.wallColor}dd 100%)`,
            borderRadius: '4px 4px 0 0',
            boxShadow: isActive
              ? `0 0 30px ${config.accentColor}44, inset 0 0 30px rgba(0,0,0,0.3), inset 0 0 40px rgba(255,159,64,0.12)`
              : 'inset 0 0 20px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,159,64,0.08)',
            zIndex: 1,
          }}
        >
          {/* Wall details - could be whiteboard, posters, etc */}
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '10%',
              width: '80%',
              height: '60%',
              border: `2px solid ${config.accentColor}44`,
              borderRadius: '2px',
              backgroundColor: 'rgba(255,255,255,0.05)',
            }}
          />

          {/* Ceiling lights (3 warm lights) */}
          <div
            style={{
              position: 'absolute',
              top: '5%',
              left: '15%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#FFB346',
              boxShadow: '0 0 12px rgba(255,179,70,0.6)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#FFB346',
              boxShadow: '0 0 12px rgba(255,179,70,0.6)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '5%',
              right: '15%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#FFB346',
              boxShadow: '0 0 12px rgba(255,179,70,0.6)',
            }}
          />
        </div>

        {/* Top label/header */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-1 px-3 py-1 rounded text-xs font-bold transition-all duration-300 z-10"
          style={{
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: `1px solid ${config.accentColor}77`,
            textShadow: `0 0 2px ${config.accentColor}44`,
          }}
        >
          {room.name}
          <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {employees.length} {employees.length === 1 ? 'person' : 'people'}
          </span>
        </div>

        {/* Glow effect when active */}
        {isActive && (
          <div
            className="absolute inset-0 rounded-lg pointer-events-none animate-pulse"
            style={{
              boxShadow: `inset 0 0 40px ${config.accentColor}33, 0 0 30px ${config.accentColor}22`,
              opacity: 0.6,
            }}
          />
        )}
      </div>
    </button>
  );
}
