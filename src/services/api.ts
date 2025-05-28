import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Corrigindo a porta para 3000
  timeout: 500,
});

export default api;