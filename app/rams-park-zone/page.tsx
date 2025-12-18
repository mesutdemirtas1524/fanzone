'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import StadiumMap from '../components/StadiumMap'
import BottomNavigation from '../components/BottomNavigation'

export default function RamsParkZonePage() {
  const router = useRouter()
  const { colors, theme } = useTheme()
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map')
  const [showDiscountModal, setShowDiscountModal] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState<typeof businesses[number] | null>(null)
  const [discountCode, setDiscountCode] = useState<string>('')
  const [countdown, setCountdown] = useState<number>(0)
  const [cooldownEndTime, setCooldownEndTime] = useState<number | null>(null)

  const getTeamLogo = () => {
    switch(theme) {
      case 'galatasaray': return 'GS'
      case 'fenerbahce': return 'FB'
      case 'besiktas': return 'BJK'
      case 'milli-takim': return 'TÜ'
      default: return 'FZ'
    }
  }

  const getStadiumName = () => {
    switch(theme) {
      case 'galatasaray': return 'Rams Park Stadyumu'
      case 'fenerbahce': return 'Ülker Stadyumu'
      case 'besiktas': return 'Vodafone Park'
      case 'milli-takim': return 'Türk Telekom Stadyumu'
      default: return 'Stadyum'
    }
  }

  const getStadiumLocation = () => {
    switch(theme) {
      case 'galatasaray': return { lat: 41.1033, lng: 29.0183 } // Rams Park
      case 'fenerbahce': return { lat: 41.0389, lng: 28.9906 } // Ülker Stadyumu
      case 'besiktas': return { lat: 41.0425, lng: 29.0083 } // Vodafone Park
      case 'milli-takim': return { lat: 41.0703, lng: 28.9914 } // Türk Telekom
      default: return { lat: 41.1033, lng: 29.0183 }
    }
  }

  const stadiumLocation = getStadiumLocation()

  const businesses = [
    {
      id: 1,
      name: 'Filiz Cafe',
      offer: '10% İndirim',
      offerAmount: '10%',
      distance: '0,1 km',
      address: 'Inönü Cd. No 25',
      hours: '1:00 PM - 9:00 PM',
      icon: '🍽️',
      category: 'Restoran',
      lat: stadiumLocation.lat + 0.001,
      lng: stadiumLocation.lng + 0.001
    },
    {
      id: 2,
      name: 'Yummy Dürüm',
      offer: 'Ücretsiz İçecek',
      offerAmount: 'Ücretsiz',
      distance: '0,5 km',
      address: 'Rams Park Cd.',
      hours: '11:00 AM - 11:00 PM',
      icon: '🌯',
      category: 'Fast Food',
      lat: stadiumLocation.lat - 0.002,
      lng: stadiumLocation.lng + 0.0015
    },
    {
      id: 3,
      name: 'Saray Parking',
      offer: '15% Maç Günü İndirimi',
      offerAmount: '15%',
      distance: '0,7 km',
      address: 'Stadium Parking',
      hours: '24/7',
      icon: '🅿️',
      category: 'Otopark',
      lat: stadiumLocation.lat + 0.0015,
      lng: stadiumLocation.lng - 0.002
    }
  ]

  // Geri sayım için useEffect
  useEffect(() => {
    if (cooldownEndTime) {
      const interval = setInterval(() => {
        const now = Date.now()
        const remaining = Math.max(0, Math.floor((cooldownEndTime - now) / 1000))
        setCountdown(remaining)
        
        if (remaining === 0) {
          setCooldownEndTime(null)
          clearInterval(interval)
        }
      }, 1000)
      
      return () => clearInterval(interval)
    }
  }, [cooldownEndTime])

  const handleGetDiscountCode = (business: typeof businesses[number]) => {
    // Cooldown kontrolü
    if (cooldownEndTime && countdown > 0) {
      return
    }

    setSelectedBusiness(business)
    // Rastgele indirim kodu oluştur
    const code = `${business.name.substring(0, 3).toUpperCase()}${Math.floor(Math.random() * 10000)}`
    setDiscountCode(code)
    setShowDiscountModal(true)
    
    // 60 dakika cooldown başlat
    const endTime = Date.now() + (60 * 60 * 1000) // 60 dakika
    setCooldownEndTime(endTime)
    setCountdown(60 * 60) // 3600 saniye
  }

  const handleGetDirections = (business: typeof businesses[number]) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${business.lat},${business.lng}`
    window.open(url, '_blank')
  }

  const formatCountdown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
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
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center border-3 shadow-lg"
                style={{
                  backgroundColor: 'white',
                  borderColor: colors.secondary,
                  boxShadow: `0 10px 30px ${colors.primary}40`
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-0.5 mb-0.5">
                    <span 
                      className="font-black text-sm lg:text-base"
                      style={{ color: colors.primary }}
                    >
                      {getTeamLogo()[0]}
                    </span>
                    <span 
                      className="font-black text-sm lg:text-base"
                      style={{ color: colors.secondary === '#FFFFFF' ? colors.primary : colors.secondary }}
                    >
                      {getTeamLogo()[1] || getTeamLogo()[0]}
                    </span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i}
                        className="w-1 h-1 rounded-full"
                        style={{ backgroundColor: colors.secondary === '#FFFFFF' ? colors.primary : colors.secondary }}
                      ></div>
                    ))}
                  </div>
                  <span 
                    className="text-[8px] lg:text-[10px] font-black mt-0.5"
                    style={{ color: colors.primary }}
                  >
                    1905
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">ZONE</h1>
                <p className="text-white/90 text-xs lg:text-sm font-medium uppercase leading-relaxed">MAÇ GÜNÜ İŞ ORTAKLARI</p>
              </div>
            </div>
            <button 
              className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all shadow-lg"
              style={{ color: colors.secondary }}
            >
              <span className="text-xl lg:text-2xl">🔍</span>
            </button>
          </div>
        </div>
      </header>

      {/* Offers Summary Bar */}
      <div 
        className="px-4 lg:px-8 lg:px-12 py-4 flex items-center justify-between"
        style={{
          backgroundColor: colors.dark
        }}
      >
        <span className="text-white font-bold text-base lg:text-lg leading-tight">{businesses.length} YAKININIZDAKİ TEKLİF</span>
        <button
          onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
          className="text-white font-bold text-sm lg:text-base hover:opacity-80 transition-opacity leading-tight"
        >
          {viewMode === 'map' ? 'LİSTEYİ GÖR' : 'HARİTAYI GÖR'}
        </button>
      </div>

      {/* Map Section */}
      {viewMode === 'map' && (
        <section className="p-4 lg:p-8 lg:px-12">
          <div 
            className="rounded-2xl h-96 lg:h-[500px] mb-6 relative overflow-hidden backdrop-blur-sm border border-white/10"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: `0 10px 30px ${colors.primary}20`
            }}
          >
            <StadiumMap
              businesses={businesses}
              stadiumName={getStadiumName()}
              stadiumLat={stadiumLocation.lat}
              stadiumLng={stadiumLocation.lng}
              colors={colors}
            />
          </div>
        </section>
      )}

      {/* Nearest Offers Section */}
      <section className="p-4 lg:p-8 lg:px-12">
        <div 
          className="rounded-2xl p-4 lg:p-5 mb-6 backdrop-blur-sm border border-white/10"
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
            boxShadow: `0 10px 30px ${colors.primary}30`
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <span className="text-white font-bold text-base lg:text-lg uppercase leading-tight">EN YAKIN TEKLİFLER</span>
          </div>
        </div>

        <div className="space-y-4">
          {businesses.map((business, index) => {
            const isOnCooldown = !!(cooldownEndTime && countdown > 0)
            
            return (
              <div
                key={business.id}
                className="rounded-2xl p-5 lg:p-6 bg-white animate-slide-up shadow-lg"
                style={{
                  boxShadow: `0 10px 30px ${colors.primary}20`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center text-2xl lg:text-3xl flex-shrink-0 shadow-lg"
                    style={{
                      backgroundColor: colors.primary,
                      color: 'white'
                    }}
                  >
                    {business.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg lg:text-xl mb-1 leading-tight">{business.name}</h3>
                    <p 
                      className="text-sm lg:text-base font-bold mb-2"
                      style={{ color: colors.primary }}
                    >
                      {business.offer}
                    </p>
                    <p className="text-gray-600 text-xs lg:text-sm font-medium leading-relaxed">{business.distance}</p>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleGetDiscountCode(business)}
                    disabled={isOnCooldown}
                    className={`py-3 px-4 rounded-xl font-bold text-sm lg:text-base shadow-lg transition-all leading-tight ${
                      isOnCooldown ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
                      color: 'white',
                      boxShadow: `0 5px 15px ${colors.primary}30`
                    }}
                  >
                    {isOnCooldown ? (
                      <div className="text-xs">
                        <div>Bekle</div>
                        <div className="font-mono">{formatCountdown(countdown)}</div>
                      </div>
                    ) : (
                      'İndirim Kodunu Al'
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleGetDirections(business)}
                    className="py-3 px-4 rounded-xl font-bold text-sm lg:text-base shadow-lg hover:shadow-xl transition-all leading-tight flex items-center justify-center gap-2"
                    style={{
                      background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`,
                      color: colors.secondary === '#FFFFFF' ? colors.primary : colors.dark,
                      boxShadow: `0 5px 15px ${colors.secondary}30`
                    }}
                  >
                    <span>🗺️</span>
                    <span>Yol Tarifi Al</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Discount Code Modal */}
      {showDiscountModal && selectedBusiness && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
            onClick={() => setShowDiscountModal(false)}
          ></div>
          <div 
            className="relative rounded-3xl p-6 lg:p-8 shadow-2xl animate-slide-up max-w-md w-full backdrop-blur-sm border border-white/20"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: `0 20px 60px ${colors.primary}50`
            }}
          >
            <button
              onClick={() => setShowDiscountModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{ color: colors.primary }}
            >
              <span className="text-2xl">×</span>
            </button>

            <div className="text-center mb-6">
              <div 
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl lg:text-5xl"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`
                }}
              >
                {selectedBusiness.icon}
              </div>
              <h2 
                className="text-2xl lg:text-3xl font-extrabold mb-2 leading-tight"
                style={{ color: colors.primary }}
              >
                {selectedBusiness.name}
              </h2>
              <p className="text-gray-600 text-sm lg:text-base font-medium leading-relaxed mb-4">
                {selectedBusiness.offer}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 text-sm font-medium mb-2 text-center leading-tight">İndirim Kodu</p>
              <div 
                className="rounded-xl p-4 text-center border-2 border-dashed"
                style={{
                  borderColor: colors.primary,
                  backgroundColor: `${colors.primary}10`
                }}
              >
                <p 
                  className="text-2xl lg:text-3xl font-black tracking-wider"
                  style={{ color: colors.primary }}
                >
                  {discountCode}
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(discountCode)
                  alert('Kod kopyalandı!')
                }}
                className="w-full mt-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors leading-relaxed"
              >
                Kodu Kopyala
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-gray-600 text-xs font-medium text-center leading-relaxed">
                Bir sonraki kodu almak için {formatCountdown(countdown)} beklemeniz gerekiyor.
              </p>
            </div>

            <button
              onClick={() => setShowDiscountModal(false)}
              className="w-full py-4 text-white rounded-xl font-bold text-base lg:text-lg shadow-lg hover:shadow-xl transition-all leading-tight"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
                boxShadow: `0 10px 30px ${colors.primary}40`
              }}
            >
              Tamam
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </main>
  )
}
