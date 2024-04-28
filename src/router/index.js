import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from "@/views/auth/RegisterView.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import authService from "@/services/authService.js";
import NotFoundView from "@/views/NotFoundView.vue";
import ParliamentView from "@/views/parliament/ParliamentView.vue";
import ValidateView from "@/views/auth/ValidateView.vue";
import GroupsView from "@/views/groups/GroupsView.vue";
import GroupDetailView from "@/views/groups/GroupDetailView.vue";
import EditParliamentView from "@/views/parliament/EditParliamentView.vue";
import ProfileView from "@/views/dashboard/ProfileView.vue";
import DebatesView from "@/views/debates/DebatesView.vue";
import EditGroupView from "@/views/groups/EditGroupView.vue";
import CreateGroupView from "@/views/groups/CreateGroupView.vue";
import CreateParliamentView from "@/views/parliament/CreateParliamentView.vue";

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
      path: '/profile',
      name: 'profile',
      component: ProfileView,
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
      path: '/groups/:id',
      name: 'groupsDetails',
      component: GroupDetailView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/groups/create',
      name: 'createGroup',
      component: CreateGroupView,
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
      path: '/parliament/create',
      name: 'createParliament',
      component: CreateParliamentView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/editParliament',
      name: 'editParliament',
      component: EditParliamentView,
        meta: {
            requiresAuth: true
        },
    },
    {
      path: '/editGroup/:id',
      name: 'editGroup',
      component: EditGroupView,
      meta: {
        requiresAuth: true
      },
    },
    {
        path: '/debates',
        name: 'debates',
        component: DebatesView,
            meta: {
                requiresAuth: true
            },
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
  if (to.meta.requiresAuth && !authService.isAuthenticated()) {
    next({ name: 'login' });
  } else {
    next();
  }
});
export default router
