<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Сделки</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <!--      <v-btn color="primary">-->
      <!--        Create User-->
      <!--      </v-btn>-->
    </div>

    <v-card>

      <v-card-text>
        <v-row class="d-flex justify-space-around mb-4">
          <v-btn
            v-for="(status, idx) in statuses"
            :key="idx"
            :disabled="status.isActive"
            large
            @click="filterDeals(status.value)"
          >{{ status.text }}
          </v-btn>
        </v-row>

        <v-data-table
          :headers="headers"
          :items="deals"
          :loading="loading"
          class="flex-grow-1"
        >

          <template v-slot:item.id="{ item }">
            <div class="font-weight-bold"># {{ item.id }}</div>
          </template>

          <template v-slot:item.order.subject="{ item }">
            <div>{{ item.order.subject }}</div>
          </template>

          <template v-slot:item.bet="{ item }">
            <div>{{ item.bet || 0 }}</div>
          </template>

          <template v-slot:item.order.start_at="{ item }">
            <div>{{ item.order.start_at | formatDate('lll') }}</div>
          </template>

          <template v-slot:item.order.end_at="{ item }">
            <div>{{ item.order.end_at | formatDate('lll') }}</div>
          </template>

          <template v-slot:item.action="{ item }">
            <div class="actions">
              <v-btn icon :to="`/owner/deals/${item.order.id}`" target="_blank">
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { getEntities, getProjectsList } from '@/configs/api'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      breadcrumbs: [{
        text: 'Сделки',
        disabled: false,
        href: '/deals'
      }, {
        text: 'Список'
      }],

      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Название', align: 'left', value: 'order.subject' },
        { text: 'Сумма', align: 'left', value: 'bet' },
        { text: 'Начало', value: 'order.start_at' },
        { text: 'Окончание', value: 'order.end_at' },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ],
      deals: [],
      statuses: []
    }
  },
  computed: {
    ...mapState('app', [
      'user'
    ])
  },
  async mounted() {
    this.loading = true
    try {

      await this.$store.dispatch('app/getUser')
      const deals = await getProjectsList(this.user.team_id)

      const entities = (await getEntities()).data.data

      this.statuses = [{ text: 'Все', value: '', isActive: true }].concat(entities.project_statuses.map((item) => {
        item.isActive = false

        return item
      }))

      this.deals = deals.data.data

    } catch (err) {
      console.info(err)
    } finally {
      this.loading = false
    }
  },
  methods: {
    async filterDeals(status) {
      const deals = await getProjectsList(this.user.team_id, status)

      this.deals = deals.data.data
      this.statuses = this.statuses.map((item) => {
        if (item.value === status) {
          item.isActive = true
        } else {
          item.isActive = false
        }

        return item
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
