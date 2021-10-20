import Vue from 'vue'
import Router from 'vue-router'

// Routes
import PagesRoutes from './pages.routes'
import LandingRoutes from './landing.routes'
import OwnerRoutes from './owner.routes'
import AdminRoutes from './admin.routes'
import { API_URL } from '@/configs/api'
import axios from 'axios'

Vue.use(Router)
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

const getPathByRole = (role, next) => {
  localStorage.setItem('role', role)

  return next(`/${role}/`)
}

export const routes = [
  ...PagesRoutes,
  ...LandingRoutes,

  {
    path: '/blank',
    name: 'blank',
    component: () =>
      import(/* webpackChunkName: "blank" */ '@/pages/common/BlankPage.vue')
  },
  {
    path: '*',
    name: 'error',
    component: () =>
      import(
        /* webpackChunkName: "error" */ '@/pages/common/error/NotFoundPage.vue'
      ),
    meta: {
      layout: 'error'
    }
  },
  {
    path: '/',
    beforeEnter: async (to, from, next) => {
      const profile = await isAuthorized()

      if (!profile.isAuthorized) {
        return next({ name: 'auth-login' })
      }

      localStorage.setItem('user', JSON.stringify(profile.data))

      const role = profile.data.role.name

      if (!profile.isAuthorized) {
        return next({ name: 'auth-login' })
      }
      //@TODO refactor role policy
      getPathByRole(role, next)
    }
  },
  {
    path: '/admin',
    component: () => import('@/pages/admin/default'),
    children: [...AdminRoutes]
  },
  {
    path: '/owner',
    component: () => import('@/pages/owner/default'),
    children: [...OwnerRoutes]
  },
  {
    path: '/profile',
    name: 'profile-view',
    component: () => import(/* webpackChunkName: "deals-view" */ '@/pages/profile')
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes
})

/**
 * Before each route update
 */
router.beforeEach((to, from, next) => {
  return next()
})

/**
 * After each route update
 */
router.afterEach((to, from) => {})

export default router
