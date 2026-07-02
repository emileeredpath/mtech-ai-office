interface FurnitureProps {
  x: number;
  y: number;
}

export function Plant({ x, y }: FurnitureProps) {
  return (
    <div style={{ position: 'absolute', left: `${x}%`, top: `${y}%` }}>
      <svg width="60" height="80" viewBox="0 0 60 80" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}>
        {/* Pot */}
        <path
          d="M 20 50 L 15 70 Q 15 75 20 75 L 40 75 Q 45 75 45 70 L 40 50"
          fill="#A0755E"
          stroke="#8B6F47"
          strokeWidth="1"
        />
        <ellipse cx="30" cy="50" rx="10" ry="4" fill="#B8845C" />

        {/* Soil */}
        <ellipse cx="30" cy="52" rx="9.5" ry="3.5" fill="#9a7a62" opacity="0.8" />

        {/* Leaves - left */}
        <ellipse
          cx="20"
          cy="35"
          rx="8"
          ry="20"
          fill="#22c55e"
          opacity="0.75"
          transform="rotate(-25 20 35)"
        />
        <path
          d="M 20 35 Q 18 28 20 15"
          stroke="#16a34a"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />

        {/* Leaves - center */}
        <ellipse
          cx="30"
          cy="25"
          rx="7"
          ry="22"
          fill="#22c55e"
          opacity="0.85"
        />
        <ellipse
          cx="30"
          cy="20"
          rx="5"
          ry="8"
          fill="#10b981"
          opacity="0.6"
        />

        {/* Leaves - right */}
        <ellipse
          cx="40"
          cy="35"
          rx="8"
          ry="20"
          fill="#22c55e"
          opacity="0.75"
          transform="rotate(25 40 35)"
        />
        <path
          d="M 40 35 Q 42 28 40 15"
          stroke="#16a34a"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />

        {/* Highlight on pot */}
        <ellipse cx="23" cy="62" rx="3" ry="6" fill="#fff" opacity="0.15" />
      </svg>
    </div>
  );
}

export function WaterCooler({ x, y }: FurnitureProps) {
  return (
    <div style={{ position: 'absolute', left: `${x}%`, top: `${y}%` }}>
      <svg width="45" height="70" viewBox="0 0 45 70" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}>
        {/* Base */}
        <rect x="8" y="50" width="29" height="15" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" rx="2" />

        {/* Tank */}
        <rect x="10" y="10" width="25" height="42" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" rx="4" opacity="0.8" />
        <ellipse cx="22.5" cy="10" rx="12.5" ry="6" fill="#bae6fd" />

        {/* Water inside */}
        <path d="M 12 20 Q 12 18 22.5 18 Q 33 18 33 20 L 33 48 Q 33 50 22.5 50 Q 12 50 12 48 Z" fill="#06b6d4" opacity="0.4" />

        {/* Tap */}
        <rect x="18" y="48" width="9" height="8" fill="#9ca3af" rx="1" />
        <path d="M 22.5 56 L 22.5 62 M 20 60 L 25 60" stroke="#6b7280" strokeWidth="1" />

        {/* Cup with water */}
        <path d="M 28 58 L 27 62 Q 27 65 28.5 65 L 31.5 65 Q 33 65 33 62 L 32 58" fill="#f5f3ff" stroke="#d1d5db" strokeWidth="1" />
        <path d="M 28 62 L 32 62" stroke="#0284c7" strokeWidth="1.5" opacity="0.6" />
      </svg>
    </div>
  );
}

export function Whiteboard({ x, y }: FurnitureProps) {
  return (
    <div style={{ position: 'absolute', left: `${x}%`, top: `${y}%` }}>
      <svg width="120" height="80" viewBox="0 0 120 80" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}>
        {/* Frame */}
        <rect x="4" y="4" width="112" height="72" fill="#f0f0f0" stroke="#666" strokeWidth="2" rx="2" />

        {/* Board surface */}
        <rect x="8" y="8" width="104" height="64" fill="#fefef9" stroke="#999" strokeWidth="1" rx="1" />

        {/* Title */}
        <text x="60" y="24" fontSize="14" fontWeight="bold" fill="#333" textAnchor="middle">
          Team Goals
        </text>

        {/* Goal lines */}
        <line x1="16" y1="32" x2="104" y2="32" stroke="#e0e0e0" strokeWidth="1" />
        <text x="20" y="42" fontSize="11" fill="#555">
          ✓ Q4 Launch
        </text>
        <line x1="16" y1="48" x2="104" y2="48" stroke="#e0e0e0" strokeWidth="1" />
        <text x="20" y="58" fontSize="11" fill="#555">
          ✓ Growth Plan
        </text>
        <line x1="16" y1="64" x2="104" y2="64" stroke="#e0e0e0" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function MeetingTable({ x, y }: FurnitureProps) {
  return (
    <div style={{ position: 'absolute', left: `${x}%`, top: `${y}%` }}>
      <svg width="100" height="70" viewBox="0 0 100 70" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }}>
        {/* Round table top */}
        <ellipse cx="50" cy="35" rx="35" ry="28" fill="#8B6F47" opacity="0.9" />
        <ellipse cx="50" cy="32" rx="35" ry="28" fill="#A0826D" />
        <ellipse cx="50" cy="31" rx="33" ry="26" fill="#B8945F" opacity="0.7" />

        {/* Leg shadows */}
        <ellipse cx="40" cy="55" rx="6" ry="12" fill="rgba(0,0,0,0.1)" />
        <ellipse cx="60" cy="55" rx="6" ry="12" fill="rgba(0,0,0,0.1)" />

        {/* Shine */}
        <ellipse cx="35" cy="25" rx="12" ry="8" fill="#fff" opacity="0.12" />

        {/* Chair outlines (subtle) */}
        <circle cx="50" cy="10" r="5" fill="rgba(0,0,0,0.1)" />
        <circle cx="80" cy="35" r="5" fill="rgba(0,0,0,0.1)" />
        <circle cx="50" cy="60" r="5" fill="rgba(0,0,0,0.1)" />
        <circle cx="20" cy="35" r="5" fill="rgba(0,0,0,0.1)" />
      </svg>
    </div>
  );
}

export function Windows() {
  return (
    <div style={{ position: 'absolute', top: '8%', right: '1%', width: '12%', height: '60%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            flex: 1,
            backgroundColor: 'rgba(135,206,250,0.25)',
            border: '2px solid rgba(100,160,220,0.4)',
            borderRadius: '6px',
            boxShadow: 'inset 0 2px 6px rgba(200,230,255,0.3), 0 2px 4px rgba(0,0,0,0.05)',
            background: 'linear-gradient(135deg, rgba(200,230,255,0.25) 0%, rgba(135,206,250,0.15) 100%)',
            backdropFilter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
}
