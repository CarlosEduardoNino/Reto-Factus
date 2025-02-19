import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import LoginView from '../views/login.vue';
import { useAdministradorStore } from '../store/store.js';  // Importar el store de Pinia

const routes = [
  { path: '/home', name: 'home', component: Home,  },
  { path: '/', name: 'login', component: LoginView },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const administradorStore = useAdministradorStore();  // Acceder al store de Pinia

  // Verificar si el token existe en el store
  if (to.meta.requiresAuth && !administradorStore.token) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
