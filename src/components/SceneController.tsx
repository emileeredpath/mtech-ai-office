import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { OfficeScene } from '@/components/3d/OfficeScene';
import { BoardRoomScene } from '@/components/3d/BoardRoomScene';
import { Sandy } from '@/components/Sandy';
import { WorkflowBriefingPanel } from '@/components/WorkflowBriefingPanel';
import { WorkflowVisualization } from '@/components/WorkflowVisualization';
import { DialogueDisplay } from '@/components/DialogueDisplay';
import { globalWorkflowOrchestrator, WorkflowTask } from '@/systems/WorkflowOrchestrator';
import { globalEventBus } from '@/systems/EventBus';
import { MessageCircle, Users, Zap } from 'lucide-react';

export function SceneController() {
  const location = useLocation();
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [isWorkflowPanelOpen, setIsWorkflowPanelOpen] = useState(false);
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowTask | null>(null);
  const is3DOffice = location.pathname === '/3d-office';

  useEffect(() => {
    const handleWorkflowCreated = (data: Record<string, any>) => {
      setActiveWorkflow(globalWorkflowOrchestrator.getWorkflow(data.workflowId) || null);
    };

    const handleWorkflowCompleted = (_data: Record<string, any>) => {
      // Keep showing the completed workflow for a bit, then clear
      setTimeout(() => {
        setActiveWorkflow(null);
      }, 3000);
    };

    globalEventBus.on('workflowCreated', handleWorkflowCreated);
    globalEventBus.on('workflowCompleted', handleWorkflowCompleted);

    return () => {
      globalEventBus.off('workflowCreated', handleWorkflowCreated);
      globalEventBus.off('workflowCompleted', handleWorkflowCompleted);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* 3D Scene */}
      <div className="flex-1 relative">
        {is3DOffice ? <OfficeScene /> : <BoardRoomScene />}
      </div>

      {/* Sandy Task Briefing Button (floating) */}
      <button
        onClick={() => setIsWorkflowPanelOpen(true)}
        className="absolute bottom-24 right-6 w-14 h-14 rounded-full bg-[#F9701F] text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
        title="Brief Sandy with a Task"
      >
        <Zap size={24} />
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-[#1D2A3A] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Brief Sandy
        </div>
      </button>

      {/* Sandy Analytics Briefing Button (floating) */}
      <button
        onClick={() => setIsBriefingOpen(true)}
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-[#F9701F] text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
        title="Sandy's Analytics Briefing"
      >
        <MessageCircle size={24} />
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-[#1D2A3A] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Sandy's Briefing
        </div>
      </button>

      {/* Scene indicator */}
      <div className="absolute top-6 right-6 flex items-center gap-2 bg-[#1D2A3A]/80 backdrop-blur px-3 py-2 rounded-lg text-xs text-[#F0F4F8]">
        <Users size={16} />
        <span>{is3DOffice ? 'Office Floor' : 'Board Room'}</span>
      </div>

      {/* Dialogue Display */}
      <DialogueDisplay />

      {/* Workflow Visualization */}
      <WorkflowVisualization workflow={activeWorkflow} />

      {/* Sandy Panels */}
      <Sandy isOpen={isBriefingOpen} onClose={() => setIsBriefingOpen(false)} />
      <WorkflowBriefingPanel isOpen={isWorkflowPanelOpen} onClose={() => setIsWorkflowPanelOpen(false)} />
    </div>
  );
}
