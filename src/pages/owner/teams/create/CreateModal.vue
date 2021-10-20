<template>
  <v-dialog v-model="show" @click:outside="$emit('cancel')">
    <v-card>
      <v-card-title>
        Добавить организацию
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="name" placeholder="Название"></v-text-field>
        <v-text-field v-model="inn" placeholder="ИНН"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="cancel()">cancel</v-btn>
        <v-btn @click="save()">save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      required: true
    }
  },
  data: () => ({
    name: null,
    inn: null
  }),
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    save() {
      this.$emit('save', { inn: this.inn, name: this.name })
      this.clear()
    },
    clear() {
      this.inn = null
      this.name = null
    }
  }
}
</script>