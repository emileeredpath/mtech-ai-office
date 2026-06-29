import { useNavigate } from 'react-router-dom';
import type { Employee } from '@/types/employee';

interface WorkloadChartProps {
  employees: Employee[];
}

function getWorkloadColor(percent: number): string {
  if (percent > 85) return '#ef4444'; // Red
  if (percent > 60) return '#f97316'; // Orange
  if (percent > 30) return '#eab308'; // Yellow
  return '#22c55e'; // Green
}

export function WorkloadChart({ employees }: WorkloadChartProps) {
  const navigate = useNavigate();
  const sorted = [...employees].sort((a, b) => b.workloadPercent - a.workloadPercent);

  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: '#1D2A3A', border: '1px solid #3a4f6a' }}
    >
      <h3 className="text-sm font-semibold mb-4" style={{ color: '#F0F4F8' }}>
        Workload Distribution
      </h3>

      <div className="space-y-3">
        {sorted.map((employee) => {
          const color = getWorkloadColor(employee.workloadPercent);
          return (
            <div
              key={employee.id}
              onClick={() => navigate(`/employee/${employee.id}`)}
              className="cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium flex-shrink-0 w-20" style={{ color: '#8F9194' }}>
                  {employee.emoji} {employee.name.split(' ')[0]}
                </span>
                <span
                  className="text-xs font-bold"
                  style={{ color, opacity: 0.8 }}
                >
                  {employee.workloadPercent}%
                </span>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden w-full group-hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#3a4f6a' }}
              >
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${employee.workloadPercent}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t" style={{ borderColor: '#3a4f6a' }}>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="text-center">
            <div className="w-2 h-2 mx-auto mb-1 rounded-full" style={{ backgroundColor: '#ef4444' }} />
            <span style={{ color: '#8F9194' }}>Overload</span>
          </div>
          <div className="text-center">
            <div className="w-2 h-2 mx-auto mb-1 rounded-full" style={{ backgroundColor: '#f97316' }} />
            <span style={{ color: '#8F9194' }}>Busy</span>
          </div>
          <div className="text-center">
            <div className="w-2 h-2 mx-auto mb-1 rounded-full" style={{ backgroundColor: '#eab308' }} />
            <span style={{ color: '#8F9194' }}>Active</span>
          </div>
          <div className="text-center">
            <div className="w-2 h-2 mx-auto mb-1 rounded-full" style={{ backgroundColor: '#22c55e' }} />
            <span style={{ color: '#8F9194' }}>Light</span>
          </div>
        </div>
      </div>
    </div>
  );
}
