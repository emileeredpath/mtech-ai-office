import type { Employee } from '@/types/employee';

interface BottleneckAnalysisProps {
  overloadedEmployees: Employee[];
  longQueues: Employee[];
  availableCapacity: Employee[];
}

export function BottleneckAnalysis({
  overloadedEmployees,
  longQueues,
  availableCapacity,
}: BottleneckAnalysisProps) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: '#1D2A3A', border: '1px solid #3a4f6a' }}
    >
      <h3 className="text-sm font-semibold mb-4" style={{ color: '#F0F4F8' }}>
        Bottleneck Analysis
      </h3>

      <div className="space-y-4">
        {/* Overloaded */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🚨</span>
            <span className="text-sm font-medium" style={{ color: '#ef4444' }}>
              Overloaded ({overloadedEmployees.length})
            </span>
          </div>
          <div className="space-y-1 pl-6">
            {overloadedEmployees.length === 0 ? (
              <p className="text-xs" style={{ color: '#8F9194' }}>All clear</p>
            ) : (
              overloadedEmployees.map((e) => (
                <div key={e.id} className="text-xs" style={{ color: '#B4B6B9' }}>
                  {e.emoji} <span className="font-medium">{e.name}</span> ({e.workloadPercent}%)
                </div>
              ))
            )}
          </div>
        </div>

        {/* Long Queues */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⚠️</span>
            <span className="text-sm font-medium" style={{ color: '#f59e0b' }}>
              Long Task Queues ({longQueues.length})
            </span>
          </div>
          <div className="space-y-1 pl-6">
            {longQueues.length === 0 ? (
              <p className="text-xs" style={{ color: '#8F9194' }}>All clear</p>
            ) : (
              longQueues.map((e) => (
                <div key={e.id} className="text-xs" style={{ color: '#B4B6B9' }}>
                  {e.emoji} <span className="font-medium">{e.name}</span> ({e.taskQueue.length} waiting)
                </div>
              ))
            )}
          </div>
        </div>

        {/* Available */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">✅</span>
            <span className="text-sm font-medium" style={{ color: '#22c55e' }}>
              Available Capacity ({availableCapacity.length})
            </span>
          </div>
          <div className="space-y-1 pl-6">
            {availableCapacity.length === 0 ? (
              <p className="text-xs" style={{ color: '#8F9194' }}>Everyone busy</p>
            ) : (
              availableCapacity.map((e) => (
                <div key={e.id} className="text-xs" style={{ color: '#B4B6B9' }}>
                  {e.emoji} <span className="font-medium">{e.name}</span> ({e.workloadPercent}%)
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
