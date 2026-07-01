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

  const statusLabel = {
    available: 'Available',
    busy: 'Working',
    'in-review': 'In Review',
    offline: 'Offline',
    idle: 'Idle',
  }[employee.status];

  const todoCount = employee.taskQueue.length;
  const hasCurrentTask = !!employee.currentTask;

  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-lg relative group transition-all hover:shadow-lg"
      style={{
        backgroundColor: '#1D2A3A',
        border: `2px solid ${isAssigning ? statusColor : 'transparent'}`,
      }}
    >
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
          <SpeechBubble message={suggestion} type="status" accentColor={statusColor} />
        </div>
      )}

      {/* Desk/Workspace */}
      <div className="flex items-start gap-3">
        {/* Person emoji */}
        <div
          className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl flex-shrink-0 relative"
          style={{ backgroundColor: '#111B26', border: `2px solid ${statusColor}` }}
        >
          {employee.emoji}
          {/* Status indicator dot */}
          <div
            className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full border-2 border-[#1D2A3A] animate-pulse"
            style={{ backgroundColor: statusColor }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* Name and Role */}
          <div>
            <h3 className="font-semibold text-sm text-[#F0F4F8] truncate">{employee.name}</h3>
            <p className="text-xs text-[#8F9194]">{employee.role}</p>
          </div>

          {/* Personality Traits */}
          <div className="flex flex-wrap gap-1 mt-2">
            {employee.personality.slice(0, 2).map((trait, idx) => (
              <span
                key={idx}
                className="text-xs px-1.5 py-0.5 rounded text-[#F0F4F8] line-clamp-1"
                style={{ backgroundColor: 'rgba(249, 112, 31, 0.15)' }}
              >
                {trait}
              </span>
            ))}
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-1 mt-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor }} />
            <span className="text-xs font-medium text-[#F0F4F8]">{statusLabel}</span>
          </div>
        </div>
      </div>

      {/* Current Task */}
      {hasCurrentTask && (
        <div
          className="p-2 rounded border-l-2"
          style={{
            backgroundColor: '#111B26',
            borderColor: statusColor,
          }}
        >
          <p className="text-xs text-[#8F9194] uppercase mb-1">Current Task</p>
          <p className="text-xs font-medium text-[#F0F4F8] line-clamp-2">{employee.currentTask.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="text-xs px-1.5 py-0.5 rounded capitalize"
              style={{
                backgroundColor:
                  employee.currentTask.priority === 'high'
                    ? 'rgba(255, 107, 107, 0.2)'
                    : employee.currentTask.priority === 'medium'
                      ? 'rgba(249, 112, 31, 0.2)'
                      : 'rgba(76, 175, 80, 0.2)',
                color:
                  employee.currentTask.priority === 'high'
                    ? '#FF6B6B'
                    : employee.currentTask.priority === 'medium'
                      ? '#F9701F'
                      : '#4CAF50',
              }}
            >
              {employee.currentTask.priority}
            </span>
          </div>
        </div>
      )}

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
                backgroundColor:
                  employee.workloadPercent > 80
                    ? '#FF6B6B'
                    : employee.workloadPercent > 60
                      ? '#F9701F'
                      : '#4CAF50',
              }}
            />
          </div>
        </div>
      )}

      {/* To-Do List */}
      {todoCount > 0 && (
        <div>
          <p className="text-xs text-[#8F9194] uppercase mb-2">To-Do ({todoCount})</p>
          <div className="space-y-1">
            {employee.taskQueue.slice(0, 2).map((task) => (
              <div key={task.id} className="text-xs text-[#F0F4F8] flex items-start gap-2">
                <span className="text-[#8F9194]">→</span>
                <span className="line-clamp-1">{task.title}</span>
              </div>
            ))}
            {todoCount > 2 && (
              <p className="text-xs text-[#2196F3]">+{todoCount - 2} more</p>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!hasCurrentTask && todoCount === 0 && (
        <p className="text-xs text-[#8F9194] text-center py-2">Waiting for Sandy</p>
      )}

      {/* Assigning animation */}
      {isAssigning && (
        <div className="absolute inset-0 rounded-lg border-2 border-[#F9701F] animate-pulse" />
      )}
    </div>
  );
}
