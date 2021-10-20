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
        title: 'Переименовать',
        icon: 'mdi-cog',
        emit: 'dialogActivation',
        type: 'rename'
      },
      {
        title: 'История автопоиска',
        icon: 'mdi-magnify',
        emit: 'historySearch'
      },
      {
        title: 'История изменений',
        icon: 'mdi-history',
        emit: 'historyChanges'
      },
      {
        title: 'Удалить',
        icon: 'mdi-delete',
        emit: 'dialogActivation',
        color: 'red lighten-2',
        type: 'delete'
      }
    ]
  }),
  methods: {
    emitter(item) {
      this.$emit(item.emit, { emit: item.emit, type: item.type })
    }
  }
}
</script>

<style scoped></style>>
