<template>
  <section v-if="lang === 'en'">
    <v-layout row flex>
      <v-flex md10>
        <h3>Switch language / Sprache wählen:</h3>
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
    <v-container fluid style="width: 100%;">
      <v-stepper non-linear v-model="e1" v-if="user">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 0" step="0" editable>Introduction</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 1" step="1" editable>Demographics</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2" editable>Cycling Behaviour</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 3" step="3" editable>Route Planning</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 4" step="4" editable>Profile Information</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 5" step="5">Finish</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="0">
            <v-layout column style="margin-left: 20px;">
              <h1>About the study</h1>
              <br>
              <p><b>Thank you for signing up to ExploX. Please read the following notes carefully:</b></p>

              <v-alert v-if="deadlinePassed" :value="true" color="accent" icon="info" outline>
                <h2>Too late :(</h2>
                Unfortunately, you have passed the time where you can enter the life field study. In order to focus on
                the study participants, we can not let further users use the website.
                <b>Your answes to this questionnaire will still be very useful for us. If you want, you can fill out the
                  following questionnaire. We will then inform you when the website is available after the study.</b>
              </v-alert>
              <br>
              <h2>Purpose of this study</h2>
              <p>You are invited to use ExploX for the next weeks and thereby contribute to our research on cycling
                behaviour. By answering the following questionnaires and using this website for the next weeks,
                you will participate in the study.</p>
              <h2>Reward</h2>
              <p>We will reward your participation in the study with the chance to win <b style="color:#ee5b19;">one of
                6 x 25€ Amazon
                Vouchers</b>. If you win, you will receive the voucher at the end of the study. You have to fulfill the following
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
              <p><b style="color: #ee5b19">Additionally:</b> The participants that fulfill the above criteria and
                actually cycle at least 2 of
                the generated routes, track and save them as Strava activities and give us detailed information about
                the routes get the chance to win one of <b style="color:#ee5b19;">3 x 50€ Bike Gear Vouchers</b>!
              </p>
              <h2>Time and dates for the study</h2>
              <p><b>Registration phase:</b> <span style="color: #ee5b19">24. June - 21. July 2019</span> (4 Weeks)</p>
              <p><b>Usage phase:</b> <span style="color: #ee5b19">24. June - 28. July 2019</span> (5 Weeks)</p>
              <p><b>User Experience Questionnaire und interviews after the study:</b> <span style="color: #ee5b19">21. July - 04. August 2019</span>
                (3 Weeks), earliest time is after extensive use of the website and fulfillment of all study duties</p>
              <h2>Preconditions and Eligibility</h2>
              <p>In the following, you will find some questionnaires that you have to answer thoroughly if you want to join the study. At the end of the questionnaires, you will see if you are
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
              <v-btn round to="dataprotection" style="width: 400px;">Data Protection Information</v-btn>
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
              </v-radio-group>

              <p class="title">Age:</p>
              <v-text-field v-model="user.demographics.q2" type="number" label="" min="0" max="100"
                            style="width: 100px;"></v-text-field>


              <p class="title">Where do you live?</p>
              <v-layout row wrap>
                <v-flex xs12 sm6 md5>
                  <v-text-field v-on:blur="validateLocation($event, true)"
                                label="e.g. 66123 Saarbrücken or leave blank"
                                v-model="user.demographics.q5"></v-text-field>
                  <p>{{homeLocationDisplay}}</p>
                </v-flex>
              </v-layout>

              <br>

              <p class="title">Where do you ride your bike most often?</p>
              <v-layout row wrap>
                <v-flex xs12 sm6 md5>
                  <v-text-field v-on:blur="validateLocation($event, false)"
                                label="e.g. Landkreis Merzig-Wadern" v-model="user.demographics.q6"></v-text-field>
                  <p>{{cyclingLocationDisplay}}</p>
                </v-flex>
              </v-layout>

              <v-radio-group v-model="user.demographics.q3">
                <p class="title">Highest completed level of education:</p>
                <v-radio label="Less than high school degree" value=1></v-radio>
                <v-radio label="High school degree" value=2></v-radio>
                <v-radio label="University or College degree" value=3></v-radio>
                <v-radio label="Prefer not to say" value=4></v-radio>
                <v-radio label="Other" value=5></v-radio>
              </v-radio-group>

              <v-layout row wrap v-if="user.demographics.q3 === '5'">
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
                <p class="title">How often do you ride your bike during the biking season (spring to fall)?</p>
                <v-radio label="Every day" value=1></v-radio>
                <v-radio label="1 or 2 times a week" value=2></v-radio>
                <v-radio label="Multiple times a week" value=3></v-radio>
                <v-radio label="More than 4 times a month" value=4></v-radio>
                <v-radio label="Less than 4 times a month" value=5></v-radio>
                <v-radio label="Less than once a year" value=6></v-radio>
                <v-radio label="Never" value=7></v-radio>
              </v-radio-group>

              <p class="title">Which of the following equipment do you use for tracking your bicycle rides?</p>
              <v-checkbox v-model="user.cyclingBehaviour.q5" label="Smartphone with Strava" value="Strava"
                          style="margin-top: -10px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q5" label="Smartphone with an other app" value="Other App"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q5" label="Smartwatch or Fitness Tracker" value="Smartwatch"
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
                <v-radio label="A bike is a mean of transportation (e.g. for commuting)" value=1></v-radio>
                <v-radio label="I use the bicycle for sports and training" value=2></v-radio>
                <v-radio label="Both" value=3></v-radio>
              </v-radio-group>

              <p class="title">What are the main reasons why you ride your bike on <b style="color:#ee5b19;">working
                days</b>?</p>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Sports and Training" value="Sport"
                          style="margin-top: -10px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Visiting friends" value="Visiting friends"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Work purpose or commute"
                          value="Work purpose or commute" style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Social activities" value="Social activities"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="School or university" value="School or university"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Shopping" value="Shopping"
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
              <p class="title">What are the main reasons why you ride your bike on the <b style="color:#ee5b19;">weekend</b>?
              </p>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Sports and Training" value="Sport"
                          style="margin-top: -10px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Visiting friends" value="Visiting friends"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Work purpose or commute"
                          value="Work purpose or commute" style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Social activities" value="Social activities"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="School or university" value="School or university"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Shopping" value="Shopping"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="I do not ride on weekends"
                          value="I do not ride on working days" style="margin-top: -15px;"></v-checkbox>
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

              <v-radio-group v-model="user.cyclingBehaviour.q12a">
                <p class="title">Tracking rides on Strava: Which of the following statements do you most agree with?</p>
                <v-radio label="I track all my rides on Strava" value=1></v-radio>
                <v-radio label="I track most of my rides on Strava" value=2></v-radio>
                <v-radio label="I track my rides only occasionally on Strava" value=3></v-radio>
                <v-radio label="I never track my rides on Strava" value=4></v-radio>
              </v-radio-group>

              <v-radio-group v-model="user.cyclingBehaviour.q12b" v-if="user.cyclingBehaviour.q12a !== '4'">
                <p class="title">Publishing activities: Which of the following statements do you most agree with?</p>
                <v-radio label="I publish all my tracked activities" value=1></v-radio>
                <v-radio label="I publish some of my tracked activities" value=2></v-radio>
                <v-radio label="I publish none of my tracked activities" value=3></v-radio>
              </v-radio-group>

              <v-radio-group v-model="user.cyclingBehaviour.q13">
                <p class="title">Cycling purpose: Which of the following statements do you most agree with?</p>
                <v-radio
                  label="I am a pure commuter, meaning I *only* use by bike as a mean of transportation (to get from A to B, e.g. to work or university)"
                  value=1></v-radio>
                <v-radio label="I am a recreational cyclist and ride mostly as a hobby (including commuting)"
                         value=2></v-radio>
                <v-radio
                  label="I am a professional cyclist, cycling is my main occupation and I make money from it or plan to make money from it in the future"
                  value=3></v-radio>
              </v-radio-group>

              <section>
                <p class="title">Rate the following route properties on their importance for you when choosing a cycling
                  route? Move the slider using your mouse. If a property is totally irrelevant for you, leave the slider
                  on the left position</p>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Distance
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.cyclingBehaviour.q14.i1"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Travel time
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.cyclingBehaviour.q14.i2"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Traffic safety
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.cyclingBehaviour.q14.i3"
                              :tick-labels="['Unimportant',' ','Neutral',' ', ' important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Gradient and elevation profile
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.cyclingBehaviour.q14.i4"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Scenery
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.cyclingBehaviour.q14.i5"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Security (how secure is the area?)
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.cyclingBehaviour.q14.i6"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Facilities (toilets, water sources, food and drinks, restaurants, repair stations)
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.cyclingBehaviour.q14.i7"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <br>
              </section>

              <v-btn class="gradient gradient-orange" style="width: 200px;" dark round @click="e1 = 3"
                     v-on:click="logUser">Continue
              </v-btn>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="3" v-if="user.routePlanning">
            <v-layout column wrap style="margin-left: 20px;">
              <h1>Route Planning</h1>

              <v-radio-group v-model="user.routePlanning.q1">
                <p class="title">Did you ever pay for Strava (Summit)?</p>
                <v-radio label="Yes, I use Summit or have used it in the past" value=1></v-radio>
                <v-radio label="No" value=2></v-radio>
              </v-radio-group>

              <section v-if="user.routePlanning.q1 === '1'">
                <p class="title">Which Strava Summit features do you (regularly) use?</p>
                <v-checkbox v-model="user.routePlanning.q2" label="Individual goals and training plans"
                            value="Goals and plans" style="margin-top: -10px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q2" label="Filtered rankings and competition analysis"
                            value="Competition" style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q2" label="Live performance"
                            value="Live" style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q2" label="Beacon" value="Beacon"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q2" label="Personal heatmaps"
                            value="Heatmaps" style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q2" label="Live segments"
                            value="Segments" style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q2"
                            label="Training, performance, heart rate and fitness analysis"
                            value="Analysis" style="margin-top: -15px;"></v-checkbox>
                <br>
              </section>

              <section>
                <p class="title">Why do you use Strava? Rate the following reasons by importance</p>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Seeing my personal records in segments
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q3.i1"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Recording activities
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q3.i2"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Sharing activities with friends
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q3.i3"
                              :tick-labels="['Unimportant',' ','Neutral',' ', ' important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Tracking training performance and progress (statistics)
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q3.i4"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Planning routes
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q3.i5"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Following friends and seeing their activities
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q3.i6"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <br>
              </section>

              <p class="title">Are there other reasons why you use Strava?</p>
              <v-layout row wrap>
                <v-flex xs12 sm6 md6>
                  <v-textarea label="Please specify" v-model="user.routePlanning.q3Text"></v-textarea>
                </v-flex>
              </v-layout>

              <section>
                <p class="title">How do you go about planning your cycling routes <b>when cycling on your own</b>?</p>
                <v-checkbox v-model="user.routePlanning.q4a" label="I plan spontaneously while I’m cycling"
                            value="Spontaneous"
                            style="margin-top: -10px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4a" label="I plan the route in my head beforehand" value="Head"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4a" label="I use a digital map or app (such as Google Maps)"
                            value="Digital"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4a" label="I use a physical (paper) map" value="Physical"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4a" label="Other" value="Other"
                            style="margin-top: -15px;"></v-checkbox>
              </section>
              <section v-if="user.routePlanning.q4a.includes('Other')">
                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-textarea label="Please specify" v-model="user.routePlanning.q4aText"></v-textarea>
                  </v-flex>
                </v-layout>
              </section>

              <section>
                <p class="title">How do you go about planning your cycling routes <b>when cycling in a group</b>?</p>
                <v-checkbox v-model="user.routePlanning.q4b" label="We plan spontaneously while we're cycling"
                            value="Spontaneous"
                            style="margin-top: -10px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4b" label="We plan the route in our head beforehand"
                            value="Head"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4b" label="We use a digital map or app (such as Google Maps)"
                            value="Digital"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4b" label="We use a physical (paper) map" value="Physical"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4b" label="I let the others plan and navigate" value="Passive"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4b" label="Other" value="Other"
                            style="margin-top: -15px;"></v-checkbox>
              </section>
              <section v-if="user.routePlanning.q4b.includes('Other')">
                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-textarea label="Please specify" v-model="user.routePlanning.q4bText"></v-textarea>
                  </v-flex>
                </v-layout>
              </section>


              <p class="title">Which digital maps, apps or websites do you use for planning your rides in advance?</p>
              <v-layout row wrap>
                <v-flex xs12 sm6 md6>
                  <v-textarea label="Please specify" v-model="user.routePlanning.q5"></v-textarea>
                </v-flex>
              </v-layout>

              <p class="title">What are common problems with your method of planning your routes?</p>
              <v-layout row wrap>
                <v-flex xs12 sm6 md6>
                  <v-textarea label="Please specify" v-model="user.routePlanning.q6"></v-textarea>
                </v-flex>
              </v-layout>

              <v-radio-group v-model="user.routePlanning.q7">
                <p class="title">Cycling new routes: Select the statement that fits best.</p>
                <v-radio label="I prefer to cycle in an area where I am generally familiar"
                         value=1></v-radio>
                <v-radio label="I prefer to go the exact same roads that I have taken before" value=2></v-radio>
                <v-radio
                  label="I like to take routes that I already know but change them a little bit so I take some new roads. I like a bit of variation."
                  value=3></v-radio>
                <v-radio
                  label="I always try to take as many roads that I have never taken before and see new places. I try to ride completely new routes whenever I go cycling."
                  value=4></v-radio>
              </v-radio-group>

              <section>
                <p class="title">How much do you agree with each of the following statements</p>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    I find it exciting to ride in places<br>
                    that I don’t know very well
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q8.i1"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    I find it motivating to gain a better<br>
                    knowledge of the area where I live
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q8.i2"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    I find it motivating to see many cities<br>
                    and towns when cycling
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q8.i3"
                              :tick-labels="['Unimportant',' ','Neutral',' ', ' important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    I find it motivating to see many landscapes<br>
                    and sights when cycling
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q8.i4"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    I am scared to get lost when I<br>
                    take new routes
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q8.i5"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    I enjoy talking about and sharing my<br>
                    cycling routes with friends
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q8.i6"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    I enjoy taking routes that friends have<br>
                    recommended to me
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q8.i7"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <br>
              </section>

              <v-btn class="gradient gradient-orange" style="width: 200px;" dark round @click="e1 = 4"
                     v-on:click="logUser">Continue
              </v-btn>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="4">
            <v-layout column wrap style="margin-left: 20px;">
              <h1>Profile Information</h1>
              <br>
              <v-alert :value="true" color="accent" icon="info" outline>
                <h2>Note on Your E-Mail Address and Privacy</h2>
                Your questionnaire answers will not be connected to your name/e-mail and will
                be deleted from our database immediately after the study evaluation. Your E-Mail will not be visible for
                anybody else. You can change your e-mail address later.
              </v-alert>
              <br>
              <v-text-field ref="emailEntry" :rules="[rules.required, rules.emailValid]"
                            name="input-10-2"
                            label="E-mail Address"
                            value=""
                            v-model="user.email"></v-text-field>
              <p><b>Important:</b> If you participate in the study, you will receive the Amazon voucher on this e-mail.
                Make sure it is the right e-mail address!</p>
              <!--<v-text-field label="First Name" hint="First Name" value="" v-model="user.firstName"></v-text-field>
              <br>
              <v-text-field label="Last Name" hint="Last Name" value="" v-model="user.lastName"></v-text-field>
              <br>-->
              <!--<v-text-field label="User Name" hint="User Name" value="" v-model="user.username"></v-text-field>-->
              <!-- PASSWORD LOGIN IS NOT USED IN THE STUDY
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
              -->
              <v-btn class="gradient gradient-orange" style="width: 200px;" dark round @click="validatePassword">
                Continue
              </v-btn>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="5">
            <v-layout column wrap style="margin-left: 20px;">
              <h1>Almost Done...!</h1>
              <br>
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
              <p>In the field study, you will have to use the ExploX website for the next 2-4 weeks
                and can win the
                rewards.</p>
              <br>
              <!--<v-alert :value="true" type="success" v-if="this.isEligible">
                You are eligible to participate in the study.
              </v-alert>

              <v-alert :value="true" type="info" v-if="!this.isEligible && this.canUseWebsite">
                You are <b>not</b> eligible to participate in the study but you can use the website anyway.
              </v-alert>


              <v-alert :value="true" type="error" v-if="!this.canUseWebsite">
                Sorry, but you are <b>not</b> eligible to use the website because your cycling location is too far
                away from Saarland.
              </v-alert>-->
              <br>

              <section v-if="this.isEligible || this.canUseWebsite">
                <h1>Do you want to participate in the study?</h1>
                <!--<v-checkbox :label="checkbox1_text" v-model="emailsCheckbox" style="margin-bottom: -20px;"></v-checkbox>-->
                <v-btn depressed v-on:click="dialog = true" large>Terms & Conditions
                </v-btn>
                <v-checkbox :rules="[rules.required]" :label="checkbox2_text" v-model="termsCheckbox"
                            v-bind:error="termsError"></v-checkbox>
                <br>
              </section>
              <section v-if="this.isEligible">
                <v-layout row>
                  <v-flex column xs12 md6>
                    <v-btn :disabled="loadingDialog" :loading="loadingDialog" large class="gradient gradient-success"
                           dark round v-on:click="signupParticipate">
                      <v-icon>check</v-icon>
                      &nbsp;Submit
                    </v-btn>
                  </v-flex>
                  <!--<v-flex xs12 md6>
                    <v-btn :disabled="loadingDialog" :loading="loadingDialog" style="height: 60px;" large
                           class="gradient gradient-green" round
                           v-on:click="signup(false)">
                      Finish without participating<br>in the study
                    </v-btn>
                  </v-flex>-->
                </v-layout>
              </section>

              <section v-if="!this.isEligible && this.canUseWebsite">
                <v-layout row>
                  <v-flex coluxs12 sm3>
                    <v-btn :disabled="loadingDialog" :loading="loadingDialog" large class="gradient gradient-blue" dark
                           round v-on:click="signup(false)">
                      Submit
                    </v-btn>
                  </v-flex>
                </v-layout>
              </section>

              <v-dialog v-model="dialog" width="600px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Terms and Conditions for ExploX</span>
                  </v-card-title>
                  <v-card-text>
                    <data-protection></data-protection>
                    <h1>Terms and Conditions for ExploX</h1>
                    <p>These Website Standard Terms and Conditions written on this webpage shall manage your use of
                      our
                      website, ExploX accessible at umtl.dfki.de/explox.</p>
                    <p>These Terms will be applied fully and affect to your use of this Website. By using this
                      Website,
                      you agreed to accept all terms and conditions written in here. You must not use this Website if
                      you disagree with any of these Website Standard Terms and Conditions.</p>

                    <h3>Intellectual Property Rights</h3>
                    <p>Other than the content you own, under these Terms, Saarland University and/or its licensors own
                      all the
                      intellectual property rights and materials contained in this Website.</p>
                    <p>You are granted limited license only for purposes of viewing the material contained on this
                      Website.</p>

                    <h3>Restrictions</h3>
                    <p>You are specifically restricted from all of the following:</p>
                    <ul>
                      <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
                      <li>using this Website in any way that is or may be damaging to this Website;</li>
                      <li>using this Website in any way that impacts user access to this Website;</li>
                      <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm
                        to the Website, or to any person or business entity;
                      </li>
                      <li>engaging in any data mining, data harvesting, data extracting or any other similar activity
                        in
                        relation to this Website;
                      </li>
                    </ul>
                    <p>Certain areas of this Website are restricted from being access by you and Saarland University
                      may further
                      restrict access by you to any areas of this Website, at any time, in absolute discretion. Any
                      user
                      ID and password you may have for this Website are confidential and you must maintain
                      confidentiality as well.</p>

                    <h3>No warranties</h3>
                    <p>This Website is provided "as is," with all faults, and Saarland University express no
                      representations or
                      warranties, of any kind related to this Website or the materials contained on this Website.
                      Also,
                      nothing contained on this Website shall be interpreted as advising you.</p>

                    <h3>Limitation of liability</h3>
                    <p>In no event shall Saarland University, nor any of its officers, directors and employees, shall
                      be held liable
                      for anything arising out of or in any way connected with your use of this Website whether such
                      liability is under contract. Saarland University, including its officers, directors and
                      employees shall not be
                      held liable for any indirect, consequential or special liability arising out of or in any way
                      related to your use of this Website.</p>

                    <h3>Indemnification</h3>
                    <p>You hereby indemnify to the fullest extent Saarland University from and against any and/or all
                      liabilities,
                      costs, demands, causes of action, damages and expenses arising in any way related to your breach
                      of any of the provisions of these Terms.</p>

                    <h3>Severability</h3>
                    <p>If any provision of these Terms is found to be invalid under any applicable law, such
                      provisions
                      shall be deleted without affecting the remaining provisions herein.</p>

                    <h3>Variation of Terms</h3>
                    <p>Saarland University is permitted to revise these Terms at any time as it sees fit, and by using
                      this Website
                      you
                      are expected to review these Terms on a regular basis.</p>

                    <h3>Assignment</h3>
                    <p>The Saarland University is allowed to assign, transfer, and subcontract its rights and/or
                      obligations under
                      these Terms without any notification. However, you are not allowed to assign, transfer, or
                      subcontract any of your rights and/or obligations under these Terms.</p>

                    <h3>Entire Agreement</h3>
                    <p>These Terms constitute the entire agreement between Saarland University and you in relation to
                      your use of
                      this
                      Website, and supersede all prior agreements and understandings.</p>

                    <h3>Governing Law & Jurisdiction</h3>
                    <p>These Terms will be governed by and interpreted in accordance with the laws of the State of
                      Germany,
                      and you submit to the non-exclusive jurisdiction of the state and federal courts located in
                      Germany
                      for
                      the resolution of any disputes.</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat"
                           @click="() => {this.dialog = false; this.termsCheckbox = true;}">Agree
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </section>
  <section v-else>
    <v-layout row flex>
      <v-flex md10>
        <h3>Switch language / Sprache wählen:</h3>
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
        Anderungen gespeichert: {{ cacheTime }}
      </v-flex>
    </v-layout>
    <v-container fluid style="width: 100%;">
      <v-stepper non-linear v-model="e1" v-if="user">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 0" step="0" editable>Einleitung</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 1" step="1" editable>Demografische Fragen</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2" editable>Radfahrverhalten</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 3" step="3" editable>Routenplanung</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 4" step="4" editable>Profil Informationen</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 5" step="5">Fertig</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="0">
            <v-layout column style="margin-left: 20px;">
              <h1>Über diese Studie</h1>
              <br>
              <p><b>Danke, dass Sie sich bei ExploX angemeldet haben. Bitte lesen Sie folgende Hinweise aufmerksam
                durch:</b></p>
              <v-alert v-if="deadlinePassed" :value="true" color="accent" icon="info" outline>
                <h2>Zu spät :(</h2>
                Leider ist die Anmeldefrist für die Studie bereits verstrichen. Um uns auf die Teilnehmer zu
                konzentrieren, können wir keine weiteren Benutzer annehmen.
                <b>Ihre Antwort auf diesen Fragebogen sind dennoch sehr hilfreich für uns. Wenn Sie möchten, können Sie
                  die Fragen gerne beantworten. Wir werden Sie dann informieren, wenn ExploX nach der Studie wieder
                  verfügbar ist.</b>
              </v-alert>
              <br>

              <h2>Ziel der Studie</h2>
              <p>Sie sind dazu eingeladen, diese Website in den nächsten Wochen zu nutzen und dadurch zur Forschung im
                Bereich des Verhaltens im Radsport beizutragen. Durch das Beantworten des folgenden Fragebogens und der
                abschließenden Befragung, sowie der Nutzung der Website in den kommenden Wochen können Sie an der Studie
                teilnehmen.</p>
              <h2>Belohnung</h2>
              <p>Wir Belohnen die Teilnahme an der Studie mit der Chance <b style="color:#ee5b19;">einen von
                6 x 25€ Amazon Gutscheinen</b> zu gewinnen. Wenn Sie gewinnen erhalten Sie diesen am Ende der Studie.
                Folgende Kriterien müssen Sie dabei erfüllen:</p>
              <ul>
                <li>Sie haben den folgenden Fragebogen vollständig ausgefüllt.<b>(ca. 15 min)</b>.
                </li>
                <li>Sie haben mindestens 15 (erfolgreiche) Routenvorschläge generiert und alle resultierenden Routen
                  bewertet <b>(ca. 45 min)</b>.
                </li>
                <li>Sie haben den User Experience Questionnaire am Ende der Studie ausgefüllt (ca. 5 min).</li>
                <li>Sie haben am Ende der Studie kurzes individuelles Feedback gegeben <b>(ca. 5-10 min)</b>.
                </li>
              </ul>
              <p><b style="color: #ee5b19">Außerdem:</b> Unter allen Teilnehmern, die neben obigen Kriterien mindestens
                2 der generierten Routenvorschläge tatsächlich fahren, tracken, in Strava als Aktivitäten speichern und
                detailliertes Feedback zu den Routen geben, können einen von <b style="color:#ee5b19;">3 x 50€
                  Gutscheinn
                  für
                  Fahrradzubehör gewinnen</b>!
              </p>
              <br>
              <h2>Zeitraum der Studie und Termine</h2>
              <p><b>Registrierungsphase:</b> <span style="color: #ee5b19">24. Juni - 21. Juli 2019</span> (4 Wochen)</p>
              <p><b>Nutzungsphase:</b> <span style="color: #ee5b19">24. Juni - 28. Juli 2019</span> (5 Wochen)</p>
              <p><b>User Experience Questionnaire und Interviews nach der Studie:</b> <span style="color: #ee5b19">21. Juli - 04. August 2019</span>
                (3 Wochen), frühestens nach ausführlicher Nutzung der Website und Erldigung der Aufgaben der Studie
                (siehe unten "Belohnung").</p>

              <h2>Vorraussetzungen und Teilnahmebedingungen</h2>
              <p>Im Folgenden werden Sie durch einen Fragebogen geleitet, den Sie vollständig und sorgfältig ausfüllen
                müssen. Am Ende des Fragebogens erfahren Sie, ob Sie (auf Grundlage Ihrer Antworten) an der Studie
                teilnehmen dürfen.<br>
                Bitte nehmen Sie sich die Zeit, die Fragen sorgfältig und ausführlich zu beantworten. Über die obige
                Leiste, können Sie zwischen den Kategorien wechseln und so Ihre Antworten überprüfen. Sie müssen <b>alle
                  Fragen</b>
                beantworten, wobei bei manchen offenen Fragen auch eine einfache Antwort wie bspw. "Nein" genügen
                kann.<br>
                Sie sind zur Teilnahme an der Studie qualifiziert, wenn ...
              </p>
              <ul>
                <li>Sie Zugang zu einem einsatzfähigen Fahrrad haben (Ihr eigenes oder ein Leihservice),</li>
                <li>Sie ihr Fahrrad mindestens ein paar mal im Jahr benutzen,</li>
                <li>Sie ein Hobbyfahrer sind und kein Profifahrer und darüber hinaus das Fahrrad nicht nur als reines
                  Transportmittel nutzen,
                </li>
                <li>Sie mindestens 10 Fahrten im Bereich des Saarlandes auf Strava getrackt und gespeichert haben,</li>
                <li>und Sie ihr Fahrrad regelmäßig in der Region in und um das Saarland nutzen (max. 50km bis zum
                  Saarland, z.B. Metz).
                </li>
              </ul>
              <br>
              <v-btn round to="dataprotection" style="width: 400px;">Data Protection Information</v-btn>

              <br>

              <br>
              <v-btn class="gradient gradient-orange" style="width: 200px;" v-on:click="logUser" dark round
                     @click="e1 = 1">Weiter
              </v-btn>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="1" v-if="user.demographics">
            <v-layout column style="margin-left: 20px;">
              <h1>Demografische Fragen</h1>
              <v-radio-group v-model="user.demographics.q1">
                <p class="title">Geschlecht:</p>
                <v-radio label="Männlich" value=1></v-radio>
                <v-radio label="Weiblich" value=2></v-radio>
                <v-radio label="Andere" value=3></v-radio>
              </v-radio-group>

              <p class="title">Alter:</p>
              <v-text-field v-model="user.demographics.q2" type="number" label="" min="0" max="100"
                            style="width: 100px;"></v-text-field>

              <p class="title">Wo leben/wohnen Sie? (ungefähre Angebe genügt)</p>
              <v-layout row wrap>
                <v-flex xs12 sm6 md5>
                  <v-text-field v-on:blur="validateLocation($event, true)"
                                label="z.B. 66123 Saarbrücken oder leer lassen"
                                v-model="user.demographics.q5"></v-text-field>
                  <p>{{homeLocationDisplay}}</p>
                </v-flex>
              </v-layout>

              <br>

              <p class="title">Wo fahren Sie am häufigsten Fahrrad?</p>
              <v-layout row wrap>
                <v-flex xs12 sm6 md5>
                  <v-text-field v-on:blur="validateLocation($event, false)"
                                label="z.B. Landkreis Merzig-Wadern" v-model="user.demographics.q6"></v-text-field>
                  <p v-if="canUseWebsite" style="color: green">{{cyclingLocationDisplay}}</p>
                  <p v-else style="color: red">Nicht in der Nähe des Saarlandes: {{cyclingLocationDisplay}}</p>
                </v-flex>
              </v-layout>

              <v-radio-group v-model="user.demographics.q3">
                <p class="title">Höchster Bildungsabschluss:</p>
                <v-radio label="Mittlere Reife" value=1></v-radio>
                <v-radio label="Abitur" value=2></v-radio>
                <v-radio label="Hochschulabschluss" value=3></v-radio>
                <v-radio label="Keine Angabe" value=4></v-radio>
                <v-radio label="Anderen" value=5></v-radio>
              </v-radio-group>

              <v-layout row wrap v-if="user.demographics.q3 === '5'">
                <v-flex xs12 sm6 md3>
                  <v-text-field label="Bitte angeben" v-model="user.demographics.q3Text"></v-text-field>
                </v-flex>
              </v-layout>

              <v-radio-group v-model="user.demographics.q4">
                <p class="title">Beschäftigung:</p>
                <v-radio label="Vollzeit angestellt" value=1></v-radio>
                <v-radio label="Teilzeit angestellt" value=2></v-radio>
                <v-radio label="Student" value=3></v-radio>
                <v-radio label="Selbstständig" value=4></v-radio>
                <v-radio label="Keine Beschäftigung" value=5></v-radio>
                <v-radio label="Pensioniert" value=6></v-radio>
                <v-radio label="Keine Angabe" value=7></v-radio>
              </v-radio-group>

              <v-btn class="gradient gradient-orange" style="width: 200px;" dark round @click="e1 = 2"
                     v-on:click="logUser">Weiter
              </v-btn>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="2" v-if="user.cyclingBehaviour">
            <v-layout column style="margin-left: 20px;">
              <h1>Radfahrverhalten</h1>
              <v-radio-group v-model="user.cyclingBehaviour.q1">
                <p class="title">Besitzen Sie ein fahrtaugliches Fahrrad?</p>
                <v-radio label="Ja" value=1></v-radio>
                <v-radio label="Nein, aber ich nutze einen Leihservice" value=2></v-radio>
                <v-radio label="Nein, ich habe keinen Zugang zu einem Fahrrad" value=3></v-radio>
              </v-radio-group>

              <p class="title">Wie viele Fahrräder fahren sie regelmäßig?</p>
              <v-layout row wrap>
                <v-flex xs12 sm6 md5>
                  <v-text-field label="z.B. 2" v-model="user.cyclingBehaviour.q2"></v-text-field>
                </v-flex>
              </v-layout>

              <v-radio-group v-model="user.cyclingBehaviour.q3">
                <p class="title">Fahren Sie regelmäßig ein E-Bike?</p>
                <v-radio label="Ja" value=1></v-radio>
                <v-radio label="Nein" value=2></v-radio>
              </v-radio-group>

              <v-radio-group v-model="user.cyclingBehaviour.q4">
                <p class="title">Wie oft fahren Sie während der Fahrradsaison (Frühjahr bis Herbst) im Durchschnitt
                  Fahrrad?</p>
                <v-radio label="Täglich" value=1></v-radio>
                <v-radio label="1-2 mal pro Woche" value=2></v-radio>
                <v-radio label="Mehrmals wöchentlich" value=3></v-radio>
                <v-radio label="Mehr als 4 mal monatlich" value=4></v-radio>
                <v-radio label="Weniger als 4 mal monatlich" value=5></v-radio>
                <v-radio label="Weniger als einmal jährlich" value=6></v-radio>
                <v-radio label="Nie" value=7></v-radio>
              </v-radio-group>

              <p class="title">Welches Equipment nutzen Sie, um Ihre Fahrten zu tracken/aufzuzeichnen?</p>
              <v-checkbox v-model="user.cyclingBehaviour.q5" label="Smartphone mit Strava App" value="Strava"
                          style="margin-top: -10px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q5" label="Smartphone mit einer anderen App" value="Other App"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q5" label="Smartwatch oder Fitnesstracker" value="Smartwatch"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q5" label="Ein GPS-Gerät (z.B. Garmin Edge)"
                          value="GPS Device" style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q5" label="Watt Meter" value="Watt"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q5" label="Sonstige Sensoren am Fahrrad"
                          value="Sensors" style="margin-top: -15px;"></v-checkbox>
              <br>

              <section v-if="user.cyclingBehaviour.q5.includes('Other App')">
                <p class="title">Welche Apps nutzen Sie zum Tracken/Aufzeichnen Ihrer Fahrten?</p>
                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-textarea label="Bitte angeben (z.B. Strava)"
                                v-model="user.cyclingBehaviour.q5Text"></v-textarea>
                  </v-flex>
                </v-layout>
              </section>

              <p class="title">Welche Apps nutzen Sie zur Navigation (Fahrrad)?</p>
              <v-layout row wrap>
                <v-flex xs12 sm6 md6>
                  <v-textarea label="Bitte angeben" v-model="user.cyclingBehaviour.q6"></v-textarea>
                </v-flex>
              </v-layout>

              <v-radio-group v-model="user.cyclingBehaviour.q7">
                <p class="title">Bitte die passendste Aussage auswählen.</p>
                <v-radio label="Das Fahrrad ist für mich reines Transportmittel (z.B. um zur Arbeit zu kommen)"
                         value=1></v-radio>
                <v-radio label="Das Fahrrad ist für mich ein Sport- und Trainingsgerät" value=2></v-radio>
                <v-radio label="Beide" value=3></v-radio>
              </v-radio-group>

              <p class="title">Was sind Ihre Hauptgründe <b style="color:#ee5b19;">an Werktagen (Mo-Fr)</b> ihr Fahrrad
                zu benutzen?</p>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Sport und Training" value="Sport"
                          style="margin-top: -10px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Freunde, Bekannte usw. besuchen"
                          value="Visiting friends"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Pendeln zur Arbeit"
                          value="Work purpose or commute" style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Als soziale Aktivität (mit Freunden)"
                          value="Social activities"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Pendeln zur Schule oder Universität"
                          value="School or university"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Sonstige Erledigungen (z.B. einkaufen)"
                          value="Shopping"
                          style="margin-top: -10px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Ich fahre nicht an Werktagen"
                          value="I do not ride on working days" style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q8" label="Andere Gründe" value="Other"
                          style="margin-top: -15px;"></v-checkbox>

              <v-layout row wrap v-if="user.cyclingBehaviour.q8.includes('Other')">
                <v-flex xs12 sm6 md6>
                  <v-textarea label="Bitte geben Sie die anderen Gründe an"
                              v-model="user.cyclingBehaviour.q8Text"></v-textarea>
                </v-flex>
              </v-layout>

              <v-radio-group v-model="user.cyclingBehaviour.q9">
                <p class="title">Im Durchschnitt, wie lange dauert <b>eine</b> Tour an <b style="color:#ee5b19;">Werktagen</b>?
                </p>
                <v-radio label="0 - 30 Minuten" value=1></v-radio>
                <v-radio label="30 - 60 Minuten" value=2></v-radio>
                <v-radio label="1 - 2 Stunden" value=3></v-radio>
                <v-radio label="2 - 4 Stunden" value=4></v-radio>
                <v-radio label="Mehr als 4 Stunden" value=5></v-radio>
              </v-radio-group>

              <br>
              <p class="title">Was sind Ihre Hauptgründe <b style="color:#ee5b19;">an Wochenenden (Sa, So)</b> ihr
                Fahrrad
                zu benutzen?</p>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Sport und Training" value="Sport"
                          style="margin-top: -10px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Freunde, Bekannte usw. besuchen"
                          value="Visiting friends"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Pendeln zur Arbeit"
                          value="Work purpose or commute" style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Als soziale Aktivität (mit Freunden)"
                          value="Social activities"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Pendeln zur Schule oder Universität"
                          value="School or university"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Sonstige Erledigungen (z.B. einkaufen)"
                          value="Shopping"
                          style="margin-top: -10px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Ich fahre nicht an Wochenenden"
                          value="I do not ride on working days" style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q10" label="Andere Gründe" value="Other"
                          style="margin-top: -15px;"></v-checkbox>

              <v-layout row wrap v-if="user.cyclingBehaviour.q10.includes('Other')">
                <v-flex xs12 sm6 md6>
                  <v-textarea label="Bitte geben Sie die anderen Gründe an"
                              v-model="user.cyclingBehaviour.q10Text"></v-textarea>
                </v-flex>
              </v-layout>

              <v-radio-group v-model="user.cyclingBehaviour.q11">
                <p class="title">Im Durchschnitt, wie lange dauert <b>eine</b> Tour an <b
                  style="color:#ee5b19;">Wochenenden</b>?
                </p>
                <v-radio label="0 - 30 Minuten" value=1></v-radio>
                <v-radio label="30 - 60 Minuten" value=2></v-radio>
                <v-radio label="1 - 2 Stunden" value=3></v-radio>
                <v-radio label="2 - 4 Stunden" value=4></v-radio>
                <v-radio label="Mehr als 4 Stunden" value=5></v-radio>
              </v-radio-group>

              <v-radio-group v-model="user.cyclingBehaviour.q12a">
                <p class="title">Aktivitäten auf Strava: Welcher dieser Aussagen stimmen Sie zu?</p>
                <v-radio label="Ich tracke alle meine Touren auf Strava" value=1></v-radio>
                <v-radio label="Ich tracke die meisten meiner Touren auf Strava" value=2></v-radio>
                <v-radio label="Ich tracke meine Touren nur manchmal" value=3></v-radio>
                <v-radio label="Ich tracke nie meine Touren auf Strava" value=4></v-radio>
              </v-radio-group>

              <v-radio-group v-model="user.cyclingBehaviour.q12b" v-if="user.cyclingBehaviour.q12a !== '4'">
                <p class="title">Veröffentlichte Aktivitäten: Welcher dieser Aussagen stimmen Sie zu?</p>
                <v-radio label="Ich veröffentliche alle meiner getrackten Aktivitäten" value=1></v-radio>
                <v-radio label="Ich veröffentliche nur manche meiner getrackten Aktivitäten" value=2></v-radio>
                <v-radio label="Ich veröffentliche keine meiner getrackten Aktivitäten" value=3></v-radio>
              </v-radio-group>

              <v-radio-group v-model="user.cyclingBehaviour.q13">
                <p class="title">Absicht beim Radfahren: Welcher dieser Aussagen stimmen Sie am meisten zu?</p>
                <v-radio
                  label="Ich bin reiner Pendler. Ich nutze mein Fahrrad nur als Transportmittel (um von A nach B zu gelangen, z.B. zur Arbeit oder Universität)"
                  value=1></v-radio>
                <v-radio label="Ich bin ein Freizeitfahrer. Radfahren ist ein Hobby für mich (einschl. pendeln)"
                         value=2></v-radio>
                <v-radio
                  label="Ich bin ein Profi. Radfahren ist mein Beruf und ich verdiene dadurch meinen Unterhalt bzw. arbeite darauf hin"
                  value=3></v-radio>
              </v-radio-group>

              <section>
                <p class="title">Bewerten Sie folgende Eigenschaften von Routen nach ihrer Wichtigkeit für Sie. Bewegen
                  Sie den Schieberegler mit der Maus. Falls
                  eine Eigenschaft keine Rolle spielt lassen Sie den Regler ganz links.</p>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Entfernung / Distanz
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.cyclingBehaviour.q14.i1"
                              :tick-labels="['Unwichtig',' ','Neutral',' ', 'Wichtig']" :max="4" step="1"
                              ticks></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Fahrzeit
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.cyclingBehaviour.q14.i2"
                              :tick-labels="['Unwichtig',' ','Neutral',' ', 'Wichtig']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Sicherheit im Verkehr
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.cyclingBehaviour.q14.i3"
                              :tick-labels="['Unwichtig',' ','Neutral',' ', ' Wichtig']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Höhenprofil
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.cyclingBehaviour.q14.i4"
                              :tick-labels="['Unwichtig',' ','Neutral',' ', 'Wichtig']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Landschaft
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.cyclingBehaviour.q14.i5"
                              :tick-labels="['Unwichtig',' ','Neutral',' ', 'Wichtig']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Sicherheit bzw. Kriminalität
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.cyclingBehaviour.q14.i6"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Wichtig']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Einrichtungen (z.B. Toiletten, Wasserquellen, Essen und Trinken, Restaurants,
                    Reparaturmöglichkeiten)
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.cyclingBehaviour.q14.i7"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Wichtig']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <br>
              </section>

              <v-btn class="gradient gradient-orange" style="width: 200px;" dark round @click="e1 = 3"
                     v-on:click="logUser">Weiter
              </v-btn>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="3" v-if="user.routePlanning">
            <v-layout column wrap style="margin-left: 20px;">
              <h1>Routenplanung</h1>

              <v-radio-group v-model="user.routePlanning.q1">
                <p class="title">Haben Sie schonmal für Strava (Summit) bezahlt?</p>
                <v-radio label="Ja, ich nutze Summit oder habe es in der Vergangenheit benutzt" value=1></v-radio>
                <v-radio label="Nein" value=2></v-radio>
              </v-radio-group>

              <section v-if="user.routePlanning.q1 === '1'">
                <p class="title">Welche Summit Features nutzen Sie regelmäßig?</p>
                <v-checkbox v-model="user.routePlanning.q2" label="Individuelle Ziele und Trainingspläne"
                            value="Goals and plans" style="margin-top: -10px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q2" label="Gefilterte Bestenlisten und Wettkampfanalyse"
                            value="Competition" style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q2" label="Live Leistungsdaten"
                            value="Live" style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q2" label="Beacon" value="Beacon"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q2" label="Persönliche Heatmaps"
                            value="Heatmaps" style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q2" label="Live Segmente"
                            value="Segments" style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q2"
                            label="Trainings-, Herzfrequenz-, Leistungs- und Fitnessanalyse"
                            value="Analysis" style="margin-top: -15px;"></v-checkbox>
                <br>
              </section>

              <section>
                <p class="title">Warum nutzen Sie Strava? Bewerten Sie folgende Kriterien hinsichtlich ihrer
                  Wichtigkeit</p>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Um meine Bestzeiten in Segmenten zu sehen
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q3.i1"
                              :tick-labels="['Unwichtig',' ','Neutral',' ', 'Wichtig']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Aktivitäten aufzeichnen
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q3.i2"
                              :tick-labels="['Unwichtig',' ','Neutral',' ', 'Wichtig']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Aktivitäten mit Freunden und Bekannten teilen
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q3.i3"
                              :tick-labels="['Unwichtig',' ','Neutral',' ', ' Wichtig']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Training und Fortschritte tracken (Analyse)
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q3.i4"
                              :tick-labels="['Unwichtig',' ','Neutral',' ', 'Wichtig']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Routen finden und planen
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q3.i5"
                              :tick-labels="['Unwichtig',' ','Neutral',' ', 'Wichtig']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Freunden und Bekannten folgen und deren Aktivitäten sehen
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q3.i6"
                              :tick-labels="['Unwichtig',' ','Neutral',' ', 'Wichtig']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <br>
              </section>

              <p class="title">Gibt es noch weitere Gründe, warum Sie Strava nutzen?</p>
              <v-layout row wrap>
                <v-flex xs12 sm6 md6>
                  <v-textarea label="Bitte beschreiben Sie diese Gründe"
                              v-model="user.routePlanning.q3Text"></v-textarea>
                </v-flex>
              </v-layout>

              <section>
                <p class="title">Wie planen Sie Ihre Radtouren/Routen <b>wenn Sie alleine fahren</b>?</p>
                <v-checkbox v-model="user.routePlanning.q4a" label="Ich plane spontan während ich unterwegs bin"
                            value="Spontaneous"
                            style="margin-top: -10px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4a"
                            label="Ich denke mir im Voraus eine Route im Kopf aus, die ich dann fahre" value="Head"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4a"
                            label="Ich benutze eine App oder digitale Karte (z.B. Google Maps)"
                            value="Digital"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4a" label="Ich benutze eine echte Karte (aus Papier)"
                            value="Physical"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4a" label="Andere" value="Other"
                            style="margin-top: -15px;"></v-checkbox>
              </section>

              <section v-if="user.routePlanning.q4a.includes('Other')">
                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-textarea label="Bitte angeben, wie Sie außerdem planen"
                                v-model="user.routePlanning.q4aText"></v-textarea>
                  </v-flex>
                </v-layout>
              </section>

              <section>
                <p class="title">Wie planen Sie Ihre Radtouren/Routen <b> wenn Sie in einer Gruppe fahren</b>?</p>
                <v-checkbox v-model="user.routePlanning.q4b" label="Wir planen spontan während wir unterwegs sind"
                            value="Spontaneous"
                            style="margin-top: -10px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4b"
                            label="Wir denke uns im Voraus eine Route im Kopf aus, die wir dann fahren" value="Head"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4b"
                            label="Wir benutze eine App oder digitale Karte (z.B. Google Maps)"
                            value="Digital"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4b" label="Wir benutze eine echte Karte (aus Papier)"
                            value="Physical"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4b"
                            label="Ich lasse die anderen planen und navigieren und fahre nur mit"
                            value="Passive"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q4b" label="Andere" value="Other"
                            style="margin-top: -15px;"></v-checkbox>
              </section>

              <section v-if="user.routePlanning.q4b.includes('Other')">
                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-textarea label="Bitte angeben, wie Sie außerdem planen"
                                v-model="user.routePlanning.q4bText"></v-textarea>
                  </v-flex>
                </v-layout>
              </section>


              <p class="title">Welche digitalen Karten, Apps oder Webseiten nutzen Sie zur Planung Ihre Routen im
                Voraus?</p>
              <v-layout row wrap>
                <v-flex xs12 sm6 md6>
                  <v-textarea label="Bitte angeben" v-model="user.routePlanning.q5"></v-textarea>
                </v-flex>
              </v-layout>

              <p class="title">Gibt es typische Probleme bei ihrer Methode Routen zu planen?</p>
              <v-layout row wrap>
                <v-flex xs12 sm6 md6>
                  <v-textarea label="Bitte erläutern" v-model="user.routePlanning.q6"></v-textarea>
                </v-flex>
              </v-layout>

              <v-radio-group v-model="user.routePlanning.q7">
                <p class="title">Neue Routen fahren: Wählen Sie die passendste Aussage.</p>
                <v-radio label="Ich bevorzuge es, in einer Gegend zu fahren, wo ich mich gut auskenne."
                         value=1></v-radio>
                <v-radio
                  label="Ich bevorzuge es nur Straßen/Wege zu fahren, die ich bereits vorher gefahren bin und somit kenne."
                  value=2></v-radio>
                <v-radio
                  label="Ich mag es, Routen zu fahren, die ich bereits kenne und sie ein bisschen abzuändern. Ich habe gerne ein bisschen Abwechslung."
                  value=3></v-radio>
                <v-radio
                  label="Ich versuche möglichst viele neue Straßen/Wege zu fahren, die ich vorher noch nicht gefahren bin."
                  value=4></v-radio>
              </v-radio-group>

              <section>
                <p class="title">Wie sehr stimmen Sie den folgenden Aussagen zu?</p>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    Ich finde es spannend, in neuen Gegenden<br>
                    zu fahren, die ich noch nicht gut kenne.
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q8.i1"
                              :tick-labels="['Stimme nicht zu',' ','Neutral',' ', 'Stimme zu']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    Es motiviert mich, die Gegend in der<br>
                    ich wohne besser kennenzulernen.
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q8.i2"
                              :tick-labels="['Stimme nicht zu',' ','Neutral',' ', 'Stimme zu']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    Es motiviert mich viele Städte und<br>
                    Dörfer zu sehen wenn ich Fahrrad fahre.
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q8.i3"
                              :tick-labels="['Stimme nicht zu',' ','Neutral',' ', ' Stimme zu']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    Es motiviert mich, schöne Landschaften<br>
                    und Sehenswürdigkeiten zu sehen.
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q8.i4"
                              :tick-labels="['Stimme nicht zu',' ','Neutral',' ', 'Stimme zu']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    Ich habe Angst mich zu verirren wenn<br>
                    ich neue Routen fahre.
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q8.i5"
                              :tick-labels="['Stimme nicht zu',' ','Neutral',' ', 'Stimme zu']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    Ich mag es meinen Freunden von<br>
                    meinen Routen zu berichten.
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q8.i6"
                              :tick-labels="['Stimme nicht zu',' ','Neutral',' ', 'Stimme zu']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    Ich fahre gerne Routen, die mir von<br>
                    Freunden empfohlen wurden.
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 100%;" v-model="user.routePlanning.q8.i7"
                              :tick-labels="['Stimme nicht zu',' ','Neutral',' ', 'Stimme zu']" :max="4" step="1"
                              ticks="always"></v-slider>
                  </v-flex>
                </v-layout>
                <br>
              </section>

              <v-btn class="gradient gradient-orange" style="width: 200px;" dark round @click="e1 = 4"
                     v-on:click="logUser">Weiter
              </v-btn>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="4">
            <v-layout column wrap style="margin-left: 20px;">
              <h1>Profil Informationen</h1>
              <br>
              <v-alert :value="true" color="accent" icon="info" outline>
                <h2>Anmerkung zur E-Mail Adresse und Datenschutz</h2>
                Ihre Antworten zu den Fragebögen werden nicht in Verbindung
                mit
                ihrer E-Mail Adresse gebracht und nach Auswertung der Studie gelöscht. Ihre E-Mail Adresse wird für
                niemanden sonst sichtbar sein und dient nur zur Kontaktaufnahme und erfolgreichen Durchführung und
                Abschluss der Studie.
              </v-alert>
              <br>
              <v-text-field ref="emailEntry" :rules="[rules.required, rules.emailValid]"
                            name="input-10-2"
                            label="E-mail Adresse"
                            value=""
                            v-model="user.email"></v-text-field>
              <p><b>Wichtig:</b> Sollten Sie an der Studie teilnehmen, erhalten Sie weitere Anweisungen und mögliche
                Gutscheine auf diese E-Mail
                Adresse. Stellen Sie sicher, dass die Adresse korrekt ist und Sie Zugriff darauf haben! Achten Sie auf
                E-Mails von "ExploX" (exploxcycling@gmail.com)</p>
              <!--<v-text-field label="Vorname" hint="First Name" value="" v-model="user.firstName"></v-text-field>
              <br>
              <v-text-field label="Nachname" hint="Last Name" value="" v-model="user.lastName"></v-text-field>
              <br>
              <v-text-field label="Benutzername" hint="User Name" value="" v-model="user.username"></v-text-field>-->
              <!-- PASSWORD LOGIN IS NOT USED IN THE STUDY
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
              -->
              <v-btn class="gradient gradient-orange" style="width: 200px;" dark round @click="validatePassword">
                Weiter
              </v-btn>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="5">
            <v-layout column wrap style="padding-left: 20px;">
              <h1>Fast geschafft...!</h1>
              <br>
              <!--NOT RELEVANT FOR STUDY LOGIN
              <h4>First Name</h4>
              <p>{{user.firstName}}</p>

              <h4>Last Name</h4>
              <p>{{user.lastName}}</p>

              <h4>Username</h4>
              <p>{{user.username}}</p>

              <h4>E-Mail</h4>
              <p>{{user.email}}</p>-->

              <p>Dies ist die letzte Seite des Anmeldefragebogens. Sie können Ihre Antworten noch anpassen.
                <b>Sobald Sie den Fragebogen über die untenstehenden Buttons abschließen können Sie ihre Antworten
                  nicht mehr ändern.</b><br>
                Bitte lesen und aktzeptieren Sie die Teilnahmebedingungen.</p>
              <br>
              <h1>Feldstudie</h1>
              <p>In der Feldstudie können Sie die Website in den kommenden 2-4 Wochen benutzen und sich
                dadurch die
                Chance auf den Gewinn sichern.</p>
              <br>
              <!--<v-alert :value="true" type="success" v-if="this.isEligible">
                Sie dürfen an der Studie teilnehmen!
              </v-alert>

              <v-alert :value="true" type="info" v-if="!this.isEligible && this.canUseWebsite">
                Sie können <b>nicht</b> an der Studie teilnehmen, aber können die Website trotzdem benutzen.
              </v-alert>


              <v-alert :value="true" type="error" v-if="!this.canUseWebsite">
                Sie können die Website leider <b>nicht</b> benutzen weil ihre Angabe wo Sie fahren zu weit vom Saarland
                entfernt ist.
              </v-alert>
              <br>-->

              <section v-if="this.isEligible || this.canUseWebsite">
                <h1>Möchten Sie an der Studie teilnehmen?</h1>
                <!--<v-checkbox :label="checkbox1_text" v-model="emailsCheckbox" style="margin-bottom: -20px;"></v-checkbox>-->
                <v-btn depressed v-on:click="dialog = true">Teilnahmebedingungen<br>anzeigen
                </v-btn>
                <v-checkbox :rules="[rules.required]"
                            label="Datenschutzinformationen und Teilnahmebedingungen akzeptieren"
                            v-model="termsCheckbox"
                            v-bind:error="termsError"></v-checkbox>
                <br>
              </section>
              <section v-if="this.isEligible">
                <v-layout row>
                  <v-flex column xs12 md7>
                    <v-btn :disabled="loadingDialog" :loading="loadingDialog" style="height: 60px;" large
                           class="gradient gradient-success" dark round
                           v-on:click="signupParticipate">
                      <v-icon>check</v-icon>
                      Anmeldung<br>abschließen
                    </v-btn>
                  </v-flex>
                  <!--<v-flex column xs12 md5>
                    <v-btn :disabled="loadingDialog" :loading="loadingDialog" large class="gradient gradient-green"
                           round v-on:click="signup(false)">
                      Nicht teilnehmen
                    </v-btn>
                  </v-flex>-->
                </v-layout>
              </section>

              <section v-if="!this.isEligible && this.canUseWebsite">
                <v-layout row>
                  <v-flex coluxs12 md5>
                    <v-btn :disabled="loadingDialog" :loading="loadingDialog" large class="gradient gradient-blue" dark
                           round v-on:click="signup(false)" style="height: 60px;">
                      Fragebogen<br>abschicken
                    </v-btn>
                  </v-flex>
                </v-layout>
              </section>

              <v-dialog v-model="dialog" width="600px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Terms and Conditions for ExploX</span>
                  </v-card-title>
                  <v-card-text>
                    <data-protection></data-protection>
                    <h1>Terms and Conditions for ExploX</h1>
                    <p>These Website Standard Terms and Conditions written on this webpage shall manage your use of
                      our
                      website, ExploX accessible at umtl.dfki.de/explox.</p>
                    <p>These Terms will be applied fully and affect to your use of this Website. By using this
                      Website,
                      you agreed to accept all terms and conditions written in here. You must not use this Website if
                      you disagree with any of these Website Standard Terms and Conditions.</p>

                    <h3>Intellectual Property Rights</h3>
                    <p>Other than the content you own, under these Terms, Saarland University and/or its licensors own
                      all the
                      intellectual property rights and materials contained in this Website.</p>
                    <p>You are granted limited license only for purposes of viewing the material contained on this
                      Website.</p>

                    <h3>Restrictions</h3>
                    <p>You are specifically restricted from all of the following:</p>
                    <ul>
                      <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
                      <li>using this Website in any way that is or may be damaging to this Website;</li>
                      <li>using this Website in any way that impacts user access to this Website;</li>
                      <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm
                        to the Website, or to any person or business entity;
                      </li>
                      <li>engaging in any data mining, data harvesting, data extracting or any other similar activity
                        in
                        relation to this Website;
                      </li>
                    </ul>
                    <p>Certain areas of this Website are restricted from being access by you and Saarland University may
                      further
                      restrict access by you to any areas of this Website, at any time, in absolute discretion. Any
                      user
                      ID and password you may have for this Website are confidential and you must maintain
                      confidentiality as well.</p>

                    <h3>No warranties</h3>
                    <p>This Website is provided "as is," with all faults, and Saarland University express no
                      representations or
                      warranties, of any kind related to this Website or the materials contained on this Website.
                      Also,
                      nothing contained on this Website shall be interpreted as advising you.</p>

                    <h3>Limitation of liability</h3>
                    <p>In no event shall Saarland University, nor any of its officers, directors and employees, shall be
                      held liable
                      for anything arising out of or in any way connected with your use of this Website whether such
                      liability is under contract.  Saarland University, including its officers, directors and employees
                      shall not be
                      held liable for any indirect, consequential or special liability arising out of or in any way
                      related to your use of this Website.</p>

                    <h3>Indemnification</h3>
                    <p>You hereby indemnify to the fullest extent Saarland University from and against any and/or all
                      liabilities,
                      costs, demands, causes of action, damages and expenses arising in any way related to your breach
                      of any of the provisions of these Terms.</p>

                    <h3>Severability</h3>
                    <p>If any provision of these Terms is found to be invalid under any applicable law, such
                      provisions
                      shall be deleted without affecting the remaining provisions herein.</p>

                    <h3>Variation of Terms</h3>
                    <p>Saarland University is permitted to revise these Terms at any time as it sees fit, and by using
                      this Website
                      you
                      are expected to review these Terms on a regular basis.</p>

                    <h3>Assignment</h3>
                    <p>The Saarland University is allowed to assign, transfer, and subcontract its rights and/or
                      obligations under
                      these Terms without any notification. However, you are not allowed to assign, transfer, or
                      subcontract any of your rights and/or obligations under these Terms.</p>

                    <h3>Entire Agreement</h3>
                    <p>These Terms constitute the entire agreement between Saarland University and you in relation to
                      your use of
                      this
                      Website, and supersede all prior agreements and understandings.</p>

                    <h3>Governing Law & Jurisdiction</h3>
                    <p>These Terms will be governed by and interpreted in accordance with the laws of the State of
                      Germany,
                      and you submit to the non-exclusive jurisdiction of the state and federal courts located in
                      Germany
                      for
                      the resolution of any disputes.</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat"
                           @click="() => {this.dialog = false; this.termsCheckbox = true;}">Agree
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
  import DataProtection from '../general/DataProtection'

  export default {
    name: 'SignUp',
    components: {DataProtection},
    data () {
      return {
        loadingDialog: false,
        e1: 0,
        show: false,
        dialog: false,
        rules: {
          //notDefault: value => (value !== '0') || 'Required.',
          required: value => !!value || 'Required/Benötigt.',
          min: v => (v && v.length >= 8) || 'Min 8 characters',
          emailValid: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          //passwordMatch: value => value === this.user.password || 'Passwords don\'t match',
        },
        emailsCheckbox: false,
        termsCheckbox: false,
        termsError: false,
        checkbox1_text: 'Allow news via email',
        checkbox2_text: 'Accept Data Protection Information and Terms & Conditions',
        participates: false,
        homeLocationDisplay: '',
        cyclingLocationDisplay: '',
        isEligible: true,
        canUseWebsite: true,
        lang: 'de',
        cacheTime: 'not yet',
        eligibleByActivities: false,
        deadlinePassed: false,
      }
    },
    created () {
      const deadline = new Date('23 July 2019 23:59:59')
      const currentDate = new Date()
      if (currentDate > deadline) {
        this.deadlinePassed = true
      }

      this.computeEligible()
      setTimeout(() => {
        this.cache(true)
      }, 1000)
      EventBus.$emit('flash', {
        type: 'success',
        text: 'Successfully connected to Strava.'
      })
      setTimeout(() => {
        EventBus.$emit('collapseDrawer')
      }, 100)
    },
    props: {
      user: Object,
    },

    methods: {
      computeEligible () {
        this.checkEligible()
        setTimeout(() => {
          this.computeEligible()
        }, 2000)
      },
      cache (firstTime) {
        if (this.$router.currentRoute.name === 'SignUp') {
          if (this.user) {
            this.signup(true, firstTime)
          }
          setTimeout(() => {
            this.cache(false)
          }, Math.floor(Math.random() * (5000 - 10000 + 1)) + 10000)
        }
      },

      validateLocation (event, isHome) {
        let v = this.user.demographics.q5
        if (!isHome) {
          v = this.user.demographics.q6
        }
        if (v.length < 5) {
          return
        }

        const request = 'https://nominatim.openstreetmap.org/search?format=json&addressdetails=0&q=' + v

        axios
          .get(request, {
            withCredentials: false
          })
          .then(response => {
            if (response.data.length < 1) {
              if (isHome) {
                this.homeLocationDisplay = 'kein Ergebnis gefunden'
              } else {
                this.cyclingLocationDisplay = 'kein Ergebnis gefunden'
              }
              return
            }
            const data = response.data[0]
            if (isHome) {
              this.homeLocationDisplay = data.display_name
              this.user.demographics.homeLocation = data
            } else {
              this.cyclingLocationDisplay = data.display_name
              this.user.demographics.cyclingLocation = data
            }
            // this.checkEligible()
          })
          .catch(error => {
            console.log(error)
          })
      },

      async signupParticipate () {
        this.participates = true
        this.signup(false)
      },

      async signup (cache, firstTime) {
        if (!cache) {
          if (!this.termsCheckbox) {
            this.termsError = true
            return
          } else {
            this.termsError = false
          }
          this.loadingDialog = true
        }

        const formData = {
          _csrf: this.csrfToken,
          firstName: this.user.firstName,
          lastName: this.user.lastname,
          username: this.user.username,
          email: (this.user.email).toLowerCase(),
          password: this.user.password,
          demographics: this.user.demographics,
          cyclingBehaviour: this.user.cyclingBehaviour,
          routePlanning: this.user.routePlanning,
          questionnaireInfo: {
            eligible: this.isEligible,
            canUseWebsite: this.canUseWebsite,
            participates: this.participates && this.isEligible,
            language: this.lang,
          },
          subscriptions: ['news'],
          cache: cache,
          firstTime: firstTime
        }

        this.POST('finishRegistration', formData, null, (data, err) => {
          this.loadingDialog = false
          if (!cache) {
            if (!err) {
              EventBus.$on('authenticated', () => {
                this.$router.push('/dashboard')
              })
              EventBus.$emit('reloadData')
            }
          } else {
            if (!err) {
              const today = new Date()
              this.cacheTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
            }
          }
        })
      },
      validatePassword () {
        this.validateEmail()
        /* PASSWORDS ARE NOT USED IN THE STUDY
        if (this.$refs.passwordEntry1.validate() && this.$refs.passwordEntry2.validate()) {
          this.validateEmail()
        }*/
      },
      validateEmail () {
        if (this.$refs.emailEntry.validate()) {
          this.e1 = 5
          this.logUser()
        }
      },
      logUser () {
        this.$vuetify.goTo(0, {duration: 0, offset: 0, easing: 'easeInOutCubic'})
        console.log(this.user)
      },
      checkEligible: function () {
        this.isEligible = true

        if (!this.user || !this.user.cyclingBehaviour) {
          return false
        }

        if (!this.eligibleByActivities) {
          this.validateLocation(null, true)
          this.eligibleByActivities = true

          /*this.GET('dashboard', (data, err) => {
            if (!err) {
              if (data.user.activities.length >= 9) {
                let activitiesInRange = 0
                data.user.activities.forEach((activity) => {
                  const saarlandCenterLatLng = [49.404340, 6.948669]
                  const startDistance = this.getDistanceFromLatLonInKm(activity.strava.start_latlng[0], activity.strava.start_latlng[1], saarlandCenterLatLng[0], saarlandCenterLatLng[1])
                  const endDistance = this.getDistanceFromLatLonInKm(activity.strava.end_latlng[0], activity.strava.end_latlng[1], saarlandCenterLatLng[0], saarlandCenterLatLng[1])
                  if (startDistance < 70 && endDistance < 70) {
                    activitiesInRange++
                  }
                })
                if (activitiesInRange >= 0) {
                  console.log('User has ' + activitiesInRange + ' activities in range.')
                  this.eligibleByActivities = true
                }
              }
            }
          })*/
        }

        let eligible = true
        eligible &= this.eligibleByActivities
        eligible &= this.user.cyclingBehaviour.q1 !== '3'         // Does not have access to a bike in working condition
        eligible &= parseInt(this.user.cyclingBehaviour.q4) < 6   // Cycles less than once a year
        eligible &= this.user.cyclingBehaviour.q13 === '2'        // Does not identify as a recreational cyclist
        eligible &= parseInt(this.user.cyclingBehaviour.q12a) < 4  // Tracks at least some rides on Strava
        eligible &= this.checkCanUseWebsite()
        this.isEligible = eligible
        return this.isEligible
      },
      checkCanUseWebsite: function () {
        this.canUseWebsite = true

        if (!this.user || !this.user.demographics || !this.user.demographics.cyclingLocation) {
          return false
        }
        let canUse = true

        const data = this.user.demographics.cyclingLocation
        const lat = data.lat
        const lon = data.lon

        const d = this.getDistanceFromLatLonInKm(lat, lon, 49.413003, 7.008131)

        canUse &= d < 80

        this.canUseWebsite = canUse

        // TODO determine based on activity data
        return this.canUseWebsite
      }
    },
    mixins: [apiMixin, geoTransformMixin]
  }
</script>

<style>
</style>
