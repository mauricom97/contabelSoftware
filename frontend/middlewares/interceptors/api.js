import axios from "axios";
import urlApi from "../../utils/urlApi";

// Configuração do Axios
const api = axios.create({
  baseURL: urlApi, // Base da sua API
});

// Interceptor para adicionar o token às requisições
api.interceptors.request.use(
  async (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function getAuthToken() {
  const token = localStorage.getItem("token");
  return token ? token : null;
}

export default api;
