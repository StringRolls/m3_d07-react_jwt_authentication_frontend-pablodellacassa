import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000"
    })
  }

  getAuthorizationHeaders() {
    const storedToken = localStorage.getItem('authToken');
    return { headers: { Authorization: `Bearer ${storedToken}` } }
  }

  getAllProjects() {
    return this.api.get('/api/projects', this.getAuthorizationHeaders())
      .then(({ data }) => data);
  }

  getProjectById(projectId) {
    return this.api.get(
      `/api/projects/${projectId}`,
      this.getAuthorizationHeaders()
    )
      .then(({ data }) => data);
  }

  updateProjectById(projectId, updatedProject) {
    return this.api.put(
      `/api/projects/${projectId}`,
      updatedProject,
      this.getAuthorizationHeaders()
    )
      .then(({ data }) => data);
  }

  deleteProjectById(projectId) {
    return this.api.delete(
      `/api/projects/${projectId}`,
      this.getAuthorizationHeaders()
    )
      .then(({ data }) => data);
  }  

  createProject(newProject) {
    return this.api.post(
      '/api/projects',
      newProject,
      this.getAuthorizationHeaders()
    ).then(({ data }) => data);
  }

  createTask(newTask) {
    return this.api.post(
      '/api/tasks',
      newTask,
      this.getAuthorizationHeaders()
    ).then(({ data }) => data);
  } 
}

const apiService = new ApiService();

export default apiService;