import { Canvas } from './Canvas';
import { Lighting } from './Lighting';
import { Environment } from './Environment';
import { Character } from './Character';
import { useOfficeStore } from '@/store/officeStore';
import { useEffect, useRef } from 'react';
import { EmployeeBehavior } from '@/systems/EmployeeBehavior';
import { Navigation } from '@/systems/Navigation';
import { globalEventBus } from '@/systems/EventBus';
import { SandyAgent } from '@/systems/SandyAgent';
import {
  initializeBehaviorTriggers,
  updateBehaviorTriggers,
} from '@/systems/BehaviorTriggers';
import { appearancePresets } from '@/types/character';

export function OfficeScene() {
  const employees = useOfficeStore((state) => state.employees);
  const behaviorRef = useRef<Map<string, EmployeeBehavior>>(new Map());
  const navigationRef = useRef<Navigation | null>(null);
  const sandyRef = useRef<SandyAgent | null>(null);

  useEffect(() => {
    // Initialize navigation, behaviors, and Sandy
    navigationRef.current = new Navigation();
    behaviorRef.current.clear();

    employees.forEach((emp) => {
      const deskId = String(employees.indexOf(emp) + 1);
      const behavior = new EmployeeBehavior(
        emp.id,
        deskId,
        navigationRef.current!,
        globalEventBus
      );
      behaviorRef.current.set(emp.id, behavior);
    });

    // Initialize Sandy
    sandyRef.current = new SandyAgent('center', navigationRef.current);
    sandyRef.current.greetUser();

    initializeBehaviorTriggers();

    return () => {
      behaviorRef.current.clear();
      globalEventBus.clear();
      sandyRef.current = null;
    };
  }, [employees]);

  // Update behaviors on store changes
  useEffect(() => {
    updateBehaviorTriggers();
  }, [useOfficeStore]);

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

  const appearanceKeys = Object.keys(appearancePresets);

  return (
    <Canvas>
      <Lighting />
      <Environment />

      {/* Characters at desks */}
      {employees.map((employee, index) => {
        const deskId = String(index + 1);
        const position = deskPositions[deskId] || [0, 0.5, 0];
        const behavior = behaviorRef.current.get(employee.id);
        const controller = behavior?.getController();
        const appearanceKey = appearanceKeys[index] || 'marketingDirector';
        const appearance = appearancePresets[appearanceKey];

        return (
          <Character
            key={employee.id}
            id={employee.id}
            name={employee.name}
            position={position}
            deskId={deskId}
            appearance={appearance}
            controller={controller}
          />
        );
      })}

      {/* Sandy - will be rendered here */}
      {sandyRef.current && (
        <Character
          id="sandy"
          name="Sandy"
          position={[0, 0.5, -2]}
          deskId="center"
          appearance={appearancePresets.marketingDirector}
          controller={sandyRef.current.getController()}
        />
      )}
    </Canvas>
  );
}
