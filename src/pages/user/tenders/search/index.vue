<template>
  <v-container fluid>
    <SearchFilter v-show="!showResults" @search="showSearchResults($event)"></SearchFilter>
    <SearchListView
      v-show="showResults"
      :tenders="tenders"
      :meta.sync="meta"
      :loading.sync="loading"
      @pageChange="showSearchResults"
      @back="returnBackToFilters()"
    ></SearchListView>
  </v-container>
</template>

<script>
import SearchFilter from '@/pages/user/tenders/search/filter'
import SearchListView from '@/pages/user/tenders/search/listView'
import { getTendersList } from '@/pages/user/tenders/search/api'

export default {
  components: {
    SearchFilter,
    SearchListView
  },
  data() {
    return {
      filters: null,
      showResults: false,
      loading: false,
      tenders: [],
      meta: {
        pagination: {
          total: 0,
          total_pages: 0,
          current_page: 1
        }
      }
    }
  },
  methods: {
    async showSearchResults(searchObj) {
      this.loading = true
      if (!this.filters || searchObj) {
        this.filters = searchObj
      }
      const rsp = await getTendersList(this.filters, this.meta.pagination.current_page)

      this.tenders = rsp.data.data
      this.meta = rsp.data.meta
      this.showResults = true
      this.loading = false
    },
    returnBackToFilters() {
      this.showResults = false
      this.resetPagination()
      this.filters = null
      console.info({ sh: this.showResults, cp: this.meta.pagination, fil: this.filters })
    },
    resetPagination() {
      this.meta.pagination.current_page = 1
      this.meta.pagination.total_pages = 0
      this.meta.pagination.total = 0
    }
  }
}
</script>