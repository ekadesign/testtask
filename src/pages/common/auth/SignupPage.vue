<template>
  <div>
    <v-card class="text-center pa-1">
      <v-card-title class="justify-center display-1 mb-2">{{ $t('register.title') }}</v-card-title>
      <v-card-subtitle>Пожалуйста, зарегистрируйтесь</v-card-subtitle>

      <!-- sign up form -->
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="[rules.required]"
            :validate-on-blur="false"
            :error="errors.name"
            :error-messages="errorMessages.name"
            label="Имя"
            name="name"
            outlined
            @keyup.enter="submit"
            @input="resetError('name')"
          ></v-text-field>
          <v-text-field
            v-model="phone"
            v-mask="'+7(###)###-##-##'"
            :rules="[rules.required]"
            :validate-on-blur="false"
            :error="errors.phone"
            :error-messages="errorMessages.phone"
            label="Телефон"
            name="phone"
            outlined
            @keyup.enter="submit"
            @input="resetError('phone')"
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="[rules.required]"
            :validate-on-blur="false"
            :error="errors.email"
            :error-messages="errorMessages.email"
            :label="$t('register.email')"
            name="email"
            outlined
            @keyup.enter="submit"
            @input="resetError('email')"
          ></v-text-field>

          <v-text-field
            v-model="inn"
            :rules="[rules.required]"
            :validate-on-blur="false"
            :error="errors.inn"
            :error-messages="errorMessages.inn"
            label="ИНН"
            name="email"
            outlined
            @keyup.enter="submit"
            @input="resetError('inn')"
          ></v-text-field>

          <v-btn
            :loading="isLoading"
            :disabled="isSignUpDisabled"
            block
            x-large
            color="primary"
            @click="submit"
          >{{ $t('register.button') }}</v-btn>

          <div class="mt-5 overline">
            {{ $t('register.agree') }}
            <br />
            <router-link to="">{{ $t('common.tos') }}</router-link>
            &
            <router-link to="">{{ $t('common.policy') }}</router-link>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <div class="text-center mt-6">
      {{ $t('register.account') }}
      <router-link to="/auth/login" class="font-weight-bold">
        {{ $t('register.signin') }}
      </router-link>
    </div>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Sign Up Page Component
|---------------------------------------------------------------------
|
| Template for user sign up with external providers buttons
|
*/
import { register } from '@/configs/api'

export default {
  data() {
    return {
      // sign up buttons
      isLoading: false,
      isSignUpDisabled: false,

      // form
      isFormValid: true,
      email: '',
      name: '',
      inn: '',
      phone: '',

      // form error
      errors: {
        phone: false,
        email: false,
        inn: false,
        name: false
      },
      errorMessages: {
        phone: '',
        email: '',
        inn: '',
        name: ''
      },
      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Обязательное поле'
      }
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.isSignUpDisabled = true
        const payload = {
          phone: this.phone.replace(/[^\d]/g, ''),
          inn: this.inn,
          email: this.email,
          name: this.name
        }

        this.signUp(payload)
      }
    },
    async signUp(payload) {
      try {
        await register(payload)
        this.$router.push({ name: 'registration-success' })
      } catch (err) {
        const errors = err.response.data

        this.highLightErrors(errors)
        this.isSignUpDisabled = false
      }
      this.isLoading = false
    },
    highLightErrors(error) {
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
