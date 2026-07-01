import type { Employee } from '@/types/employee';
import { SpeechBubble } from './SpeechBubble';

interface PersonCardProps {
  employee: Employee;
  isAssigning?: boolean;
  suggestion?: string;
}

export function PersonCard({ employee, isAssigning, suggestion }: PersonCardProps) {
  const statusColor = {
    available: '#4CAF50',
    busy: '#F9701F',
    'in-review': '#2196F3',
    offline: '#5A6A7A',
    idle: '#8F9194',
  }[employee.status];

  const todoCount = employee.taskQueue.length;
  const hasCurrentTask = !!employee.currentTask;

  return (
    <div className="flex flex-col items-center gap-3 p-4 rounded-lg relative group" style={{ backgroundColor: '#1D2A3A' }}>
      {/* Speech bubble for current task */}
      {hasCurrentTask && (
        <div className="absolute -top-20 w-full px-2">
          <SpeechBubble
            message={employee.currentTask!.title}
            type="task"
            accentColor={statusColor}
          />
        </div>
      )}

      {/* Suggestion bubble */}
      {suggestion && (
        <div className="absolute -top-20 w-full px-2 mt-16">
          <SpeechBubble
            message={suggestion}
            type="status"
            accentColor={statusColor}
          />
        </div>
      )}

      {/* Desk/Workspace */}
      <div className="relative w-20 h-20 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#111B26' }}>
        {/* Desk frame */}
        <div className="absolute inset-1 border border-[#3a4f6a] rounded" />

        {/* Person emoji */}
        <div className="text-4xl">{employee.emoji}</div>

        {/* Status indicator dot */}
        <div
          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#1D2A3A]"
          style={{ backgroundColor: statusColor }}
        />
      </div>

      {/* Name and Role */}
      <div className="text-center">
        <h3 className="font-semibold text-sm text-[#F0F4F8]">{employee.name}</h3>
        <p className="text-xs text-[#8F9194]">{employee.role}</p>
      </div>

      {/* Personality Traits */}
      <div className="flex flex-wrap gap-1 justify-center">
        {employee.personality.slice(0, 2).map((trait, idx) => (
          <span
            key={idx}
            className="text-xs px-2 py-0.5 rounded text-[#F0F4F8]"
            style={{ backgroundColor: 'rgba(249, 112, 31, 0.15)' }}
          >
            {trait}
          </span>
        ))}
      </div>

      {/* Workload Bar */}
      {employee.workloadPercent > 0 && (
        <div className="w-full">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#8F9194]">Workload</span>
            <span className="text-xs font-semibold text-[#F0F4F8]">{employee.workloadPercent}%</span>
          </div>
          <div className="w-full bg-[#111B26] rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${employee.workloadPercent}%`,
                backgroundColor: employee.workloadPercent > 80 ? '#FF6B6B' : employee.workloadPercent > 60 ? '#F9701F' : '#4CAF50',
              }}
            />
          </div>
        </div>
      )}

      {/* To-Do Count */}
      <div className="flex items-center gap-2 text-xs text-[#8F9194]">
        {hasCurrentTask && <span className="text-[#F9701F] font-semibold">📌 Working</span>}
        {todoCount > 0 && (
          <>
            <span>•</span>
            <span className="text-[#2196F3]">{todoCount} to-do{todoCount !== 1 ? 's' : ''}</span>
          </>
        )}
        {!hasCurrentTask && todoCount === 0 && (
          <span className="text-[#4CAF50]">Available</span>
        )}
      </div>

      {/* Assigning animation */}
      {isAssigning && (
        <div className="absolute inset-0 rounded-lg border-2 border-[#F9701F] animate-pulse" />
      )}
    </div>
  );
}
