import axios from 'axios'
import { API_URL } from '@/configs/api'

const isAuthorized = async () => {
  let res = { isAuthorized: false, data: [] }

  try {
    const data = await axios.get(API_URL + '/auth/me?include=role')

    res = { isAuthorized: true, data: data.data.data }
  } catch (err) {
    if (err.response?.data?.code !== 200) {
      res = { isAuthorized: false, data: [] }
    }
  }

  return res
}

const checkPermissions = async (to, from, next) => {
  const profile = await isAuthorized()

  if (!profile.isAuthorized) {
    return next({ name: 'auth-login' })
  }

  return next()
}

export default [{
  path: 'analytics',
  name: 'analytics',
  component: () =>
    import(
      /* webpackChunkName: "dashboard" */ '@/pages/admin/dashboard/DashboardPage.vue'
    ),
  beforeEnter: async (to, from, next) =>
    await checkPermissions(to, from, next)
},
{
  path: 'favorite',
  name: 'favorite',
  component: () =>
    import(
      /* webpackChunkName: "dashboard" */ '@/pages/admin/favorite/Favorite.vue'
    ),
  beforeEnter: async (to, from, next) =>
    await checkPermissions(to, from, next)
},
{
  path: 'search',
  name: 'search-list',
  component: () =>
    import(
      /* webpackChunkName: "search-list" */ '@/pages/admin/tenders/search'
    ),
  beforeEnter: async (to, from, next) =>
    await checkPermissions(to, from, next)
},
{
  path: 'users',
  redirect: 'users/list'
}, {
  path: 'users/list',
  name: 'users-list',
  component: () => import(/* webpackChunkName: "users-list" */ '@/pages/admin/users/UsersPage.vue')
}, {
  path: 'users/edit',
  name: 'users-edit',
  component: () => import(/* webpackChunkName: "users-edit" */ '@/pages/admin/users/EditUserPage.vue')
},
{
  path: 'subscription',
  name: 'subscription-list',
  component: () => import(/* webpackChunkName: "subscription-list" */ '@/pages/admin/subscription/list')
}, {
  path: 'subscription/history',
  name: 'subscription-history-list',
  component: () => import(/* webpackChunkName: "subscription-history-list" */ '@/pages/admin/subscription/history')
}, {
  path: 'subscription/:id',
  name: 'subscription-show',
  component: () => import(/* webpackChunkName: "subscription-show" */ '@/pages/admin/landing/PricingPage.vue')
},
{
  path: 'registrations',
  redirect: 'registrations/list'
}, {
  path: 'registrations/list',
  name: 'registrations-list',
  component: () => import(/* webpackChunkName: "registrations-list" */ '@/pages/admin/registrations/RegistrationsPage.vue')
}, {
  path: 'registrations/edit',
  name: 'registrations-edit',
  component: () => import(/* webpackChunkName: "registrations-edit" */ '@/pages/admin/registrations/EditRegistrationPage.vue')
}]