import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from "@/views/auth/RegisterView.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import authService from "@/services/authService.js";
import NotFoundView from "@/views/NotFoundView.vue";
import GroupView from "@/views/dashboard/GroupsView.vue";
import ParliamentView from "@/views/dashboard/ParliamentView.vue";
import ValidateView from "@/views/auth/ValidateView.vue";
import GroupsView from "@/views/dashboard/GroupsView.vue";

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
      component: RegisterView,
    },
    {
      path:'/validate/:id',
      name:'validate',
      component: ValidateView,
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component: DashboardView,
      meta: {
          requiresAuth: true
      }
    },
    {
      path: '/groups',
      name: 'groups',
      component: GroupsView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/parliament',
      name: 'parliament',
      component: ParliamentView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
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
