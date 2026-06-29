import { CharacterController } from './CharacterController';
import { Navigation } from './Navigation';
import { globalDialogueSystem } from './DialogueSystem';

export type SandyState = 'idle' | 'walking' | 'talking' | 'listening' | 'thinking' | 'greeting';

export interface TaskMessage {
  employeeId: string;
  employeeName: string;
  taskTitle: string;
  taskId: string;
}

export class SandyAgent {
  private controller: CharacterController;
  private currentState: SandyState = 'idle';
  private messageQueue: TaskMessage[] = [];
  private isBusy = false;

  constructor(startingDeskId: string, navigation: Navigation) {
    this.controller = new CharacterController(startingDeskId, navigation);
  }

  /**
   * Greet the user when they open the office
   */
  greetUser(): void {
    this.currentState = 'greeting';
    globalDialogueSystem.addDialogue({
      id: `sandy-greeting-${Date.now()}`,
      speakerId: 'sandy',
      text: 'Good morning! Ready to check on the team?',
      duration: 3,
      timestamp: Date.now(),
    });
  }

  /**
   * Queue a task assignment - Sandy will go to the employee and relay
   */
  assignTask(employeeId: string, employeeName: string, taskTitle: string, taskId: string): void {
    this.messageQueue.push({
      employeeId,
      employeeName,
      taskTitle,
      taskId,
    });

    if (!this.isBusy) {
      this.processNextMessage();
    }
  }

  /**
   * Process the next message in queue
   */
  private processNextMessage(): void {
    if (this.messageQueue.length === 0) {
      this.isBusy = false;
      this.currentState = 'idle';
      return;
    }

    this.isBusy = true;
    const message = this.messageQueue.shift()!;

    // Navigate to the employee
    this.controller.moveTo(message.employeeId);
    this.currentState = 'walking';

    // After navigation + delay, deliver message
    setTimeout(() => {
      this.deliverMessage(message);
    }, 3000);
  }

  /**
   * Deliver message to employee with dialogue
   */
  private deliverMessage(message: TaskMessage): void {
    this.currentState = 'talking';

    // Sandy speaks first
    globalDialogueSystem.addDialogue({
      id: `sandy-msg-${message.taskId}-1`,
      speakerId: 'sandy',
      text: `${message.employeeName}, new task: "${message.taskTitle}"`,
      duration: 2,
      timestamp: Date.now(),
    });

    // Employee responds after a bit
    setTimeout(() => {
      globalDialogueSystem.addDialogue({
        id: `sandy-msg-${message.taskId}-2`,
        speakerId: message.employeeId,
        text: globalDialogueSystem.generateTaskDialogue(message.employeeName, message.taskTitle),
        duration: 2,
        timestamp: Date.now(),
      });

      // Sandy acknowledges and moves on
      setTimeout(() => {
        globalDialogueSystem.addDialogue({
          id: `sandy-msg-${message.taskId}-3`,
          speakerId: 'sandy',
          text: 'Great! I\'ll let you get to it.',
          duration: 2,
          timestamp: Date.now(),
        });

        // Return to idle and process next message
        setTimeout(() => {
          this.controller.moveTo('center');
          this.currentState = 'idle';
          this.processNextMessage();
        }, 2000);
      }, 2500);
    }, 2500);
  }

  /**
   * Generate weekly report based on team metrics
   */
  generateWeeklyReport(metrics: {
    completionRate: number;
    averageWorkload: number;
    overloadedEmployees: string[];
  }): string {
    if (metrics.completionRate >= 80) {
      return `Great week! ${metrics.completionRate}% completion. Team is crushing it.`;
    } else if (metrics.completionRate >= 60) {
      return `Solid progress. ${metrics.completionRate}% completion rate. Keep the momentum!`;
    } else {
      return `Let's improve this week. Currently at ${metrics.completionRate}% completion.`;
    }
  }

  update(deltaTime: number): void {
    this.controller.update(deltaTime);
  }

  getController(): CharacterController {
    return this.controller;
  }

  getState(): SandyState {
    return this.currentState;
  }

  hasMessages(): boolean {
    return this.messageQueue.length > 0;
  }
}
