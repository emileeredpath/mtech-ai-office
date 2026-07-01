import { CharacterController } from './CharacterController';
import { globalDialogueSystem } from './DialogueSystem';
import { globalEventBus } from './EventBus';

export interface EmployeeTask {
  id: string;
  description: string;
  status: 'assigned' | 'in-progress' | 'completed';
  assignedAt: number;
  completedAt?: number;
}

export interface EmployeeState {
  id: string;
  name: string;
  currentTask: EmployeeTask | null;
  taskHistory: EmployeeTask[];
  isBusy: boolean;
  lastActivityTime: number;
}

export class EmployeeAgent {
  private employeeId: string;
  private employeeName: string;
  private currentTask: EmployeeTask | null = null;
  private taskHistory: EmployeeTask[] = [];
  private isBusy = false;

  constructor(employeeId: string, employeeName: string) {
    this.employeeId = employeeId;
    this.employeeName = employeeName;

    // Listen for workflow events
    globalEventBus.on('stepStarted', this.onStepStarted.bind(this));
    globalEventBus.on('handoffReceived', this.onHandoffReceived.bind(this));
  }

  setController(_controller: CharacterController): void {
    // Store for future use when character movement is implemented
  }

  assignTask(taskId: string, description: string): void {
    this.currentTask = {
      id: taskId,
      description,
      status: 'assigned',
      assignedAt: Date.now(),
    };

    this.isBusy = true;

    globalEventBus.emit('taskAssigned', {
      employeeId: this.employeeId,
      employeeName: this.employeeName,
      taskId,
      description,
    });
  }

  private onStepStarted(data: any): void {
    const step = data.step;

    // Check if this employee is involved in this step
    if (step.toEmployee === this.employeeId) {
      if (step.type === 'handoff') {
        this.receiveHandoff(step.fromEmployee, step.description);
      } else if (step.type === 'work') {
        this.startWork(step.description);
      } else if (step.type === 'review') {
        this.startReview(step.description);
      }
    }
  }

  private receiveHandoff(_fromEmployeeId: string, description: string): void {
    // Show greeting dialogue
    globalDialogueSystem.addDialogue({
      id: `handoff-receive-${this.employeeId}-${Date.now()}`,
      speakerId: this.employeeId,
      text: `Got it, I'll take it from here.`,
      duration: 2,
      timestamp: Date.now(),
    });

    this.currentTask = {
      id: `task-${Date.now()}`,
      description,
      status: 'in-progress',
      assignedAt: Date.now(),
    };
  }

  private startWork(description: string): void {
    this.currentTask = {
      id: `task-${Date.now()}`,
      description,
      status: 'in-progress',
      assignedAt: Date.now(),
    };

    globalDialogueSystem.addDialogue({
      id: `work-start-${this.employeeId}-${Date.now()}`,
      speakerId: this.employeeId,
      text: `Working on: ${description}`,
      duration: 2,
      timestamp: Date.now(),
    });
  }

  private startReview(description: string): void {
    this.currentTask = {
      id: `task-${Date.now()}`,
      description,
      status: 'in-progress',
      assignedAt: Date.now(),
    };

    globalDialogueSystem.addDialogue({
      id: `review-start-${this.employeeId}-${Date.now()}`,
      speakerId: this.employeeId,
      text: `Reviewing: ${description}`,
      duration: 2,
      timestamp: Date.now(),
    });
  }

  private onHandoffReceived(data: any): void {
    if (data.toEmployeeId === this.employeeId) {
      this.receiveHandoff(data.fromEmployeeId, data.description);
    }
  }

  completeTask(): void {
    if (this.currentTask) {
      this.currentTask.status = 'completed';
      this.currentTask.completedAt = Date.now();
      this.taskHistory.push(this.currentTask);

      globalDialogueSystem.addDialogue({
        id: `task-complete-${this.employeeId}-${Date.now()}`,
        speakerId: this.employeeId,
        text: `Done! Ready for handoff.`,
        duration: 2,
        timestamp: Date.now(),
      });

      this.currentTask = null;
      this.isBusy = false;
    }
  }

  approveTask(): void {
    if (this.currentTask) {
      this.currentTask.status = 'completed';
      this.currentTask.completedAt = Date.now();
      this.taskHistory.push(this.currentTask);

      globalDialogueSystem.addDialogue({
        id: `task-approved-${this.employeeId}-${Date.now()}`,
        speakerId: this.employeeId,
        text: `Approved! Great work!`,
        duration: 2,
        timestamp: Date.now(),
      });

      this.currentTask = null;
      this.isBusy = false;
    }
  }

  getState(): EmployeeState {
    return {
      id: this.employeeId,
      name: this.employeeName,
      currentTask: this.currentTask,
      taskHistory: this.taskHistory,
      isBusy: this.isBusy,
      lastActivityTime: Date.now(),
    };
  }

  getCurrentTask(): EmployeeTask | null {
    return this.currentTask;
  }

  getTaskHistory(): EmployeeTask[] {
    return this.taskHistory;
  }

  isBusyWorking(): boolean {
    return this.isBusy;
  }
}
