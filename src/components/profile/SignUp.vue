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
          <v-stepper-content step="1">
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
                              @click:append="show = !show"
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
            <v-alert :value="true" color="accent" icon="info" outline>Please check if everything is correct.</v-alert>
            <br>
            <v-layout column wrap>
              <h4>First Name</h4>
              <p>{{user.firstName}}</p>

              <h4>Last Name</h4>
              <p>{{user.lastName}}</p>

              <h4>Username</h4>
              <p>{{user.username}}</p>

              <h4>E-Mail</h4>
              <p>{{user.email}}</p>

              <v-checkbox :label="checkbox1_text" v-model="emailsCheckbox" style="margin-bottom: -20px;"></v-checkbox>
              <v-checkbox :rules="[rules.required]" :label="checkbox2_text" v-model="termsCheckbox" v-bind:error="termsError" v-on:click="dialog =! dialog"></v-checkbox>

              <v-btn class="gradient gradient-orange" dark round v-on:click="signup"><v-icon>check</v-icon>Finish & Go To Profile</v-btn>


              <v-dialog v-model="dialog" width="600px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Terms and Conditions for ExploX</span>
                  </v-card-title>
                  <v-card-text>
                    <h3>Introduction</h3>
                    <p>These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, ExploX accessible at umtl.dfki.de.</p>
                    <p>These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.</p>

                    <h3>Intellectual Property Rights</h3>
                    <p>Other than the content you own, under these Terms, DFKI and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>
                    <p>You are granted limited license only for purposes of viewing the material contained on this Website.</p>

                    <h3>Restrictions</h3>
                    <p>You are specifically restricted from all of the following:</p>
                    <ul>
                      <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
                      <li>using this Website in any way that is or may be damaging to this Website;</li>
                      <li>using this Website in any way that impacts user access to this Website;</li>
                      <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
                      <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
                    </ul>
                    <p>Certain areas of this Website are restricted from being access by you and DFKI may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well.</p>

                    <h3>No warranties</h3>
                    <p>This Website is provided "as is," with all faults, and DFKI express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.</p>

                    <h3>Limitation of liability</h3>
                    <p>In no event shall DFKI, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.  DFKI, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>

                    <h3>Indemnification</h3>
                    <p>You hereby indemnify to the fullest extent DFKI from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>

                    <h3>Severability</h3>
                    <p>If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>

                    <h3>Variation of Terms</h3>
                    <p>DFKI is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.</p>

                    <h3>Assignment</h3>
                    <p>The DFKI is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.</p>

                    <h3>Entire Agreement</h3>
                    <p>These Terms constitute the entire agreement between DFKI and you in relation to your use of this Website, and supersede all prior agreements and understandings.</p>

                    <h3>Governing Law & Jurisdiction</h3>
                    <p>These Terms will be governed by and interpreted in accordance with the laws of the State of de, and you submit to the non-exclusive jurisdiction of the state and federal courts located in de for the resolution of any disputes.</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click="() => {this.dialog = false; this.termsCheckbox = true;}">Agree</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
        dialog: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => (v && v.length >= 8) || 'Min 8 characters',
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
          password: this.user.password,
          subscriptions: ['news'],
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
