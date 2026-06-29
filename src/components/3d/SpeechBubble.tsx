import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpeechBubbleProps {
  text: string;
  position: [number, number, number];
  duration: number;
}

export function SpeechBubble({ text, position, duration }: SpeechBubbleProps) {
  const groupRef = useRef<THREE.Group>(null);
  const opacityRef = useRef(1);
  const timeRef = useRef(0);

  useFrame((_state, deltaTime) => {
    timeRef.current += deltaTime;
    const progress = Math.min(timeRef.current / duration, 1);

    // Fade out at the end
    if (progress > 0.8) {
      opacityRef.current = (1 - (progress - 0.8) / 0.2) * 0.95;
    } else {
      opacityRef.current = 0.95;
    }

    if (groupRef.current) {
      groupRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          (child.material as THREE.Material).opacity = opacityRef.current;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Bubble background */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[Math.max(2, text.length * 0.08), 0.8]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Bubble tail */}
      <mesh position={[-0.6, -0.5, 0.01]}>
        <coneGeometry args={[0.2, 0.4, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
          roughness={0.3}
        />
      </mesh>

      {/* Text (placeholder - would use text geometry in full implementation) */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[Math.max(1.8, text.length * 0.07), 0.6]} />
        <meshStandardMaterial
          color="#f0f4f8"
          transparent
          opacity={opacityRef.current}
        />
      </mesh>
    </group>
  );
}
