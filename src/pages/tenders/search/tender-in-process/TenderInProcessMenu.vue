<template>
  <div class="text-center" depressed>
    <v-menu offset-y transition="slide-x-transition">
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
          <v-icon center class="px-1" :color="item.color">{{
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
        icon: 'mdi-clock-time-two'
      },
      {
        title: 'Установить метку',
        icon: 'mdi-clipboard-arrow-down'
      },
      {
        title: 'Привязать компанию',
        icon: 'mdi-link-plus'
      },
      {
        title: 'История изменений',
        icon: 'mdi-history'
      },
      {
        title: 'Установить сумму',
        icon: 'mdi-currency-usd'
      },
      {
        title: 'Создать задачу',
        icon: 'mdi-delete'
      }
    ]
  }),
  methods: {
    emitter(item) {
      console.log('It works' + ` ${item.id}`)
      this.$emit(item.emit, { emit: item.emit, type: item.type })
    }
  }
}
</script>

<style scoped></style>>
