<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="720">
      <v-card>
        <div
          class="align-center d-flex justify-space-between pr-2 lighten-1 primary mb-3"
        >
          <v-card-title class="text-h4 white--text" color="primary">
            Категория
          </v-card-title>
          <v-btn
            color="red lighten-1"
            fab
            x-small
            dark
            @click="setCategoryFalse"
          >
            <v-icon>{{ 'mdi-close' }}</v-icon>
          </v-btn>
        </div>
        <div>
          <v-autocomplete
            v-model="category"
            :items="categories"
            label="Выберите категорию"
            outline
            class="px-2"
          ></v-autocomplete>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" dark>
            Выбрать
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
    categories: [
      'Больших объемов', 
      'Малых объемов',
      'Средних объемов'
    ],
    category: null
  }),
  computed: {},
  methods: {
    setCategoryFalse() {
      console.log('ModalCat')
      this.$root.$emit('setCategoryFalse')
      
    }
  }
}
</script>

<style></style>
