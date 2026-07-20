import { useMemo } from 'react';
import { REAL_TASKS, BRANDS, EMPLOYEES } from '@/data/mtechEmployees';

interface ProjectsListProps {
  companyId: string;
  currentUserId: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'complete';
  progress: number;
  taskCount: number;
  completedCount: number;
  teamMembers: string[];
  brands: string[];
}

export function ProjectsList({ companyId, currentUserId }: ProjectsListProps) {
  const projects: Project[] = useMemo(() => {
    const projectsMap: Record<string, Project> = {
      'martyn-law': {
        id: 'martyn-law',
        name: "Martyn's Law Campaign",
        description: 'Security awareness campaign across all brands',
        status: 'in-progress',
        progress: 33,
        taskCount: 0,
        completedCount: 0,
        teamMembers: [],
        brands: [],
      },
      'account-manager-emails': {
        id: 'account-manager-emails',
        name: 'Account Manager Email Programme',
        description: 'Personalized introduction emails for key accounts',
        status: 'in-progress',
        progress: 60,
        taskCount: 0,
        completedCount: 0,
        teamMembers: [],
        brands: [],
      },
      'website-refresh': {
        id: 'website-refresh',
        name: 'Website Refresh Initiative',
        description: 'New pages and landing page updates',
        status: 'in-progress',
        progress: 50,
        taskCount: 0,
        completedCount: 0,
        teamMembers: [],
        brands: [],
      },
      'ppc-optimization': {
        id: 'ppc-optimization',
        name: 'PPC Campaign Restructure',
        description: 'Review messaging and restructure campaigns',
        status: 'in-progress',
        progress: 40,
        taskCount: 0,
        completedCount: 0,
        teamMembers: [],
        brands: [],
      },
    };

    // Assign tasks to projects
    REAL_TASKS.forEach((task) => {
      if (task.title.includes("Martyn's Law")) {
        projectsMap['martyn-law'].taskCount++;
        if (task.status === 'complete') projectsMap['martyn-law'].completedCount++;
        if (task.brand && !projectsMap['martyn-law'].brands.includes(BRANDS[task.brand].shortName)) {
          projectsMap['martyn-law'].brands.push(BRANDS[task.brand].shortName);
        }
        if (task.owner && !projectsMap['martyn-law'].teamMembers.includes(task.owner)) {
          projectsMap['martyn-law'].teamMembers.push(task.owner);
        }
      } else if (task.title.includes('Account Manager Email')) {
        projectsMap['account-manager-emails'].taskCount++;
        if (task.status === 'complete') projectsMap['account-manager-emails'].completedCount++;
        if (task.brand && !projectsMap['account-manager-emails'].brands.includes(BRANDS[task.brand].shortName)) {
          projectsMap['account-manager-emails'].brands.push(BRANDS[task.brand].shortName);
        }
        if (task.owner && !projectsMap['account-manager-emails'].teamMembers.includes(task.owner)) {
          projectsMap['account-manager-emails'].teamMembers.push(task.owner);
        }
      } else if (task.title.includes('page') || task.title.includes('Page') || task.title.includes('Banner')) {
        projectsMap['website-refresh'].taskCount++;
        if (task.status === 'complete') projectsMap['website-refresh'].completedCount++;
        if (task.brand && !projectsMap['website-refresh'].brands.includes(BRANDS[task.brand].shortName)) {
          projectsMap['website-refresh'].brands.push(BRANDS[task.brand].shortName);
        }
        if (task.owner && !projectsMap['website-refresh'].teamMembers.includes(task.owner)) {
          projectsMap['website-refresh'].teamMembers.push(task.owner);
        }
      } else if (task.title.includes('PPC')) {
        projectsMap['ppc-optimization'].taskCount++;
        if (task.status === 'complete') projectsMap['ppc-optimization'].completedCount++;
        if (task.brand && !projectsMap['ppc-optimization'].brands.includes(BRANDS[task.brand].shortName)) {
          projectsMap['ppc-optimization'].brands.push(BRANDS[task.brand].shortName);
        }
        if (task.owner && !projectsMap['ppc-optimization'].teamMembers.includes(task.owner)) {
          projectsMap['ppc-optimization'].teamMembers.push(task.owner);
        }
      }
    });

    // Calculate progress based on completed tasks
    Object.values(projectsMap).forEach((project) => {
      if (project.taskCount > 0) {
        project.progress = Math.round((project.completedCount / project.taskCount) * 100);
      }
      if (project.completedCount === project.taskCount && project.taskCount > 0) {
        project.status = 'complete';
      }
    });

    return Object.values(projectsMap).filter((p) => p.taskCount > 0);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return '#7A8997';
      case 'in-progress':
        return '#F97031';
      case 'review':
        return '#F59E0B';
      case 'complete':
        return '#1D9E75';
      default:
        return 'var(--text-secondary)';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'planning':
        return 'Planning';
      case 'in-progress':
        return 'In Progress';
      case 'review':
        return 'In Review';
      case 'complete':
        return 'Complete';
      default:
        return status;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Projects
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {projects.length} active project{projects.length !== 1 ? 's' : ''} • {projects.reduce((sum, p) => sum + p.taskCount, 0)} total tasks
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-lg"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                border: '1px solid',
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                    {project.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>
                </div>
                <span
                  className="px-3 py-1 rounded text-xs font-medium flex-shrink-0"
                  style={{
                    backgroundColor: `${getStatusColor(project.status)}22`,
                    color: getStatusColor(project.status),
                  }}
                >
                  {getStatusLabel(project.status)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs" style={{ color: '#7A8997' }}>
                    Progress
                  </span>
                  <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                    {project.completedCount} of {project.taskCount} tasks
                  </span>
                </div>
                <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--border-color)' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${project.progress}%`,
                      background: 'linear-gradient(90deg, #F97031, #FFB067)',
                    }}
                  />
                </div>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 text-xs">
                {project.brands.length > 0 && (
                  <div>
                    <p style={{ color: 'var(--text-secondary)' }} className="mb-1">
                      Brands
                    </p>
                    <div className="flex gap-1 flex-wrap">
                      {project.brands.map((brand) => (
                        <span
                          key={brand}
                          className="px-2 py-1 rounded"
                          style={{
                            backgroundColor: 'var(--border-color)',
                            color: 'var(--text-primary)',
                          }}
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.teamMembers.length > 0 && (
                  <div>
                    <p style={{ color: 'var(--text-secondary)' }} className="mb-1">
                      Team
                    </p>
                    <div className="flex gap-1">
                      {project.teamMembers.slice(0, 3).map((memberId) => {
                        const member = Object.values(EMPLOYEES).find((e) => e.id === memberId);
                        return (
                          <span key={memberId} title={member?.name}>
                            {member?.emoji}
                          </span>
                        );
                      })}
                      {project.teamMembers.length > 3 && (
                        <span style={{ color: '#7A8997' }}>+{project.teamMembers.length - 3}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
