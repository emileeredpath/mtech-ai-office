import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { CharacterController } from '@/systems/CharacterController';
import { CharacterModel } from './CharacterModel';
import { CharacterAppearance } from '@/types/character';

interface CharacterProps {
  id: string;
  name: string;
  position: [number, number, number];
  deskId: string;
  appearance: CharacterAppearance;
  controller?: CharacterController;
}

export function Character({ position, appearance, controller }: CharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const controllerRef = useRef<CharacterController | null>(controller || null);
  const idleTimeRef = useRef(0);

  useFrame((_state, deltaTime) => {
    if (!groupRef.current || !controllerRef.current) return;

    controllerRef.current.update(deltaTime);
    const charState = controllerRef.current.getState();
    const animation = controllerRef.current.getCurrentAnimation();
    const progress = controllerRef.current.getAnimationProgress();

    // Update position
    groupRef.current.position.copy(charState.position);

    // Get the character model mesh for animations
    const modelMesh = groupRef.current.children[0] as THREE.Group | undefined;
    if (!modelMesh) return;

    // Find body/head for animations
    const bodyMesh = modelMesh.children.find(
      (child) => child instanceof THREE.Mesh && (child as any).geometry.type === 'BoxGeometry'
    ) as THREE.Mesh | undefined;

    const headMesh = modelMesh.children.find(
      (child) =>
        child instanceof THREE.Mesh &&
        (child as any).geometry.type === 'SphereGeometry' &&
        (child as any).position.y > 0.5
    ) as THREE.Mesh | undefined;

    if (animation === 'idle') {
      idleTimeRef.current += deltaTime;
      const sway = Math.sin(idleTimeRef.current * 2) * 0.05;
      if (bodyMesh) bodyMesh.rotation.z = sway;
    } else if (animation === 'walk') {
      const walkCycle = Math.sin(progress * Math.PI * 2);
      // Subtle walk animation
      if (bodyMesh) {
        bodyMesh.position.y = Math.abs(walkCycle) * 0.05;
        bodyMesh.rotation.z = walkCycle * 0.1;
      }
    } else if (animation === 'wave') {
      // Wave gesture
      const arms = modelMesh.children.filter(
        (child) => child instanceof THREE.Mesh && (child as any).geometry.type === 'CylinderGeometry'
      );
      if (arms.length >= 2) {
        (arms[1] as any).position.y = Math.sin(progress * Math.PI) * 0.3;
        (arms[1] as any).rotation.x = Math.sin(progress * Math.PI) * 0.8;
      }
    } else if (animation === 'nod') {
      if (headMesh) {
        headMesh.rotation.x = Math.sin(progress * Math.PI) * 0.3;
      }
    } else if (animation === 'celebrate') {
      const jumpHeight = Math.sin(progress * Math.PI) * 0.5;
      groupRef.current.position.y += jumpHeight * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <CharacterModel appearance={appearance} position={[0, 0, 0]} scale={1} />
    </group>
  );
}
