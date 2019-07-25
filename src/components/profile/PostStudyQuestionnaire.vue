<template>
  <section v-if="user">
    <secton>
      <h1>Note / Hinweis:</h1>
      <h3>Please use the website before doing this questionnaire.</h3>
      <h3>Bitte benutzen Sie die Webseite, bevor Sie diesen Fragebogen ausfüllen.</h3>
      <br><br>
    </secton>
    <secton v-if="user.psq && user.psq.feedback && user.psq.ueq">
      <h1>You have already submitted the questionnaire.</h1>
      Please contact exploxcycling@gmail.com if you have any problems.
    </secton>

    <section v-else>
      <section v-if="lang === 'en'">
        <h1 class="title">Post-Study Questionnaire</h1>
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
        </v-layout>
        <v-alert v-if="deadlinePassed" :value="true" color="accent" icon="info" outline>
          <h2>Deadline over</h2>
          Unfortunately, the deadline for post-study questionnaires has passed on 04. August.
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
                      <v-flex xs12 md3 lg3>
                        <div class="text-xs-right">{{ question.left}}</div>
                        <br v-if="$vuetify.breakpoint.xs">
                      </v-flex>
                      <v-flex xs12 md6 lg6>
                    <span v-for="i in [1,2,3,4,5,6,7]">
                      <v-btn fab small :color="ueq_en[qi].value === i ? 'orange' : 'white'"
                             :style="$vuetify.breakpoint.xs ? 'height: 20px; width: 20px; margin-top:-10px;' : 'height: 30px; width: 30px; margin-top:-10px;'"
                             v-on:click="() => {ueq_en[qi].value = i;}"></v-btn>
                    </span>
                      </v-flex>
                      <v-flex xs12 md3 lg3>
                        <br v-if="$vuetify.breakpoint.xs">
                        <div class="text-xs-left">{{ question.right}}</div>
                      </v-flex>
                    </v-layout>
                    <br><br>


                  </div>

                  <v-btn v-if="ueq_en.reduce(((acc, curr) => acc * curr.value), 1) > 0"
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
                  <h1>Feedback</h1>
                  <br>

                  <section>
                    <p class="title">How much do you agree with each of the following statements?</p>
                    <v-layout row wrap align-center>
                      <v-flex xs12 md4>
                        The heatmap visualization of my past<br>
                        activities was interesting.
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-slider style="width: 100%;" v-model="feedback.rating.i1"
                                  :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                                  ticks="always"></v-slider>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-center>
                      <v-flex xs12 md4>
                        I could understand what the activity<br>
                        heatmap is showing.
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-slider style="width: 100%;" v-model="feedback.rating.i2"
                                  :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                                  ticks="always"></v-slider>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-center>
                      <v-flex xs12 md4>
                        I was able to generate new<br>
                        cycling routes.
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-slider style="width: 100%;" v-model="feedback.rating.i3"
                                  :tick-labels="['Unimportant',' ','Neutral',' ', ' important']" :max="4" step="1"
                                  ticks="always"></v-slider>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-center>
                      <v-flex xs12 md4>
                        The route generation resulted<br>
                        in some interesting routes.
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-slider style="width: 100%;" v-model="feedback.rating.i4"
                                  :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                                  ticks="always"></v-slider>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-center>
                      <v-flex xs12 md4>
                        The generated routes were<br>
                        suitable for cycling.
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-slider style="width: 100%;" v-model="feedback.rating.i5"
                                  :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                                  ticks="always"></v-slider>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-center>
                      <v-flex xs12 md4>
                        I would continue to use such<br>
                        a system for finding new routes.
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-slider style="width: 100%;" v-model="feedback.rating.i6"
                                  :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                                  ticks="always"></v-slider>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-center>
                      <v-flex xs12 md4>
                        The system could help me explore<br>
                        areas where I have not cycled before.
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-slider style="width: 100%;" v-model="feedback.rating.i7"
                                  :tick-labels="['Unimportant',' ','Neutral',' ', 'Important']" :max="4" step="1"
                                  ticks="always"></v-slider>
                      </v-flex>
                    </v-layout>
                    <br>
                  </section>

                  <section>
                    <p class="title">Which of the following features did you use?</p>
                    <v-checkbox v-model="feedback.features" label="Viewing my activity heatmap"
                                value="Activity Map"
                                style="margin-top: -10px;"></v-checkbox>
                    <v-checkbox v-model="feedback.features"
                                label="Changing the style of the map (e.g. to a mountain bike map)"
                                value="Map Style"
                                style="margin-top: -15px;"></v-checkbox>
                    <v-checkbox v-model="feedback.features" label="Generating a new route"
                                value="Generate"
                                style="margin-top: -15px;"></v-checkbox>
                    <v-checkbox v-model="feedback.features"
                                label="Generating a round trip route (i.e. same start as finish)" value="Round Trip"
                                style="margin-top: -15px;"></v-checkbox>
                    <v-checkbox v-model="feedback.features" label="Importing a generated route into my Strava profile"
                                value="Import"
                                style="margin-top: -15px;"></v-checkbox>
                    <v-checkbox v-model="feedback.features" label="Viewing one of my Strava routes or activities"
                                value="View Route"
                                style="margin-top: -15px;"></v-checkbox>
                  </section>

                  <br>
                  <p class="title">Which of the features did you like the most and why?</p>
                  <v-textarea v-model="feedback.q1"></v-textarea>

                  <br>
                  <p class="title">Did you actually cycle some of the generated routes? If yes, please provide links to
                    the Strava activities.</p>
                  <v-textarea v-model="feedback.q2"></v-textarea>

                  <br>
                  <p class="title">What did not work as you would expect? What needs to be improved? What features are
                    missing?</p>
                  <v-textarea v-model="feedback.q3"></v-textarea>

                  <br>
                  <p class="title">Did you face any other problems with the website during the study?</p>
                  <v-textarea v-model="feedback.q4"></v-textarea>
                  <br>

                  <br>
                  <p class="title">Anything else you would like to say?</p>
                  <v-textarea v-model="feedback.q5"></v-textarea>
                  <br>

                  <v-btn v-if="(feedback.q1 + feedback.q2 +feedback.q3 +feedback.q4 +feedback.q5).length > 100"
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
      <section v-if="lang === 'de'">
        <h1 class="title">Abschließender Fragebogen</h1>
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
        </v-layout>
        <v-alert v-if="deadlinePassed" :value="true" color="accent" icon="info" outline>
          <h2>Frist verpasst</h2>
          Die Absendefrist für den Fragebogen ist am 04. August verstrichen.
          <b>Wir bitten um Ihr Verständnis und bedanken uns herzlich für die Teilnahme an der Studie.</b>
        </v-alert>
        <v-alert v-else-if="!questionnaireEnabled" :value="true" color="accent" icon="info" outline>
          <h2>Too Early</h2>
          The post-study questionnaire will be available from 21. July until 04. August. Please come back later.
        </v-alert>
        <v-container v-else fluid style="width: 100%;">
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 0" step="0">User Experience Fragebogen</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 1" step="1">Feedback</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">Studie Abgeschlossen</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="0">
                <v-layout column style="margin-left: 20px;">
                  <h1>User Experience Questionnaire</h1>
                  <br>
                  <p>Um das Produkt zu bewerten, füllen Sie bitte den nachfolgenden Fragebogen aus. Er besteht aus
                    Gegensatzpaaren von Eigenschaften, die das Produkt haben kann. Abstufungen zwischen den Gegensätzen
                    sind durch Kreise dargestellt. Durch Ankreuzen eines dieser Kreise können Sie Ihre Zustimmung zu
                    einem Begriff äußern.</p>
                  <p>Entscheiden Sie möglichst spontan. Es ist wichtig, dass Sie nicht lange über die Begriffe
                    nachdenken, damit Ihre unmittelbare Einschätzung zum Tragen kommt.
                    Bitte kreuzen Sie immer eine Antwort an, auch wenn Sie bei der Einschätzung zu einem Begriffspaar
                    unsicher sind oder finden, dass es nicht so gut zum Produkt passt.
                    Es gibt keine „richtige“ oder „falsche“ Antwort. Ihre persönliche Meinung zählt!</p>
                  <br>

                  <div class="text-xs-center" v-for="(question, qi) in ueq_de">
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
                        <div class="text-xs-left">{{ question.right}}</div>
                        <br v-if="$vuetify.breakpoint.xs">
                      </v-flex>
                    </v-layout>
                    <br><br>


                  </div>

                  <v-btn v-if="ueq_en.reduce(((acc, curr) => acc * curr.value), 1) > 0"
                         class="gradient gradient-orange" style="width: 200px;" dark round @click="e1 = 1"
                         v-on:click="logUser">Weiter
                  </v-btn>
                  <v-btn v-else disabled style="width: 400px;" round @click="e1 = 1"
                         v-on:click="logUser">Bitte alles bewerten.
                  </v-btn>
                </v-layout>
              </v-stepper-content>
              <v-stepper-content step="1" v-if="user">
                <v-layout column style="margin-left: 20px;">
                  <h1>Feedback</h1>
                  <br>

                  <section>
                    <p class="title">Bitte bewerten Sie folgende Aussagen.</p>
                    <v-layout row wrap align-center>
                      <v-flex xs12 md4>
                        Die Heatmap-Darstellung meiner<br>
                        vergangenen Aktivitäten ist interessant.
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-slider style="width: 100%;" v-model="feedback.rating.i1"
                                  :tick-labels="['Stimme nicht zu',' ','Neutral',' ', 'Stimme zu']" :max="4" step="1"
                                  ticks="always"></v-slider>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-center>
                      <v-flex xs12 md4>
                        Ich konnte die Heatmap verstehen und<br>
                        wusste, was sie mir anzeigt.
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-slider style="width: 100%;" v-model="feedback.rating.i2"
                                  :tick-labels="['Stimme nicht zu',' ','Neutral',' ', 'Stimme zu']" :max="4" step="1"
                                  ticks="always"></v-slider>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-center>
                      <v-flex xs12 md4>
                        Ich war in der Lage, neue Routen<br>
                        zu generieren.
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-slider style="width: 100%;" v-model="feedback.rating.i3"
                                  :tick-labels="['Stimme nicht zu',' ','Neutral',' ', ' Stimme zu']" :max="4" step="1"
                                  ticks="always"></v-slider>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-center>
                      <v-flex xs12 md4>
                        Mir wurden einige interessante<br>
                        neue Routen vorgeschlagen.
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-slider style="width: 100%;" v-model="feedback.rating.i4"
                                  :tick-labels="['Stimme nicht zu',' ','Neutral',' ', 'Stimme zu']" :max="4" step="1"
                                  ticks="always"></v-slider>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-center>
                      <v-flex xs12 md4>
                        Die generierten Routen waren<br>
                        fahrradtauglich.
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-slider style="width: 100%;" v-model="feedback.rating.i5"
                                  :tick-labels="['Stimme nicht zu',' ','Neutral',' ', 'Stimme zu']" :max="4" step="1"
                                  ticks="always"></v-slider>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-center>
                      <v-flex xs12 md4>
                        Ich würde ein solches System<br>
                        weiterhin benutzen um neue<br>
                        Routen zu finden.
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-slider style="width: 100%;" v-model="feedback.rating.i6"
                                  :tick-labels="['Stimme nicht zu',' ','Neutral',' ', 'Stimme zu']" :max="4" step="1"
                                  ticks="always"></v-slider>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-center>
                      <v-flex xs12 md4>
                        Das System hat mir geholfen, neue<br>
                        Routen in Gebieten zu finden, in denen<br>
                        ich bisher noch nicht gefahren bin.
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-slider style="width: 100%;" v-model="feedback.rating.i7"
                                  :tick-labels="['Stimme nicht zu',' ','Neutral',' ', 'Stimme zu']" :max="4" step="1"
                                  ticks="always"></v-slider>
                      </v-flex>
                    </v-layout>
                    <br>
                  </section>

                  <section>
                    <p class="title">Welche der folgenden Funktionen haben Sie benutzt?</p>
                    <v-checkbox v-model="feedback.features" label="Meine persönliche Heatmap betrachten"
                                value="Activity Map"
                                style="margin-top: -10px;"></v-checkbox>
                    <v-checkbox v-model="feedback.features"
                                label="Die Darstellungsart der Karte anpassen (z.B. Mountainbike-Karte)"
                                value="Map Style"
                                style="margin-top: -15px;"></v-checkbox>
                    <v-checkbox v-model="feedback.features" label="Neue Routen generieren"
                                value="Generate"
                                style="margin-top: -15px;"></v-checkbox>
                    <v-checkbox v-model="feedback.features"
                                label="Eine Rundkursroute generieren (gleiche Start- und Zielposition)"
                                value="Round Trip"
                                style="margin-top: -15px;"></v-checkbox>
                    <v-checkbox v-model="feedback.features"
                                label="Eine der generierten Routen in mein Strava-Profil importieren"
                                value="Import"
                                style="margin-top: -15px;"></v-checkbox>
                    <v-checkbox v-model="feedback.features" label="Meine Strava Routen und Aktivitäten anschauen"
                                value="View Route"
                                style="margin-top: -15px;"></v-checkbox>
                  </section>

                  <br>
                  <p class="title">Welche der Funktionen hat Ihnen am besten gefallen und warum?</p>
                  <v-textarea v-model="feedback.q1"></v-textarea>

                  <br>
                  <p class="title">Sind Sie einige der generierten Routen tatsächlich gefahren? Falls ja, geben Sie
                    bitte
                    einen Link zu der jeweiligen Strava Aktivität an.</p>
                  <v-textarea v-model="feedback.q2"></v-textarea>

                  <br>
                  <p class="title">Was hat nicht funktioniert wie erwartet? Was muss verbessert werden? Welche
                    Funktionen
                    fehlen Ihnen?</p>
                  <v-textarea v-model="feedback.q3"></v-textarea>

                  <br>
                  <p class="title">Sind während der Studie sonstige Probleme aufgetreten?</p>
                  <v-textarea v-model="feedback.q4"></v-textarea>
                  <br>

                  <br>
                  <p class="title">Möchten Sie uns noch etwas mitteilen?</p>
                  <v-textarea v-model="feedback.q5"></v-textarea>
                  <br>

                  <v-btn v-if="(feedback.q1 + feedback.q2 +feedback.q3 +feedback.q4 +feedback.q5).length > 100"
                         class="gradient gradient-orange" style="width: 200px;" dark round
                         v-on:click="update" @click="e1 = 2">Absenden
                  </v-btn>
                  <v-btn v-else disabled style="width: 400px;" round
                         v-on:click="logUser">Bitte schreiben Sie etwas mehr.
                  </v-btn>
                </v-layout>
              </v-stepper-content>
              <v-stepper-content step="2" v-if="user">
                <v-layout column style="margin-left: 20px;" v-if="submitted">
                  <h1>Studie Abgeschlossen</h1>
                  <br>
                  <div class="headline">Vielen Dank für Ihre Teilnahme!</div>
                  <br>
                  <div class="text">Wir werden die Gewinner am 05. August auslosen und Ihnen ggf. Bescheid geben. Bitte
                    beachten Sie Ihr E-Mail-Postfach ({{ user.email }}) und den Spam-Ordner.
                  </div>
                  <v-icon color="green" size="100">check</v-icon>
                </v-layout>
                <v-layout column style="margin-left: 20px;" v-else>
                  <section v-if="!failed">
                    <h1>Bitte warten ...</h1>
                    <br>
                    <div class="headline">Ihre Antworten werden übermittelt, bitte warten.</div>
                  </section>
                  <section v-else>
                    <div class="headline">Übermittlung fehlgeschlagen, bitte versuchen Sie es nochmal.</div>
                    <br>
                    <v-btn v-if="(feedback.q1 + feedback.q2 +feedback.q3 +feedback.q4 +feedback.q5).length > 50"
                           class="gradient gradient-green" style="width: 200px;" round
                           v-on:click="update" @click="e1 = 2">Nochmal abschicken
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
        lang: 'de',
        feedback: {
          features: [],
          rating: {},
          q1: '',
          q2: '',
          q3: '',
          q4: '',
          q5: '',
        },
        ueq_vals: [],
        ueq_de: [
          {
            left: 'unerfreulich',
            right: 'erfreulich',
          },
          {
            left: 'unverständlich',
            right: 'verständlich',
          },
          {
            left: 'kreativ',
            right: 'phantasielos',
          },
          {
            left: 'leicht zu lernen',
            right: 'schwer zu lernen',
          },
          {
            left: 'wertvoll',
            right: 'minderwertig',
          },
          {
            left: 'langweilig',
            right: 'spannend',
          },
          {
            left: 'uninteressant',
            right: 'interessant',
          },
          {
            left: 'unberechenbar',
            right: 'voraussagbar',
          },
          {
            left: 'schnell',
            right: 'langsam',
          },
          {
            left: 'originell',
            right: 'konventionell',
          },
          {
            left: 'behindernd',
            right: 'unterstützend',
          },
          {
            left: 'gut',
            right: 'schlecht',
          },
          {
            left: 'kompliziert',
            right: 'einfach',
          },
          {
            left: 'abstoßend',
            right: 'anziehend',
          },
          {
            left: 'herkömmlich',
            right: 'neuartig',
          },
          {
            left: 'unangenehm',
            right: 'angenehm',
          },
          {
            left: 'sicher',
            right: 'unsicher',
          },
          {
            left: 'aktivierend',
            right: 'einschläfernd',
          },
          {
            left: 'erwartungskonform',
            right: 'nicht erwartungskonform',
          },
          {
            left: 'ineffizient',
            right: 'effizient',
          },
          {
            left: 'übersichtlich',
            right: 'verwirrend',
          },
          {
            left: 'unpragmatisch',
            right: 'pragmatisch',
          },
          {
            left: 'aufgeräumt',
            right: 'überladen',
          },
          {
            left: 'attraktiv',
            right: 'unattraktiv',
          },
          {
            left: 'sympathisch',
            right: 'unsympathisch',
          },
          {
            left: 'konservativ',
            right: 'innovativ',
          },
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
      const deadline = new Date('10 August 2019 23:59:59')
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
            name: 'Post-Study Questionnaire',
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
