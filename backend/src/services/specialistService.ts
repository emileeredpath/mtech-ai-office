import { Anthropic } from 'anthropic';
import { query } from '../db/connection.js';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export class SpecialistService {
  // Get specialist employee profile with preferences
  async getSpecialistProfile(employeeId: string) {
    const employeeResult = await query(
      `SELECT * FROM ai_employees WHERE id = $1`,
      [employeeId]
    );

    if (employeeResult.rows.length === 0) {
      throw new Error('Specialist not found');
    }

    const employee = employeeResult.rows[0];

    // Get employee preferences (what they've learned)
    const prefsResult = await query(
      `SELECT * FROM employee_preferences WHERE employee_id = $1 ORDER BY confidence_score DESC`,
      [employeeId]
    );

    return {
      ...employee,
      preferences: prefsResult.rows,
    };
  }

  // Assemble context for specialist (handbook + preferences + knowledge)
  async assembleSpecialistContext(employeeId: string, companyId: string) {
    // Get specialist profile
    const profile = await this.getSpecialistProfile(employeeId);

    // Get employee preferences
    const prefsResult = await query(
      `SELECT * FROM employee_preferences WHERE employee_id = $1`,
      [employeeId]
    );

    const preferences = prefsResult.rows.map((p: any) => `${p.preference_key}: ${p.preference_value}`);

    // For now, create a basic context
    // In a real app, this would load from a database of employee handbooks
    const context = {
      employeeName: profile.name,
      role: profile.role,
      personality: profile.personality || [],
      preferences,
      recentLearnings: preferences.slice(0, 5), // Top 5 preferences
    };

    return context;
  }

  // Generate specialist system prompt
  async generateSystemPrompt(employeeId: string, taskTitle: string, taskDescription: string) {
    const profile = await this.getSpecialistProfile(employeeId);
    const context = await this.assembleSpecialistContext(employeeId, '');

    // Base prompt for all specialists
    const basePrompt = `You are ${profile.name}, a specialist AI employee.

**Your Role**: ${profile.role}
**Your Expertise**: Help users with ${profile.role.toLowerCase()} tasks
**Your Personality**: Professional, helpful, and collaborative

**Current Task**: ${taskTitle}
${taskDescription ? `**Details**: ${taskDescription}` : ''}

**How to Operate**:
1. Ask clarifying questions if needed
2. Provide expert recommendations
3. Create drafts for the user to review
4. Be specific and actionable
5. Explain your reasoning

**User Preferences**:
${context.preferences.length > 0 ? context.preferences.join('\n') : 'No preferences recorded yet'}

Remember: You're collaborating with the user on their task. Listen carefully to their needs and provide expert guidance.`;

    return basePrompt;
  }

  // Get specialist response to a message
  async generateResponse(
    employeeId: string,
    userMessage: string,
    conversationHistory: Array<{ role: string; content: string }>,
    taskTitle: string,
    taskDescription: string
  ): Promise<string> {
    const systemPrompt = await this.generateSystemPrompt(employeeId, taskTitle, taskDescription);

    const messages = [
      ...conversationHistory,
      {
        role: 'user' as const,
        content: userMessage,
      },
    ];

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    return response.content[0].type === 'text' ? response.content[0].text : '';
  }
}

export const specialistService = new SpecialistService();
