'use client'

import { useRouter } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'
import Image from 'next/image'
import BottomNavigation from '../components/BottomNavigation'

export default function ProfilePage() {
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

  const getTeamName = () => {
    switch(theme) {
      case 'galatasaray': return 'Galatasaray'
      case 'fenerbahce': return 'Fenerbahçe'
      case 'besiktas': return 'Beşiktaş'
      case 'milli-takim': return 'Milli Takım'
      default: return 'Fan Zone'
    }
  }

  // Mock Data
  const userProfile = {
    name: 'Ahmet Yılmaz',
    username: '@ahmetyilmaz',
    level: 12,
    xp: 18490,
    xpToNextLevel: 2000,
    xpProgress: 85,
    tokens: 2350,
    badges: 12,
    cards: 5,
    joinDate: '15 Ocak 2023',
    verified: true,
    avatar: null
  }

  const stats = [
    { label: 'Toplam Puan', value: '45,230', icon: '⭐', color: colors.secondary },
    { label: 'Oynanan Oyun', value: '127', icon: '🎮', color: colors.primary },
    { label: 'Kazanılan Rozet', value: '12', icon: '🏆', color: colors.accent },
    { label: 'Toplam Kart', value: '5', icon: '🃏', color: colors.secondary }
  ]

  const badges = [
    { id: 1, name: 'İlk Adım', icon: '🌟', rarity: 'common', earned: true },
    { id: 2, name: 'Şampiyon', icon: '👑', rarity: 'legendary', earned: true },
    { id: 3, name: 'Düello Ustası', icon: '⚔️', rarity: 'rare', earned: true },
    { id: 4, name: 'Koleksiyoncu', icon: '📦', rarity: 'rare', earned: true },
    { id: 5, name: 'Sadık Taraftar', icon: '❤️', rarity: 'legendary', earned: true },
    { id: 6, name: 'Yeni Başlangıç', icon: '✨', rarity: 'common', earned: false }
  ]

  const recentActivities = [
    { id: 1, type: 'game', title: 'Daily Shoot oynadı', points: '+150 XP', time: '2 saat önce', icon: '⚽' },
    { id: 2, type: 'badge', title: 'Yeni rozet kazandı: Düello Ustası', points: '+500 XP', time: '1 gün önce', icon: '🏆' },
    { id: 3, type: 'purchase', title: 'Marketplace\'den ürün satın aldı', points: '-2,500 ₺', time: '2 gün önce', icon: '🛒' },
    { id: 4, type: 'box', title: 'Gizem Kutusu açtı', points: '+200 XP', time: '3 gün önce', icon: '📦' },
    { id: 5, type: 'clash', title: 'Fan Clash kazandı', points: '+300 XP', time: '5 gün önce', icon: '⚔️' }
  ]

  const achievements = [
    { id: 1, title: '100 Oyun', description: '100 oyun tamamla', progress: 127, target: 100, completed: true, icon: '🎯' },
    { id: 2, title: '10 Rozet', description: '10 rozet topla', progress: 12, target: 10, completed: true, icon: '🏅' },
    { id: 3, title: 'Seviye 15', description: 'Seviye 15\'e ulaş', progress: 12, target: 15, completed: false, icon: '📈' },
    { id: 4, title: '50 Düello', description: '50 düello kazan', progress: 34, target: 50, completed: false, icon: '⚔️' }
  ]

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
            <button 
              onClick={() => router.back()} 
              className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white text-xl lg:text-2xl bg-white/10 rounded-lg hover:bg-white/20 transition-all shadow-lg"
            >
              ←
            </button>
            <div>
              <h1 
                className="text-2xl lg:text-4xl font-extrabold tracking-tight leading-tight"
                style={{ color: colors.secondary }}
              >
                PROFİL
              </h1>
              <p className="text-white/70 text-xs lg:text-sm font-medium leading-relaxed">Hesap Bilgileri</p>
            </div>
          </div>
          <button 
            className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all shadow-lg"
            style={{ color: colors.secondary }}
          >
            <span className="text-xl lg:text-2xl">⚙️</span>
          </button>
        </div>
      </header>

      {/* Profile Section */}
      <section className="p-4 lg:p-8 lg:px-12 max-w-6xl mx-auto">
        {/* Profile Card */}
        <div className="relative rounded-3xl p-6 lg:p-8 mb-6 lg:mb-8 overflow-hidden backdrop-blur-sm border border-white/10" style={{
          background: 'rgba(255, 255, 255, 0.05)',
          boxShadow: `0 20px 50px ${colors.primary}30`
        }}>
          <div 
            className="absolute inset-0 opacity-90 rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`
            }}
          ></div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 mb-6">
              {/* Avatar */}
              <div className="relative">
                <div 
                  className="w-32 h-32 lg:w-40 lg:h-40 rounded-full flex items-center justify-center border-4 shadow-lg"
                  style={{
                    backgroundColor: colors.light,
                    borderColor: colors.secondary
                  }}
                >
                  {userProfile.avatar ? (
                    <Image
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      width={160}
                      height={160}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span 
                      className="font-extrabold text-4xl lg:text-5xl"
                      style={{ color: colors.primary }}
                    >
                      {userProfile.name.charAt(0)}
                    </span>
                  )}
                </div>
                {userProfile.verified && (
                  <div 
                    className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center border-4 shadow-lg"
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
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                  <h2 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight">{userProfile.name}</h2>
                </div>
                <p 
                  className="text-sm lg:text-base font-medium mb-3"
                  style={{ color: colors.secondary }}
                >
                  {userProfile.username}
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <div 
                    className="px-4 py-2 rounded-xl font-bold text-sm lg:text-base"
                    style={{
                      backgroundColor: `${colors.secondary}20`,
                      color: colors.secondary
                    }}
                  >
                    Seviye {userProfile.level}
                  </div>
                  <div className="text-white/70 text-xs lg:text-sm font-medium">
                    {getTeamName()} Taraftarı
                  </div>
                </div>

                {/* XP Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-xs lg:text-sm font-medium">XP İlerleme</span>
                    <span className="text-white text-xs lg:text-sm font-bold">{userProfile.xp} / {userProfile.xp + userProfile.xpToNextLevel} XP</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${userProfile.xpProgress}%`,
                        background: `linear-gradient(to right, ${colors.secondary}, ${colors.accent})`
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button 
                className="px-6 py-3 border-2 rounded-xl font-bold text-sm lg:text-base hover:opacity-80 transition-all shadow-lg"
                style={{
                  borderColor: colors.secondary,
                  color: colors.secondary,
                  backgroundColor: `${colors.secondary}20`
                }}
              >
                Düzenle
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="rounded-2xl p-4 backdrop-blur-sm border border-white/10"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    boxShadow: `0 10px 30px ${stat.color}20`
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                      style={{
                        backgroundColor: `${stat.color}20`,
                        color: stat.color
                      }}
                    >
                      {stat.icon}
                    </div>
                    <div className="flex-1">
                      <div 
                        className="text-2xl lg:text-3xl font-bold leading-tight"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-white/70 text-xs font-medium leading-tight mt-1">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight">Rozetler</h3>
            <button 
              className="text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: colors.secondary }}
            >
              Tümünü Gör →
            </button>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`relative rounded-2xl p-4 text-center backdrop-blur-sm border transition-all ${
                  badge.earned ? 'border-white/20' : 'border-white/10 opacity-50'
                }`}
                style={{
                  background: badge.earned 
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.02)',
                  boxShadow: badge.earned ? `0 10px 30px ${colors.primary}20` : 'none'
                }}
              >
                <div 
                  className={`text-4xl lg:text-5xl mb-2 ${!badge.earned && 'grayscale opacity-30'}`}
                >
                  {badge.icon}
                </div>
                <p className="text-white text-xs font-bold leading-tight">{badge.name}</p>
                {badge.earned && (
                  <div 
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse"
                    style={{ backgroundColor: colors.secondary }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-6 lg:mb-8">
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 leading-tight">Başarımlar</h3>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="relative rounded-2xl p-5 lg:p-6 backdrop-blur-sm border border-white/10"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: `0 10px 30px ${colors.primary}20`
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{
                      backgroundColor: `${colors.primary}20`,
                      color: colors.primary
                    }}
                  >
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-bold text-base lg:text-lg leading-tight">{achievement.title}</h4>
                      {achievement.completed && (
                        <span 
                          className="text-xs font-bold px-2 py-1 rounded-lg"
                          style={{
                            backgroundColor: `${colors.secondary}20`,
                            color: colors.secondary
                          }}
                        >
                          Tamamlandı
                        </span>
                      )}
                    </div>
                    <p className="text-white/70 text-sm font-medium mb-3 leading-relaxed">{achievement.description}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%`,
                            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`
                          }}
                        ></div>
                      </div>
                      <span className="text-white/80 text-xs font-bold">
                        {achievement.progress} / {achievement.target}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 leading-tight">Son Aktiviteler</h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="rounded-2xl p-4 backdrop-blur-sm border border-white/10 flex items-center gap-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: `0 5px 20px ${colors.primary}10`
                }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary
                  }}
                >
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm lg:text-base leading-tight mb-1">{activity.title}</p>
                  <p className="text-white/60 text-xs font-medium leading-relaxed">{activity.time}</p>
                </div>
                <div 
                  className="text-sm font-bold"
                  style={{ 
                    color: activity.points.startsWith('+') ? colors.secondary : colors.primary 
                  }}
                >
                  {activity.points}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Bottom Navigation */}
      <BottomNavigation />
    </main>
  )
}

