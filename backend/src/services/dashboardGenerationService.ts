import {
  getAllBusinessObjectives,
  getDashboardContextForDate,
  saveDailyDashboardSnapshot,
} from '../db/marketingOsRepository.js';
import { nanoid } from 'nanoid';

interface DashboardGenerationRequest {
  date: string;
}

export async function generateDailyDashboard(req: DashboardGenerationRequest) {
  const { date } = req;

  // Get objectives and context
  const objectives = getAllBusinessObjectives();
  const context = getDashboardContextForDate(date);

  if (objectives.length === 0) {
    return {
      success: false,
      error: 'No business objectives defined. Please add your objectives first.',
    };
  }

  if (!context) {
    return {
      success: false,
      error: 'No context provided for today. Please provide context first.',
    };
  }

  // Build the prompt for Claude
  const prompt = buildPrompt(objectives, context, date);

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error: 'ANTHROPIC_API_KEY environment variable not set',
      };
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-8',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return {
        success: false,
        error: `API error: ${response.status} - ${error}`,
      };
    }

    const message = await response.json() as any;

    // Extract the text response
    const responseText =
      message.content[0].type === 'text'
        ? message.content[0].text
        : 'Failed to generate dashboard';

    // Parse Claude's response as JSON
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return {
        success: false,
        error: 'Failed to parse dashboard generation response',
      };
    }

    const analysis = JSON.parse(jsonMatch[0]);

    // Save the dashboard
    saveDailyDashboardSnapshot({
      id: nanoid(),
      date,
      businessObjectiveStatus: analysis.businessObjectiveStatus,
      priorities: analysis.priorities,
      needsAttention: analysis.needsAttention,
      opportunities: analysis.opportunities,
      claudeRecommendation: analysis.claudeRecommendation,
      confidenceNotes: analysis.confidenceNotes,
      generatedAt: new Date().toISOString(),
      sourcesUsed: ['claude-analysis'],
    });

    return {
      success: true,
      message: 'Dashboard generated and saved',
      dashboard: analysis,
    };
  } catch (err) {
    console.error('Error generating dashboard:', err);
    return {
      success: false,
      error: `Failed to generate dashboard: ${String(err)}`,
    };
  }
}

function buildPrompt(objectives: any[], context: any, date: string): string {
  return `You are a strategic Head of Marketing analyzing business objectives and current context to generate daily priorities.

BUSINESS OBJECTIVES (${date}):
${objectives
  .map(
    (obj) => `
- ${obj.title}
  Success: ${obj.successStatement}
  Current Status: ${obj.status}
  Progress: ${obj.progressPercentage}%
  ${obj.riskNotes ? `Risk: ${obj.riskNotes}` : ''}
  Metrics:
${obj.metrics.map((m: any) => `    * ${m.name}${m.value ? ` (Current: ${m.value})` : ''}${m.target ? ` (Target: ${m.target})` : ''}`).join('\n')}
`
  )
  .join('\n')}

TODAY'S CONTEXT:
${context.userProvidedContext ? `Overview: ${context.userProvidedContext}\n` : ''}

Current Tasks:
${context.currentTasks.map((t: string) => `- ${t}`).join('\n')}

Recent Activity:
${context.recentActivity.map((a: string) => `- ${a}`).join('\n')}

Sales Feedback:
${context.salesFeedback.map((f: string) => `- ${f}`).join('\n')}

Performance Observations:
${context.performanceObservations.map((p: string) => `- ${p}`).join('\n')}

Decisions Awaiting Attention:
${context.decisionsAwaiting.map((d: string) => `- ${d}`).join('\n')}

YOUR TASK:
Analyze this information and generate a structured daily dashboard. You must respond with ONLY a valid JSON object (no markdown, no explanation).

Structure your response as follows:

{
  "businessObjectiveStatus": [
    {
      "objectiveId": "unique-id",
      "title": "Objective Title",
      "status": "on-track|at-risk|off-track",
      "progress": 0-100,
      "risks": ["risk1", "risk2"]
    }
  ],
  "priorities": [
    {
      "rank": 1-5,
      "action": "Specific action to take",
      "why": "Why this matters",
      "objectiveSupported": "Which objective this supports",
      "deadline": "YYYY-MM-DD (optional)",
      "expectedImpact": "What will improve",
      "confidence": 0.0-1.0,
      "evidence": ["evidence1", "evidence2"]
    }
  ],
  "needsAttention": ["item1", "item2"],
  "opportunities": ["opportunity1", "opportunity2"],
  "claudeRecommendation": {
    "recommendation": "Single most important action",
    "reasoning": "Why this is the top recommendation",
    "evidence": ["evidence1", "evidence2"],
    "expectedOutcome": "What will happen if pursued"
  },
  "confidenceNotes": "Notes on confidence level and data gaps",
  "sourcesUsed": ["objectives", "context", "sales-feedback"]
}

GUIDELINES:
- Maximum 5 priorities (rank them 1-5)
- Priorities must clearly support a business objective
- Use evidence from the context to justify each priority
- Always distinguish between facts and interpretations
- Flag risks and opportunities based on the data provided
- Never invent data or figures
- The main recommendation should be the single highest-impact action for today
- Confidence scores should reflect how much evidence supports the recommendation (0.6+ is reasonable)`;
}
