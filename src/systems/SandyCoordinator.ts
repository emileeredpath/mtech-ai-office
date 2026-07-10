import type { Employee, Task, TaskStatus } from '@/types/employee';

declare global {
  interface ImportMeta {
    env: {
      VITE_ANTHROPIC_API_KEY: string;
      [key: string]: any;
    };
  }
}

export interface CampaignWorkflow {
  campaignName: string;
  summary: string;
  tasks: TaskDefinition[];
}

export interface TaskDefinition {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  suggestedAssignee?: string;
}

export type SandyIntent = 'brief' | 'task_query' | 'campaign_query' | 'unknown';

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

export class SandyCoordinator {
  private employees: Employee[];

  constructor(employees: Employee[]) {
    this.employees = employees;
  }

  /**
   * Detect user intent from input
   */
  detectIntent(input: string): SandyIntent {
    const lower = input.toLowerCase();

    if (lower.includes('what are my tasks') || lower.includes('show my tasks') || lower.includes('my tasks')) {
      return 'task_query';
    }

    if (
      lower.includes('what\'s outstanding') ||
      lower.includes('what is outstanding') ||
      lower.includes('outstanding on') ||
      lower.includes('status of') ||
      lower.includes('update on')
    ) {
      return 'campaign_query';
    }

    if (
      lower.match(/^(create|plan|brief|launch|start|develop|build)\b/) ||
      lower.includes('campaign') ||
      lower.includes('initiative') ||
      lower.length > 20
    ) {
      return 'brief';
    }

    return 'unknown';
  }

  /**
   * Extract campaign name from input
   */
  extractCampaignName(input: string): string {
    const briefMatch = input.match(/(?:campaign|brief|project|initiative)?\s*:?\s*([^.!?]{10,100})/i);
    if (briefMatch) {
      return briefMatch[1].trim().substring(0, 50);
    }
    return `Campaign - ${new Date().toLocaleDateString()}`;
  }

  /**
   * Extract campaign name from query for lookup
   */
  extractCampaignForQuery(input: string): string | null {
    const match = input.match(/on\s+(?:the\s+)?([^?!.]+)/i);
    if (match) {
      return match[1].trim();
    }
    return null;
  }

