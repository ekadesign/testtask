<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="720">
      <v-card>
        <div
          class="align-center d-flex justify-space-between pr-2 lighten-1 primary mb-3"
        >
          <v-card-title class="text-h4 white--text" color="primary">
            Назначить исполнителя
          </v-card-title>
          <v-btn
            color="red lighten-1"
            fab
            x-small
            dark
            @click="toggle"
          >
            <v-icon>{{ 'mdi-close' }}</v-icon>
          </v-btn>
        </div>
        <div>
          <v-card-text>Выберите исполнителя
            <v-btn
              color="primary lighten-1"
              text
              depressed
              elevation="0"
              plain
            >
              (назначить на себя)
            </v-btn></v-card-text>
          <v-autocomplete
            v-model="executor"
            :items="executorsList"
            label="Выберите исполнителя"
            outlined
            multiple
            class="px-2"
          ></v-autocomplete>
        </div>
        <div>
          <v-card-text>Выберите соисполнителя
            <v-btn
              color="primary lighten-1"
              text
              depressed
              elevation="0"
              plain
            >
              (назначить на себя)
            </v-btn></v-card-text>
          <v-autocomplete
            v-model="coexecutor"
            :items="coexecutorsList"
            label="Выберите соисполнителя"
            outlined
            multiple
            class="px-2"
          ></v-autocomplete>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" dark>
            В работу
            <v-icon color="primary">mdi-arrow-right</v-icon>
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
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    dialog: false,
    reasonsList: [
      'Большая отсрочка по оплате',
      'Не успеваем подготовить заявку',
      'Не хватает ресурсов (слишком большой объем работы)',
      'Нет аккредитации на ЭТП',
      'Нет лицензии / СРО',
      'Нет на складе риса длин',
      'Нет такого товара на складе',
      'Рабочие профессии'
    ],
    reason: null,

    coexecutor: [],
    coexecutorsList: [],
    executor: [],
    executorsList: []
  }),
  computed: {},
  methods: {
    toggle() {
      this.$emit('closeModalExecutor')
    }
  }
}
</script>

<style></style>
