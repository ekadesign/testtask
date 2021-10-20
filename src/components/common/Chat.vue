<template>
  <v-card>
    <v-card-title>
      Сообщения
    </v-card-title>
    <v-card-text>
      <v-divider></v-divider>
      <v-sheet height="400px">
        <!-- channel messages -->
        <div class="channel-page">
          <div id="messages" ref="messages" class="messages mx-2">
            <transition-group name="list">
              <ChannelMessage
                v-for="message in messages"
                :key="message.id"
                :message="message"
                :user="user"
                class="my-4 d-flex"
              />
            </transition-group>
          </div>

          <div class="input-box pa-2">
            <InputBox @send-message="sendMessage" />
          </div>
        </div>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  components: {
    ChannelMessage: () => import('./ChannelMessage'),
    InputBox: () => import('./InputBox')
  },
  props: [
    'messages', 'user'
  ],
  methods: {
    sendMessage(event) {
      this.$emit('send-message', event)
    }
  }
}
</script>

<style lang="scss" scoped>
// List Transition Animation
.list-enter-active {
  transition: all 0.3s;
}

.list-move {
  transition: transform 0.3s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
// -- End List Transition Animation

.channel-page {
  position: absolute;
  top: 65px;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: url("https://lux-admin-pro.indielayer.com/images/chat/chat-bg-2.png");

  .messages {
    flex-grow: 1;
    margin-bottom: 68px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    min-height: 0;
  }

  .input-box {
    position: fixed;
    bottom: 12px;
    width: 100%;
  }

  .messages {
    padding-bottom: 0px;
  }

  .input-box {
    position: absolute;
    bottom: 12px;
  }
}

.theme--dark {
  .channel-page {
    background: none;
  }
}
</style>