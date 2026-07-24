import { create } from 'zustand';

interface BusinessObjective {
  id: string;
  title: string;
  description: string;
  successStatement: string;
  metrics: Array<{ name: string; value?: string; target?: string }>;
  status: 'on-track' | 'at-risk' | 'off-track';
  progressPercentage: number;
  riskLevel: 'none' | 'low' | 'medium' | 'high';
  riskNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface DashboardContext {
  date: string;
  userProvidedContext: string;
  currentTasks: string[];
  recentActivity: string[];
  salesFeedback: string[];
  performanceObservations: string[];
  decisionsAwaiting: string[];
}

interface MarketingOSStore {
  businessObjectives: BusinessObjective[];
  loadObjectives: () => Promise<void>;
  saveObjective: (objective: BusinessObjective) => Promise<void>;
  deleteObjective: (id: string) => Promise<void>;
  currentContext: DashboardContext | null;
  loadContextForDate: (date: string) => Promise<void>;
  saveContext: (context: DashboardContext) => Promise<void>;
}

export const useMarketingOSStore = create<MarketingOSStore>((set) => ({
  businessObjectives: [],
  currentContext: null,

  loadObjectives: async () => {
    try {
      const response = await fetch('/api/marketingos/objectives');
      const data = await response.json();
      if (data.success) {
        set({ businessObjectives: data.result });
      }
    } catch (err) {
      console.error('Failed to load objectives:', err);
    }
  },

  saveObjective: async (objective: BusinessObjective) => {
    try {
      const response = await fetch('/api/marketingos/objectives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objective),
      });
      const data = await response.json();
      if (data.success) {
        set((state) => ({
          businessObjectives: state.businessObjectives.some((o) => o.id === objective.id)
            ? state.businessObjectives.map((o) => (o.id === objective.id ? data.result : o))
            : [...state.businessObjectives, data.result],
        }));
      }
    } catch (err) {
      console.error('Failed to save objective:', err);
    }
  },

  deleteObjective: async (id: string) => {
    set((state) => ({
      businessObjectives: state.businessObjectives.filter((o) => o.id !== id),
    }));
  },

  loadContextForDate: async (date: string) => {
    try {
      const response = await fetch(`/api/marketingos/dashboard/context/${date}`);
      const data = await response.json();
      if (data.success && data.result) {
        set({ currentContext: data.result });
      }
    } catch (err) {
      console.error('Failed to load context:', err);
    }
  },

  saveContext: async (context: DashboardContext) => {
    try {
      const response = await fetch('/api/marketingos/dashboard/context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(context),
      });
      const data = await response.json();
      if (data.success) {
        set({ currentContext: data.result });
      }
    } catch (err) {
      console.error('Failed to save context:', err);
    }
  },
}));
