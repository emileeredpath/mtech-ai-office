import { Canvas } from './Canvas';
import { Lighting } from './Lighting';
import { Environment } from './Environment';
import { Character } from './Character';
import { useOfficeStore } from '@/store/officeStore';
import { useEffect, useRef } from 'react';
import { Navigation } from '@/systems/Navigation';
import { globalEventBus } from '@/systems/EventBus';
import { SandyAgent } from '@/systems/SandyAgent';
import { appearancePresets } from '@/types/character';

export function OfficeScene() {
  const employees = useOfficeStore((state) => state.employees);
  const navigationRef = useRef<Navigation | null>(null);
  const sandyRef = useRef<SandyAgent | null>(null);

  useEffect(() => {
    console.log('OfficeScene: Initializing with', employees.length, 'employees');

    // Initialize navigation system
    navigationRef.current = new Navigation();
    console.log('OfficeScene: Navigation initialized');

    // Initialize Sandy (Chief of Staff)
    sandyRef.current = new SandyAgent('center', navigationRef.current);
    sandyRef.current.greetUser();
    console.log('OfficeScene: Sandy initialized and greeted');

    // Character controllers will be registered when Character components mount
    // via the useEffect in the Character component

    return () => {
      globalEventBus.clear();
      sandyRef.current = null;
    };
  }, [employees]);

  const appearanceKeys = Object.keys(appearancePresets);

  const deskPositions: Record<string, [number, number, number]> = {
    '1': [-6, 0.5, -6],
    '2': [-2, 0.5, -6],
    '3': [2, 0.5, -6],
    '4': [6, 0.5, -6],
    '5': [-6, 0.5, 2],
    '6': [-2, 0.5, 2],
    '7': [2, 0.5, 2],
    '8': [6, 0.5, 2],
  };

  return (
    <Canvas>
      <Lighting />
      <Environment />

      {/* Render all employee characters at their desks */}
      {employees.map((employee, index) => {
        const deskId = String(index + 1);
        const appearanceKey = appearanceKeys[index] || 'marketingDirector';
        const appearance = appearancePresets[appearanceKey];
        const initialPosition = deskPositions[deskId] || [0, 0.5, 0];

        return (
          <Character
            key={employee.id}
            id={employee.id}
            name={employee.name}
            position={initialPosition}
            deskId={deskId}
            appearance={appearance}
          />
        );
      })}

      {/* Sandy - Chief of Staff at center */}
      {sandyRef.current && (
        <Character
          id="sandy"
          name="Sandy"
          position={[0, 0.5, -2]}
          deskId="center"
          appearance={appearancePresets.marketingDirector}
        />
      )}
    </Canvas>
  );
}
