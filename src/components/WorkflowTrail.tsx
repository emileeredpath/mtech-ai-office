import type { Employee } from '@/types/employee';
import type { RoutingResult } from '@/systems/RoutingEngine';

interface WorkflowTrailProps {
  routing: RoutingResult;
  isActive: boolean;
}

export function WorkflowTrail({ routing, isActive }: WorkflowTrailProps) {
  if (!isActive) return null;

  const steps = [
    { type: 'sandy', label: 'Sandy', emoji: '🧠', description: 'Routes work' },
    { type: 'primary', label: routing.primaryAssignee.name, emoji: routing.primaryAssignee.emoji, description: 'Primary' },
    ...routing.suggestedCollaborators.map((emp) => ({
      type: 'collaborator',
      label: emp.name,
      emoji: emp.emoji,
      description: 'Supporting',
    })),
    { type: 'complete', label: 'Complete', emoji: '✅', description: 'Done' },
  ];

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
      <div
        className="px-6 py-4 rounded-lg shadow-lg backdrop-blur-sm"
        style={{
          backgroundColor: 'rgba(15, 20, 25, 0.95)',
          border: '1px solid rgba(249, 112, 31, 0.3)',
        }}
      >
        {/* Trail */}
        <div className="flex items-center gap-3">
          {steps.map((step, idx) => (
            <div key={`${step.type}-${step.label}`} className="flex items-center gap-3">
              {/* Step */}
              <div
                className="flex flex-col items-center gap-1 px-3 py-2 rounded"
                style={{
                  backgroundColor: idx === 0 ? 'rgba(249, 112, 31, 0.15)' : 'rgba(33, 150, 243, 0.1)',
                  animation: idx === 0 ? 'pulse 1.5s ease-in-out infinite' : 'none',
                }}
              >
                <div className="text-lg">{step.emoji}</div>
                <div className="text-xs font-semibold text-[#F0F4F8]">{step.label}</div>
                <div className="text-xs text-[#8F9194]">{step.description}</div>
              </div>

              {/* Arrow */}
              {idx < steps.length - 1 && (
                <div className="text-[#F9701F] font-bold">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
