<template>
  <div v-if="!searchApplied" class="d-flex" width="100%">
    <v-col cols="8">
      <v-card width="100%">
        <v-form ref="form">
          <v-card-actions>
            <v-row class="px-4 justify-start">
              <v-btn
                depressed
                color="primary"
                @click="saveSearch()"
              >Сохранить поиск
                <v-icon right>mdi-bookmark-multiple-outline</v-icon>
              </v-btn>
            </v-row>
          </v-card-actions>
          <v-card-text>
            <v-combobox
              v-model="notificationNumbers"
              class="mb-2"
              outlined
              multiple
              single-line
              hide-details
              hide-no-data
              hide-selected
              open-on-clear
              label="Номер извещения"
            >
              <template v-slot:selection="{ item }">
                <v-btn
                  color="success"
                  class="mr-1"
                >{{ item }}
                  <v-icon
                    right
                    @click="dropItem('notificationNumbers', item)"
                  >mdi-close</v-icon>
                </v-btn>
              </template>
            </v-combobox>
            <v-combobox
              v-model="keyword"
              outlined
              multiple
              single-line
              hide-details
              hide-no-data
              hide-selected
              open-on-clear
              label="Ключевые слова"
              class="mb-2"
            >
              <template v-slot:selection="{ item }">
                <v-btn
                  color="success"
                  class="mr-1"
                >{{ item }}
                  <v-icon
                    right
                    @click="dropItem('keyword', item)"
                  >mdi-close</v-icon>
                </v-btn>
              </template>
            </v-combobox>
            <v-combobox
              v-model="exceptionalKeywords"
              outlined
              multiple
              single-line
              hide-details
              hide-no-data
              hide-selected
              open-on-clear
              label="Слова исключения"
            >
              <template v-slot:selection="{ item }">
                <v-btn
                  color="success"
                  class="mr-1"
                >{{ item }}
                  <v-icon
                    right
                    @click="dropItem('exceptionalKeywords', item)"
                  >mdi-close</v-icon>
                </v-btn>
              </template>
            </v-combobox>

            <v-row>
              <v-col cols="6">
                <v-autocomplete
                  v-model="govermentPurchaceList"
                  outlined
                  multiple
                  label="Государственные, коммерческие закупки"
                  :items="govermentPurchases"
                ></v-autocomplete>
                <v-autocomplete
                  v-model="purchaseStepList"
                  outlined
                  multiple
                  label="Этап закупки"
                  :items="purchasesSteps"
                ></v-autocomplete>
                <v-row class="px-3">
                  <v-autocomplete
                    v-model="okpdList"
                    :loading="okpdLoading"
                    :search-input.sync="okpdSearch"
                    :items="okpds"
                    :filter="okpdFilters"
                    item-text="name"
                    item-value="code"
                    multiple
                    label="ОКПД2"
                    outlined
                  >
                    <template v-slot:item="data">
                      <v-list-item-content>
                        <v-list-item-title
                          v-html="data.item.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-html="data.item.code"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                  <v-checkbox></v-checkbox>
                </v-row>
                <v-autocomplete
                  v-model="customerList"
                  :items="customers"
                  multiple
                  :filter="customerFilters"
                  :loading="customerLoading"
                  :search-input.sync="customerSearch"
                  item-text="full_name"
                  item-value="id"
                  label="Заказчик"
                  outlined
                ></v-autocomplete>
                <v-autocomplete
                  v-model="organizerList"
                  :items="organizers"
                  multiple
                  :filter="ogranizerFilters"
                  :loading="organizerLoading"
                  :search-input.sync="organizerSearch"
                  item-text="full_name"
                  item-value="id"
                  label="Организатор"
                  outlined
                >
                  <template v-slot:item="data">
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="data.item.short_name"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-html="data.item.id"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
                <v-row class="px-3">
                  <v-menu
                    v-model="menuFrom"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateFrom"
                        outlined
                        :max="dateTo"
                        label="От"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateFrom"
                      @input="menuFrom = false"
                    ></v-date-picker>
                  </v-menu>
                  <v-menu
                    v-model="menuTo"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateTo"
                        outlined
                        label="До"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateTo"
                      @input="menuTo = false"
                    ></v-date-picker>
                  </v-menu>
                </v-row>
                <v-radio-group
                  v-model="smpLimitation"
                  label="Ограничение по СМП"
                >
                  <v-radio
                    v-for="n in smpLimitations"
                    :key="n.value"
                    :label="n.text"
                    :value="n.value"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="orderTypeList"
                  :items="orderTypes"
                  multiple
                  label="Способ проведения закупки"
                  outlined
                >
                </v-autocomplete>
                <v-autocomplete
                  v-model="regionsList"
                  :items="regions"
                  multiple
                  label="Регионы"
                  outlined
                >
                </v-autocomplete>
                <v-row class="px-3">
                  <v-text-field
                    v-model="priceFrom"
                    outlined
                    prepend-icon="mdi-currency-rub"
                    label="От"
                  ></v-text-field>
                  <v-text-field
                    v-model="priceTo"
                    prepend-icon="mdi-currency-rub"
                    outlined
                    label="До"
                  ></v-text-field>
                  <v-checkbox
                    v-model="hasNoPrice"
                    label="Без цены"
                  ></v-checkbox>
                </v-row>
                <v-autocomplete
                  v-model="partisipantList"
                  :items="participants"
                  :filter="partisipantFilters"
                  :loading="partisipantLoading"
                  :search-input.sync="partisipantSearch"
                  item-text="name"
                  item-value="inn"
                  multiple
                  label="Участники"
                  outlined
                >
                  <template v-slot:item="data">
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="data.item.name"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-html="data.item.inn"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
                <v-autocomplete
                  v-model="winnerList"
                  :items="winners"
                  multiple
                  label="Победитель"
                  outlined
                >
                </v-autocomplete>
                <v-autocomplete
                  v-model="placementList"
                  :items="placements"
                  multiple
                  item-text="text"
                  item-value="value"
                  label="ЭТП"
                  outlined
                >
                </v-autocomplete>
                <v-checkbox
                  v-model="exceptMyTenders"
                  label="Исключить мои тендеры"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row class="px-3 justify-start">
              <v-btn
                depressed
                color="primary"
                @click="submit()"
              >Найти
                <v-icon right>mdi-magnify</v-icon>
              </v-btn>
              <v-btn
                class="ml-3"
                depressed
                color="primary"
                @click="saveSearch()"
              >Сохранить поиск
                <v-icon right>mdi-bookmark-multiple-outline</v-icon>
              </v-btn>
            </v-row>
            <v-row class="px-3 justify-end">
              <v-btn depressed @click="clear()">Сбросить</v-btn>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <div class="text-center font-weight-black pt-2">Шаблоны поиска</div>
        <v-card-actions class="justify-space-between">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn width="40%" v-bind="attrs" @click="sortAsc()" v-on="on">
                <v-icon right>mdi-arrow-up</v-icon>
              </v-btn></template>
            <span>Сначала старые</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn width="40%" v-bind="attrs" @click="sortDesc()" v-on="on">
                <v-icon right>mdi-arrow-down</v-icon>
              </v-btn></template>
            <span>Сначала новые</span>
          </v-tooltip>
        </v-card-actions>
        <booked-search
          v-for="search in templatesSearch"
          :id="search.id"
          :key="search.id"
          :search="search"
          @fill="fill($event)"
          @historySearch="historySearch($event)"
          @historyChanges="historyChanges($event)"
          @dialogActivation="dialogActivation($event)"
        ></booked-search>
      </v-card>
    </v-col>
    <Dialog
      :dialog="dialog"
      :dialog-title="dialogTitle"
      :dialog-type="dialogType"
      @closeDialog="closeDialog($event)"
      @renameTemplate="renameTemplate($event)"
      @deleteTemplate="deleteTemplate($event)"
    >
    </Dialog>
  </div>
