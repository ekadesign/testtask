<template>
  <div>
    <v-card v-if="!cardActive" :card="card" class="mb-2" @click="handleCardClick">
      <div style="position: relative">
        <v-card-title>{{ card.subject }}</v-card-title>
        <v-icon style="position: absolute; top: -5px; right: 5px;" large color="green lighten-3">mdi-bookmark</v-icon>
      </div>
      
      <div class="d-flex flex-row justify-space-between">
        <v-card-subtitle>{{ card.organisation.full_name }}</v-card-subtitle>
        <div class="text-right">
          <v-card-subtitle>{{ card.id }}</v-card-subtitle>
          <div class="pt-1 pr-2">{{ card.max_price }} ₽</div>
          <div class="pt-1 pr-2">{{ card.region.name }}</div>
        </div>
        
      </div>
      <div class="d-flex flex-row justify-space-between">
        <div class="d-flex flex-row">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{
                card.placing_way.subsystem_name
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{
                card.placing_way.type_name
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ card.state.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title >{{ card.end_at | fromNow() }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        
      </div>
    </v-card>
    <v-card
      v-else
      class="d-flex align-center justify-center"
      height="200"
      @click.self="handleCardClick"
    >
      <div class="d-flex align-center justify-center">
        <v-btn
          elevation="0"
          class="mr-2"
          @click="openModalRefusal"
        >Не участвуем</v-btn>
        <v-btn @click="openModalExecutor">Участвуем</v-btn>
      </div>
    </v-card>
    <ModalRefusal
      :id="card.id"
      :dialog="modalRefusal"
      @closeModalRefusal="closeModalRefusal($event)"
    />
    <ModalExecutor
      :id="card.id"
      :dialog="modalExecutor"
      @closeModalExecutor="closeModalExecutor($event)"
    />
  </div>
</template>

<script>
import ModalRefusal from '@/pages/modals/ModalRefusal'
import ModalExecutor from '@/pages/modals/ModalExecutor'

export default {
  components: { ModalRefusal, ModalExecutor },
  props: ['card'],
  data() {
    return {
      cardActive: false,
      modalRefusal: false,
      modalExecutor: false
    }
  },
  computed: {
    getBookmarkColor() {
      //logic where you look at the time which is left and give it red, yellow or green color
      return 'green'
    }
  },
  methods: {
    handleCardClick: function() {
      this.cardActive = !this.cardActive
      this.setTender({ tender: this.card })
    },
    openModalExecutor: function() {
      this.cardActive = false
      this.modalExecutor = true
    },
    openModalRefusal: function() {
      this.cardActive = false
      this.modalRefusal = true
    },
    closeModalExecutor: function() {
      this.modalExecutor = false
    },
    closeModalRefusal: function() {
      this.modalRefusal = false
    },
    setTender() {
      this.$emit('setTender', { tender: this.card })
    }
  }
}
</script>
<style>
.pointer {
  cursor: pointer;
}
</style>
