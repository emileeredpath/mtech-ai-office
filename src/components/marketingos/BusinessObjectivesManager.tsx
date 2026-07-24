import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { useMarketingOSStore } from '@/store/useMarketingOSStore';

interface Objective {
  id: string;
  title: string;
  description: string;
  successStatement: string;
  metrics: Array<{ name: string; value?: string; target?: string }>;
  status: 'on-track' | 'at-risk' | 'off-track';
  progressPercentage: number;
  riskLevel: 'none' | 'low' | 'medium' | 'high';
  riskNotes?: string;
}

export function BusinessObjectivesManager() {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const marketingStore = useMarketingOSStore();

  useEffect(() => {
    loadObjectives();
  }, []);

  const loadObjectives = async () => {
    try {
      setLoading(true);
      await marketingStore.loadObjectives();
      setObjectives(marketingStore.businessObjectives);
    } catch (err) {
      console.error('Failed to load objectives:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingId('new');
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading objectives...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Business Objectives (2026)</h2>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add Objective
        </button>
      </div>

      {objectives.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-600 mb-4">No objectives added yet.</p>
          <p className="text-sm text-gray-500 mb-6">Start by adding your 2026 business objectives.</p>
          <button
            onClick={handleAddNew}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Your First Objective
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {objectives.map((obj) => (
            <ObjectiveCard key={obj.id} objective={obj} onEdit={() => setEditingId(obj.id)} />
          ))}
        </div>
      )}

      {showForm && (
        <ObjectiveForm
          objectiveId={editingId === 'new' ? undefined : editingId}
          onClose={() => {
            setShowForm(false);
            setEditingId(null);
            loadObjectives();
          }}
        />
      )}
    </div>
  );
}

function ObjectiveCard({ objective }: { objective: Objective; onEdit: () => void }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{objective.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{objective.description}</p>
        </div>
        <StatusBadge status={objective.status} />
      </div>

      <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
        <p className="text-sm font-medium text-gray-900">Success Metric:</p>
        <p className="text-sm text-gray-700 mt-1">{objective.successStatement}</p>
      </div>

      {objective.metrics.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-700 uppercase mb-2">Key Metrics</p>
          <div className="grid grid-cols-2 gap-2">
            {objective.metrics.map((m, i) => (
              <div key={i} className="bg-gray-50 p-2 rounded text-xs">
                <p className="font-medium text-gray-900">{m.name}</p>
                {m.value && <p className="text-gray-600">Current: {m.value}</p>}
                {m.target && <p className="text-gray-600">Target: {m.target}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm">
          <div>
            <p className="text-xs text-gray-600 uppercase font-medium">Progress</p>
            <p className="font-medium text-gray-900">{objective.progressPercentage}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase font-medium">Risk Level</p>
            <p className="font-medium text-gray-900 capitalize">{objective.riskLevel}</p>
          </div>
        </div>
        <button className="p-2 text-gray-500 hover:text-gray-700 transition">
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ObjectiveForm({ objectiveId, onClose }: { objectiveId?: string; onClose: () => void }) {
  const [formData, setFormData] = useState<Partial<Objective>>({
    title: '',
    description: '',
    successStatement: '',
    metrics: [],
    status: 'on-track',
    progressPercentage: 0,
    riskLevel: 'none',
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!formData.title) {
      alert('Title is required');
      return;
    }

    try {
      setSaving(true);
      const objective = {
        id: objectiveId,
        ...formData,
      };

      await fetch('/api/marketingos/objectives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objective),
      });

      onClose();
    } catch (err) {
      console.error('Failed to save objective:', err);
      alert('Failed to save objective');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Add Business Objective</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Objective Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Grow Service & Repair"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="What does this objective cover?"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Success Statement</label>
            <textarea
              value={formData.successStatement || ''}
              onChange={(e) => setFormData({ ...formData, successStatement: e.target.value })}
              placeholder="How will you know this objective is successful?"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="on-track">On Track</option>
                <option value="at-risk">At Risk</option>
                <option value="off-track">Off Track</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Progress %</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.progressPercentage || 0}
                onChange={(e) => setFormData({ ...formData, progressPercentage: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
              disabled={saving}
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Objective'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string; dot: string }> = {
    'on-track': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
    'at-risk': { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
    'off-track': { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
  };

  const color = colors[status] || colors['on-track'];
  return (
    <div className={`${color.bg} ${color.text} px-2 py-1 rounded text-xs font-medium flex items-center gap-1.5`}>
      <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
      {status === 'on-track' ? 'On Track' : status === 'at-risk' ? 'At Risk' : 'Off Track'}
    </div>
  );
}
