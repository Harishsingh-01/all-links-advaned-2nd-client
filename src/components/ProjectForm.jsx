import { useState } from 'react'
import { createProject, updateProject } from '../utils/api'

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: project?.title || project?.name || '',
    description: project?.description || project?.notes || '',
    link: project?.link || project?.url || '',
    category: project?.category || project?.type || '',
    techStack: project?.techStack || [],
    status: project?.status || 'Stable',
    githubUrl: project?.githubUrl || '',
    localCommand: project?.localCommand || '',
  })

  const [techInput, setTechInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title) {
      alert('Title is required')
      return
    }

    setIsSubmitting(true)
    try {
      if (project) {
        await updateProject(project._id || project.id, formData)
      } else {
        await createProject(formData)
      }
      onSave()
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Failed to save project')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddTech = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, techInput.trim()],
      })
      setTechInput('')
    }
  }

  const handleRemoveTech = (index) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((_, i) => i !== index),
    })
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="backdrop-blur-sm border rounded-xl p-6 shadow-xl"
      style={{ 
        background: 'var(--color-card-bg)',
        borderColor: 'var(--color-card-border)' 
      }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        {project ? 'Edit Project' : 'Add New Project'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Basic Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg text-gray-100 focus:outline-none focus:ring-2 transition-all"
              style={{ 
                background: 'var(--color-input-bg)',
                borderColor: 'var(--color-border)',
                '--tw-ring-color': 'var(--color-primary)',
              }}
              style={{ 
                borderColor: 'var(--color-border)',
                '--tw-ring-color': 'var(--color-primary)',
              }}
              required
              placeholder="My Awesome Project"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg text-gray-100 focus:outline-none focus:ring-2 transition-all"
              style={{ 
                background: 'var(--color-input-bg)',
                borderColor: 'var(--color-border)',
                '--tw-ring-color': 'var(--color-primary)',
              }}
              style={{ 
                borderColor: 'var(--color-border)',
                '--tw-ring-color': 'var(--color-primary)',
              }}
              placeholder="PORTFOLIO, Frontend, Backend, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-lg text-gray-100 focus:outline-none focus:ring-2 transition-all"
              style={{ 
                background: 'var(--color-input-bg)',
                borderColor: 'var(--color-border)',
                '--tw-ring-color': 'var(--color-primary)',
              }}
              style={{ 
                borderColor: 'var(--color-border)',
                '--tw-ring-color': 'var(--color-primary)',
              }}
            >
              <option>Stable</option>
              <option>Debugging</option>
              <option>Broken</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tech Stack
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddTech()
                  }
                }}
                placeholder="React, Node.js, MongoDB..."
                className="flex-1 px-4 py-2.5 bg-gray-900/50 border rounded-lg text-gray-100 focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: 'var(--color-border)',
                  '--tw-ring-color': 'var(--color-primary)',
                }}
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-4 py-2.5 bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50 rounded-lg text-gray-100 transition-all"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-gray-700/50 text-sm text-gray-300 rounded-lg flex items-center gap-2 border border-gray-600/50"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(idx)}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* URLs & Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Links & Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Link
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://myproject.com"
              className="w-full px-4 py-2.5 border rounded-lg text-gray-100 focus:outline-none focus:ring-2 transition-all"
              style={{ 
                background: 'var(--color-input-bg)',
                borderColor: 'var(--color-border)',
                '--tw-ring-color': 'var(--color-primary)',
              }}
              style={{ 
                borderColor: 'var(--color-border)',
                '--tw-ring-color': 'var(--color-primary)',
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/user/repo"
              className="w-full px-4 py-2.5 border rounded-lg text-gray-100 focus:outline-none focus:ring-2 transition-all"
              style={{ 
                background: 'var(--color-input-bg)',
                borderColor: 'var(--color-border)',
                '--tw-ring-color': 'var(--color-primary)',
              }}
              style={{ 
                borderColor: 'var(--color-border)',
                '--tw-ring-color': 'var(--color-primary)',
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Local Command
            </label>
            <input
              type="text"
              value={formData.localCommand}
              onChange={(e) => setFormData({ ...formData, localCommand: e.target.value })}
              placeholder="npm run dev"
              className="w-full px-4 py-2.5 bg-gray-900/50 border rounded-lg text-gray-100 focus:outline-none focus:ring-2 transition-all font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Project description, notes, reminders, etc..."
              rows="4"
              className="w-full px-4 py-2.5 bg-gray-900/50 border rounded-lg text-gray-100 focus:outline-none focus:ring-2 transition-all text-sm resize-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-700/50">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50 rounded-lg text-gray-100 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-lg text-white font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
          }}
        >
          {isSubmitting ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  )
}

export default ProjectForm
