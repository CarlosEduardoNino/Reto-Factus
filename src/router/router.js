import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import LoginView from '../views/login.vue';

import { useAuthStore } from '../store/store.js';

const routes = [
  { path: '/home', name: 'home', component: Home,  },
  { path: '/', name: 'login', component: LoginView },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Verificar si la ruta requiere autenticación y si el usuario está autenticado
  if (to.meta.requiresAuth && !authStore.token) {
    next({ name: 'login' });  // Usar el nombre 'login' correctamente
  } else {
    next();
  }
});

export default router;
