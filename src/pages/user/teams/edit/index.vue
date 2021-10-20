<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Пользователи</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
    </div>
    <v-card>
      <v-card-title>
        Редактировать сотрудника
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="first_name" placeholder="Имя"></v-text-field>
        <v-text-field v-model="last_name" placeholder="Фамилия"></v-text-field>
        <v-text-field v-model="email" placeholder="Email"></v-text-field>
        <v-text-field v-model="phone" v-mask="'+7(###)###-##-##'" placeholder="Телефон"></v-text-field>
        <v-text-field v-model="about" placeholder="О сотруднике"></v-text-field>
        <div v-for="permission in permissionsList" :key="permission.id">
          <v-checkbox v-model="permission.isActive" :label="permission.label" color="primary"></v-checkbox>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="clear()">clear</v-btn>
        <v-btn @click="save()">save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { getPermissionList, getTeamUser, updateTeamUser } from '@/configs/api'
import { mapState } from 'vuex'

export default {
  data: () => ({
    breadcrumbs: [{
      text: 'Организации',
      disabled: false,
      href: '/owner/teams'
    },
    {
      text: 'Сотрудники',
      disabled: false,
      href: '/owner/teams/users'
    },
    {
      text: 'Пригласить пользователя'
    }],
    email: null,
    first_name: null,
    last_name: null,
    phone: null,
    about: null,
    permissions: [],
    permissionsList: []
  }),
  computed: {
    ...mapState('app',[
      'user'
    ])
  },
  async mounted() {

    try {
      const teamUser = await getTeamUser(this.user.team_id, this.$route.params.id)
      const permissions = await getPermissionList()
      const permissionData = await permissions.data.data.map((item) => {
        item.isActive = false
        item.label = item.title
        item.id = item.name

        return item
      })

      await this.spreadUser(teamUser.data.data, permissionData)

    } catch (err) {
      console.info(err)
    }
  },
  methods: {
    spreadUser(teamUser, permissions) {
      this.first_name = teamUser.first_name
      this.last_name = teamUser.last_name
      this.about = teamUser.about
      this.email = teamUser.email
      this.phone = teamUser.phone

      this.permissionsList = permissions.map((item) => {
        if (teamUser.permissions.includes(item.id)) {
          item.isActive = true
        }

        return item
      })
    },
    async save() {
      const payload = {
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        phone: this.phone.replace(/[^\d]/g, ''),
        about: this.about,
        permissions: this.permissionsList.filter((item) => item.isActive).map((item) => item.id) || []
      }

      try {

        await updateTeamUser(this.user.team_id, this.$route.params.id, payload)
        this.$notify({
          text: 'Данные сотрудника успешно обновлены',
          type: 'success',
          title: 'Успех!'
        })
        this.$router.push('/owner/teams/users/list')
      } catch (err) {
        this.$notify({
          text: err.response.data.message,
          type: 'error',
          title: 'Ошибка!'
        })
      }

    },
    clear() {
      this.email = null
      this.first_name = null
      this.last_name = null
      this.phone = null
      this.about = null
      this.permissionsList = this.permissionsList.map((item) => {
        item.isActive = false

        return item
      })
    }
  }
}
</script>