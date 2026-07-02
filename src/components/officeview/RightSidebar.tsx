import { rooms, boardRoom } from '@/data/rooms';

interface RightSidebarProps {
  selectedRoomId: string | null;
}

export function RightSidebar({ selectedRoomId }: RightSidebarProps) {
  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);

  return (
    <>
      {/* Board Room Preview */}
      <div
        className="rounded-lg p-4 overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          minHeight: '160px',
        }}
      >
        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {boardRoom.name}
        </h3>
        <div
          className="aspect-video rounded-md mb-2 flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(192,132,252,0.15)',
            border: '1px dashed rgba(192,132,252,0.4)',
            color: 'var(--text-secondary)',
            fontSize: '0.75rem',
          }}
        >
          <div className="text-center">
            <div>Conference Room</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
              View full Board Room tab →
            </div>
          </div>
        </div>
      </div>

      {/* Selected Room Info */}
      {selectedRoom && (
        <div
          className="rounded-lg p-4 transition-all duration-300"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: `2px solid ${selectedRoom.color}`,
          }}
        >
          <h3 className="text-sm font-bold mb-2" style={{ color: selectedRoom.color }}>
            {selectedRoom.name}
          </h3>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            <p style={{ margin: '0 0 4px 0' }}>
              <span style={{ color: 'var(--text-primary)' }}>Role:</span> {selectedRoom.title}
            </p>
            <p style={{ margin: 0 }}>
              <span style={{ color: 'var(--text-primary)' }}>Team Members:</span> {selectedRoom.employeeIds.length}
            </p>
          </div>
        </div>
      )}

      {/* Weekly Report Summary */}
      <div
        className="rounded-lg p-4 flex-1"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
        }}
      >
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Week Summary
        </h3>
        <div className="space-y-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <div
            className="flex justify-between p-2 rounded"
            style={{ backgroundColor: 'rgba(249,112,31,0.1)' }}
          >
            <span>Tasks Completed</span>
            <span style={{ fontWeight: 'bold', color: '#10B981' }}>12</span>
          </div>
          <div
            className="flex justify-between p-2 rounded"
            style={{ backgroundColor: 'rgba(139,92,246,0.1)' }}
          >
            <span>Campaigns Active</span>
            <span style={{ fontWeight: 'bold', color: '#8B5CF6' }}>5</span>
          </div>
          <div
            className="flex justify-between p-2 rounded"
            style={{ backgroundColor: 'rgba(34,197,94,0.1)' }}
          >
            <span>Team Online</span>
            <span style={{ fontWeight: 'bold', color: '#10B981' }}>9/9</span>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div
        className="rounded-lg p-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
        }}
      >
        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Recent Activity
        </h3>
        <div className="space-y-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <div>📧 Email campaign launched</div>
          <div>📊 SEO report updated</div>
          <div>✅ Website review complete</div>
        </div>
      </div>
    </>
  );
}