</template>

<script>
import {
  getOKPDsList,
  getFieldData,
  getMembersList,
  getParticipantsList
} from '@/pages/user/tenders/search/api'
import moment from 'moment'
import BookedSearch from './BookedSearch.vue'
import Dialog from '@/pages/dialog/Dialog.vue'

const DEBOUNCE_TIMEOUT = 500
const MAX_NAME_LENGTH = 40
const DEBOUNCE_SYMBOLS_LENGTH = 3

export default {
  components: { BookedSearch, Dialog },
  data: () => ({
    searchApplied: false,
    templatesSearch: [],
    dialog: false,
    dialogTitle: null,
    dialogType: null,

    templateSelected: null,

    priceFrom: null,
    priceTo: null,

    hasNoPrice: false,

    notificationNumbers: [],
    keyword: [],
    exceptionalKeywords: [],

    okpds: [],
    okpdList: [],
    okpdLoading: false,
    okpdSearch: null,
    okpdDebouncer: null,

    govermentPurchases: [],
    govermentPurchaceList: [],
    purchasesSteps: [],
    purchaseStepList: [],

    organizers: [],
    organizerList: [],
    organizerLoading: null,
    organizerSearch: null,
    organizerDebouncer: null,

    customers: [],
    customerList: [],
    customerLoading: null,
    customerSearch: null,
    customerDebouncer: null,

    orderTypes: [],
    orderTypeList: [],

    regions: [],
    regionsList: [],

    participants: [],
    partisipantList: [],
    partisipantLoading: null,
    partisipantSearch: null,
    partisipantDebouncer: null,

    winners: [],
    winnerList: [],

    placements: [],
    placementList: [],

    dateFrom: null,
    menuFrom: false,
    dateTo: null,
    menuTo: false,

    smpLimitations: [],
    smpLimitation: 1,
    exceptMyTenders: true
  }),
  watch: {
    async okpdSearch(val) {
      if (!val || val.length < DEBOUNCE_SYMBOLS_LENGTH) {
        return
      }
      this.getOKPD()
    },
    async customerSearch(val) {
      if (!val || val.length < DEBOUNCE_SYMBOLS_LENGTH) {
        return
      }
      this.getCustomers()
    },
    async organizerSearch(val) {
      if (!val || val.length < DEBOUNCE_SYMBOLS_LENGTH) {
        return
      }
      this.getOrganizers()
    },
    async partisipantSearch(val) {
      if (!val || val.length < DEBOUNCE_SYMBOLS_LENGTH) {
        return
      }
      this.getParticipants()
    }
  },
  async mounted() {
    this.dateFrom = moment()
      .subtract(1, 'month')
      .format('YYYY-MM-DD')
    this.dateTo = moment().format('YYYY-MM-DD')
    await this.spreadFieldData()
  },
  methods: {
    async spreadFieldData() {
      const rsp = await getFieldData()

      const {
        etp: etps,
        ways: orderTypes,
        states: purchasesSteps,
        types: govermentPurchases,
        limits: smpLimitations,
        regions
      } = rsp.data.data

      this.regions = regions
      this.orderTypes = orderTypes
      this.placements = etps
      this.orderTypes = orderTypes
      this.purchasesSteps = purchasesSteps
      this.smpLimitations = smpLimitations
      this.govermentPurchases = govermentPurchases
    },
    getOKPD() {
      if (this.okpdLoading) return

      clearTimeout(this.okpdDebouncer)

      this.okpdLoading = true

      this.okpdDebouncer = setTimeout(async () => {
        const res = await getOKPDsList(this.okpdSearch)
        const { data: okpds } = res.data

        this.okpds = this.trimSearchData(okpds, 'name')

        this.okpdLoading = false
      }, DEBOUNCE_TIMEOUT)
    },
    getOrganizers() {
      if (this.organizerLoading) return

      clearTimeout(this.organizerDebouncer)

      this.organizerLoading = true

      this.organizerDebouncer = setTimeout(async () => {
        const res = await getMembersList(this.organizerSearch)
        const { data: organizers } = res.data

        this.organizers = this.trimSearchData(organizers, 'short_name')

        this.organizerLoading = false
      }, DEBOUNCE_TIMEOUT)
    },
    getCustomers() {
      if (this.customerLoading) return

      clearTimeout(this.customerDebouncer)

      this.customerLoading = true

      this.customerDebouncer = setTimeout(async () => {
        const res = await getMembersList(this.customerSearch)

        const { data: customers } = res.data

        this.customers = this.trimSearchData(customers, 'short_name')

        this.customerLoading = false
      }, DEBOUNCE_TIMEOUT)
    },
    getParticipants() {
      if (this.partisipantLoading) return

      clearTimeout(this.partisipantDebouncer)

      this.partisipantLoading = true

      this.partisipantDebouncer = setTimeout(async () => {
        const res = await getParticipantsList(this.partisipantSearch)
        const { data: participants } = res.data

        this.participants = this.trimSearchData(participants, 'name')

        this.partisipantLoading = false
      }, DEBOUNCE_TIMEOUT)
    },
    trimSearchData(items, field) {
      return items.map((item) => {
        if (item[field] && item[field].length > MAX_NAME_LENGTH)
          item[field] = item[field].substring(0, MAX_NAME_LENGTH) + '...'

        return item
      })
    },
    dropItem(type, item) {
      const itemIndex = this[type].findIndex((it) => it === item)

      this[type].splice(itemIndex, 1)
    },
    submit() {
      const {
        winnerList,
        notificationNumbers,
        keyword,
        exceptionalKeywords,
        govermentPurchaceList,
        purchaseStepList,
        organizerList,
        customerList,
        orderTypeList,
        okpdList,
        regionsList,
        partisipantList,
        placementList,
        smpLimitation,
        exceptMyTenders,
        priceFrom,
        priceTo,
        hasNoPrice,
        dateFrom,
        dateTo
      } = this

      //@TODO add filter decorator
      const payload = {
        filter: {
          participant: partisipantList,
          etp: placementList,
          price_from: priceFrom,
          price_to: priceTo,
          state: purchaseStepList,
          region: regionsList,
          way: orderTypeList,
          organisation: organizerList,
          date_from: dateFrom,
          date_to: dateTo,
          ignore: exceptionalKeywords,
          type: govermentPurchaceList,
          okpd2: okpdList,
          winnerList,
          notificationNumbers,
          keyword,
          organizerList,
          customerList,
          smpLimitation,
          exceptMyTenders,
          hasNoPrice
        }
      }

      this.searchApplied = true
      this.$emit('search', payload)
    },
    clear() {
      this.templateSelected = null
      this.winnerList = []
      this.notificationNumbers = []
      this.keyword = []
      this.exceptionalKeywords = []
      this.govermentPurchaceList = []
      this.purchaseStepList = []
      this.organizerList = []
      this.customerList = []
      this.orderTypeList = []
      this.regionsList = []
      this.partisipantList = []
      this.placementList = []
      this.smpLimitation = 1
      this.exceptMyTenders = true
      this.priceFrom = null
      this.priceTo = null
      this.hasNoPrice = false
      this.dateFrom = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10)
      this.dateTo = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10)
    },
    okpdFilters(item, queryText, itemText) {
      const code = item.code.toLowerCase()
      const name = item.name.toLowerCase()
      const searchText = queryText.toLowerCase()

      return code.indexOf(searchText) > -1 || name.indexOf(searchText) > -1
    },
    ogranizerFilters(item, queryText, itemText) {
      const full_name = item.full_name.toLowerCase()
      const short_name = item.short_name.toLowerCase()
      const searchText = queryText.toLowerCase()

      return (
        full_name.indexOf(searchText) > -1 ||
        short_name.indexOf(searchText) > -1
      )
    },
    customerFilters(item, queryText, itemText) {
      const full_name = item.full_name.toLowerCase()
      const short_name = item.short_name.toLowerCase()
      const searchText = queryText.toLowerCase()

      return (
        full_name.indexOf(searchText) > -1 ||
        short_name.indexOf(searchText) > -1
      )
    },
    partisipantFilters(item, queryText, itemText) {
      const name = item.name.toLowerCase()
      const inn = item.inn.toLowerCase()
      const searchText = queryText.toLowerCase()

      return name.indexOf(searchText) > -1 || inn.indexOf(searchText) > -1
    },
    saveSearch() {
      const activeTemplateIndex = this.templatesSearch.findIndex(
        (elem) => elem.id === this.templateSelected
      )

      const {
        winnerList,
        notificationNumbers,
        keyword,
        exceptionalKeywords,
        govermentPurchaceList,
        purchaseStepList,
        organizerList,
        customerList,
        orderTypeList,
        okpdList,
        regionsList,
        partisipantList,
        placementList,
        smpLimitation,
        exceptMyTenders,
        priceFrom,
        priceTo,
        hasNoPrice,
        dateFrom,
        dateTo
      } = this

      const payload = {
        searchButtonsStatus: {
          okpd2: okpdList.length ? true : false,
          keyword: keyword.length ? true : false,
          notificationNumbers: false,
          search: false
        },
        filter: {
          participant: partisipantList,
          etp: placementList,
          price_from: priceFrom,
          price_to: priceTo,
          state: purchaseStepList,
          region: regionsList,
          way: orderTypeList,
          organisation: organizerList,
          date_from: dateFrom,
          date_to: dateTo,
          ignore: exceptionalKeywords,
          type: govermentPurchaceList,
          okpd2: okpdList,
          winnerList,
          notificationNumbers,
          keyword,
          organizerList,
          customerList,
          smpLimitation,
          exceptMyTenders,
          hasNoPrice,
          date_teplate_created: Date.now()
        },
        title:
          activeTemplateIndex !== -1
            ? this.templatesSearch[activeTemplateIndex].title
            : 'Добавьте название',
        id: Math.ceil(Math.random() * 10000)
      }

      if (this.templateSelected) {
        this.templatesSearch[activeTemplateIndex] = payload
      } else {
        this.templatesSearch.push(payload)
      }

      this.clear()
    },
    fill(id) {
      this.clear()

      this.templateSelected = id

      const template = this.templatesSearch.find((elem) => elem.id === id)

      this.winnerList = template.filter.winnerList
      this.notificationNumbers = template.filter.notificationNumbers
      this.keyword = template.filter.keyword
      this.exceptionalKeywords = template.filter.ignore
      this.govermentPurchaceList = template.filter.type
      this.purchaseStepList = template.filter.state
      this.regionsList = template.filter.region
      this.organizerList = template.filter.organization
      this.customerList = template.filter.customerList
      this.orderTypeList = template.filter.way
      this.partisipantList = template.filter.participant
      this.placementList = template.filter.etp
      this.smpLimitation = template.filter.smpLimitation
      this.exceptMyTenders = template.filter.exceptMyTenders
      this.priceFrom = template.filter.price_from
      this.priceTo = template.filter.price_to
      this.hasNoPrice = template.filter.hasNoPrice
    },
    historySearch(id) {
      // no history yet
    },
    historyChanges(id) {
      //  no history yet
    },
    renameTemplate({ oldTitle, newTitle }) {
      const selectedTemplate = this.templatesSearch.find(
        (elem) => elem.title === oldTitle
      )

      selectedTemplate.title = newTitle

      this.closeDialog()
    },
    closeDialog() {
      this.dialog = false
      this.dialogType = null
    },

    dialogActivation({ id, type }) {
      this.dialog = true
      this.dialogType = type
      const selectedTemplate = this.templatesSearch.find(
        (elem) => elem.id === id
      )

      this.dialogTitle = selectedTemplate.title
    },
    deleteTemplate(title) {
      const selectedTemplate = this.templatesSearch.find(
        (elem) => elem.title === title
      )

      this.templatesSearch.splice(
        this.templatesSearch.indexOf(selectedTemplate),
        1
      )
      this.closeDialog()
    }
  }
}
</script>
