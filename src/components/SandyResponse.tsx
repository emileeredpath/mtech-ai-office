import type { RoutingResult } from '@/systems/RoutingEngine';

interface SandyResponseProps {
  routing: RoutingResult;
  taskCount: number;
  originalRequest: string;
}

export function SandyResponse({ routing, taskCount, originalRequest }: SandyResponseProps) {
  const collaboratorNames = routing.suggestedCollaborators.map((c) => c.name).join(', ');

  return (
    <div
      className="w-full max-w-2xl mx-auto p-6 rounded-lg border-l-4 shadow-lg space-y-3"
      style={{
        backgroundColor: '#1D2A3A',
        borderColor: '#F9701F',
      }}
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">✅</span>
          <span className="text-[#F0F4F8] font-semibold">{routing.campaignName} created</span>
        </div>
        <p className="text-sm text-[#8F9194]">Request: "{originalRequest}"</p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="flex items-center gap-2 text-[#F9701F] font-semibold mb-1">
            <span>📌</span>
            <span>Primary</span>
          </div>
          <p className="text-[#F0F4F8] ml-6">{routing.primaryAssignee.emoji} {routing.primaryAssignee.name}</p>
        </div>

        {collaboratorNames && (
          <div>
            <div className="flex items-center gap-2 text-[#2196F3] font-semibold mb-1">
              <span>👥</span>
              <span>Supporting</span>
            </div>
            <p className="text-[#F0F4F8] ml-6">{collaboratorNames}</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 text-sm">
        <div>
          <div className="flex items-center gap-2 text-[#4CAF50] font-semibold mb-1">
            <span>📋</span>
            <span>Tasks</span>
          </div>
          <p className="text-[#F0F4F8] ml-6">{taskCount} task{taskCount !== 1 ? 's' : ''} assigned</p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-[#8B5CF6] font-semibold mb-1">
            <span>⏱️</span>
            <span>Next</span>
          </div>
          <p className="text-[#F0F4F8] ml-6">Team begins work</p>
        </div>
      </div>
    </div>
  );
}
