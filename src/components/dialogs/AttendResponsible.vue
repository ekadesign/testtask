<template>
  <v-dialog
    v-model="show"
    persistent
    width="600px"
    @click:outside="show = false"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Назначить исполнителя</span>
      </v-card-title>
      <v-card-text class="py-0 my-0">
        <v-container class="pa-0 ma-0">
          <v-autocomplete
            v-model="watchedBy"
            :items="teamUsers"
            item-text="email"
            item-value="id"
            placeholder="Выберите исполнителя"
          ></v-autocomplete>
          <v-autocomplete
            v-model="cowatchedBy"
            :items="teamUsers"
            item-text="email"
            item-value="id"
            placeholder="Назначить соисполнителей"
          ></v-autocomplete>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          depressed
          large
          class="primary"
          @click="makeDeal()"
        >
          Участвуем
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['visible'],
  data: () => ({
    watchedBy: null,
    cowatchedBy: null
  }),
  computed: {
    ...mapState('tenders',['teamUsers']),
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    makeDeal() {
      if ( !this.watchedBy) {
        this.$notify({
          type: 'error',
          title: 'Ошибка!',
          text: 'Вы не назначили исполнителя'
        })

        return
      }
      const payload = { watchedBy: this.watchedBy }

      if (this.cowatchedBy.length) {
        payload.cowatchedBy = this.cowatchedBy
      }

      this.$emit('makeDeal', payload)
    }
  }
}
</script>