import { createRouter, createWebHistory } from 'vue-router'
import { GameView, MainView, SettingsView } from '@/views'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainView,
    },
    {
      path: '/game',
      name: 'GameCenter',
      component: GameView,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsView,
    },
  ],
})

export default router
