import { Router, Request, Response } from 'express';
import { z } from 'zod';
import {
  getAllBusinessObjectives,
  getBusinessObjectiveById,
  upsertBusinessObjective,
  getDashboardContextForDate,
  upsertDashboardContext,
  getDailyDashboardSnapshot,
  saveDailyDashboardSnapshot,
} from '../db/marketingOsRepository.js';
import { generateDailyDashboard } from '../services/dashboardGenerationService.js';
import { nanoid } from 'nanoid';

const router = Router();

const businessObjectiveSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string(),
  successStatement: z.string(),
  metrics: z.array(
    z.object({
      name: z.string(),
      value: z.string().optional(),
      target: z.string().optional(),
    })
  ),
  status: z.enum(['on-track', 'at-risk', 'off-track']).optional(),
  progressPercentage: z.number().min(0).max(100).optional(),
  riskLevel: z.enum(['none', 'low', 'medium', 'high']).optional(),
  riskNotes: z.string().optional(),
});

const dashboardContextSchema = z.object({
  date: z.string(),
  userProvidedContext: z.string(),
  currentTasks: z.array(z.string()).default([]),
  recentActivity: z.array(z.string()).default([]),
  salesFeedback: z.array(z.string()).default([]),
  performanceObservations: z.array(z.string()).default([]),
  decisionsAwaiting: z.array(z.string()).default([]),
});

const dashboardSnapshotSchema = z.object({
  date: z.string(),
  businessObjectiveStatus: z.array(z.any()),
  priorities: z.array(z.any()),
  needsAttention: z.array(z.string()).default([]),
  opportunities: z.array(z.string()).default([]),
  claudeRecommendation: z.object({
    recommendation: z.string(),
    reasoning: z.string(),
    evidence: z.array(z.string()),
    expectedOutcome: z.string(),
  }),
  confidenceNotes: z.string(),
  sourcesUsed: z.array(z.string()),
});

// Get all business objectives
router.get('/objectives', (req: Request, res: Response) => {
  try {
    const objectives = getAllBusinessObjectives();
    res.json({ success: true, result: objectives });
  } catch (err) {
    console.error('Error fetching objectives:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch objectives' });
  }
});

// Get single business objective
router.get('/objectives/:id', (req: Request, res: Response) => {
  try {
    const objective = getBusinessObjectiveById(req.params.id);
    if (!objective) {
      res.status(404).json({ success: false, message: 'Objective not found' });
      return;
    }
    res.json({ success: true, result: objective });
  } catch (err) {
    console.error('Error fetching objective:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch objective' });
  }
});

// Create or update business objective
router.post('/objectives', (req: Request, res: Response) => {
  const parsed = businessObjectiveSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: 'Invalid objective data',
      error: parsed.error.issues.map((i) => i.message).join('; '),
    });
    return;
  }

  try {
    const objective = upsertBusinessObjective(parsed.data);
    res.json({ success: true, result: objective });
  } catch (err) {
    console.error('Error saving objective:', err);
    res.status(500).json({ success: false, message: 'Failed to save objective' });
  }
});

// Get dashboard context for a date
router.get('/dashboard/context/:date', (req: Request, res: Response) => {
  try {
    const context = getDashboardContextForDate(req.params.date);
    if (!context) {
      res.json({ success: true, result: null });
      return;
    }
    res.json({ success: true, result: context });
  } catch (err) {
    console.error('Error fetching dashboard context:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch context' });
  }
});

// Save dashboard context
router.post('/dashboard/context', (req: Request, res: Response) => {
  const parsed = dashboardContextSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: 'Invalid context data',
      error: parsed.error.issues.map((i) => i.message).join('; '),
    });
    return;
  }

  try {
    const context = upsertDashboardContext(parsed.data);
    res.json({ success: true, result: context });
  } catch (err) {
    console.error('Error saving context:', err);
    res.status(500).json({ success: false, message: 'Failed to save context' });
  }
});

// Get today's dashboard snapshot
router.get('/dashboard/today', (req: Request, res: Response) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const snapshot = getDailyDashboardSnapshot(today);
    res.json({ success: true, result: snapshot });
  } catch (err) {
    console.error('Error fetching dashboard:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard' });
  }
});

// Get specific date's dashboard snapshot
router.get('/dashboard/:date', (req: Request, res: Response) => {
  try {
    const snapshot = getDailyDashboardSnapshot(req.params.date);
    res.json({ success: true, result: snapshot });
  } catch (err) {
    console.error('Error fetching dashboard:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard' });
  }
});

// Save dashboard snapshot (after Claude generates it)
router.post('/dashboard/save', (req: Request, res: Response) => {
  const parsed = dashboardSnapshotSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: 'Invalid dashboard data',
      error: parsed.error.issues.map((i) => i.message).join('; '),
    });
    return;
  }

  try {
    const snapshot = {
      id: nanoid(),
      ...parsed.data,
      generatedAt: new Date().toISOString(),
    };
    saveDailyDashboardSnapshot(snapshot);
    res.json({ success: true, result: snapshot });
  } catch (err) {
    console.error('Error saving dashboard:', err);
    res.status(500).json({ success: false, message: 'Failed to save dashboard' });
  }
});

// Generate today's dashboard using Claude
router.post('/dashboard/generate', async (req: Request, res: Response) => {
  const { date } = req.body;
  if (!date) {
    res.status(400).json({ success: false, message: 'Date is required' });
    return;
  }

  try {
    const result = await generateDailyDashboard({ date });
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (err) {
    console.error('Error generating dashboard:', err);
    res.status(500).json({ success: false, message: 'Failed to generate dashboard' });
  }
});

export default router;
