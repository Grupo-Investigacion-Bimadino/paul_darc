// src/axios.ts

import axios from 'axios';

// La URL base de tu API de NestJS.
// Si tu backend corre en un puerto diferente, cámbialo aquí.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Esta función intercepta cada solicitud para añadir el token de autenticación
// si existe. Ya la tenías, ¡la mantenemos porque es una excelente práctica!
export const setAuthHeaderToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;