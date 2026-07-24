import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

interface DashboardContextFormProps {
  date: string;
  onSubmit: (context: {
    userProvidedContext: string;
    currentTasks: string[];
    recentActivity: string[];
    salesFeedback: string[];
    performanceObservations: string[];
    decisionsAwaiting: string[];
  }) => Promise<void>;
  onClose: () => void;
}

export function DashboardContextForm({ date, onSubmit, onClose }: DashboardContextFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userProvidedContext: '',
    currentTasks: '',
    recentActivity: '',
    salesFeedback: '',
    performanceObservations: '',
    decisionsAwaiting: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSubmit({
        userProvidedContext: formData.userProvidedContext,
        currentTasks: formData.currentTasks
          .split('\n')
          .filter((t) => t.trim())
          .map((t) => t.trim()),
        recentActivity: formData.recentActivity
          .split('\n')
          .filter((t) => t.trim())
          .map((t) => t.trim()),
        salesFeedback: formData.salesFeedback
          .split('\n')
          .filter((t) => t.trim())
          .map((t) => t.trim()),
        performanceObservations: formData.performanceObservations
          .split('\n')
          .filter((t) => t.trim())
          .map((t) => t.trim()),
        decisionsAwaiting: formData.decisionsAwaiting
          .split('\n')
          .filter((t) => t.trim())
          .map((t) => t.trim()),
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Provide Context for Today's Dashboard</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Quick Overview (Optional)
            </label>
            <textarea
              value={formData.userProvidedContext}
              onChange={(e) => setFormData({ ...formData, userProvidedContext: e.target.value })}
              placeholder="Any high-level context or observations about today..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Current Tasks (One per line)
            </label>
            <textarea
              value={formData.currentTasks}
              onChange={(e) => setFormData({ ...formData, currentTasks: e.target.value })}
              placeholder="• Service & Repair campaign launching today&#10;• Need to review Education performance&#10;• Meeting with sales at 3pm"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Recent Activity (One per line)
            </label>
            <textarea
              value={formData.recentActivity}
              onChange={(e) => setFormData({ ...formData, recentActivity: e.target.value })}
              placeholder="• Published new Construction blog post&#10;• Recurring revenue declined 3% last month&#10;• CCTV mentioned 4 times by sales team"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Sales Feedback (One per line)
            </label>
            <textarea
              value={formData.salesFeedback}
              onChange={(e) => setFormData({ ...formData, salesFeedback: e.target.value })}
              placeholder="• Construction customers asking more about Equipment Hire&#10;• Strong response to Service & Repair positioning&#10;• Competitor X pushing new CCTV messaging"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Performance Observations (One per line)
            </label>
            <textarea
              value={formData.performanceObservations}
              onChange={(e) => setFormData({ ...formData, performanceObservations: e.target.value })}
              placeholder="• Education organic traffic up 22%&#10;• Construction enquiries down 18%&#10;• Service & Repair page converting at 3.2%"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Decisions Awaiting Attention (One per line)
            </label>
            <textarea
              value={formData.decisionsAwaiting}
              onChange={(e) => setFormData({ ...formData, decisionsAwaiting: e.target.value })}
              placeholder="• Should we pursue CCTV cross-sell opportunity?&#10;• Construction strategy needs review&#10;• Continue or pause paid advertising?"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-xs"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
              disabled={loading}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Generating Dashboard...' : 'Generate Today\'s Dashboard'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
