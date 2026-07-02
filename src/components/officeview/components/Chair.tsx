export function Chair() {
  return (
    <div style={{ position: 'relative', width: '45px', height: '50px' }}>
      {/* Chair back - high back office chair */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '22px',
          height: '32px',
          backgroundColor: '#2c2c2c',
          borderRadius: '8px 8px 0 0',
          border: '1px solid #1a1a1a',
          boxShadow: `
            0 4px 8px rgba(0,0,0,0.3),
            inset 0 1px 2px rgba(255,255,255,0.1),
            inset -2px -2px 4px rgba(0,0,0,0.3)
          `,
        }}
      >
        {/* Back rest padding detail */}
        <div
          style={{
            position: 'absolute',
            inset: '2px',
            borderRadius: '6px 6px 0 0',
            background: 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
          }}
        />
      </div>

      {/* Seat cushion */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '28px',
          height: '14px',
          backgroundColor: '#333',
          borderRadius: '4px',
          boxShadow: `
            0 4px 8px rgba(0,0,0,0.4),
            inset 0 2px 4px rgba(255,255,255,0.1),
            inset -2px -2px 4px rgba(0,0,0,0.4)
          `,
        }}
      >
        {/* Seat padding texture */}
        <div
          style={{
            position: 'absolute',
            inset: '1px',
            borderRadius: '3px',
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Base - 5 wheels */}
      <div
        style={{
          position: 'absolute',
          bottom: '2px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '24px',
          height: '4px',
          backgroundColor: '#1a1a1a',
          borderRadius: '2px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      />

      {/* Caster wheels (simplified) */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            bottom: '0px',
            left: `${8 + i * 4.8}px`,
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            backgroundColor: '#555',
            boxShadow: '0 1px 2px rgba(0,0,0,0.4)',
          }}
        />
      ))}

      {/* Gas cylinder (pole) - subtle */}
      <div
        style={{
          position: 'absolute',
          bottom: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '2px',
          height: '8px',
          backgroundColor: '#444',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      />
    </div>
  );
}
