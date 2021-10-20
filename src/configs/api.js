const API_URL = 'http://localhost:8000/api/v1'
import axios from 'axios'
// notifications
export const getNotifications = async (userID) => axios.get(API_URL + `/users/${userID}/notifications`)

export const markAllAsRead = async (userID) => axios.post(API_URL + `/users/${userID}/notifications/read`)

export const markAsRead = async (userID, notificationID) => axios.post(API_URL + `/users/${userID}/notifications/${notificationID}/read`)

//admin registrations

export const getRegistrationsList = async () => {
  const users = (await axios.get(API_URL + '/registrations')).data.data.map((u) => {
    u.statusDirty = u.status

    return u
  })

  return users
}

export const verifyUser = async (status, user) => {
  const verifyStatuses = ['approve', 'reject']

  if (!verifyStatuses.includes(status)) return

  return axios.post(API_URL + `/registrations/${user.id}/${status}`)
}

//admin tenders search

export const getOKPDsList = async (search) => axios.get(API_URL + `/okpd2?filter[code]=${search}`)

export const getFieldData = async () => axios.get(API_URL + '/orders/entities')

export const getMembersList = async (search) => axios.get(API_URL + `/organisations?filter[full_name]=${search}`)

export const getParticipantsList = async (search) => axios.get(API_URL + `/participants?filter[full_name]=${search}`)

export const getTendersList = async (payload, page) => axios.post(API_URL + `/orders/search?page=${page}`, transformPayload(payload))

export const getTender = async (id) => axios.get(API_URL + `/orders/${id}?include=region,organisation,etp,placing_way,state,attachments,events`)

const transformPayload = (payload) => {
  const relations = ['region', 'organisation', 'etp', 'placing_way', 'state', 'attachments', 'events'].join(',')

  for (const item in payload.filter) {
    if (Array.isArray(payload.filter[item])) {
      payload.filter[item] = payload.filter[item].join(',')
    }
  }

  payload.include = relations

  return payload

}

//users

export const getUsersList = async () => {

  const users = (await axios.get(API_URL + '/users?include=role,team')).data.data.map((u) => {
    u.statusDirty = u.status

    return u
  })

  return users
}

//entities

export const getEntities = async () => axios.get(API_URL + '/entities?include=order_ways,order_states,order_types,order_limits,etp,regions,project_reasons,project_statuses,task_statuses,task_priorities,task_types')

//common auth

export const register = async (payload) => axios.post(API_URL + '/auth/register', payload)

export const login = async (payload) => axios.post(API_URL + '/auth/login', payload)

//deals

export const getProjectsList = (teamID, status) => {
  let str = `/teams/${teamID}/projects?include=order`

  if (status) {
    str += `&filter[status_code]=${status}`
  }

  return axios.get(API_URL + str)
}

export const getProject = (teamID, tenderID) => axios.get(API_URL + `/teams/${teamID}/projects/${tenderID}?include=order,watcher,cowatcher,tasks.watcher`)

export const storeProject = (teamID, tenderID, payload) => axios.post(API_URL + `/teams/${teamID}/projects/${tenderID}`, payload)

export const takeTenderToWork = (payload) => axios.post(API_URL + `/teams/${payload.teamID}/projects/${payload.tenderID}`, payload)

//teams

export const getTeamUser = async (teamID, userID) => axios.get(API_URL + `/teams/${teamID}/users/${userID}?include=permissions`)

export const updateTeamUser = async (teamID, userID, payload) => axios.patch(API_URL + `/teams/${teamID}/users/${userID}?include=permissions`, payload)

export const getOrganizationsList = async (teamID) => {

  const users = (await axios.get(API_URL + `/teams/${teamID}?include=children`)).data

  return users
}

export const createTeam = async (payload) => axios.post(API_URL + '/teams', payload)

export const getPermissionList = async () => axios.get(API_URL + '/permissions/team')

export const inviteNewUser = async (teamID, payload) => axios.post(API_URL + `/teams/${teamID}/users`, payload)

export const getTeamUsersList = async (teamID, limit) => {
  let str = `/teams/${teamID}/users`

  if (limit) {
    str += '?limit=-1'
  }

  return axios.get(API_URL + str)
}

export const blockUnblockUser = async (teamID, userID, payload) => axios.patch(API_URL + `/teams/${teamID}/users/${userID}`, payload)

//searches

export const getSavedSearches = async (userID) => axios.get(API_URL + `/users/${userID}/searches`)

export const storeSearch = async (userID, name, payload) => axios.post(API_URL + `/users/${userID}/searches`, {
  name: name,
  search: payload
})

export const updateSearch = async (userID, searchID, name, payload) => axios.put(API_URL + `/users/${userID}/searches/${searchID}`, {
  name: name,
  search: payload
})

export const deleteSearch = async (userID, id) => axios.delete(API_URL + `/users/${userID}/searches/${id}`)

export const getCurrentUser = async () => axios.get(API_URL + '/auth/me?include=role')

//bookmarks

export const getBookmarks = async (userID) => axios.get(API_URL + `/users/${userID}/bookmarks?limit=-1&include=project.order,region,organisation,placing_way`)

export const storeBookmark = async (userID, orderID) => axios.post(API_URL + `/users/${userID}/bookmarks/${orderID}`)

export const removeBookmark = async (userID, orderID) => axios.delete(API_URL + `/users/${userID}/bookmarks/${orderID}`)

export const getTasks = async (teamID, projectID, limit) => {
  let str = `/teams/${teamID}/tasks?include=watcher,project.order`

  if (projectID) {
    str += `&filter[project_id]=${projectID}`
  }
  if (limit) {
    str += '&limit=-1'
  }

  return axios.get(API_URL + str)
}

export const getTask = async (teamID,taskID) => axios.get(API_URL + `/teams/${teamID}/tasks/${taskID}?include=watcher`)

export const getTaskMessages = async (teamID,taskID) => axios.get(API_URL + `/teams/${teamID}/tasks/${taskID}/messages?include=author`)

export const getDealMessages = async (teamID,orderID) => axios.get(API_URL + `/teams/${teamID}/projects/${orderID}/messages?include=author`)

export const sendTaskMessage = async (teamID,taskID, payload) => axios.post(API_URL + `/teams/${teamID}/tasks/${taskID}/messages`, payload)

export const sendDealMessage = async (teamID,orderID, payload) => axios.post(API_URL + `/teams/${teamID}/projects/${orderID}/messages`, payload)

export const getTaskActivity = async (teamID,taskID) => axios.get(API_URL + `/teams/${teamID}/tasks/${taskID}/activities?limit=-1&include=author`)

export const getDealActivity = async (teamID,orderID) => axios.get(API_URL + `/teams/${teamID}/projects/${orderID}/activities?limit=-1&include=author`)

export const updateTask = async (teamID,taskID, payload) => axios.put(API_URL + `/teams/${teamID}/tasks/${taskID}?include=watcher`, payload)

export const storeTask = async (teamID, payload) => axios.post(API_URL + `/teams/${teamID}/tasks?limit=-1`, payload)

export const updatePassword = async (payload) => axios.post(API_URL + '/auth/password/reset', payload)
