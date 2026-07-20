import { useState } from 'react';
import * as api from '@/services/api';

interface TaskOverviewProps {
  workspace: any;
  currentUserId: string;
  onUpdate: () => void;
}

export function TaskOverview({ workspace, currentUserId, onUpdate }: TaskOverviewProps) {
  const [isDelegating, setIsDelegating] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [employees, setEmployees] = useState<any[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  const handleDelegateClick = async () => {
    setLoadingEmployees(true);
    try {
      // In a real app, fetch employees from API
      // For now, we'll use mock data
      setLoadingEmployees(false);
      setIsDelegating(true);
    } catch (err) {
      console.error(err);
      setLoadingEmployees(false);
    }
  };

  const handleDelegate = async () => {
    if (!selectedEmployee) return;

    try {
      await api.delegateTask(workspace.task.id, selectedEmployee, currentUserId);
      setIsDelegating(false);
      setSelectedEmployee('');
      onUpdate();
    } catch (err) {
      console.error('Failed to delegate task:', err);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="space-y-8">
        {/* Task Details */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-bold text-slate-50 mb-4">Task Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400">Title</label>
              <p className="text-slate-100 font-medium mt-1">{workspace.task.title}</p>
            </div>
            <div>
              <label className="text-sm text-slate-400">Priority</label>
              <p className="text-slate-100 font-medium mt-1 capitalize">{workspace.task.priority}</p>
            </div>
            <div>
              <label className="text-sm text-slate-400">Status</label>
              <p className="text-slate-100 font-medium mt-1 capitalize">{workspace.task.status}</p>
            </div>
            <div>
              <label className="text-sm text-slate-400">Created</label>
              <p className="text-slate-100 font-medium mt-1">
                {new Date(workspace.task.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          {workspace.task.description && (
            <div className="mt-6">
              <label className="text-sm text-slate-400">Description</label>
              <p className="text-slate-200 mt-2">{workspace.task.description}</p>
            </div>
          )}
        </div>

        {/* Delegation Section */}
        {!workspace.conversation?.delegated_to_id && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-slate-50 mb-4">Delegate to Specialist</h2>
            <p className="text-slate-400 mb-4">Assign this task to a specialist to get help.</p>
            <button
              onClick={handleDelegateClick}
              className="px-6 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-medium transition-colors"
            >
              Delegate Task
            </button>

            {isDelegating && (
              <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-slate-700">
                <p className="text-sm text-slate-300 mb-3">Select a specialist to delegate to:</p>
                {/* Employee selection would go here */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsDelegating(false)}
                    className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Delegated To Info */}
        {workspace.conversation?.delegated_to_id && (
          <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-700/50">
            <h2 className="text-xl font-bold text-slate-50 mb-4">Delegated</h2>
            <div className="flex items-center gap-3">
              <div className="text-3xl">{workspace.conversation.delegated_to_emoji || '👤'}</div>
              <div>
                <p className="text-slate-100 font-medium">{workspace.conversation.delegated_to_name}</p>
                <p className="text-sm text-slate-400">Assigned on {new Date(workspace.conversation.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="text-slate-300 mt-4">
              Go to the Conversation tab to work with this specialist.
            </p>
          </div>
        )}

        {/* Quick Stats */}
        {workspace.messages && (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="text-sm text-slate-400">Messages</p>
              <p className="text-2xl font-bold text-slate-50 mt-2">{workspace.messages.length}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="text-sm text-slate-400">Drafts</p>
              <p className="text-2xl font-bold text-slate-50 mt-2">{workspace.drafts?.length || 0}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <p className="text-sm text-slate-400">Outputs</p>
              <p className="text-2xl font-bold text-slate-50 mt-2">{workspace.outputs?.length || 0}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
