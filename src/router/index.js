import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  routes: [
    {
      // only for test
      path: '/',
      component: () => import('../views/index.vue'),
    },
    {
      path: '/entry',
      component: () => import('../views/entry/index.vue'),
      children: [
        {
          path: 'symbols/:symbol',
          component: () => import('../views/entry/symbols/index.vue'),
          children: [
            {
              path: '/overall',
              name: 'symbols-overall',
              component: () =>
                import('../views/entry/symbols/tabs/overall/index.vue'),
            },
            {
              path: '',
              name: 'symbols-news',
              component: () =>
                import('../views/entry/symbols/tabs/news/index.vue'),
            },
            {
              path: 'shareholder',
              name: 'symbols-shareholder',
              component: () =>
                import('../views/entry/symbols/tabs/shareholder/index.vue'),
            },
            {
              path: 'technical-chart',
              name: 'symbols-technical-chart',
              component: () =>
                import('../views/entry/symbols/tabs/technical-chart/index.vue'),
            },
            {
              path: 'company-detail',
              name: 'symbols-company-detail',
              component: () =>
                import('../views/entry/symbols/tabs/company-detail/index.vue'),
            },
            {
              path: 'finance',
              name: 'symbols-finance',
              component: () =>
                import('../views/entry/symbols/tabs/finance/index.vue'),
            },
            {
              path: 'history-price',
              name: 'symbols-history-price',
              component: () =>
                import('../views/entry/symbols/tabs/history-price/index.vue'),
            },
            {
              path: 'dividend',
              name: 'symbols-dividend',
              component: () =>
                import('../views/entry/symbols/tabs/dividend/index.vue'),
            },
          ],
        },
        {
          path: 'members/:id',
          name: 'members-detail',
          component: () => import('../views/entry/members/index.vue'),
        },
        {
          path: 'news/:id',
          name: 'news-detail',
          component: () => import('../views/entry/news/index.vue'),
        },
      ],
    },
  ],
  history: createWebHistory(),
})
