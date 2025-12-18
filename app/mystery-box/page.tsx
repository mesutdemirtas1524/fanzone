'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import BottomNavigation from '../components/BottomNavigation'
import Image from 'next/image'

export default function MysteryBoxPage() {
  const router = useRouter()
  const { colors, theme } = useTheme()
  const [selectedBox, setSelectedBox] = useState<'common' | 'rare' | 'legendary' | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [reward, setReward] = useState<{ name: string; image: string } | null>(null)
  const [confetti, setConfetti] = useState(false)

  const getTeamLogo = () => {
    switch(theme) {
      case 'galatasaray': return 'GS'
      case 'fenerbahce': return 'FB'
      case 'besiktas': return 'BJK'
      case 'milli-takim': return 'TÜ'
      default: return 'FZ'
    }
  }

  const boxes = [
    {
      id: 'common' as const,
      name: 'NORMAL',
      icon: '📦',
      xpPrice: 500,
      tlPrice: 25,
      gradient: { from: '#4B5563', to: '#1F2937' }
    },
    {
      id: 'rare' as const,
      name: 'NADİR',
      icon: '💎',
      xpPrice: 1000,
      tlPrice: 50,
      gradient: { from: colors.primary, to: colors.dark }
    },
    {
      id: 'legendary' as const,
      name: 'EFSANE',
      icon: '👑',
      xpPrice: 2500,
      tlPrice: 100,
      gradient: { from: colors.secondary, to: colors.accent }
    }
  ]

  const rewards = {
    common: [
      { name: 'Futbol Topu', image: '/assets/futboltopu.png' },
      { name: 'Forma Rozeti', image: '/assets/rozet.png' },
      { name: 'Dijital Kart', image: '/assets/kart.png' },
      { name: 'XP Boost', image: '/assets/xpboost.png' }
    ],
    rare: [
      { name: 'İmzalı Forma', image: '/assets/imzaliforma.png' },
      { name: 'VIP Bilet', image: '/assets/vipbilet.png' },
      { name: 'Özel Rozet', image: '/assets/ozelrozet.png' },
      { name: 'Nadir Kart', image: '/assets/nadirkart.png' }
    ],
    legendary: [
      { name: 'Efsanevi Forma', image: '/assets/efsaneform.png' },
      { name: 'Altın Rozet', image: '/assets/altinrozet.png' },
      { name: 'Efsanevi Kart', image: '/assets/efsanekart.png' },
      { name: 'Özel Deneyim', image: '/assets/ozeldeneyim.png' }
    ]
  }

  const handleBoxClick = (boxId: 'common' | 'rare' | 'legendary') => {
    setSelectedBox(boxId)
    setShowPaymentModal(true)
  }

  const handleOpenBox = async (paymentType: 'xp' | 'tl') => {
    setShowPaymentModal(false)
    setIsOpening(true)
    
    // Açılış animasyonu
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Rastgele ödül seç
    const boxRewards = rewards[selectedBox!]
    const randomReward = boxRewards[Math.floor(Math.random() * boxRewards.length)]
    
    setReward(randomReward)
    setConfetti(true)
    setIsOpening(false)
    setShowReward(true)
    
    // Konfeti animasyonunu durdur
    setTimeout(() => setConfetti(false), 3000)
  }

  const handleCloseReward = () => {
    setShowReward(false)
    setReward(null)
    setSelectedBox(null)
  }

  return (
    <main 
      className="min-h-screen w-full pb-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.dark} 0%, black 50%, ${colors.dark} 100%)`
      }}
    >
      {/* Confetti Animation */}
      {confetti && (
        <div className="fixed inset-0 z-[200] pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'][Math.floor(Math.random() * 6)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 lg:p-8 lg:px-12 sticky top-0 backdrop-blur-md" style={{ backgroundColor: `${colors.dark}CC` }}>
        <div className="flex items-center gap-3 mb-4 lg:mb-6">
          <button 
            onClick={() => router.back()} 
            className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white text-xl lg:text-2xl bg-white/10 rounded-lg hover:bg-white/20 transition-all shadow-lg"
          >
            ←
          </button>
          <div>
            <h1 
              className="text-2xl lg:text-5xl font-black tracking-tight leading-tight"
              style={{ color: colors.secondary }}
            >
              GİZEMLİ KUTU
            </h1>
            <p className="text-white/70 text-xs lg:text-sm font-medium leading-relaxed">Nadir Ödüller Aç</p>
          </div>
        </div>
      </header>

      {/* Box Selection */}
      <section className="relative z-10 p-4 lg:p-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-8">
          {boxes.map((box, index) => (
            <div
              key={box.id}
              onClick={() => handleBoxClick(box.id)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 animate-slide-up"
              style={{
                animationDelay: `${index * 0.15}s`,
                background: `linear-gradient(135deg, ${box.gradient.from} 0%, ${box.gradient.to} 100%)`,
                boxShadow: `0 20px 50px ${box.gradient.from}40`
              }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)'
                }}></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 lg:p-10 text-center min-h-[300px] lg:min-h-[350px] flex flex-col items-center justify-center">
                <div 
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl lg:text-6xl mb-6 shadow-2xl border-2 border-white/30"
                >
                  {box.icon}
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
                  {box.name}
                </h3>
                
                <div className="space-y-3 w-full">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                    <p className="text-white/70 text-xs font-medium mb-1">XP ile</p>
                    <p className="text-white font-bold text-lg lg:text-xl">{box.xpPrice} XP</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                    <p className="text-white/70 text-xs font-medium mb-1">TL ile</p>
                    <p className="text-white font-bold text-lg lg:text-xl">{box.tlPrice} ₺</p>
                  </div>
                </div>
              </div>

              {/* Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${box.gradient.to}40, transparent 70%)`
                }}
              ></div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Modal */}
      {showPaymentModal && selectedBox && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
            onClick={() => setShowPaymentModal(false)}
          ></div>
          <div 
            className="relative rounded-3xl p-6 lg:p-8 shadow-2xl animate-slide-up max-w-md w-full backdrop-blur-sm border border-white/20"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: `0 20px 60px ${colors.primary}50`
            }}
          >
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{ color: colors.primary }}
            >
              <span className="text-2xl">×</span>
            </button>

            <div className="text-center mb-6">
              <div 
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl lg:text-5xl"
                style={{
                  background: `linear-gradient(135deg, ${boxes.find(b => b.id === selectedBox)!.gradient.from} 0%, ${boxes.find(b => b.id === selectedBox)!.gradient.to} 100%)`
                }}
              >
                {boxes.find(b => b.id === selectedBox)!.icon}
              </div>
              <h2 
                className="text-2xl lg:text-3xl font-extrabold mb-2 leading-tight"
                style={{ color: colors.primary }}
              >
                {boxes.find(b => b.id === selectedBox)!.name} KUTU
              </h2>
              <p className="text-gray-600 text-sm lg:text-base font-medium leading-relaxed">
                Ödeme yöntemini seçin
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleOpenBox('xp')}
                className="w-full py-4 px-6 rounded-xl font-bold text-base lg:text-lg shadow-lg hover:shadow-xl transition-all leading-tight text-left flex items-center justify-between"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
                  color: 'white',
                  boxShadow: `0 10px 30px ${colors.primary}40`
                }}
              >
                <div>
                  <p className="text-sm font-medium opacity-90 mb-1">XP ile Aç</p>
                  <p className="text-xl">{boxes.find(b => b.id === selectedBox)!.xpPrice} XP</p>
                </div>
                <span className="text-2xl">⚡</span>
              </button>
              
              <button
                onClick={() => handleOpenBox('tl')}
                className="w-full py-4 px-6 rounded-xl font-bold text-base lg:text-lg shadow-lg hover:shadow-xl transition-all leading-tight text-left flex items-center justify-between"
                style={{
                  background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`,
                  color: colors.secondary === '#FFFFFF' ? colors.primary : colors.dark,
                  boxShadow: `0 10px 30px ${colors.secondary}40`
                }}
              >
                <div>
                  <p className="text-sm font-medium opacity-90 mb-1">TL ile Aç</p>
                  <p className="text-xl">{boxes.find(b => b.id === selectedBox)!.tlPrice} ₺</p>
                </div>
                <span className="text-2xl">💳</span>
              </button>
            </div>

            <button
              onClick={() => setShowPaymentModal(false)}
              className="w-full py-3 text-gray-600 text-sm lg:text-base font-medium hover:text-gray-900 transition-colors leading-relaxed"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Opening Animation */}
      {isOpening && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="text-center">
            <div 
              className="w-48 h-48 lg:w-64 lg:h-64 rounded-3xl mx-auto mb-8 flex items-center justify-center text-7xl lg:text-9xl animate-bounce"
              style={{
                background: `linear-gradient(135deg, ${selectedBox ? boxes.find(b => b.id === selectedBox)!.gradient.from : colors.primary} 0%, ${selectedBox ? boxes.find(b => b.id === selectedBox)!.gradient.to : colors.dark} 100%)`,
                boxShadow: `0 0 60px ${selectedBox ? boxes.find(b => b.id === selectedBox)!.gradient.from : colors.primary}80`
              }}
            >
              {selectedBox && boxes.find(b => b.id === selectedBox)!.icon}
            </div>
            <p className="text-white text-2xl lg:text-4xl font-extrabold animate-pulse leading-tight">
              AÇILIYOR...
            </p>
          </div>
        </div>
      )}

      {/* Reward Modal */}
      {showReward && reward && (
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
              {reward.name} kazandınız!
            </p>

            <div className="w-48 h-48 lg:w-64 lg:h-64 mx-auto mb-6 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
              <Image
                src={reward.image}
                alt={reward.name}
                width={256}
                height={256}
                className="w-full h-full object-cover"
                unoptimized
                onError={(e) => {
                  // Görsel yoksa placeholder göster
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-6xl">${reward.name.includes('Futbol') ? '⚽' : reward.name.includes('Forma') ? '👕' : reward.name.includes('Rozet') ? '🏅' : reward.name.includes('Kart') ? '🃏' : '🎁'}</div>`
                  }
                }}
              />
            </div>

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
