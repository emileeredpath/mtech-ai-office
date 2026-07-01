import { useRef } from 'react';
import * as THREE from 'three';
import { CharacterAppearance } from '@/types/character';

interface CharacterModelProps {
  appearance: CharacterAppearance;
  position: [number, number, number];
  scale?: number;
}

export function CharacterModel({ appearance, position, scale = 1 }: CharacterModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Head */}
      <mesh position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={appearance.skinTone} roughness={0.7} />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.35, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={appearance.hairColor} roughness={0.8} />
      </mesh>

      {/* Body/Clothing */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.35, 0.6, 0.25]} />
        <meshStandardMaterial color={appearance.clothingColor} roughness={0.6} />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.25, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color={appearance.skinTone} roughness={0.7} />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.25, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color={appearance.skinTone} roughness={0.7} />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.12, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.7, 8]} />
        <meshStandardMaterial color="#333333" roughness={0.8} />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.12, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.7, 8]} />
        <meshStandardMaterial color="#333333" roughness={0.8} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.1, 1.05, 0.25]} castShadow>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.1, 1.05, 0.25]} castShadow>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Accent badge (belt/accessory) */}
      <mesh position={[0, 0.3, 0.15]} castShadow>
        <boxGeometry args={[0.4, 0.08, 0.05]} />
        <meshStandardMaterial color={appearance.accentColor} emissive={appearance.accentColor} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}
