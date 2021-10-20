<template>
  <div>
    <v-row>
      <v-toolbar>
        <v-btn
          class="mr-2"
          outlined
          depressed
          @click="goBack()"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-row
          class="ml-0"
        >Найдено тендеров: {{ meta.pagination.total }}
        </v-row>
      </v-toolbar>
    </v-row>
    <v-row justify="space-between">
      <v-col cols="6" class="pl-0 pr-1">
        <v-card :loading="loading">
          <v-card-title>
            <v-row justify="center">
              <v-pagination
                v-model="meta.pagination.current_page"
                :length="meta.pagination.total_pages"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
                :total-visible="6"
                @input="$emit('pageChange')"
              ></v-pagination>
            </v-row>
          </v-card-title>
          <v-card-text v-for="t in tenders" :key="t.id" @click="openTender(t)">
            <v-card v-show="!isCurrentTender(t)" outlined class="mb-3 pointer">
              <v-row class="d-flex px-3 justify-space-between pr-4">
                <v-card-title width="80%">
                  {{ t.subject }}
                </v-card-title>
                <v-card-actions>
                  <v-icon color="amber accent-3" @click="toggleFav($event, t)">{{
                    getStar(t.id)
                  }}
                  </v-icon>
                </v-card-actions>
              </v-row>

              <v-card-subtitle>
                {{ t.organisation.short_name }}
              </v-card-subtitle>
              <v-card-text>
                <div>
                  <v-btn
                    class="mr-1 mb-1"
                    color="pimary"
                    outlined
                    depressed
                    x-small
                  >
                    <v-icon color="grey" size="16">mdi-map-marker</v-icon>
                    {{ t.region_id }}
                  </v-btn>
                  <v-btn
                    class="mr-1 mb-1"
                    color="pimary"
                    outlined
                    depressed
                    x-small
                  >
                    <v-icon color="grey" size="16">mdi-file</v-icon>
                    N{{
                      t.placing_way.subsystem_name
                    }}
                  </v-btn>
                  <v-btn
                    class="mr-1 mb-1"
                    color="pimary"
                    outlined
                    depressed
                    x-small
                  >
                    <v-icon color="grey" size="16">mdi-bank</v-icon>
                    {{ getShortName(t) }}
                  </v-btn>
                  <v-btn
                    class="mr-1 mb-1"
                    color="pimary"
                    outlined
                    depressed
                    x-small
                  >
                    <v-icon color="grey" size="16">mdi-gavel</v-icon>
                    {{ t.placing_way.type_name }}
                  </v-btn>
                  <v-btn
                    class="mr-1 mb-1"
                    color="pimary"
                    outlined
                    depressed
                    x-small
                  >
                    <v-icon color="grey" size="16">mdi-content-copy</v-icon>
                    {{ t.id }}
                  </v-btn>
                  <v-btn
                    class="mr-1 mb-1"
                    color="pimary"
                    outlined
                    depressed
                    x-small
                  >{{ t.state.name }}
                  </v-btn>
                  <v-btn
                    class="mr-1 mb-1"
                    color="pimary"
                    outlined
                    depressed
                    x-small
                  >закончится {{ t.end_at | toNow() }}
                  </v-btn>
                </div>
                <div class="d-flex justify-end">
                  <v-btn
                    outlined
                    depressed
                    x-small
                    class="text-end"
                  >{{ t.max_price }}
                    <v-icon
                      color="grey"
                      size="16"
                    >mdi-currency-rub
                    </v-icon>
                  </v-btn>
                </div>
                <v-divider class="my-2"></v-divider>
                <v-btn block depressed :color="getColorByWorkStatus(t)">{{ getNameByWorkStatus(t) }}</v-btn>
              </v-card-text>
            </v-card>
            <v-card v-show="isCurrentTender(t)" outlined class="mb-3">
              <v-card-text>
                <v-row justify="center">
                  <v-btn disabled color="primary">В работу</v-btn>
                </v-row>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6" class="pr-0 pl-1">
        <v-card v-if="!currentTender">
          <v-card-title>
            Выберите тендер
          </v-card-title>
          <v-card-text></v-card-text>
        </v-card>
        <v-card v-else>
          <v-card-title>
            {{ currentTender.subject }}
          </v-card-title>
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
                      <div
                        v-for="(ev, index) in currentTender.events"
                        :key="index"
                      >
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
                      <div
                        v-for="(ev, index) in currentTender.events"
                        :key="index"
                      >
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
          <v-card-text></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getBookMarks } from '@/pages/user/tenders/search/api'

export default {
  props: {
    tenders: {
      type: Array,
      required: true
    },
    meta: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      tab: null,
      tabs: [
        { text: 'Информация', id: 1 },
        { text: 'Документация', id: 2 },
        { text: 'События', id: 3 }
      ],
      currentTender: null,
      favedTenders: []
    }
  },
  watch: {
    favedTenders(newValue) {
      localStorage.setItem('favedTenders', JSON.stringify(newValue))
    }
  },
  mounted() {
    this.favedTenders = JSON.parse(localStorage.getItem('favedTenders')) || []
  },
  methods: {
    goBack() {
      this.$emit('back')
      this.currentTender = null
    },
    isCurrentTender(t) {
      if (!this.currentTender) return false

      return this.currentTender.id === t.id
    },
    getStar(id) {
      if (this.favedTenders.findIndex((t) => t.id === id) !== -1) {
        return 'mdi-star'
      } else return 'mdi-star-outline'
    },
    openTender(tender) {
      this.currentTender = tender
      this.tab = null
    },
    getShortName(t) {
      return t?.etp?.short_name
    },
    toggleFav(ev, tender) {
      ev.stopPropagation()
      const tenderId = tender.id
      const index = this.favedTenders.findIndex((t) => t.id === tenderId)

      if (index === -1) {
        this.favedTenders.push(tender)
      } else {
        this.favedTenders.splice(index, 1)
      }
      console.log(this.favedTenders)
    },
    getColorByWorkStatus(t) {
      return 'primary'
    },
    getNameByWorkStatus(t) {
      return 'В работу'
    }
  }
}
</script>
<style>
.pointer {
  cursor: pointer;
}
</style>
