<template>
  <div>
    <h1>Finish Registration</h1>
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
          <v-stepper-step :complete="e1 > 4" step="4" editable>E-Mail and Password</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 5" step="5">Finish</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="0">
            <v-layout column style="margin-left: 20px;">
              <h1>About the study</h1>
              <br>
              <p><b>Thank you for signing up to ExploX. Please read the following notes carefully:</b></p>
              <h2>Purpose of this study</h2>
              <p>You are invited to use ExploX for the next weeks and thereby contribute to our research on cycling
                behaviour. By answering the following questionnaires and using this website for the next weeks,
                you will participate in the study.</p>
              <h2>Eligibility</h2>
              <p>In the following, you will find some questionnaires that you have to fill out
                carefully if you want to join the study. At the end of the questionnaires, you will see if you are
                eligible to participate in the study. Then, you can decide if you want to participate or not.
                Please take your time and fill out the questionnaire thoroughly. Using the bar at the top, you can jump
                between different parts of the questionnaire and review your answers. You have to give an answer to <b>all</b>
                questions.
              </p>
              <h2>Reward</h2>
              <p>We will reward your participation in the study with a <b>15€ Amazon Voucher</b> that you will receive
                at
                the end of the study. You have to fulfill the following criteria in order to receive the voucher:</p>
              <ul>
                <li>You have completed the following questionnaires and you are eligible to participate</li>
                <li>You have done at least 15 (successful) route generations and rated each of the resulting routes</li>
                <li>You have done at least one (successful) route generation on 5 different days</li>
                <li>You have filled out the User Experience Questionnaire at the end of the study</li>
                <li>You have filled out a short qualitative questionnaire and provided feedback</li>
              </ul>
              <br>
              <v-btn class="gradient gradient-orange" style="width: 200px;" dark round @click="e1 = 1">Continue</v-btn>
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
                <v-radio label="Other" value=6></v-radio>
                <v-radio label="Prefer not to say" value=7></v-radio>
              </v-radio-group>

              <v-radio-group v-model="user.demographics.q4">
                <p class="title">Occupation:</p>
                <v-radio label="Full-time employment" value=1></v-radio>
                <v-radio label="Part-time employment" value=2></v-radio>
                <v-radio label="Student" value=3></v-radio>
                <v-radio label="Self-employed" value=4></v-radio>
                <v-radio label="Unemployed" value=5></v-radio>
                <v-radio label="Retired" value=6></v-radio>
              </v-radio-group>

              <v-radio-group v-model="user.demographics.q5">
                <p class="title">In which region do you live?</p>
                <v-radio label="Saarbrücken or Völklingen" value=1></v-radio>
                <v-radio label="Saarlouis" value=2></v-radio>
                <v-radio label="St. Wendel" value=3></v-radio>
                <v-radio label="St. Ingbert or Homburg" value=4></v-radio>
                <v-radio label="Merzig-Wadern" value=5></v-radio>
                <v-radio label="Neunkirchen" value=6></v-radio>
                <v-radio label="Other, within 30km to Saarland" value=7></v-radio>
                <v-radio label="Other, longer than 30km to Saarland" value=8></v-radio>
              </v-radio-group>

              <v-radio-group v-model="user.demographics.q6">
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

              <v-radio-group v-model="user.cyclingBehaviour.q2">
                <p class="title">How often do you ride your bike?</p>
                <v-radio label="Every day" value=1></v-radio>
                <v-radio label="Multiple times a week" value=2></v-radio>
                <v-radio label="More than 4 times a month" value=3></v-radio>
                <v-radio label="Less than 4 times a month" value=4></v-radio>
                <v-radio label="Less than once a year" value=5></v-radio>
                <v-radio label="Never" value=6></v-radio>
              </v-radio-group>

              <p class="title">What are the main reasons you ride your bike on working days?</p>
              <v-checkbox v-model="user.cyclingBehaviour.q3" label="Recreational" value="Recreational"
                          style="margin-top: -10px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q3" label="Visiting friends" value="Visiting friends"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q3" label="Work purpose or commute"
                          value="Work purpose or commute" style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q3" label="Social activities" value="Social activities"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q3" label="School or university" value="School or university"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q3" label="I do not ride on working days"
                          value="I do not ride on working days" style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q3" label="Other" value="Other"
                          style="margin-top: -15px;"></v-checkbox>

              <br>
              <p class="title">What are the main reasons you ride your bike on the weekend?</p>
              <v-checkbox v-model="user.cyclingBehaviour.q4" label="Recreational" value="Recreational"
                          style="margin-top: -10px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q4" label="Visiting friends" value="Visiting friends"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q4" label="Work purpose or commute"
                          value="Work purpose or commute" style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q4" label="Social activities" value="Social activities"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q4" label="School or university" value="School or university"
                          style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q4" label="I do not ride on working days"
                          value="I do not ride on working days" style="margin-top: -15px;"></v-checkbox>
              <v-checkbox v-model="user.cyclingBehaviour.q4" label="Other" value="Other"
                          style="margin-top: -15px;"></v-checkbox>

              <v-radio-group v-model="user.cyclingBehaviour.q5">
                <p class="title">On average, how long do you usually ride per trip during working days?</p>
                <v-radio label="1 - 10 minutes" value=1></v-radio>
                <v-radio label="11 - 20 minutes" value=2></v-radio>
                <v-radio label="21 - 30 minutes" value=3></v-radio>
                <v-radio label="31 - 60 minutes" value=4></v-radio>
                <v-radio label="61 - 120 minutes" value=5></v-radio>
                <v-radio label="More than 120 minutes" value=6></v-radio>
              </v-radio-group>

              <v-radio-group v-model="user.cyclingBehaviour.q6">
                <p class="title">On average, how long do you usually ride per trip on the weekend?</p>
                <v-radio label="1 - 10 minutes" value=1></v-radio>
                <v-radio label="11 - 20 minutes" value=2></v-radio>
                <v-radio label="21 - 30 minutes" value=3></v-radio>
                <v-radio label="31 - 60 minutes" value=4></v-radio>
                <v-radio label="61 - 120 minutes" value=5></v-radio>
                <v-radio label="More than 120 minutes" value=6></v-radio>
              </v-radio-group>

              <v-radio-group v-model="user.cyclingBehaviour.q7">
                <p class="title">Which of the following statements do you most agree with?</p>
                <v-radio label="I am a pure commuter, meaning I only use by bike to go to work" value=1></v-radio>
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
                    <v-slider style="width: 500px;" v-model="user.cyclingBehaviour.q8.i1"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Travel time
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.cyclingBehaviour.q8.i2"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Traffic safety
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.cyclingBehaviour.q8.i3"
                              :tick-labels="['Unimportant',' ','Neutral',' ', ' important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Gradient/terrain
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.cyclingBehaviour.q8.i4"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Scenery
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.cyclingBehaviour.q8.i5"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Security
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.cyclingBehaviour.q8.i6"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Facilities
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.cyclingBehaviour.q8.i7"
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
          <v-stepper-content step="3" v-if="user.routePlanning">
            <v-layout column wrap style="margin-left: 20px;">
              <h1>Route Planning</h1>
              <br>
              <section>
                <p class="title">Rate the following items by their importance for you to use Strava</p>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Competing in segments
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q1.i1"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Recording activities
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q1.i2"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Sharing activities with friends
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q1.i3"
                              :tick-labels="['Unimportant',' ','Neutral',' ', ' important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Tracking training performance
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q1.i4"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Planning routes
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q1.i5"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md3>
                    Following friends
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q1.i6"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <br>
              </section>

              <section>
                <p class="title">How do you go about planning your cycling routes?</p>
                <v-checkbox v-model="user.routePlanning.q2" label="I plan spontaneously while I’m driving" value="1"
                            style="margin-top: -10px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q2" label="I plan the route in my head beforehand" value="2"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q2" label="I use a map (such as Google Maps)" value="3"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q2" label="I use Strava by selecting waypoints" value="4"
                            style="margin-top: -15px;"></v-checkbox>
                <v-checkbox v-model="user.routePlanning.q2" label="Other" value="5"
                            style="margin-top: -15px;"></v-checkbox>
              </section>

              <section>Textbox</section>

              <v-radio-group v-model="user.routePlanning.q4">
                <p class="title">Do you see cycling as a way of exploring your area? Select the statement that fits
                  best.</p>
                <v-radio label="I prefer to only use roads that I know in an area where I’m very familiar"
                         value=1></v-radio>
                <v-radio label="I prefer to go the same roads that I have taken before" value=2></v-radio>
                <v-radio
                  label="I like to take routes that I already know but change them a little bit so I take some new roads"
                  value=3></v-radio>
                <v-radio label="I always try to take as many roads that I have never taken before and see new places"
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
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q5.i1"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    I find it motivating to have a better<br>
                    knowledge of the area where I live
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q5.i2"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    I find it motivating to see many cities<br>
                    and towns when cycling
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q5.i3"
                              :tick-labels="['Unimportant',' ','Neutral',' ', ' important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    I find it motivating to see many landscapes<br>
                    and sights by cycling
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q5.i4"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    I am scared to get lost when I<br>
                    take new routes
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q5.i5"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    I enjoy talking about and sharing my<br>
                    cycling routes with friends
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q5.i6"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    I enjoy taking routes that friends have<br>
                    recommended to me
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q5.i7"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <br>
              </section>

              <section>Textbox</section>

              <section>
                <p class="title">After completing this survey you will have access to a tool that will help you plan
                  your cycling routes. Rate the following features by their importance</p>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    The tool helps me find new and exciting<br>
                    routes in my area
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q7.i1"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    The tool helps me find routes in totally<br>
                    new areas
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q7.i2"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    The tool helps me identify the locations where<br>
                    I cycle most often
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q7.i3"
                              :tick-labels="['Unimportant',' ','Neutral',' ', ' important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    The tool allows me to select a start and end<br>
                    location for my route
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q7.i4"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    The tool allows me to select an elevation<br>
                    profile for the route
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q7.i5"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    The tool allows me to select whether I only<br>
                    want to take routes that I know
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q7.i6"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    The tool ensures that the route is safe and<br>
                    suitable for biking
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q7.i7"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    The tool shows me the new route on a map together<br>
                    with all routes I have already taken
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q7.i7"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    The tool allows me to load a new route into my<br>
                    Strava profile
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-slider style="width: 500px;" v-model="user.routePlanning.q7.i7"
                              :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                              ticks="always" tick-size="2"></v-slider>
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
              <v-alert :value="true" color="accent" icon="info" outline>
                We have extracted your profile information from your Strava profile. Please check whether the following
                is
                correct and choose a password to log in. Your name, email and username <b>will not be used and reported
                in
                the study</b>. Your E-Mail will not be visible for anybody else. Your name and username can be seen by
                other
                ExploX users. We make sure to respect your privacy and handle your data anonymously!
              </v-alert>
              <br>
              <v-text-field ref="emailEntry" :rules="[rules.required, rules.emailValid]"
                            name="input-10-2"
                            label="E-mail Address"
                            value=""
                            v-model="user.email"></v-text-field>
              <p><b>Important:</b> If you participate in the study, you will receive the Amazon voucher on this e-mail. Make sure it is the right e-mail address!</p>
              <v-text-field label="Name" hint="First Name" value="" v-model="user.firstName"></v-text-field>
              <br>
              <v-text-field label="Last Name" hint="Last Name" value="" v-model="user.lastName"></v-text-field>
              <br>
              <v-text-field label="User Name" hint="User Name" value="" v-model="user.username"></v-text-field>
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
              <v-btn class="gradient gradient-orange" style="width: 200px;" dark round @click="validatePassword">
                Continue
              </v-btn>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="5">
            <v-layout column style="margin-left: 20px;">
              <h1>Summary</h1>
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
                <v-checkbox :rules="[rules.required]" :label="checkbox2_text" v-model="termsCheckbox"
                            v-bind:error="termsError" v-on:click="() => {this.dialog = this.termsCheckbox; this.termsCheckbox = !this.termsCheckbox;}"></v-checkbox>

                <h1>Eligibility</h1>
                <br>
                <v-alert :value="true" type="success" v-if="this.isEligible">
                  You are eligible to participate in the study.
                </v-alert>

                <v-alert :value="true" type="info" v-if="!this.isEligible && this.canUseWebsite">
                  You are <b>not</b> eligible to participate in the study but you can use the website anyway.
                </v-alert>


                <v-alert :value="true" type="error" v-if="!this.canUseWebsite">
                  Sorry, but you are <b>not</b> eligible to use the website.
                </v-alert>
                <br>

                <section v-if="this.isEligible">
                  <h1>Do you want to participate in the study?</h1>
                  <br>
                  <v-layout row>
                    <v-flex coluxs12 sm3>
                      <v-btn class="gradient gradient-success" dark round v-on:click="signupParticipate">
                        <v-icon>check</v-icon>
                        Participate in the study
                      </v-btn>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-btn class="gradient gradient-green" round v-on:click="signup">
                        Finish without participating in the study
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </section>

                <section v-if="!this.isEligible && this.canUseWebsite">
                  <v-layout row>
                    <v-flex coluxs12 sm3>
                      <v-btn class="gradient gradient-blue" dark round v-on:click="signup">
                        <v-icon>check</v-icon>
                        Finish Questionnaire
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </section>

                <v-dialog v-model="dialog" persistent width="600px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Terms and Conditions for ExploX</span>
                    </v-card-title>
                    <v-card-text>
                      <h3>Introduction</h3>
                      <p>These Website Standard Terms and Conditions written on this webpage shall manage your use of
                        our
                        website, ExploX accessible at umtl.dfki.de.</p>
                      <p>These Terms will be applied fully and affect to your use of this Website. By using this
                        Website,
                        you agreed to accept all terms and conditions written in here. You must not use this Website if
                        you disagree with any of these Website Standard Terms and Conditions.</p>

                      <h3>Intellectual Property Rights</h3>
                      <p>Other than the content you own, under these Terms, DFKI and/or its licensors own all the
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
                      <p>Certain areas of this Website are restricted from being access by you and DFKI may further
                        restrict access by you to any areas of this Website, at any time, in absolute discretion. Any
                        user
                        ID and password you may have for this Website are confidential and you must maintain
                        confidentiality as well.</p>

                      <h3>No warranties</h3>
                      <p>This Website is provided "as is," with all faults, and DFKI express no representations or
                        warranties, of any kind related to this Website or the materials contained on this Website.
                        Also,
                        nothing contained on this Website shall be interpreted as advising you.</p>

                      <h3>Limitation of liability</h3>
                      <p>In no event shall DFKI, nor any of its officers, directors and employees, shall be held liable
                        for anything arising out of or in any way connected with your use of this Website whether such
                        liability is under contract.  DFKI, including its officers, directors and employees shall not be
                        held liable for any indirect, consequential or special liability arising out of or in any way
                        related to your use of this Website.</p>

                      <h3>Indemnification</h3>
                      <p>You hereby indemnify to the fullest extent DFKI from and against any and/or all liabilities,
                        costs, demands, causes of action, damages and expenses arising in any way related to your breach
                        of any of the provisions of these Terms.</p>

                      <h3>Severability</h3>
                      <p>If any provision of these Terms is found to be invalid under any applicable law, such
                        provisions
                        shall be deleted without affecting the remaining provisions herein.</p>

                      <h3>Variation of Terms</h3>
                      <p>DFKI is permitted to revise these Terms at any time as it sees fit, and by using this Website
                        you
                        are expected to review these Terms on a regular basis.</p>

                      <h3>Assignment</h3>
                      <p>The DFKI is allowed to assign, transfer, and subcontract its rights and/or obligations under
                        these Terms without any notification. However, you are not allowed to assign, transfer, or
                        subcontract any of your rights and/or obligations under these Terms.</p>

                      <h3>Entire Agreement</h3>
                      <p>These Terms constitute the entire agreement between DFKI and you in relation to your use of
                        this
                        Website, and supersede all prior agreements and understandings.</p>

                      <h3>Governing Law & Jurisdiction</h3>
                      <p>These Terms will be governed by and interpreted in accordance with the laws of the State of de,
                        and you submit to the non-exclusive jurisdiction of the state and federal courts located in de
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
            </v-layout>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </div>
