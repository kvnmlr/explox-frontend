<template>
  <div>
    <h1>Feedback</h1>
    <div class="separator"></div>
    <p>We are constantly working on this website. Thanks for helping us make it even better!</p>
    <br>
    <v-card class="elevation-5">
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-if="user" :rules="[rules.email]" label="We will reply to this e-mail address" type="text"
                        v-model="email"></v-text-field>
          <v-text-field v-else :rules="[rules.email]" label="If you want a reply, enter your e-mail here" type="text"
                        v-model="email"></v-text-field>
          <br>
          <v-textarea required minlength="10" :rules="[rules.notEmpty]" name="input-7-1" label="What's on your mind?"
                      v-model="text"></v-textarea>
          <br>
          <v-btn class="gradient gradient-orange" round large dark v-on:click.prevent="submit">Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>
  import apiMixin from "../../mixins/apiMixin";

  export default {
    name: "Feedback",
    data: () => ({
      email: '',
      text: '',
      valid: true,
      rules: {
        notEmpty: value => value.length > 10 || 'Please write a bit more.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
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
      submit: function () {
        if (!this.$refs.form.validate()) {
          return;
        }
        const formData = {
          _csrf: this.csrfToken,
          user: this.user,
          email: (this.email).toLowerCase(),
          body: this.text,
        };

        this.POST('feedback', formData, null, (data, err) => {
          if (!err) {
            this.$emit('flash', {
              type: 'success',
              text: 'Thanks for your feedback!'
            });
            setTimeout(() => {
              this.$router.push('/');
            }, 100);
          }
        });
      },
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
