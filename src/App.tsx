import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'
import { SprintPlanning } from '@/components/sprints/SprintPlanning'
import { ProductTimeline } from '@/components/timeline/ProductTimeline'
import { blink } from '@/blink/client'

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [language, setLanguage] = useState<'en' | 'es'>('en')
  const [notifications] = useState(3)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const handleLanguageChange = (lang: 'en' | 'es') => {
    setLanguage(lang)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview language={language} />
      case 'sprints':
        return <SprintPlanning language={language} />
      case 'timeline':
        return <ProductTimeline language={language} />
      case 'standups':
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Daily Stand-ups coming soon...</p>
          </div>
        )
      case 'communication':
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Team Communication coming soon...</p>
          </div>
        )
      case 'backlog':
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Backlog Management coming soon...</p>
          </div>
        )
      case 'reports':
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Reports & Analytics coming soon...</p>
          </div>
        )
      default:
        return <DashboardOverview language={language} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 rounded-lg gradient-bg flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-lg">TA</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">TriPath AI</h2>
            <p className="text-muted-foreground">Loading your agile workspace...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6 max-w-md mx-auto p-6">
          <div className="h-16 w-16 rounded-lg gradient-bg flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-xl">TA</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to TriPath AI</h1>
            <p className="text-muted-foreground mb-6">
              Your multilingual agile facilitator that bridges communication between tech teams, 
              CEOs, and sales/marketing stakeholders.
            </p>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => blink.auth.login()}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-md font-medium transition-colors"
            >
              Sign In to Continue
            </button>
            <p className="text-xs text-muted-foreground">
              Secure authentication powered by Blink
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        language={language} 
        onLanguageChange={handleLanguageChange}
        notifications={notifications}
      />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          language={language}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App