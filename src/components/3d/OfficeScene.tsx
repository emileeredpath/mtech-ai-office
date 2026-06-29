import { Canvas } from './Canvas';
import { Lighting } from './Lighting';
import { Environment } from './Environment';
import { Character } from './Character';
import { useOfficeStore } from '@/store/officeStore';
import { useEffect, useRef } from 'react';
import { Navigation } from '@/systems/Navigation';
import { globalEventBus } from '@/systems/EventBus';
import { SandyAgent } from '@/systems/SandyAgent';
import { OfficeSimulation } from '@/systems/OfficeSimulation';
import {
  initializeBehaviorTriggers,
  updateBehaviorTriggers,
} from '@/systems/BehaviorTriggers';
import { appearancePresets, personalityPresets } from '@/types/character';

export function OfficeScene() {
  const employees = useOfficeStore((state) => state.employees);
  const navigationRef = useRef<Navigation | null>(null);
  const sandyRef = useRef<SandyAgent | null>(null);
  const simulationRef = useRef<OfficeSimulation | null>(null);

  useEffect(() => {
    console.log('OfficeScene: Starting initialization with', employees.length, 'employees');

    // Initialize navigation and Sandy
    navigationRef.current = new Navigation();
    console.log('OfficeScene: Navigation initialized');

    sandyRef.current = new SandyAgent('center', navigationRef.current);
    console.log('OfficeScene: SandyAgent created');

    sandyRef.current.greetUser();
    console.log('OfficeScene: Sandy greeted');

    // Initialize office simulation with ambient behaviors
    const employeeData = employees.map((emp, index) => ({
      id: emp.id,
      personality: Object.values(personalityPresets)[index],
      deskId: String(index + 1),
    }));
    console.log('OfficeScene: Employee data prepared');

    simulationRef.current = new OfficeSimulation(
      employeeData,
      sandyRef.current,
      navigationRef.current
    );
    console.log('OfficeScene: OfficeSimulation created');

    // Start the ambient simulation
    console.log('OfficeScene: Starting simulation...');
    simulationRef.current.start();
    console.log('OfficeScene: Simulation started');

    initializeBehaviorTriggers();
    console.log('OfficeScene: Behavior triggers initialized');

    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
      globalEventBus.clear();
      sandyRef.current = null;
      simulationRef.current = null;
    };
  }, [employees]);

  // Update behaviors on store changes
  useEffect(() => {
    console.log('OfficeScene: updateBehaviorTriggers called');
    updateBehaviorTriggers();
  }, []);

  console.log('OfficeScene: Render starting');
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

  console.log('OfficeScene: Building character list');
  console.log('OfficeScene: Rendering Canvas');
  return (
    <Canvas>
      <Lighting />
      <Environment />

      {/* TODO: Debug - temporarily disabled character rendering */}
      {/* {employees.map((employee, index) => {
        const deskId = String(index + 1);
        const behavior = simulationRef.current?.getBehavior(employee.id);
        const controller = behavior?.getController();
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
            controller={controller}
          />
        );
      })} */}

      {/* {sandyRef.current && (
        <Character
          id="sandy"
          name="Sandy"
          position={[0, 0.5, -2]}
          deskId="center"
          appearance={appearancePresets.marketingDirector}
          controller={sandyRef.current.getController()}
        />
      )} */}
    </Canvas>
  );
}
