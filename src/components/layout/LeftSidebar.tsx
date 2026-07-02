import {
  Home,
  Users,
  MessageCircle,
  CheckSquare,
  Calendar,
  FileText,
  Megaphone,
  BarChart3,
  HelpCircle,
} from 'lucide-react';

export type NavKey = 'home' | 'team' | 'messages' | 'tasks' | 'calendar' | 'files' | 'campaigns' | 'analytics' | 'help';

interface LeftSidebarProps {
  active: NavKey;
  onSelect: (key: NavKey) => void;
}

const NAV_ITEMS: { key: NavKey; icon: React.ReactNode; label: string }[] = [
  { key: 'home', icon: <Home size={20} />, label: 'Home' },
  { key: 'team', icon: <Users size={20} />, label: 'Team' },
  { key: 'messages', icon: <MessageCircle size={20} />, label: 'Messages' },
  { key: 'tasks', icon: <CheckSquare size={20} />, label: 'Tasks' },
  { key: 'calendar', icon: <Calendar size={20} />, label: 'Calendar' },
  { key: 'files', icon: <FileText size={20} />, label: 'Files' },
  { key: 'campaigns', icon: <Megaphone size={20} />, label: 'Campaigns' },
  { key: 'analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
  { key: 'help', icon: <HelpCircle size={20} />, label: 'Help' },
];

export function LeftSidebar({ active, onSelect }: LeftSidebarProps) {
  return (
    <div
      className="flex flex-col h-screen w-20 flex-shrink-0 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
      }}
    >
      <div
        className="h-16 flex items-center justify-center border-b flex-shrink-0 transition-colors duration-300"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, var(--accent-orange), #FFB067)',
            color: 'white',
          }}
        >
          AI
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 space-y-2 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              className="w-full h-12 rounded-lg flex items-center justify-center relative group transition-all duration-300"
              style={{
                backgroundColor: isActive ? 'rgba(249, 112, 31, 0.15)' : 'transparent',
                boxShadow: isActive ? 'inset 0 0 0 1px rgba(249, 112, 31, 0.4)' : 'none',
              }}
              title={item.label}
            >
              <div
                className="transition-colors duration-300"
                style={{ color: isActive ? 'var(--accent-orange)' : 'var(--text-secondary)' }}
              >
                {item.icon}
              </div>

              <div
                className="absolute left-full ml-2 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50 duration-300"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                }}
              >
                {item.label}
              </div>
            </button>
          );
        })}
      </nav>

      <div
        className="h-16 border-t flex items-center justify-center flex-shrink-0 transition-colors duration-300"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <button
          className="w-10 h-10 rounded-full font-bold text-white hover:opacity-80 transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, var(--accent-orange), #FF9E64)',
          }}
        >
          E
        </button>
      </div>
    </div>
  );
}
