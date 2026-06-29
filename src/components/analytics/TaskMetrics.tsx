import type { TasksPriority } from '@/hooks/useAnalytics';

interface TaskMetricsProps {
  completionRate: number;
  tasksByPriority: TasksPriority;
}

export function TaskMetrics({ completionRate, tasksByPriority }: TaskMetricsProps) {
  const highTotal = tasksByPriority.high.done + tasksByPriority.high.pending;
  const medTotal = tasksByPriority.medium.done + tasksByPriority.medium.pending;
  const lowTotal = tasksByPriority.low.done + tasksByPriority.low.pending;

  const highRate = highTotal === 0 ? 0 : Math.round((tasksByPriority.high.done / highTotal) * 100);
  const medRate = medTotal === 0 ? 0 : Math.round((tasksByPriority.medium.done / medTotal) * 100);
  const lowRate = lowTotal === 0 ? 0 : Math.round((tasksByPriority.low.done / lowTotal) * 100);

  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: '#1D2A3A', border: '1px solid #3a4f6a' }}
    >
      <h3 className="text-sm font-semibold mb-4" style={{ color: '#F0F4F8' }}>
        Task Metrics
      </h3>

      {/* Overall Completion */}
      <div className="mb-5">
        <div className="flex items-end gap-2 mb-2">
          <span className="text-xs font-medium" style={{ color: '#8F9194' }}>
            Overall Completion
          </span>
          <span className="text-xl font-bold" style={{ color: '#F9701F' }}>
            {completionRate}%
          </span>
        </div>
        <div
          className="h-2 rounded-full w-full"
          style={{ backgroundColor: '#3a4f6a' }}
        >
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: `${completionRate}%`,
              backgroundColor: '#F9701F',
            }}
          />
        </div>
      </div>

      {/* By Priority */}
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium" style={{ color: '#ef4444' }}>
              High Priority
            </span>
            <span className="text-xs" style={{ color: '#8F9194' }}>
              {tasksByPriority.high.done}/{highTotal}
            </span>
          </div>
          <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: '#3a4f6a' }}>
            <div
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${highRate}%`,
                backgroundColor: '#ef4444',
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium" style={{ color: '#f59e0b' }}>
              Medium Priority
            </span>
            <span className="text-xs" style={{ color: '#8F9194' }}>
              {tasksByPriority.medium.done}/{medTotal}
            </span>
          </div>
          <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: '#3a4f6a' }}>
            <div
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${medRate}%`,
                backgroundColor: '#f59e0b',
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium" style={{ color: '#6b7280' }}>
              Low Priority
            </span>
            <span className="text-xs" style={{ color: '#8F9194' }}>
              {tasksByPriority.low.done}/{lowTotal}
            </span>
          </div>
          <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: '#3a4f6a' }}>
            <div
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${lowRate}%`,
                backgroundColor: '#6b7280',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
