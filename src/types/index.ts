export interface User {
  id: string
  email: string
  displayName?: string
  role: 'tech' | 'ceo' | 'sales'
  avatar?: string
  language: 'en' | 'es'
}

export interface Task {
  id: string
  title: string
  description?: string
  assigneeId: string
  assigneeName: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'todo' | 'in_progress' | 'review' | 'done'
  estimatedHours?: number
  actualHours?: number
  dueDate?: string
  createdAt: string
  updatedAt: string
  sprintId?: string
  tags?: string[]
  blockers?: string[]
}

export interface Sprint {
  id: string
  name: string
  startDate: string
  endDate: string
  status: 'planning' | 'active' | 'completed'
  goals: string[]
  tasks: Task[]
  createdAt: string
  updatedAt: string
}

export interface StandupUpdate {
  id: string
  userId: string
  userName: string
  userRole: 'tech' | 'ceo' | 'sales'
  date: string
  yesterday: string
  today: string
  blockers: string
  createdAt: string
}

export interface TeamMember {
  id: string
  name: string
  role: 'tech' | 'ceo' | 'sales'
  avatar?: string
  email: string
  language: 'en' | 'es'
  isOnline: boolean
  lastSeen?: string
}

export interface Notification {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  createdAt: string
  read: boolean
  actionUrl?: string
}

export interface KPI {
  id: string
  name: string
  value: number
  target: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  period: 'daily' | 'weekly' | 'monthly'
  updatedAt: string
}

export interface TimelineItem {
  id: string
  name: string
  dueDate?: string
  completed: boolean
  children?: TimelineItem[]
  type: 'milestone' | 'task' | 'deliverable'
  description?: string
  expanded?: boolean
}

export interface ProductTimeline {
  id: string
  title: string
  description?: string
  items: TimelineItem[]
  createdAt: string
  updatedAt: string
}