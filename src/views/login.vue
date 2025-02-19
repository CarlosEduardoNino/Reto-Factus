<template>
  <div class="login-container">
    <!-- Círculos decorativos animados -->
    <div class="animated-circle circle-1"></div>
    <div class="animated-circle circle-2"></div>
    <div class="animated-circle circle-3"></div>

    <!-- Contenedor principal -->
    <div class="main-container">
      <!-- Banner superior -->
      <div class="banner-container">
        <div class="banner-content">
          <div class="logo-container">
            <div class="logo-circle">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <h1 class="banner-title">Facturación Factus</h1>
          <p class="banner-subtitle">Tu sistema de gestión empresarial</p>
        </div>
      </div>

      <!-- Formulario de login -->
      <div class="form-container">
        <div class="form-content">
          <h2 class="form-title">¡Bienvenido de nuevo!</h2>
          
          <!-- Mensaje de error -->
          <div v-if="errorMessage" class="error-message">
            <span>{{ errorMessage }}</span>
            <button @click="errorMessage = ''" class="error-close">×</button>
          </div>

          <form @submit.prevent="login" class="login-form">
            <div class="input-group">
              <label>Correo Electrónico</label>
              <div class="input-wrapper">
                <input
                  v-model="email"
                  type="email"
                  required
                  placeholder="Ingresa tu correo electrónico"
                />
                <span class="input-icon">📧</span>
              </div>
            </div>

            <div class="input-group">
              <label>Contraseña</label>
              <div class="input-wrapper">
                <input 
                  type="password" 
                  v-model="password"
                  required 
                  placeholder="Ingresa tu contraseña" 
                  autocomplete="current-password">
                <span class="input-icon">🔒</span>
              </div>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="submit-button"
            >
              <span v-if="loading">
                <span class="loading-spinner"></span>
                Ingresando...
              </span>
              <span v-else>Ingresar al Sistema</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiCliente from '../plugins/axios.js';


const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');
const router = useRouter();

const login = async () => {
  console.log("Usuario: ", email.value);
console.log("Contraseña: ", password.value);

  loading.value = true;
  try {
    
  const response = await apiCliente.post('/oauth/token', {
    username: email.value,  
    password: password.value,
    grant_type: 'password',
    client_id: "9e2e186f-2719-42aa-8b59-e478780401d2",
    client_secret: "InE6kBPby1XhWyEi94J5WV3fQejhdL7khyTGlvKd"
    
  });
  
  console.log(response);
  sessionStorage.setItem('authToken', response.data.access_token);
  router.push('/home');
} catch (error) {
  console.error('Error de inicio de sesión:', error);
  if (error.response) {
    console.error("Detalles del error: ", error.response.data);
  }
  errorMessage.value = '¡Oops! Credenciales incorrectas. ¡Inténtalo de nuevo!';
}

 finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.animated-circle {
  position: absolute;
  border-radius: 50%;
  animation: float 6s infinite ease-in-out;
}

.circle-1 {
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  top: -150px;
  left: -150px;
  animation-delay: 0s;
}

.circle-2 {
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.15);
  top: 50%;
  right: -100px;
  animation-delay: 2s;
}

.circle-3 {
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.1);
  bottom: -75px;
  left: 10%;
  animation-delay: 4s;
}

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
  100% { transform: translateY(0) rotate(360deg); }
}

.main-container {
  width: 90%;
  max-width: 1000px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.banner-container {
  background: linear-gradient(to right, #4834d4, #686de0);
  padding: 2rem;
  text-align: center;
  position: relative;
}

.banner-content {
  position: relative;
  z-index: 1;
}

.logo-container {
  margin-bottom: 1rem;
}

.logo-circle {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.banner-title {
  color: white;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.banner-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
}

.form-container {
  padding: 2rem;
  background: white;
}

.form-content {
  max-width: 400px;
  margin: 0 auto;
}

.form-title {
  font-size: 1.5rem;
  color: #2d3436;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2d3436;
  font-weight: 500;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  width: 100%;
  padding: 1rem;
  padding-right: 3rem;
  border: 2px solid #e1e1e1;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.input-wrapper input:focus {
  border-color: #4834d4;
  box-shadow: 0 0 0 4px rgba(72, 52, 212, 0.1);
  background: white;
}

.input-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
}

.submit-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(to right, #4834d4, #686de0);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(72, 52, 212, 0.3);
}

.submit-button:active {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  background: #ff7675;
  color: white;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.error-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.5rem;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .main-container {
    width: 95%;
    margin: 1rem;
  }

  .banner-title {
    font-size: 2rem;
  }

  .form-container {
    padding: 1.5rem;
  }
}
</style>