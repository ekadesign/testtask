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

export default [
  {
    path: '/',
    name: 'dashboard-analytics',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/owner/dashboard/DashboardPage.vue'),
    beforeEnter: async (to, from, next) => await checkPermissions(to, from, next)
  },
  {
    path: 'favorite',
    name: 'favorite',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '@/pages/owner/favorite/Favorite.vue'
      ),
    beforeEnter: async (to, from, next) =>
      await checkPermissions(to, from, next)
  },
  {

    path: 'search',
    name: 'search-list',
    component: () => import(/* webpackChunkName: "search-list" */ '@/pages/owner/tenders/search'),
    beforeEnter: async (to, from, next) => await checkPermissions(to, from, next)
  },
  {

    path: 'tenders/:id',
    name: 'tender-view',
    component: () => import(/* webpackChunkName: "search-list" */ '@/pages/owner/tenders/view'),
    beforeEnter: async (to, from, next) => await checkPermissions(to, from, next)
  },

  {
    path: 'users',
    redirect: 'users/list'
  }, {
    path: 'users/list',
    name: 'users-list',
    component: () => import(/* webpackChunkName: "users-list" */ '@/pages/owner/users/UsersPage.vue')
  }, {
    path: 'users/edit',
    name: 'users-edit',
    component: () => import(/* webpackChunkName: "users-edit" */ '@/pages/owner/users/EditUserPage.vue')
  },
  {
    path: 'subscription',
    name: 'subscription-list',
    component: () => import(/* webpackChunkName: "subscription-list" */ '@/pages/owner/subscription/list')
  }, {
    path: 'subscription/history',
    name: 'subscription-history-list',
    component: () => import(/* webpackChunkName: "subscription-history-list" */ '@/pages/owner/subscription/history')
  }, {
    path: 'subscription/:id',
    name: 'subscription-show',
    component: () => import(/* webpackChunkName: "subscription-show" */ '@/pages/owner/landing/PricingPage.vue')
  },
  {
    path: 'teams',
    redirect: 'teams/list'
  }, {
    path: 'teams/list',
    name: 'teams-list',
    component: () => import(/* webpackChunkName: "teams-list" */ '@/pages/owner/teams/list')
  },
  {
    path: 'teams/users',
    redirect: 'teams/users/list'
  },
  {
    path: 'teams/users/list',
    name: 'teams-users-list',
    component: () => import(/* webpackChunkName: "teams-list" */ '@/pages/owner/teams/users/list')
  },
  {
    path: 'teams/users/invite',
    name: 'teams-users-invite',
    component: () => import(/* webpackChunkName: "teams-list" */ '@/pages/owner/teams/invite')
  },
  {
    path: 'teams/users/:id/edit',
    name: 'teams-users-edit',
    component: () => import(/* webpackChunkName: "teams-users-edit" */ '@/pages/owner/teams/edit/index')
  },
  {
    path: 'teams/edit',
    name: 'teams-edit',
    component: () => import(/* webpackChunkName: "teams-edit" */ '@/pages/owner/users/EditUserPage.vue')
  },
  {
    path: 'deals',
    redirect: 'deals/list'
  },
  {
    path: 'deals/list',
    name: 'deals-list',
    component: () => import(/* webpackChunkName: "deals-list" */ '@/pages/owner/deals/list')
  },
  {
    path: 'deals/:id',
    name: 'deals-view',
    component: () => import(/* webpackChunkName: "deals-view" */ '@/pages/owner/deals/view')
  },
  {
    path: 'tasks/',
    name: 'tasks-index',
    component: () => import(/* webpackChunkName: "deals-view" */ '@/pages/owner/tasks/list')
  },
  {
    path: 'tasks/:id',
    name: 'tasks-view',
    component: () => import(/* webpackChunkName: "deals-view" */ '@/pages/owner/deals/view/TaskView')
  }
]