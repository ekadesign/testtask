export default {
  // main navigation - side menu
  menu: [{
    text: '',
    key: '',
    items: [
      { icon: 'mdi-magnify', text: 'Поиск', link: '/search' },
      { icon: 'mdi-bookshelf', text: 'Шаблоны поиска', link: '/search/templates' },
      { icon: 'mdi-star-outline', text: 'Избранное', link: '/favorite' },
      { icon: 'mdi-handshake-outline', text: 'Сделки', link: '/deals' },
      { icon: 'mdi-cog-outline', text: 'Задачи', link: '/tasks' },
      { icon: 'mdi-calendar-check-outline', text: 'Календарь', link: '/calendar' },
      { icon: 'mdi-cash-multiple', text: 'Тариф', link: '/subscription' },
      { icon: 'mdi-account-outline', text: 'Пользователи', link: '/users' },
      { icon: 'mdi-home-analytics', text: 'Аналитика', link: '/analytics' },
      { icon: 'mdi-piggy-bank-outline', text: 'Банковские гарантии', link: '/guarantees' }
    ]
  }]
}
