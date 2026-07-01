import { CharacterController } from './CharacterController';
import { Navigation } from './Navigation';
import { globalDialogueSystem } from './DialogueSystem';
import { CharacterPersonality } from '@/types/character';

export type AmbientActivity = 'idle' | 'walking' | 'visiting' | 'collaborating' | 'working';

export interface AmbientGoal {
  type: 'visit-desk' | 'collaborate' | 'chat' | 'get-coffee' | 'return-to-desk';
  targetEmployeeId?: string;
  duration: number;
  startTime: number;
}

export class AmbientBehavior {
  private controller: CharacterController;
  private employeeId: string;
  private personality: CharacterPersonality;
  private currentGoal: AmbientGoal | null = null;
  private goalTimer = 0;
  private allEmployeeIds: string[] = [];
  private ownDeskId: string;

  constructor(
    employeeId: string,
    ownDeskId: string,
    personality: CharacterPersonality,
    navigation: Navigation
  ) {
    this.employeeId = employeeId;
    this.ownDeskId = ownDeskId;
    this.personality = personality;
    this.controller = new CharacterController(ownDeskId, navigation);
  }

  setAllEmployeeIds(ids: string[]): void {
    this.allEmployeeIds = ids.filter((id) => id !== this.employeeId);
  }

  update(deltaTime: number): void {
    this.controller.update(deltaTime);
    this.goalTimer += deltaTime;

    // If no goal or goal expired, pick a new one
    if (!this.currentGoal || this.goalTimer > this.currentGoal.duration) {
      try {
        this.pickNewGoal();
      } catch (err) {
        console.error(`AmbientBehavior[${this.employeeId}]: Error picking new goal:`, err);
      }
    }
  }

  private pickNewGoal(): void {
    this.goalTimer = 0;

    // Extroverted characters visit others more often
    const visitChance =
      this.personality.socialBias === 'extroverted'
        ? 0.6
        : this.personality.socialBias === 'ambiverted'
          ? 0.4
          : 0.2;

    const rand = Math.random();

    if (rand < visitChance && this.allEmployeeIds.length > 0) {
      // Visit a colleague
      const randomEmployee =
        this.allEmployeeIds[Math.floor(Math.random() * this.allEmployeeIds.length)];
      this.currentGoal = {
        type: 'visit-desk',
        targetEmployeeId: randomEmployee,
        duration: 8 + Math.random() * 4, // 8-12 seconds
        startTime: Date.now(),
      };
      this.controller.moveTo(randomEmployee);
      this.performGreeting();
    } else if (rand < visitChance + 0.2) {
      // Go get coffee
      this.currentGoal = {
        type: 'get-coffee',
        duration: 6 + Math.random() * 3,
        startTime: Date.now(),
      };
      this.controller.moveTo('center');
    } else {
      // Return to own desk
      this.currentGoal = {
        type: 'return-to-desk',
        duration: 20 + Math.random() * 20, // 20-40 seconds
        startTime: Date.now(),
      };
      this.controller.moveTo(this.ownDeskId);
    }
  }

  private performGreeting(): void {
    if (!this.currentGoal?.targetEmployeeId) return;

    // Delay greeting slightly to allow movement
    setTimeout(() => {
      const greeting =
        this.personality.communicationStyle === 'formal'
          ? `Hey, how's the work going?`
          : this.personality.communicationStyle === 'enthusiastic'
            ? `Yo! Crushing it today?`
            : `What's up?`;

      globalDialogueSystem.addDialogue({
        id: `greeting-${this.employeeId}-${Date.now()}`,
        speakerId: this.employeeId,
        text: greeting,
        duration: 2,
        timestamp: Date.now(),
      });

      // Target employee responds (simulate)
      setTimeout(() => {
        const responses = [
          `Pretty good! Working through this task.`,
          `Busy but good!`,
          `All good, just focusing.`,
          `Making progress!`,
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];

        globalDialogueSystem.addDialogue({
          id: `response-${this.currentGoal?.targetEmployeeId}-${Date.now()}`,
          speakerId: this.currentGoal?.targetEmployeeId || '',
          text: response,
          duration: 2,
          timestamp: Date.now(),
        });
      }, 2500);
    }, 2000);
  }

  getController(): CharacterController {
    return this.controller;
  }

  getCurrentGoal(): AmbientGoal | null {
    return this.currentGoal;
  }

  getActivity(): AmbientActivity {
    if (!this.currentGoal) return 'idle';
    return this.currentGoal.type === 'visit-desk'
      ? 'visiting'
      : this.currentGoal.type === 'get-coffee'
        ? 'walking'
        : 'idle';
  }
}
