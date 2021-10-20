import {
  getBookmarks,
  getProjectsList,
  getTeamUsersList, getTender,
  getTendersList,
  removeBookmark,
  storeBookmark
} from '@/configs/api'
import store from '@/store'

const getTeamUsers = async ({ state, commit }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const teamUsers =  await getTeamUsersList(user.team_id, { limit: '-1' })

  commit('setTeamUsers', teamUsers.data.data)
}

const getTenders = async ({ state, commit }, { filters, metaData }) => {
  const rsp = await getTendersList(filters, metaData.pagination.current_page)
  const user = JSON.parse(localStorage.getItem('user'))
  const deals = (await getProjectsList(user.team_id)).data.data

  const tenders = rsp.data.data.map((t) => {
    t.isInWork = false
    t.status = null
    deals.forEach((d) => {
      if (d.order_number === t.id) {
        t.isInWork = true
        t.status = d.status_code
      }
    })

    return t
  })
  const { meta } = rsp.data

  commit('setTenders', tenders)
  commit('setMeta', meta)
}
const getActiveTender = async ({ state, commit }, id) => {
  const tender = (await getTender(id)).data.data

  commit('setActiveTender', tender)
}

const getBookmarkIDs = async ({ state, commit }) => {
  const bookmarks = (await getBookmarks(store.state.app.user.id)).data.data

  commit('setBookmarkIDs', bookmarks.map((b) => b.id))
}

const getUserBookmarks = async ({ state, commit }) => {
  const bookmarks = (await getBookmarks(store.state.app.user.id)).data.data

  commit('setBookmarks', bookmarks)
}

const getBookmarked = async ({ state,commit }) => {
  const tenders = state.tenders.map((t) => {
    if (state.bookmarkIDs.includes(t.id)) {
      t.bookmarked = true

      return t
    }
    t.bookmarked = false

    return t
  })

  commit('setTenders', tenders)
}

const changeBookmarked = async ({ state, commit }, orderID) => {
  if (!state.bookmarkIDs.includes( orderID)) {
    await storeBookmark(store.state.app.user.id, orderID)
    commit('addBookmarkID', orderID)
  } else {
    await removeBookmark(store.state.app.user.id, orderID)
    commit('removeBookmarkID', orderID)
  }
  await getBookmarked({ state, commit })
}

const resetActiveTenderToDefault = ({ state, commit }) => {
  commit('setActiveTender', {
    'id': '',
    'subject': '',
    'state_id': '',
    'max_price': '',
    'organisation_number': '',
    'href': '',
    'etp_code': '',
    'placing_way_code': '',
    'start_at': '',
    'end_at': '',
    'modification_at': '',
    'published_at': '',
    'region_id': 0,
    'abandoned_reason_id': 0,
    'is_smp': false,
    'etp': {
      'code': '',
      'short_name': '',
      'full_name': '',
      'description': '',
      'phone': '',
      'address': '',
      'email': '',
      'inn': '',
      'kpp': '',
      'actual': true
    },
    'organisation': {
      'id': '',
      'short_name': '',
      'full_name': '',
      'inn': '',
      'kpp': '',
      'actual': true,
      'fact_address': '',
      'post_address': '',
      'registration_at': ''
    },
    'placing_way': {
      'code': '',
      'name': '',
      'type': '',
      'type_name': '-',
      'subsystem_type': '',
      'subsystem_name': ''
    },
    'region': {
      'id': 0,
      'name': ''
    },
    'attachments': [],
    'state': {
      'id': '',
      'name': ''
    },
    'events': []
  })
}

const dropBookmark = async  ({ state, commit }, orderID) => {
  await removeBookmark(store.state.app.user.id, orderID)
  commit('removeBookmark', orderID)
}

export default {
  getTenders,
  getTeamUsers,
  getActiveTender,
  getBookmarked,
  getUserBookmarks,
  getBookmarkIDs,
  changeBookmarked,
  dropBookmark,
  resetActiveTenderToDefault
}
