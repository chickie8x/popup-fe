import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/index.vue')
    },
    {
      path: '/symbols/:symbol',
      component: () => import('../views/symbols/index.vue')
    }
  ],
});
