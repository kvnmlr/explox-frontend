<template>
  <Header>
    <v-navigation-drawer
      v-if="!($route.name === 'Landing') || user"
      class="elevation-0" v-bind:style="getStyle" :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer" fixed app>
      <v-list dense>
        <template v-for="item in items">
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
              <v-list-tile @click="" :to="{path: '/' + child.link}">
                <v-list-tile-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ child.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </div>
          </v-list-group>

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

    <v-toolbar style="z-index: 100; background-color: #343434"
               :clipped-left="$vuetify.breakpoint.lgAndUp" dense app dark color="#212121"
               v-if="!(user && !user.fullyRegistered)">
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon v-if="user || $route.name !== 'Landing'"
                             @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span v-if="user">
          <router-link to="/hub" class="hidden-sm-and-down brand">&nbsp;ExploX</router-link>
          <img src="@/assets/img/logo_white.png" style="margin-bottom: -5px;" height="25px;" v-on:click="$router.push('/hub')">
        </span>
        <span v-else>
          <router-link to="/" class="hidden-sm-and-down brand">&nbsp;ExploX</router-link>
          <img src="@/assets/img/logo_white.png"  style="margin-bottom: -5px;" height="25px;" v-on:click="$router.push('/')">
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-menu offset-y v-model="loginMenu" :close-on-content-click="false">
        <v-btn icon large slot="activator" dark>
          <v-avatar size="32px" tile round>
            <img v-if="user && user.strava" :src="user.strava.profile" style="border-radius: 50%;">
            <img v-else src="@/assets/img/logo_padded.png" style="border-radius: 50%;">
          </v-avatar>

        </v-btn>
        <p slot="activator" style="padding-top: 15px; margin-left: 20px" v-if="user">{{user.name}}</p>
        <p slot="activator" style="padding-top: 15px; margin-left: 20px" v-else>Login</p>

        <div style="background-color: white; padding:10px;">
          <log-in dense v-if="!user"
                  v-on:authorizeUser="() => {$emit('authorizeUser'); this.loginMenu=false}">
          </log-in>
          <v-list v-else>
            <v-list-tile v-on:click="() => {this.loginMenu=false; this.$router.push('/dashboard')}">
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-on:click="() => {$emit('logout'); this.loginMenu=false}">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </div>
      </v-menu>
    </v-toolbar>
  </Header>
</template>

<script>
  import LogIn from "../profile/LogIn";
  import {EventBus} from '@/eventBus.js';

  export default {
    components: {LogIn},
    data: () => ({
      editDialog: false,
      drawer: false,
      loginMenu: false,
      items: [
        {icon: 'dashboard', text: 'Hub', link: 'hub', loginOnly: false},
        {icon: 'person', text: 'Dashboard', link: 'dashboard', loginOnly: true},
        {
          loginOnly: true,
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Creator',
          model: true,
          children: [
            {icon: 'add', text: 'Create Route', link: 'creator'},
          ]
        },
        {icon: 'near_me', text: 'Route Finder', link: 'routes', loginOnly: false},
        {icon: 'flag', text: 'Analytics', link: 'analytics', loginOnly: true},
        {icon: 'flight_takeoff', text: 'Get Started', link: 'guide', loginOnly: false},
        {icon: 'chat_bubble', text: 'Send feedback', link: 'feedback', loginOnly: false},
        {icon: 'help', text: 'About', link: 'about', loginOnly: false},
      ]
    }),
    props: {
      source: String,
      user: Object
    },
    created() {
      this.drawer = this.$vuetify.breakpoint.lgAndUp;
      EventBus.$on('expandDrawer', () => {
        this.drawer = true;
      });
      EventBus.$on('collapseDrawer', () => {
        this.drawer = false;
      });
    },
    computed: {
      getStyle() {
        if (this.$vuetify.breakpoint.lgAndUp) {
          return {'z-index': 99, 'background-color': '#F5F5F5'};
        } else {
          return {'z-index': 101, 'background-color': '#F5F5F5'};
        }
      }
    }
  }
</script>

<style scoped>
  .spacer {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
