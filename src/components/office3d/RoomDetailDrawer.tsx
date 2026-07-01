import { X, Play, CheckCircle2 } from 'lucide-react';
import type { Room } from '@/data/rooms';
import { useOfficeStore } from '@/store/officeStore';
import { TASK_STATUS_COLORS, TASK_STATUS_LABELS } from '@/types/employee';
import { PersonFigure } from './PersonFigure';

interface RoomDetailDrawerProps {
  room: Room;
  onClose: () => void;
}

export function RoomDetailDrawer({ room, onClose }: RoomDetailDrawerProps) {
  const employees = useOfficeStore((state) => state.employees).filter((e) =>
    room.employeeIds.includes(e.id)
  );
  const startTask = useOfficeStore((state) => state.startTask);
  const completeTask = useOfficeStore((state) => state.completeTask);

  return (
    <div
      className="absolute top-0 right-0 h-full w-80 z-30 border-l flex flex-col"
      style={{ backgroundColor: '#0B0F16', borderColor: room.color + '55' }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: '#1A2330' }}>
        <div>
          <h3 className="text-sm font-semibold" style={{ color: '#E8ECF1' }}>
            {room.name}
          </h3>
          <p className="text-xs" style={{ color: '#5C6879' }}>
            {employees.length} team member{employees.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button onClick={onClose} className="p-1 rounded hover:bg-[#1A2330]">
          <X size={16} color="#8B96A5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {employees.length === 0 && (
          <p className="text-xs text-center py-6" style={{ color: '#5C6879' }}>
            This is a shared meeting space — no one is permanently based here.
          </p>
        )}

        {employees.map((emp) => (
          <div key={emp.id} className="rounded-lg p-3" style={{ backgroundColor: '#141C28' }}>
            <div className="flex items-center gap-3 mb-3">
              <PersonFigure employee={emp} size="md" />
              <div>
                <p className="text-sm font-medium" style={{ color: '#E8ECF1' }}>
                  {emp.name}
                </p>
                <p className="text-xs" style={{ color: '#5C6879' }}>
                  {emp.role}
                </p>
              </div>
            </div>

            {emp.tasks.filter((t) => t.status !== 'complete').length === 0 ? (
              <p className="text-xs" style={{ color: '#5C6879' }}>
                Waiting for Sandy
              </p>
            ) : (
              <div className="space-y-2">
                {emp.tasks
                  .filter((t) => t.status !== 'complete')
                  .map((task) => (
                    <div
                      key={task.id}
                      className="rounded border-l-2 p-2"
                      style={{ backgroundColor: '#0F1620', borderColor: TASK_STATUS_COLORS[task.status] }}
                    >
                      <p className="text-xs font-medium" style={{ color: '#E8ECF1' }}>
                        {task.title}
                      </p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span
                          className="text-xs px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: `${TASK_STATUS_COLORS[task.status]}22`,
                            color: TASK_STATUS_COLORS[task.status],
                          }}
                        >
                          {TASK_STATUS_LABELS[task.status]}
                        </span>
                        <div className="flex gap-1">
                          {task.status !== 'in_progress' && (
                            <button
                              onClick={() => startTask(emp.id, task.id)}
                              className="p-1 rounded hover:bg-[#1A2330]"
                              title="Start"
                            >
                              <Play size={12} color="#F9701F" />
                            </button>
                          )}
                          <button
                            onClick={() => completeTask(emp.id, task.id)}
                            className="p-1 rounded hover:bg-[#1A2330]"
                            title="Complete"
                          >
                            <CheckCircle2 size={12} color="#4ADE80" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
