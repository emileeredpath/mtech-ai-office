import { rooms, boardRoom } from '@/data/rooms';

interface OfficeRightSidebarProps {
  selectedRoomId: string | null;
}

export function OfficeRightSidebar({ selectedRoomId }: OfficeRightSidebarProps) {
  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);

  return (
    <>
      {/* Board Room Preview */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '12px',
          minHeight: '140px',
        }}
      >
        <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
          {boardRoom.name}
        </h3>
        <div
          style={{
            aspectRatio: '16/10',
            backgroundColor: 'rgba(192,132,252,0.15)',
            border: '2px dashed rgba(192,132,252,0.4)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            fontSize: '12px',
            marginBottom: '8px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', fontWeight: '600' }}>Conference Room</div>
            <div style={{ fontSize: '11px', marginTop: '4px', opacity: 0.7 }}>→ View full room</div>
          </div>
        </div>
      </div>

      {/* Next Meeting / Team Context */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '12px',
        }}
      >
        <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
          Next Meeting
        </h3>
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
          <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Team Sync</div>
          <div style={{ fontSize: '11px', marginTop: '2px' }}>Today at 2:00 PM</div>
        </div>
        <div
          style={{
            fontSize: '11px',
            color: 'var(--text-secondary)',
            padding: '6px',
            backgroundColor: 'rgba(249,112,31,0.1)',
            borderRadius: '4px',
            marginTop: '6px',
          }}
        >
          📍 Conference Room A
        </div>
      </div>

      {/* Weekly Summary */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '12px',
        }}
      >
        <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
          Weekly Summary
        </h3>
        <div style={{ display: 'grid', gap: '6px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '6px 8px',
              backgroundColor: 'rgba(249,112,31,0.1)',
              borderRadius: '4px',
              fontSize: '11px',
              border: '1px solid rgba(249,112,31,0.2)',
            }}
          >
            <span style={{ color: 'var(--text-secondary)' }}>Campaigns Launched</span>
            <span style={{ fontWeight: 'bold', color: '#F97021' }}>5</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '6px 8px',
              backgroundColor: 'rgba(139,92,246,0.1)',
              borderRadius: '4px',
              fontSize: '11px',
              border: '1px solid rgba(139,92,246,0.2)',
            }}
          >
            <span style={{ color: 'var(--text-secondary)' }}>Tasks Completed</span>
            <span style={{ fontWeight: 'bold', color: '#8B5CF6' }}>18</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '6px 8px',
              backgroundColor: 'rgba(34,197,94,0.1)',
              borderRadius: '4px',
              fontSize: '11px',
              border: '1px solid rgba(34,197,94,0.2)',
            }}
          >
            <span style={{ color: 'var(--text-secondary)' }}>Engagement Rate</span>
            <span style={{ fontWeight: 'bold', color: '#10B981' }}>12.4%</span>
          </div>
        </div>
      </div>

      {/* Team Message from Sandy */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: `2px solid var(--accent-orange)`,
          borderRadius: '8px',
          padding: '12px',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            color: 'var(--accent-orange)',
            marginBottom: '8px',
          }}
        >
          Message from Sandy
        </div>
        <div
          style={{
            fontSize: '11px',
            color: 'var(--text-secondary)',
            lineHeight: '1.5',
            fontStyle: 'italic',
          }}
        >
          "Excellent progress this week! Keep the momentum going on the Q4 campaigns. You're all doing great work."
        </div>
      </div>

      {/* Selected Team Info */}
      {selectedRoom && (
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: `2px solid ${selectedRoom.color}`,
            borderRadius: '8px',
            padding: '12px',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: selectedRoom.color, marginBottom: '6px' }}>
            {selectedRoom.name}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            <div style={{ marginBottom: '4px' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Role:</span> {selectedRoom.title}
            </div>
            <div>
              <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Team Size:</span>{' '}
              {selectedRoom.employeeIds.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
