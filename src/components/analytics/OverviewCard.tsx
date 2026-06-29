interface OverviewCardProps {
  label: string;
  value: string | number;
  accentColor?: string;
  icon?: React.ReactNode;
}

export function OverviewCard({
  label,
  value,
  accentColor = '#F9701F',
  icon,
}: OverviewCardProps) {
  return (
    <div
      className="rounded-xl p-5 relative overflow-hidden"
      style={{ backgroundColor: '#1D2A3A', border: '1px solid #3a4f6a' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="text-xs font-medium mb-2" style={{ color: '#8F9194' }}>
            {label}
          </div>
          <div
            className="font-display font-bold text-3xl"
            style={{ color: accentColor }}
          >
            {value}
          </div>
        </div>
        {icon && (
          <div className="text-2xl" style={{ color: accentColor, opacity: 0.5 }}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
