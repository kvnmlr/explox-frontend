<template>
  <section v-if="user">
    <secton v-if="user.psq && user.psq.feedback">
      <h1>You have already submitted the questionnaire.</h1>
      Please contact exploxcycling@gmail.com if you have any problems.
    </secton>
    <section v-else>
      <section v-if="lang === 'en'">
        <h1>Post-Study Questionnaire</h1>
        <br>
        <v-layout v-if="!deadlinePassed && questionnaireEnabled" row flex>
          <v-flex md10>
            <h3>Switch language/Sprache wählen:</h3>
            <v-avatar style="margin: 10px;" size="32px" v-on:click="lang = 'en'">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Square_Flag_of_the_United_Kingdom.svg/1024px-Square_Flag_of_the_United_Kingdom.svg.png"
                alt="English">
            </v-avatar>
            <v-avatar size="32px" v-on:click="lang = 'de'">
              <img
                src="https://us.123rf.com/450wm/dikobrazik/dikobrazik1709/dikobrazik170900202/86148491-stock-vector-germany-flag-vector-square-flat-icon-illustration.jpg?ver=6"
                alt="German">
            </v-avatar>
          </v-flex>
          <v-flex md2>
            Changes last saved: {{ cacheTime }}
          </v-flex>
        </v-layout>
        <v-alert v-if="deadlinePassed" :value="true" color="accent" icon="info" outline>
          <h2>Deadline over</h2>
          Unfortunately, the deadline for post-study questionnaires has passed on 22. July.
          <b>We ask for your understanding and want to thank you very much for your participation in the study.</b>
        </v-alert>
        <v-alert v-else-if="!questionnaireEnabled" :value="true" color="accent" icon="info" outline>
          <h2>Too Early</h2>
          The post-study questionnaire will be available from 21. July until 04. August. Please come back later.
        </v-alert>
        <v-container v-else fluid style="width: 100%;">
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 0" step="0">User Experience Questionnaire</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 1" step="1">Feedback</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">Study Complete</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="0">
                <v-layout column style="margin-left: 20px;">
                  <h1>User Experience Questionnaire</h1>
                  <br>
                  <p>For the assessment of the product, please fill out the following questionnaire. The questionnaire
                    consists of pairs of contrasting attributes that may apply to the product. The circles between the
                    attributes represent gradations between the opposites. You can express your agreement with the
                    attributes by ticking the circle that most closely reflects your impression..</p>
                  <p>Please decide spontaneously. Don’t think too long about your decision to make sure that you convey
                    your
                    original impression.
                    Sometimes you may not be completely sure about your agreement with a particular attribute or you may
                    find that the attribute does not apply completely to the particular product. Nevertheless, please
                    tick
                    a
                    circle in every line.
                    It is your personal opinion that counts. Please remember: there is no wrong or right answer!</p>
                  <br>

                  <div class="text-xs-center" v-for="(question, qi) in ueq_en">
                    <v-layout row wrap>
                      <v-flex xs12 md3 lg4>
                        <div class="text-xs-right">{{ question.left}}</div>
                        <br v-if="$vuetify.breakpoint.xs">
                      </v-flex>
                      <v-flex xs12 md6 lg4>
                    <span v-for="i in [1,2,3,4,5,6,7]">
                      <v-btn fab small :color="ueq_en[qi].value === i ? 'orange' : 'white'"
                             :style="$vuetify.breakpoint.xs ? 'height: 20px; width: 20px; margin-top:-10px;' : 'height: 30px; width: 30px; margin-top:-10px;'"
                             v-on:click="() => {ueq_en[qi].value = i;}"></v-btn>
                    </span>
                      </v-flex>
                      <v-flex xs12 md3 lg4>
                        <br v-if="$vuetify.breakpoint.xs">
                        <div class="text-xs-left">{{ question.right}}</div>
                      </v-flex>
                    </v-layout>
                    <br><br>


                  </div>

                  <v-btn v-if="true || ueq_en.reduce(((acc, curr) => acc * curr.value), 1) > 0"
                         class="gradient gradient-orange" style="width: 200px;" dark round @click="e1 = 1"
                         v-on:click="logUser">Continue
                  </v-btn>
                  <v-btn v-else disabled style="width: 400px;" round @click="e1 = 1"
                         v-on:click="logUser">Please give a response to every item.
                  </v-btn>
                </v-layout>
              </v-stepper-content>
              <v-stepper-content step="1" v-if="user">
                <v-layout column style="margin-left: 20px;">
                  <h1>Demographics</h1>
                  <br>
                  <p class="title">Did you face any problems with the website during the study?</p>
                  <v-textarea v-model="feedback.q1"></v-textarea>
                  <br>
                  <p class="title">Which of the features did you like?</p>
                  <v-textarea v-model="feedback.q2"></v-textarea>
                  <br>
                  <p class="title">Did the website help you in finding new cycling routes? Would you like to continue
                    using
                    ExploX to find new cycling routes?</p>
                  <v-textarea v-model="feedback.q3"></v-textarea>
                  <br>
                  <p class="title">Did you actually cycle some of the generated routes? If yes, please provide links to
                    the
                    activities on Strava.</p>
                  <v-textarea v-model="feedback.q4"></v-textarea>
                  <br>
                  <p class="title">Anything else you would like to say?</p>
                  <v-textarea v-model="feedback.q5"></v-textarea>
                  <br>

                  <v-btn v-if="(feedback.q1 + feedback.q2 +feedback.q3 +feedback.q4 +feedback.q5).length > 50"
                         class="gradient gradient-orange" style="width: 200px;" dark round
                         v-on:click="update" @click="e1 = 2">Submit
                  </v-btn>
                  <v-btn v-else disabled style="width: 400px;" round
                         v-on:click="logUser">Please give some feedback.
                  </v-btn>
                </v-layout>
              </v-stepper-content>
              <v-stepper-content step="2" v-if="user">
                <v-layout column style="margin-left: 20px;" v-if="submitted">
                  <h1>Study Completed</h1>
                  <br>
                  <div class="headline">Thanks a lot for your participation!</div>
                  <br>
                  <div class="text">We will choose the winners of the vouchers on 05. August and will let you know via
                    email
                    in case you won. Please check your email adress {{ user.email }} and the spam folder.
                  </div>
                  <v-icon color="green" size="100">check</v-icon>
                </v-layout>
                <v-layout column style="margin-left: 20px;" v-else>
                  <section v-if="!failed">
                    <h1>Please wait ...</h1>
                    <br>
                    <div class="headline">Submitting your answers, please wait.</div>
                  </section>
                  <section v-else>
                    <div class="headline">Upload failed, please try again</div>
                    <br>
                    <v-btn v-if="(feedback.q1 + feedback.q2 +feedback.q3 +feedback.q4 +feedback.q5).length > 50"
                           class="gradient gradient-green" style="width: 200px;" round
                           v-on:click="update" @click="e1 = 2">Submit again
                    </v-btn>
                  </section>
                </v-layout>
              </v-stepper-content>

            </v-stepper-items>
          </v-stepper>
        </v-container>
      </section>
    </section>
  </section>
  <section v-else>
    <log-in></log-in>
  </section>
