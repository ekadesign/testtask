export default {
  setWays: (state, item) => state.ways = item,
  setStates:(state, item) => state.states = item,
  setTypes: (state, item) => state.types = item,
  setLimits: (state, item) => state.limits = item,
  setEtp: (state, item) => state.etp = item,
  setRegions: (state, item) => state.regions = item,
  setProjectReasons:(state, item) => state.projectReasons = item,
  setProjectStatutes: (state, item) => state.projectStatutes = item,
  setTaskStatuses: (state, item) => state.taskStatuses = item,
  setTaskPriorities: (state, item) => state.taskPriorities = item,
  setTaskMessages: (state, item) => state.taskMessages = item,
  setDealMessages: (state, item) => state.dealMessages = item,
  setTaskTypes:(state, item) => state.taskTypes = item,
  setTasks: (state, tasks) => state.tasks = tasks
}
