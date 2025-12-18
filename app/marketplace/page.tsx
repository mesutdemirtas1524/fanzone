'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import BottomNavigation from '../components/BottomNavigation'
import Image from 'next/image'

export default function MarketplacePage() {
  const router = useRouter()
  const { colors, theme } = useTheme()
  const [activeTab, setActiveTab] = useState<'sales' | 'auction'>('sales')
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [showBidModal, setShowBidModal] = useState(false)
  const [bidAmount, setBidAmount] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

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

  const getSignedPlayer = () => {
    switch(theme) {
      case 'galatasaray': return 'Victor Osimhen'
      case 'fenerbahce': return 'Marco Asensio'
      case 'besiktas': return 'Rafa Silva'
      case 'milli-takim': return 'Hakan Çalhanoğlu'
      default: return 'Oyuncu'
    }
  }

  const getRetroJerseyImage = () => {
    // Her takım için retro forma görseli
    switch(theme) {
      case 'galatasaray':
        return '/assets/gsretroforma.jpg'
      case 'fenerbahce':
        return '/assets/fbretroforma.jpg'
      case 'besiktas':
        return '/assets/bjkretroforma.jpg'
      case 'milli-takim':
        return '/assets/trretroforma.webp'
      default:
        return '/assets/trretroforma.webp'
    }
  }

  const getMockImage = (type: string, id: number) => {
    // Retro forma için gerçek görselleri kullan
    if (type === 'jersey') {
      return getRetroJerseyImage()
    }
    
    // Diğer ürünler için placeholder.com kullanıyoruz
    const baseUrl = 'https://via.placeholder.com'
    const colors = {
      galatasaray: { primary: 'DC143C', secondary: 'FFD700' },
      fenerbahce: { primary: '1E3A8A', secondary: 'FFD700' },
      besiktas: { primary: '000000', secondary: 'FFFFFF' },
      'milli-takim': { primary: 'DC143C', secondary: 'FFFFFF' }
    }
    const teamColors = colors[theme] || colors['milli-takim']
    
    switch(type) {
      case 'ticket':
        return `${baseUrl}/400x400/2563EB/FFFFFF?text=Super+Cup+Ticket`
      case 'hat':
        return `${baseUrl}/400x400/${teamColors.primary}/${teamColors.secondary}?text=Official+Hat`
      case 'cleats':
        return `${baseUrl}/400x400/1F2937/FFFFFF?text=Cleats`
      case 'signed-jersey':
        return `${baseUrl}/400x400/${teamColors.primary}/${teamColors.secondary}?text=Signed+Jersey`
      case 'vip-box':
        return `${baseUrl}/400x400/9333EA/FFFFFF?text=VIP+Box`
      case 'world-cup-ticket':
        return `${baseUrl}/400x400/16A34A/FFFFFF?text=World+Cup+Ticket`
      case 'armband':
        return `${baseUrl}/400x400/${teamColors.primary}/${teamColors.secondary}?text=Armband`
      default:
        return `${baseUrl}/400x400/6B7280/FFFFFF?text=Product`
    }
  }

  const salesItems = [
    {
      id: 1,
      title: 'Retro Forma',
      description: `${getTeamName()} Retro Forma`,
      imageType: 'jersey',
      price: '1,200 ₺',
      category: 'Forma'
    },
    {
      id: 2,
      title: 'Süper Kupa Final Bileti',
      description: '2 Kişilik',
      imageType: 'ticket',
      price: '3,500 ₺',
      category: 'Bilet'
    },
    {
      id: 3,
      title: 'Resmi Şapka',
      description: `${getTeamName()} Resmi Şapka`,
      imageType: 'hat',
      price: '350 ₺',
      category: 'Aksesuar'
    },
    {
      id: 4,
      title: 'Krampon',
      description: 'Profesyonel Futbol Kramponu',
      imageType: 'cleats',
      price: '2,800 ₺',
      category: 'Ekipman'
    }
  ]

  const auctionItems = [
    {
      id: 1,
      title: 'İmzalı Forma',
      player: getSignedPlayer(),
      description: `${getTeamName()} İmzalı Forma`,
      imageType: 'signed-jersey',
      currentBid: '5,200 ₺',
      timeLeft: '2 gün 15 saat',
      category: 'Forma'
    },
    {
      id: 2,
      title: 'VIP Loca',
      description: 'Maç Günü VIP Loca Deneyimi',
      imageType: 'vip-box',
      currentBid: '12,500 ₺',
      timeLeft: '5 gün 8 saat',
      category: 'Deneyim'
    },
    {
      id: 3,
      title: 'Dünya Kupası Bileti',
      description: '2 Kişilik',
      imageType: 'world-cup-ticket',
      currentBid: '25,000 ₺',
      timeLeft: '10 gün 3 saat',
      category: 'Bilet'
    },
    {
      id: 4,
      title: 'İmzalı Kaptan Pazubandı',
      description: `${getTeamName()} Kaptan Pazubandı`,
      imageType: 'armband',
      currentBid: '8,900 ₺',
      timeLeft: '3 gün 12 saat',
      category: 'Koleksiyon'
    }
  ]

  const handlePurchase = (item: typeof salesItems[number]) => {
    console.log('Purchase clicked:', item)
    setSelectedItem(item)
    setShowPurchaseModal(true)
  }

  const handleBid = (item: typeof auctionItems[number]) => {
    console.log('Bid clicked:', item)
    setSelectedItem(item)
    setBidAmount(item.currentBid)
    setShowBidModal(true)
  }

  const handlePurchaseConfirm = async () => {
    setIsProcessing(true)
    
    // Satın alma işlemini simüle et
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setShowPurchaseModal(false)
    setSelectedItem(null)
    setIsProcessing(false)
    
    // Başarı mesajı göster
    setSuccessMessage(`${selectedItem?.title} başarıyla satın alındı! 🎉`)
    setShowSuccessMessage(true)
    
    // 3 saniye sonra mesajı kapat
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 3000)
  }

  const handleBidConfirm = async () => {
    // Teklif miktarını kontrol et
    if (!bidAmount || bidAmount.trim() === '') {
      alert('Lütfen bir teklif miktarı girin.')
      return
    }

    // Mevcut tekliften yüksek olmalı
    const currentBid = parseFloat(selectedItem?.currentBid?.replace(/[^\d,]/g, '').replace(',', '.') || '0')
    const newBid = parseFloat(bidAmount.replace(/[^\d,]/g, '').replace(',', '.') || '0')
    
    if (newBid <= currentBid) {
      alert(`Teklifiniz mevcut tekliften (${selectedItem?.currentBid}) yüksek olmalıdır.`)
      return
    }

    setIsProcessing(true)
    
    // Teklif verme işlemini simüle et
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setShowBidModal(false)
    setSuccessMessage(`${selectedItem?.title} için ${bidAmount} ₺ teklif verdiniz! ✅`)
    setShowSuccessMessage(true)
    setSelectedItem(null)
    setBidAmount('')
    setIsProcessing(false)
    
    // 3 saniye sonra mesajı kapat
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 3000)
  }

  return (
    <main 
      className="min-h-screen w-full pb-20"
      style={{
        background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 50%, ${colors.dark} 100%)`
      }}
    >
      {/* Success Message Toast */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 animate-slide-up">
          <div 
            className="rounded-2xl p-4 lg:p-6 shadow-2xl backdrop-blur-sm border border-white/20 max-w-sm"
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
              boxShadow: `0 20px 50px ${colors.primary}50`
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: colors.secondary,
                  color: colors.secondary === '#FFFFFF' ? colors.primary : colors.dark
                }}
              >
                <span className="text-xl lg:text-2xl">✓</span>
              </div>
              <p className="text-white font-bold text-sm lg:text-base leading-tight">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
            onClick={() => setShowPurchaseModal(false)}
          ></div>
          <div 
            className="relative rounded-3xl p-6 lg:p-8 shadow-2xl animate-slide-up max-w-md w-full backdrop-blur-sm border border-white/20"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: `0 20px 60px ${colors.primary}50`
            }}
          >
            <button
              onClick={() => setShowPurchaseModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{ color: colors.primary }}
            >
              <span className="text-2xl">×</span>
            </button>

            <div className="text-center mb-6">
              <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-4 rounded-2xl overflow-hidden">
                <Image
                  src={getMockImage(selectedItem.imageType || 'jersey', selectedItem.id)}
                  alt={selectedItem.title}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <h2 
                className="text-2xl lg:text-3xl font-extrabold mb-2 leading-tight"
                style={{ color: colors.primary }}
              >
                {selectedItem.title}
              </h2>
              <p className="text-gray-600 text-sm lg:text-base font-medium leading-relaxed">{selectedItem.description}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                <span className="text-gray-700 font-medium">Fiyat:</span>
                <span 
                  className="text-xl font-bold"
                  style={{ color: colors.primary }}
                >
                  {selectedItem.price}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                <span className="text-gray-700 font-medium">Kategori:</span>
                <span className="text-gray-900 font-bold">{selectedItem.category}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handlePurchaseConfirm}
                disabled={isProcessing}
                className={`w-full py-4 text-white rounded-xl font-bold text-base lg:text-lg shadow-lg hover:shadow-xl transition-all leading-tight ${
                  isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
                  boxShadow: `0 10px 30px ${colors.primary}40`
                }}
              >
                {isProcessing ? 'İşleniyor...' : 'Satın Al'}
              </button>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="w-full py-3 text-gray-600 text-sm lg:text-base font-medium hover:text-gray-900 transition-colors leading-relaxed"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bid Modal */}
      {showBidModal && selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
            onClick={() => setShowBidModal(false)}
          ></div>
          <div 
            className="relative rounded-3xl p-6 lg:p-8 shadow-2xl animate-slide-up max-w-md w-full backdrop-blur-sm border border-white/20"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: `0 20px 60px ${colors.secondary}50`
            }}
          >
            <button
              onClick={() => setShowBidModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{ color: colors.primary }}
            >
              <span className="text-2xl">×</span>
            </button>

            <div className="text-center mb-6">
              <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-4 rounded-2xl overflow-hidden">
                <Image
                  src={getMockImage(selectedItem.imageType || 'signed-jersey', selectedItem.id)}
                  alt={selectedItem.title}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <h2 
                className="text-2xl lg:text-3xl font-extrabold mb-2 leading-tight"
                style={{ color: colors.primary }}
              >
                {selectedItem.title}
              </h2>
              {selectedItem.player && (
                <p className="text-gray-900 text-base lg:text-lg font-bold mb-1 leading-tight">{selectedItem.player}</p>
              )}
              <p className="text-gray-600 text-sm lg:text-base font-medium leading-relaxed">{selectedItem.description}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                <span className="text-gray-700 font-medium">Mevcut Teklif:</span>
                <span 
                  className="text-xl font-bold"
                  style={{ color: colors.secondary }}
                >
                  {selectedItem.currentBid}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                <span className="text-gray-700 font-medium">Kalan Süre:</span>
                <span className="text-gray-900 font-bold">{selectedItem.timeLeft}</span>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2 leading-tight">Teklifiniz (₺)</label>
                <input
                  type="text"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Teklif miktarı girin"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 outline-none transition-all font-bold text-gray-900 leading-tight"
                  style={{}}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#D1D5DB'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleBidConfirm}
                disabled={isProcessing}
                className={`w-full py-4 rounded-xl font-bold text-base lg:text-lg shadow-lg hover:shadow-xl transition-all leading-tight ${
                  isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                style={{
                  background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`,
                  color: colors.secondary === '#FFFFFF' ? colors.primary : colors.dark,
                  boxShadow: `0 10px 30px ${colors.secondary}40`
                }}
              >
                {isProcessing ? 'İşleniyor...' : 'Teklif Ver'}
              </button>
              <button
                onClick={() => setShowBidModal(false)}
                className="w-full py-3 text-gray-600 text-sm lg:text-base font-medium hover:text-gray-900 transition-colors leading-relaxed"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative overflow-hidden p-4 lg:p-8 lg:px-12 sticky top-0 z-10 backdrop-blur-sm" style={{ backgroundColor: `${colors.dark}E6` }}>
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
        }}></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center border-3 shadow-lg"
                style={{
                  backgroundColor: 'white',
                  borderColor: colors.secondary,
                  boxShadow: `0 10px 30px ${colors.primary}40`
                }}
              >
                <div className="flex items-center gap-0.5">
                  <span 
                    className="font-extrabold text-base lg:text-lg leading-tight"
                    style={{ color: colors.primary }}
                  >
                    {getTeamLogo()[0]}
                  </span>
                  <span 
                    className="font-extrabold text-base lg:text-lg leading-tight"
                    style={{ color: colors.secondary === '#FFFFFF' ? colors.primary : colors.secondary }}
                  >
                    {getTeamLogo()[1] || getTeamLogo()[0]}
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">MARKET</h1>
                <p 
                  className="text-xs lg:text-sm font-medium leading-relaxed"
                  style={{ color: colors.secondary }}
                >
                  Resmi Mağaza
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <div 
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`
                }}
              >
                <span 
                  className="font-bold text-sm lg:text-base leading-tight"
                  style={{ color: colors.secondary === '#FFFFFF' ? colors.primary : colors.dark }}
                >
                  F
                </span>
              </div>
              <button 
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-lg hover:opacity-80 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)'
                }}
              >
                <span className="text-white text-lg lg:text-xl">☰</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <section className="p-4 lg:p-8 lg:px-12">
        <div className="flex gap-4 mb-6 lg:mb-8">
          <button
            onClick={() => setActiveTab('sales')}
            className={`flex-1 py-4 px-6 rounded-2xl font-bold text-base lg:text-lg transition-all leading-tight ${
              activeTab === 'sales' 
                ? 'shadow-lg' 
                : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              background: activeTab === 'sales'
                ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`
                : 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              boxShadow: activeTab === 'sales' ? `0 10px 30px ${colors.primary}40` : 'none'
            }}
          >
            Satış
          </button>
          <button
            onClick={() => setActiveTab('auction')}
            className={`flex-1 py-4 px-6 rounded-2xl font-bold text-base lg:text-lg transition-all leading-tight ${
              activeTab === 'auction' 
                ? 'shadow-lg' 
                : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              background: activeTab === 'auction'
                ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`
                : 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              boxShadow: activeTab === 'auction' ? `0 10px 30px ${colors.primary}40` : 'none'
            }}
          >
            Açık Arttırma
          </button>
        </div>

        {/* Sales Tab */}
        {activeTab === 'sales' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {salesItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden animate-slide-up backdrop-blur-sm border border-white/10"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  background: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: `0 10px 30px ${colors.primary}20`
                }}
              >
                {/* Image Area */}
                <div className="aspect-square relative overflow-hidden bg-gray-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                  <Image
                    src={getMockImage(item.imageType, item.id)}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                
                {/* Content */}
                <div 
                  className="p-4 lg:p-5"
                  style={{
                    background: `linear-gradient(to bottom, ${colors.dark}, black)`
                  }}
                >
                  <div className="mb-2">
                    <span 
                      className="text-xs font-bold uppercase tracking-wider leading-tight"
                      style={{ color: colors.secondary }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <p className="text-white font-bold text-base lg:text-lg mb-1 leading-tight">{item.title}</p>
                  <p className="text-white/70 text-xs lg:text-sm font-medium mb-3 leading-relaxed">{item.description}</p>
                  <div className="pt-3 border-t border-white/10">
                    <p 
                      className="text-sm lg:text-base font-bold leading-tight"
                      style={{ color: colors.secondary }}
                    >
                      {item.price}
                    </p>
                    <button 
                      onClick={() => handlePurchase(item)}
                      className="w-full mt-3 py-2.5 text-white rounded-lg text-xs lg:text-sm font-bold shadow-lg hover:shadow-xl transition-all leading-tight"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
                        boxShadow: `0 10px 30px ${colors.primary}40`
                      }}
                    >
                      Satın Al
                    </button>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, ${colors.secondary}20, transparent)`
                  }}
                ></div>
              </div>
            ))}
          </div>
        )}

        {/* Auction Tab */}
        {activeTab === 'auction' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {auctionItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden animate-slide-up backdrop-blur-sm border border-white/10"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  background: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: `0 10px 30px ${colors.secondary}20`
                }}
              >
                {/* Image Area */}
                <div className="aspect-square relative overflow-hidden bg-gray-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                  <Image
                    src={getMockImage(item.imageType, item.id)}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {item.id === 1 && (
                    <div 
                      className="absolute bottom-3 right-3 w-12 h-12 rounded-lg flex items-center justify-center shadow-lg z-20"
                      style={{
                        backgroundColor: colors.secondary,
                        color: colors.secondary === '#FFFFFF' ? colors.primary : colors.dark
                      }}
                    >
                      <span className="font-bold text-xl">✍️</span>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div 
                  className="p-4 lg:p-5"
                  style={{
                    background: `linear-gradient(to bottom, ${colors.dark}, black)`
                  }}
                >
                  <div className="mb-2">
                    <span 
                      className="text-xs font-bold uppercase tracking-wider leading-tight"
                      style={{ color: colors.secondary }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <p className="text-white font-bold text-base lg:text-lg mb-1 leading-tight">{item.title}</p>
                  {item.player ? (
                    <>
                      <p className="text-white/90 text-sm lg:text-base font-bold mb-1 leading-tight">{item.player}</p>
                      <p className="text-white/70 text-xs lg:text-sm font-medium mb-3 leading-relaxed">{item.description}</p>
                    </>
                  ) : (
                    <p className="text-white/70 text-xs lg:text-sm font-medium mb-3 leading-relaxed">{item.description}</p>
                  )}
                  
                  <div className="space-y-2 mb-3">
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-white/60 text-xs font-medium leading-tight mb-1">Mevcut Teklif</p>
                      <p 
                        className="text-base lg:text-lg font-bold leading-tight"
                        style={{ color: colors.secondary }}
                      >
                        {item.currentBid}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-medium leading-tight mb-1">Kalan Süre</p>
                      <p className="text-white/80 text-xs font-bold leading-tight">{item.timeLeft}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleBid(item)}
                    className="w-full py-2.5 text-white rounded-lg text-xs lg:text-sm font-bold shadow-lg hover:shadow-xl transition-all leading-tight"
                    style={{
                      background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`,
                      color: colors.secondary === '#FFFFFF' ? colors.primary : colors.dark,
                      boxShadow: `0 10px 30px ${colors.secondary}40`
                    }}
                  >
                    Teklif Ver
                  </button>
                </div>
                
                {/* Hover Overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, ${colors.secondary}20, transparent)`
                  }}
                ></div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </main>
  )
}
