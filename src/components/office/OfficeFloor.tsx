import { useState } from 'react';
import { useOfficeStore } from '@/store/officeStore';
import { DeskCard } from './DeskCard';

export function OfficeFloor() {
  const employees = useOfficeStore((s) => s.employees);
  const reassignTask = useOfficeStore((s) => s.reassignTask);

  const [dropTargetId, setDropTargetId] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetEmployeeId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const data = e.dataTransfer.getData('application/json');
    if (!data) {
      setDropTargetId(null);
      return;
    }

    try {
      const { taskId, employeeId } = JSON.parse(data);

      // Prevent drop on same employee
      if (employeeId === targetEmployeeId) {
        setDropTargetId(null);
        return;
      }

      // Reassign the task
      reassignTask(taskId, employeeId, targetEmployeeId);
      setDropTargetId(null);
    } catch (error) {
      console.error('Failed to parse drag data:', error);
      setDropTargetId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {employees.map((employee, index) => (
        <div
          key={employee.id}
          onDragOver={handleDragOver}
          onDragLeave={() => setDropTargetId(null)}
          onDrop={(e) => handleDrop(e, employee.id)}
          onDragEnter={() => setDropTargetId(employee.id)}
        >
          <DeskCard
            employee={employee}
            index={index}
            isDropTarget={dropTargetId === employee.id}
            onDragStart={() => {}}
            onDragEnd={() => {
              setDropTargetId(null);
            }}
          />
        </div>
      ))}
    </div>
  );
}
