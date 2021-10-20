export default {
  // main navigation - side menu
  menu: [{
    text: '',
    key: '',
    items: [
      { icon: 'mdi-magnify', text: 'Поиск', link: '/owner/search' },
      { icon: 'mdi-star-outline', text: 'Избранное', link: '/owner/favorite' },
      { icon: 'mdi-handshake-outline', text: 'Сделки', link: '/owner/deals' },
      { icon: 'mdi-playlist-check', text: 'Задачи', link: '/owner/tasks' },
      { icon: 'mdi-calendar-check-outline', text: 'Календарь', link: '/owner/calendar' },
      { icon: 'mdi-cash-multiple', text: 'Тариф', link: '/owner/subscription' },
      { icon: 'mdi-account-outline', text: 'Организации', items: [
        {
          icon: '',
          text: 'Сотрудники',
          link: '/owner/teams/users' //@TODO fix it
        },
        {
          icon: '',
          text: 'Список',
          link: '/owner/teams'
        }
      ] },
      { icon: 'mdi-home-analytics', text: 'Аналитика', link: '/owner/analytics' },
      { icon: 'mdi-cog-outline', text: 'Настройки', link: '/owner/settings' }
    ]
  }]
}
