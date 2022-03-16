import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/index.vue'),
    },
    {
      path: '/entry',
      component: () => import('../views/entry/index.vue'),
      children: [
        {
          path: 'symbols/:symbol',
          component: () => import('../components/symbol-detail/index.vue'),
        },
        {
          path: 'members/:id',
          component: () => import('../components/member-detail/index.vue'),
        },
      ],
    },
    {
      path: '/news/:id',
      component: () =>
        import('../components/member-detail/tabs/post/index.vue'),
    },
  ],
})

export default router
