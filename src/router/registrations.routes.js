export default [{
  path: 'registrations',
  redirect: 'registrations/list'
}, {
  path: 'registrations/list',
  name: 'registrations-list',
  component: () => import(/* webpackChunkName: "registrations-list" */ '@/pages/registrations/RegistrationsPage.vue')
}, {
  path: 'registrations/edit',
  name: 'registrations-edit',
  component: () => import(/* webpackChunkName: "registrations-edit" */ '@/pages/registrations/EditRegistrationPage.vue')
}]
