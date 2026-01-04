import { useNavigate } from 'react-router-dom'
import ProjectForm from '../components/ProjectForm'

const FormPage = () => {
  const navigate = useNavigate()
  const handleSave = () => {
    navigate('/dashboard')
  }
  return (
    <div className="min-h-screen px-6 py-20 max-w-4xl mx-auto">
      <ProjectForm onSave={handleSave} onCancel={() => navigate(-1)} />
    </div>
  )
}

export default FormPage
