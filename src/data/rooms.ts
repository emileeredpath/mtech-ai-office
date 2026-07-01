export interface Room {
  id: string;
  name: string;
  employeeIds: string[];
  color: string;
  gridArea: string;
}

// 3x3 grid, Sandy occupies the center cell
export const rooms: Room[] = [
  { id: 'strategy-room', name: 'Strategy Room', employeeIds: ['marketing-director'], color: '#818CF8', gridArea: 'r1' },
  { id: 'campaign-hub', name: 'Campaign Hub', employeeIds: ['email-marketing-manager'], color: '#F9701F', gridArea: 'r2' },
  { id: 'content-studio', name: 'Content Studio', employeeIds: ['case-study-writer', 'proposal-writer'], color: '#34D399', gridArea: 'r3' },
  { id: 'operations-centre', name: 'Operations Centre', employeeIds: ['funding-rewards-manager'], color: '#2DD4BF', gridArea: 'r4' },
  { id: 'analytics-lab', name: 'Analytics Lab', employeeIds: ['seo-ppc-manager'], color: '#60A5FA', gridArea: 'r5' },
  { id: 'design-atelier', name: 'Design Atelier', employeeIds: ['website-auditor'], color: '#FBBF24', gridArea: 'r6' },
  { id: 'board-room', name: 'Board Room', employeeIds: [], color: '#C084FC', gridArea: 'r7' },
  { id: 'social-lounge', name: 'Social Lounge', employeeIds: ['social-media-manager'], color: '#F472B6', gridArea: 'r8' },
];

export function roomForEmployee(employeeId: string): Room | undefined {
  return rooms.find((r) => r.employeeIds.includes(employeeId));
}
