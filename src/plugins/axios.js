import axios from 'axios';

const apiCliente= axios.create({
  baseURL: 'https://api-sandbox.factus.com.co',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitud
apiCliente.interceptors.request.use(
  config => {
    
    // Obtener el token del sessionStorage
    const token = sessionStorage.getItem('authToken');
    if (token) {
      
      // Agregar el token Bearer a los encabezados de la solicitud
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error("Error en el interceptor de solicitud:", error);
    return Promise.reject(error);
  }
);

// Interceptor de respuesta
apiCliente.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error("Error en la respuesta:", error);
    // Puedes manejar errores aquí
    return Promise.reject(error);
  }
);

export default apiCliente;