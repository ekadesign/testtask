export default {
  // main navigation - side menu
  menu: [{
    text: '',
    key: '',
    items: [
      { icon: 'mdi-magnify', text: 'Поиск', link: '/admin/search' },
      { icon: 'mdi-bookshelf', text: 'Шаблоны поиска', link: '/search/templates' },
      { icon: 'mdi-star-outline', text: 'Избранное', link: '/admin/favorite' },
      { icon: 'mdi-handshake-outline', text: 'Сделки', link: '/admin/deals' },
      { icon: 'mdi-playlist-check', text: 'Задачи', link: '/admin/tasks' },
      { icon: 'mdi-calendar-check-outline', text: 'Календарь', link: '/admin/calendar' },
      { icon: 'mdi-cash-multiple', text: 'Тариф', link: '/admin/subscription' },
      { icon: 'mdi-account-outline', text: 'Пользователи', link: '/admin/users' },
      { icon: 'mdi-home-analytics', text: 'Аналитика', link: '/admin/analytics' },
      { icon: 'mdi-cog-outline', text: 'Настройки', link: '/admin/settings' },
      { icon: 'mdi-account-plus-outline', text: 'Регистрации', link: '/admin/registrations' }
    ]
  }]
}
