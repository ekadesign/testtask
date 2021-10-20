<template>
  <v-container fluid>
    <SearchFilter v-show="!showResults" @search="showSearchResults($event)"></SearchFilter>
    <SearchListView
      v-show="showResults"
      :loading.sync="loading"
      @pageChange="showSearchResults"
      @back="returnBackToFilters()"
    ></SearchListView>
  </v-container>
</template>

<script>
import SearchFilter from '@/pages/owner/tenders/search/filter'
import SearchListView from '@/pages/owner/tenders/search/listView'
import { mapState } from 'vuex'
import { getBookmarks, getTeamUsersList } from '@/configs/api'

export default {
  computed: {
    ...mapState('tenders', ['meta', 'teamUsers']),
    ...mapState('app', ['user'])
  },
  components: {
    SearchFilter,
    SearchListView
  },
  data() {
    return {
      filters: null,
      showResults: false,
      loading: false
    }
  },
  methods: {
    async showSearchResults(searchObj) {
      this.loading = true
      if (!this.filters || searchObj) {
        this.filters = searchObj
      }
      await this.$store.dispatch('tenders/getTenders', { filters: this.filters, metaData: this.meta })
      await this.$store.dispatch('tenders/getTeamUsers', {})

      await this.$store.dispatch('tenders/getBookmarked')

      this.showResults = true
      this.loading = false
    },
    returnBackToFilters() {
      this.showResults = false
      this.resetPagination()
      this.filters = null
    },
    resetPagination() {
      this.meta.pagination.current_page = 1
      this.meta.pagination.total_pages = 0
      this.meta.pagination.total = 0
    }
  }
}
</script>