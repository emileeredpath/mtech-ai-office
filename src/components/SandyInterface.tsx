import { useState, useEffect } from 'react';
import { TodaysWork } from '@/components/TodaysWork';
import { TasksList } from '@/components/TasksList';
import { AllTasksList } from '@/components/AllTasksList';
import { ProjectsList } from '@/components/ProjectsList';
import { CampaignsList } from '@/components/CampaignsList';
import { CampaignBuilder } from '@/components/CampaignBuilder';
import { BoardRoom } from '@/components/BoardRoom';
import { KnowledgeHub } from '@/components/KnowledgeHub';
import { SettingsPanel } from '@/components/SettingsPanel';
import { ActivityFeed } from '@/components/ActivityFeed';
import { EmployeeChat } from '@/components/EmployeeChat';
import { CalendarScheduling } from '@/components/CalendarScheduling';
import { VisualOutputs } from '@/components/VisualOutputs';
import { LeftSidebar, type NavKey } from '@/components/layout/LeftSidebar';
import { TopBar, type TopTab } from '@/components/layout/TopBar';
import { CompletedTasksProvider } from '@/contexts/CompletedTasksContext';

export function SandyInterface() {
  const [topTab, setTopTab] = useState<TopTab>('home');
  const [companyId, setCompanyId] = useState<string>('default');
  const [currentUserId, setCurrentUserId] = useState<string>('emilee');

  // Initialize company and user
  useEffect(() => {
    setCompanyId('mtech-group');
  }, []);

  const handleNavSelect = (key: NavKey) => {
    // Map left sidebar navigation to top tabs
    const tabMap: Record<NavKey, TopTab> = {
      home: 'home',
      team: 'chat',
      messages: 'chat',
      tasks: 'tasks',
      calendar: 'home',
      files: 'campaign-builder',
      campaigns: 'campaign-builder',
      analytics: 'home',
      help: 'chat',
    };
    setTopTab(tabMap[key] || 'home');
  };

  return (
    <CompletedTasksProvider>
      <div className="flex h-screen w-screen overflow-hidden" style={{ backgroundColor: '#070A0F' }}>
        <LeftSidebar active="home" onSelect={handleNavSelect} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar active={topTab} onSelect={setTopTab} />

          <div className="flex-1 overflow-hidden">
            {topTab === 'home' && <TodaysWork companyId={companyId} currentUserId={currentUserId} />}
            {topTab === 'tasks' && <TasksList companyId={companyId} currentUserId={currentUserId} />}
            {topTab === 'campaign-builder' && <CampaignBuilder />}
            {topTab === 'chat' && <EmployeeChat />}
          </div>
      </div>
    </div>
    </CompletedTasksProvider>
  );
}
