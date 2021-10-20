<template>
  <div class="d-flex flex-grow-1" :class="{ 'flex-row-reverse': isOwnMessage}">
    <UserAvatar :user="message.author" />

    <div class="mx-2">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-card
            class="pa-1"
            :class="{ 'primary darken-1': isOwnMessage}"
            :dark="isOwnMessage"
            v-bind="attrs"
            v-on="on"
          >
            <div>{{ isOwnMessage ? '' : message.author.email }}</div>
            <div class="font-weight-bold">{{ message.message }}</div>
          </v-card>
        </template>
        <span>{{ message.created_at | formatDate('lll') }}</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Channel Message Component
|---------------------------------------------------------------------
|
| Display messages in channel with user information and timestamp
|
*/

export default {
  components: {
    UserAvatar: () => import('./UserAvatar')
  },
  props: {
    // Current logged user
    user: {
      type: Object,
      default: () => {}
    },
    // Message to display
    message: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // Check if it's a message from the logged user
    isOwnMessage() {
      return this.user.id === this.message.created_by
    }
  }
}
</script>
