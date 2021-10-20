<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Сделка</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <!--      <v-btn color="primary">-->
      <!--        Create User-->
      <!--      </v-btn>-->
    </div>
    <v-row class="d-flex justify-space-around mb-4">
      <v-btn
        v-for="(status, idx) in projectStatutes"
        :key="idx"
        large
        :disabled="status.value === project.status_code"
        @click="changeProjectStatus(status.value)"
      >{{ status.text }}</v-btn>
    </v-row>
    <v-card>
      <v-tabs v-model="currentTab">
        <v-tab v-for="tab in tabs" :key="tab.id">{{ tab.text }}</v-tab>
        <v-tab v-if="project.bet" disabled> Минимальная сумма {{ project.bet }} Р</v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab">
        <v-tab-item :value="0">
          <v-card dense outlined>
            <v-card-title>
              <v-row>
                <v-col>Сведения о закупке {{ $route.params.id }} <a :href="activeTender.href" target="_blank">ЕИС</a></v-col>
                <v-col align="right">

                  <v-menu
                    offset-y
                  >
                    <template v-slot:activator="{ attrs, on }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-menu
                      </v-icon>
                    </template>

                    <v-list>
                      <v-list-item
                        v-for="(item,idx) in menu"
                        :key="idx"
                        link
                        @click="callMethod(item.method)"
                      >
                        <v-icon class="mr-2">{{ item.icon }}</v-icon>
                        <v-list-item-title v-text="item.title"></v-list-item-title>

                      </v-list-item>
                    </v-list>
                  </v-menu>
                  
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>

              <v-row>
                <v-col cols="6">
                  Наименование:
                </v-col>
                <v-col cols="6">
                  {{ activeTender.subject }}
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="6">
                  Способ проведения:
                </v-col>
                <v-col cols="6">
                  {{ activeTender.placing_way.name }}
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="6">
                  Заказчик:
                </v-col>
                <v-col cols="6">
                  {{ activeTender.organisation.short_name }}
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="6">
                  Начальная стоимость:
                </v-col>
                <v-col cols="6">
                  {{ activeTender.max_price }}
                  <v-icon color="grey" size="14">mdi-currency-rub</v-icon>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="6">
                  Статус:
                </v-col>
                <v-col cols="6">
                  {{ activeTender.state.name }}
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card dense outlined>
            <v-card-title>
              Сведения о сроках
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  Публикация извещения:
                </v-col>
                <v-col cols="6">
                  {{ activeTender.published_at | formatDate('lll') }}
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="6">
                  Окончание сбора заявок:
                </v-col>
                <v-col cols="6">
                  {{ activeTender.end_at | formatDate('lll') }}
                </v-col>
              </v-row>
              <!-- //@TODO add other dates -->
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item :value="1">
          <v-card dense outlined>
            <v-card-text>
              <div v-if="activeTender.events.length">
                <div
                  v-for="(ev, index) in activeTender.events"
                  :key="index"
                >
                  <div
                    v-for="(attachment, index) in ev.attachments"
                    :key="index"
                    class="my-2"
                  >
                    <v-icon class="mr-1">mdi-file-word</v-icon>
                    <a :href="attachment.href">{{ ev.name }}</a>
                  </div>
                </div>
              </div>
              <div v-if="activeTender.attachments.length">
                <div
                  v-for="attachment in activeTender.attachments"
                  :key="attachment.id"
                  class="my-2"
                >
                  <v-icon class="mr-1">mdi-file-word</v-icon>
                  <a :href="attachment.href">{{ attachment.name }}</a>
                </div>
              </div>
              <div v-else>
                <h3 class="text-center mt-4">
                  Документация по закупке отсутствует
                </h3>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item :value="2">
          <div v-if="activeTender.events.length">
            <v-card dense outlined>
              <v-card-title>Журнал событий</v-card-title>
              <v-card-text>
                <div
                  v-for="(ev, index) in activeTender.events"
                  :key="index"
                >
                  <div>
                    {{ ev.name }} |
                    {{ ev.published_at | formatDate('lll') }}
                  </div>
                  <v-divider></v-divider>
                </div>
              </v-card-text>
            </v-card>
          </div>
          <h3 v-if="!activeTender.events.length" class="text-center mt-4">События отсутствуют</h3>
        </v-tab-item>
        <v-tab-item :value="3">
          <v-card dense outlined>
            <v-card-title>Протоколы</v-card-title>
            <v-card-text>
              Протоколы отсутствуют
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item :value="4">
          <TaskTable></TaskTable>
        </v-tab-item>
        <v-tab-item :value="6">
          <Chat :messages="dealMessages" :user="user" @send-message="sendMessage"></Chat>
        </v-tab-item>
        <v-tab-item :value="7">
          <v-card class="mt-4">
            <v-card-title>
              Активность
            </v-card-title>
            <v-card-text>
              <v-col v-for="(log, idx) in dealActivity" :key="idx">
                <v-row>
                  <v-col cols="6">
                    <p>Событие: {{ log.event }}</p>
                    <p>Автор: {{ log.author.email }}</p>
                    <p>Дата: {{ log.created_at | formatDate('lll') }}</p>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="6">
                    Данные:
                    <v-row v-for="(data,index) in getKeyValuePairs(log.new)" :key="index">
                      <v-col cols="6" class="py-0">
                        <span class="mr-2">{{ data.key }}</span>
                      </v-col>
                      <v-col cols="6" class="py-0">
                        <span>{{ data.value }}</span>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-col>
                  <v-divider></v-divider>
                </v-col>
              </v-col>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <CreateTaskModal :project="project" :show="show" @cancel="show=false" @save="createTask($event)"></CreateTaskModal>
    <AddSumModal :project="project" :show="sumModalShow" @cancel="sumModalShow=false" @save="addSum($event)"></AddSumModal>
  </div>
