'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from './context/ThemeContext'
import Image from 'next/image'

type Step = 'team-selection' | 'phone' | 'code'

const teams = [
  {
    id: 'galatasaray' as const,
    name: 'Galatasaray',
    colors: { primary: '#DC143C', secondary: '#FFD700' },
    logoPath: '/assets/gslogo.png'
  },
  {
    id: 'fenerbahce' as const,
    name: 'Fenerbahçe',
    colors: { primary: '#1E3A8A', secondary: '#FFD700' },
    logoPath: '/assets/fblogo.png'
  },
  {
    id: 'besiktas' as const,
    name: 'Beşiktaş',
    colors: { primary: '#000000', secondary: '#FFFFFF' },
    logoPath: '/assets/bjklogo.png'
  },
  {
    id: 'milli-takim' as const,
    name: 'Milli Takım',
    colors: { primary: '#DC143C', secondary: '#FFFFFF' },
    logoPath: '/assets/trlogo.png'
  }
]

export default function LoginPage() {
  const router = useRouter()
  const { theme, colors, setTheme } = useTheme()
  const [step, setStep] = useState<Step>('team-selection')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')

  const handleTeamSelect = (teamId: typeof teams[number]['id']) => {
    setTheme(teamId)
    setStep('phone')
  }

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('code')
  }

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/dashboard')
  }

  const selectedTeam = teams.find(t => t.id === theme) || teams[3]

  if (step === 'team-selection') {
    return (
      <main 
        className="min-h-screen w-full flex items-center justify-center p-4 lg:p-8 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 50%, ${colors.dark} 100%)`
        }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
          }}></div>
        </div>

        <div className="w-full max-w-2xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-3 tracking-tight leading-tight">Fan Zone</h1>
            <p className="text-white/90 text-base lg:text-lg font-medium leading-relaxed">Takımınızı Seçin</p>
          </div>

          {/* Team Selection Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {teams.map((team) => {
              const isSelected = theme === team.id
              return (
                <button
                  key={team.id}
                  onClick={() => handleTeamSelect(team.id)}
                  className={`relative rounded-2xl p-6 lg:p-8 text-center transition-all duration-300 backdrop-blur-sm border border-white/10 ${
                    isSelected 
                      ? 'scale-105 ring-4 ring-white/50' 
                      : 'hover:scale-105'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${team.colors.primary} 0%, ${team.colors.secondary} 100%)`,
                    boxShadow: isSelected 
                      ? `0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px ${team.colors.secondary}80`
                      : '0 10px 30px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-4 flex items-center justify-center">
                    <Image
                      src={team.logoPath}
                      alt={team.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-white text-lg lg:text-xl leading-tight">{team.name}</h3>
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Continue Button */}
          <button
            onClick={() => setStep('phone')}
                  className="w-full py-4 text-white rounded-xl font-bold text-base lg:text-lg shadow-lg hover:shadow-xl transition-all leading-tight"
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
              boxShadow: `0 10px 30px ${colors.primary}40`
            }}
          >
            Devam Et
          </button>
        </div>
      </main>
    )
  }

  return (
    <main 
      className="min-h-screen w-full flex items-center justify-center p-4 lg:p-8 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 50%, ${colors.dark} 100%)`
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
        }}></div>
      </div>

      <div className="w-full max-w-sm lg:max-w-md mx-auto relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="relative inline-block mb-6">
            <div 
              className="w-40 h-40 lg:w-48 lg:h-48 mx-auto flex items-center justify-center shadow-lg"
              style={{
                boxShadow: `0 20px 50px ${colors.primary}40`
              }}
            >
              <Image
                src={selectedTeam.logoPath}
                alt={selectedTeam.name}
                width={192}
                height={192}
                className="w-full h-full object-contain"
              />
            </div>
            <div 
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full animate-pulse"
              style={{ backgroundColor: colors.secondary }}
            ></div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-3 tracking-tight leading-tight">Fan Zone</h1>
          <p className="text-white/90 text-base lg:text-lg font-medium leading-relaxed">{selectedTeam.name} Taraftar Platformu</p>
        </div>

        {/* Login Form */}
        <div 
          className="rounded-3xl p-6 lg:p-8 shadow-lg backdrop-blur-sm border border-white/20"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: `0 20px 50px ${colors.primary}30`
          }}
        >
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-5">
              <div>
                <label className="block text-sm lg:text-base font-bold text-gray-800 mb-2 leading-tight">
                  Telefon Numarası
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05XX XXX XX XX"
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 outline-none transition-all font-medium text-gray-900 leading-relaxed"
                  style={{}}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#D1D5DB'
                    e.target.style.boxShadow = 'none'
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                  className="w-full py-4 text-white rounded-xl font-bold text-base lg:text-lg shadow-lg hover:shadow-xl transition-all leading-tight"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
                  boxShadow: `0 10px 30px ${colors.primary}40`
                }}
              >
                Doğrulama Kodu Gönder
              </button>
            </form>
          ) : (
            <form onSubmit={handleCodeSubmit} className="space-y-5">
              <div>
                <label className="block text-sm lg:text-base font-bold text-gray-800 mb-2 leading-tight">
                  Doğrulama Kodu
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="6 haneli kod"
                  maxLength={6}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl outline-none text-center text-3xl lg:text-4xl tracking-widest font-bold text-gray-900 leading-tight"
                  style={{}}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#D1D5DB'
                    e.target.style.boxShadow = 'none'
                  }}
                  required
                />
                <p className="text-xs lg:text-sm text-gray-600 mt-3 text-center font-medium leading-relaxed">
                  {phone} numarasına gönderilen kodu girin
                </p>
              </div>
              <button
                type="submit"
                  className="w-full py-4 text-white rounded-xl font-bold text-base lg:text-lg shadow-lg hover:shadow-xl transition-all leading-tight"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`,
                  boxShadow: `0 10px 30px ${colors.primary}40`
                }}
              >
                Giriş Yap
              </button>
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full py-3 text-gray-600 text-sm lg:text-base font-medium hover:text-gray-900 transition-colors leading-relaxed"
              >
                Telefon numarasını değiştir
              </button>
            </form>
          )}

          {/* Social Login */}
          <div className="pt-6 border-t border-gray-200 mt-6">
            <p className="text-xs lg:text-sm text-gray-500 text-center mb-4 font-medium leading-relaxed">veya</p>
            <button className="w-full py-3.5 border-2 border-gray-300 rounded-xl text-sm lg:text-base font-bold text-gray-700 hover:bg-gray-50 transition-colors leading-tight">
              Google ile Giriş Yap
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/80 text-xs lg:text-sm mt-6 font-medium leading-relaxed">
          Giriş yaparak Kullanım Şartları ve Gizlilik Politikası'nı kabul etmiş olursunuz.
        </p>
      </div>
    </main>
  )
}
