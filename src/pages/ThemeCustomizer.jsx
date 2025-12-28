import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useNavigate } from 'react-router-dom'

const ThemeCustomizer = () => {
  const { theme, updateTheme, resetTheme } = useTheme()
  const navigate = useNavigate()
  const [localTheme, setLocalTheme] = useState(theme)

  useEffect(() => {
    setLocalTheme(theme)
  }, [theme])

  const handleColorChange = (key, value) => {
    setLocalTheme(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    updateTheme(localTheme)
    navigate('/')
  }

  const handleReset = () => {
    resetTheme()
    setLocalTheme(theme)
  }

  const colorPresets = [
    {
      name: 'Ocean Blue',
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        background: '#0f172a',
        backgroundGradient: '#1e293b',
        cardBg: 'rgba(30, 41, 59, 0.6)',
        cardBorder: 'rgba(59, 130, 246, 0.3)',
        text: '#f1f5f9',
        textSecondary: '#cbd5e1',
        border: 'rgba(59, 130, 246, 0.2)',
        inputBg: 'rgba(15, 23, 42, 0.5)',
        buttonHover: '#2563eb',
      }
    },
    {
      name: 'Forest Green',
      colors: {
        primary: '#10b981',
        secondary: '#059669',
        accent: '#34d399',
        background: '#064e3b',
        backgroundGradient: '#065f46',
        cardBg: 'rgba(5, 95, 70, 0.6)',
        cardBorder: 'rgba(16, 185, 129, 0.3)',
        text: '#ecfdf5',
        textSecondary: '#d1fae5',
        border: 'rgba(16, 185, 129, 0.2)',
        inputBg: 'rgba(4, 78, 59, 0.5)',
        buttonHover: '#059669',
      }
    },
    {
      name: 'Sunset Orange',
      colors: {
        primary: '#f59e0b',
        secondary: '#d97706',
        accent: '#fb923c',
        background: '#7c2d12',
        backgroundGradient: '#9a3412',
        cardBg: 'rgba(154, 52, 18, 0.6)',
        cardBorder: 'rgba(245, 158, 11, 0.3)',
        text: '#fff7ed',
        textSecondary: '#ffedd5',
        border: 'rgba(245, 158, 11, 0.2)',
        inputBg: 'rgba(124, 45, 18, 0.5)',
        buttonHover: '#d97706',
      }
    },
    {
      name: 'Royal Purple',
      colors: {
        primary: '#a855f7',
        secondary: '#9333ea',
        accent: '#c084fc',
        background: '#3b0764',
        backgroundGradient: '#581c87',
        cardBg: 'rgba(88, 28, 135, 0.6)',
        cardBorder: 'rgba(168, 85, 247, 0.3)',
        text: '#faf5ff',
        textSecondary: '#f3e8ff',
        border: 'rgba(168, 85, 247, 0.2)',
        inputBg: 'rgba(59, 7, 100, 0.5)',
        buttonHover: '#9333ea',
      }
    },
    {
      name: 'Rose Pink',
      colors: {
        primary: '#ec4899',
        secondary: '#db2777',
        accent: '#f472b6',
        background: '#831843',
        backgroundGradient: '#9f1239',
        cardBg: 'rgba(159, 18, 57, 0.6)',
        cardBorder: 'rgba(236, 72, 153, 0.3)',
        text: '#fdf2f8',
        textSecondary: '#fce7f3',
        border: 'rgba(236, 72, 153, 0.2)',
        inputBg: 'rgba(131, 24, 67, 0.5)',
        buttonHover: '#db2777',
      }
    },
    {
      name: 'Sky Cyan',
      colors: {
        primary: '#06b6d4',
        secondary: '#0891b2',
        accent: '#22d3ee',
        background: '#164e63',
        backgroundGradient: '#155e75',
        cardBg: 'rgba(21, 94, 117, 0.6)',
        cardBorder: 'rgba(6, 182, 212, 0.3)',
        text: '#ecfeff',
        textSecondary: '#cffafe',
        border: 'rgba(6, 182, 212, 0.2)',
        inputBg: 'rgba(22, 78, 99, 0.5)',
        buttonHover: '#0891b2',
      }
    },
    {
      name: 'Emerald Teal',
      colors: {
        primary: '#14b8a6',
        secondary: '#0d9488',
        accent: '#5eead4',
        background: '#134e4a',
        backgroundGradient: '#115e59',
        cardBg: 'rgba(17, 94, 89, 0.6)',
        cardBorder: 'rgba(20, 184, 166, 0.3)',
        text: '#f0fdfa',
        textSecondary: '#ccfbf1',
        border: 'rgba(20, 184, 166, 0.2)',
        inputBg: 'rgba(19, 78, 74, 0.5)',
        buttonHover: '#0d9488',
      }
    },
    {
      name: 'Amber Gold',
      colors: {
        primary: '#fbbf24',
        secondary: '#f59e0b',
        accent: '#fcd34d',
        background: '#78350f',
        backgroundGradient: '#92400e',
        cardBg: 'rgba(146, 64, 14, 0.6)',
        cardBorder: 'rgba(251, 191, 36, 0.3)',
        text: '#fffbeb',
        textSecondary: '#fef3c7',
        border: 'rgba(251, 191, 36, 0.2)',
        inputBg: 'rgba(120, 53, 15, 0.5)',
        buttonHover: '#f59e0b',
      }
    },
    {
      name: 'Midnight Dark',
      colors: {
        primary: '#6366f1',
        secondary: '#4f46e5',
        accent: '#818cf8',
        background: '#0f172a',
        backgroundGradient: '#1e293b',
        cardBg: 'rgba(30, 41, 59, 0.6)',
        cardBorder: 'rgba(99, 102, 241, 0.3)',
        text: '#f1f5f9',
        textSecondary: '#cbd5e1',
        border: 'rgba(99, 102, 241, 0.2)',
        inputBg: 'rgba(15, 23, 42, 0.5)',
        buttonHover: '#4f46e5',
      }
    },
    {
      name: 'Crimson Red',
      colors: {
        primary: '#ef4444',
        secondary: '#dc2626',
        accent: '#f87171',
        background: '#7f1d1d',
        backgroundGradient: '#991b1b',
        cardBg: 'rgba(153, 27, 27, 0.6)',
        cardBorder: 'rgba(239, 68, 68, 0.3)',
        text: '#fef2f2',
        textSecondary: '#fee2e2',
        border: 'rgba(239, 68, 68, 0.2)',
        inputBg: 'rgba(127, 29, 29, 0.5)',
        buttonHover: '#dc2626',
      }
    },
  ]

  const applyPreset = (preset) => {
    setLocalTheme(prev => ({
      ...prev,
      ...preset.colors
    }))
  }

  const ColorPicker = ({ label, value, onChange, description }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
        {description && <span className="text-xs text-gray-500 ml-2">({description})</span>}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-16 h-12 rounded-lg border-2 border-gray-600 cursor-pointer hover:border-gray-500 transition-colors"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="#000000"
        />
      </div>
    </div>
  )

  const RGBAInput = ({ label, value, onChange, description }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
        {description && <span className="text-xs text-gray-500 ml-2">({description})</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        placeholder="rgba(31, 41, 55, 0.5)"
      />
    </div>
  )

  return (
    <div className="min-h-screen p-6" style={{ background: `linear-gradient(135deg, ${localTheme.background}, ${localTheme.backgroundGradient || localTheme.background})` }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{ color: localTheme.text }}>
                🎨 Theme Customizer
              </h1>
              <p style={{ color: localTheme.textSecondary }}>
                Customize every aspect of your Project Hub's appearance
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50 rounded-lg text-gray-100 transition-all"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        {/* Preview Card */}
        <div 
          className="mb-8 rounded-xl p-6 border backdrop-blur-sm"
          style={{
            background: localTheme.cardBg,
            borderColor: localTheme.cardBorder,
          }}
        >
          <h2 className="text-xl font-semibold mb-4" style={{ color: localTheme.text }}>Live Preview</h2>
          <div 
            className="rounded-lg p-6 border"
            style={{
              background: localTheme.cardBg,
              borderColor: localTheme.cardBorder,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ background: `linear-gradient(135deg, ${localTheme.primary}, ${localTheme.secondary})` }}
              >
                P
              </div>
              <div>
                <h3 style={{ color: localTheme.text }} className="font-bold text-lg">Sample Project</h3>
                <p className="text-sm" style={{ color: localTheme.textSecondary }}>PORTFOLIO</p>
              </div>
            </div>
            <p className="text-sm mb-4" style={{ color: localTheme.textSecondary }}>
              This is a preview of how your projects will look with the selected theme.
            </p>
            <button
              className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-all shadow-md hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${localTheme.primary}, ${localTheme.secondary})`,
              }}
            >
              🌐 Open Project
            </button>
          </div>
        </div>

        {/* Color Presets */}
        <div 
          className="mb-8 rounded-xl p-6 border backdrop-blur-sm"
          style={{
            background: localTheme.cardBg,
            borderColor: localTheme.cardBorder,
          }}
        >
          <h2 className="text-xl font-semibold mb-4" style={{ color: localTheme.text }}>🎨 Color Presets</h2>
          <p className="text-sm mb-4" style={{ color: localTheme.textSecondary }}>
            Click any preset to apply a complete color scheme
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {colorPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(preset)}
                className="p-4 bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50 rounded-lg transition-all text-left group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded"
                    style={{ background: preset.colors.primary }}
                  />
                  <div
                    className="w-8 h-8 rounded"
                    style={{ background: preset.colors.secondary }}
                  />
                  <div
                    className="w-8 h-8 rounded"
                    style={{ background: preset.colors.accent }}
                  />
                </div>
                <p className="text-sm font-medium text-gray-300 group-hover:text-white">{preset.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div 
          className="rounded-xl p-6 border backdrop-blur-sm mb-6"
          style={{
            background: localTheme.cardBg,
            borderColor: localTheme.cardBorder,
          }}
        >
          <h2 className="text-xl font-semibold mb-6" style={{ color: localTheme.text }}>Customize Colors</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Colors */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4" style={{ color: localTheme.text }}>Primary Colors</h3>
              
              <ColorPicker
                label="Primary Color"
                value={localTheme.primary}
                onChange={(value) => handleColorChange('primary', value)}
                description="Main buttons, links"
              />

              <ColorPicker
                label="Secondary Color"
                value={localTheme.secondary}
                onChange={(value) => handleColorChange('secondary', value)}
                description="Gradients, accents"
              />

              <ColorPicker
                label="Accent Color"
                value={localTheme.accent}
                onChange={(value) => handleColorChange('accent', value)}
                description="Highlights, badges"
              />

              <ColorPicker
                label="Button Hover"
                value={localTheme.buttonHover || localTheme.primary}
                onChange={(value) => handleColorChange('buttonHover', value)}
                description="Button hover state"
              />
            </div>

            {/* Background Colors */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4" style={{ color: localTheme.text }}>Background Colors</h3>
              
              <ColorPicker
                label="Main Background"
                value={localTheme.background}
                onChange={(value) => handleColorChange('background', value)}
                description="Page background"
              />

              <ColorPicker
                label="Gradient Background"
                value={localTheme.backgroundGradient || localTheme.background}
                onChange={(value) => handleColorChange('backgroundGradient', value)}
                description="Secondary background"
              />

              <RGBAInput
                label="Card Background"
                value={localTheme.cardBg}
                onChange={(value) => handleColorChange('cardBg', value)}
                description="Project cards, forms"
              />

              <RGBAInput
                label="Input Background"
                value={localTheme.inputBg || localTheme.cardBg}
                onChange={(value) => handleColorChange('inputBg', value)}
                description="Form inputs"
              />
            </div>

            {/* Text & Borders */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4" style={{ color: localTheme.text }}>Text Colors</h3>
              
              <ColorPicker
                label="Primary Text"
                value={localTheme.text}
                onChange={(value) => handleColorChange('text', value)}
                description="Headings, main text"
              />

              <ColorPicker
                label="Secondary Text"
                value={localTheme.textSecondary || localTheme.text}
                onChange={(value) => handleColorChange('textSecondary', value)}
                description="Descriptions, labels"
              />
            </div>

            {/* Borders */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4" style={{ color: localTheme.text }}>Borders</h3>
              
              <RGBAInput
                label="Card Border"
                value={localTheme.cardBorder || localTheme.border}
                onChange={(value) => handleColorChange('cardBorder', value)}
                description="Card outlines"
              />

              <RGBAInput
                label="General Border"
                value={localTheme.border}
                onChange={(value) => handleColorChange('border', value)}
                description="Inputs, dividers"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50 rounded-lg text-gray-100 transition-all"
          >
            Reset to Default
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg text-white font-medium transition-all shadow-lg hover:shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${localTheme.primary}, ${localTheme.secondary})`,
            }}
          >
            Save Theme
          </button>
        </div>
      </div>
    </div>
  )
}

export default ThemeCustomizer
