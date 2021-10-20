<template>
  <v-tooltip :button-type="buttonType" :object-key="objectKey" bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-icon
        v-bind="attrs"
        :color="getColor"
        center
        :class="{ active: hover }"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        v-on="on"
      >{{
        buttonType
          ? buttonTypes[objectKey].true.icon
          : buttonTypes[objectKey].false.icon
      }}</v-icon>
    </template>
    <span>{{
      buttonType
        ? buttonTypes[objectKey].true.tooltip
        : buttonTypes[objectKey].false.tooltip
    }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: ['buttonType', 'objectKey'],
  data() {
    return {
      hover: false,
      buttonTypes: {
        notificationNumbers: {
          true: {
            tooltip: 'Выключить оповещения',
            icon: 'mdi-bell-outline'
          },
          false: {
            tooltip: 'Включить оповещения',
            icon: 'mdi-bell-ring'
          }
        },
        okpd2: {
          true: {
            tooltip: 'Коды ОКПД2 заданы',
            icon: 'mdi-barcode'
          },
          false: {
            tooltip: 'Коды ОКПД2 не заданы',
            icon: 'mdi-barcode-off'
          }
        },
        keyword: {
          true: {
            tooltip: 'Ключевые слова заданы',
            icon: 'mdi-key-plus'
          },
          false: {
            tooltip: 'Ключевые слова не заданы',
            icon: 'mdi-key-remove'
          }
        },
        search: {
          true: {
            tooltip: 'Нажмите, чтобы активировать автопоиск',
            icon: 'mdi-card-search'
          },
          false: {
            tooltip: 'Автопоиск недоступен на базовом тарифе',
            icon: 'mdi-card-search-outline'
          }
        }
      }
    }
  },
  computed: {
    getColor: function() {
      return this.buttonType ? 'success' : ''
    },
    console: () => console,
    getType: () => {
      this.console.log(typeOf(this.buttonType))
    }
  }
}
</script>
<style scoped>
.active {
  background-color: rgb(185, 185, 185);
}
</style>
