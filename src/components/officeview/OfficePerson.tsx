import type { Employee } from '@/types/employee';
import { EMPLOYEE_STATUS_COLORS } from '@/types/employee';

interface OfficePersonProps {
  employee: Employee;
  scale?: number;
}

export function OfficePerson({ employee, scale = 1 }: OfficePersonProps) {
  const statusColor = EMPLOYEE_STATUS_COLORS[employee.status];
  const isWorking = employee.status === 'working';

  return (
    <div
      className="relative flex flex-col items-center"
      style={{
        transform: `scale(${scale})`,
        animation: isWorking ? 'personSway 2.2s ease-in-out infinite' : 'none',
        filter: `drop-shadow(0 3px 4px rgba(0,0,0,0.5))`,
      }}
      title={`${employee.name} — ${employee.role}`}
    >
      {/* Hair / head */}
      <div className="relative" style={{ width: 16, height: 16 }}>
        <div
          className="absolute rounded-full"
          style={{ inset: 0, background: 'linear-gradient(160deg, #E8B98A, #C68F5F)' }}
        />
        <div
          className="absolute rounded-t-full"
          style={{
            top: -3,
            left: -1,
            right: -1,
            height: 10,
            background: `linear-gradient(180deg, ${shade(employee.accentColor, -20)}, ${shade(employee.accentColor, -50)})`,
          }}
        />
      </div>

      {/* Blazer / torso */}
      <div
        style={{
          width: 22,
          height: 20,
          marginTop: -1,
          background: `linear-gradient(160deg, ${employee.accentColor}, ${shade(employee.accentColor, -35)})`,
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
        }}
      />
      {/* Collar accent */}
      <div
        style={{
          width: 8,
          height: 5,
          marginTop: -20,
          background: 'rgba(255,255,255,0.85)',
          clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
        }}
      />

      {/* Chair back sliver beneath */}
      <div
        className="rounded-b-sm"
        style={{ width: 26, height: 4, marginTop: 1, backgroundColor: 'rgba(0,0,0,0.35)' }}
      />

      {/* Status dot */}
      <div
        className="absolute rounded-full"
        style={{
          top: -4,
          right: -3,
          width: 6,
          height: 6,
          backgroundColor: statusColor,
          boxShadow: `0 0 4px ${statusColor}`,
          border: '1px solid rgba(10,14,20,0.8)',
        }}
      />
    </div>
  );
}

function shade(hex: string, amt: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const clamp = (v: number) => Math.min(255, Math.max(0, v));
  const r = clamp((num >> 16) + amt);
  const g = clamp(((num >> 8) & 0xff) + amt);
  const b = clamp((num & 0xff) + amt);
  return `rgb(${r},${g},${b})`;
}
