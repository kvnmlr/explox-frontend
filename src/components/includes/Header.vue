<template>
  <Header>
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
      <v-list dense>
        <template v-for="item in items">

          <!-- List of existing items -->
          <router-link :to="{path: '/' + item.link}">
            <v-list-group class="spacer" v-if="item.children" v-model="item.model"
                          :key="item.text"
                          :prepend-icon="item.model ? item.icon : item['icon-alt']"
                          append-icon="">

              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>
                    <b>{{ item.text }}</b>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="(child, i) in item.children" :key="i" @click="">
                <v-list-tile-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ child.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>

            <!-- Normal items -->
            <v-list-tile v-else :key="item.text" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>

                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>

        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">
          <router-link to="/" class="brand">ExploX</router-link>
        </span>
      </v-toolbar-title>
      <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search"
                    class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify">
        </v-avatar>
      </v-btn>
      <h2 v-if="user !== undefined">{{user.name}}</h2>
    </v-toolbar>
  </Header>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        {icon: 'contacts', text: 'Hub', link: 'hub'},
        {icon: 'contacts', text: 'Dashboard', link: 'user'},
        {icon: 'contacts', text: 'Routes', link: 'routes'},
        {icon: 'contacts', text: 'Route Finder', link: 'explore'},
        {icon: 'history', text: 'Analytics', link: 'analytics'},
        {icon: 'content_copy', text: 'Athletes', link: 'athletes'},
        {icon: 'content_copy', text: 'Get Started', link: 'guide'},
        {icon: 'content_copy', text: 'About', link: 'about'},

        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          link: '',
          text: 'Creator',
          model: true,
          children: [
            {icon: 'add', text: 'Create Route'},
            {icon: 'add', text: 'Create Activity'},
            {icon: 'add', text: 'Create Plan'}
          ]
        },
        {icon: 'settings', text: 'Settings', link: 'settings'},
        {icon: 'chat_bubble', text: 'Send feedback', link: 'feedback'},
        {icon: 'phonelink', text: 'App downloads', link: 'apps'},
      ]
    }),
    props: {
      source: String,
      user: Object
    }

  }
</script>

<style scoped>
  .spacer {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
