<template>
  <v-container fluid>
    <v-card v-if="Object.keys(activeTender)">
      <v-card-title>
        {{ activeTender.subject }}
      </v-card-title>
      <v-card-subtitle>
        {{ activeTender.organisation.short_name }}
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
                    {{ activeTender.subject }}
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="6">
                    Способ проведения:
                  </v-col>
                  <v-col cols="6">
                    {{ activeTender.placing_way.name }}
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="6">
                    Заказчик:
                  </v-col>
                  <v-col cols="6">
                    {{ activeTender.organisation.short_name }}
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="6">
                    Начальная стоимость:
                  </v-col>
                  <v-col cols="6">
                    {{ activeTender.max_price }}
                    <v-icon color="grey" size="14">mdi-currency-rub</v-icon>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="6">
                    Статус:
                  </v-col>
                  <v-col cols="6">
                    {{ activeTender.state.name }}
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
                    {{ activeTender.published_at | formatDate('lll') }}
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="6">
                    Окончание сбора заявок:
                  </v-col>
                  <v-col cols="6">
                    {{ activeTender.end_at | formatDate('lll') }}
                  </v-col>
                </v-row>
                <!-- //@TODO add other dates -->
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card dense outlined>
              <v-card-text>
                <div v-if="activeTender.events.length">
                  <div
                    v-for="(ev, index) in activeTender.events"
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
                <div v-if="activeTender.attachments.length">
                  <div
                    v-for="attachment in activeTender.attachments"
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
            <div v-if="activeTender.events.length">
              <v-card dense outlined>
                <v-card-title>Журнал событий</v-card-title>
                <v-card-text>
                  <div
                    v-for="(ev, index) in activeTender.events"
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
            <h3 v-else class="text-center mt-4">События отсутствуют</h3>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-card-text></v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { getTender } from '@/configs/api'
import { mapState } from 'vuex'

export default {
  data: () => ({
    tab: null,
    tabs: [
      { text: 'Информация', id: 1 },
      { text: 'Документация', id: 2 },
      { text: 'События', id: 3 }
    ]
  }),
  async mounted() {
    await this.$store.dispatch('tenders/resetActiveTenderToDefault')
    await this.$store.dispatch('tenders/getActiveTender', this.$route.params.id)
  },
  computed: {
    ...mapState('tenders', [
      'activeTender'
    ])
  }
}
</script>