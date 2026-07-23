import type { NextFunction, Request, Response } from 'express';

// Minimal in-memory fixed-window rate limiter. Fine for a single-user,
// single-process deployment; not intended to survive multi-instance scaling.
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 60;

const hits = new Map<string, { count: number; windowStart: number }>();

export function rateLimit(req: Request, res: Response, next: NextFunction) {
  const key = req.header('authorization') || req.ip || 'anonymous';
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(key, { count: 1, windowStart: now });
    next();
    return;
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS_PER_WINDOW) {
    res.status(429).json({ success: false, message: 'Too many requests. Try again shortly.' });
    return;
  }

  next();
}
