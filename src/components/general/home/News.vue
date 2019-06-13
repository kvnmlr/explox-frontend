<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12 md7>
        <div v-for="item in news.slice(0, 3)" :key="item.headline">
          <v-card class="gradient-no-switch gradient-green">
            <v-card-title primary class="title">
              <v-icon>message</v-icon>&nbsp;{{ item.headline }}
            </v-card-title>
            <v-card-text>{{ item.body }}</v-card-text>
            <v-card-text v-if="item.link"><a :href="item.link">{{ item.linkText }}</a></v-card-text>
            <v-card-text><p style="color: #424242">{{ item.date }}</p></v-card-text>
          </v-card>
          <br>
        </div>
      </v-flex>
      <v-flex class="hidden-sm-and-down" md5 style="padding-left:60px;">
        <img v-if="news.length > 2" style="width:100%" src="@/assets/img/bicycle-bike-black-and-white.jpg"
             class="elevation-5">
        <img v-else style="width:100%" src="@/assets/img/action-adventure-bicycle.jpg" class="elevation-5">
      </v-flex>
      <v-flex xs12 sm12 md12>
        <div v-for="item in news.slice(3, 10)" :key="item.headline">
          <v-card class="gradient-no-switch gradient-green">
            <v-card-title primary class="title">
              <v-icon>message</v-icon>&nbsp;{{ item.headline }}
            </v-card-title>
            <v-card-text>{{ item.body }}</v-card-text>
            <v-card-text v-if="item.link"><a :href="item.link">{{ item.linkText }}</a></v-card-text>
            <v-card-text><p style="color: #424242">{{ item.date }}</p></v-card-text>
          </v-card>
          <br>
        </div>
      </v-flex>
    </v-layout>
    <v-layout column wrap>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'News',
    data: () => ({
      news: [
        {
          headline: 'Questions?',
          body: 'If you have questions about the study, please use the feedback/contact form by clicking on' +
            ' \'Send Feedback\' in the sidebar on the left or click below:',
          link: 'feedback',
          linkText: 'Contact',
          date: '18.06.2019'
        },
        {
          headline: 'FAQ',
          body: 'If you are having trouble using the website, please have a look at the \'Get Started\' guide:',
          link: 'guide',
          linkText: 'Get Started Guide',
          date: '18.06.2019'
        },
        {
          headline: 'About the User Study',
          body: 'The user study is currently ongoing. By clicking on \'Dashboard\' you can see your progress under' +
            ' \'Study duties\'. You can also find the study duties in the e-mail we sent to you.',
          link: 'dashboard',
          linkText: 'Dashboard',
          date: '18.06.2019'
        },
        {
          headline: 'Welcome to ExploX',
          body: 'Hey there! You are one of the first users on this website. Please expect some minor bugs on the ' +
            'website within the first couple of weeks. If you run into problems or have questions, feel free to use the feedback/contact form.',
          date: '17.06.2019'
        },
        {
          headline: 'ExploX Website is Live',
          body: 'The development of the first release version is finished and the website is officially live.',
          date: '01.02.2019'
        },
      ],
    })
  }
</script>

<style scoped>

</style>
