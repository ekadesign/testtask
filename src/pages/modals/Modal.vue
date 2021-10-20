<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="720">
      <v-card>
        <div
          class="align-center d-flex justify-space-between pr-2 lighten-1 primary mb-3"
        >
          <v-card-title class="text-h4 white--text" color="primary">
            Привязать компанию
          </v-card-title>
          <v-btn color="red lighten-1" fab x-small dark>
            <v-icon>{{ 'mdi-close' }}</v-icon>
          </v-btn>
        </div>
        <v-autocomplete
          v-model="company"
          :items="companiesList"
          label="Выберите компанию"
          outlined
          multiple
          class="px-2"
        ></v-autocomplete>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" dark>
            Привязать
            <v-icon color="primary">mdi-link</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {},
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
    company: null
  }),
  computed: {},
  methods: {}
}
</script>

<style></style>
