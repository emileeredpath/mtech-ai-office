interface SandyDaisProps {
  isThinking: boolean;
  message?: string;
}

export function SandyDais({ isThinking, message }: SandyDaisProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center transition-colors duration-300">
      {message && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
          <div
            className="px-4 py-2 rounded-lg text-xs text-center shadow-lg transition-colors duration-300 whitespace-nowrap"
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--accent-orange)',
              boxShadow: `0 0 12px var(--accent-orange)66`,
            }}
          >
            {message}
          </div>
        </div>
      )}

      {/* Large outer glow ring - wider and more prominent */}
      <div
        className="absolute rounded-full"
        style={{
          width: 180,
          height: 70,
          bottom: '14%',
          background: 'radial-gradient(ellipse at center, var(--glow-orange), transparent 70%)',
          filter: 'blur(12px)',
          animation: isThinking ? 'daisGlow 1.1s ease-in-out infinite' : 'daisGlow 3.5s ease-in-out infinite',
          opacity: 0.7,
        }}
      />

      {/* Purple accent glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: 160,
          height: 60,
          bottom: '15%',
          background: 'radial-gradient(ellipse at center, var(--glow-purple), transparent 65%)',
          filter: 'blur(8px)',
          animation: isThinking ? 'daisGlow 1.1s ease-in-out infinite' : 'daisGlow 3.5s ease-in-out infinite',
          opacity: 0.5,
        }}
      />

      {/* Main platform - larger and more visible */}
      <div
        className="absolute rounded-full transition-all duration-300"
        style={{
          width: 140,
          height: 50,
          bottom: '18%',
          border: '3px solid var(--accent-orange)',
          boxShadow: `
            0 0 20px var(--accent-orange),
            0 0 40px rgba(249,112,31,0.4),
            inset 0 0 15px rgba(249,112,31,0.2),
            0 8px 20px rgba(0,0,0,0.3)
          `,
          background: 'radial-gradient(ellipse at center, rgba(249,112,31,0.15), transparent 70%)',
        }}
      />

      {/* Sandy figure - larger, more detailed */}
      <div
        className="relative flex flex-col items-center"
        style={{
          marginBottom: 0,
          animation: isThinking ? 'sandySway 1s ease-in-out infinite' : 'sandySway 3s ease-in-out infinite',
          filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.5))',
          transform: 'scale(1.2)',
        }}
      >
        {/* Hair */}
        <div
          className="absolute rounded-t-full transition-all duration-300"
          style={{
            top: -8,
            width: 38,
            height: 20,
            background: 'linear-gradient(180deg, #FFB067 0%, #F97021 100%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        />

        {/* Head */}
        <div
          className="relative rounded-full transition-all duration-300"
          style={{
            width: 32,
            height: 32,
            background: 'linear-gradient(160deg, #F2C79B 0%, #E8B896 50%, #D89B68 100%)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {/* Eyes highlight */}
          <div
            style={{
              position: 'absolute',
              top: '35%',
              left: '30%',
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: '#333',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '35%',
              right: '30%',
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: '#333',
            }}
          />
        </div>

        {/* Jacket/Blazer - more pronounced */}
        <div
          className="transition-all duration-300 relative"
          style={{
            width: 42,
            height: 38,
            marginTop: -4,
            background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
            clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
            boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.3)',
            border: '1px solid var(--accent-orange)',
          }}
        >
          {/* Shirt/tie accent */}
          <div
            style={{
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 8,
              height: 12,
              background: 'linear-gradient(180deg, var(--accent-orange), #F97021)',
              borderRadius: '1px',
            }}
          />
        </div>

        {/* AI Badge */}
        <div
          className="absolute rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            top: '16px',
            width: 20,
            height: 20,
            background: 'linear-gradient(135deg, var(--accent-orange), #FFB067)',
            boxShadow: `0 0 12px var(--accent-orange), 0 0 24px rgba(249,112,31,0.4)`,
            border: '2px solid rgba(255,255,255,0.3)',
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 'bold' }}>AI</span>
        </div>

        {/* Arms (simple lines) */}
        <div
          style={{
            position: 'absolute',
            top: '28px',
            left: '-15px',
            width: 12,
            height: 4,
            backgroundColor: '#F2C79B',
            borderRadius: '2px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '28px',
            right: '-15px',
            width: 12,
            height: 4,
            backgroundColor: '#F2C79B',
            borderRadius: '2px',
          }}
        />
      </div>

      {/* Name plate */}
      <div style={{ marginTop: 12 }}>
        <p className="text-base font-bold transition-colors duration-300" style={{ color: 'var(--text-primary)', margin: '0 0 2px 0' }}>
          Sandy
        </p>
        <p className="text-xs transition-colors duration-300" style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Chief of Staff
        </p>
      </div>

      {/* Status indicator - online */}
      <div
        className="absolute rounded-full transition-all duration-300"
        style={{
          bottom: '5%',
          right: '20%',
          width: 8,
          height: 8,
          backgroundColor: '#10B981',
          boxShadow: '0 0 6px #10B981',
        }}
      />
    </div>
  );
}
