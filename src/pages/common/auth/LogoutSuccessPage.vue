<template>
  <v-container>
    <v-card>
      <v-card-title>Вы успешно вышли</v-card-title>
      <v-card-text>
        <p>Для входа нажмите логин</p>
        <v-row justify="center">
          <v-btn :to="{name: 'auth-login'}" x-large depressed color="primary">Логин</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>