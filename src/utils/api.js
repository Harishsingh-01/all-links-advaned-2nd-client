import axios from 'axios';

// 👉 PRODUCTION BACKEND (Render)
const api = axios.create({
  baseURL: 'https://all-links-advaned-2nd-server.onrender.com/api',
});

// Attach token automatically when present in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Global response interceptor: if token is invalid/expired, remove it and broadcast logout so all tabs update
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      try {
        localStorage.removeItem('token')
        // notify other tabs and listeners in this tab
        window.dispatchEvent(new Event('logout'))
      } catch (e) {
        // ignore
      }
    }
    return Promise.reject(error)
  }
)


/*
👉 LOCAL BACKEND (use when running backend locally)
Uncomment this and comment the above block if needed

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});
*/

// ============================
// Auth API
// ============================
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

// ============================
// Projects API Functions
// ============================

export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getProject = async (id) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

export const updateLastOpened = async (id) => {
  try {
    const response = await api.patch(`/projects/${id}/last-opened`);
    return response.data;
  } catch (error) {
    console.error('Error updating last opened:', error);
    throw error;
  }
};
