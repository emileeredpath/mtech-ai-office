import type { Employee } from '@/types/employee';

interface Character3DProps {
  employee: Employee;
  isSelected: boolean;
  isTyping: boolean;
}

const CHARACTER_DESIGNS: Record<string, any> = {
  'marketing-director': {
    name: 'Lucy',
    skin: '#EDB895',
    hair: '#5A3A2A',
    hairStyle: 'wavy',
    outfit: '#E84C3D',
    outfitType: 'jacket',
  },
  'website-auditor': {
    name: 'Sophie',
    skin: '#F4C9B8',
    hair: '#B8860B',
    hairStyle: 'straight',
    outfit: '#10B981',
    outfitType: 'blouse',
  },
  'proposal-writer': {
    name: 'Tom',
    skin: '#D8A882',
    hair: '#4A3728',
    hairStyle: 'short',
    outfit: '#2563EB',
    outfitType: 'shirt',
  },
  'case-study-writer': {
    name: 'James',
    skin: '#C8A882',
    hair: '#6B4C3A',
    hairStyle: 'curly',
    outfit: '#7C3AED',
    outfitType: 'shirt',
  },
  'email-marketing-manager': {
    name: 'Emily',
    skin: '#F0D9CA',
    hair: '#8B6F47',
    hairStyle: 'long',
    outfit: '#06B6D4',
    outfitType: 'blouse',
  },
  'seo-ppc-manager': {
    name: 'Tom',
    skin: '#D4A574',
    hair: '#3A3A3A',
    hairStyle: 'short',
    outfit: '#2563EB',
    outfitType: 'shirt',
  },
  'social-media-manager': {
    name: 'Chloe',
    skin: '#E8B5A0',
    hair: '#7B4A8C',
    hairStyle: 'wavy',
    outfit: '#EC4899',
    outfitType: 'top',
  },
  'funding-rewards-manager': {
    name: 'Marcus',
    skin: '#C9A87D',
    hair: '#4A4A4A',
    hairStyle: 'short',
    outfit: '#2563EB',
    outfitType: 'shirt',
  },
};

export function Character3D({ employee, isSelected, isTyping }: Character3DProps) {
  const design = CHARACTER_DESIGNS[employee.id] || CHARACTER_DESIGNS['marketing-director'];

  return (
    <div
      style={{
        position: 'relative',
        width: '50px',
        height: '64px',
        animation: `charBreathe 4s ease-in-out infinite`,
      }}
    >
      {/* Head */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: design.skin,
          boxShadow: `
            0 3px 8px rgba(0,0,0,0.25),
            inset -3px -3px 6px rgba(0,0,0,0.12),
            0 0 0 1.5px ${design.skin}dd
          `,
          overflow: 'hidden',
        }}
      >
        {/* Hair */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '65%',
            backgroundColor: design.hair,
            borderRadius: '50% 50% 0 0',
            boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.15)',
          }}
        />

        {/* Eyes */}
        <div
          style={{
            position: 'absolute',
            top: '45%',
            left: '32%',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: '#2c3e50',
            boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.4), 0 1px 2px rgba(255,255,255,0.2)',
            animation: isSelected ? 'charLook 3s ease-in-out infinite' : 'charBlink 3s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '45%',
            right: '32%',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: '#2c3e50',
            boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.4), 0 1px 2px rgba(255,255,255,0.2)',
            animation: isSelected ? 'charLook 3s ease-in-out infinite' : 'charBlink 3s ease-in-out infinite',
          }}
        />

        {/* Nose (subtle) */}
        <div
          style={{
            position: 'absolute',
            top: '48%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '2px',
            height: '3px',
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}
        />

        {/* Mouth/smile */}
        <div
          style={{
            position: 'absolute',
            bottom: '3px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '6px',
            height: '2px',
            borderRadius: '2px',
            backgroundColor: 'rgba(0,0,0,0.15)',
          }}
        />

        {/* Head shine */}
        <div
          style={{
            position: 'absolute',
            top: '4px',
            left: '6px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.3)',
          }}
        />
      </div>

      {/* Neck */}
      <div
        style={{
          position: 'absolute',
          top: '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '4px',
          height: '5px',
          backgroundColor: design.skin,
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        }}
      />

      {/* Body/Outfit */}
      <div
        style={{
          position: 'absolute',
          top: '27px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '20px',
          height: '24px',
          backgroundColor: design.outfit,
          borderRadius: '3px',
          boxShadow: `
            0 4px 10px rgba(0,0,0,0.25),
            inset -2px -2px 4px rgba(0,0,0,0.15),
            inset 1px 1px 2px rgba(255,255,255,0.1)
          `,
        }}
      >
        {/* Shirt detail / center accent */}
        <div
          style={{
            position: 'absolute',
            top: '3px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '2px',
            height: '6px',
            backgroundColor: 'rgba(255,255,255,0.25)',
            borderRadius: '1px',
          }}
        />
      </div>

      {/* Arms */}
      <div
        style={{
          position: 'absolute',
          top: '30px',
          left: '4px',
          width: '4px',
          height: '14px',
          backgroundColor: design.skin,
          borderRadius: '2px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          animation: isTyping ? 'charType 0.4s ease-in-out infinite' : 'none',
          transformOrigin: 'top',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '30px',
          right: '4px',
          width: '4px',
          height: '14px',
          backgroundColor: design.skin,
          borderRadius: '2px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          animation: isTyping ? 'charType 0.4s ease-in-out infinite' : 'none',
          transformOrigin: 'top',
          animationDelay: '0.1s',
        }}
      />

      {/* Legs (simplified - seated) */}
      <div
        style={{
          position: 'absolute',
          bottom: '2px',
          left: '6px',
          width: '3px',
          height: '10px',
          backgroundColor: '#3a3a3a',
          borderRadius: '1px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '2px',
          right: '6px',
          width: '3px',
          height: '10px',
          backgroundColor: '#3a3a3a',
          borderRadius: '1px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }}
      />

      {/* Selection glow */}
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            inset: '-6px',
            borderRadius: '50%',
            border: '2px solid #F97021',
            boxShadow: '0 0 12px #F97021',
            animation: 'glow 1.5s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
      )}

      <style>{`
        @keyframes charBreathe {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.03); }
        }

        @keyframes charBlink {
          0%, 10%, 100% { height: 4px; }
          5% { height: 0px; }
        }

        @keyframes charLook {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-1.5px); }
          50% { transform: translateX(0); }
          75% { transform: translateX(1.5px); }
        }

        @keyframes charType {
          0%, 100% { transform: rotateZ(0deg); }
          50% { transform: rotateZ(-20deg); }
        }

        @keyframes glow {
          0%, 100% { opacity: 1; box-shadow: 0 0 12px #F97021; }
          50% { opacity: 0.5; box-shadow: 0 0 20px #F97021; }
        }
      `}</style>
    </div>
  );
}
