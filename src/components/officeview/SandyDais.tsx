interface SandyDaisProps {
  isThinking: boolean;
  message?: string;
}

export function SandyDais({ isThinking, message }: SandyDaisProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center transition-colors duration-300">
      {message && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full w-56 z-30 pointer-events-none">
          <div
            className="px-3 py-2 rounded-lg text-xs text-center shadow-lg transition-colors duration-300"
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--accent-orange)',
            }}
          >
            {message}
          </div>
        </div>
      )}

      {/* Outer glow ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 140,
          height: 54,
          bottom: '16%',
          background: 'radial-gradient(ellipse at center, var(--glow-orange), transparent 75%)',
          filter: 'blur(8px)',
          animation: isThinking ? 'daisGlow 1.1s ease-in-out infinite' : 'daisGlow 3.5s ease-in-out infinite',
          opacity: 0.6,
        }}
      />

      {/* Inner glow ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 120,
          height: 46,
          bottom: '18%',
          background: 'radial-gradient(ellipse at center, rgba(249,112,31,0.35), var(--glow-purple) 60%, transparent 75%)',
          filter: 'blur(2px)',
          animation: isThinking ? 'daisGlow 1.1s ease-in-out infinite' : 'daisGlow 3.5s ease-in-out infinite',
        }}
      />

      {/* Platform circle */}
      <div
        className="absolute rounded-full transition-all duration-300"
        style={{
          width: 100,
          height: 38,
          bottom: '20%',
          border: '2px solid var(--accent-orange)',
          boxShadow: '0 0 20px var(--accent-orange), 0 0 40px rgba(249,112,31,0.3)',
        }}
      />

      {/* Sandy figure — taller, layered */}
      <div
        className="relative flex flex-col items-center"
        style={{
          marginBottom: 18,
          animation: isThinking ? 'sandySway 1s ease-in-out infinite' : 'sandySway 3s ease-in-out infinite',
          filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.6))',
        }}
      >
        {/* Head + hair */}
        <div className="relative" style={{ width: 26, height: 26 }}>
          <div className="absolute rounded-full" style={{ inset: 0, background: 'linear-gradient(160deg, #F2C79B, #D89B68)' }} />
          <div
            className="absolute rounded-t-full"
            style={{ top: -5, left: -3, right: -3, height: 16, background: 'linear-gradient(180deg, #FFB067, #F9701F)' }}
          />
        </div>

        {/* Blazer torso */}
        <div
          style={{
            width: 34,
            height: 32,
            marginTop: -2,
            background: 'linear-gradient(160deg, var(--bg-tertiary), var(--bg-secondary))',
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
            border: '1px solid var(--accent-orange)',
          }}
        />
        {/* Brain badge */}
        <div
          className="absolute rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            top: 22,
            width: 16,
            height: 16,
            background: 'linear-gradient(135deg, var(--accent-orange), #FFB067)',
            boxShadow: '0 0 8px var(--accent-orange)',
          }}
        >
          <span style={{ fontSize: 9 }}>✨</span>
        </div>
      </div>

      <p className="text-sm font-semibold transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
        Sandy
      </p>
      <p className="text-xs transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
        Chief of Staff
      </p>
    </div>
  );
}
