const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface Company {
  id: string;
  name: string;
}

// Companies
export async function getDefaultCompany(): Promise<Company> {
  const response = await fetch(`${API_URL}/api/companies/default`);
  if (!response.ok) throw new Error('Failed to fetch company');
  return response.json();
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  type: 'human' | 'ai';
  is_ai: boolean;
  emoji: string;
  status: string;
  accent_color: string;
  authority_level: string;
  created_at: string;
  tasks?: Task[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: string;
  employee_id?: string;
  employee_name?: string;
  assigned_by?: string;
  assigned_by_name?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
  notes?: TaskNote[];
}

export interface TaskNote {
  id: string;
  content: string;
  author_id?: string;
  author_name?: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  title?: string;
  status: string;
  ai_employee_id: string;
  ai_name: string;
  ai_emoji: string;
  user_id?: string;
  user_name?: string;
  created_at: string;
  updated_at: string;
  messages?: Message[];
}

export interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_emoji: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
}

// Employees
export async function getEmployees(companyId: string): Promise<Employee[]> {
  const response = await fetch(`${API_URL}/api/employees?companyId=${companyId}`);
  if (!response.ok) throw new Error('Failed to fetch employees');
  return response.json();
}

export async function getEmployee(id: string): Promise<Employee> {
  const response = await fetch(`${API_URL}/api/employees/${id}`);
  if (!response.ok) throw new Error('Failed to fetch employee');
  return response.json();
}

export async function updateEmployeeStatus(id: string, status: string): Promise<Employee> {
  const response = await fetch(`${API_URL}/api/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update employee');
  return response.json();
}

export async function getEmployeeContract(id: string): Promise<any> {
  const response = await fetch(`${API_URL}/api/employees/${id}/contract`);
  if (!response.ok) throw new Error('Failed to fetch contract');
  return response.json();
}

// Tasks
export async function getTasks(companyId: string): Promise<Task[]> {
  const response = await fetch(`${API_URL}/api/tasks?companyId=${companyId}`);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
}

export async function getTask(id: string): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks/${id}`);
  if (!response.ok) throw new Error('Failed to fetch task');
  return response.json();
}

export async function createTask(
  companyId: string,
  task: Partial<Task>
): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ companyId, ...task }),
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
}

export async function addTaskNote(
  taskId: string,
  content: string,
  authorId?: string
): Promise<TaskNote> {
  const response = await fetch(`${API_URL}/api/tasks/${taskId}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, authorId }),
  });
  if (!response.ok) throw new Error('Failed to add note');
  return response.json();
}

// Conversations
export async function getConversations(
  companyId: string,
  filters?: { userId?: string; aiEmployeeId?: string }
): Promise<Conversation[]> {
  const params = new URLSearchParams({ companyId });
  if (filters?.userId) params.append('userId', filters.userId);
  if (filters?.aiEmployeeId) params.append('aiEmployeeId', filters.aiEmployeeId);

  const response = await fetch(`${API_URL}/api/conversations?${params}`);
  if (!response.ok) throw new Error('Failed to fetch conversations');
  return response.json();
}

export async function getConversation(id: string): Promise<Conversation> {
  const response = await fetch(`${API_URL}/api/conversations/${id}`);
  if (!response.ok) throw new Error('Failed to fetch conversation');
  return response.json();
}

export async function createConversation(
  companyId: string,
  aiEmployeeId: string,
  userId?: string,
  title?: string
): Promise<Conversation> {
  const response = await fetch(`${API_URL}/api/conversations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ companyId, aiEmployeeId, userId, title }),
  });
  if (!response.ok) throw new Error('Failed to create conversation');
  return response.json();
}

export async function sendMessage(
  conversationId: string,
  senderId: string,
  content: string
): Promise<Message> {
  const response = await fetch(`${API_URL}/api/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ senderId, content }),
  });
  if (!response.ok) throw new Error('Failed to send message');
  return response.json();
}

export async function suggestSpecialistAI(
  conversationId: string,
  taskTitle: string,
  taskDescription: string,
  companyId: string
): Promise<any> {
  const response = await fetch(`${API_URL}/api/conversations/${conversationId}/suggest-specialist-ai`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskTitle, taskDescription, companyId }),
  });
  if (!response.ok) throw new Error('Failed to suggest specialist AI');
  return response.json();
}

// Specialist AI
export interface AICapability {
  name: string;
  domain: string;
  canApproveUpTo?: number;
  responsibilities: string[];
  escalationPath: string;
}

export async function getSpecialistAICapabilities(aiEmployeeId: string): Promise<AICapability> {
  const response = await fetch(`${API_URL}/api/specialist-ai/${aiEmployeeId}/capabilities`);
  if (!response.ok) throw new Error('Failed to fetch capabilities');
  return response.json();
}

export async function processTaskWithAI(
  aiEmployeeId: string,
  taskId: string
): Promise<any> {
  const response = await fetch(`${API_URL}/api/specialist-ai/${aiEmployeeId}/process-task`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskId }),
  });
  if (!response.ok) throw new Error('Failed to process task');
  return response.json();
}

export async function delegateTaskToAI(
  aiEmployeeId: string,
  taskId: string,
  reason?: string
): Promise<any> {
  const response = await fetch(`${API_URL}/api/specialist-ai/${aiEmployeeId}/delegate-task`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskId, reason }),
  });
  if (!response.ok) throw new Error('Failed to delegate task');
  return response.json();
}