</template>


<script>
  import apiMixin from '../../mixins/apiMixin'
  import geoTransformMixin from '../../mixins/geoTransformMixin'
  import {EventBus} from '@/eventBus'
  import axios from 'axios'
  import LogIn from './LogIn'
  import Segments from './admin/Segments'

  export default {
    name: 'PostStudyQuestionnaire',
    components: {Segments, LogIn},
    data () {
      return {
        submitted: false,
        failed: false,
        e1: 0,
        show: false,
        dialog: false,
        cacheTime: 'not yet',
        deadlinePassed: false,
        questionnaireEnabled: true,
        lang: 'en',
        feedback: {
          q1: '',
          q2: '',
          q3: '',
          q4: '',
          q5: '',
        },
        ueq_vals: [],
        ueq_ger: [
          {
            left: 'unerfreulich',
            right: 'erfreulich',
          },
          {
            left: 'unverständlich',
            right: 'verständlich',
          }
        ],
        ueq_en: [
          {
            left: 'annoying',
            right: 'enjoyable',
            value: 0
          },
          {
            left: 'not understandable',
            right: 'understandable',
            value: 0
          },
          {
            left: 'creative',
            right: 'dull',
            value: 0
          },
          {
            left: 'easy to learn',
            right: 'difficult to learn',
            value: 0
          },
          {
            left: 'valuable',
            right: 'inferior',
            value: 0
          },
          {
            left: 'boring',
            right: 'exciting',
            value: 0
          },
          {
            left: 'not interesting',
            right: 'interesting',
            value: 0
          },
          {
            left: 'unpredictable',
            right: 'predictable',
            value: 0
          },
          {
            left: 'fast',
            right: 'slow',
            value: 0
          },
          {
            left: 'inventive',
            right: 'conventional',
            value: 0
          },
          {
            left: 'obstructive',
            right: 'supportive',
            value: 0
          },
          {
            left: 'good',
            right: 'bad',
            value: 0
          },
          {
            left: 'complicated',
            right: 'easy',
            value: 0
          },
          {
            left: 'unlikable',
            right: 'pleasing',
            value: 0
          },
          {
            left: 'usual',
            right: 'leading edge',
            value: 0
          },
          {
            left: 'unpleasant',
            right: 'pleasant',
            value: 0
          },
          {
            left: 'secure',
            right: 'not secure',
            value: 0
          },
          {
            left: 'motivating',
            right: 'demotivating',
            value: 0
          },
          {
            left: 'meets expectations',
            right: 'does not meet expectations',
            value: 0
          },
          {
            left: 'inefficient',
            right: 'efficient',
            value: 0
          },
          {
            left: 'clear',
            right: 'confusing',
            value: 0
          },
          {
            left: 'impractical',
            right: 'practical',
            value: 0
          },
          {
            left: 'organized',
            right: 'cluttered',
            value: 0
          },
          {
            left: 'attractive',
            right: 'unattractive',
            value: 0
          },
          {
            left: 'friendly',
            right: 'unfriendly',
            value: 0
          },
          {
            left: 'conservative',
            right: 'innovative',
            value: 0
          }
        ]
      }
    },
    created () {
      const enabled = new Date('21 July 2019 00:00:01')
      const deadline = new Date('04 August 2019 23:59:59')
      const currentDate = new Date()
      if (currentDate > deadline) {
        this.deadlinePassed = true
      }

      if (enabled > currentDate) {
        this.questionnaireEnabled = false
      }

      this.questionnaireEnabled = true

      setTimeout(() => {
        EventBus.$emit('collapseDrawer')
      }, 100)
    }
    ,
    props: {
      user: Object,
    }
    ,

    methods: {
      logUser () {
        this.$vuetify.goTo(0, {duration: 0, offset: 0, easing: 'easeInOutCubic'})
        console.log(this.user)
      }
      ,
      async update (c) {
        c = c | 0
        const formData = {
          psq: {
            ueq: this.ueq_en,
            feedback: this.feedback
          }
        }
        this.failed = false
        this.PUT('users/' + this.user._id, formData, null, (data, err) => {
          if (!err) {
            this.submitted = true
          } else {
            if (c < 4) {
              setTimeout(() => {
                this.update(c + 1)
              }, 5000)
            } else {
              this.failed = true
            }
          }
        })
      }
      ,
    }
    ,
    mixins: [apiMixin, geoTransformMixin]
  }
</script>

<style scoped>

</style>
