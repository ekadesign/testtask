<template>
  <v-row justify="center">
    <v-dialog
      v-if="dialogType === 'delete'"
      v-model="dialog"
      persistent
      max-width="420"
    >
      <v-card>
        <v-card-title class="text-h6">
          Вы хотите удалить шаблон поиска?
        </v-card-title>
        <v-card-text class="red--text">{{ dialogTitle }}</v-card-text>
        <v-card-text>Подумайте хорошо, данное действие отменить невозможно</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red lighten-1" text @click="deleteTemplate()">
            Удалить
          </v-btn>
          <v-btn text @click="close()">
            Вернуться
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-if="dialogType === 'rename'"
      v-model="dialog"
      persistent
      max-width="420"
    >
      <v-card>
        <div class="align-center d-flex justify-space-between pr-2">
          <v-card-title class="text-h6">
            Хотите переименовать шаблон?
          </v-card-title>
          <v-btn
            color="red lighten-1"
            fab
            x-small
            dark
            @click="close()"
          >
            <v-icon>{{ 'mdi-close' }}</v-icon>
          </v-btn>
        </div>

        <v-text-field
          v-model="dialogNewTitle"
          class="px-2"
          label="Новое имя"
          outlined
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green lighten-1" text @click="renameTemplate()">
            Переименовать
          </v-btn>
          <v-btn text @click="close()">
            Вернуться
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    dialogTitle: {
      type: String,
      required: true
    },
    dialogType: {
      type: String,
      required: true
    }
  },
  data: () => ({
    dialogNewTitle: ''
  }),
  computed: {},
  methods: {
    close() {
      this.$emit('closeDialog')
    },
    deleteTemplate() {
      this.$emit('deleteTemplate', this.dialogTitle)
    },
    renameTemplate() {
      this.$emit('renameTemplate', {
        oldTitle: this.dialogTitle,
        newTitle: this.dialogNewTitle
      })
    }
  }
}
</script>

<style></style>
