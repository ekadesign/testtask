export default {
  setTenders: (state, tenders) => {
    state.tenders = tenders
  },
  setTeamUsers: (state, teamUsers) => {
    state.teamUsers = teamUsers
  },
  setActiveTender: (state, tender) => {
    state.activeTender = tender
  },
  setMeta: (state, meta) => {
    state.meta = meta
  },
  setMetaCurrentPage: (state,page) => {
    state.meta.pagination.current_page = page
  },
  setBookmarkIDs: (state, bookmarkIDs) => {
    state.bookmarkIDs = bookmarkIDs
  },
  setBookmarks: (state, bookmarks) => {
    state.bookmarks = bookmarks
  },
  removeBookmark: (state, id) => {
    state.bookmarks.splice(state.bookmarks.findIndex((b) => b.id === id), 1)
  },
  addBookmarkID: (state, id) => {
    if (!state.bookmarkIDs.includes(id)) {
      state.bookmarkIDs.push(id)
    }
  },
  removeBookmarkID: (state, id) => {
    state.bookmarkIDs.splice(state.bookmarkIDs.findIndex((b) => b === id), 1)
  }
}
