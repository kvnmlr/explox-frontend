<template>
  <div>
    <h1>Finish Registration</h1>
    <v-container fluid style="width: 800px; min-height:">
      <v-stepper non-linear v-model="e1" v-if="user">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1" editable>Personal Information</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2" editable>E-Mail</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 3" step="3" editable>Password</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 4" step="4">Finish</v-stepper-step>
        </v-stepper-header>
        <v-container>
          <h3>We extracted most information from your Strava profile. Please fill out or confirm the following
            information:</h3>
        </v-container>
        <v-stepper-items>
          <v-stepper-content step="1" wid>
            <v-layout column>
              <v-text-field label="Name" hint="First Name" value="" v-model="user.firstName"></v-text-field>
              <br>
              <v-text-field label="Last Name" hint="Last Name" value="" v-model="user.lastName"></v-text-field>
              <br>
              <v-text-field label="User Name" hint="User Name" value="" v-model="user.username"></v-text-field>
              <v-btn class="gradient gradient-orange" dark round @click="e1 = 2">Continue</v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-layout column>
              <v-text-field ref="emailEntry" :rules="[rules.required, rules.emailValid]"
                            name="input-10-2"
                            label="E-mail Address"
                            value=""
                            v-model="user.email"></v-text-field>
              <v-btn class="gradient gradient-orange" dark round @click="validateEmail">Continue</v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-layout column wrap>
              <v-flex xs12 sm6>
                <v-text-field ref="passwordEntry1"
                  :append-icon="show ? 'visibility_off' : 'visibility'"
                  :rules="[rules.required, rules.min]"
                  :type="show ? 'text' : 'password'"
                  name="input-10-2"
                  label="Password"
                  hint="At least 8 characters"
                  value=""
                  class="input-group--focused"
                  v-model="user.password"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field ref="passwordEntry2"
                  :rules="[rules.required, rules.passwordMatch]"
                  :type="'password'"
                  name="input-10-2"
                  label="Repeat Password"
                  value=""
                  class="input-group--focused"
                ></v-text-field>
              </v-flex>
              <v-btn class="gradient gradient-orange" dark round @click="validatePassword">Continue</v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-alert :value="true" color="info" icon="info" outline>Please check if everything is correct.</v-alert>
            <br>
            <v-layout column wrap>
              <h2>First Name</h2>
              <p>{{user.firstName}}</p>

              <h2>Last Name</h2>
              <p>{{user.lastName}}</p>

              <h2>Username</h2>
              <p>{{user.username}}</p>

              <h2>E-Mail</h2>
              <p>{{user.email}}</p>

              <v-checkbox :label="checkbox1_text" v-model="emailsCheckbox"></v-checkbox>
              <v-checkbox :rules="[rules.required]" :label="checkbox2_text" v-model="termsCheckbox"
                          v-bind:error="termsError"></v-checkbox>

              <v-btn class="gradient gradient-orange" dark round v-on:click="signup">Finish & Go To Profile</v-btn>
            </v-layout>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>

    </v-container>
  </div>

</template>

<script>
  import apiMixin from "../../mixins/apiMixin";
  import {EventBus} from "@/eventBus";

  export default {
    name: "SignUp",
    data() {
      return {
        e1: 0,
        show: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailValid: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          passwordMatch: value => value === this.user.password || 'Passwords don\'t match'
        },
        emailsCheckbox: false,
        termsCheckbox: false,
        termsError: false,
        checkbox1_text: 'Allow ExploX to send News Emails',
        checkbox2_text: 'Accept Terms and Conditions',
      }
    },
    created() {
      EventBus.$emit('flash', {
        type: 'success',
        text: 'Successfully connected to Strava.'
      });
    },
    props: {
      user: Object,
    },
    methods: {
      async signup() {
        if (!this.termsCheckbox) {
          this.termsError = true;
          return;
        } else {
          this.termsError = false;
        }
        const formData = {
          _csrf: this.csrfToken,
          name: this.user.name + ' ' + this.user.lastname,
          username: this.user.username,
          email: (this.user.email).toLowerCase(),
          password: this.user.password
        };


        this.POST('finishRegistration', formData, null, (data, err) => {
          if (!err) {
            EventBus.$on('authenticated', () => {
              this.$router.push('/dashboard');
            });
            EventBus.$emit('reloadData');
          }
        });
      },
      validatePassword() {
        if (this.$refs.passwordEntry1.validate() && this.$refs.passwordEntry2.validate()) {
          this.e1 = 4;
        }
      },
      validateEmail() {
        if (this.$refs.emailEntry.validate()) {
          this.e1 = 3;
        }
      }
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
