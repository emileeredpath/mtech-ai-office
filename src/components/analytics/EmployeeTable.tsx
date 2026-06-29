import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { EmployeeMetric } from '@/hooks/useAnalytics';
import { StatusBadge } from '@/components/office/StatusBadge';

interface EmployeeTableProps {
  employees: EmployeeMetric[];
}

type SortKey = 'workload' | 'completion' | 'queue';
type SortDir = 'asc' | 'desc';

export function EmployeeTable({ employees }: EmployeeTableProps) {
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState<SortKey>('workload');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const sorted = [...employees].sort((a, b) => {
    let aVal, bVal;
    if (sortKey === 'workload') {
      aVal = a.workloadPercent;
      bVal = b.workloadPercent;
    } else if (sortKey === 'completion') {
      aVal = a.completionRate;
      bVal = b.completionRate;
    } else {
      aVal = a.queuedCount;
      bVal = b.queuedCount;
    }
    return sortDir === 'desc' ? bVal - aVal : aVal - bVal;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const SortIndicator = ({ active, dir }: { active: boolean; dir?: SortDir }) =>
    active ? (
      dir === 'desc' ? (
        <ChevronDown size={14} />
      ) : (
        <ChevronUp size={14} />
      )
    ) : (
      <div className="w-3.5 h-3.5" />
    );

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: '#1D2A3A', border: '1px solid #3a4f6a' }}
    >
      <div
        className="overflow-x-auto"
        style={{ backgroundColor: '#1D2A3A' }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #3a4f6a', backgroundColor: '#111B26' }}>
              <th className="px-4 py-3 text-left" style={{ color: '#8F9194' }}>
                <span className="text-xs font-medium">Employee</span>
              </th>
              <th className="px-4 py-3 text-left" style={{ color: '#8F9194' }}>
                <span className="text-xs font-medium">Status</span>
              </th>
              <th
                className="px-4 py-3 text-left cursor-pointer hover:opacity-80"
                onClick={() => handleSort('workload')}
                style={{ color: '#8F9194' }}
              >
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium">Workload</span>
                  <SortIndicator active={sortKey === 'workload'} dir={sortDir} />
                </div>
              </th>
              <th className="px-4 py-3 text-left" style={{ color: '#8F9194' }}>
                <span className="text-xs font-medium">Current</span>
              </th>
              <th className="px-4 py-3 text-left" style={{ color: '#8F9194' }}>
                <span className="text-xs font-medium">Queue</span>
              </th>
              <th className="px-4 py-3 text-left" style={{ color: '#8F9194' }}>
                <span className="text-xs font-medium">Done</span>
              </th>
              <th
                className="px-4 py-3 text-left cursor-pointer hover:opacity-80"
                onClick={() => handleSort('completion')}
                style={{ color: '#8F9194' }}
              >
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium">Rate</span>
                  <SortIndicator active={sortKey === 'completion'} dir={sortDir} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((emp, idx) => (
              <tr
                key={emp.id}
                onClick={() => navigate(`/employee/${emp.id}`)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: idx % 2 === 0 ? '#1D2A3A' : '#17222f',
                  borderBottom: '1px solid #3a4f6a',
                }}
              >
                <td className="px-4 py-3" style={{ color: '#F0F4F8' }}>
                  <div className="flex items-center gap-2">
                    <span>{emp.emoji}</span>
                    <span className="font-medium">{emp.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={emp.status} />
                </td>
                <td className="px-4 py-3" style={{ color: '#B4B6B9' }}>
                  {emp.workloadPercent}%
                </td>
                <td className="px-4 py-3" style={{ color: '#B4B6B9' }}>
                  {emp.currentCount > 0 ? (
                    <div className="text-xs truncate max-w-xs" title={emp.currentTaskTitle || ''}>
                      {emp.currentTaskTitle}
                    </div>
                  ) : (
                    <span style={{ color: '#8F9194' }}>—</span>
                  )}
                </td>
                <td className="px-4 py-3" style={{ color: '#F9701F', fontWeight: 600 }}>
                  {emp.queuedCount}
                </td>
                <td className="px-4 py-3" style={{ color: '#B4B6B9' }}>
                  {emp.completedCount}
                </td>
                <td className="px-4 py-3" style={{ color: '#B4B6B9' }}>
                  {emp.completionRate}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
