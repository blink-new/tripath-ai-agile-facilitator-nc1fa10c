import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Plus, 
  Calendar, 
  Clock, 
  User, 
  Flag, 
  Target,
  Edit,
  Trash2,
  Play,
  Pause,
  CheckCircle
} from 'lucide-react'

interface SprintPlanningProps {
  language: 'en' | 'es'
}

export function SprintPlanning({ language }: SprintPlanningProps) {
  const [selectedSprint, setSelectedSprint] = useState('current')
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'medium',
    estimatedHours: ''
  })

  const texts = {
    en: {
      sprintPlanning: 'Sprint Planning',
      currentSprint: 'Current Sprint',
      createNewSprint: 'Create New Sprint',
      addTask: 'Add Task',
      taskTitle: 'Task Title',
      taskDescription: 'Task Description',
      assignee: 'Assignee',
      priority: 'Priority',
      estimatedHours: 'Estimated Hours',
      dueDate: 'Due Date',
      create: 'Create',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      start: 'Start Sprint',
      pause: 'Pause Sprint',
      complete: 'Complete Sprint',
      sprintGoals: 'Sprint Goals',
      tasks: 'Tasks',
      progress: 'Progress',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      critical: 'Critical',
      todo: 'To Do',
      inProgress: 'In Progress',
      review: 'Review',
      done: 'Done',
      planning: 'Planning',
      active: 'Active',
      completed: 'Completed'
    },
    es: {
      sprintPlanning: 'Planificación de Sprint',
      currentSprint: 'Sprint Actual',
      createNewSprint: 'Crear Nuevo Sprint',
      addTask: 'Agregar Tarea',
      taskTitle: 'Título de la Tarea',
      taskDescription: 'Descripción de la Tarea',
      assignee: 'Asignado a',
      priority: 'Prioridad',
      estimatedHours: 'Horas Estimadas',
      dueDate: 'Fecha de Vencimiento',
      create: 'Crear',
      cancel: 'Cancelar',
      edit: 'Editar',
      delete: 'Eliminar',
      start: 'Iniciar Sprint',
      pause: 'Pausar Sprint',
      complete: 'Completar Sprint',
      sprintGoals: 'Objetivos del Sprint',
      tasks: 'Tareas',
      progress: 'Progreso',
      high: 'Alto',
      medium: 'Medio',
      low: 'Bajo',
      critical: 'Crítico',
      todo: 'Por Hacer',
      inProgress: 'En Progreso',
      review: 'Revisión',
      done: 'Completado',
      planning: 'Planificación',
      active: 'Activo',
      completed: 'Completado'
    }
  }

  const t = texts[language]

  // Mock data
  const sprints = [
    {
      id: 'current',
      name: 'Sprint 24 - Q1 Features',
      status: 'active',
      startDate: '2025-01-13',
      endDate: '2025-01-27',
      goals: [
        'Complete user authentication system',
        'Implement real-time notifications',
        'Optimize database performance'
      ]
    },
    {
      id: 'next',
      name: 'Sprint 25 - UI Improvements',
      status: 'planning',
      startDate: '2025-01-28',
      endDate: '2025-02-11',
      goals: [
        'Redesign dashboard interface',
        'Add mobile responsiveness',
        'Implement dark mode'
      ]
    }
  ]

  const tasks = [
    {
      id: '1',
      title: 'User Authentication API',
      description: 'Implement JWT-based authentication system',
      assignee: 'Ryan García',
      assigneeId: '1',
      priority: 'high',
      status: 'in_progress',
      estimatedHours: 16,
      actualHours: 12,
      dueDate: '2025-01-20'
    },
    {
      id: '2',
      title: 'Real-time Notifications',
      description: 'Set up WebSocket connections for live updates',
      assignee: 'Nitish Sharma',
      assigneeId: '2',
      priority: 'medium',
      status: 'todo',
      estimatedHours: 12,
      actualHours: 0,
      dueDate: '2025-01-22'
    },
    {
      id: '3',
      title: 'Database Optimization',
      description: 'Optimize queries and add proper indexing',
      assignee: 'Ryan García',
      assigneeId: '1',
      priority: 'critical',
      status: 'review',
      estimatedHours: 8,
      actualHours: 10,
      dueDate: '2025-01-18'
    }
  ]

  const teamMembers = [
    { id: '1', name: 'Ryan García', role: 'tech' },
    { id: '2', name: 'Nitish Sharma', role: 'tech' },
    { id: '3', name: 'Oriel Esquivel', role: 'ceo' },
    { id: '4', name: 'Bannu Patel', role: 'sales' }
  ]

  const currentSprintData = sprints.find(s => s.id === selectedSprint)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-500'
      case 'in_progress': return 'bg-blue-500'
      case 'review': return 'bg-purple-500'
      case 'done': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const handleCreateTask = () => {
    // In real app, this would call API
    console.log('Creating task:', newTask)
    setIsCreateTaskOpen(false)
    setNewTask({
      title: '',
      description: '',
      assignee: '',
      priority: 'medium',
      estimatedHours: ''
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t.sprintPlanning}</h1>
          <p className="text-muted-foreground">Manage sprints and plan tasks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            {t.createNewSprint}
          </Button>
          <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t.addTask}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t.addTask}</DialogTitle>
                <DialogDescription>
                  Create a new task for the current sprint.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.taskTitle}</label>
                  <Input
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter task title..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.taskDescription}</label>
                  <Textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Enter task description..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.assignee}</label>
                    <Select value={newTask.assignee} onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.priority}</label>
                    <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">{t.low}</SelectItem>
                        <SelectItem value="medium">{t.medium}</SelectItem>
                        <SelectItem value="high">{t.high}</SelectItem>
                        <SelectItem value="critical">{t.critical}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.estimatedHours}</label>
                  <Input
                    type="number"
                    value={newTask.estimatedHours}
                    onChange={(e) => setNewTask({ ...newTask, estimatedHours: e.target.value })}
                    placeholder="8"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateTaskOpen(false)}>
                  {t.cancel}
                </Button>
                <Button onClick={handleCreateTask}>
                  {t.create}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Sprint Selection */}
      <div className="flex gap-4">
        {sprints.map((sprint) => (
          <Card 
            key={sprint.id} 
            className={`cursor-pointer transition-all ${
              selectedSprint === sprint.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedSprint(sprint.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{sprint.name}</CardTitle>
                <Badge variant={sprint.status === 'active' ? 'default' : 'secondary'}>
                  {t[sprint.status as keyof typeof t]}
                </Badge>
              </div>
              <CardDescription>
                {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Sprint Details */}
      {currentSprintData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sprint Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {t.sprintGoals}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {currentSprintData.goals.map((goal, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{goal}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(currentSprintData.startDate).toLocaleDateString()} - {new Date(currentSprintData.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>14 days</span>
                </div>
              </div>

              {currentSprintData.status === 'active' && (
                <div className="mt-4 space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Pause className="h-4 w-4 mr-2" />
                    {t.pause}
                  </Button>
                  <Button size="sm" className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {t.complete}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tasks */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  {t.tasks}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${getPriorityColor(task.priority)}`} />
                          <span className="capitalize">{task.priority}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{task.actualHours || 0}h / {task.estimatedHours}h</span>
                        </div>
                        <Badge variant="secondary" className={`${getStatusColor(task.status)} text-white`}>
                          {t[task.status.replace('_', '') as keyof typeof t] || task.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}