</template>
<script>
import {
  getDealActivity,
  getProject,
  getTaskActivity,
  getTender,
  sendDealMessage,
  storeProject,
  storeTask
} from '@/configs/api'
import { mapState } from 'vuex'
import CreateTaskModal from '@/pages/owner/deals/view/CreateTaskModal'
import TaskTable from '@/pages/owner/deals/view/TaskTable'
import AddSumModal from '@/pages/owner/deals/view/AddSumModal'
import Chat from '@/components/common/Chat'

export default {
  components: {
    CreateTaskModal, TaskTable, AddSumModal,
    Chat
  },
  data: () => ({
    dealActivity: [],
    show: false,
    sumModalShow: false,
    project: {
      watcher: {},
      cowatcher: {}
    },
    currentTab: 0,
    activeTender: {
      subject: '',
      name: '',
      placing_way:{ name: '' },
      organisation: { short_name: '' },
      state: { name: '' },
      events: [],
      attachments: []
    },
    breadcrumbs: [{
      text: 'Сделки',
      disabled: false,
      href: '/owner/deals'
    }, {
      text: null
    }],
    tabs: [
      { id: 1, text: 'Информация' },
      { id: 2, text: 'Документация' },
      { id: 3, text: 'События' },
      { id: 4, text: 'Протоколы' },
      { id: 5, text: 'Задачи' },
      { id: 6, text: 'БГ' },
      { id: 7, text: 'Чат' },
      { id: 8, text: 'Активность' }
    ],
    menu: [
      {
        title: 'Установить метку',
        icon: 'mdi-tag',
        method: ''
      },
      {
        title: 'Привязать компанию',
        icon: 'mdi-briefcase-plus',
        method: ''
      },
      {
        title: 'Установить сумму',
        icon: 'mdi-cash-100',
        method:'callAddSumModal'
      },
      {
        title: 'Создать задачу',
        icon: 'mdi-folder-plus-outline',
        method: 'callCreateTaskModal'
      }
    ],
    chatInterval: null,
    chatUpdateTime: 2000
  }),
  beforeDestroy() {
    clearInterval(this.chatInterval)
  },
  computed: {
    ...mapState('app',[
      'user'
    ]),
    ...mapState('deals', [
      'projectStatutes',
      'dealMessages'
    ])

  },
  async mounted() {
    await this.$store.dispatch('app/getUser')
    const deal = await getProject(this.user.team_id, this.$route.params.id)

    this.project = deal.data.data
    this.breadcrumbs[1].text = 'Сделка ' + this.$route.params.id
    this.activeTender = (await getTender(this.$route.params.id)).data.data

    await this.$store.dispatch('deals/spreadEntities')
    await this.$store.dispatch('tenders/getTeamUsers')
    await this.$store.dispatch('deals/getAvailableTasks', { teamID: this.user.team_id, projectID: this.project.id })
    this.chatInterval = setInterval(async () => {
      await this.$store.dispatch('deals/getMessagesForDeal', { teamID: this.user.team_id, orderID:this.$route.params.id })
    }, this.chatUpdateTime)
    this.dealActivity = (await getDealActivity(this.user.team_id, this.$route.params.id)).data.data

  },
  methods: {
    async sendMessage(message) {
      await sendDealMessage(this.user.team_id, this.$route.params.id, { message })
    },

    callMethod(method) {
      if (!method) return
      this[method]()
    },
    callCreateTaskModal() {
      this.show = true
    },
    callAddSumModal() {
      this.sumModalShow = true
    },
    async createTask(payload) {

      await storeTask(this.user.team_id, payload)
      this.show = false
    },
    async changeProjectStatus(status) {
      if (confirm('Вы действительно хотите изменить статус сделки ? ')) {
        const project = (await storeProject(this.user.team_id, this.$route.params.id, { status: status })).data.data

        this.project = project
      }
    },
    async addSum(bet) {
      const payload = {}

      payload.bet = bet
      payload.status = this.project.status_code
      await storeProject(this.user.team_id, this.$route.params.id, payload)
      this.sumModalShow = false
    },
    getKeyValuePairs(obj) {
      const arr = []

      for (const [key, value] of Object.entries(obj)) {
        arr.push({ key: key, value: value })
      }

      return arr
    }
  }
}
//@TODO add chat to deals
</script>