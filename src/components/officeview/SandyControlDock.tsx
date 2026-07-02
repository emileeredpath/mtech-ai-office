interface SandyControlDockProps {
  isThinking: boolean;
  message?: string;
}

export function SandyControlDock({ isThinking, message }: SandyControlDockProps) {
  return (
    <div className="relative flex flex-col items-center gap-2">
      {/* Message bubble */}
      {message && (
        <div
          className="px-3 py-1.5 rounded-lg text-xs whitespace-nowrap shadow-lg"
          style={{
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--accent-orange)',
            boxShadow: '0 0 8px var(--accent-orange)66',
          }}
        >
          {message}
        </div>
      )}

      {/* Sandy avatar - compact dock version */}
      <div className="relative">
        {/* Glow ring */}
        <div
          className="absolute rounded-full"
          style={{
            inset: '-8px',
            background: 'radial-gradient(circle, var(--glow-orange), transparent 70%)',
            filter: 'blur(6px)',
            animation: isThinking ? 'pulse 1s ease-in-out infinite' : 'pulse 3s ease-in-out infinite',
            opacity: 0.6,
          }}
        />

        {/* Avatar container */}
        <div className="relative w-12 h-12 rounded-full flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, var(--bg-card), rgba(249,112,31,0.1))',
          border: '2px solid var(--accent-orange)',
          boxShadow: '0 0 12px var(--accent-orange)77',
        }}>
          {/* Head */}
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'linear-gradient(160deg, #F2C79B 0%, #D89B68 100%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            position: 'relative',
          }}>
            {/* Eyes */}
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '6px',
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              backgroundColor: '#333',
            }} />
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '6px',
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              backgroundColor: '#333',
            }} />
          </div>

          {/* AI Badge */}
          <div style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-orange), #FFB067)',
            border: '1.5px solid var(--bg-primary)',
            fontSize: '8px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 0 6px var(--accent-orange)',
          }}>
            AI
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="text-xs text-center">
        <p style={{ margin: '2px 0', fontWeight: 'bold', color: 'var(--text-primary)' }}>Sandy</p>
        <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Chief of Staff</p>
      </div>
    </div>
  );
}
