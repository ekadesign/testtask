<template>
  <v-card
    :search="search"
    class="mb-1"
    depressed
    hover
    @click="fill(id)"
  >
    <div class="font-weight-black pl-1">
      {{ search.title }}
    </div>
    <v-card-actions class="justify-space-between">
      <div>
        <BookedSearchedButton
          v-for="(value, key) in search.searchButtonsStatus"
          :key="search.id + key"
          :button-type="value"
          :object-key="key"
        ></BookedSearchedButton>
      </div>
      <BookedSearchMenu
        @historySearch="historySearch($event)"
        @historyChanges="historyChanges($event)"
        @dialogActivation="dialogActivation($event)"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import BookedSearchedButton from '@/pages/owner/dashboard/BookedSearchButton.vue'
import BookedSearchMenu from '@/pages/owner/dashboard/BookedSearchMenu.vue'

export default {
  components: {
    BookedSearchedButton,
    BookedSearchMenu
  },
  props: {
    search: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    fill() {
      this.$emit('fill', this.id)
    },
    historySearch(emit) {
      this.$emit(emit, this.id)
    },
    historyChanges(emit) {
      this.$emit(emit, this.id)
    },
    renameTemplate(emit) {
      this.$emit(emit, this.id)
    },
    dialogActivation({ emit, type }) {
      this.$emit(emit, { id: this.id, type })
    }
  }
}
</script>
