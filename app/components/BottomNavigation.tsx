'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'

export default function BottomNavigation() {
  const pathname = usePathname()
  const { colors, theme } = useTheme()

  const navItems = [
    {
      id: 'dashboard',
      title: 'Ana Sayfa',
      icon: '🏠',
      href: '/dashboard'
    },
    {
      id: 'marketplace',
      title: 'Market',
      icon: '🛒',
      href: '/marketplace'
    },
    {
      id: 'game',
      title: 'Oyunlar',
      icon: '⚽',
      href: '/game'
    },
    {
      id: 'profile',
      title: 'Profil',
      icon: '👤',
      href: '/profile'
    }
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname?.startsWith(href)
  }

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg border-t border-white/10"
      style={{
        backgroundColor: `${colors.dark}E6`,
        boxShadow: `0 -5px 20px ${colors.primary}20`
      }}
    >
      <div className="flex items-center justify-around px-2 py-3 lg:py-4">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 lg:gap-2 px-4 py-2 rounded-xl transition-all ${
                active ? 'scale-110' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <div
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center text-xl lg:text-2xl transition-all ${
                  active ? 'shadow-lg' : ''
                }`}
                style={{
                  backgroundColor: active ? colors.primary : 'rgba(255, 255, 255, 0.1)',
                  color: active ? colors.secondary : 'white',
                  boxShadow: active ? `0 5px 15px ${colors.primary}40` : 'none'
                }}
              >
                {item.icon}
              </div>
              <span
                className={`text-xs lg:text-sm font-bold transition-colors leading-tight ${
                  active ? '' : 'text-white/70'
                }`}
                style={{
                  color: active ? colors.secondary : 'white'
                }}
              >
                {item.title}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

