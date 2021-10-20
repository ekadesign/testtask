<template>
  <v-menu offset-y left transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-badge
        bordered
        :value="notifications.length"
        :content="notifications.length"
        offset-x="22"
        offset-y="22"
      >
        <v-btn icon v-on="on">
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
      </v-badge>
    </template>

    <!-- dropdown card -->
    <v-card>
      <v-list three-line dense max-width="400">
        <v-subheader class="pa-2 font-weight-bold">Notifications</v-subheader>
        <div v-for="(item, index) in notifications" :key="index">
          <v-divider v-if="index > 0 && index < notifications.length" inset></v-divider>

          <v-list-item @click="markAsRead(item)">
            <v-list-item-avatar size="32" :color="item.color">
              <v-icon dark small>{{ item.icon }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle class="caption" v-text="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="align-self-center">
              <v-list-item-action-text >{{ item.time | fromNow }} </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
        </div>
      </v-list>

      <div class="text-center py-2">
        <v-btn small @click="markAllAsRead">Прочесть все</v-btn>
      </div>
    </v-card>
  </v-menu>
</template>

<script>
/*
|---------------------------------------------------------------------
| Toolbar Notifications Component
|---------------------------------------------------------------------
|
| Quickmenu to check out notifications
|
*/
import { mapState } from 'vuex'
import { getNotifications, markAsRead, markAllAsRead } from '@/configs/api'

export default {
  data() {
    return {
      notifications: []
    }
  },
  async mounted() {
    await this.$store.dispatch('app/getUser')
    const res = await getNotifications(this.user.id)

    this.notifications = res.data.data.map((n) => {
      return {
        id: n.id,
        title: n.message,
        subtitle: n.message,
        icon: null,
        color: n.type,
        time: n.created_at
      }
    })
  },
  computed: {
    ...mapState('app',[
      'user'
    ])
  },
  methods: {
    async markAsRead(notification) {

      try {
        await markAsRead(this.user.id, notification.id)
      } catch (err) {
        console.info(err)
      } finally {
        this.notifications = this.notifications.filter((item) => item.id !== notification.id)
      }
    },
    async markAllAsRead() {

      try {
        await markAllAsRead(this.user.id)
      } catch (err) {
        console.info(err)
      } finally {
        this.notifications = this.notifications.filter(() => false)
      }
    }
  }
}
</script>
