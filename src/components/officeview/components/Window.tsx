interface WindowProps {
  x: number;
  y: number;
}

export function Window({ x, y }: WindowProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: '80px',
        height: '60px',
        backgroundColor: 'rgba(135,206,250,0.2)',
        border: '2px solid rgba(100,160,220,0.5)',
        borderRadius: '6px',
        boxShadow: `
          inset 0 2px 8px rgba(200,230,255,0.4),
          0 4px 12px rgba(0,0,0,0.15),
          inset -2px -2px 4px rgba(0,0,0,0.08)
        `,
        background: 'linear-gradient(135deg, rgba(200,230,255,0.3) 0%, rgba(135,206,250,0.15) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Window panes */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%',
          height: '1px',
          backgroundColor: 'rgba(100,160,220,0.3)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '1px',
          height: '100%',
          backgroundColor: 'rgba(100,160,220,0.3)',
        }}
      />

      {/* Outside view (subtle gradient simulating sky/outside) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(200,230,255,0.2) 0%, rgba(135,206,250,0.1) 100%)',
        }}
      />

      {/* Reflection/shine */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: '30%',
          height: '25%',
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: '2px',
        }}
      />
    </div>
  );
}
