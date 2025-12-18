'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

export default function DailyShootPage() {
  const router = useRouter()
  const { colors, theme } = useTheme()
  const [shots, setShots] = useState(3)
  const [score, setScore] = useState(0)

  const getTeamLogo = () => {
    switch(theme) {
      case 'galatasaray': return 'GS'
      case 'fenerbahce': return 'FB'
      case 'besiktas': return 'BJK'
      case 'milli-takim': return 'TÜ'
      default: return 'FZ'
    }
  }

  const handleShoot = () => {
    if (shots > 0) {
      const points = Math.floor(Math.random() * 3) + 1
      setScore(score + points)
      setShots(shots - 1)
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
      <header className="relative overflow-hidden p-4 lg:p-8 lg:px-12">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
        }}></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`,
                  boxShadow: `0 10px 30px ${colors.secondary}40`
                }}
              >
                <span 
                  className="font-bold text-base lg:text-lg leading-tight"
                  style={{ color: colors.secondary === '#FFFFFF' ? colors.primary : colors.dark }}
                >
                  {getTeamLogo()}
                </span>
              </div>
              <div>
                <span className="text-white font-bold text-base lg:text-lg leading-tight">FAN ZONE</span>
                <p 
                  className="text-xs font-medium leading-relaxed"
                  style={{ color: colors.secondary }}
                >
                  Oyun
                </p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
              <span className="text-white text-sm lg:text-base font-bold leading-tight">1/3</span>
            </div>
          </div>
          
          <h1 
            className="text-4xl lg:text-6xl font-extrabold text-white text-center mb-4 lg:mb-6 tracking-tight leading-tight"
            style={{ color: colors.secondary }}
          >
            GÜNLÜK ŞUT
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-3">
            <div 
              className="px-6 py-2 rounded-full text-sm lg:text-base font-bold shadow-lg leading-tight"
              style={{
                background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`,
                color: colors.secondary === '#FFFFFF' ? colors.primary : colors.dark
              }}
            >
              {shots}/3 ŞUT HAKKI
            </div>
          </div>
          
          <div className="text-center mb-6">
            <p 
              className="text-3xl lg:text-5xl font-extrabold mb-2 leading-tight"
              style={{ color: colors.secondary }}
            >
              {score} Puan
            </p>
            <p className="text-white/80 text-sm lg:text-base font-medium leading-relaxed">Toplam Skor</p>
          </div>
        </div>
      </header>

      {/* Game Area */}
      <section className="p-4 lg:p-8 lg:px-12 max-w-4xl mx-auto">
        <div 
          className="relative rounded-3xl p-8 lg:p-12 overflow-hidden mb-8 backdrop-blur-sm border border-white/10"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            boxShadow: `0 20px 50px ${colors.primary}40`
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`
            }}
          ></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
          }}></div>
          
          <div className="relative z-10 text-center">
            {/* Goal */}
            <div className="mb-8 lg:mb-12">
              <div className="w-full max-w-md mx-auto aspect-[3/2] relative">
                <div 
                  className="absolute inset-0 border-8 rounded-t-3xl"
                  style={{ borderColor: colors.secondary }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-32 h-32 lg:w-48 lg:h-48 rounded-full border-4 flex items-center justify-center"
                      style={{
                        borderColor: colors.secondary,
                        backgroundColor: `${colors.secondary}20`
                      }}
                    >
                      <span className="text-white text-4xl lg:text-6xl">⚽</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shoot Button */}
            <button
              onClick={handleShoot}
              disabled={shots === 0}
              className={`w-full lg:w-auto lg:px-16 py-5 lg:py-6 text-white rounded-2xl font-bold text-lg lg:text-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed leading-tight ${
                shots === 0 ? '' : 'animate-pulse'
              }`}
              style={{
                background: shots > 0 
                  ? `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`
                  : 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
                color: shots > 0 && colors.secondary === '#FFFFFF' ? colors.primary : (shots > 0 ? colors.dark : 'white'),
                boxShadow: shots > 0 ? `0 20px 50px ${colors.secondary}40` : 'none'
              }}
            >
              {shots > 0 ? 'ŞUT ÇEK!' : 'ŞUT HAKKIN BİTTİ'}
            </button>
          </div>
        </div>

        {/* Sponsor Info */}
        <div 
          className="rounded-2xl p-6 lg:p-8 text-center backdrop-blur-sm border border-white/10"
          style={{
            background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 100%)`,
            boxShadow: `0 10px 30px ${colors.primary}30`
          }}
        >
          <p className="text-white/70 text-sm lg:text-base font-medium mb-2 leading-relaxed">Sponsor</p>
          <p 
            className="text-xl lg:text-2xl font-bold leading-tight"
            style={{ color: colors.secondary }}
          >
            {theme === 'galatasaray' ? 'Galatasaray' : theme === 'fenerbahce' ? 'Fenerbahçe' : theme === 'besiktas' ? 'Beşiktaş' : 'Milli Takım'} Store
          </p>
        </div>
      </section>
    </main>
  )
}
