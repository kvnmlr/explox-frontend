<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12 md7>
        <div v-for="item in news.slice(0, 3)" :key="item.headline" >
          <v-card class="gradient-no-switch gradient-green">
            <v-card-title primary class="title">
              <v-icon>message</v-icon>&nbsp;{{ item.headline }}
            </v-card-title>
            <v-card-text>{{ item.body }} <br><br><p style="color: darkgray;">{{ item.date }}</p></v-card-text>
          </v-card>
          <br>
        </div>
      </v-flex>
      <v-flex class="hidden-sm-and-down" md5 style="padding-left:20px;">
        <img v-if="news.length > 2" style="width:100%" src="@/assets/img/bicycle-bike-black-and-white.jpg"
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
          headline: "Welcome to ExploX",
          body: "Hey there! You are one of the first users on this website. Please expect some minor bugs on the website within the first couple of weeks. If you run into problems or have questions, feel free to use the feedback/contact form.",
          date: "05.11.2018"
        },
        {
          headline: "ExploX Website is Live",
          body: "The development of the first release version is finished and the website is officially live.",
          date: "01.11.2018"
        },
      ],
    })
  }
</script>

<style scoped>

</style>
