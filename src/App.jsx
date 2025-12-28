import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Dashboard from './components/Dashboard'
import ThemeCustomizer from './pages/ThemeCustomizer'
import { getProjects } from './utils/api'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

function AppContent() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const addProjectRef = useRef(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const data = await getProjects()
      setProjects(data)
    } catch (error) {
      console.error('Failed to load projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProject = () => {
    if (addProjectRef.current) {
      addProjectRef.current()
    }
  }

  useKeyboardShortcuts(null, handleAddProject)

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <div 
            className="min-h-screen" 
            style={{ 
              background: `linear-gradient(135deg, var(--color-background), var(--color-background-gradient))` 
            }}
          >
            <Dashboard 
              projects={projects}
              loading={loading}
              onProjectsChange={loadProjects}
              addProjectRef={addProjectRef}
            />
          </div>
        } 
      />
      <Route path="/theme" element={<ThemeCustomizer />} />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App

