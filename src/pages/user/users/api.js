import { API_URL } from '@/configs/api'
import axios from 'axios'

export const getUsersList = async () => {

  const users = (await axios.get(API_URL + '/users?include=role,team')).data.data.map((u) => {
    u.statusDirty = u.status

    return u
  })

  return users
}