<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Задача {{ $route.params.id }}</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn v-show="!edit" color="primary" @click="edit = true">
        <v-icon class="mr-2">mdi-pencil</v-icon>
        Редактировать
      </v-btn>
      <v-btn v-show="edit" class="mr-2" color="" @click="edit = false">
        Отмена
      </v-btn>
      <v-btn v-show="edit" color="primary" @click="save()">
        <v-icon v-show="loading" class="mr-2">mdi-loading mdi-spin</v-icon>
        Сохранить
      </v-btn>
    </div>
    <v-card v-show="!edit">
      <v-card-text>
        <v-row>
          <v-col cols="6">
            Наименование:
          </v-col>
          <v-col cols="6">
            {{ task.title }}
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            Исполнитель:
          </v-col>
          <v-col v-if="task.watcher" cols="6">
            {{ task.watcher.email }}
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            Тип задачи:
          </v-col>
          <v-col cols="6">
            {{ task.type_code }}
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            Описание:
          </v-col>
          <v-col cols="6">
            {{ task.description }}
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            Приоритет:
          </v-col>
          <v-col cols="6">
            {{ task.priority_code }}
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            Время окончания:
          </v-col>
          <v-col cols="6">
            {{ task.expired_at | formatDate('lll') }}
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            Статус:
          </v-col>
          <v-col cols="6">
            {{ task.status_code }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-show="edit">
      <v-card-text>

        <v-row>
          <v-col cols="6">
            Наименование:
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="task.title" placeholder="Наименование"></v-text-field>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            Исполнитель:
          </v-col>
          <v-col cols="6">
            <v-autocomplete
              v-model="task.watched_by"
              :items="teamUsers"
              item-value="id"
              item-text="email"
              placeholder="Исполнитель"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            Тип задачи:
          </v-col>
          <v-col cols="6">
            <v-autocomplete v-model="task.type_code" :items="taskTypes" placeholder="Тип задачи"></v-autocomplete>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            Описание:
          </v-col>
          <v-col cols="6">
            <v-textarea v-model="task.description" placeholder="Описание задачи"></v-textarea>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            Приоритет:
          </v-col>
          <v-col cols="6">
            <v-autocomplete
              v-model="task.priority_code"
              :items="taskPriorities"
              placeholder="Приоритет задачи"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            Крайний срок:
          </v-col>
          <v-col cols="6">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Крайний срок"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="date"
                min="1950-01-01"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            Статус:
          </v-col>
          <v-col cols="6">
            <v-autocomplete
              v-model="task.status_code"
              :items="taskStatuses"
              placeholder="Приоритет задачи"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <Chat class="mt-4" :messages="taskMessages" :user="user" @send-message="sendMessage"></Chat>
    
    <v-card class="mt-4">
      <v-card-title>
        Активность
      </v-card-title>
      <v-card-text>
        <v-col v-for="(log, idx) in taskActivity" :key="idx">
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

  </div>
</template>
<script>
import { getTask, getTaskActivity, sendTaskMessage, updateTask } from '@/configs/api'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  components: {
    Chat: () => import('@/components/common/Chat')
  },
  data: () => ({
    date: null,
    menu: false,
    edit: false,
    loading: false,
    task: {
      id: null
    },
    taskActivity: [],
    breadcrumbs: [],
    chatInterval: null,
    chatUpdateTime: 2000
  }),
  computed: {
    ...mapState('app', [
      'user'
    ]),
    ...mapState('tenders', [
      'teamUsers'
    ]),
    ...mapState('deals', [
      'taskTypes',
      'taskPriorities',
      'taskStatuses',
      'taskMessages'
    ])
  },
  async mounted() {
    await this.$store.dispatch('app/getUser')
    await this.$store.dispatch('deals/spreadEntities')
    await this.$store.dispatch('tenders/getTeamUsers')
    this.chatInterval = setInterval(async () => {
      await this.$store.dispatch('deals/getMessagesForTask', { teamID: this.user.team_id, taskID:this.$route.params.id })
    }, this.chatUpdateTime)
    this.task = (await getTask(this.user.team_id, this.$route.params.id)).data.data
    this.taskActivity = (await getTaskActivity(this.user.team_id, this.$route.params.id)).data.data

  },
  beforeDestroy() {
    clearInterval(this.chatInterval)
  },
  methods: {
    async save() {
      this.loading = true
      if (this.date) {
        this.task.expired_at = moment(this.date, 'YYYY-MM-DD HH:mm:ss').tz('Europe/Moscow').format()
      }
      //@TODO это ебаный костыль! Антон, блять, поправь статусы ))
      this.task.status = this.task.status_code
      await updateTask(this.user.team_id, this.$route.params.id, this.task)
      this.edit = false
      this.loading = true
    },
    getKeyValuePairs(obj) {
      const arr = []

      for (const [key, value] of Object.entries(obj)) {
        arr.push({ key: key, value: value })
      }

      return arr
    },
    async sendMessage(message) {
      await sendTaskMessage(this.user.team_id, this.$route.params.id, { message })
    }
  }
}
</script>