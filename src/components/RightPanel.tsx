import { useOfficeStore } from '@/store/officeStore';
import { TASK_STATUS_COLORS, TASK_STATUS_LABELS } from '@/types/employee';
import { CheckCircle2, Clock, AlertTriangle, Sparkles, ShieldAlert } from 'lucide-react';

export function RightPanel() {
  const employees = useOfficeStore((state) => state.employees);

  const allTasks = employees.flatMap((emp) =>
    emp.tasks.map((task) => ({ ...task, employee: emp.name, employeeEmoji: emp.emoji }))
  );

  const todaysTodos = allTasks
    .filter((t) => t.status !== 'complete')
    .sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.priority] - order[b.priority];
    })
    .slice(0, 6);

  const waitingForJohn = allTasks.filter((t) => t.status === 'waiting_john_approval');
  const waitingForApproval = allTasks.filter(
    (t) => t.status === 'waiting_review' || t.status === 'waiting_customer'
  );

  const avgWorkload = employees.length
    ? Math.round(
        employees.reduce((sum, e) => sum + e.tasks.filter((t) => t.status !== 'complete').length, 0) /
          employees.length
      )
    : 0;

  const insights = buildInsights(employees, allTasks);

  return (
    <div
      className="w-80 flex-shrink-0 h-full flex flex-col overflow-hidden border-l"
      style={{ backgroundColor: '#0B0F16', borderColor: '#1E2733' }}
    >
      <div className="flex-1 overflow-y-auto">
        {/* Today's To-Do */}
        <Section icon={<CheckCircle2 size={14} color="#4ADE80" />} title="Today's To-Do">
          {todaysTodos.length === 0 ? (
            <EmptyRow text="Nothing on the list yet — ask Sandy to get started" />
          ) : (
            todaysTodos.map((t) => (
              <div
                key={t.id}
                className="p-2 rounded border-l-2 mb-1.5"
                style={{ backgroundColor: '#141C28', borderColor: TASK_STATUS_COLORS[t.status] }}
              >
                <p className="text-xs font-medium line-clamp-2" style={{ color: '#E8ECF1' }}>
                  {t.title}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs" style={{ color: '#5C6879' }}>
                    {t.employeeEmoji} {t.employee}
                  </span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: `${TASK_STATUS_COLORS[t.status]}22`,
                      color: TASK_STATUS_COLORS[t.status],
                    }}
                  >
                    {TASK_STATUS_LABELS[t.status]}
                  </span>
                </div>
              </div>
            ))
          )}
        </Section>

        {/* Upcoming deadlines - placeholder since no due-date field exists yet */}
        <Section icon={<Clock size={14} color="#60A5FA" />} title="Upcoming Deadlines">
          <EmptyRow text="No deadlines set yet" />
        </Section>

        {/* Team workload */}
        <Section icon={<AlertTriangle size={14} color="#F9701F" />} title="Team Workload">
          <div className="space-y-2">
            {employees.map((emp) => {
              const active = emp.tasks.filter((t) => t.status !== 'complete').length;
              const pct = Math.min(100, active * 25);
              return (
                <div key={emp.id}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span style={{ color: '#E8ECF1' }}>{emp.name}</span>
                    <span style={{ color: '#5C6879' }}>{active} active</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: '#1A2330' }}>
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: pct > 75 ? '#FB6B6B' : pct > 40 ? '#F9701F' : '#4ADE80',
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="text-xs pt-1" style={{ color: '#5C6879' }}>
              Average load: {avgWorkload} active task{avgWorkload !== 1 ? 's' : ''} / person
            </div>
          </div>
        </Section>

        {/* AI insights */}
        <Section icon={<Sparkles size={14} color="#C084FC" />} title="AI Insights">
          {insights.length === 0 ? (
            <EmptyRow text="No insights yet" />
          ) : (
            insights.map((insight, i) => (
              <p key={i} className="text-xs mb-1.5 leading-relaxed" style={{ color: '#8B96A5' }}>
                {insight}
              </p>
            ))
          )}
        </Section>

        {/* Waiting for approval */}
        <Section icon={<ShieldAlert size={14} color="#FBBF24" />} title="Waiting for Approval">
          {waitingForApproval.length === 0 ? (
            <EmptyRow text="Nothing waiting on review" />
          ) : (
            waitingForApproval.map((t) => (
              <div key={t.id} className="text-xs mb-1.5" style={{ color: '#E8ECF1' }}>
                {t.title} <span style={{ color: '#5C6879' }}>— {t.employee}</span>
              </div>
            ))
          )}
        </Section>

        {/* Waiting for John */}
        <Section icon={<ShieldAlert size={14} color="#FB6B6B" />} title="Waiting for John">
          {waitingForJohn.length === 0 ? (
            <EmptyRow text="Nothing waiting on John" />
          ) : (
            waitingForJohn.map((t) => (
              <div key={t.id} className="text-xs mb-1.5" style={{ color: '#E8ECF1' }}>
                {t.title} <span style={{ color: '#5C6879' }}>— {t.employee}</span>
              </div>
            ))
          )}
        </Section>
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="px-5 py-4 border-b" style={{ borderColor: '#1A2330' }}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#E8ECF1' }}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function EmptyRow({ text }: { text: string }) {
  return (
    <p className="text-xs text-center py-2" style={{ color: '#5C6879' }}>
      {text}
    </p>
  );
}

function buildInsights(
  employees: ReturnType<typeof useOfficeStore.getState>['employees'],
  allTasks: Array<{ status: string; employee: string }>
): string[] {
  const insights: string[] = [];

  const overloaded = employees.find((e) => e.tasks.filter((t) => t.status !== 'complete').length >= 4);
  if (overloaded) {
    insights.push(`${overloaded.name} has a heavy queue — consider redistributing.`);
  }

  const blockedCount = allTasks.filter((t) => t.status === 'blocked').length;
  if (blockedCount > 0) {
    insights.push(`${blockedCount} task${blockedCount !== 1 ? 's are' : ' is'} blocked and need attention.`);
  }

  const idleCount = employees.filter((e) => e.tasks.filter((t) => t.status !== 'complete').length === 0).length;
  if (idleCount > 0) {
    insights.push(`${idleCount} team member${idleCount !== 1 ? 's have' : ' has'} capacity for new work.`);
  }

  return insights;
}
