export default [{
  path: 'subscription',
  name: 'subscription-list',
  component: () => import(/* webpackChunkName: "subscription-list" */ '@/pages/subscription/list')
}, {
  path: 'subscription/history',
  name: 'subscription-history-list',
  component: () => import(/* webpackChunkName: "subscription-history-list" */ '@/pages/subscription/history')
}, {
  path: 'subscription/:id',
  name: 'subscription-show',
  component: () => import(/* webpackChunkName: "subscription-show" */ '@/pages/landing/PricingPage.vue')
}]
