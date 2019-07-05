<template>
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
      <v-stepper non-linear v-model="e1" v-if="user">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 0" step="0" editable>Introduction</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 1" step="1" editable>Demographics</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2" editable>Cycling Behaviour</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 3" step="3">Finish</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="0">
            <v-layout column style="margin-left: 20px;">
              <h1>About the study</h1>
              <br>
              <p><b>Thank you for signing up to ExploX. Please read the following notes carefully:</b></p>
              <br>
              <h2>Purpose of this study</h2>
              <p>You are invited to use ExploX for the next weeks and thereby contribute to our research on cycling
                behaviour. By answering the following questionnaires and using this website for the next weeks,
                you will participate in the study.</p>
              <h2>Time and dates for the study</h2>
              <p><b>Registration phase:</b> <span style="color: #ee5b19">17. June - 01. July 2019</span> (2 Weeks)</p>
              <p><b>Usage phase:</b> <span style="color: #ee5b19">17. June - 15. July 2019</span> (4 Weeks)</p>
              <p><b>User Experience Questionnaire und interviews after the study:</b> <span style="color: #ee5b19">01. July - 22. July 2019</span>
                (3 Weeks), earliest time is after extensive use of the website and fulfillment of all study duties (see
                below "Reward").</p>
              <h2>Preconditions and Eligibility</h2>
              <p>In the following, you will find some questionnaires that you have to answer thoroughly
                carefully if you want to join the study. At the end of the questionnaires, you will see if you are
                eligible to participate in the study. Then, you can decide if you want to participate or not.
                Please take your time and fill out the questionnaire thoroughly. Using the bar at the top, you can jump
                between different parts of the questionnaire and review your answers. You have to give an answer to <b>all</b>
                questions, for some questions this can be as simple as answering "No".<br>
                You are eligible to participate in the study if ...
              </p>
              <ul>
                <li>you have access to a bicycle that is in a working condition (your own bike or rental service),</li>
                <li>you use your bicycle at least several times a year,</li>
                <li>you are a recreational/hobby cyclist, but neither a pure commuter nor a professional,</li>
                <li>you track at least some of your activities on Strava,</li>
                <li>and you regularly use your bicycle in an area in and around Saarland (at most 50km distance to
                  Saarland,
                  e.g. Metz).
                </li>
              </ul>
              <br>
              <h2>Reward</h2>
              <p>We will reward your participation in the study with the chance to win <b style="color:#ee5b19;">one of
                6 x 25€ Amazon
                Vouchers</b>. If you win, you will receive at the end of the study. You have to fulfill the following
                criteria in order to receive the voucher:</p>
              <ul>
                <li>You have completed the following questionnaires and you are eligible to participate (~15 minutes)
                </li>
                <li>You have done at least 15 (successful) route generations and rated each of the resulting routes</li>
                <li>You have filled out the User Experience Questionnaire at the end of the study (~10 minutes)</li>
                <li>You have filled out a short qualitative questionnaire and provided feedback at the end of the
                  study (~5-10 minutes)
                </li>
              </ul>
              <br>
              <p><b style="color: #ee5b19">Additionally:</b> The first 5 participants to fulfill the above criteria and
                actually cycle at least 2 of
                the generated routes, track and save them as Strava activities and give us detailed information about
                the routes will receive a <b style="color:#ee5b19;">30€ Bike Gear Voucher</b>!
              </p>
              <br>
              <v-btn class="gradient gradient-orange" style="width: 200px;" dark round @click="e1 = 1"
                     v-on:click="logUser">Continue
              </v-btn>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="1" v-if="user.demographics">
            <v-layout column style="margin-left: 20px;">
              <h1>Demographics</h1>
              <v-radio-group v-model="user.demographics.q1">
                <p class="title">Gender:</p>
                <v-radio label="Male" value=1></v-radio>
                <v-radio label="Female" value=2></v-radio>
                <v-radio label="Other" value=3></v-radio>
                <v-radio label="Prefer not to say" value=4></v-radio>
              </v-radio-group>

              <v-radio-group v-model="user.demographics.q2">
                <p class="title">Age:</p>
                <v-radio label="Under 18" value=1></v-radio>
                <v-radio label="18-27" value=2></v-radio>
                <v-radio label="28-37" value=3></v-radio>
                <v-radio label="38-47" value=4></v-radio>
                <v-radio label="48-57" value=5></v-radio>
                <v-radio label="58-67" value=6></v-radio>
                <v-radio label="68 or up" value=7></v-radio>
                <v-radio label="Prefer not to say" value=8></v-radio>
              </v-radio-group>

              <v-radio-group v-model="user.demographics.q3">
                <p class="title">Highest completed level of education:</p>
                <v-radio label="Less than high school degree" value=1></v-radio>
                <v-radio label="High school degree" value=2></v-radio>
                <v-radio label="Bachelor's degree" value=3></v-radio>
                <v-radio label="Master's degree" value=4></v-radio>
                <v-radio label="Doctorate" value=5></v-radio>
                <v-radio label="Prefer not to say" value=6></v-radio>
                <v-radio label="Other" value=7></v-radio>
              </v-radio-group>

              <v-layout row wrap v-if="user.demographics.q3 === '7'">
                <v-flex xs12 sm6 md3>
                  <v-text-field label="Please specify" v-model="user.demographics.q3Text"></v-text-field>
                </v-flex>
              </v-layout>

              <v-radio-group v-model="user.demographics.q4">
                <p class="title">Occupation:</p>
                <v-radio label="Full-time employment" value=1></v-radio>
                <v-radio label="Part-time employment" value=2></v-radio>
                <v-radio label="Student" value=3></v-radio>
                <v-radio label="Self-employed" value=4></v-radio>
                <v-radio label="Unemployed" value=5></v-radio>
                <v-radio label="Retired" value=6></v-radio>
                <v-radio label="Prefer not to say" value=7></v-radio>
              </v-radio-group>

              <v-radio-group v-model="user.demographics.q7">
                <p class="title">Income per month after tax:</p>
                <v-radio label="Less than 2.000€" value=1></v-radio>
                <v-radio label="2.001€ - 4.000€" value=2></v-radio>
                <v-radio label="4.001€ - 6.000€" value=3></v-radio>
                <v-radio label="6.001€ - 8.000€" value=4></v-radio>
                <v-radio label="8.001€ - 10.000€" value=5></v-radio>
                <v-radio label="More than 10.000€" value=6></v-radio>
                <v-radio label="Prefer not to say" value=7></v-radio>
              </v-radio-group>

              <v-btn class="gradient gradient-orange" style="width: 200px;" dark round @click="e1 = 2"
                     v-on:click="logUser">Continue
              </v-btn>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="2" v-if="user.cyclingBehaviour">
            <v-layout column style="margin-left: 20px;">
              <h1>Cycling Behaviour</h1>
              <v-radio-group v-model="user.cyclingBehaviour.q1">
                <p class="title">Do you own a bike that is in working condition?</p>
                <v-radio label="Yes" value=1></v-radio>
                <v-radio label="No, but I use a bike rental service" value=2></v-radio>
                <v-radio label="No, I don't have access to a working bike" value=3></v-radio>
              </v-radio-group>

              <p class="title">How many bicycles do you regularly use?</p>
              <v-layout row wrap>
                <v-flex xs12 sm6 md5>
                  <v-text-field label="e.g. 2" v-model="user.cyclingBehaviour.q2"></v-text-field>
                </v-flex>
              </v-layout>

              <v-radio-group v-model="user.cyclingBehaviour.q3">
                <p class="title">Do you regularly ride electronic bicycles (E-Bikes)?</p>
                <v-radio label="Yes" value=1></v-radio>
                <v-radio label="No" value=2></v-radio>
              </v-radio-group>

              <v-radio-group v-model="user.cyclingBehaviour.q4">
                <p class="title">How often do you ride your bike?</p>
                <v-radio label="Every day" value=1></v-radio>
                <v-radio label="Multiple times a week" value=2></v-radio>
                <v-radio label="More than 4 times a month" value=3></v-radio>
                <v-radio label="Less than 4 times a month" value=4></v-radio>
                <v-radio label="Less than once a year" value=5></v-radio>
                <v-radio label="Never" value=6></v-radio>
              </v-radio-group>

              <p class="title">Which of the following equipment do you use for tracking your bicycle rides?</p>
              <v-checkbox v-model="user.cyclingBehaviour.q5" label="Smartphone with Strava" value="Strava"
                          style="margin-top: -10px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q5" label="Smartphone with an other app" value="Other App"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q5" label="A dedicated GPS device (e.g. Garmin Edge)"
                          value="GPS Device" style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q5" label="Watt Meter" value="Watt"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q5" label="Other bike sensors"
                          value="Sensors" style="margin-top: -15px;"></v-checkbox>
              <br>

              <section v-if="user.cyclingBehaviour.q5.includes('Other App')">
                <p class="title">Which apps do you use for tracking?</p>
                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-textarea label="Please specify (e.g. Strava)"
                                v-model="user.cyclingBehaviour.q5Text"></v-textarea>
                  </v-flex>
                </v-layout>
              </section>

              <p class="title">Which apps do you use for navigation?</p>
              <v-layout row wrap>
                <v-flex xs12 sm6 md6>
                  <v-textarea label="Please specify" v-model="user.cyclingBehaviour.q6"></v-textarea>
                </v-flex>
              </v-layout>

              <v-radio-group v-model="user.cyclingBehaviour.q7">
                <p class="title">Check the statement that fits best.</p>
                <v-radio label="A bike is a mean of transportation for (e.g. for commuting)" value=1></v-radio>
                <v-radio label="I use the bicycle for sports and training" value=2></v-radio>
                <v-radio label="Both" value=3></v-radio>
              </v-radio-group>

              <p class="title">What are the main reasons you ride your bike on <b style="color:#ee5b19;">working
                days</b>?</p>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Recreational" value="Recreational"
                          style="margin-top: -10px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Visiting friends" value="Visiting friends"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Work purpose or commute"
                          value="Work purpose or commute" style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Social activities" value="Social activities"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="School or university" value="School or university"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="I do not ride on working days"
                          value="I do not ride on working days" style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Other" value="Other"
                          style="margin-top: -15px;"></v-checkbox>

              <v-layout row wrap v-if="user.cyclingBehaviour.q8.includes('Other')">
                <v-flex xs12 sm6 md6>
                  <v-textarea label="Please specify your other reasons"
                              v-model="user.cyclingBehaviour.q8Text"></v-textarea>
                </v-flex>
              </v-layout>

              <v-radio-group v-model="user.cyclingBehaviour.q9">
                <p class="title">On average, how long do you usually ride <b>per trip</b> on <b style="color:#ee5b19;">working
                  days</b>?</p>
                <v-radio label="0 - 30 minutes" value=1></v-radio>
                <v-radio label="30 - 60 minutes" value=2></v-radio>
                <v-radio label="1 - 2 hours" value=3></v-radio>
                <v-radio label="2 - 4 hours" value=4></v-radio>
                <v-radio label="More than 4 hours" value=5></v-radio>
              </v-radio-group>

              <br>
              <p class="title">What are the main reasons you ride your bike on the <b style="color:#ee5b19;">weekend</b>?
              </p>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Recreational" value="Recreational"
                          style="margin-top: -10px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Visiting friends" value="Visiting friends"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Work purpose or commute"
                          value="Work purpose or commute" style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Social activities" value="Social activities"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="School or university" value="School or university"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="I do not ride on weekends"
                          value="I do not ride on weekends" style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Other" value="Other"
                          style="margin-top: -15px;"></v-checkbox>

              <v-layout row wrap v-if="user.cyclingBehaviour.q10.includes('Other')">
                <v-flex xs12 sm6 md6>
                  <v-textarea label="Please specify your other reasons"
                              v-model="user.cyclingBehaviour.q10Text"></v-textarea>
                </v-flex>
              </v-layout>

              <v-radio-group v-model="user.cyclingBehaviour.q11">
                <p class="title">On average, how long do you usually ride <b>per trip</b> on the <b
                  style="color:#ee5b19;">weekend</b>?
                </p>
                <v-radio label="0 - 30 minutes" value=1></v-radio>
                <v-radio label="30 - 60 minutes" value=2></v-radio>
                <v-radio label="1 - 2 hours" value=3></v-radio>
                <v-radio label="2 - 4 hours" value=4></v-radio>
                <v-radio label="More than 4 hours" value=5></v-radio>
              </v-radio-group>

              <v-radio-group v-model="user.cyclingBehaviour.q12">
                <p class="title">Tracking rides on Strava: Which of the following statements do you most agree with?</p>
                <v-radio label="I track all my rides on Strava" value=1></v-radio>
                <v-radio label="I track most of my rides on Strava" value=2></v-radio>
                <v-radio label="I track my rides only occasionally on Strava" value=3></v-radio>
                <v-radio label="I never track my rides on Strava" value=4></v-radio>
              </v-radio-group>


              <v-radio-group v-model="user.cyclingBehaviour.q13">
                <p class="title">Cycling purpose: Which of the following statements do you most agree with?</p>
                <v-radio
                  label="I am a pure commuter, meaning I only use by bike as a mean of transportation (to get from A to B, e.g. to work or university)"
                  value=1></v-radio>
                <v-radio label="I am a recreational cyclist and ride mostly as a hobby" value=2></v-radio>
                <v-radio
                  label="I am a professional cyclist, cycling is my main occupation and I make money from it or plan to make money from it in the future"
                  value=3></v-radio>
              </v-radio-group>

              <section>
                <p class="title">Rate the following items on their importance when choosing a cycling route?</p>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Distance
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.cyclingBehaviour.q14.i1"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Travel time
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.cyclingBehaviour.q14.i2"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Traffic safety
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.cyclingBehaviour.q14.i3"
                              :tick-labels="['Unimportant',' ','Neutral',' ', ' important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Gradient and elevation profile
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.cyclingBehaviour.q14.i4"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Scenery
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.cyclingBehaviour.q14.i5"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Security (how secure is the area?)
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.cyclingBehaviour.q14.i6"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Facilities (toilets, water sources, food and drinks, restaurants, repair stations)
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.cyclingBehaviour.q14.i7"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <br>
              </section>

              <v-btn class="gradient gradient-orange" style="width: 200px;" dark round @click="e1 = 3"
                     v-on:click="logUser">Continue
              </v-btn>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-layout column style="margin-left: 20px;">
              <h1>Almost Done...!</h1>
              <br>
              <v-layout column wrap>
                <!--NOT RELEVANT FOR STUDY LOGIN
                <h4>First Name</h4>
                <p>{{user.firstName}}</p>

                <h4>Last Name</h4>
                <p>{{user.lastName}}</p>

                <h4>Username</h4>
                <p>{{user.username}}</p>

                <h4>E-Mail</h4>
                <p>{{user.email}}</p>-->

                <p>This is the end of the sign-up questionnaire. You can still change your answers. <b>Once you finish
                  the questionnaire, you cannot change your answers.</b> Please read and accept the terms and
                  conditions for using this website.</p>
                <br>
                <h1>Field Study</h1>
                <p>In the field study, you will have to use the ExploX website for the next 2-4 weeks (until 15. July)
                  and can win the
                  rewards.</p>
                <p>We will reward your participation in the study with the chance to win one of <b>6 x 25€ Amazon
                  Voucher</b>
                  that
                  you will receive
                  at the end of the study. <b style="color: #ee5b19">Additionally:</b> The first 5 participants to
                  actually cycle at least 2 of
                  the generated routes,
                  track and save them as Strava activities and give us detailed information about the routes will
                  receive a <b>30€ cycling gear voucher</b>.
                </p>
                <section>
                  <v-layout row>
                    <v-flex coluxs12 sm3>
                      <v-btn large class="gradient gradient-blue" dark round v-on:click="signup(false)">
                        <v-icon>check</v-icon>
                        Finish Questionnaire
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </section>
              </v-layout>
            </v-layout>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </section>
</template>


<script>
  import apiMixin from '../../mixins/apiMixin'
  import geoTransformMixin from '../../mixins/geoTransformMixin'
  import {EventBus} from '@/eventBus'
  import axios from 'axios'

  export default {
    name: 'PostStudyQuestionnaire',
    data () {
      return {
        e1: 0,
        show: false,
        dialog: false,
        cacheTime: 'not yet',
        deadlinePassed: false,
        questionnaireEnabled: true,
        lang: 'en',
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

      setTimeout(() => {
        EventBus.$emit('collapseDrawer')
      }, 100)
    },
    props: {
      user: Object,
    },

    methods: {
      logUser () {
        this.$vuetify.goTo(0, {duration: 0, offset: 0, easing: 'easeInOutCubic'})
        console.log(this.user)
      },
      async update () {
        const formData = {
          _csrf: this.csrfToken,
          name: this.updatedUser.name,
          username: this.updatedUser.username,
          email: this.updatedUser.email,
        }

        this.PUT('users/' + this.user._id, formData, null, (data, err) => {
          if (!err) {
            EventBus.$emit('reloadData')
          }
        })
      },
    },
    mixins: [apiMixin, geoTransformMixin]
  }
</script>

<style scoped>

</style>
