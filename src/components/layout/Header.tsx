import { useState } from 'react'
import { Bell, Globe, Settings, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { blink } from '@/blink/client'

interface HeaderProps {
  user: any
  language: 'en' | 'es'
  onLanguageChange: (lang: 'en' | 'es') => void
  notifications: number
}

export function Header({ user, language, onLanguageChange, notifications }: HeaderProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await blink.auth.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const texts = {
    en: {
      notifications: 'Notifications',
      settings: 'Settings',
      profile: 'Profile',
      logout: 'Logout',
      language: 'Language'
    },
    es: {
      notifications: 'Notificaciones',
      settings: 'Configuración',
      profile: 'Perfil',
      logout: 'Cerrar Sesión',
      language: 'Idioma'
    }
  }

  const t = texts[language]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TA</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">TriPath AI</h1>
              <p className="text-xs text-muted-foreground">Agile Communication Bridge</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLanguageChange(language === 'en' ? 'es' : 'en')}
            className="relative"
          >
            <Globe className="h-4 w-4 mr-2" />
            {language.toUpperCase()}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {notifications > 9 ? '9+' : notifications}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.displayName || user?.email} />
                  <AvatarFallback>
                    {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.displayName || 'User'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{t.profile}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>{t.settings}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t.logout}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}