export function OfficeBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Far background - soft gradient sky outside windows */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #f5f3f0 0%, #efe8e0 50%, #e8dcc8 100%)',
        }}
      />

      {/* Ambient light from windows */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '60%',
          height: '80%',
          background: 'radial-gradient(ellipse at top right, rgba(200,220,255,0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Wall gradient - depth and warmth */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(180deg, #f0e8d8 0%, #e5d5c8 50%, #dcc8b8 100%)',
          boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.06)',
        }}
      />

      {/* Floor - realistic wood with depth */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(135deg, #d4a574 0%, #c29564 25%, #b8845c 50%, #a67650 75%, #9a6a48 100%)',
          backgroundImage: `
            linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.03) 50%, transparent 100%),
            repeating-linear-gradient(0deg, transparent 0%, transparent 80px, rgba(0,0,0,0.02) 80px, rgba(0,0,0,0.02) 160px),
            linear-gradient(135deg, #d4a574 0%, #c29564 25%, #b8845c 50%, #a67650 75%, #9a6a48 100%)
          `,
          boxShadow: 'inset 0 -20px 50px rgba(0,0,0,0.15), inset 0 20px 60px rgba(255,255,255,0.1)',
        }}
      />

      {/* Ceiling lights - subtle warm glow */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          left: '15%',
          width: '70%',
          height: '20%',
          background: 'radial-gradient(ellipse at center, rgba(255,200,100,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Window reflections on floor */}
      <div
        style={{
          position: 'absolute',
          right: '5%',
          bottom: '20%',
          width: '15%',
          height: '30%',
          background: 'radial-gradient(ellipse at top, rgba(135,206,250,0.08) 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle vignette for depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.08) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
