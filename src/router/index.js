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
import GroupManageView from "@/views/groups/GroupManageView.vue";
import CreateDebateView from "@/views/debates/CreateDebateView.vue";
import DebateDetailView from "@/views/debates/DebateDetailView.vue";
import EditDebateView from "@/views/debates/EditDebateView.vue";
import ManageTimersView from "@/views/debates/ManageTimersView.vue";
import VotingView from "@/views/debates/VotingView.vue";
import ResultView from "@/views/debates/ResultView.vue";

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
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView,
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
        },
      ]
    },
    {
      path: '/groups',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'groups',
          component: GroupsView,
        },
        {
          path: ':id',
          name: 'groupsDetails',
          component: GroupDetailView,
        },
        {
          path: ':id/manage',
          name: 'groupsManage',
          component: GroupManageView,
        },
        {
          path: 'create',
          name: 'createGroup',
          component: CreateGroupView,
        },
        {
          path: ':id/edit',
          name: 'editGroup',
          component: EditGroupView,
        },
      ]
    },
    {
      path: '/parliament',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'parliament',
          component: ParliamentView,
        },
        {
          path: 'create',
          name: 'createParliament',
          component: CreateParliamentView,
        },
        {
          path: 'edit',
          name: 'editParliament',
          component: EditParliamentView,
        },
      ]
    },
    {
      path: '/debates',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'debates',
          component: DebatesView,
        },
        {
          path: 'create',
          name: 'createDebate',
          component: CreateDebateView,
        },
        {
          path: ':id',
          name: 'debateDetails',
          component: DebateDetailView,
        },
        {
          path: ':id/edit',
          name: 'editDebate',
          component: EditDebateView,
        },
        {
          path: ':id/timers',
          name: 'manageTimers',
          component: ManageTimersView,
        },
        {
          path: 'vote/:id',
          name: 'voteDebate',
          component: VotingView,
        },
        {
          path: 'result/:id',
          name: 'resultDebate',
          component: ResultView,
        },
      ]
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