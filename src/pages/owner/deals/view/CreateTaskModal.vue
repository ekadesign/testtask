<template>
  <v-dialog v-model="show" @input="cancel()">
    <v-card>
      <v-card-title>
        Добавить задачу
      </v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="type"
          :items="taskTypes"
          placeholder="Тип задачи"
        ></v-autocomplete>
        <v-text-field
          v-model="title"
          clearable
          prepend-inner-icon="mdi-border-color"
          placeholder="Название задачи"
        ></v-text-field>
        <v-textarea
          v-model="description"
          clearable
          placeholder="Описание задачи"
        ></v-textarea>
        <v-autocomplete
          v-model="priority"
          :items="taskPriorities"
          prepend-inner-icon="mdi-arrow-split-horizontal"
          placeholder="Приоритет задачи"
        ></v-autocomplete>
        <v-autocomplete
          v-model="watchedBy"
          :items="teamUsers"
          item-text="email"
          item-value="id"
          prepend-inner-icon="mdi-account"
          placeholder="Исполнитель"
        ></v-autocomplete>
        <v-menu
          ref="menu"
          v-model="dateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Срок исполнения"
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
      </v-card-text>
      <v-card-actions>
        <v-btn @click="cancel()">Отмена</v-btn>
        <v-btn @click="save()">Создать задачу</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  props: {
    show: {
      required: true
    },
    project: {
      required:true
    }
  },
  data: () => ({
    type: null,
    title: null,
    description: null,
    priority: null,
    watchedBy: null,
    dateMenu: null,
    date: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10)
  }),
  computed: {
    ...mapState('deals', [
      'taskTypes',
      'taskStatuses',
      'taskPriorities'
    ]),
    ...mapState('tenders',[
      'teamUsers'
    ])
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    save() {
      const payload = {
        project_id: this.project.id,
        description: this.description,
        type: this.type,
        title: this.title,
        priority: this.priority,
        watched_by: this.watchedBy,
        expired_at: moment(this.date, 'YYYY-MM-DD HH:mm:ss').tz('Europe/Moscow').format()
      }

      this.$emit('save', payload)
      this.clear()
    },
    clear() {

    }
  }
}
</script>