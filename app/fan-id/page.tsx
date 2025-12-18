'use client'

import { useRouter } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'

export default function FanIDPage() {
  const router = useRouter()
  const { colors, theme } = useTheme()

  const getTeamLogo = () => {
    switch(theme) {
      case 'galatasaray': return 'GS'
      case 'fenerbahce': return 'FB'
      case 'besiktas': return 'BJK'
      case 'milli-takim': return 'TÜ'
      default: return 'FZ'
    }
  }

  return (
    <main 
      className="min-h-screen w-full pb-20"
      style={{
        background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 50%, ${colors.dark} 100%)`
      }}
    >
      {/* Header */}
      <header className="relative overflow-hidden p-4 lg:p-8 lg:px-12 sticky top-0 z-10 backdrop-blur-md" style={{ backgroundColor: `${colors.dark}E6` }}>
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
        }}></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`,
                boxShadow: `0 20px 50px ${colors.secondary}40`
              }}
            >
              <span 
                className="font-extrabold text-lg lg:text-xl leading-tight"
                style={{ color: colors.secondary === '#FFFFFF' ? colors.primary : colors.dark }}
              >
                {getTeamLogo()}
              </span>
            </div>
            <div>
              <h1 
                className="text-2xl lg:text-4xl font-extrabold tracking-tight leading-tight"
                style={{ color: colors.secondary }}
              >
                FAN PROFİLİ
              </h1>
              <p className="text-white/70 text-xs lg:text-sm font-medium leading-relaxed">İstatistikleriniz</p>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <section className="p-4 lg:p-8 lg:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-8 lg:mb-12">
          <div className="relative inline-block mb-6">
            <div 
              className="w-32 h-32 lg:w-40 lg:h-40 rounded-full mx-auto border-4 shadow-lg"
              style={{
                backgroundColor: colors.light,
                borderColor: colors.secondary
              }}
            ></div>
            <div 
              className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center border-4"
              style={{
                backgroundColor: colors.secondary,
                borderColor: colors.dark
              }}
            >
              <span 
                className="text-xl"
                style={{ color: colors.secondary === '#FFFFFF' ? colors.primary : colors.dark }}
              >
                ✓
              </span>
            </div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">Ahmet</h2>
          <p 
            className="font-bold text-xl lg:text-2xl mb-6 leading-tight"
            style={{ color: colors.secondary }}
          >
            SEVİYE 12
          </p>
          <button 
            className="px-8 py-3 border-2 rounded-xl font-bold text-sm lg:text-base hover:opacity-80 transition-all shadow-lg leading-tight"
            style={{
              borderColor: colors.secondary,
              color: colors.secondary,
              backgroundColor: `${colors.secondary}20`
            }}
          >
            DÜZENLE
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <div 
            className="rounded-2xl p-5 lg:p-6 border-2 backdrop-blur-sm"
            style={{ 
              borderColor: `${colors.secondary}50`,
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: `0 10px 30px ${colors.primary}20`
            }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div 
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`
                }}
              >
                <span 
                  className="text-2xl lg:text-3xl"
                  style={{ color: colors.secondary === '#FFFFFF' ? colors.primary : colors.dark }}
                >
                  ⭐
                </span>
              </div>
              <div className="flex-1">
                <div className="text-3xl lg:text-4xl font-bold text-white leading-tight">2,350</div>
                <div className="text-xs lg:text-sm text-white/70 font-medium uppercase tracking-wider leading-tight">TOKEN</div>
              </div>
            </div>
          </div>
          
          <div 
            className="rounded-2xl p-5 lg:p-6 border-2 backdrop-blur-sm"
            style={{ 
              borderColor: `${colors.secondary}50`,
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: `0 10px 30px ${colors.primary}20`
            }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div 
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`
                }}
              >
                <span className="text-white text-2xl lg:text-3xl font-bold">X</span>
              </div>
              <div className="flex-1">
                <div className="text-3xl lg:text-4xl font-bold text-white leading-tight">18,490</div>
                <div className="text-xs lg:text-sm text-white/70 font-medium uppercase tracking-wider leading-tight">XP</div>
              </div>
            </div>
          </div>

          <div 
            className="rounded-2xl p-5 lg:p-6 border-2 backdrop-blur-sm"
            style={{ 
              borderColor: `${colors.secondary}50`,
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: `0 10px 30px ${colors.primary}20`
            }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div 
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`
                }}
              >
                <span className="text-white text-2xl lg:text-3xl">🏆</span>
              </div>
              <div className="flex-1">
                <div className="text-3xl lg:text-4xl font-bold text-white leading-tight">12</div>
                <div className="text-xs lg:text-sm text-white/70 font-medium uppercase tracking-wider leading-tight">ROZET</div>
              </div>
            </div>
          </div>

          <div 
            className="rounded-2xl p-5 lg:p-6 border-2 backdrop-blur-sm"
            style={{ 
              borderColor: `${colors.secondary}50`,
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: `0 10px 30px ${colors.primary}20`
            }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div 
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)`
                }}
              >
                <span className="text-white text-2xl lg:text-3xl">🃏</span>
              </div>
              <div className="flex-1">
                <div className="text-3xl lg:text-4xl font-bold text-white leading-tight">5</div>
                <div className="text-xs lg:text-sm text-white/70 font-medium uppercase tracking-wider leading-tight">KART</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {[
            { icon: '⭐', text: 'ÖDÜLLERİM', color: `from-[${colors.secondary}] to-[${colors.accent}]` },
            { icon: '🛒', text: 'PAZAR YERİ', color: `from-[${colors.primary}] to-[${colors.dark}]` },
            { icon: '🆔', text: 'FAN ID', color: `from-[${colors.accent}] to-[${colors.primary}]` }
          ].map((item, index) => (
            <button 
              key={index}
              className="w-full rounded-2xl p-5 lg:p-6 flex items-center gap-4 hover:scale-[1.02] transition-transform backdrop-blur-sm border border-white/10"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                boxShadow: `0 10px 30px ${colors.primary}20`
              }}
            >
              <div 
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center text-2xl lg:text-3xl shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${item.color.includes('secondary') ? colors.secondary : item.color.includes('primary') ? colors.primary : colors.accent} 0%, ${item.color.includes('accent') ? colors.accent : item.color.includes('dark') ? colors.dark : colors.primary} 100%)`
                }}
              >
                {item.icon}
              </div>
              <span className="text-white font-bold text-lg lg:text-xl flex-1 text-left leading-tight">{item.text}</span>
              <span 
                className="text-2xl"
                style={{ color: colors.secondary }}
              >
                →
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
