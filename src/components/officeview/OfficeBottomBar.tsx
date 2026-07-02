export function OfficeBottomBar() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        padding: '12px 16px',
        backgroundColor: 'var(--bg-card)',
        fontSize: '12px',
        color: 'var(--text-secondary)',
      }}
    >
      {/* Activity Feed - Left side */}
      <div style={{ flex: 1, display: 'flex', gap: '12px', alignItems: 'center', overflowX: 'auto' }}>
        <div style={{ fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>Activity:</div>
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' }}>
          <div
            style={{
              padding: '4px 8px',
              backgroundColor: 'rgba(249,112,31,0.1)',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            📧 Email campaign queued
          </div>
          <div
            style={{
              padding: '4px 8px',
              backgroundColor: 'rgba(139,92,246,0.1)',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            📊 SEO metrics updated
          </div>
          <div
            style={{
              padding: '4px 8px',
              backgroundColor: 'rgba(34,197,94,0.1)',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            ✅ Site audit complete
          </div>
        </div>
      </div>

      {/* Collaboration Buttons - Center */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          style={{
            padding: '6px 12px',
            backgroundColor: 'var(--accent-orange)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '600',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.opacity = '0.9')}
          onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.opacity = '1')}
        >
          + New Task
        </button>
        <button
          style={{
            padding: '6px 12px',
            backgroundColor: 'transparent',
            color: 'var(--accent-primary)',
            border: `1px solid var(--accent-primary)`,
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '600',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.opacity = '0.8')}
          onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.opacity = '1')}
        >
          Schedule Meeting
        </button>
      </div>
    </div>
  );
}
