import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../utils/api'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { token } = await loginUser(email, password)
      login(token)
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      alert(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800/60 border border-gray-700 rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Sign in</h2>

        <label className="block text-sm text-gray-300 mb-2">Email</label>
        <input
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg mb-4 focus:outline-none focus:ring-2 transition-all"
          style={{
            background: 'var(--color-input-bg)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)'
          }}
          required
        />

        <label className="block text-sm text-gray-300 mb-2">Password</label>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg mb-6 focus:outline-none focus:ring-2 transition-all"
          style={{
            background: 'var(--color-input-bg)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)'
          }}
          required
        />

        <div className="flex justify-start items-center">
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 text-white font-medium"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
