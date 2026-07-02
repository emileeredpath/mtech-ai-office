import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useOfficeStore } from '@/store/officeStore';
import { TASK_STATUS_COLORS, TASK_STATUS_LABELS } from '@/types/employee';

type BottomTab = 'active' | 'todo' | 'activity';

export function BottomPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [tab, setTab] = useState<BottomTab>('active');
  const employees = useOfficeStore((state) => state.employees);
  const activityLog = useOfficeStore((state) => state.activityLog);

  const allTasks = employees.flatMap((emp) =>
    emp.tasks.map((task) => ({ ...task, employee: emp.name, employeeEmoji: emp.emoji }))
  );

  const activeTasks = allTasks.filter((t) => t.status === 'in_progress');
  const myTodo = allTasks.filter((t) => t.status !== 'complete' && t.status !== 'in_progress');

  return (
    <div
      className="flex-shrink-0 border-t transition-all duration-300"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
        height: isOpen ? 200 : 40,
      }}
    >
      {/* Header / tabs */}
      <div className="h-10 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-1">
          {(
            [
              ['active', `Active Tasks (${activeTasks.length})`],
              ['todo', `My To-Do (${myTodo.length})`],
              ['activity', `Activity Feed (${activityLog.length})`],
            ] as [BottomTab, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setTab(key);
                setIsOpen(true);
              }}
              className="px-3 py-1.5 rounded text-xs font-medium transition-all duration-300"
              style={{
                color: tab === key && isOpen ? 'var(--accent-orange)' : 'var(--text-secondary)',
                backgroundColor: tab === key && isOpen ? 'rgba(249, 112, 31, 0.12)' : 'transparent',
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="p-1 rounded transition-all duration-300 hover:bg-[#141C28]"
          style={{
            color: 'var(--text-secondary)',
          }}
        >
          {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="px-4 pb-3 overflow-y-auto" style={{ height: 160 }}>
          {tab === 'active' && (
            <TaskGrid
              tasks={activeTasks}
              emptyText="No one is actively working on a task right now."
            />
          )}
          {tab === 'todo' && (
            <TaskGrid tasks={myTodo} emptyText="Nothing queued — ask Sandy to assign work." />
          )}
          {tab === 'activity' && (
            <div className="space-y-1.5">
              {activityLog.length === 0 ? (
                <p className="text-xs py-4 text-center transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
                  Activity will appear here once Sandy starts routing work.
                </p>
              ) : (
                [...activityLog]
                  .reverse()
                  .map((entry) => (
                    <div key={entry.id} className="flex items-start gap-2 text-xs transition-colors duration-300">
                      <span style={{ color: 'var(--text-secondary)' }} className="flex-shrink-0">
                        {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span style={{ color: 'var(--text-primary)' }}>{entry.message}</span>
                    </div>
                  ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TaskGrid({
  tasks,
  emptyText,
}: {
  tasks: Array<{ id: string; title: string; status: string; priority: string; employee: string; employeeEmoji: string }>;
  emptyText: string;
}) {
  if (tasks.length === 0) {
    return (
      <p className="text-xs py-4 text-center transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
        {emptyText}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {tasks.map((t) => (
        <div
          key={t.id}
          className="p-2 rounded border-l-2 transition-colors duration-300"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: TASK_STATUS_COLORS[t.status as keyof typeof TASK_STATUS_COLORS],
          }}
        >
          <p className="text-xs font-medium line-clamp-1 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
            {t.title}
          </p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
              {t.employee}
            </span>
            <span
              className="text-xs px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: `${TASK_STATUS_COLORS[t.status as keyof typeof TASK_STATUS_COLORS]}22`,
                color: TASK_STATUS_COLORS[t.status as keyof typeof TASK_STATUS_COLORS],
              }}
            >
              {TASK_STATUS_LABELS[t.status as keyof typeof TASK_STATUS_LABELS]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
