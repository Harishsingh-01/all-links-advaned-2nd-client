import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/Dashboard'
import ThemeCustomizer from './pages/ThemeCustomizer'
import Login from './pages/Login'
import FormPage from './pages/FormPage'
import { getProjects } from './utils/api'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { HelmetProvider, Helmet } from 'react-helmet-async'


function AppContent() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const addProjectRef = useRef(null)

  useEffect(() => {
    loadProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <div
              className="min-h-screen"
              style={{
                background: `linear-gradient(135deg, var(--color-background), var(--color-background-gradient))`,
              }}
            >
              <Helmet>
                <title>My Projects | React Developer Portfolio</title>
                <meta
                  name="description"
                  content="A personal dashboard showcasing my React and full-stack development projects."
                />
                <meta name="robots" content="index, follow" />
              </Helmet>
  {loading && (
    <section className="px-6 py-20 max-w-3xl mx-auto text-center">
      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        My Projects
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
        A curated collection of my personal development projects built using
        React, JavaScript, and modern web technologies.
      </p>

      {/* Supporting text */}
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
        Projects are fetched securely from the database and rendered dynamically.
      </p>

      {/* Status */}
      <p className="mt-8 text-sm font-medium text-gray-500 uppercase tracking-wide">
        Loading projects
      </p>

      {/* Spinner */}
      <div className="flex justify-center mt-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-[3px] border-gray-300 border-t-transparent"
          style={{ borderTopColor: 'var(--color-primary)' }}
          aria-label="Loading"
        />
      </div>
    </section>
  )}


              {!loading && (
                <Dashboard
                  projects={projects}
                  loading={loading}
                  onProjectsChange={loadProjects}
                  addProjectRef={addProjectRef}
                />
              )}
            </div>
          </ProtectedRoute>
        }
      />

      <Route path="/form" element={
        <ProtectedRoute>
          <FormPage />
        </ProtectedRoute>
      } />

      <Route path="/theme" element={
        <ProtectedRoute>
          <ThemeCustomizer />
        </ProtectedRoute>
      } />

      {/* Catch-all: redirect unknown routes to root (which goes to /login) */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  )
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
