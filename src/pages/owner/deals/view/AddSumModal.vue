<template>
  <v-dialog :value="show" @input="cancel()">
    <v-card>
      <v-card-title>
        Установить сумму тендера, ниже которой работа не целесообразна
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="sum"
          clearable
          prepend-inner-icon="mdi-border-color"
          placeholder="Сумма"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="cancel()">Отмена</v-btn>
        <v-btn @click="save()">Установить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
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
    sum: 0
  }),
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    save() {
      this.$emit('save', this.sum)
      this.clear()
    },
    clear() {

    }
  }
}
</script>