interface MonitorProps {
  accentColor: string;
  isActive?: boolean;
}

export function Monitor({ accentColor, isActive = false }: MonitorProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '55px',
        height: '42px',
      }}
    >
      {/* Monitor frame */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '55px',
          height: '42px',
          backgroundColor: '#1a1a1a',
          borderRadius: '4px',
          border: `2px solid ${accentColor}`,
          boxShadow: `
            0 6px 12px rgba(0,0,0,0.3),
            0 0 16px ${accentColor}77,
            inset 0 0 8px ${accentColor}33,
            inset -1px -1px 2px rgba(0,0,0,0.5)
          `,
          overflow: 'hidden',
        }}
      >
        {/* Screen */}
        <div
          style={{
            position: 'absolute',
            inset: '2px',
            backgroundColor: '#0f0f1e',
            borderRadius: '2px',
            background: `linear-gradient(135deg, rgba(${
              accentColor === '#F97021'
                ? '249,112,31'
                : accentColor === '#8B5CF6'
                  ? '139,92,246'
                  : '34,197,153'
            },0.2) 0%, rgba(0,0,0,0.9) 100%)`,
            boxShadow: `inset 0 0 6px ${accentColor}44`,
          }}
        />

        {/* Cursor blink animation */}
        {isActive && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '2px',
              height: '12px',
              backgroundColor: accentColor,
              opacity: 0.8,
              animation: 'monitorCursor 1s ease-in-out infinite',
            }}
          />
        )}
      </div>

      {/* Monitor stand */}
      <div
        style={{
          position: 'absolute',
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '20px',
          height: '8px',
          backgroundColor: '#2c2c2c',
          borderRadius: '0 0 2px 2px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      />

      {/* Monitor base/foot */}
      <div
        style={{
          position: 'absolute',
          bottom: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '28px',
          height: '4px',
          backgroundColor: '#1a1a1a',
          borderRadius: '2px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
        }}
      />

      <style>{`
        @keyframes monitorCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
