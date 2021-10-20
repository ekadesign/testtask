<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Архив тарифов</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
    </div>

    <v-card>
      <!-- users list -->
      <v-row dense class="pa-2 align-center">
        <v-col cols="6">
          <v-menu offset-y left>
            <template v-slot:activator="{ on }">
              <transition name="slide-fade" mode="out-in">
                <v-btn v-show="selectedUsers.length > 0" v-on="on">
                  Actions
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </transition>
            </template>
            <v-list dense>
              <v-list-item @click>
                <v-list-item-title>Verify</v-list-item-title>
              </v-list-item>
              <v-list-item @click>
                <v-list-item-title>Disable</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click>
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

        </v-col>
        <v-col cols="6" class="d-flex text-right align-center">
          <v-text-field
            v-model="searchQuery"
            append-icon="mdi-magnify"
            class="flex-grow-1 mr-md-2"
            solo
            hide-details
            dense
            clearable
            placeholder="e.g. filter for id, email, name, etc"
            @keyup.enter="searchUser(searchQuery)"
          ></v-text-field>
          <v-btn
            :loading="isLoading"
            icon
            small
            class="ml-2"
            @click
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        v-model="selectedUsers"
        show-select
        :headers="headers"
        :items="subscriptions"
        :search="searchQuery"
        class="flex-grow-1"
      >
        <template v-slot:item.id="{ item }">
          <div class="font-weight-bold">#
            <copy-label :text="item.id + ''"/>
          </div>
        </template>

        <template v-slot:item.status="{ item }">
          <div class="d-flex align-center py-1">
            <v-alert :color="item.status === 'Текущий' ? 'success' : 'grey'" dark class="white--text">{{ item.status }}</v-alert>
          </div>
        </template>

        <template v-slot:item.team_limit="{ item }">
          <span class="font-weight-bold">{{ item.team_limit }}</span> <v-icon color="grey" size="14">mdi-account</v-icon>
        </template>

        <template v-slot:item.start_at="{ item }">
          {{ item.start_at | formatDate('DD.MM.YYYY') }}
        </template>

        <template v-slot:item.end_at="{ item }">
          {{ item.end_at | formatDate('DD.MM.YYYY') }}
        </template>

        <template v-slot:item.action="{ }">
          <div class="actions">
            <v-btn icon to="/users/edit">
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import subscriptions from '@/fixtures/subscription/hitstory/list'
import CopyLabel from '@/components/common/CopyLabel'

export default {
  components: {
    CopyLabel
  },
  data() {
    return {
      isLoading: false,
      breadcrumbs: [{
        text: 'Тарифы',
        disabled: false,
        href: '#'
      }, {
        text: 'Архив'
      }],

      searchQuery: '',
      selectedUsers: [],
      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Статус', value: 'status' },
        { text: 'Тариф', value: 'name' },
        { text: 'Лимит', value: 'team_limit' },
        { text: 'Начало действия', value: 'start_at' },
        { text: 'Окончание действия', value: 'end_at' },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ],

      subscriptions
    }
  },
  watch: {
    selectedUsers(val) {

    }
  },
  methods: {
    searchUser() {
    },
    open() {
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
