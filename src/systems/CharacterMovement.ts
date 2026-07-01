import * as THREE from 'three';
import { CharacterController } from './CharacterController';
import { Navigation } from './Navigation';
import { globalEventBus } from './EventBus';

export interface CharacterMovementState {
  characterId: string;
  position: THREE.Vector3;
  isWalking: boolean;
  destination?: string;
  currentAnimation: 'idle' | 'walk' | 'wave' | 'nod';
}

/**
 * Manages character movement triggered by workflow events
 * Characters walk during handoffs, gesture during conversations
 */
export class CharacterMovement {
  private controllers: Map<string, CharacterController> = new Map();
  private movementStates: Map<string, CharacterMovementState> = new Map();

  constructor(_navigation: Navigation) {
    // Navigation passed for future use in advanced pathfinding
    this.setupEventListeners();
  }

  registerCharacter(characterId: string, controller: CharacterController): void {
    this.controllers.set(characterId, controller);
    this.movementStates.set(characterId, {
      characterId,
      position: new THREE.Vector3(0, 0, 0),
      isWalking: false,
      currentAnimation: 'idle',
    });
  }

  private setupEventListeners(): void {
    // Listen for workflow steps and trigger character movement
    globalEventBus.on('stepStarted', (data) => {
      const step = data.step;

      // Handoff: character walks to target
      if (step.type === 'handoff' && step.fromEmployee) {
        this.initiateHandoff(step.fromEmployee, step.toEmployee, step.description);
      }

      // Work: character stays at desk
      if (step.type === 'work') {
        this.startWork(step.toEmployee);
      }

      // Review: character reviews (stays at desk)
      if (step.type === 'review') {
        this.startReview(step.toEmployee);
      }
    });
  }

  private initiateHandoff(fromEmployeeId: string, toEmployeeId: string, _description: string): void {
    const fromController = this.controllers.get(fromEmployeeId);
    const toController = this.controllers.get(toEmployeeId);

    if (!fromController || !toController) return;

    // From employee walks to target
    this.walkCharacterTo(fromEmployeeId, toEmployeeId);

    // After a delay, target employee waves/nods in greeting
    setTimeout(() => {
      this.gestureCharacter(toEmployeeId, 'nod');
    }, 1500);

    // After handoff completes, from employee returns to center
    setTimeout(() => {
      this.walkCharacterTo(fromEmployeeId, 'center');
    }, 3000);
  }

  private startWork(employeeId: string): void {
    // Character sits at desk and works (idle animation with subtle sway)
    const state = this.movementStates.get(employeeId);
    if (state) {
      state.isWalking = false;
      state.currentAnimation = 'idle';
    }
  }

  private startReview(employeeId: string): void {
    // Character reviews (thinking animation)
    const state = this.movementStates.get(employeeId);
    if (state) {
      state.isWalking = false;
      state.currentAnimation = 'idle';
    }
  }

  walkCharacterTo(characterId: string, targetDeskId: string): void {
    const controller = this.controllers.get(characterId);
    if (!controller) return;

    controller.moveTo(targetDeskId);

    const state = this.movementStates.get(characterId);
    if (state) {
      state.isWalking = true;
      state.destination = targetDeskId;
      state.currentAnimation = 'walk';
    }

    // Mark as idle when arrival is close (based on animation duration)
    setTimeout(() => {
      if (state) {
        state.isWalking = false;
        state.currentAnimation = 'idle';
      }
    }, 2000);
  }

  gestureCharacter(characterId: string, gesture: 'wave' | 'nod'): void {
    const controller = this.controllers.get(characterId);
    if (!controller) return;

    controller.gesture(gesture);

    const state = this.movementStates.get(characterId);
    if (state) {
      state.currentAnimation = gesture;

      // Return to idle after gesture
      setTimeout(() => {
        state.currentAnimation = 'idle';
      }, 1000);
    }
  }

  celebrateCharacter(characterId: string): void {
    const controller = this.controllers.get(characterId);
    if (!controller) return;

    controller.celebrate();

    const state = this.movementStates.get(characterId);
    if (state) {
      state.currentAnimation = 'idle';
    }
  }

  getState(characterId: string): CharacterMovementState | undefined {
    return this.movementStates.get(characterId);
  }

  update(_deltaTime: number): void {
    // Update is called from useFrame in Character component
    // Controllers handle their own state updates
  }
}

export const globalCharacterMovement = new CharacterMovement(
  new Navigation()
);
