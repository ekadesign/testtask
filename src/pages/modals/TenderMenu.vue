<template>
  <div class="text-center" depressed>
    <v-menu offset-y transition="slide-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          retain-focus-on-click
          depressed
          v-bind="attrs"
          plain
          small
          v-on="on"
        >
          <v-icon center>{{ 'mdi-menu' }}</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="emitter(item)"
        >
          <v-icon center class="pr-2" :color="item.color">{{
            item.icon
          }}</v-icon>
          <v-list-item-title :color="item.color">{{
            item.title
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: 'История работы',
        icon: 'mdi-history'
      },
      {
        title: 'Изменить статус',
        icon: 'mdi-step-backward'
      },
      {
        title: 'Установить метку',
        icon: 'mdi-marker-check',
        color: 'red lighten-2'
      },
      {
        title: 'Привязать компанию',
        icon: 'mdi-link',
				 emit: 'setCompanies'
      },
      {
        title: 'Установить категорию',
        icon: 'mdi-shape-outline',
        emit: 'setCategory'
      },
      {
        title: 'Установить сумму',
        icon: 'mdi-cash-100'
      },
      {
        title: 'Создать задачу',
        icon: 'mdi-skew-more'
      }
    ]
  }),
  methods: {
    emitter(item) {
      this.$emit(item.emit, { emit: item.emit })
    }
  }
}
</script>

<style scoped></style>>
