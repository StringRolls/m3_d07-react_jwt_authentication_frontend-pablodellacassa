import axios from 'axios';

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000"
    })
  }

  getAuthorizationHeaders() {
    const storedToken = localStorage.getItem('authToken');
    return { headers: { Authorization: `Bearer ${storedToken}` } }
  }  

  signup({ email, password, name }) {
    return this.api.post(
      '/auth/signup',
      { email, password, name }
    ).then(({ data }) => data);
  }

  login({ email, password }) {
    return this.api.post(
      '/auth/login',
      { email, password }
    ).then(({ data }) => data.authToken);
  }

  verify() {
    return this.api.get(
      '/auth/verify',
      this.getAuthorizationHeaders()
    ).then(({ data }) => data);
  }


}

const authService = new AuthService();

export default authService;