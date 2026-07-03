import type { Employee } from '@/types/employee';
import { EmployeeCharacter } from './EmployeeCharacter';
import { DeskTaskCard } from './DeskTaskCard';
import { ROLE_DISPLAY_NAMES } from './OfficeProps';

interface OfficeDeskProps {
  employee: Employee;
  isSelected: boolean;
  isActive: boolean;
  onSelect: () => void;
}

export function OfficeDesk({ employee, isSelected, isActive, onSelect }: OfficeDeskProps) {
  const roleLabel = ROLE_DISPLAY_NAMES[employee.id] || employee.role;

  return (
    <div
      onClick={onSelect}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}
    >
      {/* Deep shadow under desk */}
      <div
        style={{
          position: 'absolute',
          bottom: '-14px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '220px',
          height: '16px',
          background: `
            radial-gradient(ellipse 220px 16px at center,
              rgba(0,0,0,0.5) 0%,
              rgba(0,0,0,0.2) 50%,
              transparent 100%)
          `,
          borderRadius: '50%',
          zIndex: 0,
          filter: 'blur(2px)',
        }}
      />

      {/* Desk workstation - premium quality */}
      <div
        style={{
          position: 'relative',
          width: '200px',
          height: '148px',
          backgroundColor: '#E8C8A0',
          backgroundImage: `
            linear-gradient(100deg,
              #F5D9B8 0%,
              #F0CEA4 5%,
              #E8C4A0 12%,
              #DDB890 25%,
              #CFA878 40%,
              #BF9570 58%,
              #AD8560 72%,
              #9B7350 88%,
              #8B6340 100%),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 2px,
              rgba(0,0,0,0.03) 2px,
              rgba(0,0,0,0.03) 4px),
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 4px,
              rgba(139,111,78,0.02) 4px,
              rgba(139,111,78,0.02) 8px),
            linear-gradient(135deg,
              rgba(255,255,255,0.2) 0%,
              transparent 50%,
              rgba(0,0,0,0.25) 100%)
          `,
          borderRadius: '1px',
          border: '1px solid rgba(0,0,0,0.5)',
          boxShadow: `
            ${isSelected ? '0 0 32px rgba(255, 200, 150, 1), ' : ''}
            0 20px 56px rgba(0,0,0,0.56),
            inset 0 1px 8px rgba(255,255,255,0.4),
            inset 0 -4px 16px rgba(0,0,0,0.4)
          `,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'visible',
          zIndex: 1,
        }}
      >
        {/* Monitor section */}
        <div style={{ display: 'flex', justifyContent: 'center', height: '70px', position: 'relative', marginBottom: '6px' }}>
          {/* Monitor stand - premium wood */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              width: '76px',
              height: '18px',
              backgroundColor: '#6B4423',
              backgroundImage: `
                linear-gradient(115deg,
                  #8B5A2B 0%,
                  #7A4F22 15%,
                  #6B4423 30%,
                  #5C3A1A 50%,
                  #6B4423 70%,
                  #7A4F22 85%,
                  #8B5A2B 100%),
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  transparent 1.5px,
                  rgba(0,0,0,0.12) 1.5px,
                  rgba(0,0,0,0.12) 3px),
                repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  transparent 2px,
                  rgba(139,111,78,0.08) 2px,
                  rgba(139,111,78,0.08) 4px)
              `,
              borderRadius: '2px 2px 7px 7px',
              boxShadow: `
                0 7px 16px rgba(0,0,0,0.58),
                inset 0 1px 4px rgba(255,255,255,0.18),
                inset 0 -3px 8px rgba(0,0,0,0.45)
              `,
              border: '1.2px solid rgba(0,0,0,0.7)',
            }}
          />
          {/* Monitor bezel - aluminum */}
          <div
            style={{
              position: 'absolute',
              top: '2px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '72px',
              height: '56px',
              backgroundColor: '#2a2a2a',
              borderRadius: '3px',
              border: `5px solid #3a3a3a`,
              boxShadow: `
                0 9px 20px rgba(0,0,0,0.65),
                inset 0 1px 3px rgba(255,255,255,0.08),
                inset 0 -2px 5px rgba(0,0,0,0.5)
              `,
            }}
          />
          {/* Monitor screen display */}
          <div
            style={{
              position: 'absolute',
              top: '7px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '64px',
              height: '48px',
              backgroundColor: '#0a0a0a',
              borderRadius: '1px',
              backgroundImage: `
                linear-gradient(135deg,
                  ${employee.accentColor}18 0%,
                  transparent 45%,
                  rgba(0,0,0,0.6) 100%)
              `,
              boxShadow: `
                0 0 18px ${employee.accentColor}88,
                inset 0 0 12px rgba(0,0,0,0.8)
              `,
            }}
          />
        </div>

        {/* Keyboard and accessories */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
            height: '30px',
            gap: '9px',
            marginBottom: '6px',
          }}
        >
          {/* Keyboard - premium mechanical */}
          <div
            style={{
              flex: 1,
              height: '18px',
              backgroundColor: '#2a2a2a',
              borderRadius: '4px',
              border: '1px solid #1a1a1a',
              backgroundImage: `
                linear-gradient(180deg,
                  #3a3a3a 0%,
                  #2a2a2a 50%,
                  #1a1a1a 100%),
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  transparent 4px,
                  rgba(255,255,255,0.04) 4px,
                  rgba(255,255,255,0.04) 5px)
              `,
              boxShadow: `
                inset 0 2px 5px rgba(255,255,255,0.08),
                inset 0 -2px 4px rgba(0,0,0,0.8),
                0 6px 10px rgba(0,0,0,0.6)
              `,
            }}
          />

          {/* Mug - ceramic */}
          <div
            style={{
              position: 'relative',
              width: '26px',
              height: '28px',
              backgroundColor: '#D4A574',
              borderRadius: '3px 3px 6px 6px',
              border: '1.3px solid #B89060',
              backgroundImage: `
                linear-gradient(135deg,
                  rgba(255,255,255,0.25) 0%,
                  transparent 40%,
                  rgba(0,0,0,0.2) 100%)
              `,
              boxShadow: `
                0 7px 12px rgba(0,0,0,0.55),
                inset 0 1px 3px rgba(255,255,255,0.28),
                inset -4px 0 5px rgba(255,255,255,0.16),
                inset 0 -3px 6px rgba(0,0,0,0.35)
              `,
            }}
          >
            {/* Mug handle */}
            <div
              style={{
                position: 'absolute',
                right: '-10px',
                top: '5px',
                width: '9px',
                height: '16px',
                border: '1.3px solid #B89060',
                borderLeft: 'none',
                borderRadius: '0 7px 7px 0',
                backgroundColor: 'transparent',
                boxShadow: 'inset -1px 0 2px rgba(255,255,255,0.2)',
              }}
            />
          </div>

          {/* Plant pot - ceramic */}
          <div
            style={{
              position: 'relative',
              width: '24px',
              height: '28px',
              backgroundColor: '#C9A878',
              borderRadius: '3px 3px 6px 6px',
              border: '1.3px solid #A88860',
              backgroundImage: `
                linear-gradient(135deg,
                  rgba(255,255,255,0.2) 0%,
                  transparent 40%,
                  rgba(0,0,0,0.25) 100%)
              `,
              boxShadow: `
                0 7px 12px rgba(0,0,0,0.52),
                inset 0 1px 3px rgba(255,255,255,0.16),
                inset 0 -2px 5px rgba(0,0,0,0.4)
              `,
            }}
          >
            {/* Plant leaves */}
            <div
              style={{
                position: 'absolute',
                top: '-18px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '16px',
                height: '18px',
                backgroundColor: '#2FA86A',
                borderRadius: '50% 50% 2px 2px',
                backgroundImage: `
                  linear-gradient(135deg,
                    rgba(255,255,255,0.25) 0%,
                    transparent 50%,
                    rgba(0,0,0,0.15) 100%)
                `,
                boxShadow: `
                  0 5px 8px rgba(0,0,0,0.45),
                  inset 0 1px 2px rgba(255,255,255,0.32)
                `,
              }}
            />
          </div>
        </div>

        {/* Desk surface - polished wood */}
        <div
          style={{
            width: '100%',
            height: '18px',
            backgroundColor: '#F5E6D3',
            borderRadius: '2px 2px 0 0',
            backgroundImage: `
              linear-gradient(90deg,
                transparent 0%,
                rgba(255,255,255,0.4) 20%,
                transparent 40%,
                transparent 60%,
                rgba(255,255,255,0.3) 80%,
                transparent 100%),
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 3px,
                rgba(139,111,78,0.04) 3px,
                rgba(139,111,78,0.04) 6px),
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 8px,
                rgba(0,0,0,0.02) 8px,
                rgba(0,0,0,0.02) 10px)
            `,
            boxShadow: `
              inset 0 2px 5px rgba(255,255,255,0.4),
              inset 0 -2px 4px rgba(0,0,0,0.15),
              0 3px 6px rgba(0,0,0,0.28)
            `,
          }}
        />
      </div>

      {/* Chair - upholstered office */}
      <div
        style={{
          position: 'absolute',
          top: '76px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '66px',
          height: '60px',
          backgroundColor: '#6B6B63',
          backgroundImage: `
            linear-gradient(155deg, #8A8A82 0%, #7A7A72 25%, #6B6B63 50%, #5A5A52 75%, #6B6B63 100%),
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 2px,
              rgba(0,0,0,0.08) 2px,
              rgba(0,0,0,0.08) 4px),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 3px,
              rgba(255,255,255,0.06) 3px,
              rgba(255,255,255,0.06) 5px)
          `,
          borderRadius: '4px 4px 10px 10px',
          border: '1.2px solid rgba(0,0,0,0.65)',
          boxShadow: `
            0 8px 16px rgba(0,0,0,0.52),
            inset 0 2px 4px rgba(255,255,255,0.12),
            inset 0 -2px 6px rgba(0,0,0,0.48)
          `,
          zIndex: 8,
        }}
      />

      {/* Character */}
      <div
        style={{
          position: 'relative',
          marginTop: '-16px',
          zIndex: 10,
        }}
      >
        <EmployeeCharacter employee={employee} size="medium" />
      </div>

      {/* Role title */}
      <div
        style={{
          fontSize: '13px',
          fontWeight: '900',
          color: 'var(--text-primary)',
          textAlign: 'center',
          width: '200px',
          lineHeight: '1.1',
          marginTop: '14px',
          zIndex: 1,
          letterSpacing: '0.6px',
          textTransform: 'uppercase',
        }}
      >
        {roleLabel}
      </div>

      {/* Task card */}
      <div
        style={{
          marginTop: '10px',
          width: '200px',
          zIndex: 1,
          filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.32))',
        }}
      >
        <DeskTaskCard employee={employee} isActive={isActive} />
      </div>

      {/* Active glow */}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: '-36px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '280px',
            height: '220px',
            background: `radial-gradient(circle, rgba(249,112,31,0.42) 0%, rgba(249,112,31,0) 65%)`,
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: 'glow-pulse 3.2s ease-in-out infinite',
            zIndex: 0,
          }}
        />
      )}

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
