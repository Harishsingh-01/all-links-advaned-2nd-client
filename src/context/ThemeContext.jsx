import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

const defaultTheme = {
  primary: '#3b82f6',      // Blue
  secondary: '#8b5cf6',     // Purple
  accent: '#ec4899',        // Pink
  background: '#111827',    // Dark gray
  backgroundGradient: '#1f2937', // Secondary background
  cardBg: 'rgba(31, 41, 55, 0.5)', // Semi-transparent dark
  cardBorder: 'rgba(75, 85, 99, 0.5)', // Card border
  text: '#f9fafb',          // Light text
  textSecondary: '#d1d5db', // Secondary text
  border: 'rgba(75, 85, 99, 0.5)', // Gray border
  inputBg: 'rgba(17, 24, 39, 0.5)', // Input background
  buttonHover: '#2563eb',   // Button hover
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('project-hub-theme')
    return saved ? JSON.parse(saved) : defaultTheme
  })

  useEffect(() => {
    localStorage.setItem('project-hub-theme', JSON.stringify(theme))
    applyTheme(theme)
  }, [theme])

  const applyTheme = (themeColors) => {
    const root = document.documentElement
    root.style.setProperty('--color-primary', themeColors.primary)
    root.style.setProperty('--color-secondary', themeColors.secondary)
    root.style.setProperty('--color-accent', themeColors.accent)
    root.style.setProperty('--color-background', themeColors.background)
    root.style.setProperty('--color-background-gradient', themeColors.backgroundGradient || themeColors.background)
    root.style.setProperty('--color-card-bg', themeColors.cardBg)
    root.style.setProperty('--color-card-border', themeColors.cardBorder || themeColors.border)
    root.style.setProperty('--color-text', themeColors.text)
    root.style.setProperty('--color-text-secondary', themeColors.textSecondary || themeColors.text)
    root.style.setProperty('--color-border', themeColors.border)
    root.style.setProperty('--color-input-bg', themeColors.inputBg || themeColors.cardBg)
    root.style.setProperty('--color-button-hover', themeColors.buttonHover || themeColors.primary)
  }

  const updateTheme = (newTheme) => {
    setTheme(prev => ({ ...prev, ...newTheme }))
  }

  const resetTheme = () => {
    setTheme(defaultTheme)
  }

  // Apply theme on mount
  useEffect(() => {
    applyTheme(theme)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

