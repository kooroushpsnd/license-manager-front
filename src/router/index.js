import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '@/views/LoginPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import NotFound from '@/components/NotFound.vue'
import ProfileView from '@/views/ProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpPage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/profile',
    name: "profile",
    component: ProfileView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
