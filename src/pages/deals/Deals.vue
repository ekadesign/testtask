<template>
  <v-card width="100%">
    
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2 basil--text"></h1>
    </v-card-title>

    <v-tabs background-color="transparent" grow>
      <v-tab v-for="tab in tabs" :key="tab.name" class="d-flex  flex-column" @click="setActiveTab(tab.name)">
        <div>{{ tab.title }}</div>
        <div>
          <span>{{ returnArrName(tab.name).length }}</span>
          <span v-if="tab.name !== 'tendersArchives'"> | {{
            returnArrName(tab.name).reduce((acc, current) => {
              return acc + +current.max_price
            }, 0)
          }}
            ₽</span>
          <span v-else></span>
        </div>
      </v-tab>
      <v-tab-item v-for="tab in tabs" :key="tab.name + '-item'">
        <v-row>
          <v-col cols="6">
            <TenderCard
              v-for="tender in returnArrName(tab.name)"
              :key="tender.id"
              :card="tender"
              @setTender="setTender(tender)"
            >
            </TenderCard>
            <v-card v-if="returnArrName(tab.name).length === 0" elevation="0">
              <p class="text-center text-h4 py-5">Во вкладке {{ tab.title }} нет тендеров!</p>
            </v-card>
          </v-col>
          <v-col cols="6">
            <TenderInfo :current-tender="currentTender" :active-tab="activeTab" :tab-name="tab.name"/>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import TenderCard from '@/pages/deals/TenderCard'
import TenderInfo from '@/pages/tender-info/TenderInfo'

export default {
  components: { TenderCard, TenderInfo },

  data() {
    return {
      tendersNew: [],
      tendersPrep: [],
      tendersEnded: [],
      tendersContracts: [],
      tendersMaking: [],
      tendersArchives: [],
      currentTender: null,

      activeTab: 'tendersNew',

      tabs: [
        {
          name: 'tendersNew',
          title: 'Новые закупки'
        },
        {
          name: 'tendersPrep',
          title: 'Подготовка заявки'
        },
        {
          name: 'tendersEnded',
          title: 'Подведение итогов'
        },
        {
          name: 'tendersContracts',
          title: 'Заключение контракта'
        },
        {
          name: 'tendersMaking',
          title: 'Исполнение контракта'
        },
        {
          name: 'tendersArchives',
          title: 'Архив'
        }
        
      ]
    }
  },
  computed: {},
  mounted() {
    this.tendersNew = JSON.parse(localStorage.getItem('favedTenders')) || []

    this.tendersPrep = JSON.parse(localStorage.getItem('favedTenders')) || []
    this.tendersEnded = JSON.parse(localStorage.getItem('favedTenders')) || []
    this.tendersContracts = JSON.parse(localStorage.getItem('favedTenders')) || []  
    this.tendersMaking = JSON.parse(localStorage.getItem('favedTenders')) || []
    // this.tendersArchives = JSON.parse(localStorage.getItem('favedTenders')) || []
		
  },
  methods: {
    setTenderNull() {
      this.currentTender = null
    },
    setTender(tender) {
      this.currentTender = tender
    },
    setActiveTab(tab) {
      this.activeTab = tab
      this.currentTender = null
    },
    returnArrName(string) {
      return this[string]
    }
  }
}
</script>
<style>
.pointer {
  cursor: pointer;
}
</style>
