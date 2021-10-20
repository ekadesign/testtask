import {
  getDealMessages,
  getEntities, getTaskMessages, getTasks
} from '@/configs/api'
import store from '@/store'

const spreadEntities = async ({ state, commit }) => {
  const entities = (await getEntities()).data.data

  commit('setWays', entities.order_ways)
  commit('setStates', entities.order_states)
  commit('setTypes', entities.order_types)
  commit('setLimits', entities.order_limits)
  commit('setEtp', entities.etp)
  commit('setRegions', entities.regions)
  commit('setProjectReasons', entities.project_reasons)
  commit('setProjectStatutes', entities.project_statuses)
  commit('setTaskStatuses', entities.task_statuses)
  commit('setTaskPriorities', entities.task_priorities)
  commit('setTaskTypes', entities.task_types)
}

const getAvailableTasks = async ({ state, commit }, params) => {
  const tasks = (await getTasks(params.teamID, params.projectID, params.limit)).data.data

  commit('setTasks', tasks)
}

const getMessagesForTask = async ({ state, commit }, params) => {
  const messages = (await getTaskMessages(params.teamID, params.taskID)).data.data

  commit('setTaskMessages', messages)

}

const getMessagesForDeal = async ({ state, commit }, params) => {
  const messages = (await getDealMessages(params.teamID, params.orderID)).data.data

  commit('setDealMessages', messages)

}

export default {
  spreadEntities,
  getMessagesForTask,
  getMessagesForDeal,
  getAvailableTasks
}
