export interface Room {
  id: string;
  name: string;
  employeeIds: string[];
  color: string;
  gridArea: string;
  title?: string; // Job title to display
}

// 3x3 grid, Sandy occupies the center cell
// Office Floor layout (excludes Board Room)
export const rooms: Room[] = [
  {
    id: 'strategy-room',
    name: 'Strategy Room',
    employeeIds: ['marketing-director'],
    color: '#818CF8',
    gridArea: 'r1',
    title: 'Marketing Director',
  },
  {
    id: 'website-studio',
    name: 'Website Studio',
    employeeIds: ['website-auditor'],
    color: '#F9701F',
    gridArea: 'r2',
    title: 'Website Manager',
  },
  {
    id: 'content-studio',
    name: 'Content Studio',
    employeeIds: ['proposal-writer', 'case-study-writer'],
    color: '#34D399',
    gridArea: 'r3',
    title: 'Content Team',
  },
  {
    id: 'campaign-hub',
    name: 'Campaign Hub',
    employeeIds: ['email-marketing-manager'],
    color: '#2DD4BF',
    gridArea: 'r4',
    title: 'Email Marketing Manager',
  },
  // Sandy is in the center (r5 - sandy)
  {
    id: 'analytics-lab',
    name: 'Analytics Lab',
    employeeIds: ['seo-ppc-manager'],
    color: '#60A5FA',
    gridArea: 'r5',
    title: 'SEO & PPC Manager',
  },
  {
    id: 'social-lounge',
    name: 'Social Lounge',
    employeeIds: ['social-media-manager'],
    color: '#F472B6',
    gridArea: 'r6',
    title: 'Social Media Manager',
  },
  {
    id: 'funding-desk',
    name: 'Funding Desk',
    employeeIds: ['funding-rewards-manager'],
    color: '#FBBF24',
    gridArea: 'r7',
    title: 'Funding & Rewards Manager',
  },
  {
    id: 'sandy-hub',
    name: 'Sandy Hub',
    employeeIds: [],
    color: '#A78BFA',
    gridArea: 'r8',
    title: 'Collaboration Hub',
  },
];

// Board Room - separate, used on Board Room tab
export const boardRoom: Room = {
  id: 'board-room',
  name: 'Board Room',
  employeeIds: [],
  color: '#C084FC',
  gridArea: 'board',
  title: 'Conference Room',
};

export function roomForEmployee(employeeId: string): Room | undefined {
  return rooms.find((r) => r.employeeIds.includes(employeeId));
}
