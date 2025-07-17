import { useState } from 'react'
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  CheckSquare, 
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  language: 'en' | 'es'
}

export function Sidebar({ activeTab, onTabChange, language }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const texts = {
    en: {
      dashboard: 'Dashboard',
      sprints: 'Sprint Planning',
      standups: 'Daily Stand-ups',
      communication: 'Team Chat',
      reports: 'Reports & Analytics',
      backlog: 'Backlog Management'
    },
    es: {
      dashboard: 'Panel Principal',
      sprints: 'Planificación Sprint',
      standups: 'Stand-ups Diarios',
      communication: 'Chat del Equipo',
      reports: 'Reportes y Análisis',
      backlog: 'Gestión de Backlog'
    }
  }

  const t = texts[language]

  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'sprints', label: t.sprints, icon: Calendar },
    { id: 'standups', label: t.standups, icon: MessageSquare },
    { id: 'communication', label: t.communication, icon: Users },
    { id: 'backlog', label: t.backlog, icon: CheckSquare },
    { id: 'reports', label: t.reports, icon: BarChart3 },
  ]

  return (
    <div className={cn(
      "relative flex flex-col h-full bg-card border-r transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border bg-background shadow-md"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start transition-all duration-200",
                collapsed ? "px-2" : "px-4",
                isActive && "bg-primary text-primary-foreground shadow-sm"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className={cn("h-4 w-4", collapsed ? "" : "mr-3")} />
              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </Button>
          )
        })}
      </nav>

      {/* Status Indicator */}
      {!collapsed && (
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span>System Online</span>
          </div>
        </div>
      )}
    </div>
  )
}