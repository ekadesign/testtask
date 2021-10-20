export default [
  {
    path: '/search/templates',
    name: 'search-templates',
    component: () =>
      import(
        /* webpackChunkName: "search-templates" */ '@/pages/dashboard/DashboardPage.vue'
      )
  }
]
