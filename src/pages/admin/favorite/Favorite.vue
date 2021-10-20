<template>
  <v-col cols="12">
    <div v-if="!currentTender" class="d-flex flex-column flex-grow-1">
      <div class="d-flex align-center py-3">
        <div>
          <div class="display-1">Избранные тендеры</div>
        </div>
        <v-spacer></v-spacer>
      </div>

      <v-card>
        <v-data-table
          :headers="headers"
          :items="tenders"
          :loading="loading"
          class="flex-grow-1 row-pointer"
          @click:row="setTender"
        >
          <template v-slot:item.id="{ item }">
            <div class="font-weight-bold">
              # <copy-label :text="item.id + ''" />
            </div>
          </template>

          <template v-slot:item.region="{ item }">
            <div class="d-flex align-center py-1">
              <div class="ml-1 caption font-weight-bold">
                <copy-label :text="item.region.name" />
              </div>
            </div>
          </template>

          <template v-slot:item.maxPrice="{ item }">
            <div class="d-flex align-center py-1">
              <div class="ml-1 caption font-weight-bold">
                <copy-label :text="item.maxPrice" />
              </div>
            </div>
          </template>
          <template v-slot:item.organisation="{ item }">
            <div class="d-flex align-center py-1">
              <div class="ml-1 caption font-weight-bold">
                <copy-label :text="item.organisation.short_name" />
              </div>
            </div>
          </template>
          <template v-slot:item.type="{ item }">
            <div class="d-flex align-center py-1">
              <div class="ml-1 caption font-weight-bold">
                <copy-label :text="item" />
              </div>
            </div>
          </template>
          <template v-slot:item.start="{ item }">
            <div class="d-flex align-center py-1">
              <div class="ml-1 caption font-weight-bold">
                <copy-label :text="item.organisation.short_name" />
              </div>
            </div>
          </template>
          <template v-slot:item.end="{ item }">
            <div class="d-flex align-center py-1">
              <div class="ml-1 caption font-weight-bold">
                <copy-label :text="item.organisation.short_name" />
              </div>
            </div>
          </template>
          <template v-slot:item.published="{ item }">
            <div class="d-flex align-center py-1">
              <div class="ml-1 caption font-weight-bold">
                <copy-label :text="item.published" />
              </div>
            </div>
          </template>
          <template v-slot:item.modified="{ item }">
            <div class="d-flex align-center py-1">
              <div class="ml-1 caption font-weight-bold">
                <copy-label :text="item.modified" />
              </div>
            </div>
          </template>

          <template v-slot:item.role="{ item }">
            <v-chip
              label
              small
              class="font-weight-bold"
              :color="item.role === 'ADMIN' ? 'primary' : undefined"
            >{{ item.role | capitalize }}</v-chip>
          </template>

          <template v-slot:item.start_at="{ item }">
            <div>{{ item.start_at | formatDate('lll') }}</div>
          </template>

          <template v-slot:item.end_at="{ item }">
            <div>{{ item.end_at | formatDate('lll') }}</div>
          </template>

          <template v-slot:item.published_at="{ item }">
            <div>{{ item.published_at | formatDate('lll') }}</div>
          </template>

          <template v-slot:item.modification_at="{ item }">
            <div>{{ item.modification_at | formatDate('lll') }}</div>
          </template>

          <template v-slot:item.action="{}">
            <div class="actions">
              <v-btn icon to="/users/edit">
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <v-col v-else cols="6" class="pr-0 pl-1 ">
      <v-card class="justify-center">
        <v-row class="align-center justify-center pt-3">
          <v-btn
            elevation="0"
            color="primary"
            @click="setTenderNull"
          >Вернуться ко всем сохранённым</v-btn>
        </v-row>
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
        <v-card-text> </v-card-text>
      </v-card>
    </v-col>
  </v-col>
</template>

<script>

export default {
  data() {
    return {
      showResults: false,
      loading: false,
      currentTender: null,
      tenders: [],
      mock: [],
      meta: {
        pagination: {
          total: 0,
          total_pages: 0,
          current_page: 1
        }
      },
      tab: null,
      tabs: [
        { text: 'Информация', id: 1 },
        { text: 'Документация', id: 2 },
        { text: 'События', id: 3 }
      ],
      headers: [
        { text: 'Тема', value: 'subject' },
        { text: 'Регион', value: 'region.name' },
        { text: 'Цена', value: 'max_price' },
        { text: 'Организация', value: 'organisation.short_name' },
        { text: 'Тип тендера', value: 'placing_way.type_name' },
        { text: 'Начало', value: 'start_at' },
        { text: 'Конец', value: 'end_at' },
        { text: 'Опубликован', value: 'published_at' },
        { text: 'Обновлен', value: 'modification_at' },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ]
    }
  },
  mounted() {
    this.tenders = JSON.parse(localStorage.getItem('favedTenders')) || []

    if (this.tenders.length) {
      this.showResults = true

      this.meta.pagination.total = this.tenders.length

      this.mock = Object.keys(this.tenders[0])
    }
  },
  methods: {
    setTender(tender) {
      this.currentTender = this.tenders.find((elem) => elem.id === tender.id)
    },

    setTenderNull() {
      this.currentTender = null
    }
  }
}
</script>
<style lang="css" scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
