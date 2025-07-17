import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronDown, 
  ChevronRight, 
  Calendar,
  FileText,
  Target,
  CheckCircle2,
  Circle,
  Filter,
  Search,
  SortAsc
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { TimelineItem, ProductTimeline } from '@/types'

interface ProductTimelineProps {
  language: 'en' | 'es'
}

export function ProductTimeline({ language }: ProductTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [showCompleted, setShowCompleted] = useState(true)

  const texts = {
    en: {
      title: 'Product Timeline',
      description: 'Track project milestones and deliverables',
      search: 'Search timeline...',
      showCompleted: 'Show completed',
      dueDate: 'Due Date',
      complete: 'Complete',
      name: 'Name',
      moreProperties: 'more properties',
      buyerLeadMagnet: 'Buyer lead magnet',
      sellerLeadMagnet: 'Seller lead magnet',
      webAgent: 'Web agent',
      leadProfiler: 'Lead profiler',
      propertyMatch: 'Property Match',
      marketAnalysis: 'Market Analysis',
      roiCalculator: 'ROI Calculator',
      mortgageBridge: 'Mortgage Bridge',
      tourScheduler: 'Tour Scheduler',
      propertyAssessment: 'Property Assessment',
      pricingStrategy: 'Pricing Strategy',
      netProfitCalculator: 'Net Profit Calculator',
      callToAction: 'Call to action, connect with Agent',
      emailAgent: 'Email agent',
      payment: 'Payment',
      dashboard: 'Dashboard',
      convertTools: 'Convert the essential tools to MCP for the agent to use'
    },
    es: {
      title: 'Timeline del Producto',
      description: 'Seguimiento de hitos y entregables del proyecto',
      search: 'Buscar en timeline...',
      showCompleted: 'Mostrar completados',
      dueDate: 'Fecha Límite',
      complete: 'Completar',
      name: 'Nombre',
      moreProperties: 'más propiedades',
      buyerLeadMagnet: 'Imán de leads de compradores',
      sellerLeadMagnet: 'Imán de leads de vendedores',
      webAgent: 'Agente web',
      leadProfiler: 'Perfilador de leads',
      propertyMatch: 'Coincidencia de Propiedades',
      marketAnalysis: 'Análisis de Mercado',
      roiCalculator: 'Calculadora ROI',
      mortgageBridge: 'Puente Hipotecario',
      tourScheduler: 'Programador de Tours',
      propertyAssessment: 'Evaluación de Propiedades',
      pricingStrategy: 'Estrategia de Precios',
      netProfitCalculator: 'Calculadora de Beneficio Neto',
      callToAction: 'Llamada a la acción, conectar con Agente',
      emailAgent: 'Agente de email',
      payment: 'Pago',
      dashboard: 'Panel de control',
      convertTools: 'Convertir las herramientas esenciales a MCP para que las use el agente'
    }
  }

  const t = texts[language]

  // Mock data based on the images provided
  const mockTimeline: ProductTimeline = {
    id: 'copilot-timeline',
    title: 'Copilot Real Estate Timeline',
    description: 'Complete product development roadmap',
    items: [
      {
        id: 'buyer-lead-magnet',
        name: t.buyerLeadMagnet,
        dueDate: 'July 17, 2025',
        completed: false,
        type: 'milestone',
        expanded: true,
        children: [
          {
            id: 'lead-profiler',
            name: t.leadProfiler,
            completed: false,
            type: 'task'
          },
          {
            id: 'property-match',
            name: t.propertyMatch,
            completed: false,
            type: 'task'
          },
          {
            id: 'market-analysis-1',
            name: t.marketAnalysis,
            completed: false,
            type: 'task'
          },
          {
            id: 'roi-calculator',
            name: t.roiCalculator,
            completed: false,
            type: 'task'
          },
          {
            id: 'mortgage-bridge',
            name: t.mortgageBridge,
            completed: false,
            type: 'task'
          },
          {
            id: 'tour-scheduler',
            name: t.tourScheduler,
            completed: false,
            type: 'task'
          }
        ]
      },
      {
        id: 'seller-lead-magnet',
        name: t.sellerLeadMagnet,
        dueDate: 'July 16, 2025',
        completed: false,
        type: 'milestone',
        expanded: true,
        children: [
          {
            id: 'property-assessment',
            name: t.propertyAssessment,
            completed: false,
            type: 'task'
          },
          {
            id: 'market-analysis-2',
            name: t.marketAnalysis,
            completed: false,
            type: 'task'
          },
          {
            id: 'pricing-strategy',
            name: t.pricingStrategy,
            completed: false,
            type: 'task'
          },
          {
            id: 'net-profit-calculator',
            name: t.netProfitCalculator,
            completed: false,
            type: 'task'
          },
          {
            id: 'call-to-action',
            name: t.callToAction,
            completed: false,
            type: 'task'
          },
          {
            id: 'email-agent',
            name: t.emailAgent,
            completed: false,
            type: 'task'
          },
          {
            id: 'payment',
            name: t.payment,
            completed: false,
            type: 'task'
          },
          {
            id: 'dashboard',
            name: t.dashboard,
            completed: false,
            type: 'task'
          }
        ]
      },
      {
        id: 'web-agent',
        name: t.webAgent,
        completed: false,
        type: 'milestone',
        expanded: true,
        children: [
          {
            id: 'convert-tools',
            name: t.convertTools,
            completed: false,
            type: 'task'
          }
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  const [timeline, setTimeline] = useState(mockTimeline)

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const toggleCompleted = (itemId: string, parentId?: string) => {
    const updateItem = (items: TimelineItem[]): TimelineItem[] => {
      return items.map(item => {
        if (item.id === itemId) {
          return { ...item, completed: !item.completed }
        }
        if (item.children) {
          return { ...item, children: updateItem(item.children) }
        }
        return item
      })
    }

    setTimeline(prev => ({
      ...prev,
      items: updateItem(prev.items)
    }))
  }

  const getTypeIcon = (type: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle2 className="h-4 w-4 text-primary" />
    }
    
    switch (type) {
      case 'milestone':
        return <Target className="h-4 w-4 text-accent" />
      case 'task':
        return <Circle className="h-4 w-4 text-muted-foreground" />
      case 'deliverable':
        return <FileText className="h-4 w-4 text-muted-foreground" />
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const filteredItems = timeline.items.filter(item => {
    if (!showCompleted && item.completed) return false
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const renderTimelineItem = (item: TimelineItem, level = 0, parentId?: string) => {
    const isExpanded = expandedItems.has(item.id) || item.expanded
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id} className={cn("border-l-2 border-border", level > 0 && "ml-6")}>
        <div className="relative pl-6 pb-4">
          {/* Timeline dot */}
          <div className="absolute -left-2 top-2 h-4 w-4 rounded-full bg-background border-2 border-border flex items-center justify-center">
            {getTypeIcon(item.type, item.completed)}
          </div>

          {/* Item content */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3 flex-1">
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(item.id)}
                  className="h-6 w-6 p-0"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </Button>
              )}
              
              <Checkbox
                checked={item.completed}
                onCheckedChange={() => toggleCompleted(item.id, parentId)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              
              <div className="flex items-center gap-2 flex-1">
                <span className={cn(
                  "text-sm font-medium",
                  item.completed && "line-through text-muted-foreground"
                )}>
                  {item.name}
                </span>
                
                {item.type === 'milestone' && (
                  <Badge variant="outline" className="text-xs">
                    Milestone
                  </Badge>
                )}
              </div>
            </div>

            {item.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {item.dueDate}
              </div>
            )}
          </div>

          {/* Children */}
          {hasChildren && isExpanded && (
            <div className="mt-2 space-y-2">
              {item.children!.map(child => renderTimelineItem(child, level + 1, item.id))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {t.title}
              </CardTitle>
              <CardDescription>{t.description}</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              3 {t.moreProperties}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Controls */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={showCompleted}
                  onCheckedChange={setShowCompleted}
                />
                <span className="text-sm">{t.showCompleted}</span>
              </div>
              
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              
              <Button variant="ghost" size="sm">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>

          {/* Timeline Header */}
          <div className="grid grid-cols-12 gap-4 pb-2 mb-4 border-b text-xs font-medium text-muted-foreground">
            <div className="col-span-6 flex items-center gap-2">
              <FileText className="h-3 w-3" />
              {t.name}
            </div>
            <div className="col-span-3 flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              {t.dueDate}
            </div>
            <div className="col-span-3 flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3" />
              {t.complete}
            </div>
          </div>

          {/* Timeline Items */}
          <div className="space-y-1">
            {filteredItems.map(item => renderTimelineItem(item))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}