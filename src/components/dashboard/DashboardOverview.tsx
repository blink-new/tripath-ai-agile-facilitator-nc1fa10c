import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Target,
  Zap
} from 'lucide-react'

interface DashboardOverviewProps {
  language: 'en' | 'es'
}

export function DashboardOverview({ language }: DashboardOverviewProps) {
  const texts = {
    en: {
      welcome: 'Welcome to TriPath AI',
      subtitle: 'Your agile communication bridge is active',
      currentSprint: 'Current Sprint',
      sprintProgress: 'Sprint Progress',
      teamStatus: 'Team Status',
      todayStandups: "Today's Stand-ups",
      recentActivity: 'Recent Activity',
      kpis: 'Key Performance Indicators',
      tasksCompleted: 'Tasks Completed',
      sprintVelocity: 'Sprint Velocity',
      teamEfficiency: 'Team Efficiency',
      blockerResolution: 'Blocker Resolution',
      online: 'Online',
      offline: 'Offline',
      pending: 'Pending',
      completed: 'Completed',
      inProgress: 'In Progress',
      blocked: 'Blocked',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      critical: 'Critical'
    },
    es: {
      welcome: 'Bienvenido a TriPath AI',
      subtitle: 'Tu puente de comunicación ágil está activo',
      currentSprint: 'Sprint Actual',
      sprintProgress: 'Progreso del Sprint',
      teamStatus: 'Estado del Equipo',
      todayStandups: 'Stand-ups de Hoy',
      recentActivity: 'Actividad Reciente',
      kpis: 'Indicadores Clave de Rendimiento',
      tasksCompleted: 'Tareas Completadas',
      sprintVelocity: 'Velocidad del Sprint',
      teamEfficiency: 'Eficiencia del Equipo',
      blockerResolution: 'Resolución de Bloqueos',
      online: 'En línea',
      offline: 'Desconectado',
      pending: 'Pendiente',
      completed: 'Completado',
      inProgress: 'En Progreso',
      blocked: 'Bloqueado',
      high: 'Alto',
      medium: 'Medio',
      low: 'Bajo',
      critical: 'Crítico'
    }
  }

  const t = texts[language]

  // Mock data - in real app this would come from props or API
  const currentSprint = {
    name: 'Sprint 24 - Q1 Features',
    startDate: '2025-01-13',
    endDate: '2025-01-27',
    progress: 68,
    tasksTotal: 15,
    tasksCompleted: 10,
    tasksInProgress: 3,
    tasksBlocked: 2
  }

  const teamMembers = [
    { id: '1', name: 'Ryan García', role: 'tech', avatar: '', isOnline: true },
    { id: '2', name: 'Nitish Sharma', role: 'tech', avatar: '', isOnline: true },
    { id: '3', name: 'Oriel Esquivel', role: 'ceo', avatar: '', isOnline: false },
    { id: '4', name: 'Bannu Patel', role: 'sales', avatar: '', isOnline: true }
  ]

  const kpis = [
    { name: t.tasksCompleted, value: 85, target: 90, unit: '%', trend: 'up' },
    { name: t.sprintVelocity, value: 32, target: 30, unit: 'pts', trend: 'up' },
    { name: t.teamEfficiency, value: 92, target: 85, unit: '%', trend: 'up' },
    { name: t.blockerResolution, value: 2.1, target: 3.0, unit: 'days', trend: 'down' }
  ]

  const recentActivities = [
    { id: '1', user: 'Ryan García', action: 'completed task "API Integration"', time: '2 hours ago', type: 'success' },
    { id: '2', user: 'Nitish Sharma', action: 'reported blocker on "Database Migration"', time: '4 hours ago', type: 'warning' },
    { id: '3', user: 'Oriel Esquivel', action: 'approved sprint goals', time: '1 day ago', type: 'info' },
    { id: '4', user: 'Bannu Patel', action: 'updated marketing requirements', time: '1 day ago', type: 'info' }
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'tech': return 'bg-primary'
      case 'ceo': return 'bg-secondary-900'
      case 'sales': return 'bg-accent'
      default: return 'bg-muted-foreground'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-accent" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-accent" />
      case 'info': return <Clock className="h-4 w-4 text-primary" />
      default: return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="gradient-bg rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">{t.welcome}</h1>
        <p className="text-white/90">{t.subtitle}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.name}</CardTitle>
              <TrendingUp className={`h-4 w-4 ${kpi.trend === 'up' ? 'text-accent' : 'text-destructive'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpi.value}{kpi.unit}
              </div>
              <p className="text-xs text-muted-foreground">
                Target: {kpi.target}{kpi.unit}
              </p>
              <Progress 
                value={(kpi.value / kpi.target) * 100} 
                className="mt-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Sprint */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {t.currentSprint}
            </CardTitle>
            <CardDescription>{currentSprint.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>{new Date(currentSprint.startDate).toLocaleDateString()}</span>
              <span>{new Date(currentSprint.endDate).toLocaleDateString()}</span>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>{t.sprintProgress}</span>
                <span>{currentSprint.progress}%</span>
              </div>
              <Progress value={currentSprint.progress} />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-accent" />
                <span>{t.completed}: {currentSprint.tasksCompleted}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span>{t.inProgress}: {currentSprint.tasksInProgress}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <span>{t.blocked}: {currentSprint.tasksBlocked}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                <span>Total: {currentSprint.tasksTotal}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {t.teamStatus}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className={getRoleColor(member.role)}>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                        member.isOnline ? 'bg-accent' : 'bg-muted-foreground'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{member.role}</p>
                    </div>
                  </div>
                  <Badge variant={member.isOnline ? "default" : "secondary"}>
                    {member.isOnline ? t.online : t.offline}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            {t.recentActivity}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                {getActivityIcon(activity.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{' '}
                    {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}