<template>
  <div>
    <h1>Feedback</h1>
    <div class="separator"></div>
    <p>We are constantly working on this website. Thanks for helping us make it even better!</p>

    <v-form style="margin-top: 50px;">
      <v-text-field v-if="user" label="We will reply to this e-mail address" type="text" v-model="email"></v-text-field>
      <v-text-field v-else label="If you want a reply, enter your e-mail here" type="text" v-model="email"></v-text-field>

      <v-textarea name="input-7-1" label="What's on your mind?" v-model="text"></v-textarea>
      <v-btn class="gradient gradient-orange" round large dark v-on:click.prevent="submit">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
  export default {
    name: "Feedback",
    data: () => ({
      email: '',
      text: '',
    }),
    props: {
      user: Object,
    },
    created() {
      if (this.user) {
        this.email = this.user.email
      }
    },
    methods: {
      submit: function() {
        // TODO
        this.$emit('flash', {
          type: 'success',
          text: 'Thanks for your feedback!'
        });
        setTimeout(() => {this.$router.push('/');}, 100);
      },
    }
  }
</script>

<style scoped>

</style>
