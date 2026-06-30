import { useEffect, useState } from 'react';
import { WorkflowTask, WorkflowStep } from '@/systems/WorkflowOrchestrator';
import { globalEventBus } from '@/systems/EventBus';
import { CheckCircle, Clock } from 'lucide-react';

interface WorkflowVisualizationProps {
  workflow: WorkflowTask | null;
}

export function WorkflowVisualization({ workflow }: WorkflowVisualizationProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!workflow) return;

    const handleStepCompleted = (data: any) => {
      if (data.workflowId === workflow.id) {
        setCompletedSteps((prev) => [...prev, data.stepIndex]);
        setActiveStepIndex(data.stepIndex + 1);
      }
    };

    globalEventBus.on('stepCompleted', handleStepCompleted);
    return () => {
      globalEventBus.off('stepCompleted', handleStepCompleted);
    };
  }, [workflow]);

  if (!workflow) return null;

  const getEmployeeName = (employeeId: string): string => {
    const names: Record<string, string> = {
      sandy: 'Sandy',
      'proposal-writer': 'Proposal Writer',
      'marketing-director': 'Marketing Director',
      'website-auditor': 'Website Auditor',
      'seo-manager': 'SEO Manager',
      'social-media-manager': 'Social Media Manager',
      'email-manager': 'Email Manager',
      'case-study-writer': 'Case Study Writer',
      'funding-manager': 'Funding Manager',
    };
    return names[employeeId] || employeeId;
  };

  const getStepTypeLabel = (step: WorkflowStep): string => {
    if (step.type === 'handoff') {
      return '🤝 Handoff';
    } else if (step.type === 'work') {
      return '⚙️ Work';
    } else if (step.type === 'review') {
      return '✓ Review';
    }
    return '';
  };

  return (
    <div className="fixed bottom-6 left-6 w-96 max-h-96 bg-[#1D2A3A] border border-[#3a4f6a] rounded-lg shadow-2xl overflow-hidden z-30">
      {/* Header */}
      <div className="bg-[#2E425B] border-b border-[#3a4f6a] p-3">
        <h3 className="text-sm font-semibold text-[#F0F4F8]">Workflow: {workflow.description}</h3>
        <p className="text-xs text-[#8F9194] mt-1">
          {completedSteps.length} / {workflow.steps.length} steps completed
        </p>
      </div>

      {/* Steps */}
      <div className="p-3 space-y-2 max-h-72 overflow-y-auto">
        {workflow.steps.map((step, index) => {
          const isActive = index === activeStepIndex;
          const isCompleted = completedSteps.includes(index);
          // const isFuture = index > activeStepIndex;

          return (
            <div key={step.id} className="flex gap-2">
              {/* Timeline indicator */}
              <div className="flex flex-col items-center pt-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isCompleted
                      ? 'bg-green-600 text-white'
                      : isActive
                        ? 'bg-[#F9701F] text-white animate-pulse'
                        : 'bg-[#3a4f6a] text-[#8F9194]'
                  }`}
                >
                  {isCompleted ? '✓' : index + 1}
                </div>
                {index < workflow.steps.length - 1 && (
                  <div
                    className={`w-0.5 h-6 ${
                      isCompleted || isActive ? 'bg-green-600' : 'bg-[#3a4f6a]'
                    }`}
                  />
                )}
              </div>

              {/* Step details */}
              <div className="flex-1 py-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold text-[#F0F4F8]">
                      {getStepTypeLabel(step)}
                    </p>
                    <p className="text-xs text-[#8F9194] mt-0.5">
                      {step.fromEmployee && `${getEmployeeName(step.fromEmployee)} → `}
                      {getEmployeeName(step.toEmployee)}
                    </p>
                    <p className="text-xs text-[#C5CEE0] mt-1">{step.description}</p>
                  </div>

                  {isActive && (
                    <Clock size={14} className="text-[#F9701F] flex-shrink-0 mt-1 animate-spin" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-[#3a4f6a] p-3 text-xs text-[#8F9194]">
        {workflow.status === 'completed' ? (
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle size={14} />
            Workflow completed!
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#F9701F] rounded-full animate-pulse" />
            In progress...
          </div>
        )}
      </div>
    </div>
  );
}
