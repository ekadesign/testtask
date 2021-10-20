<template>
  <v-container fluid>
    <v-card :loading="loading">
      <v-card-title>
        Профиль
      </v-card-title>
      <v-card-text>
        <div>
          <v-row>
            <v-col cols="6" class="py-0">
              <span class="mr-2">id</span>
            </v-col>
            <v-col cols="6" class="py-0">
              <span>{{ user.id }}</span>
            </v-col>
          </v-row>
          <v-col>
            <v-divider></v-divider>
          </v-col>
        </div>
        <div>
          <v-row>
            <v-col cols="6" class="py-0">
              <span class="mr-2">email</span>
            </v-col>
            <v-col cols="6" class="py-0">
              <span>{{ user.email }}</span>
            </v-col>
          </v-row>
          <v-col>
            <v-divider></v-divider>
          </v-col>
        </div>
        <div>
          <v-row>
            <v-col cols="6" class="py-0">
              <span class="mr-2">Фамилия</span>
            </v-col>
            <v-col cols="6" class="py-0">
              <span>{{ user.last_name }}</span>
            </v-col>
          </v-row>
          <v-col>
            <v-divider></v-divider>
          </v-col>
        </div>
        <div>
          <v-row>
            <v-col cols="6" class="py-0">
              <span class="mr-2">Имя</span>
            </v-col>
            <v-col cols="6" class="py-0">
              <span>{{ user.fist_name }}</span>
            </v-col>
          </v-row>
          <v-col>
            <v-divider></v-divider>
          </v-col>
        </div>
        <div>
          <v-row>
            <v-col cols="6" class="py-0">
              <span class="mr-2">Роль</span>
            </v-col>
            <v-col cols="6" class="py-0">
              <span>{{ getRole }}</span>
            </v-col>
          </v-row>
          <v-col>
            <v-divider></v-divider>
          </v-col>
        </div>
        <div>
          <v-row>
            <v-col cols="6" class="py-0">
              <span class="mr-2">Дата создания аккаунта</span>
            </v-col>
            <v-col cols="6" class="py-0">
              <span>{{ user.created_at | formatDate('lll') }}</span>
            </v-col>
          </v-row>
          <v-col>
            <v-divider></v-divider>
          </v-col>
        </div>
        <div>
          <v-col cols="12">
            <v-row justify="space-around">
              <v-col>
                <v-text-field v-model="password" outlined placeholder="Новый пароль"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field v-model="passwordConfirm" outlined placeholder="Повторите пароль"></v-text-field>
              </v-col>
              <v-col>
                <v-btn
                  block
                  x-large
                  depressed
                  color="primary"
                  @click="updatePassword"
                >Сохранить</v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-divider></v-divider>
          </v-col>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import { updatePassword } from '@/configs/api'

export default {
  computed:{
    ...mapState('app',[
      'user'
    ]),
    getRole() {
      return this.user.role?.title
    }
  },
  data: () => ({
    loading: false,
    password: null,
    passwordConfirm: null
  }),
  async mounted() {
    this.loading = true
    try {
      await this.$store.dispatch('app/getUser')
    } catch (err) {
      console.info(err)
    } finally {
      this.loading = false
    }
  },
  methods: {
    async updatePassword() {
      const payload = {
        password: this.password,
        'password-confirm': this.passwordConfirm
      }
      const rsp = (await updatePassword(payload)).data.data

      console.info({ rsp })
    }
  }
}
</script>