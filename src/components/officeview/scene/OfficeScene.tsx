import React from 'react';

interface OfficeSceneProps {
  children: React.ReactNode;
}

export function OfficeScene({ children }: OfficeSceneProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#e8dcc8',
        perspective: '1200px',
        overflow: 'hidden',
      }}
    >
      {/* Background - walls and sky */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #e8dcc8 0%, #dcc8b8 50%, #d0bca8 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Right wall with windows */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '15%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.05) 0%, rgba(200,220,255,0.1) 100%)',
          borderLeft: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        {/* Windows */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              right: '12%',
              top: `${15 + i * 20}%`,
              width: '140px',
              height: '80px',
              backgroundColor: 'rgba(200,230,255,0.25)',
              border: '3px solid rgba(100,160,220,0.4)',
              borderRadius: '8px',
              boxShadow: 'inset 0 0 20px rgba(200,230,255,0.3), 0 10px 30px rgba(0,0,0,0.15)',
              background: 'linear-gradient(135deg, rgba(220,240,255,0.4) 0%, rgba(150,200,255,0.2) 100%)',
            }}
          >
            {/* Window panes */}
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: 'rgba(100,160,220,0.3)' }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', backgroundColor: 'rgba(100,160,220,0.3)' }} />
          </div>
        ))}
      </div>

      {/* Floor */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '45%',
          background: 'linear-gradient(135deg, #d4a574 0%, #c29564 20%, #b8845c 40%, #a67650 70%, #9a6a48 100%)',
          backgroundImage: `
            linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.05) 50%, transparent 100%),
            repeating-linear-gradient(0deg, transparent 0%, transparent 40px, rgba(0,0,0,0.03) 40px, rgba(0,0,0,0.03) 80px),
            repeating-linear-gradient(90deg, transparent 0%, transparent 60px, rgba(0,0,0,0.02) 60px, rgba(0,0,0,0.02) 120px),
            linear-gradient(135deg, #d4a574 0%, #c29564 20%, #b8845c 40%, #a67650 70%, #9a6a48 100%)
          `,
          boxShadow: 'inset 0 -30px 60px rgba(0,0,0,0.2), inset 0 30px 80px rgba(255,255,255,0.08)',
        }}
      />

      {/* Ceiling lights ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '-5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '50%',
          background: 'radial-gradient(ellipse at center, rgba(255,200,100,0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Marketing Team sign on back wall */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          padding: '12px 32px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '800',
          letterSpacing: '1px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
          zIndex: 5,
          pointerEvents: 'none',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
        }}
      >
        MARKETING TEAM
      </div>

      {/* Small "Working together, achieving more" tagline */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '12px',
          color: 'rgba(0,0,0,0.5)',
          fontStyle: 'italic',
          pointerEvents: 'none',
        }}
      >
        Working together, achieving more 🚀
      </div>

      {/* Central meeting area - round rug */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '280px',
          height: '180px',
          backgroundColor: 'rgba(180,140,100,0.3)',
          border: '2px solid rgba(140,100,60,0.3)',
          borderRadius: '50%',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.15), 0 20px 60px rgba(0,0,0,0.1)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Desks container with 3D positioning */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          perspective: '1200px',
        }}
      >
        {children}
      </div>

      {/* Water cooler - left side */}
      <div
        style={{
          position: 'absolute',
          left: '8%',
          bottom: '20%',
          width: '60px',
          height: '100px',
          backgroundColor: '#e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          border: '2px solid #d1d5db',
          zIndex: 3,
        }}
      >
        {/* Tank top */}
        <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', width: '35px', height: '25px', backgroundColor: '#e0f2fe', border: '2px solid #0284c7', borderRadius: '8px', boxShadow: '0 4px 12px rgba(2,132,199,0.3)' }} />
      </div>

      {/* Plant - back left */}
      <div
        style={{
          position: 'absolute',
          left: '6%',
          bottom: '18%',
          width: '70px',
          height: '120px',
          zIndex: 2,
        }}
      >
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '45px', height: '35px', backgroundColor: '#8B6F47', borderRadius: '0 0 6px 6px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }} />
        <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '80px', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', borderRadius: '50% 50% 40% 40%', opacity: 0.85, boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }} />
      </div>

      {/* Team goals whiteboard */}
      <div
        style={{
          position: 'absolute',
          left: '10%',
          top: '25%',
          width: '180px',
          height: '140px',
          backgroundColor: '#f5f5f5',
          border: '4px solid #8B5435',
          borderRadius: '4px',
          padding: '12px',
          boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
          zIndex: 5,
          fontSize: '12px',
          fontWeight: '600',
          color: '#333',
        }}
      >
        <div style={{ marginBottom: '8px', textDecoration: 'underline' }}>Team Goals</div>
        <div>✓ Increase Brand Awareness</div>
        <div>✓ Generate Quality Leads</div>
        <div>✓ Improve Conversion Rate</div>
      </div>

      {/* Clock on wall */}
      <div
        style={{
          position: 'absolute',
          right: '22%',
          top: '20%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#f5e6d3',
          border: '4px solid #8B6F47',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
          zIndex: 4,
        }}
      >
        🕐
      </div>
    </div>
  );
}
