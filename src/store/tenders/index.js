import actions from './actions'
import mutations from './mutations'
import getters from './getters'
// state initial values
const state = {
  tenders: [],
  bookmarkIDs: [],
  bookmarks: [],
  teamUsers: [],
  meta: {
    pagination: {
      total: 0,
      total_pages: 0,
      current_page: 1
    }
  },
  activeTender: {
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
    'events': [
    ]
  }

}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
