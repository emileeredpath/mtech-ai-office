import { useState, useEffect } from 'react';
import { useEmployees } from '@/hooks/useEmployees';
import { useTasks } from '@/hooks/useTasks';
import { useConversation } from '@/hooks/useConversations';
import { EmployeeCard } from './EmployeeCard';
import { TaskList } from './TaskList';
import { SandyChat } from './SandyChat';
import { Button } from '@/components/ui/Button';

const COMPANY_ID = '01950f7c-6f5f-4d8f-a81a-b6f7e1c3a2d0'; // Will be replaced with actual company ID from context

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'team' | 'tasks' | 'sandy'>('team');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const { employees, loading: employeesLoading } = useEmployees(COMPANY_ID);
  const { tasks, loading: tasksLoading, updateTask } = useTasks(COMPANY_ID);
  const { conversation, sendMessage } = useConversation(conversationId || '');

  // Find Sandy
  const sandy = employees.find((e) => e.name === 'Sandy');

  // Group tasks by status
  const tasksByStatus = {
    backlog: tasks.filter((t) => t.status === 'backlog'),
    assigned: tasks.filter((t) => t.status === 'assigned'),
    in_progress: tasks.filter((t) => t.status === 'in_progress'),
    waiting_review: tasks.filter((t) => t.status === 'waiting_review'),
    complete: tasks.filter((t) => t.status === 'complete'),
  };

  const handleStartSandyChat = async () => {
    if (sandy && !conversationId) {
      // Create new conversation with Sandy (for now just set a conversation ID)
      setConversationId(sandy.id);
    }
  };

  const handleTaskStatusChange = async (taskId: string, newStatus: string) => {
    try {
      await updateTask(taskId, { status: newStatus });
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  if (employeesLoading || tasksLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <div className="mb-4 text-2xl text-white">Loading AI Office...</div>
          <div className="text-gray-400">Setting up your workspace</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">AI Office</h1>
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'team' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('team')}
            >
              👥 Team ({employees.length})
            </Button>
            <Button
              variant={activeTab === 'tasks' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('tasks')}
            >
              ✓ Tasks ({tasks.length})
            </Button>
            <Button
              variant={activeTab === 'sandy' ? 'primary' : 'secondary'}
              onClick={() => {
                setActiveTab('sandy');
                handleStartSandyChat();
              }}
            >
              🤖 Sandy
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Team Tab */}
        {activeTab === 'team' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  isSelected={selectedEmployeeId === employee.id}
                  onSelect={() => setSelectedEmployeeId(employee.id)}
                  taskCount={tasks.filter((t) => t.employee_id === employee.id).length}
                />
              ))}
            </div>

            {/* Selected Employee Details */}
            {selectedEmployeeId && (
              <div className="mt-8 bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">
                  {employees.find((e) => e.id === selectedEmployeeId)?.name} Tasks
                </h3>
                <TaskList
                  tasks={tasks.filter((t) => t.employee_id === selectedEmployeeId)}
                  onStatusChange={handleTaskStatusChange}
                />
              </div>
            )}
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Task Board</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(tasksByStatus).map(([status, taskList]) => (
                <div key={status} className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold mb-4 text-sm uppercase text-gray-400">
                    {status.replace(/_/g, ' ')} ({taskList.length})
                  </h3>
                  <div className="space-y-2">
                    {taskList.map((task) => (
                      <div
                        key={task.id}
                        className="bg-gray-700 rounded p-3 text-sm hover:bg-gray-600 cursor-pointer transition"
                        onClick={() => {
                          if (task.employee_id) setSelectedEmployeeId(task.employee_id);
                        }}
                      >
                        <div className="font-medium truncate">{task.title}</div>
                        <div className="text-gray-400 text-xs mt-1">{task.employee_name || 'Unassigned'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sandy Chat Tab */}
        {activeTab === 'sandy' && sandy && (
          <SandyChat sandyEmployee={sandy} conversation={conversation} onSendMessage={sendMessage} />
        )}
      </div>
    </div>
  );
}
