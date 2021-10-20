import axios from 'axios'
import { API_URL, getCurrentUser } from '@/configs/api'

const showToast = ({ state, commit }, message) => {
  if (state.toast.show) commit('hideToast')

  setTimeout(() => {
    commit('showToast', {
      color: 'black',
      message,
      timeout: 3000
    })
  })
}

const showError = ({ state, commit }, { message = 'Failed!', error }) => {
  if (state.toast.show) commit('hideToast')

  setTimeout(() => {
    commit('showToast', {
      color: 'error',
      message: message + ' ' + error.message,
      timeout: 10000
    })
  })
}

const showSuccess = ({ state, commit }, message) => {
  if (state.toast.show) commit('hideToast')

  setTimeout(() => {
    commit('showToast', {
      color: 'success',
      message,
      timeout: 3000
    })
  })
}

const getUser = async ({ state, commit }) => {
  if (state.user.id) return
  const data = await getCurrentUser()

  commit('setCurrentUser', data.data.data)
}

export default {
  showToast,
  showError,
  showSuccess,
  getUser
}
