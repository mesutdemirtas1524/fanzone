'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'
import BottomNavigation from '../components/BottomNavigation'

export default function GamePage() {
  const router = useRouter()
  const { colors, theme } = useTheme()

  const games = [
    {
      id: 'daily-shoot',
      title: 'Günlük Şut',
      description: 'Her gün yeni bir şut yarışması! Hedefi vur, puan kazan ve liderlik tablosunda yerini al.',
      icon: '⚽',
      gradient: 'from-green-600 to-green-500',
      status: 'active',
      players: '12,450',
      prize: '500 XP',
      difficulty: 'Kolay',
      bgPattern: '⚽⚽⚽',
      href: '/game/daily-shoot'
    },
    {
      id: 'mini-fantasy',
      title: 'Mini Fantazi Oyunu',
      description: 'Takımını kur, maçları takip et ve en yüksek puanı topla. Haftalık ödüller seni bekliyor!',
      icon: '🎯',
      gradient: 'from-blue-600 to-blue-500',
      status: 'active',
      players: '8,230',
      prize: '1,000 XP',
      difficulty: 'Orta',
      bgPattern: '🎯🎯🎯',
      href: '#'
    },
    {
      id: 'fan-clash',
      title: 'Fan Clash',
      description: 'Rakibinle düello yap! 5 soru cevapla, hızlı ol ve kazan. En yüksek puanı toplayan kazanır!',
      icon: '⚔️',
      gradient: 'from-red-600 to-red-500',
      status: 'active',
      players: '15,680',
      prize: '750 XP',
      difficulty: 'Orta',
      bgPattern: '⚔️⚔️⚔️',
      href: '/game/fan-clash'
    },
    {
      id: 'football-worlds',
      title: 'Futbol Dünyası',
      description: 'Epik bir futbol macerası! Dünyayı gez, takımları topla ve efsanevi oyuncuları keşfet.',
      icon: '🌍',
      gradient: 'from-purple-600 to-purple-500',
      status: 'coming-soon',
      players: '0',
      prize: '2,500 XP',
      difficulty: 'Zor',
      bgPattern: '🌍🌍🌍',
      href: '#'
    }
  ]

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
            <h1 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">Oyunlar</h1>
            <p className="text-white/90 text-xs lg:text-sm font-medium leading-relaxed">Oyna ve Kazan</p>
          </div>
        </div>
      </header>

      {/* Games List */}
      <section className="p-4 lg:p-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-8">
          {games.map((game, index) => {
            const gradientColors = game.gradient.includes('from-green')
              ? { from: '#16A34A', to: '#22C55E', shadow: 'rgba(34, 197, 94, 0.4)' }
              : game.gradient.includes('from-blue')
              ? { from: '#2563EB', to: '#3B82F6', shadow: 'rgba(59, 130, 246, 0.4)' }
              : game.gradient.includes('from-red')
              ? { from: '#DC2626', to: '#EF4444', shadow: 'rgba(239, 68, 68, 0.4)' }
              : game.gradient.includes('from-yellow')
              ? { from: '#EAB308', to: '#F59E0B', shadow: 'rgba(245, 158, 11, 0.4)' }
              : { from: '#9333EA', to: '#A855F7', shadow: 'rgba(168, 85, 247, 0.4)' }
            
            return (
              <div
                key={game.id}
                className={`group relative rounded-3xl overflow-hidden animate-slide-up cursor-pointer transform transition-all duration-300 ${
                  game.status === 'coming-soon' ? 'opacity-70' : 'hover:scale-105 hover:shadow-2xl'
                }`}
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  boxShadow: `0 20px 50px ${gradientColors.shadow}`
                }}
              >
                {/* Background Pattern */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)`
                  }}
                ></div>
                
                {/* Gradient Background */}
                <div 
                  className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    opacity: game.status === 'coming-soon' ? 0.7 : 0.95,
                    background: `linear-gradient(135deg, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`
                  }}
                ></div>
                
                {/* Decorative Pattern Icons */}
                <div className="absolute top-4 right-4 opacity-5 text-8xl lg:text-9xl font-bold transform rotate-12">
                  {game.bgPattern}
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-6 lg:p-8 min-h-[400px] lg:min-h-[450px] flex flex-col">
                  {/* Icon and Status */}
                  <div className="flex items-start justify-between mb-6">
                    <div 
                      className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl lg:text-6xl shadow-2xl border-2 border-white/30"
                    >
                      {game.icon}
                    </div>
                    {game.status === 'coming-soon' && (
                      <span 
                        className="px-4 py-2 bg-white/20 backdrop-blur-md text-white text-xs lg:text-sm font-bold rounded-full border border-white/30 shadow-lg"
                      >
                        Yakında
                      </span>
                    )}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg">
                    {game.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/90 text-sm lg:text-base font-medium mb-6 leading-relaxed flex-grow">
                    {game.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                      <p className="text-white/70 text-xs font-medium mb-1">Oyuncu</p>
                      <p className="text-white font-bold text-sm lg:text-base">{game.players}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                      <p className="text-white/70 text-xs font-medium mb-1">Ödül</p>
                      <p className="text-white font-bold text-sm lg:text-base">{game.prize}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                      <p className="text-white/70 text-xs font-medium mb-1">Zorluk</p>
                      <p className="text-white font-bold text-sm lg:text-base">{game.difficulty}</p>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  {game.status === 'active' ? (
                    <Link
                      href={game.href || '#'}
                      className="w-full py-4 bg-white text-gray-900 rounded-xl text-base lg:text-lg font-bold hover:bg-gray-100 transition-all shadow-2xl text-center leading-tight transform group-hover:scale-105"
                      style={{
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      Oyna →
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full py-4 bg-white/20 backdrop-blur-md text-white rounded-xl text-base lg:text-lg font-bold cursor-not-allowed border border-white/30 leading-tight"
                    >
                      Yakında Gelecek
                    </button>
                  )}
                </div>
                
                {/* Hover Glow Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${gradientColors.to}40, transparent 70%)`
                  }}
                ></div>
              </div>
            )
          })}
        </div>

        {/* Info Card */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="relative rounded-3xl p-6 lg:p-8 overflow-hidden backdrop-blur-sm border border-white/20 group hover:scale-[1.02] transition-transform duration-300"
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
              boxShadow: `0 20px 50px ${colors.primary}40`
            }}
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)'
            }}></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl lg:text-5xl shadow-lg border-2 border-white/30"
                >
                  🏆
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-2xl lg:text-3xl leading-tight mb-1">Liderlik Tablosu</h3>
                  <p className="text-white/70 text-sm lg:text-base font-medium leading-relaxed">
                    En iyi oyuncuları gör
                  </p>
                </div>
              </div>
              <p className="text-white/90 text-base lg:text-lg font-medium mb-6 leading-relaxed">
                Oyunlarda başarılı ol, puan kazan ve liderlik tablosunda yerini al! Haftalık ve aylık ödüller seni bekliyor.
              </p>
              <button 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl text-sm lg:text-base font-bold hover:bg-white/30 transition-all shadow-lg border border-white/30 leading-tight"
                style={{ color: colors.secondary === '#FFFFFF' ? colors.secondary : 'white' }}
              >
                Liderlik Tablosunu Gör
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Bottom Navigation */}
      <BottomNavigation />
    </main>
  )
}
