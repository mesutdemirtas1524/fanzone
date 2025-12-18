'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type TeamTheme = 'galatasaray' | 'fenerbahce' | 'besiktas' | 'milli-takim'

interface ThemeColors {
  primary: string
  secondary: string
  dark: string
  light: string
  accent: string
}

const themes: Record<TeamTheme, ThemeColors> = {
  'galatasaray': {
    primary: '#DC143C', // Kırmızı
    secondary: '#FFD700', // Sarı
    dark: '#8B0000', // Koyu kırmızı
    light: '#FFE4B5', // Açık sarı
    accent: '#FFA500' // Turuncu
  },
  'fenerbahce': {
    primary: '#1E3A8A', // Lacivert
    secondary: '#FFD700', // Sarı
    dark: '#0F172A', // Koyu lacivert
    light: '#E0E7FF', // Açık lacivert
    accent: '#3B82F6' // Mavi
  },
  'besiktas': {
    primary: '#000000', // Siyah
    secondary: '#FFFFFF', // Beyaz
    dark: '#1F2937', // Koyu gri
    light: '#F3F4F6', // Açık gri
    accent: '#6B7280' // Gri
  },
  'milli-takim': {
    primary: '#DC143C', // Kırmızı
    secondary: '#FFFFFF', // Beyaz
    dark: '#8B0000', // Koyu kırmızı
    light: '#FEE2E2', // Açık kırmızı
    accent: '#EF4444' // Açık kırmızı
  }
}

interface ThemeContextType {
  theme: TeamTheme
  colors: ThemeColors
  setTheme: (theme: TeamTheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<TeamTheme>('milli-takim')

  useEffect(() => {
    // localStorage'dan tema yükle
    const savedTheme = localStorage.getItem('team-theme') as TeamTheme
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme)
    }
  }, [])

  const setTheme = (newTheme: TeamTheme) => {
    setThemeState(newTheme)
    localStorage.setItem('team-theme', newTheme)
  }

  const colors = themes[theme]

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

