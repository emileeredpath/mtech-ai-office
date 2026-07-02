interface KeyboardProps {
  isTyping?: boolean;
}

export function Keyboard({ isTyping = false }: KeyboardProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '70px',
        height: '20px',
        backgroundColor: '#1a1a1a',
        borderRadius: '4px',
        border: '1px solid #0a0a0a',
        boxShadow: `
          0 4px 8px rgba(0,0,0,0.3),
          inset 0 1px 2px rgba(255,255,255,0.05),
          inset 0 -1px 2px rgba(0,0,0,0.8)
        `,
        overflow: 'hidden',
      }}
    >
      {/* Key pattern */}
      <div
        style={{
          position: 'absolute',
          inset: '2px',
          backgroundImage: `
            repeating-linear-gradient(90deg,
              transparent 0%,
              transparent 4px,
              rgba(255,255,255,0.03) 4px,
              rgba(255,255,255,0.03) 5px
            ),
            repeating-linear-gradient(0deg,
              transparent 0%,
              transparent 4px,
              rgba(255,255,255,0.02) 4px,
              rgba(255,255,255,0.02) 5px
            )
          `,
        }}
      />

      {/* Typing indicator - animated keys */}
      {isTyping && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '4px',
              left: '8px',
              width: '4px',
              height: '3px',
              backgroundColor: '#555',
              borderRadius: '1px',
              animation: 'keyPress 0.3s ease-in-out infinite',
              animationDelay: '0s',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '4px',
              left: '16px',
              width: '4px',
              height: '3px',
              backgroundColor: '#555',
              borderRadius: '1px',
              animation: 'keyPress 0.3s ease-in-out infinite',
              animationDelay: '0.1s',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '4px',
              left: '24px',
              width: '4px',
              height: '3px',
              backgroundColor: '#555',
              borderRadius: '1px',
              animation: 'keyPress 0.3s ease-in-out infinite',
              animationDelay: '0.2s',
            }}
          />
        </>
      )}

      <style>{`
        @keyframes keyPress {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-1px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
