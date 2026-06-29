import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { Employee } from '@/types/employee';
import { DeskAvatar } from './DeskAvatar';
import { StatusBadge } from './StatusBadge';
import { WorkloadBar } from './WorkloadBar';
import { Badge } from '@/components/ui/Badge';

interface DeskCardProps {
  employee: Employee;
  index: number;
  isDropTarget?: boolean;
  onDragStart?: (taskId: string, fromEmployeeId: string) => void;
  onDragEnd?: () => void;
}

export function DeskCard({ employee, index, isDropTarget = false, onDragStart, onDragEnd }: DeskCardProps) {
  const navigate = useNavigate();
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  const handleTaskDragStart = (e: React.DragEvent, taskId: string) => {
    e.stopPropagation();
    setDraggingTaskId(taskId);
    const taskData = {
      taskId,
      employeeId: employee.id,
      employeeName: employee.name,
    };
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify(taskData));
    onDragStart?.(taskId, employee.id);
  };

  const handleTaskDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    setDraggingTaskId(null);
    onDragEnd?.();
  };

  return (
    <motion.div
      className={`rounded-xl p-5 cursor-pointer relative overflow-hidden transition-all ${
        isDropTarget ? 'scale-105' : ''
      }`}
      style={{
        backgroundColor: '#1D2A3A',
        border: isDropTarget ? '2px solid #F9701F' : '1px solid #3a4f6a',
        boxShadow: isDropTarget ? 'inset 0 0 12px rgba(249, 112, 31, 0.6)' : undefined,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: 'easeOut' }}
      whileHover={{
        y: -4,
        boxShadow: `0 12px 36px rgba(0,0,0,0.5), 0 0 0 1px ${employee.accentColor}44`,
        transition: { duration: 0.2 },
      }}
      onClick={() => navigate(`/employee/${employee.id}`)}
    >
      {/* Desk number */}
      <span
        className="absolute top-3 right-3 text-xs font-mono opacity-30"
        style={{ color: '#B4B6B9' }}
      >
        #{employee.deskNumber.toString().padStart(2, '0')}
      </span>

      {/* Accent top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
        style={{ backgroundColor: employee.accentColor }}
      />

      {/* Avatar */}
      <div className="flex justify-center mb-4 pt-1">
        <DeskAvatar
          emoji={employee.emoji}
          idleAnimation={employee.idleAnimation}
          accentColor={employee.accentColor}
        />
      </div>

      {/* Name */}
      <h3 className="text-sm font-semibold text-center mb-1" style={{ color: '#F0F4F8' }}>
        {employee.name}
      </h3>

      {/* Status */}
      <div className="flex justify-center mb-3">
        <StatusBadge status={employee.status} />
      </div>

      {/* Current task */}
      <div
        className={`rounded-lg p-2.5 mb-3 text-xs min-h-[42px] ${
          employee.currentTask ? 'cursor-grab active:cursor-grabbing' : ''
        } ${draggingTaskId === employee.currentTask?.id ? 'opacity-50' : ''}`}
        style={{ backgroundColor: '#243347' }}
        draggable={!!employee.currentTask}
        onDragStart={(e) => employee.currentTask && handleTaskDragStart(e as any, employee.currentTask.id)}
        onDragEnd={handleTaskDragEnd as any}
      >
        {employee.currentTask ? (
          <p className="line-clamp-2 leading-relaxed" style={{ color: '#B4B6B9' }}>
            {employee.currentTask.title}
          </p>
        ) : (
          <p className="italic" style={{ color: '#8F9194' }}>No active task</p>
        )}
      </div>

      {/* Queue items preview (first 2) */}
      {employee.taskQueue.length > 0 && (
        <div className="space-y-1.5 mb-3">
          {employee.taskQueue.slice(0, 2).map((task) => (
            <div
              key={task.id}
              className={`rounded-lg p-1.5 text-xs cursor-grab active:cursor-grabbing line-clamp-1 border border-transparent transition-opacity ${
                draggingTaskId === task.id ? 'opacity-50' : ''
              }`}
              style={{ backgroundColor: '#243347', color: '#8F9194' }}
              draggable
              onDragStart={(e) => handleTaskDragStart(e as any, task.id)}
              onDragEnd={handleTaskDragEnd as any}
              title={task.title}
            >
              {task.title}
            </div>
          ))}
        </div>
      )}

      {/* Workload */}
      <WorkloadBar percent={employee.workloadPercent} accentColor={employee.accentColor} />

      {/* Queue count */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-xs" style={{ color: '#8F9194' }}>
          {employee.taskQueue.length} queued
        </span>
        <Badge
          label={`${employee.completedWork.length} done`}
          color={employee.accentColor}
          small
        />
      </div>
    </motion.div>
  );
}
