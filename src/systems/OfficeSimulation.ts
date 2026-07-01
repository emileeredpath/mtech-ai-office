import { AmbientBehavior } from './AmbientBehavior';
import { Navigation } from './Navigation';
import { SandyAgent } from './SandyAgent';
import { CharacterPersonality } from '@/types/character';

export interface OfficeEmployee {
  id: string;
  personality: CharacterPersonality;
  deskId: string;
}

/**
 * Orchestrates the entire office simulation:
 * - Manages all characters' autonomous behaviors
 * - Handles Sandy's agenda and task relaying
 * - Coordinates group interactions (meetings, collaborative work)
 * - Updates all character positions and animations
 */
export class OfficeSimulation {
  private ambientBehaviors: Map<string, AmbientBehavior> = new Map();
  private sandy: SandyAgent;
  private isRunning = false;
  private updateRate = 16; // ~60fps

  constructor(employees: OfficeEmployee[], sandy: SandyAgent, navigation: Navigation) {
    this.sandy = sandy;

    // Initialize ambient behaviors for all employees
    employees.forEach((emp) => {
      const behavior = new AmbientBehavior(
        emp.id,
        emp.deskId,
        emp.personality,
        navigation
      );
      this.ambientBehaviors.set(emp.id, behavior);
    });

    // Tell each character about all other employees
    const allEmployeeIds = employees.map((e) => e.id);
    this.ambientBehaviors.forEach((behavior) => {
      behavior.setAllEmployeeIds(allEmployeeIds);
    });
  }

  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    console.log('OfficeSimulation: Starting simulation loop');

    this.simulationLoop();
  }

  stop(): void {
    this.isRunning = false;
  }

  private simulationLoop(): void {
    if (!this.isRunning) return;

    // const deltaTime = this.updateRate / 1000;

    console.log('OfficeSimulation: Loop tick');

    // TODO: Debug - temporarily disable behavior updates
    // try {
    //   // Update all ambient behaviors
    //   this.ambientBehaviors.forEach((behavior) => {
    //     behavior.update(deltaTime);
    //   });

    //   // Update Sandy
    //   this.sandy.update(deltaTime);
    // } catch (err) {
    //   console.error('OfficeSimulation: Error during update:', err);
    // }

    // Schedule next update
    setTimeout(() => this.simulationLoop(), this.updateRate);
  }

  /**
   * Queue a task assignment through Sandy
   * Sandy will deliver it to the employee
   */
  assignTaskViasSandy(employeeId: string, employeeName: string, taskTitle: string, taskId: string): void {
    this.sandy.assignTask(employeeId, employeeName, taskTitle, taskId);
  }

  getBehavior(employeeId: string): AmbientBehavior | undefined {
    return this.ambientBehaviors.get(employeeId);
  }

  getAllBehaviors(): Map<string, AmbientBehavior> {
    return this.ambientBehaviors;
  }

  getIsRunning(): boolean {
    return this.isRunning;
  }
}
