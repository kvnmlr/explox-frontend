<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm7 md7>
        <div v-for="item in news.slice(0, 3)" :key="item.headline" >
          <v-card class="gradient-no-switch gradient-green">
            <v-card-title primary class="title">
              <v-icon>message</v-icon>&nbsp;{{ item.headline }}
            </v-card-title>
            <v-card-text>{{ item.body }}</v-card-text>
          </v-card>
          <br>
        </div>
      </v-flex>
      <v-flex class="hidden-sm-and-down" md5 style="padding-left:20px;">
        <img v-if="news.length > 1" style="width:100%" src="@/assets/img/bicycle-bike-black-and-white.jpg"
             class="elevation-5">
        <img v-else style="width:100%" src="@/assets/img/action-adventure-bicycle.jpg" class="elevation-5">

      </v-flex>
    </v-layout>
    <v-layout column wrap>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "News",
    data: () => ({
      news: [
        {
          headline: "Headline",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at pulvinar sapien, nec interdum velit. Duis nisi nibh, tristique eu augue quis, pellentesque pharetra ex. Morbi volutpat imperdiet maximus. Fusce velit libero, faucibus id gravida fermentum, aliquet vitae lacus. Nam vehicula ac erat et iaculis. Praesent arcu orci, maximus ac blandit eu, scelerisque vehicula felis. Donec a eros nibh. Curabitur ullamcorper nisl vitae ligula ultricies, a ultrices leo euismod. Cras non condimentum odio. Curabitur dignissim ornare luctus. Proin condimentum at ante ut congue. Vivamus luctus turpis vel scelerisque vehicula. Sed enim felis, pulvinar sit amet arcu sed, dignissim auctor leo. Ut non turpis dictum, ornare eros vel, cursus lectus. Aenean commodo, justo ut iaculis tincidunt, tellus lectus congue quam, at convallis velit massa ac eros. Maecenas eget sapien tincidunt, pretium augue ac, gravida ipsum."
        },
        {
          headline: "Hello",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at pulvinar sapien, nec interdum velit. Duis nisi nibh, tristique eu augue quis, pellentesque pharetra ex. Morbi volutpat imperdiet maximus. Fusce velit libero, faucibus id gravida fermentum, aliquet vitae lacus. Nam vehicula ac erat et iaculis. Praesent arcu orci, maximus ac blandit eu, scelerisque vehicula felis. Donec a eros nibh."
        },
      ],
    })
  }
</script>

<style scoped>

</style>
