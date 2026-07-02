export function CollaborationControls() {
  return (
    <div className="flex items-center gap-2 px-6 py-3 overflow-x-auto" style={{
      backgroundColor: 'var(--bg-card)',
    }}>
      <button
        className="px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-all duration-200 hover:shadow-md"
        style={{
          backgroundColor: 'var(--accent-orange)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        + New Task
      </button>
      <button
        className="px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-all duration-200 hover:shadow-md"
        style={{
          backgroundColor: 'transparent',
          color: 'var(--accent-primary)',
          border: `1px solid var(--accent-primary)`,
          cursor: 'pointer',
        }}
      >
        Schedule Meeting
      </button>
      <button
        className="px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-all duration-200 hover:shadow-md"
        style={{
          backgroundColor: 'transparent',
          color: 'var(--text-secondary)',
          border: `1px solid var(--border-color)`,
          cursor: 'pointer',
        }}
      >
        View Reports
      </button>
      <button
        className="px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-all duration-200 hover:shadow-md"
        style={{
          backgroundColor: 'transparent',
          color: 'var(--text-secondary)',
          border: `1px solid var(--border-color)`,
          cursor: 'pointer',
        }}
      >
        Team Chat
      </button>
    </div>
  );
}
