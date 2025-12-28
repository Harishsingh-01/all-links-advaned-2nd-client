import { useState } from 'react'
import { deleteProject, updateLastOpened } from '../utils/api'

const ProjectCard = ({ project, onProjectsChange }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleOpenUrl = async (url) => {
    if (url) {
      try {
        await updateLastOpened(project._id || project.id)
        window.open(url, '_blank')
        onProjectsChange()
      } catch (error) {
        console.error('Error updating last opened:', error)
        window.open(url, '_blank')
      }
    }
  }

  // Support both old and new schema
  const projectTitle = project.title || project.name || 'Untitled'
  const projectLink = project.link || project.url
  const projectDescription = project.description || project.notes || ''
  const projectCategory = project.category || project.type || ''

  const handleCopyCommand = () => {
    if (project.localCommand) {
      navigator.clipboard.writeText(project.localCommand)
      // You could add a toast notification here
    }
  }

  const handleDelete = async () => {
    if (confirm('Delete this project?')) {
      setIsDeleting(true)
      try {
        await deleteProject(project._id || project.id)
        onProjectsChange()
      } catch (error) {
        console.error('Error deleting project:', error)
        alert('Failed to delete project')
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Stable': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Debugging': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Broken': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Stable': return '🟢'
      case 'Debugging': return '🟡'
      case 'Broken': return '🔴'
      default: return '⚪'
    }
  }

  const getCategoryColor = (category) => {
    if (!category) return 'bg-gray-500/20 text-gray-400'
    const cat = category.toUpperCase()
    if (cat.includes('PORTFOLIO')) return 'bg-blue-500/20 text-blue-400'
    if (cat.includes('FRONTEND')) return 'bg-green-500/20 text-green-400'
    if (cat.includes('BACKEND')) return 'bg-purple-500/20 text-purple-400'
    if (cat.includes('FULLSTACK')) return 'bg-pink-500/20 text-pink-400'
    return 'bg-indigo-500/20 text-indigo-400'
  }

  return (
    <div 
      className="group backdrop-blur-sm border rounded-xl p-5 hover:shadow-xl transition-all duration-300"
      style={{
        background: 'var(--color-card-bg)',
        borderColor: 'var(--color-card-border)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="font-bold text-lg truncate" style={{ color: 'var(--color-text)' }}>{projectTitle}</h3>
            {project.status && (
              <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)} {project.status}
              </span>
            )}
          </div>
          {projectCategory && (
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(projectCategory)}`}>
                {projectCategory}
              </span>
            </div>
          )}
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack.slice(0, 4).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-700/50 text-xs text-gray-300 rounded-md"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-1 bg-gray-700/50 text-xs text-gray-400 rounded-md">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-gray-500 hover:text-red-400 text-xl transition-colors opacity-0 group-hover:opacity-100"
        >
          {isDeleting ? '...' : '×'}
        </button>
      </div>

      {/* Description */}
      {projectDescription && (
        <div className="mb-4">
          <div className="text-sm line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>{projectDescription}</div>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2">
        {projectLink && (
          <button
            onClick={() => handleOpenUrl(projectLink)}
            className="w-full px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-all shadow-md hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
            }}
          >
            🌐 Open Project
          </button>
        )}
        
        {project.githubUrl && (
          <button
            onClick={() => handleOpenUrl(project.githubUrl)}
            className="w-full px-4 py-2.5 bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50 rounded-lg text-sm font-medium text-gray-100 transition-all"
          >
            🔗 Open GitHub
          </button>
        )}

        {project.localCommand && (
          <button
            onClick={handleCopyCommand}
            className="w-full px-4 py-2.5 bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50 rounded-lg text-sm font-medium text-gray-100 transition-all"
          >
            📋 Copy Command
          </button>
        )}

        {project.lastOpened && (
          <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-700/30">
            Last opened: {new Date(project.lastOpened).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
