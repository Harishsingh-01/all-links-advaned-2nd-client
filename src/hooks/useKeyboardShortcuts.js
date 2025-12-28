import { useEffect } from 'react'

export const useKeyboardShortcuts = (onEnvironmentToggle, onAddProject) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl+K or Cmd+K for command palette (future feature)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        // Placeholder for future command palette
        console.log('Command palette (coming soon)')
      }

      // Ctrl+N or Cmd+N for new project
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        if (onAddProject) {
          onAddProject()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [onEnvironmentToggle, onAddProject])
}

