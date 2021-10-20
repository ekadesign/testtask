<template>
  <v-card dense outlined>
    <v-card-title>Задачи</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="tasks"
      >
        <template v-slot:item.id="{ item }">
          <div class="font-weight-bold">
            # {{ item.id }}
          </div>
        </template>
        <template v-slot:item.title="{ item }">
          <div class="font-weight-bold">
            {{ item.title }}
          </div>
        </template>
        <template v-slot:item.status="{ item }">
          <div class="font-weight-bold">
            {{ item.status_code }}
          </div>
        </template>
        <template v-slot:item.priority_code="{ item }">
          <div class="font-weight-bold">
            {{ item.priority_code }}
          </div>
        </template>
        <template v-slot:item.watched_by="{ item }">
          <div class="font-weight-bold">
            {{ item.watcher.email }}
          </div>
        </template>
        <template v-slot:item.expired_at="{ item }">
          <div class="font-weight-bold">
            {{ item.expired_at | formatDate('lll') }}
          </div>
        </template>
        <template v-slot:item.actions="{item}">
          <div class="actions">
            <v-btn icon :to="formTaskLink(item)" target="_blank">
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    headers: [
      { text: 'id', value: 'id' },
      { text: 'Название', value: 'title' },
      { text: 'Статус', value: 'status' },
      { text: 'Приоритет', value: 'priority_code' },
      { text: 'Исполнитель', value: 'watched_by' },
      { text: 'Срок', value: 'expired_at' },
      { text: '', value: 'actions' }
    ]
  }),
  computed: {
    ...mapState('deals',[
      'tasks'
    ])
  },
  methods: {
    formTaskLink(item) {
      return `/owner/tasks/${item.id}`
    }
  }
}
</script>