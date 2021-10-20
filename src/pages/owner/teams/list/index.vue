<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Организации</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="showCreateModal()">
        Создать организацию
      </v-btn>
    </div>

    <v-card class="my-4">
      <v-card-title>
        Основная организация
      </v-card-title>
      <v-card-text>
        <v-col><p><strong>ИНН:</strong> {{ this.mainOrganization.inn }}</p></v-col>
        <v-col><p><strong>Создана:</strong> {{ this.mainOrganization.created_at | formatDate('lll') }}</p></v-col>
      </v-card-text>
    </v-card>

    <v-card>

      <v-data-table
        :headers="headers"
        :items="organizations"
        :loading="loading"
        class="flex-grow-1"
      >
        <template v-slot:item.id="{ item }">
          <div class="font-weight-bold"># {{ item.id }}</div>
        </template>

        <template v-slot:item.name="{ item }">
          <div class="d-flex align-center py-1">
            {{ item.name }}
          </div>
        </template>

        <template v-slot:item.inn="{ item }">
          <div class="d-flex align-center py-1">
            {{ item.inn }}
          </div>
        </template>

        <template v-slot:item.created_at="{ item }">
          <div>{{ item.created_at | formatDate('lll') }}</div>
        </template>

      </v-data-table>
    </v-card>
    <CreateModal :show="show" @cancel="show=false" @save="saveNewTeam($event)"></CreateModal>
  </div>
</template>

<script>
import { createTeam, getOrganizationsList } from '@/configs/api'
import CreateModal from '@/pages/owner/teams/create/CreateModal'
import { mapState } from 'vuex'
export default {
  components: {
    CreateModal
  },
  data() {
    return {
      loading: false,
      breadcrumbs: [{
        text: 'Организации',
        disabled: false,
        href: '#'
      }, {
        text: 'Список'
      }],

      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Название организации', align: 'left', value: 'name' },
        { text: 'ИНН', align: 'left', value: 'inn' },
        { text: 'Зарегистрирован', value: 'created_at' },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ],
      organizations: [],
      mainOrganization: {
        inn: null,
        created_at: null
      },
      show: false
    }
  },
  computed: {
    ...mapState('app',[
      'user'
    ])
  },
  async mounted() {
    this.loading = true
    await this.$store.dispatch('app/getUser')

    try {
      const organizations = await getOrganizationsList(this.user.team_id)

      this.mainOrganization = organizations.data
      this.organizations = organizations.data.children

    } catch (err) {
      console.info(err)
    } finally {
      this.loading = false
    }
  },
  methods: {
    showCreateModal() {
      this.show = true
    },
    async saveNewTeam(payload) {
      this.show = false
      try {
        const rsp = await createTeam(payload)

        this.organizations.push(rsp.data.data)
        this.$notify({
          type: 'success',
          title: 'Успех!',
          text: 'Организация успешно создана'
        })
      } catch (err) {
        console.info()
        this.$notify({
          type: 'error',
          title: 'Ошибка!',
          text: err.response.data.message
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
