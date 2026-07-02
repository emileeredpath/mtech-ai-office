import { useOfficeStore } from '@/store/officeStore';
import { rooms } from '@/data/rooms';
import type { Employee } from '@/types/employee';
import { SandyControlDock } from './SandyControlDock';
import { OfficeDesk } from './OfficeDesk';
import { RightSidebar } from './RightSidebar';
import { CollaborationControls } from './CollaborationControls';

interface RealisticOfficeViewProps {
  activeRoomIds: string[];
  sandyThinking: boolean;
  sandyMessage?: string;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string | null) => void;
}

export function RealisticOfficeView({
  activeRoomIds,
  sandyThinking,
  sandyMessage,
  selectedRoomId,
  onSelectRoom,
}: RealisticOfficeViewProps) {
  const employees = useOfficeStore((state) => state.employees);

  // Map employees to desks - all in one shared office space
  const deskPositions = [
    { x: 10, y: 20, employeeId: 'marketing-director' },
    { x: 35, y: 15, employeeId: 'website-auditor' },
    { x: 60, y: 20, employeeId: 'proposal-writer' },
    { x: 10, y: 50, employeeId: 'email-marketing-manager' },
    { x: 35, y: 55, employeeId: 'seo-ppc-manager' },
    { x: 60, y: 50, employeeId: 'social-media-manager' },
    { x: 10, y: 80, employeeId: 'case-study-writer' },
    { x: 35, y: 85, employeeId: 'funding-rewards-manager' },
  ];

  const getDeskEmployee = (employeeId: string): Employee | undefined => {
    return employees.find((e) => e.id === employeeId);
  };

  const getRoom = (employeeId: string) => {
    return rooms.find((r) => r.employeeIds.includes(employeeId));
  };

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Main office area with desks + right sidebar */}
      <div className="flex-1 flex gap-4 p-6 overflow-hidden">
        {/* Office Space - center/left */}
        <div className="flex-1 relative rounded-lg overflow-hidden" style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(249,112,31,0.05) 100%)',
        }}>
          {/* Warm office background */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(249,112,31,0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(139,92,246,0.05) 0%, transparent 50%)
              `,
              pointerEvents: 'none',
            }}
          />

          {/* Desks in office space */}
          <div className="relative w-full h-full p-8">
            {deskPositions.map((pos) => {
              const employee = getDeskEmployee(pos.employeeId);
              const room = getRoom(pos.employeeId);
              if (!employee) return null;

              const isSelected = selectedRoomId === room?.id;
              const isActive = room && activeRoomIds.includes(room.id);

              return (
                <div
                  key={pos.employeeId}
                  className="absolute cursor-pointer transition-all duration-300"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => onSelectRoom(isSelected ? null : room?.id || null)}
                >
                  <OfficeDesk
                    employee={employee}
                    isSelected={isSelected}
                    isActive={isActive}
                  />
                </div>
              );
            })}

            {/* Sandy Control Dock - top right corner of office space */}
            <div className="absolute top-4 right-4 z-20">
              <SandyControlDock
                isThinking={sandyThinking}
                message={sandyMessage}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-72 flex flex-col gap-4 overflow-y-auto">
          <RightSidebar selectedRoomId={selectedRoomId} />
        </div>
      </div>

      {/* Collaboration Controls - bottom */}
      <div className="border-t" style={{ borderColor: 'var(--border-color)' }}>
        <CollaborationControls />
      </div>
    </div>
  );
}
