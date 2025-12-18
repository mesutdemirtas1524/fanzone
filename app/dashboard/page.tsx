'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import BottomNavigation from '../components/BottomNavigation'

export default function DashboardPage() {
  const router = useRouter()
  const { colors, theme } = useTheme()
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [matchTab, setMatchTab] = useState<'past' | 'upcoming'>('upcoming')
  const [selectedScore, setSelectedScore] = useState<{ home: number; away: number } | null>(null)
  const [showScoreModal, setShowScoreModal] = useState(false)
  const [showVoteModal, setShowVoteModal] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

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
      default: return 'Takım'
    }
  }

  const getOpponentTeam = () => {
    switch(theme) {
      case 'galatasaray': return 'Fenerbahçe'
      case 'fenerbahce': return 'Galatasaray'
      case 'besiktas': return 'Galatasaray'
      case 'milli-takim': return 'Almanya'
      default: return 'Rakip'
    }
  }

  const getOpponentLogo = () => {
    switch(theme) {
      case 'galatasaray': return 'FB'
      case 'fenerbahce': return 'GS'
      case 'besiktas': return 'GS'
      case 'milli-takim': return 'DE'
      default: return 'RP'
    }
  }

  // Gelecek maçlar
  const upcomingMatches = [
    {
      id: 1,
      homeTeam: getTeamName(),
      awayTeam: getOpponentTeam(),
      homeLogo: getTeamLogo(),
      awayLogo: getOpponentLogo(),
      date: '2024-12-20',
      time: '19:00',
      stadium: theme === 'galatasaray' ? 'Rams Park' : theme === 'fenerbahce' ? 'Ülker Stadyumu' : theme === 'besiktas' ? 'Vodafone Park' : 'Türk Telekom Stadyumu',
      matchDate: new Date('2024-12-20T19:00:00')
    }
  ]

  // Geçmiş maçlar
  const pastMatches = [
    {
      id: 1,
      homeTeam: getTeamName(),
      awayTeam: getOpponentTeam(),
      homeLogo: getTeamLogo(),
      awayLogo: getOpponentLogo(),
      date: '2024-12-10',
      time: '19:00',
      homeScore: 2,
      awayScore: 1,
      manOfTheMatch: 'Victor Osimhen',
      players: [
        { id: 1, name: 'Victor Osimhen', votes: 1250 },
        { id: 2, name: 'Lucas Torreira', votes: 890 },
        { id: 3, name: 'Kerem Aktürkoğlu', votes: 650 }
      ]
    },
    {
      id: 2,
      homeTeam: getTeamName(),
      awayTeam: 'Trabzonspor',
      homeLogo: getTeamLogo(),
      awayLogo: 'TS',
      date: '2024-12-05',
      time: '16:30',
      homeScore: 3,
      awayScore: 0,
      manOfTheMatch: 'Kerem Aktürkoğlu',
      players: [
        { id: 1, name: 'Kerem Aktürkoğlu', votes: 2100 },
        { id: 2, name: 'Lucas Torreira', votes: 1100 },
        { id: 3, name: 'Victor Osimhen', votes: 950 }
      ]
    }
  ]

  // Geri sayım hesaplama
  useEffect(() => {
    if (matchTab === 'upcoming' && upcomingMatches.length > 0) {
      const matchDate = upcomingMatches[0].matchDate
      const interval = setInterval(() => {
        const now = new Date()
        const diff = matchDate.getTime() - now.getTime()
        
        if (diff > 0) {
          setCountdown({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000)
          })
        } else {
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        }
      }, 1000)
      
      return () => clearInterval(interval)
    }
  }, [matchTab])

  const handleScorePrediction = () => {
    if (selectedScore) {
      setShowScoreModal(true)
    }
  }

  const handleSubmitScore = () => {
    // Skor tahmini gönderildi
    setShowScoreModal(false)
    setSelectedScore(null)
    // Başarı mesajı gösterilebilir
    alert('Skor tahmininiz kaydedildi! Maç sonrası doğru tahmin için 1000 XP kazanabilirsiniz.')
  }

  const handleVotePlayer = (playerName: string) => {
    setSelectedPlayer(playerName)
    setShowVoteModal(true)
  }

  const handleSubmitVote = () => {
    // Oy gönderildi
    setShowVoteModal(false)
    setSelectedPlayer(null)
    alert('Oyunuz kaydedildi!')
  }

  const menuItems = [
    {
      id: 'fan-id',
      title: 'Fan Scout',
      icon: '🆔',
      level: 'Sev. 12',
      gradient: `from-[${colors.primary}] to-[${colors.dark}]`,
      iconBg: colors.secondary,
      comingSoon: true
    },
    {
      id: 'marketplace',
      title: 'Market',
      icon: '🛒',
      gradient: `from-[${colors.secondary}] to-[${colors.accent}]`,
      iconBg: colors.primary
    },
    {
      id: 'fantasy',
      title: 'Oyunlar',
      icon: '⚽',
      gradient: 'from-green-600 to-green-500',
      iconBg: 'white',
      href: '/game'
    },
    {
      id: 'mystery-box',
      title: 'Gizemli Kutu',
      icon: '📦',
      gradient: 'from-purple-600 to-purple-500',
      iconBg: colors.secondary
    },
    {
      id: 'rams-park',
      title: 'Stadyum',
      icon: '🏟️',
      gradient: 'from-blue-600 to-blue-500',
      iconBg: colors.secondary
    },
    {
      id: 'lucky-wheel',
      title: 'Şanslı Çark',
      icon: '🎡',
      gradient: 'from-yellow-600 to-orange-500',
      iconBg: colors.secondary
    }
  ]

  const handleMenuClick = (item: typeof menuItems[number], e: React.MouseEvent) => {
    if (item.comingSoon) {
      e.preventDefault()
      setShowComingSoon(true)
      setTimeout(() => {
        setShowComingSoon(false)
      }, 2000)
    }
  }

  return (
    <main 
      className="min-h-screen w-full pb-20"
      style={{
        background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 50%, ${colors.dark} 100%)`
      }}
    >
      {/* Coming Soon Popup */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowComingSoon(false)}></div>
          <div 
            className="relative rounded-3xl p-8 lg:p-12 text-center shadow-2xl animate-slide-up"
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
              boxShadow: `0 20px 60px ${colors.primary}50`,
              maxWidth: '400px',
              width: '100%'
            }}
          >
            <div 
              className="text-6xl lg:text-7xl mb-4"
              style={{ color: colors.secondary }}
            >
              ⏳
            </div>
            <h2 
              className="text-2xl lg:text-4xl font-extrabold text-white mb-3 leading-tight"
              style={{ color: colors.secondary }}
            >
              Yakında
            </h2>
            <p className="text-white/80 text-base lg:text-lg font-medium leading-relaxed">
              Bu özellik yakında gelecek!
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative overflow-hidden p-4 lg:p-8 lg:px-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
          }}></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                  boxShadow: `0 20px 50px ${colors.primary}40`
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
                <span className="text-white font-extrabold text-lg lg:text-2xl tracking-tight leading-tight">FAN ZONE</span>
                <p 
                  className="text-sm lg:text-base font-medium leading-relaxed"
                  style={{ color: colors.secondary }}
                >
                  {theme === 'galatasaray' ? 'Galatasaray' : 
                   theme === 'fenerbahce' ? 'Fenerbahçe' :
                   theme === 'besiktas' ? 'Beşiktaş' : 'Milli Takım'}
                </p>
              </div>
            </div>
            <Link
              href="/profile"
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              style={{
                backgroundColor: colors.light,
                borderColor: colors.secondary,
                boxShadow: `0 10px 30px ${colors.primary}40`
              }}
            >
              <span 
                className="font-bold text-lg lg:text-xl leading-tight"
                style={{ color: colors.primary }}
              >
                {getTeamLogo()[0]}
              </span>
            </Link>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 mb-6">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                onClick={(e) => handleMenuClick(item, e)}
                className="group relative rounded-xl p-6 lg:p-8 overflow-hidden animate-slide-up backdrop-blur-sm border border-white/10 cursor-pointer transition-all hover:scale-105"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  background: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: `0 10px 30px ${colors.primary}20`,
                  minHeight: '160px'
                }}
              >
                {!item.comingSoon && (
                  <Link
                    href={item.id === 'fan-id' ? '/fan-id' : item.id === 'marketplace' ? '/marketplace' : item.id === 'mystery-box' ? '/mystery-box' : item.id === 'rams-park' ? '/rams-park-zone' : item.id === 'fantasy' ? '/game' : item.id === 'lucky-wheel' ? '/game/lucky-wheel' : '#'}
                    className="absolute inset-0 z-20"
                  ></Link>
                )}
                
                {/* Gradient Background */}
                <div 
                  className="absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity rounded-xl"
                  style={{
                    background: item.id === 'fantasy' 
                      ? 'linear-gradient(135deg, #16A34A 0%, #22C55E 100%)'
                      : item.id === 'mystery-box'
                      ? 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)'
                      : item.id === 'rams-park'
                      ? 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)'
                      : item.id === 'lucky-wheel'
                      ? 'linear-gradient(135deg, #EAB308 0%, #F59E0B 100%)'
                      : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`
                  }}
                ></div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start gap-3 mb-3">
                    <div 
                      className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center text-2xl lg:text-3xl shadow-lg flex-shrink-0"
                      style={{
                        backgroundColor: typeof item.iconBg === 'string' && item.iconBg !== 'white' ? item.iconBg : colors.secondary,
                        color: item.iconBg === 'white' ? colors.primary : (colors.secondary === '#FFFFFF' ? colors.primary : colors.dark)
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="font-bold text-base lg:text-lg transition-colors leading-tight mb-1"
                        style={{ 
                          color: 'white',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {item.title}
                      </h3>
                      {item.level && (
                        <p className="text-white/80 text-xs font-medium leading-tight">{item.level}</p>
                      )}
                      {item.comingSoon && (
                        <span 
                          className="inline-block mt-2 text-xs bg-white/20 text-white px-2 py-1 rounded-full font-bold"
                        >
                          Yakında
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              </div>
            ))}
          </div>

          {/* Matches Section */}
          <div 
            className="relative rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: `0 10px 30px ${colors.primary}30`
            }}
          >
            <div 
              className="absolute inset-0 opacity-90"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`
              }}
            ></div>
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
            }}></div>
            
            <div className="relative z-10 p-5 lg:p-6">
              {/* Tabs */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setMatchTab('upcoming')}
                  className={`px-6 py-3 rounded-xl font-bold text-sm lg:text-base transition-all leading-tight ${
                    matchTab === 'upcoming' ? 'shadow-lg' : 'opacity-70'
                  }`}
                  style={{
                    background: matchTab === 'upcoming'
                      ? `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`
                      : 'rgba(255, 255, 255, 0.1)',
                    color: matchTab === 'upcoming' 
                      ? (colors.secondary === '#FFFFFF' ? colors.primary : colors.dark)
                      : 'white',
                    boxShadow: matchTab === 'upcoming' ? `0 10px 30px ${colors.secondary}40` : 'none'
                  }}
                >
                  Gelecek Maçlar
                </button>
                <button
                  onClick={() => setMatchTab('past')}
                  className={`px-6 py-3 rounded-xl font-bold text-sm lg:text-base transition-all leading-tight ${
                    matchTab === 'past' ? 'shadow-lg' : 'opacity-70'
                  }`}
                  style={{
                    background: matchTab === 'past'
                      ? `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`
                      : 'rgba(255, 255, 255, 0.1)',
                    color: matchTab === 'past' 
                      ? (colors.secondary === '#FFFFFF' ? colors.primary : colors.dark)
                      : 'white',
                    boxShadow: matchTab === 'past' ? `0 10px 30px ${colors.secondary}40` : 'none'
                  }}
                >
                  Geçmiş Maçlar
                </button>
              </div>

              {/* Upcoming Matches */}
              {matchTab === 'upcoming' && (
                <div className="space-y-4">
                  {upcomingMatches.map((match) => (
                    <div
                      key={match.id}
                      className="bg-white/10 backdrop-blur-md rounded-xl p-4 lg:p-6 border border-white/20"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-lg"
                            style={{
                              backgroundColor: colors.primary,
                              color: 'white'
                            }}
                          >
                            <span className="font-extrabold text-lg lg:text-xl">{match.homeLogo}</span>
                          </div>
                          <span className="text-white font-bold text-lg lg:text-xl">VS</span>
                          <div 
                            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-lg bg-white"
                          >
                            <span 
                              className="font-extrabold text-lg lg:text-xl"
                              style={{ color: colors.primary }}
                            >
                              {match.awayLogo}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white/90 text-xs lg:text-sm font-medium">{match.date}</p>
                          <p className="text-white font-bold text-sm lg:text-base">{match.time}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-white/70 text-xs font-medium mb-1">Maç Yeri</p>
                        <p className="text-white font-bold text-sm lg:text-base">{match.stadium}</p>
                      </div>

                      {/* Countdown */}
                      <div className="mb-4">
                        <p className="text-white/70 text-xs font-medium mb-2">Kalan Süre</p>
                        <div className="flex gap-2">
                          {[
                            { label: 'Gün', value: countdown.days },
                            { label: 'Saat', value: countdown.hours },
                            { label: 'Dakika', value: countdown.minutes },
                            { label: 'Saniye', value: countdown.seconds }
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex-1 bg-white/10 rounded-lg p-2 text-center border border-white/20"
                            >
                              <p 
                                className="text-xl lg:text-2xl font-black"
                                style={{ color: colors.secondary }}
                              >
                                {item.value.toString().padStart(2, '0')}
                              </p>
                              <p className="text-white/70 text-xs font-medium">{item.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Score Prediction */}
                      <div className="mb-4">
                        <p className="text-white/70 text-xs font-medium mb-2">Skor Tahmini</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-sm">{match.homeTeam}</span>
                            <input
                              type="number"
                              min="0"
                              max="10"
                              value={selectedScore?.home || ''}
                              onChange={(e) => setSelectedScore({
                                home: parseInt(e.target.value) || 0,
                                away: selectedScore?.away || 0
                              })}
                              className="w-16 px-3 py-2 rounded-lg text-center font-bold text-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2"
                              style={{
                                focusRingColor: colors.secondary
                              }}
                            />
                          </div>
                          <span className="text-white font-bold">-</span>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              max="10"
                              value={selectedScore?.away || ''}
                              onChange={(e) => setSelectedScore({
                                home: selectedScore?.home || 0,
                                away: parseInt(e.target.value) || 0
                              })}
                              className="w-16 px-3 py-2 rounded-lg text-center font-bold text-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2"
                              style={{
                                focusRingColor: colors.secondary
                              }}
                            />
                            <span className="text-white font-bold text-sm">{match.awayTeam}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleScorePrediction}
                        disabled={!selectedScore || !selectedScore.home && !selectedScore.away}
                        className={`w-full py-3 rounded-xl font-bold text-sm lg:text-base shadow-lg transition-all leading-tight ${
                          !selectedScore || (!selectedScore.home && !selectedScore.away) ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
                        }`}
                        style={{
                          background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`,
                          color: colors.secondary === '#FFFFFF' ? colors.primary : colors.dark,
                          boxShadow: `0 10px 30px ${colors.secondary}40`
                        }}
                      >
                        Tahmin Gönder (1000 XP Ödül)
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Past Matches */}
              {matchTab === 'past' && (
                <div className="space-y-4">
                  {pastMatches.map((match) => (
                    <div
                      key={match.id}
                      className="bg-white/10 backdrop-blur-md rounded-xl p-4 lg:p-6 border border-white/20"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-lg"
                            style={{
                              backgroundColor: colors.primary,
                              color: 'white'
                            }}
                          >
                            <span className="font-extrabold text-lg lg:text-xl">{match.homeLogo}</span>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-black text-xl lg:text-2xl">
                              {match.homeScore} - {match.awayScore}
                            </p>
                          </div>
                          <div 
                            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-lg bg-white"
                          >
                            <span 
                              className="font-extrabold text-lg lg:text-xl"
                              style={{ color: colors.primary }}
                            >
                              {match.awayLogo}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white/90 text-xs lg:text-sm font-medium">{match.date}</p>
                          <p className="text-white font-bold text-sm lg:text-base">{match.time}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-white/70 text-xs font-medium mb-2">Maçın Oyuncusu</p>
                        <div className="space-y-2">
                          {match.players.map((player) => (
                            <button
                              key={player.id}
                              onClick={() => handleVotePlayer(player.name)}
                              className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-10 h-10 rounded-full flex items-center justify-center"
                                  style={{
                                    backgroundColor: player.name === match.manOfTheMatch ? colors.secondary : 'rgba(255,255,255,0.1)'
                                  }}
                                >
                                  <span className="text-white text-lg">👤</span>
                                </div>
                                <div>
                                  <p className="text-white font-bold text-sm lg:text-base">{player.name}</p>
                                  {player.name === match.manOfTheMatch && (
                                    <p 
                                      className="text-xs font-medium"
                                      style={{ color: colors.secondary }}
                                    >
                                      Maçın Oyuncusu
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-white/70 text-xs font-medium">Oy</p>
                                <p className="text-white font-bold text-sm">{player.votes}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Score Prediction Modal */}
          {showScoreModal && selectedScore && upcomingMatches[0] && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
              <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
                onClick={() => setShowScoreModal(false)}
              ></div>
              <div 
                className="relative rounded-3xl p-6 lg:p-8 shadow-2xl animate-slide-up max-w-md w-full backdrop-blur-sm border border-white/20"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: `0 20px 60px ${colors.primary}50`
                }}
              >
                <button
                  onClick={() => setShowScoreModal(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  style={{ color: colors.primary }}
                >
                  <span className="text-2xl">×</span>
                </button>

                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">⚽</div>
                  <h2 
                    className="text-2xl lg:text-3xl font-extrabold mb-2 leading-tight"
                    style={{ color: colors.primary }}
                  >
                    Skor Tahmini
                  </h2>
                  <div className="flex items-center justify-center gap-4 my-4">
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-1">{upcomingMatches[0].homeTeam}</p>
                      <p 
                        className="text-4xl font-black"
                        style={{ color: colors.primary }}
                      >
                        {selectedScore.home}
                      </p>
                    </div>
                    <span className="text-gray-400 text-2xl font-bold">-</span>
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-1">{upcomingMatches[0].awayTeam}</p>
                      <p 
                        className="text-4xl font-black"
                        style={{ color: colors.primary }}
                      >
                        {selectedScore.away}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">
                    Doğru tahmin için 1000 XP kazanabilirsiniz!
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleSubmitScore}
                    className="w-full py-4 text-white rounded-xl font-bold text-base lg:text-lg shadow-lg hover:shadow-xl transition-all leading-tight"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
                      boxShadow: `0 10px 30px ${colors.primary}40`
                    }}
                  >
                    Tahmini Gönder
                  </button>
                  <button
                    onClick={() => setShowScoreModal(false)}
                    className="w-full py-3 text-gray-600 text-sm lg:text-base font-medium hover:text-gray-900 transition-colors leading-relaxed"
                  >
                    İptal
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Vote Player Modal */}
          {showVoteModal && selectedPlayer && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
              <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
                onClick={() => setShowVoteModal(false)}
              ></div>
              <div 
                className="relative rounded-3xl p-6 lg:p-8 shadow-2xl animate-slide-up max-w-md w-full backdrop-blur-sm border border-white/20"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: `0 20px 60px ${colors.primary}50`
                }}
              >
                <button
                  onClick={() => setShowVoteModal(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  style={{ color: colors.primary }}
                >
                  <span className="text-2xl">×</span>
                </button>

                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">👤</div>
                  <h2 
                    className="text-2xl lg:text-3xl font-extrabold mb-2 leading-tight"
                    style={{ color: colors.primary }}
                  >
                    Oy Ver
                  </h2>
                  <p className="text-gray-700 text-xl lg:text-2xl font-bold mb-4 leading-tight">
                    {selectedPlayer}
                  </p>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">
                    Bu oyuncuya maçın oyuncusu olarak oy vermek istiyor musunuz?
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleSubmitVote}
                    className="w-full py-4 text-white rounded-xl font-bold text-base lg:text-lg shadow-lg hover:shadow-xl transition-all leading-tight"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
                      boxShadow: `0 10px 30px ${colors.primary}40`
                    }}
                  >
                    Oy Ver
                  </button>
                  <button
                    onClick={() => setShowVoteModal(false)}
                    className="w-full py-3 text-gray-600 text-sm lg:text-base font-medium hover:text-gray-900 transition-colors leading-relaxed"
                  >
                    İptal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </main>
  )
}
