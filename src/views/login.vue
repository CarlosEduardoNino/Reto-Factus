<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-8">
    <!-- Contenedor principal con efecto de vidrio -->
    <div class="grid lg:grid-cols-2 w-full max-w-7xl bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10">
      <!-- Panel izquierdo -->
      <div class="hidden lg:block relative h-full min-h-[600px] bg-gradient-to-br from-blue-600 to-indigo-700">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        <div class="relative h-full flex flex-col justify-between p-12 text-white">
          <div class="space-y-8">
            <h1 class="text-5xl font-bold tracking-tight leading-none">
              ¡Bienvenido<br/>de nuevo!
            </h1>
            <p class="text-xl text-blue-100 leading-relaxed max-w-md">
              Accede a tu cuenta para gestionar tu inventario de manera eficiente y segura.
            </p>
          </div>
          <div class="space-y-6">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                <span class="text-2xl">🔒</span>
              </div>
              <div>
                <h3 class="font-semibold">Seguridad Garantizada</h3>
                <p class="text-sm text-blue-100">Tus datos están protegidos</p>
              </div>
            </div>
            <p class="text-sm text-blue-200 font-medium">
              © 2025 Tu Empresa. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>

      <!-- Panel derecho - Formulario -->
      <div class="flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div class="w-full max-w-md space-y-8">
          <!-- Logo y encabezado -->
          <div class="text-center">
            <div class="inline-block">
              <logo class="h-16 w-auto transform transition-transform hover:scale-105" />
            </div>
            <h2 class="mt-8 text-3xl font-bold tracking-tight text-gray-900">
              Iniciar Sesión
            </h2>
            <p class="mt-3 text-base text-gray-600">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          <!-- Formulario -->
          <form @submit.prevent="login" class="mt-12 space-y-6">
            <div class="space-y-5">
              <!-- Campo Usuario -->
              <div class="form-group">
                <label for="username" class="form-label">Usuario</label>
                <div class="relative">
                  <input
                    id="username"
                    v-model="username"
                    type="text"
                    required
                    class="form-input"
                    placeholder="Ingresa tu nombre de usuario"
                  />
                  <div class="form-icon">👤</div>
                </div>
              </div>

              <!-- Campo Contraseña -->
              <div class="form-group">
                <label for="password" class="form-label">Contraseña</label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    required
                    class="form-input"
                    placeholder="Ingresa tu contraseña"
                  />
                  <div class="form-icon">🔒</div>
                </div>
              </div>
            </div>

            <!-- Enlaces adicionales -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                  Recordarme
                </label>
              </div>
              
            </div>

            <!-- Botón de envío -->
            <button
              type="submit"
              :disabled="loading"
              class="login-button"
            >
              <span v-if="loading" class="flex items-center justify-center">
              
              </span>
              <span v-else>Iniciar Sesión</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from '../plugins/axios.js';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();
const loading = ref(false);

const login = async () => {
  loading.value = true;
  try {
    const response = await axios.post('/oauth/token', {
      username: username.value,
      password: password.value,
      grant_type: 'password',
      client_id: import.meta.env.VITE_VUE_APP_CLIENT_ID,
      client_secret: import.meta.env.VITE_VUE_APP_CLIENT_SECRET,
    });
    sessionStorage.setItem('authToken', response.data.access_token);
    router.push('/home');
  } catch (error) {
    alert('Error: usuario o contraseña incorrectos');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Estilos base */
:root {
  --primary-color: #3b82f6;
  --primary-darker: #2563eb;
  --primary-lighter: #60a5fa;
  --success-color: #10b981;
  --error-color: #ef4444;
  --text-primary: #1f2937;
  --text-secondary: #4b5563;
  --background-primary: #ffffff;
  --background-secondary: #f9fafb;
  --border-color: #e5e7eb;
  --input-focus-ring: rgba(59, 130, 246, 0.5);
  --transition-speed: 0.2s;
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Estilos de formulario */
.form-group {
  animation: fadeIn 0.6s ease-out;
  animation-fill-mode: both;
}

.form-group:nth-child(2) {
  animation-delay: 0.1s;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  transition: color var(--transition-speed);
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-primary);
  background-color: var(--background-secondary);
  border: 2px solid var(--border-color);
  border-radius: 0.75rem;
  transition: all var(--transition-speed);
  appearance: none;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  background-color: var(--background-primary);
  box-shadow: 0 0 0 4px var(--input-focus-ring);
}

.form-input::placeholder {
  color: #9ca3af;
}

.form-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem;
  color: var(--text-secondary);
  pointer-events: none;
  transition: all var(--transition-speed);
}

.form-input:focus + .form-icon {
  color: var(--primary-color);
}


.login-button {
  position: relative;
  width: 100%;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
 
  
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all var(--transition-speed);
  overflow: hidden;
  animation: scaleIn 0.6s ease-out 0.2s;
  animation-fill-mode: both;
}

.login-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 0;
  transition: opacity var(--transition-speed);
}

.login-button:hover::before {
  opacity: 1;
}

.login-button:focus {
  outline: none;
  box-shadow: 0 0 0 4px var(--input-focus-ring);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-button > span {
  position: relative;
  z-index: 1;
}

/* Efectos de hover en contenedores */
.form-group:hover .form-label {
  color: var(--primary-color);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .form-input {
    font-size: 16px; 
  }
}

* {
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>