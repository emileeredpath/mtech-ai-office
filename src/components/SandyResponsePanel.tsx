import { useState, useEffect } from 'react';
import { WorkflowTask, WorkflowStep } from '@/systems/WorkflowOrchestrator';
import { X, CheckCircle, Clock, Users } from 'lucide-react';

interface SandyResponsePanelProps {
  workflow: WorkflowTask | null;
  onClose: () => void;
}

export function SandyResponsePanel({ workflow, onClose }: SandyResponsePanelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (workflow) {
      setIsVisible(true);
    }
  }, [workflow]);

  if (!isVisible || !workflow) return null;

  const currentStep = workflow.steps[workflow.currentStepIndex];
  const completedSteps = workflow.steps.filter((s) => s.completed).length;
  const totalSteps = workflow.steps.length;

  // Get unique employees involved
  const employees = new Set<string>();
  workflow.steps.forEach((step) => {
    if (step.fromEmployee && step.fromEmployee !== 'sandy') employees.add(step.fromEmployee);
    employees.add(step.toEmployee);
  });

  return (
    <div
      className="fixed right-0 top-0 bottom-0 w-96 bg-[#1D2A3A] border-l border-[#3a4f6a] shadow-2xl flex flex-col overflow-hidden transition-all duration-300"
      style={{ animation: 'slideInRight 0.3s ease-out' }}
    >
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>

      {/* Header */}
      <div className="bg-[#111B26] border-b border-[#3a4f6a] p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg bg-[#F9701F]">
            🎯
          </div>
          <h3 className="text-sm font-semibold text-[#F0F4F8]">Sandy's Task</h3>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="p-1 hover:bg-[#2E3B4A] rounded transition-colors"
        >
          <X size={18} className="text-[#8F9194]" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Task Description */}
        <div>
          <h4 className="text-xs font-semibold text-[#8F9194] mb-2 uppercase">Task</h4>
          <p className="text-sm text-[#F0F4F8]">{workflow.description}</p>
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold text-[#8F9194] uppercase">Progress</h4>
            <span className="text-xs text-[#F9701F]">
              {completedSteps}/{totalSteps}
            </span>
          </div>
          <div className="w-full bg-[#111B26] rounded-full h-2">
            <div
              className="bg-[#F9701F] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Team Assigned */}
        <div>
          <h4 className="text-xs font-semibold text-[#8F9194] mb-2 flex items-center gap-1 uppercase">
            <Users size={12} />
            Team Assigned
          </h4>
          <div className="flex flex-wrap gap-2">
            {Array.from(employees).map((emp) => (
              <span
                key={emp}
                className="px-2 py-1 bg-[#2E3B4A] rounded text-xs text-[#F0F4F8] border border-[#3a4f6a]"
              >
                {emp.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        </div>

        {/* Workflow Steps */}
        <div>
          <h4 className="text-xs font-semibold text-[#8F9194] mb-2 uppercase">Workflow</h4>
          <div className="space-y-2">
            {workflow.steps.map((step, index) => (
              <div
                key={step.id}
                className={`p-2 rounded border transition-all ${
                  step.completed
                    ? 'bg-[#2E3B4A] border-[#4CAF50]'
                    : step === currentStep
                      ? 'bg-[#F9701F] bg-opacity-10 border-[#F9701F]'
                      : 'bg-[#111B26] border-[#3a4f6a]'
                }`}
              >
                <div className="flex items-start gap-2">
                  {step.completed ? (
                    <CheckCircle size={14} className="text-[#4CAF50] mt-0.5 flex-shrink-0" />
                  ) : step === currentStep ? (
                    <Clock size={14} className="text-[#F9701F] mt-0.5 flex-shrink-0 animate-pulse" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-[#3a4f6a] mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#F0F4F8] capitalize">
                      {step.type} {step.type === 'handoff' && '→'}
                    </p>
                    <p className="text-xs text-[#8F9194] mt-0.5 line-clamp-2">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#111B26] border-t border-[#3a4f6a] p-4 text-xs text-[#8F9194]">
        {workflow.status === 'completed' ? (
          <div className="flex items-center gap-2 text-[#4CAF50]">
            <CheckCircle size={14} />
            Task completed
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#F9701F] rounded-full animate-pulse" />
            Workflow in progress...
          </div>
        )}
      </div>
    </div>
  );
}
