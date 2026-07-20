import { useState } from 'react';
import { REAL_TASKS, BRANDS, EMPLOYEES } from '@/data/mtechEmployees';

interface TaskDetailPanelProps {
  taskId: string;
  onClose: () => void;
}

export function TaskDetailPanel({ taskId, onClose }: TaskDetailPanelProps) {
  const task = REAL_TASKS.find((t) => t.id === taskId);
  const [showCopied, setShowCopied] = useState(false);

  if (!task) return null;

  const owner = task.owner ? Object.values(EMPLOYEES).find((e) => e.id === task.owner) : null;
  const brand = BRANDS[task.brand];

  // Sample output content based on task type
  const getOutputContent = () => {
    if (task.title.includes('Email')) {
      return `Subject: Account Manager Introduction

Dear [Prospect Name],

I hope this message finds you well. I wanted to reach out and introduce myself as your dedicated account manager.

With over [X years] of experience in [industry], I'm committed to ensuring you receive the highest level of service and support. Whether it's answering questions, providing updates, or addressing any concerns, I'm here to help.

Please don't hesitate to reach out if there's anything I can assist you with.

Best regards,
[Account Manager Name]
${brand.shortName}`;
    } else if (task.title.includes('Social')) {
      return `🎯 Martyn's Law Awareness Post

Did you know? Martyn's Law is transforming security standards across the UK...

Learn how our solutions help you stay compliant and protected.

#MartynLaw #Security #Compliance`;
    } else if (task.title.includes('page') || task.title.includes('Page')) {
      return `# Radio Systems Page Copy

## Advanced Radio Communication Solutions

Our state-of-the-art radio systems are designed for teams that demand reliability and performance.

### Key Features
- Crystal-clear digital audio quality
- Military-grade encryption
- Extended range coverage
- Rugged, weatherproof design

### Perfect For
- Emergency services
- Large facilities
- Field operations
- Critical communications`;
    } else {
      return `[Output content for: ${task.title}]\n\nThis is where the AI employee's work would be displayed - ready to copy or download.`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting-john':
        return '#F59E0B';
      case 'in-progress':
        return '#1D9E75';
      case 'complete':
        return '#5C6879';
      case 'backlog':
        return '#5C6879';
      case 'assigned':
        return '#3B82F6';
      case 'waiting-approval':
        return '#F97031';
      default:
        return '#5C6879';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'waiting-john':
        return 'Waiting for John';
      case 'in-progress':
        return 'In Progress';
      case 'complete':
        return 'Complete';
      case 'backlog':
        return 'Backlog';
      case 'assigned':
        return 'Assigned';
      case 'waiting-approval':
        return 'Waiting for Approval';
      default:
        return status;
    }
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(getOutputContent());
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([getOutputContent()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${task.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={onClose}
    >
      <div
        className="bg-slate-900 rounded-lg shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: '#0F1219', borderColor: '#1E2430', border: '1px solid' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b p-6" style={{ backgroundColor: '#0F1219', borderColor: '#1E2430' }}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#E8ECF1' }}>
                {task.title}
              </h2>
              <div className="flex flex-wrap gap-3 text-sm">
                <span style={{ color: '#5C6879' }}>{brand.shortName}</span>
                <span
                  style={{
                    backgroundColor: `${getStatusColor(task.status)}22`,
                    color: getStatusColor(task.status),
                    padding: '4px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {getStatusLabel(task.status)}
                </span>
                {task.priority && (
                  <span
                    style={{
                      backgroundColor: task.priority === 'high' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(249, 112, 31, 0.2)',
                      color: task.priority === 'high' ? '#EF4444' : '#F97031',
                      padding: '4px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-2xl font-bold transition-all"
              style={{ color: '#5C6879' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#E8ECF1')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#5C6879')}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Task Details */}
        <div className="p-6 border-b" style={{ borderColor: '#1E2430' }}>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p style={{ color: '#5C6879' }}>Owner</p>
              <p style={{ color: '#E8ECF1', fontWeight: '500' }}>
                {owner ? `${owner.emoji} ${owner.name}` : 'Unassigned'}
              </p>
            </div>
            <div>
              <p style={{ color: '#5C6879' }}>Context</p>
              <p style={{ color: '#E8ECF1', fontWeight: '500' }}>{task.context}</p>
            </div>
            {task.deadline && (
              <div>
                <p style={{ color: '#5C6879' }}>Deadline</p>
                <p style={{ color: '#E8ECF1', fontWeight: '500' }}>
                  {new Date(task.deadline).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Output Section */}
        <div className="p-6 border-b" style={{ borderColor: '#1E2430' }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: '#E8ECF1' }}>
            AI Output
          </h3>
          <div
            className="p-4 rounded-lg mb-4 text-sm whitespace-pre-wrap"
            style={{
              backgroundColor: '#0A0E14',
              borderColor: '#1E2430',
              border: '1px solid',
              color: '#E8ECF1',
              fontFamily: 'monospace',
              lineHeight: '1.6',
            }}
          >
            {getOutputContent()}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCopyOutput}
              className="px-4 py-2 rounded-lg font-medium transition-all text-sm flex-1"
              style={{
                backgroundColor: '#F97031',
                color: 'white',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E85E1F')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F97031')}
            >
              {showCopied ? '✓ Copied' : 'Copy Output'}
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg font-medium transition-all text-sm"
              style={{
                backgroundColor: '#1E2430',
                color: '#E8ECF1',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2A3141')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1E2430')}
            >
              Download
            </button>
            {task.status !== 'complete' && (
              <button
                className="px-4 py-2 rounded-lg font-medium transition-all text-sm"
                style={{
                  backgroundColor: '#1D9E75',
                  color: 'white',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#15803d')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1D9E75')}
              >
                Mark Published
              </button>
            )}
          </div>
        </div>

        {/* Activity Log */}
        <div className="p-6">
          <h3 className="text-lg font-bold mb-4" style={{ color: '#E8ECF1' }}>
            Activity
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <span style={{ color: '#5C6879' }}>Today 10:30 AM</span>
              <span style={{ color: '#E8ECF1' }}>Task created</span>
            </div>
            {task.status === 'in-progress' && (
              <div className="flex gap-3">
                <span style={{ color: '#5C6879' }}>Today 2:15 PM</span>
                <span style={{ color: '#E8ECF1' }}>Employee started working</span>
              </div>
            )}
            {task.status !== 'backlog' && (
              <div className="flex gap-3">
                <span style={{ color: '#5C6879' }}>Today 4:45 PM</span>
                <span style={{ color: '#E8ECF1' }}>Output generated</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
