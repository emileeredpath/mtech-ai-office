import type { Employee } from '@/types/employee';
import type { Room } from '@/data/rooms';
import { PersonFigure } from './PersonFigure';
import { SpeechBubble } from '@/components/office/SpeechBubble';

interface OfficeRoomProps {
  room: Room;
  employees: Employee[];
  isActive: boolean;
  onSelect: () => void;
}

export function OfficeRoom({ room, employees, isActive, onSelect }: OfficeRoomProps) {
  const speakingEmployee = employees.find((e) =>
    e.tasks.some((t) => t.status === 'in_progress')
  );
  const speakingTask = speakingEmployee?.tasks.find((t) => t.status === 'in_progress');
  const activeCount = employees.reduce(
    (sum, e) => sum + e.tasks.filter((t) => t.status !== 'complete').length,
    0
  );

  return (
    <button
      onClick={onSelect}
      className="relative w-full h-full rounded-2xl p-4 text-left transition-all flex flex-col"
      style={{
        background: `linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01)), radial-gradient(circle at 30% 0%, ${room.color}14, transparent 60%)`,
        border: `1px solid ${isActive ? room.color : 'rgba(255,255,255,0.08)'}`,
        boxShadow: isActive
          ? `0 0 0 1px ${room.color}55, 0 0 24px ${room.color}44, inset 0 1px 0 rgba(255,255,255,0.05)`
          : 'inset 0 1px 0 rgba(255,255,255,0.03)',
        backdropFilter: 'blur(6px)',
      }}
    >
      {speakingTask && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-56 z-20 pointer-events-none">
          <SpeechBubble message={speakingTask.title} type="task" accentColor={room.color} />
        </div>
      )}

      {/* Room label + glow dot */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold tracking-wide" style={{ color: '#E8ECF1' }}>
          {room.name}
        </span>
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{
            backgroundColor: activeCount > 0 ? room.color : '#3A4657',
            boxShadow: activeCount > 0 ? `0 0 6px ${room.color}` : 'none',
          }}
        />
      </div>

      {/* Screens */}
      <div className="flex gap-1 mb-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex-1 h-6 rounded-sm"
            style={{
              background: `linear-gradient(160deg, ${room.color}33, ${room.color}0A)`,
              border: `1px solid ${room.color}33`,
            }}
          />
        ))}
      </div>

      {/* People at desks */}
      <div className="flex-1 flex items-end justify-center gap-3 pb-1">
        {employees.length === 0 ? (
          <span className="text-xs" style={{ color: '#3A4657' }}>
            Shared space
          </span>
        ) : (
          employees.map((emp) => <PersonFigure key={emp.id} employee={emp} size="sm" />)
        )}
      </div>

      {/* Desk line */}
      <div
        className="h-1 rounded-full mt-2"
        style={{ background: `linear-gradient(90deg, transparent, ${room.color}55, transparent)` }}
      />
    </button>
  );
}