</template>

<script>
  import apiMixin from '../../mixins/apiMixin'
  import {EventBus} from '@/eventBus'

  export default {
    name: 'SignUp',
    data () {
      return {
        e1: 0,
        show: false,
        dialog: false,
        rules: {
          notDefault: value => (value !== '0') || 'Required.',
          required: value => !!value || 'Required.',
          min: v => (v && v.length >= 8) || 'Min 8 characters',
          emailValid: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          passwordMatch: value => value === this.user.password || 'Passwords don\'t match'
        },
        emailsCheckbox: false,
        termsCheckbox: false,
        termsError: false,
        checkbox1_text: 'Allow news via email',
        checkbox2_text: 'Accept Terms and Conditions',
        participates: false,
      }
    },
    created () {
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
    computed: {
      isEligible: function () {
        if (!this.user || !this.user.cyclingBehaviour) {
          return false
        }
        let eligible = true
        eligible &= this.user.cyclingBehaviour.q1 !== '3'        // Does not have access to a bike in working condition
        eligible &= parseInt(this.user.cyclingBehaviour.q2) < 5  // Cycles less than once a year
        eligible &= this.user.cyclingBehaviour.q7 === '2'        // Does not identify as a recreational cyclist
        eligible &= this.canUseWebsite
        return eligible
      },
      canUseWebsite: function () {
        if (!this.user || !this.user.cyclingBehaviour) {
          return false
        }
        let canUse = true
        canUse &= parseInt(this.user.demographics.q5) < 8      // Lives at most 30km from Saarland
        // TODO determine based on activity data
        return canUse
      }
    },
    methods: {

      async signupParticipate () {
        this.participates = true
        this.signup()
      },

      async signup () {
        if (!this.termsCheckbox) {
          this.termsError = true
          return
        } else {
          this.termsError = false
        }
        const formData = {
          _csrf: this.csrfToken,
          name: this.user.name + ' ' + this.user.lastname,
          username: this.user.username,
          email: (this.user.email).toLowerCase(),
          password: this.user.password,
          demographics: this.user.demographics,
          cyclingBehaviour: this.user.cyclingBehaviour,
          routePlanning: this.user.routePlanning,
          questionnaireInfo: {
            eligible: this.isEligible,
            canUseWebsite: this.canUseWebsite,
            participates: this.participates,
          },
          subscriptions: ['news'],
        }

        this.POST('finishRegistration', formData, null, (data, err) => {
          if (!err) {
            EventBus.$on('authenticated', () => {
              this.$router.push('/dashboard')
            })
            EventBus.$emit('reloadData')
          }
        })
      },
      validatePassword () {
        if (this.$refs.passwordEntry1.validate() && this.$refs.passwordEntry2.validate()) {
          this.validateEmail()
        }
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
      }
    },
    mixins: [apiMixin]
  }
</script>

<style>
</style>
