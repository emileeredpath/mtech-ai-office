import { PersonCard } from './PersonCard';
import { useOfficeStore } from '@/store/officeStore';

interface OfficeFloorCardsProps {
  assigningEmployeeId?: string;
}

export function OfficeFloorCards({ assigningEmployeeId }: OfficeFloorCardsProps) {
  const employees = useOfficeStore((state) => state.employees);

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{
        backgroundColor: '#0F1419',
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(249, 112, 31, 0.03) 0%, transparent 50%)',
      }}
    >
      {/* Office Header */}
      <div className="px-6 py-4 border-b border-[#2E3B4A] flex-shrink-0">
        <h2 className="text-xl font-bold text-[#F0F4F8]">Marketing Team</h2>
        <p className="text-sm text-[#8F9194] mt-1">Working together, achieving more ❤️</p>
      </div>

      {/* Employees Grid */}
      <div className="flex-1 overflow-auto p-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-max">
          {employees.map((emp) => (
            <PersonCard
              key={emp.id}
              employee={emp}
              isAssigning={assigningEmployeeId === emp.id}
            />
          ))}
        </div>
      </div>

      {/* Status Footer */}
      <div
        className="px-6 py-4 border-t border-[#2E3B4A] flex-shrink-0 text-center text-sm text-[#8F9194]"
        style={{ backgroundColor: '#111B26' }}
      >
        Everyone is waiting for Sandy's direction
      </div>
    </div>
  );
}
