<template>
  <v-card width="800">
    <v-btn class="mr-2" depressed icon><v-icon>mdi-arrow-left</v-icon></v-btn>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2 basil--text"></h1>
    </v-card-title>

    <v-tabs background-color="transparent" grow>
      <v-tab>
        <v-icon left>
          mdi-format-list-bulleted-triangle
        </v-icon>
        Список позиций
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-clipboard-list
        </v-icon>
        Список лотов
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-barcode
        </v-icon>
        Коды ОКПД2
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-certificate-outline
        </v-icon>
        Заказчики
      </v-tab>

      <v-tab-item>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-h6">
              Информация из ЕИС
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                :headers="headers"
                :items="tenders"
                class="flex-grow-1 row-pointer"
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
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-h6">
              Информация из ЭТП
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                :headers="headers"
                :items="tenders"
                class="flex-grow-1 row-pointer"
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
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-card flat> </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-h6">
              Информация из ЕИС
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                :headers="headers"
                :items="tenders"
                class="flex-grow-1 row-pointer"
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
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-h6">
              Информация из ЭТП
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                :headers="headers"
                :items="tenders"
                class="flex-grow-1 row-pointer"
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
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-card flat> </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-data-table
            :headers="headersCodes"
            :items="tenders"
            class="flex-grow-1 row-pointer"
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
          </v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-h6">
              Информация из ЕИС
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                :headers="headers"
                :items="tenders"
                class="flex-grow-1 row-pointer"
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
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-h6">
              Информация из ЭТП
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                :headers="headers"
                :items="tenders"
                class="flex-grow-1 row-pointer"
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
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-card flat> </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      tabs: [
        { text: 'Список позиций', id: 1, positions: [] },
        { text: 'Список лотов', id: 2, lots: [] },
        { text: 'Коды ОКПД2', id: 3, okpd2: [] },
        { text: 'Заказчики', id: 4, customers: [] }
      ],
      headers: [
        { text: '#', value: 'id' },
        { text: 'Наименование', value: 'name' },
        { text: 'Код', value: 'code' },
        { text: 'Количество', value: 'quantity' },
        { text: 'Цена', value: 'price' }
      ],
      headersCodes: [
        { text: 'Код', value: 'id' },
        { text: 'Наименование', value: 'name' }
      ],
      currentTender: null,
      favedTenders: []
    }
  },
  computed: {},
  methods: {}
}
</script>
<style>
.pointer {
  cursor: pointer;
}
</style>
