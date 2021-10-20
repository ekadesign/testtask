import Vue from 'vue'
import moment from 'moment-timezone'
import store from '../store'

Vue.filter('fromNow', (value) => {
  const { zone, format } = store.state.app.time

  if (value) {
    return moment(value).locale('ru').tz(zone).fromNow()
  }

  return ''
})
