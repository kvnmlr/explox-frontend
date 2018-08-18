<template>
  <Header>
    <v-navigation-drawer class="elevation-8" style="z-index: 990;" :clipped="$vuetify.breakpoint.lgAndUp"
                         v-model="drawer" fixed app>
      <v-list dense>
        <template v-for="item in items">

          <!-- List of existing items -->
          <v-list-group class="spacer" v-if="item.children && (!item.loginOnly || user)"
                        v-model="item.model"
                        :key="item.text"
                        :prepend-icon="item.model ? item.icon : item['icon-alt']"
                        append-icon=""
                        style="margin-bottom: 20px;">

            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  <b>{{ item.text }}</b>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <div v-for="(child, i) in item.children" :key="i">
              <router-link :to="{path: '/' + child.link}">
                <v-list-tile @click="">
                  <v-list-tile-action v-if="child.icon">
                    <v-icon>{{ child.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ child.text }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </router-link>
            </div>
          </v-list-group>

          <!-- Normal items -->

          <v-list-tile v-else-if="!item.loginOnly || user" :key="item.text" @click="" :to="{path: '/' + item.link}">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="gradient-no-switch gradient-secondary" style="z-index: 980;"
               :clipped-left="$vuetify.breakpoint.lgAndUp" dense app dark color="#212121">
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">
          <router-link to="/" class="brand">ExploX</router-link>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-menu offset-y v-model="loginMenu" :close-on-content-click="false">
        <v-btn icon large slot="activator" dark>
          <v-avatar size="32px" tile>
            <img src="@/assets/img/profile.png">
          </v-avatar>
        </v-btn>
        <div style="background-color: white; padding:10px;">
          <log-in v-if="!user"
                  v-on:authorizeUser="() => {$emit('authorizeUser'); this.loginMenu=false}">
          </log-in>
          <v-list v-else>
            <v-list-tile v-on:click="() => {$emit('logout'); this.loginMenu=false}">
              <v-list-tile-title>LOGOUT</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </div>
      </v-menu>
      <p v-if="user !== undefined">{{user.name}}</p>
    </v-toolbar>
  </Header>
</template>

<script>
  import LogIn from "../profile/LogIn";

  export default {
    components: {LogIn},
    data: () => ({
      editDialog: false,
      drawer: true,
      loginMenu: false,
      items: [
        {icon: 'dashboard', text: 'Hub', link: 'hub', loginOnly: false},
        {icon: 'show_chart', text: 'Dashboard', link: 'dashboard', loginOnly: true},
        {icon: 'near_me', text: 'Route Finder', link: 'routes', loginOnly: false},
        {icon: 'flag', text: 'Analytics', link: 'analytics', loginOnly: true},
        {icon: 'flight_takeoff', text: 'Get Started', link: 'guide', loginOnly: false},
        {
          loginOnly: true,
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Creator',
          model: true,
          children: [
            {icon: 'add', text: 'Create Route', link: 'creator'},
            {icon: 'add', text: 'Create Activity', link: 'creator'},
          ]
        },
        {icon: 'chat_bubble', text: 'Send feedback', link: 'feedback', loginOnly: false},
        {icon: 'help', text: 'About', link: 'about', loginOnly: false},
      ]
    }),
    props: {
      source: String,
      user: Object
    },
    created() {
      this.drawer = true;
    }

  }
</script>

<style scoped>
  .spacer {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
