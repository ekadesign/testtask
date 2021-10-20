<template>
  <div>
    <v-card class="text-center pa-1">
      <v-card-title class="justify-center display-1 mb-2">Добро пожаловать</v-card-title>
      <v-card-subtitle>Войдите в свой аккаунт</v-card-subtitle>

      <!-- sign in form -->
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="[rules.required]"
            :validate-on-blur="false"
            :error="errors.email"
            :error-messages="errorMessages.email"
            :label="$t('login.email')"
            name="email"
            outlined
            @keyup.enter="submit"
            @change="resetError('email')"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPassword ? 'text' : 'password'"
            :error="errors.password"
            :error-messages="errorMessages.password"
            :label="$t('login.password')"
            name="password"
            outlined
            @change="resetError('password')"
            @keyup.enter="submit"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn
            :loading="loading"
            :disabled="loading"
            block
            x-large
            color="primary"
            @click="submit"
          >{{ $t('login.button') }}</v-btn>
          <div class="mt-5">
            <router-link to="/auth/forgot-password">
              {{ $t('login.forgot') }}
            </router-link>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <div class="text-center mt-6">
      {{ $t('login.noaccount') }}
      <router-link to="/auth/register" class="font-weight-bold">
        {{ $t('login.create') }}
      </router-link>
    </div>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Sign In Page Component
|---------------------------------------------------------------------
|
| Sign in template for user authentication into the application
|
*/
import { login } from '@/configs/api'

export default {
  data() {
    return {
      // sign in buttons
      loading: false,

      // form
      isFormValid: true,
      email: '',
      password: '',

      errors: {
        email: false,
        password: false
      },

      errorMessages: {
        email: '',
        password: ''
      },
      // show password field
      showPassword: false,

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Обязательное поле'
      }
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.signIn(this.email, this.password)
      }
    },
    async signIn(email, password) {
      this.loading = true
      try {
        const { data: { data: { access_token } } } = (await login({ email, password }))

        localStorage.setItem('token', 'Bearer ' + access_token)

        await this.$router.push('/')
      } catch (err) {
        const errorCodes = [400, 422, 401]

        const status = err.response?.status

        if (errorCodes.includes(status)) {
          this.$notify({
            title: 'Ошибка',
            text: 'Пользователь не существует или учетная запись неактивна!',
            type: 'error'
          })

          return 
        }
        const errors = err.response?.data

        this.highLightErrors(errors)
      } finally {
        this.loading = false
      }
    },
    highLightErrors(error) {
      if (!error) return
      for (const err in error.errors) {
        this.errors[err] = true
        this.errorMessages[err] = error.errors[err]
      }
    },

    signInProvider(provider) {},
    resetError(err) {
      this.errors[err] = false
      this.errorMessages[err] = ''
    }
  }
}
</script>
