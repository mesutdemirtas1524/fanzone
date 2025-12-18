'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import BottomNavigation from '../../components/BottomNavigation'

export default function FanClashPage() {
  const router = useRouter()
  const { colors, theme } = useTheme()
  const [gameState, setGameState] = useState<'menu' | 'matching' | 'countdown' | 'playing' | 'result'>('menu')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [countdown, setCountdown] = useState(3)

  const getTeamLogo = () => {
    switch(theme) {
      case 'galatasaray': return 'GS'
      case 'fenerbahce': return 'FB'
      case 'besiktas': return 'BJK'
      case 'milli-takim': return 'TÜ'
      default: return 'FZ'
    }
  }

  const questions = [
    {
      question: 'Takımınız hangi yıl kuruldu?',
      options: ['1904', '1905', '1906', '1907'],
      correct: 1
    },
    {
      question: 'Takımınızın en çok gol atan oyuncusu kimdir?',
      options: ['Hakan Şükür', 'Metin Oktay', 'Gheorghe Hagi', 'Arda Turan'],
      correct: 0
    },
    {
      question: '2000 UEFA Kupası finalinde hangi takımı yendik?',
      options: ['Arsenal', 'Real Madrid', 'Valencia', 'Marseille'],
      correct: 0
    },
    {
      question: 'Takımınızın stadyumunun adı nedir?',
      options: ['Ali Sami Yen', 'Rams Park', 'Türk Telekom Stadyumu', 'NEF Stadyumu'],
      correct: 1
    },
    {
      question: 'Takımınız kaç kez Süper Lig şampiyonu oldu?',
      options: ['22', '23', '24', '25'],
      correct: 2
    }
  ]

  const handleStartMatch = () => {
    setGameState('matching')
    setTimeout(() => {
      setGameState('countdown')
      let count = 3
      const interval = setInterval(() => {
        count--
        setCountdown(count)
        if (count === 0) {
          clearInterval(interval)
          setGameState('playing')
        }
      }, 1000)
    }, 2000)
  }

  const handleAnswer = (answerIndex: number) => {
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 10)
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setGameState('result')
    }
  }

  if (gameState === 'menu') {
    return (
      <main 
        className="min-h-screen w-full pb-20"
        style={{
          background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 50%, ${colors.dark} 100%)`
        }}
      >
        <header className="relative overflow-hidden p-4 lg:p-8 lg:px-12 sticky top-0 z-10 backdrop-blur-md" style={{ backgroundColor: `${colors.dark}E6` }}>
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
          }}></div>
          
          <div className="relative z-10 flex items-center gap-3">
            <button 
              onClick={() => router.back()} 
              className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white text-xl bg-white/10 rounded-lg hover:bg-white/20 transition-all shadow-lg"
            >
              ←
            </button>
            <div>
              <h1 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">FAN CLASH</h1>
              <p 
                className="text-xs lg:text-sm font-medium leading-relaxed"
                style={{ color: colors.secondary }}
              >
                Quiz Düellosu
              </p>
            </div>
          </div>
        </header>

        <section className="p-4 lg:p-8 lg:px-12 max-w-4xl mx-auto space-y-6">
          <div 
            className="relative rounded-3xl p-8 lg:p-12 text-center overflow-hidden backdrop-blur-sm border border-white/10"
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
            
            <div className="relative z-10">
              <div className="text-6xl lg:text-8xl mb-6">⚔️</div>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">Quiz Düellosu</h2>
              <p className="text-white/90 text-base lg:text-lg font-medium mb-6 leading-relaxed">
                5 soru, 30-45 saniye. Hızlı ve doğru cevap ver, kazan!
              </p>
            </div>
          </div>

          <div 
            className="rounded-2xl p-6 lg:p-8 backdrop-blur-sm border border-white/10"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: `0 10px 30px ${colors.primary}20`
            }}
          >
            <h3 className="font-bold text-white text-lg lg:text-xl mb-6 flex items-center gap-2 leading-tight">
              <span style={{ color: colors.secondary }}>📋</span>
              Nasıl Oynanır?
            </h3>
            <div className="space-y-4 text-sm lg:text-base text-white/80">
              {[
                'Eşleşme butonuna bas',
                'Aynı seviyede bir rakip bulunur',
                '5 soruya hızlıca cevap ver',
                'Daha hızlı doğru cevap = daha yüksek puan'
              ].map((text, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span 
                    className="font-bold text-lg leading-tight"
                    style={{ color: colors.secondary }}
                  >
                    {index + 1}.
                  </span>
                  <span className="font-medium leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartMatch}
            className="w-full py-5 lg:py-6 text-white rounded-2xl font-bold text-lg lg:text-2xl shadow-lg hover:shadow-xl transition-all leading-tight"
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
              boxShadow: `0 20px 50px ${colors.primary}40`
            }}
          >
            DÜELLO BAŞLAT
          </button>
        </section>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </main>
    )
  }

  if (gameState === 'matching') {
    return (
      <main 
        className="min-h-screen w-full flex items-center justify-center p-4 lg:p-8"
        style={{
          background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 50%, ${colors.dark} 100%)`
        }}
      >
        <div className="text-center w-full max-w-md">
          <div className="relative w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-8">
            <div 
              className="absolute inset-0 border-4 rounded-full animate-spin"
              style={{ 
                borderColor: colors.secondary,
                animationDuration: '2s'
              }}
            ></div>
            <div 
              className="absolute inset-4 border-4 rounded-full animate-spin"
              style={{ 
                borderColor: colors.primary,
                animationDuration: '1.5s',
                animationDirection: 'reverse'
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${colors.secondary}20` }}
              >
                <div className="flex flex-col gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-1 h-4 rounded animate-pulse"
                      style={{
                        backgroundColor: colors.secondary,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '0.6s'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">Rakip Aranıyor...</h2>
          <p className="text-white/70 text-base lg:text-lg font-medium mb-8 leading-relaxed">Aynı seviyede bir oyuncu bulunuyor</p>

          <div className="mb-8">
            <div 
              className="w-20 h-20 lg:w-24 lg:h-24 rounded-full mx-auto mb-4 border-2"
              style={{
                backgroundColor: colors.light,
                borderColor: colors.secondary
              }}
            ></div>
            <p className="text-white text-xl lg:text-2xl font-bold leading-tight">Yusuf</p>
            <p 
              className="text-sm lg:text-base font-medium leading-relaxed"
              style={{ color: colors.secondary }}
            >
              FAN LEVEL 7
            </p>
          </div>

          <button
            onClick={() => setGameState('menu')}
            className="w-full py-4 text-white rounded-xl font-bold text-base lg:text-lg shadow-lg hover:shadow-xl transition-all leading-tight"
            style={{
              background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`,
              color: colors.secondary === '#FFFFFF' ? colors.primary : colors.dark,
              boxShadow: `0 10px 30px ${colors.secondary}40`
            }}
          >
            İPTAL
          </button>
        </div>
      </main>
    )
  }

  if (gameState === 'countdown') {
    return (
      <main 
        className="min-h-screen w-full flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`
        }}
      >
        <div className="text-center">
          <div 
            className="text-9xl lg:text-[200px] font-extrabold mb-6 animate-slide-up leading-none"
            style={{
              color: colors.secondary,
              textShadow: `0 0 40px ${colors.secondary}80`
            }}
          >
            {countdown}
          </div>
          <p className="text-white text-2xl lg:text-4xl font-extrabold leading-tight">HAZIR OL!</p>
        </div>
      </main>
    )
  }

  if (gameState === 'playing') {
    const question = questions[currentQuestion]
    const [timeLeft, setTimeLeft] = useState(8)
    
    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
        return () => clearTimeout(timer)
      } else {
        handleAnswer(-1)
      }
    }, [timeLeft, currentQuestion])

    return (
      <main 
        className="min-h-screen w-full"
        style={{
          background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 50%, ${colors.dark} 100%)`
        }}
      >
        <header className="relative overflow-hidden p-4 lg:p-6 backdrop-blur-md" style={{ backgroundColor: `${colors.dark}E6` }}>
          <div className="flex items-center justify-between mb-3">
            <span 
              className="font-bold text-sm lg:text-base leading-tight"
              style={{ color: colors.secondary }}
            >
              Soru {currentQuestion + 1}/5
            </span>
            <span className="text-white font-bold text-sm lg:text-base leading-tight">Puan: {score}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${((currentQuestion + 1) / 5) * 100}%`,
                background: `linear-gradient(to right, ${colors.secondary}, ${colors.accent})`
              }}
            ></div>
          </div>
        </header>

        <section className="p-4 lg:p-12 lg:px-16">
          <div className="text-center mb-8 lg:mb-12 max-w-4xl mx-auto">
            <div className="relative w-32 h-32 lg:w-48 lg:h-48 mx-auto mb-8">
              <svg className="transform -rotate-90 w-full h-full">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke={colors.secondary}
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${(timeLeft / 8) * 283} 283`}
                  className="transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-4xl lg:text-6xl font-black">{timeLeft}</span>
              </div>
            </div>

            <h2 className="text-white text-2xl lg:text-4xl font-extrabold mb-12 leading-tight">
              {question.question}
            </h2>
          </div>

          <div className="space-y-4 lg:space-y-6 max-w-3xl mx-auto">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full py-4 lg:py-5 px-6 rounded-xl text-left font-bold text-base lg:text-xl transition-all duration-200 active:scale-95 leading-tight ${
                  index === 0
                    ? 'shadow-lg'
                    : 'shadow-lg hover:opacity-90'
                }`}
                style={{
                  background: index === 0
                    ? `linear-gradient(to right, ${colors.secondary}, ${colors.accent})`
                    : `linear-gradient(to right, ${colors.dark}, ${colors.primary})`,
                  color: index === 0 
                    ? (colors.secondary === '#FFFFFF' ? colors.primary : colors.dark)
                    : 'white',
                  boxShadow: index === 0
                    ? `0 20px 50px ${colors.secondary}40`
                    : `0 10px 30px ${colors.primary}40`
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      </main>
    )
  }

  if (gameState === 'result') {
    return (
      <main 
        className="min-h-screen w-full flex items-center justify-center p-4"
        style={{
          background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 50%, ${colors.dark} 100%)`
        }}
      >
        <div 
          className="rounded-3xl p-8 lg:p-12 shadow-lg text-center w-full max-w-md backdrop-blur-sm border border-white/20"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: `0 20px 50px ${colors.primary}30`
          }}
        >
          <div className="text-7xl lg:text-9xl mb-6">🏆</div>
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: colors.primary }}>Düello Tamamlandı!</h2>
          <div 
            className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight"
            style={{ color: colors.primary }}
          >
            {score} Puan
          </div>
          <p className="text-gray-600 text-lg lg:text-xl font-medium mb-8 leading-relaxed">
            {score >= 40 ? 'Harika bir performans! 🎉' : score >= 20 ? 'İyi gidiyorsun! 👍' : 'Daha fazla pratik yap! 💪'}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setGameState('menu')
                setCurrentQuestion(0)
                setScore(0)
              }}
              className="w-full py-4 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all leading-tight"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
                boxShadow: `0 10px 30px ${colors.primary}40`
              }}
            >
              Tekrar Oyna
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-4 bg-gray-800 text-white rounded-xl font-bold text-lg hover:bg-gray-700 transition-colors leading-tight"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      </main>
    )
  }

  return null
}
