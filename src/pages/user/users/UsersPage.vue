<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Пользователи</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <!--      <v-btn color="primary">-->
      <!--        Create User-->
      <!--      </v-btn>-->
    </div>

    <v-card>

      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loading"
        class="flex-grow-1"
      >
        <template v-slot:item.id="{ item }">
          <div class="font-weight-bold"># <copy-label :text="item.id + ''" /></div>
        </template>

        <template v-slot:item.email="{ item }">
          <div class="d-flex align-center py-1">
            <div class="ml-1 caption font-weight-bold">
              <copy-label :text="item.email" />
            </div>
          </div>
        </template>

        <template v-slot:item.name="{ item }">
          <div class="d-flex align-center py-1">
            {{ getName(item) }}
          </div>
        </template>

        <template v-slot:item.status="{ item }">
          <v-icon v-if="item.status === statusesAliases.APPROVE_STATUS" small color="success">
            mdi-check-circle
          </v-icon>
          <v-icon v-if="item.status === statusesAliases.NEW_STATUS" small color="primary">
            mdi-circle-outline
          </v-icon>
          <v-icon v-if="item.status === statusesAliases.REJECT_STATUS" small color="error">
            mdi-close-circle
          </v-icon>
        </template>

        <template v-slot:item.role="{ item }">
          <v-chip
            label
            small
            class="font-weight-bold"
            :color="item.role === 'ADMIN' ? 'primary' : undefined"
          >{{ item.role | capitalize }}</v-chip>
        </template>

        <template v-slot:item.team="{ item }">
          <div>{{ getTeamName(item) }}</div>
        </template>
        <template v-slot:item.created_at="{ item }">
          <div>{{ item.created_at | formatDate('lll') }}</div>
        </template>

        <template v-slot:item.updated_at="{ item }">
          <div>{{ item.updated_at | formatDate('lll') }}</div>
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
import CopyLabel from '@/components/common/CopyLabel'
import { getUsersList } from '@/pages/users/api'
export default {
  components: {
    CopyLabel
  },
  data() {
    return {
      statusesAliases: {
        NEW_STATUS: 'new',
        APPROVE_STATUS: 'approve',
        REJECT_STATUS: 'reject'
      },
      statuses: [
        { text: 'Новый', value: 'new' },
        { text: 'Подтвержден', value: 'approve' },
        { text: 'Отклонен', value: 'reject' }
      ],
      loading: false,
      breadcrumbs: [{
        text: 'Пользователи',
        disabled: false,
        href: '#'
      }, {
        text: 'Список'
      }],

      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Email', value: 'email' },
        { text: 'Имя', align: 'left', value: 'name' },
        { text: 'Организация', value: 'team' },
        { text: 'Зарегистрирован', value: 'created_at' },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ],
      users: []
    }
  },
  async mounted() {
    this.loading = true
    try {
      const users = await getUsersList()

      this.users = users

    } catch (err) {
      console.info(err)
    } finally {
      this.loading = false
    }
  },
  methods: {
    getName(user) {
      return user.first_name && user.lastName ? `${user.first_name} ${user.lastName}` : 'Не указано'
    },
    getTeamName(user) {
      return user.team?.name
    },
    searchUser() {},
    open() {}
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