  /**
   * Call Claude API to generate campaign workflow
   */
  async generateCampaignWorkflow(brief: string): Promise<CampaignWorkflow> {
    if (!ANTHROPIC_API_KEY) {
      throw new Error('VITE_ANTHROPIC_API_KEY environment variable not set');
    }

    const systemPrompt = `You are Sandy, a marketing coordinator at a marketing agency. Your job is to break down marketing campaign briefs into actionable task workflows.

When given a campaign brief, respond with a JSON object containing:
- campaignName: The campaign name (string, max 50 chars)
- summary: One sentence summary of the campaign (string, max 100 chars)
- tasks: Array of task objects, each with:
  - title: Task title (string, clear and specific)
  - description: Task description (string, brief)
  - priority: 'high', 'medium', or 'low'
  - suggestedAssignee: Optional role suggestion (e.g., 'Email Marketing Manager', 'Social Media Manager', 'Website Manager', 'Proposal Writer', 'Case Study Writer')

Generate 5-15 realistic marketing tasks in logical sequence. Think about dependencies: research first, then creative work, then reviews, then distribution.

Examples of tasks might include:
- Create case study outline/content/review
- Design social media graphics
- Write email copy
- Update website
- Schedule posts
- Get approval from John
- Launch campaign

Keep tasks specific, actionable, and in dependency order.

Respond ONLY with valid JSON, no other text.`;

    const userMessage = `Campaign Brief: ${brief}

Team context:
- Marketing Director
- Website Manager
- SEO & PPC Manager
- Email Marketing Manager
- Proposal Writer
- Social Media Manager
- Case Study Writer
- Funding & Rewards Manager

Generate a complete marketing campaign workflow. Focus on practical, achievable tasks.`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          system: systemPrompt,
          messages: [
            {
              role: 'user',
              content: userMessage,
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Claude API error: ${error.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const textContent = data.content[0];

      if (textContent.type !== 'text') {
        throw new Error('Unexpected response type from Claude');
      }

      const parsed = JSON.parse(textContent.text);
      return {
        campaignName: parsed.campaignName || this.extractCampaignName(brief),
        summary: parsed.summary || 'Marketing campaign',
        tasks: parsed.tasks || [],
      };
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Failed to parse Claude API response');
      }
      throw error;
    }
  }

  /**
   * Convert workflow tasks to storable Task objects
   */
  createTasksFromWorkflow(
    workflow: CampaignWorkflow,
    employees: Employee[]
  ): Array<{ employeeId: string; task: Omit<Task, 'status' | 'updatedAt' | 'notes'> }> {
    const result: Array<{ employeeId: string; task: Omit<Task, 'status' | 'updatedAt' | 'notes'> }> = [];

    for (const taskDef of workflow.tasks) {
      let assigneeId = 'marketing-director';

      if (taskDef.suggestedAssignee) {
        const lower = taskDef.suggestedAssignee.toLowerCase();
        if (lower.includes('social')) assigneeId = 'social-media-manager';
        else if (lower.includes('email')) assigneeId = 'email-marketing-manager';
        else if (lower.includes('seo') || lower.includes('ppc')) assigneeId = 'seo-ppc-manager';
        else if (lower.includes('website')) assigneeId = 'website-auditor';
        else if (lower.includes('case study')) assigneeId = 'case-study-writer';
        else if (lower.includes('proposal')) assigneeId = 'proposal-writer';
        else if (lower.includes('funding') || lower.includes('rewards')) assigneeId = 'funding-rewards-manager';
      }

      result.push({
        employeeId: assigneeId,
        task: {
          id: `task-${workflow.campaignName}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: taskDef.title,
          description: taskDef.description,
          priority: taskDef.priority,
          createdAt: new Date().toISOString(),
          assignedBy: 'sandy',
          campaign: workflow.campaignName,
        },
      });
    }

    return result;
  }

  /**
   * Generate response message for brief submission
   */
  generateBriefResponse(workflow: CampaignWorkflow, taskCount: number): string {
    const lines = [
      `Campaign: ${workflow.campaignName}`,
      workflow.summary,
      `Created ${taskCount} tasks across the team.`,
    ];

    return lines.join('\n');
  }

  /**
   * Generate response for task queries
   */
  generateTaskQueryResponse(allTasks: Task[], openTasks: Task[]): string {
    if (openTasks.length === 0) {
      return 'No open tasks. Team is caught up!';
    }

    const byCampaign = new Map<string, Task[]>();
    for (const task of openTasks) {
      const campaign = task.campaign || 'Other';
      if (!byCampaign.has(campaign)) {
        byCampaign.set(campaign, []);
      }
      byCampaign.get(campaign)!.push(task);
    }

    const lines: string[] = [];
    for (const [campaign, tasks] of byCampaign.entries()) {
      lines.push(`${campaign} (${tasks.length}):`);
      tasks.slice(0, 3).forEach((t) => {
        lines.push(`  • ${t.title}`);
      });
      if (tasks.length > 3) {
        lines.push(`  ... and ${tasks.length - 3} more`);
      }
    }

    return lines.join('\n');
  }

  /**
   * Generate response for campaign-specific queries
   */
  generateCampaignQueryResponse(campaignName: string, tasks: Task[]): string {
    if (tasks.length === 0) {
      return `No tasks found for "${campaignName}".`;
    }

    const byStatus = new Map<TaskStatus, Task[]>();
    for (const task of tasks) {
      if (!byStatus.has(task.status)) {
        byStatus.set(task.status, []);
      }
      byStatus.get(task.status)!.push(task);
    }

    const lines: string[] = [`${campaignName} Status:`];

    const statusOrder: TaskStatus[] = [
      'in_progress',
      'waiting_review',
      'waiting_john_approval',
      'assigned',
      'awaiting_brief',
      'blocked',
      'complete',
    ];

    for (const status of statusOrder) {
      const tasksWithStatus = byStatus.get(status);
      if (tasksWithStatus && tasksWithStatus.length > 0) {
        lines.push(`${status.replace(/_/g, ' ')}: ${tasksWithStatus.length}`);
        tasksWithStatus.slice(0, 2).forEach((t) => {
          lines.push(`  • ${t.title}`);
        });
      }
    }

    return lines.join('\n');
  }

  /**
   * Suggest missing tasks for a campaign based on best practices
   */
  suggestMissingTasks(campaignName: string, existingTasks: Task[], workflow?: CampaignWorkflow): Task[] {
    const suggestions: Task[] = [];
    const existingTitles = new Set(existingTasks.map((t) => t.title.toLowerCase()));

    const commonTasks = [
      { title: 'Get approval from John', priority: 'high' as const },
      { title: 'Schedule content distribution', priority: 'medium' as const },
      { title: 'Create analytics dashboard', priority: 'low' as const },
    ];

    for (const task of commonTasks) {
      if (!existingTitles.has(task.title.toLowerCase())) {
        suggestions.push({
          id: `suggestion-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: task.title,
          description: `Recommended for ${campaignName}`,
          priority: task.priority,
          status: 'backlog',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          notes: [],
          campaign: campaignName,
          assignedBy: 'sandy',
        });
      }
    }

    return suggestions;
  }
}
