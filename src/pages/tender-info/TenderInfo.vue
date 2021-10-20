<template>
  <v-card
    v-if="activeTab === tabName && currentTender"
    class="justify-center"
    :current-tender="currentTender"
    @click="show"
  >
    <div class="d-flex justify-space-between align-center">
      <v-card-title>
        {{ currentTender.subject }}
      </v-card-title>
      <TenderMenu
        @setCompanies="setCompanies($event)"
        @setCategory="setCategory($event)"
      />
    </div>
    <v-card-subtitle>
      {{ currentTender.organisation.short_name }}
    </v-card-subtitle>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab v-for="item in tabs" :key="item.id">
          {{ item.text }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card dense outlined>
            <v-card-title>
              Сведения о закупке
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  Наименование:
                </v-col>
                <v-col cols="6">
                  {{ currentTender.subject }}
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="6">
                  Способ проведения:
                </v-col>
                <v-col cols="6">
                  {{ currentTender.placing_way.name }}
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="6">
                  Заказчик:
                </v-col>
                <v-col cols="6">
                  {{ currentTender.organisation.short_name }}
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="6">
                  Начальная стоимость:
                </v-col>
                <v-col cols="6">
                  {{ currentTender.max_price }}
                  <v-icon color="grey" size="14">mdi-currency-rub</v-icon>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="6">
                  Статус:
                </v-col>
                <v-col cols="6">
                  {{ currentTender.state.name }}
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card dense outlined>
            <v-card-title>
              Сведения о сроках
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  Публикация извещения:
                </v-col>
                <v-col cols="6">
                  {{ currentTender.published_at | formatDate('lll') }}
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="6">
                  Окончание сбора заявок:
                </v-col>
                <v-col cols="6">
                  {{ currentTender.end_at | formatDate('lll') }}
                </v-col>
              </v-row>
              <!-- //@TODO add other dates -->
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card dense outlined>
            <v-card-text>
              <div v-if="currentTender.events.length">
                <div v-for="(ev, index) in currentTender.events" :key="index">
                  <div
                    v-for="(attachment, index) in ev.attachments"
                    :key="index"
                    class="my-2"
                  >
                    <v-icon class="mr-1">mdi-file-word</v-icon>
                    <a :href="attachment.href">{{ ev.name }}</a>
                  </div>
                </div>
              </div>
              <div v-if="currentTender.attachments.length">
                <div
                  v-for="attachment in currentTender.attachments"
                  :key="attachment.id"
                  class="my-2"
                >
                  <v-icon class="mr-1">mdi-file-word</v-icon>
                  <a :href="attachment.href">{{ attachment.name }}</a>
                </div>
              </div>
              <div v-else>
                <h3 class="text-center mt-4">
                  Документация по закупке отсутствует
                </h3>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <div v-if="currentTender.events.length">
            <v-card dense outlined>
              <v-card-title>Журнал событий</v-card-title>
              <v-card-text>
                <div v-for="(ev, index) in currentTender.events" :key="index">
                  <div>
                    {{ ev.name }} |
                    {{ ev.published_at | formatDate('lll') }}
                  </div>
                  <v-divider></v-divider>
                </div>
              </v-card-text>
            </v-card>
          </div>
          <h3 class="text-center mt-4">События отсутствуют</h3>
        </v-tab-item>
      </v-tabs-items>
     
    </v-card-text> 
    <ModalCategory :id="currentTender.id" :dialog="categoriesModal" @setCategoryFalse="setCompaniesFalse"/>
    <ModalLinkCompany :id="currentTender.id" :dialog="companiesModal" @setCompaniesFalse="setCompaniesFalse"/>
  </v-card>
  
  <v-card v-else elevation="0">
    <p class="text-center text-h4 py-5">Ничего не выбрано</p>
  </v-card>
</template>

<script>
import TenderMenu from '@/pages/modals/TenderMenu'
import ModalCategory from '@/pages/modals/ModalCategory'
import ModalLinkCompany from '@/pages/modals/ModalLinkCompany'

export default {
  components: { TenderMenu, ModalCategory, ModalLinkCompany },
  props: {
    currentTender: {
      type: Object || null,
      required: true
    },
    activeTab: {
      type: String,
      required: true
    },
    tabName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tab: null,
      tabs: [
        { text: 'Информация', id: 1 },
        { text: 'Документация', id: 2 },
        { text: 'События', id: 3 },
        { text: 'Чат', id: 4 }
      ],
      companiesModal: false,
      categoriesModal: false
    }
  },
  mounted() {
    this.$on('setCategoryFalse', this.setCategoryFalse)
  },
	
  methods: {
    setTenderNull() {
      this.$emit('setTenderNull')
    },
    setCompanies(evt) {
      this.companiesModal = true
    },
    setCategory(evt) {
      this.categoriesModal = true
    },
    setCompaniesFalse(evt) {
      console.log('COMPANIES TENDERNFO')
      this.companiesModal = false
    },
    setCategoryFalse(evt) {
      console.log('CATEG TENDERNFO')
      this.categoriesModal = false
    }
  }
}
</script>

<style></style>
