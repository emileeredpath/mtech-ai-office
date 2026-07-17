-- AI Office Database Schema

-- Companies (multi-company support, with single company for MVP)
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Employees (Sandy, specialist AIs, and humans)
CREATE TABLE IF NOT EXISTS ai_employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'ai' or 'human'
  is_ai BOOLEAN DEFAULT FALSE,
  emoji VARCHAR(10),
  status VARCHAR(50) DEFAULT 'available', -- available, working, waiting_approval, blocked
  personality TEXT[], -- array of personality traits
  accent_color VARCHAR(7), -- hex color
  authority_level VARCHAR(50), -- constitutional, executive, domain, team, individual
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(company_id, name)
);

-- Tasks (work assignments)
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  employee_id UUID REFERENCES ai_employees(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(50) DEFAULT 'medium', -- low, medium, high
  status VARCHAR(50) DEFAULT 'backlog', -- backlog, assigned, awaiting_brief, in_progress, waiting_review, waiting_approval, complete, blocked
  assigned_by UUID REFERENCES ai_employees(id), -- who assigned it (Sandy, manager, etc.)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- Task Notes (comments/updates on tasks)
CREATE TABLE IF NOT EXISTS task_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  author_id UUID REFERENCES ai_employees(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conversations (chat sessions with Sandy or other AIs)
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  ai_employee_id UUID NOT NULL REFERENCES ai_employees(id), -- which AI (Sandy, Finance AI, etc.)
  user_id UUID REFERENCES ai_employees(id), -- who's talking to the AI (can be null for system)
  title VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active', -- active, archived
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages (individual messages in conversations)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES ai_employees(id), -- who sent it (human or AI)
  content TEXT NOT NULL,
  role VARCHAR(50) NOT NULL, -- 'user' or 'assistant'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Knowledge Base (documents, decision records, processes)
CREATE TABLE IF NOT EXISTS knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  domain VARCHAR(100), -- governance, organisation, people, knowledge, operations, analytics, automation, platform, experience
  type VARCHAR(50), -- process, decision, policy, principle, template, etc.
  owner_id UUID REFERENCES ai_employees(id),
  tags TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Memory (lessons learned, outcomes)
CREATE TABLE IF NOT EXISTS memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  task_id UUID REFERENCES tasks(id),
  content TEXT NOT NULL,
  category VARCHAR(100), -- lesson, outcome, blocker, success, etc.
  related_knowledge_id UUID REFERENCES knowledge(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects (grouping of tasks, campaigns)
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active', -- active, completed, archived
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(company_id, name)
);

-- Project Tasks (mapping tasks to projects)
CREATE TABLE IF NOT EXISTS project_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  UNIQUE(project_id, task_id)
);

-- AI Role and Authority Contracts
CREATE TABLE IF NOT EXISTS ai_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  ai_employee_id UUID NOT NULL REFERENCES ai_employees(id),
  scope TEXT NOT NULL, -- what the AI is responsible for
  can_decide_independently JSONB, -- array of decisions it can make alone
  requires_notification JSONB, -- array of actions that need notification
  requires_approval JSONB, -- array of actions that need approval
  cannot_do JSONB, -- array of prohibited actions
  escalation_paths JSONB, -- how to escalate decisions
  performance_standards JSONB, -- accuracy, latency, coverage, etc.
  version INTEGER DEFAULT 1,
  effective_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- API Audit Log
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  user_id UUID REFERENCES ai_employees(id),
  action VARCHAR(255) NOT NULL,
  resource_type VARCHAR(100),
  resource_id UUID,
  changes JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_ai_employees_company_id ON ai_employees(company_id);
CREATE INDEX IF NOT EXISTS idx_tasks_company_id ON tasks(company_id);
CREATE INDEX IF NOT EXISTS idx_tasks_employee_id ON tasks(employee_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_conversations_company_id ON conversations(company_id);
CREATE INDEX IF NOT EXISTS idx_conversations_ai_employee_id ON conversations(ai_employee_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_company_id ON knowledge(company_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_domain ON knowledge(domain);
CREATE INDEX IF NOT EXISTS idx_memory_company_id ON memory(company_id);
CREATE INDEX IF NOT EXISTS idx_projects_company_id ON projects(company_id);
CREATE INDEX IF NOT EXISTS idx_ai_contracts_company_id ON ai_contracts(company_id);
CREATE INDEX IF NOT EXISTS idx_ai_contracts_ai_employee_id ON ai_contracts(ai_employee_id);
