import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { executeAction } from '../services/actionService.js';
import type { ActionResult } from '../types.js';

// The MCP tools are thin wrappers around the exact same executeAction() used
// by POST /api/actions — same validation, same duplicate detection, same
// confirmation gate, same audit log. Nothing here talks to the database
// directly.

function toToolResult(result: ActionResult) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
    isError: !result.success && !result.requires_confirmation,
  };
}

const BRANDS = ['mtech', 'brentwood', 'radio-links', 'capcom', 'ircl'] as const;
const STATUSES = [
  'backlog',
  'not-started',
  'in-progress',
  'waiting-approval',
  'waiting-john',
  'waiting-customer',
  'approved-ready',
  'blocked',
  'complete',
] as const;
const PRIORITIES = ['high', 'medium', 'low'] as const;

export function createAiOfficeMcpServer(): McpServer {
  const server = new McpServer({
    name: 'ai-office',
    version: '1.0.0',
  });

  server.registerTool(
    'ai_office_create_task',
    {
      title: 'Create a task in AI Office',
      description:
        'Create a new task in AI Office. If a similarly-titled task already exists, this returns possible_duplicates instead of creating one — re-call with confirm_duplicate: true if the user wants to proceed anyway.',
      inputSchema: {
        title: z.string().min(1).describe('Short task title'),
        notes: z.string().optional().describe('Free-text notes or brief for the task'),
        brand: z.enum(BRANDS).optional(),
        priority: z.enum(PRIORITIES).optional(),
        status: z.enum(STATUSES).optional(),
        deadline: z.string().optional().describe('ISO date, e.g. 2026-08-01'),
        campaign_id: z.string().optional(),
        confirm_duplicate: z.boolean().optional().describe('Set true to create even if a similar task already exists'),
        source_conversation_id: z.string().optional(),
      },
    },
    async (input) => {
      const result = executeAction({
        action: 'create_task',
        payload: input,
        source: { type: 'claude', conversationId: input.source_conversation_id },
      });
      return toToolResult(result);
    }
  );

  server.registerTool(
    'ai_office_update_task',
    {
      title: 'Update a task in AI Office',
      description:
        'Update fields on an existing task. This is a higher-risk action: the first call (without confirmed: true) returns a preview of the change instead of applying it — show that to the user, then re-call with confirmed: true once they agree.',
      inputSchema: {
        task_id: z.string().min(1),
        title: z.string().optional(),
        notes: z.string().optional(),
        brand: z.enum(BRANDS).optional(),
        priority: z.enum(PRIORITIES).optional(),
        status: z.enum(STATUSES).optional(),
        deadline: z.string().optional(),
        campaign_id: z.string().nullable().optional(),
        confirmed: z.boolean().optional().describe('Set true only after the user has approved the previewed change'),
      },
    },
    async ({ confirmed, ...payload }) => {
      const result = executeAction({
        action: 'update_task',
        payload,
        source: { type: 'claude' },
        confirmed,
      });
      return toToolResult(result);
    }
  );

  server.registerTool(
    'ai_office_complete_task',
    {
      title: 'Mark a task complete in AI Office',
      description:
        'Mark a task complete. Higher-risk action: the first call (without confirmed: true) returns a preview instead of applying it — confirm with the user first, then re-call with confirmed: true.',
      inputSchema: {
        task_id: z.string().min(1),
        confirmed: z.boolean().optional().describe('Set true only after the user has approved completing this task'),
      },
    },
    async ({ task_id, confirmed }) => {
      const result = executeAction({
        action: 'complete_task',
        payload: { task_id },
        source: { type: 'claude' },
        confirmed,
      });
      return toToolResult(result);
    }
  );

  server.registerTool(
    'ai_office_search_workspace',
    {
      title: 'Search AI Office tasks',
      description: 'Search tasks by keyword, status, or brand. Read-only.',
      inputSchema: {
        query: z.string().optional().describe('Free-text search across title and notes'),
        status: z.enum(STATUSES).optional(),
        brand: z.enum(BRANDS).optional(),
        limit: z.number().int().min(1).max(50).optional(),
      },
    },
    async (input) => {
      const result = executeAction({
        action: 'search_workspace',
        payload: input,
      });
      return toToolResult(result);
    }
  );

  server.registerTool(
    'ai_office_get_context',
    {
      title: "Get today's AI Office context",
      description:
        'Get a concise summary of what the user is working on: tasks due today, overdue tasks, tasks waiting for approval, and tasks in progress. Read-only — use this before answering questions like "what am I working on today?" or "what is overdue?" instead of guessing.',
      inputSchema: {},
    },
    async () => {
      const result = executeAction({
        action: 'get_workspace_context',
        payload: {},
      });
      return toToolResult(result);
    }
  );

  return server;
}
