import { globalEventBus } from './EventBus';
import { globalSandySummaryGenerator } from './SandySummaryGenerator';

export interface WorkflowTask {
  id: string;
  description: string;
  createdAt: number;
  assignedTo: string[];
  status: 'pending' | 'in-progress' | 'review' | 'completed';
  steps: WorkflowStep[];
  currentStepIndex: number;
}

export interface WorkflowStep {
  id: string;
  type: 'handoff' | 'work' | 'review';
  fromEmployee?: string;
  toEmployee: string;
  description: string;
  duration: number;
  completed: boolean;
  startedAt?: number;
}

export class WorkflowOrchestrator {
  private activeWorkflows: Map<string, WorkflowTask> = new Map();
  private employeeSkills: Map<string, string[]> = new Map();

  constructor() {
    this.initializeEmployeeSkills();
  }

  private initializeEmployeeSkills() {
    this.employeeSkills.set('proposal-writer', ['proposal-writing', 'research', 'structure']);
    this.employeeSkills.set('marketing-director', ['review', 'strategy', 'approval']);
    this.employeeSkills.set('website-auditor', ['analysis', 'auditing', 'technical-review']);
    this.employeeSkills.set('seo-manager', ['seo', 'keyword-research', 'optimization']);
    this.employeeSkills.set('social-media-manager', ['content-creation', 'social-strategy', 'engagement']);
    this.employeeSkills.set('email-manager', ['email-campaigns', 'copywriting', 'automation']);
    this.employeeSkills.set('case-study-writer', ['case-study-writing', 'evidence', 'storytelling']);
    this.employeeSkills.set('funding-manager', ['funding-research', 'grant-analysis', 'opportunity-id']);
  }

  createWorkflow(description: string): WorkflowTask {
    const workflowId = `workflow-${Date.now()}`;

    // Determine which employees are needed based on task description
    const assignedEmployees = this.assignEmployees(description);

    // Create workflow steps
    const steps = this.createWorkflowSteps(assignedEmployees, description);

    const workflow: WorkflowTask = {
      id: workflowId,
      description,
      createdAt: Date.now(),
      assignedTo: assignedEmployees,
      status: 'pending',
      steps,
      currentStepIndex: 0,
    };

    this.activeWorkflows.set(workflowId, workflow);

    // Emit workflow created event
    globalEventBus.emit('workflowCreated', {
      workflowId,
      description,
      assignedEmployees,
      steps,
    });

    return workflow;
  }

  private assignEmployees(description: string): string[] {
    const desc = description.toLowerCase();
    const assigned: string[] = [];

    // Logic to assign employees based on task description
    if (desc.includes('proposal') || desc.includes('write')) {
      assigned.push('proposal-writer');
    }

    if (desc.includes('review') || desc.includes('approve') || assigned.length > 0) {
      assigned.push('marketing-director'); // Always review
    }

    if (desc.includes('evidence') || desc.includes('case study') || desc.includes('example')) {
      assigned.push('case-study-writer');
    }

    if (desc.includes('funding') || desc.includes('grant') || desc.includes('budget')) {
      assigned.push('funding-manager');
    }

    if (desc.includes('website') || desc.includes('audit')) {
      assigned.push('website-auditor');
    }

    if (desc.includes('social') || desc.includes('post') || desc.includes('content')) {
      assigned.push('social-media-manager');
    }

    if (desc.includes('email') || desc.includes('campaign')) {
      assigned.push('email-manager');
    }

    if (desc.includes('seo') || desc.includes('keyword') || desc.includes('search')) {
      assigned.push('seo-manager');
    }

    // Remove duplicates
    return Array.from(new Set(assigned));
  }

  private createWorkflowSteps(employees: string[], description: string): WorkflowStep[] {
    const steps: WorkflowStep[] = [];
    let stepIndex = 0;

    if (employees.length === 0) {
      employees = ['proposal-writer'];
    }

    // First step: Sandy hands off to first employee
    steps.push({
      id: `step-${stepIndex++}`,
      type: 'handoff',
      fromEmployee: 'sandy',
      toEmployee: employees[0],
      description: `Brief on: ${description}`,
      duration: 3,
      completed: false,
    });

    // Work steps for each employee (except last)
    for (let i = 0; i < employees.length - 1; i++) {
      steps.push({
        id: `step-${stepIndex++}`,
        type: 'work',
        toEmployee: employees[i],
        description: `Work on: ${description}`,
        duration: 5,
        completed: false,
      });

      // Handoff to next employee
      steps.push({
        id: `step-${stepIndex++}`,
        type: 'handoff',
        fromEmployee: employees[i],
        toEmployee: employees[i + 1],
        description: `Handoff: ${description}`,
        duration: 3,
        completed: false,
      });
    }

    // Final work step
    steps.push({
      id: `step-${stepIndex++}`,
      type: 'work',
      toEmployee: employees[employees.length - 1],
      description: `Complete: ${description}`,
      duration: 5,
      completed: false,
    });

    // Review step (always by Marketing Director)
    if (!employees.includes('marketing-director')) {
      steps.push({
        id: `step-${stepIndex++}`,
        type: 'handoff',
        fromEmployee: employees[employees.length - 1],
        toEmployee: 'marketing-director',
        description: `Review: ${description}`,
        duration: 3,
        completed: false,
      });
    }

    steps.push({
      id: `step-${stepIndex++}`,
      type: 'review',
      toEmployee: 'marketing-director',
      description: `Review and approve: ${description}`,
      duration: 4,
      completed: false,
    });

    return steps;
  }

  executeWorkflow(workflowId: string): void {
    const workflow = this.activeWorkflows.get(workflowId);
    if (!workflow) return;

    workflow.status = 'in-progress';
    globalEventBus.emit('workflowStarted', { workflowId });

    this.executeNextStep(workflowId);
  }

  private executeNextStep(workflowId: string): void {
    const workflow = this.activeWorkflows.get(workflowId);
    if (!workflow) return;

    if (workflow.currentStepIndex >= workflow.steps.length) {
      this.completeWorkflow(workflowId);
      return;
    }

    const step = workflow.steps[workflow.currentStepIndex];
    const stepStartTime = Date.now();
    step.startedAt = stepStartTime;

    globalEventBus.emit('stepStarted', {
      workflowId,
      stepIndex: workflow.currentStepIndex,
      step,
    });

    // Schedule next step
    setTimeout(() => {
      step.completed = true;
      globalEventBus.emit('stepCompleted', {
        workflowId,
        stepIndex: workflow.currentStepIndex,
        step,
      });

      workflow.currentStepIndex++;
      this.executeNextStep(workflowId);
    }, step.duration * 1000);
  }

  private completeWorkflow(workflowId: string): void {
    const workflow = this.activeWorkflows.get(workflowId);
    if (!workflow) return;

    workflow.status = 'completed';

    // Generate and deliver Sandy's summary
    globalSandySummaryGenerator.deliverSummary(workflow, workflowId);

    globalEventBus.emit('workflowCompleted', {
      workflowId,
      workflow,
    });
  }

  getWorkflow(workflowId: string): WorkflowTask | undefined {
    return this.activeWorkflows.get(workflowId);
  }

  getActiveWorkflows(): WorkflowTask[] {
    return Array.from(this.activeWorkflows.values());
  }
}

export const globalWorkflowOrchestrator = new WorkflowOrchestrator();
