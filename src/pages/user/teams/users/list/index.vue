<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Сотрудники</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/owner/teams/users/invite">
        Пригласить сотрудника
      </v-btn>
    </div>
    <v-card>

      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loading"
        class="flex-grow-1"
      >
        <template v-slot:item.id="{ item }">
          <div class="font-weight-bold"># {{ item.id }}</div>
        </template>

        <template v-slot:item.first_name="{ item }">
          <div>{{ item.first_name }}</div>
        </template>

        <template v-slot:item.last_name="{ item }">
          <div>{{ item.last_name }}</div>
        </template>

        <template v-slot:item.email="{ item }">
          <div>{{ item.email }}</div>
        </template>

        <template v-slot:item.phone="{ item }">
          <div>{{ item.phone }}</div>
        </template>

        <template v-slot:item.blocked_at="{ item }">
          <div>{{ item.blocked_at | formatDate('lll') }}</div>
        </template>

        <template v-slot:item.created_at="{ item }">
          <div>{{ item.created_at | formatDate('lll') }}</div>
        </template>

        <template v-slot:item.action="{ item }">
          <div class="actions">
            <v-btn icon to="/users/edit"><!--//@TODO add user edit modal-->
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
            <v-btn icon :to="`/owner/teams/users/${item.id}/edit`"><!--//@TODO add user edit modal-->
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="toggleBlocked(item)"><!--//@TODO add user edit modal-->
              <v-icon>mdi-account-cancel</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { getTeamUsersList, blockUnblockUser } from '@/configs/api'
import { mapState } from 'vuex'

export default {
  data: () => ({
    loading: false,
    breadcrumbs: [{
      text: 'Организации',
      disabled: false,
      href: '/owner/teams'
    },
    {
      text: 'Сотрудники'
    }],

    headers: [
      { text: 'Id', align: 'left', value: 'id' },
      { text: 'Имя', align: 'left', value: 'first_name' },
      { text: 'Фамилия', align: 'left', value: 'last_name' },
      { text: 'Email', align: 'left', value: 'email' },
      { text: 'Телефон', align: 'left', value: 'phone' },
      { text: 'Заблокирован', value: 'blocked_at' },
      { text: 'Зарегистрирован', value: 'created_at' },
      { text: '', sortable: false, align: 'right', value: 'action' }
    ],
    users: [],
    show: false,
    permissions: []
  }),
  computed: {
    ...mapState('app',[
      'user'
    ])
  },
  async created() {

    try {
      const rsp = await getTeamUsersList(this.user.team_id)

      this.users = rsp.data.data
    } catch (err) {
      this.$notify({
        type: 'error',
        text: 'Не удалось загрузить сотрудников',
        title: 'Ошибка!'
      })
    }
  },
  methods: {
    inviteUser() {},
    openInviteUserModal() {
      this.show = true
    },
    async toggleBlocked(user) {
      const phrase = user.blocked_at ? 'Разблокирован' : 'Заблокирован'

      try {
        const res = await blockUnblockUser(user.team_id, user.id, { blocked: user.blocked_at ? false : true })
        const resData = res.data.data

        this.users = this.users.map((item) => {
          if (item.id === user.id) {
            item.blocked_at = resData.blocked_at
          }

          return item
        })
        this.$notify({
          type: 'success',
          title: 'Успех!',
          text: 'Пользователь успешно ' + phrase
        })
      } catch (err) {
        this.$notify({
          type: 'error',
          title: 'Ошибка!',
          text: 'Пользователь не ' + phrase
        })
      }
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