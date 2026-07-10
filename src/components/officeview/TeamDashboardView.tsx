import { useState, useMemo } from 'react';
import { useOfficeStore } from '@/store/officeStore';
import type { Employee } from '@/types/employee';
import { EMPLOYEE_STATUS_COLORS, EMPLOYEE_STATUS_LABELS } from '@/types/employee';
import { SandyDock } from './SandyDock';
import { ROLE_DISPLAY_NAMES } from './OfficeProps';

interface TeamDashboardViewProps {
  sandyThinking: boolean;
  sandyMessage?: string;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string | null) => void;
  onAskSandy?: () => void;
}

export function TeamDashboardView({
  sandyThinking,
  sandyMessage,
  selectedRoomId,
  onSelectRoom,
  onAskSandy,
}: TeamDashboardViewProps) {
  const employees = useOfficeStore((state) => state.employees);
  const selectedEmployeeId = useOfficeStore((state) => state.selectedEmployeeId);
  const selectEmployee = useOfficeStore((state) => state.selectEmployee);
  const [activeTab, setActiveTab] = useState<'active' | 'todo' | 'activity' | 'campaigns'>('active');
  const darkMode = true;

  const stats = useMemo(() => {
    const working = employees.filter((e) => e.status === 'working').length;
    const waiting = employees.filter((e) => e.status === 'waiting_approval').length;
    const blocked = employees.filter((e) => e.status === 'blocked').length;
    const totalTasks = employees.reduce((sum, e) => sum + (e.tasks?.length || 0), 0);
    const totalApprovals = employees.reduce(
      (sum, e) =>
        sum +
        (e.tasks?.filter((t) => t.status === 'waiting_review' || t.status === 'waiting_john_approval')
          .length || 0),
      0
    );
    return { working, waiting, blocked, totalTasks, totalApprovals };
  }, [employees]);

  const isSelected = (id: string) => selectedEmployeeId === id;

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-slate-950 text-slate-50">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-8 py-5">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold">Marketing Team</h1>
            <p className="text-sm text-slate-400 mt-1">
              8 members • {stats.working} working • {stats.waiting} waiting • {stats.blocked} blocked
            </p>
          </div>
          <button
            onClick={onAskSandy}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Ask Sandy
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden p-6 max-w-7xl mx-auto w-full">
        {/* Left: Employee Grid */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sandy Panel - Compact & Calm */}
          <div className="bg-gradient-to-r from-purple-900 to-purple-800 border border-purple-700 rounded-lg p-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center flex-shrink-0 font-bold text-sm text-purple-100">
                S
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-purple-100">
                  {stats.working === employees.length
                    ? 'All team members available.'
                    : `${stats.working} working, ${employees.length - stats.working} available.`}
                </p>
              </div>
              <button
                onClick={onAskSandy}
                className="px-3 py-1.5 bg-purple-700 hover:bg-purple-600 text-white rounded text-xs font-medium transition-colors flex-shrink-0"
              >
                Message
              </button>
            </div>
            <div className="flex gap-4 mt-2 text-xs">
              <div className="text-center">
                <div className="font-bold text-purple-100">{stats.totalTasks}</div>
                <div className="text-purple-300">Assigned</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-purple-100">{stats.totalApprovals}</div>
                <div className="text-purple-300">Waiting</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-purple-100">{stats.blocked}</div>
                <div className="text-purple-300">Blocked</div>
              </div>
            </div>
          </div>

          {/* Employee Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {employees.map((employee) => {
                const statusColor = EMPLOYEE_STATUS_COLORS[employee.status];
                const statusLabel = EMPLOYEE_STATUS_LABELS[employee.status];
                const taskCount = employee.tasks?.length || 0;
                const currentTask = employee.tasks?.[0];
                const workload = Math.min(100, (taskCount / 5) * 100);
                const initials = ROLE_DISPLAY_NAMES[employee.id]
                  ?.split(' ')
                  .map((w) => w[0])
                  .join('')
                  .toUpperCase() || '?';

                return (
                  <div
                    key={employee.id}
                    className={`${
                      isSelected(employee.id)
                        ? 'bg-slate-700 border-orange-500 shadow-lg'
                        : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                    } border rounded-lg p-3 cursor-pointer transition-all`}
                  >
                    {/* Avatar & Title */}
                    <div className="flex items-start gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-100 flex-shrink-0">
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-slate-100">
                          {ROLE_DISPLAY_NAMES[employee.id] || employee.role}
                        </h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor }} />
                          <span className="text-xs text-slate-400">{statusLabel}</span>
                        </div>
                      </div>
                    </div>

                    {/* Task */}
                    <div className="mb-2">
                      <p className="text-xs text-slate-400 mb-1">Task</p>
                      <p className="text-xs text-slate-300 line-clamp-1">
                        {currentTask ? currentTask.title : 'No task'}
                      </p>
                    </div>

                    {/* Workload */}
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-400">Workload</span>
                        <span className={`text-xs font-semibold ${
                          workload > 80 ? 'text-red-400' : workload > 60 ? 'text-amber-400' : 'text-green-400'
                        }`}>
                          {Math.round(workload)}%
                        </span>
                      </div>
                      <div className="w-full h-1 rounded-full bg-slate-700 overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            workload > 80 ? 'bg-red-500' : workload > 60 ? 'bg-amber-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${workload}%` }}
                        />
                      </div>
                    </div>

                    {/* Task Count & Open */}
                    <div className="flex items-center justify-between gap-2">
                      {taskCount > 0 && (
                        <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${
                          taskCount > 3
                            ? 'bg-red-900 text-red-200'
                            : taskCount > 1
                            ? 'bg-amber-900 text-amber-200'
                            : 'bg-green-900 text-green-200'
                        }`}>
                          {taskCount}
                        </span>
                      )}
                      <button
                        onClick={() => {
                          selectEmployee(employee.id);
                          onSelectRoom(employee.id);
                        }}
                        className="flex-1 py-1.5 px-2 bg-orange-600 hover:bg-orange-700 text-white rounded text-xs font-medium transition-colors"
                      >
                        Open
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-72 flex flex-col gap-4 overflow-y-auto">
          {/* Today's To-Do */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <h3 className="font-semibold text-sm mb-2 text-slate-100">Today's To-Do</h3>
            <p className="text-xs text-slate-400">No tasks assigned</p>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <h3 className="font-semibold text-sm mb-2 text-slate-100">Deadlines</h3>
            <p className="text-xs text-slate-400">No deadlines this week</p>
          </div>

          {/* Waiting for Approval */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <h3 className="font-semibold text-sm mb-2 text-slate-100">Waiting for Approval</h3>
            <p className="text-xs text-slate-400">
              {stats.totalApprovals > 0 ? `${stats.totalApprovals} pending` : 'Nothing waiting'}
            </p>
          </div>

          {/* Waiting for John */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <h3 className="font-semibold text-sm mb-2 text-slate-100">Waiting for John</h3>
            <p className="text-xs text-slate-400">
              {(() => {
                const waitingForJohn = employees.reduce(
                  (sum, e) =>
                    sum +
                    (e.tasks?.filter((t) => t.status === 'waiting_john_approval')
                      .length || 0),
                  0
                );
                return waitingForJohn > 0 ? `${waitingForJohn} pending` : 'All reviewed';
              })()}
            </p>
          </div>

          {/* AI Insights */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <h3 className="font-semibold text-sm mb-2 text-slate-100">Insights</h3>
            <p className="text-xs text-slate-400">
              {stats.totalTasks === 0 && stats.blocked === 0
                ? 'Team is ready for work'
                : `${stats.totalTasks} assigned, ${stats.blocked} blocked`}
            </p>
          </div>
        </aside>
      </div>

      {/* Bottom Activity Tabs */}
      <footer className="bg-slate-900 border-t border-slate-800 px-6 py-3 flex flex-col gap-3 max-w-7xl mx-auto w-full">
        <div className="flex gap-4">
          {[
            { id: 'active', label: 'Active', icon: '⚡' },
            { id: 'todo', label: 'To-Do', icon: '✓' },
            { id: 'activity', label: 'Activity', icon: '📝' },
            { id: 'campaigns', label: 'Campaigns', icon: '🎯' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-sm font-medium transition-colors rounded ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-300">
          {activeTab === 'active' &&
            (stats.totalTasks > 0
              ? `${stats.totalTasks} tasks in progress`
              : 'Nothing in progress')}
          {activeTab === 'todo' && 'No tasks assigned'}
          {activeTab === 'activity' && 'Activity will appear here'}
          {activeTab === 'campaigns' && 'Campaigns will appear here'}
        </div>
      </footer>
    </div>
  );
}
