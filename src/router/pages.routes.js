export default [
  {
    path: '/auth/login',
    name: 'auth-login',
    component: () =>
      import(
        /* webpackChunkName: "auth-signin" */ '@/pages/common/auth/SigninPage.vue'
      ),
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/auth/register',
    name: 'auth-register',
    component: () =>
      import(
        /* webpackChunkName: "auth-signup" */ '@/pages/common/auth/SignupPage.vue'
      ),
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/auth/verify-email',
    name: 'auth-verify-email',
    component: () =>
      import(
        /* webpackChunkName: "auth-verify-email" */ '@/pages/common/auth/VerifyEmailPage.vue'
      ),
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/auth/forgot-password',
    name: 'auth-forgot',
    component: () =>
      import(
        /* webpackChunkName: "auth-forgot" */ '@/pages/common/auth/ForgotPage.vue'
      ),
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/auth/reset-password',
    name: 'auth-reset',
    component: () =>
      import(/* webpackChunkName: "auth-reset" */ '@/pages/common/auth/ResetPage.vue'),
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/error/not-found',
    name: 'error-not-found',
    component: () =>
      import(
        /* webpackChunkName: "error-not-found" */ '@/pages/common/error/NotFoundPage.vue'
      ),
    meta: {
      layout: 'error'
    }
  },
  {
    path: '/error/unexpected',
    name: 'error-unexpected',
    component: () =>
      import(
        /* webpackChunkName: "error-unexpected" */ '@/pages/common/error/UnexpectedPage.vue'
      ),
    meta: {
      layout: 'error'
    }
  },
  {
    path: '/utility/maintenance',
    name: 'utility-maintenance',
    component: () =>
      import(
        /* webpackChunkName: "utility-maintenance" */ '@/pages/common/utility/MaintenancePage.vue'
      ),
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/utility/coming-soon',
    name: 'utility-soon',
    component: () =>
      import(
        /* webpackChunkName: "utility-soon" */ '@/pages/common/utility/SoonPage.vue'
      ),
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/utility/help',
    name: 'utility-help',
    component: () =>
      import(
        /* webpackChunkName: "utility-help" */ '@/pages/common/utility/HelpPage.vue'
      )
  },
  {
    path: '/registration/success',
    name: 'registration-success',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '@/pages/common/auth/RegistrationSuccessPage.vue'
      ),
    meta: {
      layout: 'simple'
    }
  },
  {
    path: '/logout/success',
    name: 'logout-success',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '@/pages/common/auth/LogoutSuccessPage.vue'
      ),
    meta: {
      layout: 'simple'
    }
  }
]
