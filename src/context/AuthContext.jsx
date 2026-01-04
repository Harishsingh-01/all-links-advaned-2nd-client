import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  // Cross-tab sync: listen for storage changes (other tabs) and custom logout events
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'token') {
        setToken(e.newValue)
      }
    }

    const onLogout = () => setToken(null)

    window.addEventListener('storage', onStorage)
    window.addEventListener('logout', onLogout)

    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('logout', onLogout)
    }
  }, [])

  const login = (newToken) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    // notify other tabs immediately
    window.dispatchEvent(new Event('login'))
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    // notify other tabs (and same tab listeners) to run logout reactions
    window.dispatchEvent(new Event('logout'))
  }

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: Boolean(token), login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
