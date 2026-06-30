import { useState } from 'react';
import { Send, X } from 'lucide-react';
import { globalWorkflowOrchestrator } from '@/systems/WorkflowOrchestrator';
import { globalEventBus } from '@/systems/EventBus';

interface WorkflowBriefingPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WorkflowBriefingPanel({ isOpen, onClose }: WorkflowBriefingPanelProps) {
  const [taskDescription, setTaskDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleBriefTeam = () => {
    if (!taskDescription.trim()) {
      setStatusMessage('Please enter a task description');
      return;
    }

    setIsProcessing(true);
    setStatusMessage('Creating workflow...');

    // Create workflow
    const workflow = globalWorkflowOrchestrator.createWorkflow(taskDescription);

    // Small delay to show the workflow is being created
    setTimeout(() => {
      globalWorkflowOrchestrator.executeWorkflow(workflow.id);
      setStatusMessage('Workflow in progress...');

      // Listen for completion
      const handleCompletion = (data: any) => {
        if (data.workflowId === workflow.id) {
          setStatusMessage('Workflow completed!');
          setTaskDescription('');

          setTimeout(() => {
            setIsProcessing(false);
            setStatusMessage('');
          }, 2000);

          globalEventBus.off('workflowCompleted', handleCompletion);
        }
      };

      globalEventBus.on('workflowCompleted', handleCompletion);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-end">
      <div className="bg-[#1D2A3A] border-t border-[#3a4f6a] w-full max-w-2xl rounded-t-xl shadow-2xl">
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#F0F4F8]">Sandy's Task Briefing</h2>
              <p className="text-xs text-[#8F9194] mt-1">Tell Sandy what needs to be done</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#2E425B] rounded-lg transition-colors"
            >
              <X size={20} className="text-[#8F9194]" />
            </button>
          </div>

          {/* Task Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#C5CEE0]">Task Description</label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="e.g., Create a proposal for the AI marketing platform"
              className="w-full bg-[#2E425B] border border-[#3a4f6a] rounded-lg px-4 py-3 text-[#F0F4F8] placeholder-[#8F9194] focus:outline-none focus:border-[#F9701F] focus:ring-1 focus:ring-[#F9701F]"
              rows={3}
              disabled={isProcessing}
            />
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div className="flex items-center gap-2 text-sm text-[#8F9194]">
              {isProcessing && <div className="animate-spin w-4 h-4 border-2 border-[#F9701F] border-t-transparent rounded-full" />}
              {statusMessage}
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleBriefTeam}
            disabled={isProcessing || !taskDescription.trim()}
            className="w-full bg-[#F9701F] hover:bg-[#e85a0b] disabled:bg-[#3a4f6a] text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Brief the Team
          </button>

          {/* Info */}
          <div className="bg-[#2E425B] border border-[#3a4f6a] rounded-lg p-3">
            <p className="text-xs text-[#8F9194]">
              Sandy will analyze your request, assign the right team members, create a work flow, and coordinate the handoffs. The team will work together to complete the task.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
