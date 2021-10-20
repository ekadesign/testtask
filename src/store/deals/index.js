import actions from './actions'
import mutations from './mutations'
import getters from './getters'
// state initial values
const state = {
  taskMessages: [],
  dealMessages: [],
  ways:[],
  states:[],
  types: [],
  limits: [],
  etp: [],
  regions: [],
  projectReasons:[],
  projectStatutes: [],
  taskStatuses: [],
  taskPriorities: [],
  taskTypes: [],
  tasks: []
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
