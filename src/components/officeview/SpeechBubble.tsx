interface SpeechBubbleProps {
  text: string;
  x: number;
  y: number;
}

export function SpeechBubble({ text, x, y }: SpeechBubbleProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -100%)',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          border: '2px solid #333',
          borderRadius: '12px',
          padding: '8px 12px',
          fontSize: '12px',
          color: '#333',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          position: 'relative',
          animation: 'fadeInUp 0.3s ease-out',
        }}
      >
        {text}
        {/* Tail pointing down */}
        <div
          style={{
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid #333',
          }}
        />
      </div>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate(-50%, -80%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -100%);
          }
        }
      `}</style>
    </div>
  );
}
