import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectCard from './ProjectCard'
import ProjectForm from './ProjectForm'

const Dashboard = ({ projects, loading, onProjectsChange, addProjectRef }) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const navigate = useNavigate()

  // Expose add project function to parent via ref
  useEffect(() => {
    if (addProjectRef) {
      addProjectRef.current = () => setShowAddForm(true)
    }
  }, [addProjectRef])

  const filteredProjects = projects.filter(project => {
    const query = searchQuery.toLowerCase()
    const projectTitle = (project.title || project.name || '').toLowerCase()
    const projectCategory = (project.category || project.type || '').toLowerCase()
    const projectDescription = (project.description || project.notes || '').toLowerCase()
    const matchesSearch = (
      projectTitle.includes(query) ||
      projectCategory.includes(query) ||
      projectDescription.includes(query) ||
      (project.techStack && project.techStack.some(tech => tech?.toLowerCase().includes(query)))
    )
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.lastOpened && !b.lastOpened) return -1
    if (!a.lastOpened && b.lastOpened) return 1
    if (a.lastOpened && b.lastOpened) {
      return new Date(b.lastOpened) - new Date(a.lastOpened)
    }
    return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 
              className="text-4xl font-bold mb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Project Hub
            </h1>
            <p className="text-gray-400">
              Manage all your projects in one place
            </p>
          </div>
          <button
            onClick={() => navigate('/theme')}
            className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-sm font-medium text-gray-100 hover:bg-gray-700 transition-all flex items-center gap-2"
            style={{ borderColor: 'var(--color-border)' }}
          >
            🎨 Theme
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2.5 bg-gray-800/50 backdrop-blur-sm border rounded-lg text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all w-full sm:w-64"
            style={{ 
              borderColor: 'var(--color-border)',
              '--tw-ring-color': 'var(--color-primary)',
            }}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-gray-800/50 backdrop-blur-sm border rounded-lg text-sm text-gray-100 focus:outline-none focus:ring-2 transition-all"
            style={{ 
              borderColor: 'var(--color-border)',
              '--tw-ring-color': 'var(--color-primary)',
            }}
          >
            <option value="all">All Status</option>
            <option value="Stable">Stable</option>
            <option value="Debugging">Debugging</option>
            <option value="Broken">Broken</option>
          </select>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all shadow-lg hover:shadow-xl"
          style={{
            background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
          }}
        >
          {showAddForm ? 'Cancel' : '+ Add Project'}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8">
          <ProjectForm
            onSave={() => {
              setShowAddForm(false)
              onProjectsChange()
            }}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {sortedProjects.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📁</div>
          <p className="text-gray-400 text-lg">
            {searchQuery || filterStatus !== 'all' 
              ? 'No projects match your filters' 
              : 'No projects yet. Add your first project above.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map(project => (
            <ProjectCard
              key={project._id || project.id}
              project={project}
              onProjectsChange={onProjectsChange}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard

