import { test, expect } from '@playwright/test';

const STORAGE_KEY = 'ai-office-data';

test.describe('with a clean, seeded task list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate((key) => localStorage.removeItem(key), STORAGE_KEY);
    await page.reload({ waitUntil: 'commit' });
    await page.waitForSelector('button[title="My Tasks"]');
    await page.click('button[title="My Tasks"]');
    await page.waitForSelector('table');
  });

  test('completing a task from the My Tasks checkbox sets completedAt and history', async ({ page }) => {
    const row = page.locator('tbody tr').first();
    const title = (await row.locator('td').first().innerText()).split('\n')[0];

    await row.locator('td').first().locator('button').first().click();

    const stored = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
    const data = JSON.parse(stored!);
    const task = data.tasks.find((t: any) => t.title === title);

    expect(task.status).toBe('complete');
    expect(task.completedAt).not.toBeNull();
    expect(task.history).toHaveLength(1);
    expect(task.history[0].action).toBe('completed');

    await expect(page.locator(`text=Completed`).first()).toBeVisible();
  });

  test('reopening a task from the detail panel restores its previous status', async ({ page }) => {
    const row = page.locator('tbody tr').first();
    const title = (await row.locator('td').first().innerText()).split('\n')[0];

    // task-1 in seed data starts as 'not-started'
    await row.locator('td').first().locator('button').first().click();
    await page.waitForTimeout(200);

    await page.click(`text=${title}`);
    await page.waitForSelector('text=Reopen');
    await page.click('text=Reopen');
    await page.waitForTimeout(200);

    const stored = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
    const data = JSON.parse(stored!);
    const task = data.tasks.find((t: any) => t.title === title);

    expect(task.status).toBe('not-started');
    expect(task.completedAt).toBeNull();
    expect(task.history).toHaveLength(2);
    expect(task.history[1].action).toBe('reopened');

    await expect(page.locator('text=Mark complete')).toBeVisible();
  });

  test('marking complete from the task detail panel works and updates live', async ({ page }) => {
    const row = page.locator('tbody tr').first();
    const title = (await row.locator('td').first().innerText()).split('\n')[0];

    await page.click(`text=${title}`);
    await page.waitForSelector('text=Mark complete');
    await page.click('text=Mark complete');
    await page.waitForTimeout(200);

    await expect(page.locator('text=Reopen')).toBeVisible();
    await expect(page.locator('text=Completed').first()).toBeVisible();

    const stored = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
    const data = JSON.parse(stored!);
    const task = data.tasks.find((t: any) => t.title === title);
    expect(task.status).toBe('complete');
  });

  test('filtering by Complete status shows only completed tasks', async ({ page }) => {
    const row = page.locator('tbody tr').first();
    await row.locator('td').first().locator('button').first().click();
    await page.waitForTimeout(200);

    await page.locator('select').nth(1).selectOption('complete');
    await page.waitForTimeout(200);

    // Seed already has one completed task, plus the one just completed
    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(2);
  });

  test('already-completed seed task (VoCoVo pricing update) shows in Complete group on load', async ({ page }) => {
    await expect(page.locator('text=Complete (1)')).toBeVisible();
    await expect(page.locator('text=VoCoVo pricing update')).toBeVisible();
  });
});

test('completion written to localStorage rehydrates correctly on next load', async ({ page }) => {
  // Regression test for the original bug: completedAt/history were never
  // written, so a reload lost completion state. This seeds localStorage with
  // a task completed "in a previous session" via an init script (runs before
  // the app's own script), then does a single fresh navigation and asserts
  // the UI reflects it — exactly the code path a real reload exercises:
  // reading completedAt/history back out of localStorage on store init
  // (hydrateDates in useAppStore.ts).
  // A self-contained persisted state, written before the app's own script
  // runs, standing in for "what a previous session's completeTask() call
  // would have left in localStorage."
  const now = new Date().toISOString();
  await page.addInitScript(
    ({ key, timestamp }) => {
      const state = {
        tasks: [
          {
            id: 'task-seeded',
            title: 'Seeded completed task',
            notes: '',
            brand: 'brentwood',
            status: 'complete',
            priority: 'medium',
            deadline: null,
            startDate: null,
            campaignId: null,
            createdAt: timestamp,
            completedAt: timestamp,
            previousStatus: 'not-started',
            history: [
              { id: 'hist-seeded', action: 'completed', timestamp, previousStatus: 'not-started', newStatus: 'complete' },
            ],
            approvalRequired: false,
            approver: null,
            blockerReason: null,
            lastBriefGenerated: null,
          },
        ],
        campaigns: [],
        selectedTaskId: null,
        selectedCampaignId: null,
      };
      localStorage.setItem(key, JSON.stringify(state));
    },
    { key: STORAGE_KEY, timestamp: now }
  );

  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('button[title="My Tasks"]');
  await page.click('button[title="My Tasks"]');
  await page.waitForSelector('table');

  await expect(page.locator('text=Complete (1)')).toBeVisible();
  await expect(page.locator('text=Seeded completed task')).toBeVisible();
  await expect(page.locator('text=Completed').first()).toBeVisible();
});
