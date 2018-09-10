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
                    <span class="headline">Use Google's location service?</span>
                  </v-card-title>
                  <v-card-text>Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit. Nostra urna at, magna at neque sed sed ante imperdiet, dolor mauris cursus velit, velit non, sem nec. Volutpat sem ridiculus placerat leo, augue in, duis erat proin condimentum in a eget, sed fermentum sed vestibulum varius ac, vestibulum volutpat orci ut elit eget tortor. Ultrices nascetur nulla gravida ante arcu. Pharetra rhoncus morbi ipsum, nunc tempor debitis, ipsum pellentesque, vitae id quam ut mauris dui tempor, aptent non. Quisque turpis. Phasellus quis lectus luctus orci eget rhoncus. Amet donec vestibulum mattis commodo, nulla aliquet, nibh praesent, elementum nulla. Sit lacus pharetra tempus magna neque pellentesque, nulla vel erat.
                    Justo ex quisque nulla accusamus venenatis, sed quis. Nibh phasellus gravida metus in, fusce aenean ut erat commodo eros. Ut turpis, dui integer, nonummy pede placeat nec in sit leo. Faucibus porttitor illo taciti odio, amet viverra scelerisque quis quis et tortor, curabitur morbi a. Enim tempor at, rutrum elit condimentum, amet rutrum vitae tempor torquent nunc. Praesent vestibulum integer maxime felis. Neque aenean quia vitae nostra, tempus elit enim id dui, at egestas pulvinar. Integer libero vestibulum, quis blandit scelerisque mattis fermentum nulla, tortor donec vestibulum dolor amet eget, elit nullam. Aliquam leo phasellus aliquam curabitur metus a, nulla justo mattis duis interdum vel, mollis vitae et id, vestibulum erat ridiculus sit pulvinar justo sed. Vehicula convallis, et nulla wisi, amet vestibulum risus, quam ac egestas.
                    Et vitae, nulla gravida erat scelerisque nullam nunc pellentesque, a dictumst cras augue, purus imperdiet non. Varius montes cursus varius vel tortor, nec leo a qui, magni cras, velit vel consectetuer lobortis vel. Nibh erat et wisi felis leo porttitor, sapien nibh sapien pede mi, sed eget porttitor, repellendus arcu ac quis. Luctus vulputate aut est sem magna, placerat accumsan nunc vestibulum ipsum ac auctor, maecenas lorem in ut nec mauris tortor, doloribus varius sem tortor vestibulum mollis, eleifend tortor felis tempus lacus eu eu. Eleifend vel eu, nullam maecenas mauris nec nunc euismod, tortor porta ridiculus potenti, massa tristique nam magna, et wisi placerat et erat ante. Eget pede erat in facilisis, fermentum venenatis sodales. Ac tortor sociis et non animi tristique, rhoncus malesuada, ut arcu volutpat scelerisque sollicitudin, elit curabitur dui pede purus dolor, integer aenean risus taciti nulla eleifend accumsan. At pulvinar diam parturient, interdum mi velit aliquet et a. Arcu at ac placerat eget justo semper, purus sociis curabitur mi ipsum consequat ut, mollis vestibulum, est ante ornare lacus sem. Neque magna mauris, commodo quisque, praesent semper suscipit lobortis nam. Justo malesuada cursus ac nunc litora nunc. Tellus ac, in lobortis nunc, montes lectus purus fermentum.
                    Ac sit wisi. Sodales aliquam, sed vestibulum nullam arcu sit risus arcu, id luctus vitae lorem nibh, integer nec nullam class cursus mi, purus arcu lectus. Vel ante suscipit volutpat potenti mattis sed, wisi eu placerat aliquam erat, lectus morbi lobortis at assumenda. Consequat neque purus ipsum voluptas odio, netus vestibulum ut nec, suspendisse pellentesque nec enim in. Wisi dictum sed semper a, ipsum erat tellus habitasse est, erat sem ornare, vitae quisque ultricies. Dui sed blandit. Tempor et faucibus justo sed luctus, nec vitae vitae. Nunc nibh pede, ipsum vestibulum aenean leo ante ultricies, nam cras quis sed penatibus amet. In mauris a. Integer metus mauris tortor, et rutrum vestibulum ultricies, ut phasellus in ullamcorper ut mollit, eu justo. Cursus pretium venenatis.
                    Cras pellentesque vel sodales accumsan aenean. Feugiat metus sit nec in aliquet amet, porttitor pretium vulputate massa. Consequat ipsum luctus quisque adipiscing libero. Wisi sollicitudin. Eget vitae ac lobortis, lorem natoque vestibulum et, aliquet faucibus at morbi nibh, vel condimentum. Massa unde orci sed id sed, odio donec congue nec praesent amet. Hymenaeos velit lacus, quis vivamus libero tempus duis, eu nisi eu, ipsum at accumsan pede justo morbi donec, massa et libero sit risus neque tortor. Ut sed sed etiam hendrerit dapibus, quis metus suspendisse nibh.
                    Fringilla tempor felis augue magna. Cum arcu a, id vitae. Pellentesque pharetra in cras sociis adipiscing est. Nibh nec mattis at maecenas, nisl orci aliquam nulla justo egestas venenatis, elementum duis vel porta eros, massa vitae, eligendi imperdiet amet. Nec neque luctus suscipit, justo sem praesent, ut nisl quisque, volutpat torquent wisi tellus aliquam reprehenderit, curabitur cras at quis massa porttitor mauris. Eros sed ultrices. Amet dignissim justo urna feugiat mauris litora, etiam accumsan, lobortis a orci suspendisse. Semper ac mauris, varius bibendum pretium, orci urna nunc ullamcorper auctor, saepe sem integer quam, at feugiat egestas duis. Urna ligula ante. Leo elementum nonummy. Sagittis mauris est in ipsum, nulla amet non justo, proin id potenti platea posuere sit ut, nunc sit erat bibendum. Nibh id auctor, ab nulla vivamus ultrices, posuere morbi nunc tellus gravida vivamus.
                    Mauris nec, facilisi quam fermentum, ut mauris integer, orci tellus tempus diam ut in pellentesque. Wisi faucibus tempor et odio leo diam, eleifend quis integer curabitur sit scelerisque ac, mauris consequat luctus quam penatibus fringilla dis, vitae lacus in, est eu ac tempus. Consectetuer amet ipsum amet dui, sed blandit id sed. Tellus integer, dignissim id pede sodales quis, felis dolorem id mauris orci, orci tempus ut. Nullam hymenaeos. Curabitur in a, tortor ut praesent placerat tincidunt interdum, ac dignissim metus nonummy hendrerit wisi, etiam ut.
                    Semper praesent integer fusce, tortor suspendisse, augue ligula orci ante asperiores ullamcorper. In sit per mi sed sed, mi vestibulum mus nam, morbi mauris neque vitae aliquam proin senectus. Ac amet arcu mollis ante congue elementum, inceptos eget optio quam pellentesque quis lobortis, sollicitudin sed vestibulum sollicitudin, lectus parturient nullam, leo orci ligula ultrices. At tincidunt enim, suspendisse est sit sem ac. Amet tellus molestie est purus magna augue, non etiam et in wisi id. Non commodo, metus lorem facilisi lobortis ac velit, montes neque sed risus consectetuer fringilla dolor. Quam justo et integer aliquam, cursus nulla enim orci, nam cursus adipiscing, integer torquent non, fringilla per maecenas. Libero ipsum sed tellus purus et. Duis molestie placerat erat donec ut. Dolor enim erat massa faucibus ultrices in, ante ultricies orci lacus, libero consectetuer mauris magna feugiat neque dapibus, donec pretium et. Aptent dui, aliquam et et amet nostra ligula.
                    Augue curabitur duis dui volutpat, tempus sed ut pede donec. Interdum luctus, lectus nulla aenean elit, id sit magna, vulputate ultrices pellentesque vel id fermentum morbi. Tortor et. Adipiscing augue lorem cum non lacus, rutrum sodales laoreet duis tortor, modi placerat facilisis et malesuada eros ipsum, vehicula tempus. Ac vivamus amet non aliquam venenatis lectus, sociosqu adipiscing consequat nec arcu odio. Blandit orci nec nec, posuere in pretium, enim ut, consectetuer nullam urna, risus vel. Nullam odio vehicula massa sed, etiam sociis mauris, lacus ullamcorper, libero imperdiet non sodales placerat justo vehicula. Nec morbi imperdiet. Fermentum sem libero iaculis bibendum et eros, eget maecenas non nunc, ad pellentesque. Ut nec diam elementum interdum. Elementum vitae tellus lacus vitae, ipsum phasellus, corporis vehicula in ac sed massa vivamus, rutrum elit, ultricies metus volutpat.
                    Semper wisi et, sollicitudin nunc vestibulum, cursus accumsan nunc pede tempus mi ipsum, ligula sed. Non condimentum ac dolor sit. Mollis eu aliquam, vel mattis mollis massa ut dolor ante, tempus lacinia arcu. Urna vestibulum lorem, nulla fermentum, iaculis ut congue ac vivamus. Nam libero orci, pulvinar nulla, enim pellentesque consectetuer leo, feugiat rhoncus rhoncus vel. Magna sociosqu donec, dictum cursus ullamcorper viverra. Ultricies quis orci lorem, suspendisse ut vestibulum integer, purus sed lorem pulvinar habitasse turpis.
                    +</v-card-text>
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
