export function Floor() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '55%',
        background: 'linear-gradient(135deg, #d4a574 0%, #c29564 20%, #b8845c 40%, #a67650 70%, #9a6a48 100%)',
        backgroundImage: `
          linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.05) 50%, transparent 100%),
          repeating-linear-gradient(0deg, transparent 0%, transparent 40px, rgba(0,0,0,0.03) 40px, rgba(0,0,0,0.03) 80px),
          repeating-linear-gradient(90deg, transparent 0%, transparent 60px, rgba(0,0,0,0.02) 60px, rgba(0,0,0,0.02) 120px),
          linear-gradient(135deg, #d4a574 0%, #c29564 20%, #b8845c 40%, #a67650 70%, #9a6a48 100%)
        `,
        boxShadow: 'inset 0 -30px 60px rgba(0,0,0,0.2), inset 0 30px 80px rgba(255,255,255,0.08)',
        zIndex: 1,
      }}
    >
      {/* Floor texture detail */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)
          `,
          opacity: 0.5,
        }}
      />
    </div>
  );
}
