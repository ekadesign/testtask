export default [{
  path: 'organizations',
  redirect: 'teams/list'
}, {
  path: 'teams/list',
  name: 'organizations-list',
  component: () => import(/* webpackChunkName: "teams-list" */ '@/pages/owner/teams/list')
}, {
  path: 'teams/edit',
  name: 'organizations-edit',
  component: () => import(/* webpackChunkName: "teams-edit" */ '@/pages/users/EditUserPage.vue')
}]
