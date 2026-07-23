import type { NextFunction, Request, Response } from 'express';

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.API_KEY;
  if (!expected) {
    // Fail closed: an unconfigured server should never silently allow writes.
    res.status(500).json({ success: false, message: 'Server is not configured with an API key.' });
    return;
  }

  const header = req.header('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token || token !== expected) {
    res.status(401).json({ success: false, message: 'Invalid or missing API key.' });
    return;
  }

  next();
}
