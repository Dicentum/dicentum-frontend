import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from "@/views/auth/RegisterView.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import authService from "@/services/authService.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'home',
      component: HomeView
    },
    {
      path:'/login',
      name:'login',
      component: LoginView
    },
    {
      path:'/register',
      name:'register',
      component: RegisterView
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component: DashboardView,
      meta: {
          requiresAuth: true
      }
    }
  ]
})

// Navigation guard to check if the route requires authentication
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && !authService.getToken()) {
    next({ name: 'login' });
  } else {
    next();
  }
});
export default router
