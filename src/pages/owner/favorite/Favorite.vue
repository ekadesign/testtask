<template>
  <v-col cols="12">
    <div class="d-flex flex-column flex-grow-1">
      <div class="d-flex align-center py-3">
        <div>
          <div class="display-1">Избранные тендеры</div>
        </div>
        <v-spacer></v-spacer>
      </div>

      <v-card>
        <v-data-table
          :headers="headers"
          :items="bookmarks"
          :loading="loading"
          no-results-text="Нет избранных тендеров"
          no-data-text="Нет избранных тендеров"
          class="flex-grow-1 row-pointer"
        >
          <template v-slot:item.region="{ item }">
            <div class="d-flex align-center py-1">
              <div class="ml-1 caption font-weight-bold">
                {{ item.region.name }}
              </div>
            </div>
          </template>

          <template v-slot:item.maxPrice="{ item }">
            <div class="d-flex align-center py-1">
              <div class="ml-1 caption font-weight-bold">
                {{ item.maxPrice }}
              </div>
            </div>
          </template>
          <template v-slot:item.organisation="{ item }">
            <div class="d-flex align-center py-1">
              <div class="ml-1 caption font-weight-bold">
                {{ item.organisation.short_name }}
              </div>
            </div>
          </template>
          <template v-slot:item.placing_way.neme="{ item }">
            <div class="d-flex align-center py-1">
              <div class="ml-1 caption font-weight-bold">
                {{ item.placing_way.name }}
              </div>
            </div>
          </template>
          <template v-slot:item.start="{ item }">
            <div class="d-flex align-center py-1">
              <div class="ml-1 caption font-weight-bold">
                {{ item.organisation.short_name }}
              </div>
            </div>
          </template>
          <template v-slot:item.end="{ item }">
            <div class="d-flex align-center py-1">
              <div class="ml-1 caption font-weight-bold">
                {{ item.organisation.short_name }}
              </div>
            </div>
          </template>
          <template v-slot:item.published="{ item }">
            <div class="d-flex align-center py-1">
              <div class="ml-1 caption font-weight-bold">
                {{ item.published }}
              </div>
            </div>
          </template>
          <template v-slot:item.modified="{ item }">
            <div class="d-flex align-center py-1">
              <div class="ml-1 caption font-weight-bold">
                {{ item.modified }}
              </div>
            </div>
          </template>

          <template v-slot:item.role="{ item }">
            <v-chip
              label
              small
              class="font-weight-bold"
              :color="item.role === 'ADMIN' ? 'primary' : undefined"
            >{{ item.role | capitalize }}</v-chip>
          </template>

          <template v-slot:item.start_at="{ item }">
            <div>{{ item.start_at | formatDate('lll') }}</div>
          </template>

          <template v-slot:item.end_at="{ item }">
            <div>{{ item.end_at | formatDate('lll') }}</div>
          </template>

          <template v-slot:item.published_at="{ item }">
            <div>{{ item.published_at | formatDate('lll') }}</div>
          </template>

          <template v-slot:item.modification_at="{ item }">
            <div>{{ item.modification_at | formatDate('lll') }}</div>
          </template>

          <template v-slot:item.action-watch="{item}">
            <div class="actions">
              <v-btn icon :to="`/owner/tenders/${item.id}`">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </div>
          </template>
          <template v-slot:item.action-to-work="{item}">
            <div class="actions">
              <v-btn icon @click="addToWork(item)">
                <v-icon>{{ item.project ? 'mdi-check': 'mdi-briefcase-plus' }}</v-icon>
              </v-btn>
            </div>
          </template>
          <template v-slot:item.action-drop="{item}">
            <div class="actions">
              <v-btn icon @click="dropBookmark(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <AttendResponsible
      :visible="attendResponsibleModal"
      @makeDeal="makeDeal($event)"
      @close="attendResponsibleModal = false"
    ></AttendResponsible>
  </v-col>
</template>

<script>

import { mapState } from 'vuex'
import { takeTenderToWork } from '@/configs/api'
import AttendResponsible from '@/components/dialogs/AttendResponsible'

export default {
  components: {
    AttendResponsible
  },
  data() {
    return {
      attendResponsibleModal: false,
      loading: false,
      headers: [
        { text: 'Тема', value: 'subject' },
        { text: 'Регион', value: 'region.name' },
        { text: 'Цена', value: 'max_price' },
        { text: 'Организация', value: 'organisation.short_name' },
        { text: 'Тип тендера', value: 'placing_way.name' },
        { text: 'Начало', value: 'start_at' },
        { text: 'Конец', value: 'end_at' },
        { text: 'Опубликован', value: 'published_at' },
        { text: 'Обновлен', value: 'modification_at' },
        { text: '', sortable: false, align: 'right', value: 'action-watch' },
        { text: '', sortable: false, align: 'right', value: 'action-to-work' },
        { text: '', sortable: false, align: 'right', value: 'action-drop' }
      ]
    }
  },
  async mounted() {
    await this.$store.dispatch('app/getUser')
    await this.$store.dispatch('tenders/getUserBookmarks')
    await this.$store.dispatch('tenders/getTeamUsers', {})
  },
  computed: {
    ...mapState('app',[
      'user'
    ]),
    ...mapState('tenders', [
      'bookmarks',
      'activeTender'
    ]),
    ...mapState('tenders', ['teamUsers'])
  },
  methods: {
    dropBookmark(t) {
      this.$store.dispatch('tenders/dropBookmark', t.id)
    },
    async addToWork(t) {
      await this.$store.commit('tenders/setActiveTender', t)
      this.attendResponsibleModal = true
    },
    async makeDeal(modalData) {
      const payload = {
        teamID: this.user.team_id,
        tenderID: this.activeTender.id,
        status: 'waiting',
        watched_by: modalData.watchedBy,
        cowatched_by: modalData.cowatchedBy
      }

      try {

        await takeTenderToWork(payload)

        await this.$router.push('/owner/deals')

      } catch (err) {
        console.info(err)
      } finally {
        this.attendResponsibleModal = false
      }
    }
  }
}
</script>
<style lang="css" scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
