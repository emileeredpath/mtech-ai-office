import { WorkflowTask } from './WorkflowOrchestrator';
import { globalDialogueSystem } from './DialogueSystem';

export interface SandySummary {
  headline: string;
  details: string[];
  timeline: string;
  nextSteps: string;
}

export class SandySummaryGenerator {
  generateSummary(workflow: WorkflowTask): SandySummary {
    const teamSize = workflow.assignedTo.length;
    const durationSeconds = this.calculateDuration(workflow);
    const durationMinutes = Math.ceil(durationSeconds / 60);

    let headline = `✓ ${workflow.description} - Complete!`;

    const details = [
      `Team involved: ${teamSize} employees`,
      `Steps completed: ${workflow.steps.length} handoffs and work items`,
      `Time taken: ${durationMinutes} minute${durationMinutes > 1 ? 's' : ''}`,
    ];

    // Add specific employee mentions
    const reviewers = workflow.assignedTo.filter((e) =>
      workflow.steps.some((s) => s.type === 'review' && s.toEmployee === e)
    );
    if (reviewers.length > 0) {
      details.push(`Reviewed by: ${this.formatEmployeeList(reviewers)}`);
    }

    return {
      headline,
      details,
      timeline: `${new Date(workflow.createdAt).toLocaleTimeString()}`,
      nextSteps: 'Ready for deployment or next phase.',
    } as const;
  }

  deliverSummary(workflow: WorkflowTask, workflowId: string): void {
    const summary = this.generateSummary(workflow);

    // Sandy speaks the headline
    globalDialogueSystem.addDialogue({
      id: `sandy-summary-${workflowId}-1`,
      speakerId: 'sandy',
      text: summary.headline,
      duration: 3,
      timestamp: Date.now(),
    });

    // Then deliver details after a delay
    setTimeout(() => {
      const detailsText = summary.details.join(' • ');
      globalDialogueSystem.addDialogue({
        id: `sandy-summary-${workflowId}-2`,
        speakerId: 'sandy',
        text: detailsText,
        duration: 4,
        timestamp: Date.now(),
      });
    }, 3500);

    // Finally, next steps
    if (summary.nextSteps) {
      setTimeout(() => {
        globalDialogueSystem.addDialogue({
          id: `sandy-summary-${workflowId}-3`,
          speakerId: 'sandy',
          text: summary.nextSteps,
          duration: 2,
          timestamp: Date.now(),
        });
      }, 8000);
    }
  }

  private calculateDuration(workflow: WorkflowTask): number {
    return workflow.steps.reduce((total, step) => total + step.duration, 0);
  }

  private formatEmployeeList(employees: string[]): string {
    const names: Record<string, string> = {
      sandy: 'Sandy',
      'proposal-writer': 'Proposal Writer',
      'marketing-director': 'Marketing Director',
      'website-auditor': 'Website Auditor',
      'seo-manager': 'SEO Manager',
      'social-media-manager': 'Social Media Manager',
      'email-manager': 'Email Manager',
      'case-study-writer': 'Case Study Writer',
      'funding-manager': 'Funding Manager',
    };

    return employees.map((e) => names[e] || e).join(', ');
  }
}

export const globalSandySummaryGenerator = new SandySummaryGenerator();
