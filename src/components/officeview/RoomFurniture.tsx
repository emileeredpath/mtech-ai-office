interface DeskProps {
  color: string;
  lit?: boolean;
}

export function Desk({ color, lit }: DeskProps) {
  return (
    <div className="relative" style={{ width: 34, height: 20 }}>
      {/* Desk surface (isometric top) */}
      <div
        className="absolute"
        style={{
          inset: 0,
          background: 'linear-gradient(160deg, #3a2c22, #241a14)',
          clipPath: 'polygon(10% 0%, 90% 0%, 100% 60%, 50% 100%, 0% 60%)',
        }}
      />
      {/* Monitor */}
      <div
        className="absolute rounded-sm"
        style={{
          top: -12,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 14,
          height: 9,
          background: lit ? `linear-gradient(160deg, ${color}55, ${color}15)` : '#12181f',
          border: `1px solid ${lit ? color + '77' : '#2a3542'}`,
          boxShadow: lit ? `0 0 6px ${color}66` : 'none',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{ top: -3, left: '50%', transform: 'translateX(-50%)', width: 3, height: 3, backgroundColor: '#12181f' }}
      />
    </div>
  );
}

export function PlantPot() {
  return (
    <div className="relative" style={{ width: 14, height: 18 }}>
      <div
        className="absolute rounded-full"
        style={{
          top: 0,
          left: 0,
          right: 0,
          height: 14,
          background: 'radial-gradient(circle at 35% 30%, #4ADE80, #16803d 70%)',
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: 0,
          left: 3,
          right: 3,
          height: 7,
          background: 'linear-gradient(160deg, #8a5a3a, #5c3a22)',
          clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
        }}
      />
    </div>
  );
}

export function CeilingLight({ color }: { color: string }) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2"
      style={{
        top: -6,
        width: 46,
        height: 8,
        background: `radial-gradient(ellipse at center, ${color}88, transparent 70%)`,
        filter: 'blur(2px)',
      }}
    />
  );
}
