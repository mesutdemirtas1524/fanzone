'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
import BottomNavigation from '../../components/BottomNavigation'

export default function LuckyWheelPage() {
  const router = useRouter()
  const { colors, theme } = useTheme()
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedReward, setSelectedReward] = useState<string | null>(null)
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [canSpin, setCanSpin] = useState(true)
  const [countdown, setCountdown] = useState(0)
  const [lastSpinTime, setLastSpinTime] = useState<number | null>(null)
  const wheelRef = useRef<SVGSVGElement>(null)

  const rewards = [
    { id: 1, name: '100 XP', color: '#16A34A', icon: '⚡' },
    { id: 2, name: '250 XP', color: '#3B82F6', icon: '💎' },
    { id: 3, name: '500 XP', color: '#9333EA', icon: '👑' },
    { id: 4, name: '1000 XP', color: '#F59E0B', icon: '🏆' },
    { id: 5, name: '50 XP', color: '#EF4444', icon: '🎁' },
    { id: 6, name: '200 XP', color: '#10B981', icon: '⭐' },
    { id: 7, name: '750 XP', color: '#8B5CF6', icon: '💫' },
    { id: 8, name: '150 XP', color: '#06B6D4', icon: '🎯' }
  ]

  // 24 saat kontrolü
  useEffect(() => {
    const storedTime = localStorage.getItem('lucky-wheel-last-spin')
    if (storedTime) {
      const lastSpin = parseInt(storedTime)
      const now = Date.now()
      const timeDiff = now - lastSpin
      const hours24 = 24 * 60 * 60 * 1000
      
      if (timeDiff < hours24) {
        setCanSpin(false)
        const remaining = Math.floor((hours24 - timeDiff) / 1000)
        setCountdown(remaining)
        setLastSpinTime(lastSpin)
      } else {
        setCanSpin(true)
        setCountdown(0)
      }
    }
  }, [])

  // Geri sayım
  useEffect(() => {
    if (countdown > 0 && !canSpin) {
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setCanSpin(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearInterval(interval)
    }
  }, [countdown, canSpin])

  const formatCountdown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const spinWheel = () => {
    if (!canSpin || isSpinning) return

    setIsSpinning(true)
    
    // Rastgele ödül seç
    const randomIndex = Math.floor(Math.random() * rewards.length)
    const reward = rewards[randomIndex]
    
    // Çark dönüş açısı hesapla
    const baseRotation = 360 * 5 // 5 tam tur
    const segmentAngle = 360 / rewards.length
    const targetAngle = baseRotation + (360 - (randomIndex * segmentAngle) - segmentAngle / 2)
    
    // Çarkı döndür
    if (wheelRef.current) {
      const svg = wheelRef.current as SVGElement
      svg.style.transform = `rotate(${targetAngle}deg)`
      svg.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
    }

    // Animasyon bitince ödülü göster
    setTimeout(() => {
      setSelectedReward(reward.name)
      setShowRewardModal(true)
      setIsSpinning(false)
      
      // 24 saat cooldown başlat
      const now = Date.now()
      localStorage.setItem('lucky-wheel-last-spin', now.toString())
      setLastSpinTime(now)
      setCanSpin(false)
      setCountdown(24 * 60 * 60) // 24 saat
    }, 4000)
  }

  const handleCloseReward = () => {
    setShowRewardModal(false)
    setSelectedReward(null)
  }

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
      <header 
        className="relative overflow-hidden p-4 lg:p-8 lg:px-12 sticky top-0 z-10 backdrop-blur-md"
        style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
        }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
        }}></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <button 
            onClick={() => router.back()} 
            className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white text-xl lg:text-2xl bg-white/20 rounded-lg hover:bg-white/30 transition-all shadow-lg"
          >
            ←
          </button>
          <div>
            <h1 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">Şanslı Çark</h1>
            <p className="text-white/90 text-xs lg:text-sm font-medium leading-relaxed">Çevir ve Ödül Kazan</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="p-4 lg:p-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Countdown Info */}
          {!canSpin && countdown > 0 && (
            <div 
              className="rounded-2xl p-4 lg:p-6 mb-6 text-center backdrop-blur-sm border border-white/20"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                boxShadow: `0 10px 30px ${colors.primary}20`
              }}
            >
              <p className="text-white text-sm lg:text-base font-medium mb-2 leading-relaxed">
                Bir sonraki çevirme hakkın için bekle
              </p>
              <p 
                className="text-3xl lg:text-4xl font-black font-mono"
                style={{ color: colors.secondary }}
              >
                {formatCountdown(countdown)}
              </p>
            </div>
          )}

          {/* Wheel Container */}
          <div className="relative mb-8">
            <div 
              className="relative w-full max-w-lg mx-auto aspect-square"
            >
              {/* Outer Circle */}
              <div 
                className="absolute inset-0 rounded-full backdrop-blur-sm border-8"
                style={{
                  borderColor: colors.secondary,
                  background: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: `0 20px 50px ${colors.secondary}40`
                }}
              >
                {/* Wheel SVG */}
                <svg
                  ref={wheelRef}
                  className="absolute inset-4 rounded-full"
                  viewBox="0 0 400 400"
                  style={{
                    transform: 'rotate(0deg)',
                    transition: 'none',
                    transformOrigin: '200px 200px'
                  }}
                >
                  {rewards.map((reward, index) => {
                    const segmentAngle = 360 / rewards.length
                    const rotation = index * segmentAngle
                    const startAngle = (rotation - 90) * (Math.PI / 180)
                    const endAngle = (rotation + segmentAngle - 90) * (Math.PI / 180)
                    const largeArc = segmentAngle > 180 ? 1 : 0
                    
                    const x1 = 200 + 180 * Math.cos(startAngle)
                    const y1 = 200 + 180 * Math.sin(startAngle)
                    const x2 = 200 + 180 * Math.cos(endAngle)
                    const y2 = 200 + 180 * Math.sin(endAngle)
                    
                    const textAngle = rotation + segmentAngle / 2
                    const textRadius = 120
                    const textX = 200 + textRadius * Math.cos((textAngle - 90) * (Math.PI / 180))
                    const textY = 200 + textRadius * Math.sin((textAngle - 90) * (Math.PI / 180))
                    
                    return (
                      <g key={reward.id}>
                        <path
                          d={`M 200 200 L ${x1} ${y1} A 180 180 0 ${largeArc} 1 ${x2} ${y2} Z`}
                          fill={reward.color}
                          stroke="white"
                          strokeWidth="3"
                        />
                        <text
                          x={textX}
                          y={textY - 10}
                          textAnchor="middle"
                          fill="white"
                          fontSize="28"
                          fontWeight="bold"
                          transform={`rotate(${textAngle} ${textX} ${textY})`}
                        >
                          {reward.icon}
                        </text>
                        <text
                          x={textX}
                          y={textY + 15}
                          textAnchor="middle"
                          fill="white"
                          fontSize="18"
                          fontWeight="bold"
                          transform={`rotate(${textAngle} ${textX} ${textY})`}
                        >
                          {reward.name}
                        </text>
                      </g>
                    )
                  })}
                </svg>

                {/* Center Circle */}
                <div 
                  className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                >
                  <div 
                    className="w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center shadow-2xl border-4"
                    style={{
                      backgroundColor: colors.secondary,
                      borderColor: colors.primary,
                      boxShadow: `0 0 30px ${colors.secondary}80`
                    }}
                  >
                    <span 
                      className="text-2xl lg:text-3xl font-black"
                      style={{ color: colors.secondary === '#FFFFFF' ? colors.primary : colors.dark }}
                    >
                      {getTeamLogo()}
                    </span>
                  </div>
                </div>

                {/* Pointer */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-0 h-0 border-l-[25px] border-r-[25px] border-t-[40px] border-l-transparent border-r-transparent"
                  style={{
                    borderTopColor: colors.secondary,
                    filter: `drop-shadow(0 0 15px ${colors.secondary}80)`
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Spin Button */}
          <div className="text-center">
            <button
              onClick={spinWheel}
              disabled={!canSpin || isSpinning}
              className={`px-12 py-5 rounded-2xl font-black text-xl lg:text-2xl shadow-2xl transition-all leading-tight ${
                !canSpin || isSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
              }`}
              style={{
                background: canSpin && !isSpinning
                  ? `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`
                  : 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
                color: canSpin && !isSpinning 
                  ? (colors.secondary === '#FFFFFF' ? colors.primary : colors.dark)
                  : 'white',
                boxShadow: canSpin && !isSpinning
                  ? `0 20px 50px ${colors.secondary}50`
                  : '0 10px 30px rgba(0,0,0,0.3)'
              }}
            >
              {isSpinning ? 'ÇARK DÖNÜYOR...' : canSpin ? 'ÇARKI ÇEVİR' : 'BEKLE'}
            </button>
          </div>

          {/* Info */}
          <div 
            className="mt-8 rounded-2xl p-4 lg:p-6 backdrop-blur-sm border border-white/20"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: `0 10px 30px ${colors.primary}20`
            }}
          >
            <p className="text-white text-sm lg:text-base font-medium text-center leading-relaxed">
              💡 Her 24 saatte bir çark çevirme hakkın var! Büyük ödüller seni bekliyor.
            </p>
          </div>
        </div>
      </section>

      {/* Reward Modal */}
      {showRewardModal && selectedReward && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={handleCloseReward}
          ></div>
          <div 
            className="relative rounded-3xl p-6 lg:p-8 shadow-2xl animate-slide-up max-w-md w-full backdrop-blur-sm border border-white/20 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: `0 20px 60px ${colors.secondary}50`
            }}
          >
            <div 
              className="text-6xl lg:text-7xl mb-4 animate-bounce"
            >
              🎉
            </div>
            
            <h2 
              className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight"
              style={{ color: colors.primary }}
            >
              Tebrikler!
            </h2>
            
            <p className="text-gray-700 text-xl lg:text-2xl font-bold mb-6 leading-tight">
              {selectedReward} kazandınız!
            </p>

            <button
              onClick={handleCloseReward}
              className="w-full py-4 text-white rounded-xl font-bold text-base lg:text-lg shadow-lg hover:shadow-xl transition-all leading-tight"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
                boxShadow: `0 10px 30px ${colors.primary}40`
              }}
            >
              Harika!
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </main>
  )
}

