<template>
  <div>
    <notifications position="bottom right" />
    <!-- Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      app
      floating
      class="elevation-1"
      :right="$vuetify.rtl"
      :light="menuTheme === 'light'"
      :dark="menuTheme === 'dark'"
    >
      <!-- Navigation menu info -->
      <template v-slot:prepend>
        <div class="pa-2">
          <div class="title font-weight-bold text-uppercase primary--text">{{ product.name }}</div>
          <div class="overline grey--text">{{ product.version }}</div>
        </div>
      </template>

      <!-- Navigation menu -->
      <div class="d-flex flex-grow-1 align-center pl-2"><h1>default</h1></div>
      <main-menu :menu="menuDefault.menu"/>
      <v-divider></v-divider>

      <!-- Navigation menu footer -->
      <template v-slot:append>
        <!-- Footer navigation links -->
        <div class="pa-1 text-center">
          <v-btn
            v-for="(item, index) in menuDefault.footer"
            :key="index"
            :href="item.href"
            :target="item.target"
            small
            text
          >
            {{ item.key ? $t(item.key) : item.text }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-app-bar
      app
      :color="isToolbarDetached ? 'surface' : undefined"
      :flat="isToolbarDetached"
      :light="toolbarTheme === 'light'"
      :dark="toolbarTheme === 'dark'"
    >
      <v-card
        class="flex-grow-1 d-flex"
        :class="[isToolbarDetached ? 'pa-1 mt-3 mx-1' : 'pa-0 ma-0']"
        :flat="!isToolbarDetached"
      >
        <div class="d-flex flex-grow-1 align-center">

          <div class="d-flex mr-4"><img src="https://via.placeholder.com/200x50"></div>

          <div class="d-flex flex-grow-1 align-center">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-spacer class="d-none d-lg-block"></v-spacer>

            <v-spacer class="d-block d-sm-none"></v-spacer>

            <div :class="[$vuetify.rtl ? 'ml-1' : 'mr-1']">
              <toolbar-notifications/>
            </div>

            <toolbar-user/>
          </div>
        </div>
      </v-card>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" :fluid="!isContentBoxed">
        <v-layout>
          <slot></slot>
        </v-layout>
      </v-container>

      <v-footer app inset>
        <v-spacer></v-spacer>
        <div class="overline">
          <p>v 1.0</p>
        </div>
      </v-footer>
    </v-main>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// navigation menu configurations
import config from '../configs'

import MainMenu from '../components/navigation/MainMenu'
import ToolbarUser from '../components/toolbar/ToolbarUser'
import ToolbarNotifications from '../components/toolbar/ToolbarNotifications'

export default {
  components: {
    MainMenu,
    ToolbarUser,
    ToolbarNotifications
  },
  data() {
    return {
      drawer: null,
      showSearch: false,
      role: null,
      menuDefault: []
    }
  },
  created() {
    this.role = localStorage.getItem('role')
    this.menuDefault = config[this.role].menu
  },
  computed: {
    ...mapState('app', ['product', 'isContentBoxed', 'menuTheme', 'toolbarTheme', 'isToolbarDetached'])
  }
}
</script>
