import { useOfficeStore } from '@/store/officeStore';
import type { Employee, EmployeeStatus } from '@/types/employee';

export interface EmployeeMetric {
  id: string;
  emoji: string;
  name: string;
  status: EmployeeStatus;
  workloadPercent: number;
  completedCount: number;
  queuedCount: number;
  currentCount: number;
  currentTaskTitle: string | null;
  completionRate: number;
}

export interface TasksPriority {
  high: { done: number; pending: number };
  medium: { done: number; pending: number };
  low: { done: number; pending: number };
}

export interface AnalyticsMetrics {
  activeCount: number;
  totalEmployees: number;
  averageWorkload: number;
  queuedTasksTotal: number;
  completionRate: number;
  totalTasks: number;

  employeeMetrics: EmployeeMetric[];
  tasksByPriority: TasksPriority;
  overloadedEmployees: Employee[];
  longQueues: Employee[];
  availableCapacity: Employee[];
}

export function useAnalytics(): AnalyticsMetrics {
  const employees = useOfficeStore((s) => s.employees);

  const activeCount = employees.filter((e) => e.status === 'busy' || e.status === 'in-review').length;
  const totalEmployees = employees.length;

  const averageWorkload = Math.round(
    employees.reduce((sum, e) => sum + e.workloadPercent, 0) / totalEmployees
  );

  const queuedTasksTotal = employees.reduce((sum, e) => sum + e.taskQueue.length, 0);

  const totalCompleted = employees.reduce((sum, e) => sum + e.completedWork.length, 0);
  const totalPending = employees.reduce((sum, e) => sum + e.taskQueue.length + (e.currentTask ? 1 : 0), 0);
  const totalTasks = totalCompleted + totalPending;
  const completionRate = totalTasks === 0 ? 0 : Math.round((totalCompleted / totalTasks) * 100);

  const employeeMetrics: EmployeeMetric[] = employees.map((e) => {
    const totalEmpTasks = e.completedWork.length + e.taskQueue.length + (e.currentTask ? 1 : 0);
    const empCompletionRate = totalEmpTasks === 0 ? 0 : Math.round((e.completedWork.length / totalEmpTasks) * 100);

    return {
      id: e.id,
      emoji: e.emoji,
      name: e.name,
      status: e.status,
      workloadPercent: e.workloadPercent,
      completedCount: e.completedWork.length,
      queuedCount: e.taskQueue.length,
      currentCount: e.currentTask ? 1 : 0,
      currentTaskTitle: e.currentTask?.title ?? null,
      completionRate: empCompletionRate,
    };
  });

  const tasksByPriority: TasksPriority = {
    high: { done: 0, pending: 0 },
    medium: { done: 0, pending: 0 },
    low: { done: 0, pending: 0 },
  };

  employees.forEach((e) => {
    e.completedWork.forEach((t) => {
      tasksByPriority[t.priority].done++;
    });
    e.taskQueue.forEach((t) => {
      tasksByPriority[t.priority].pending++;
    });
    if (e.currentTask) {
      tasksByPriority[e.currentTask.priority].pending++;
    }
  });

  const overloadedEmployees = employees.filter((e) => e.workloadPercent > 85);
  const longQueues = employees.filter((e) => e.taskQueue.length > 3);
  const availableCapacity = employees.filter((e) => e.workloadPercent < 30);

  return {
    activeCount,
    totalEmployees,
    averageWorkload,
    queuedTasksTotal,
    completionRate,
    totalTasks,
    employeeMetrics,
    tasksByPriority,
    overloadedEmployees,
    longQueues,
    availableCapacity,
  };
}
