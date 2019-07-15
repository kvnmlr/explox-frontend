<template>
  <div v-if="psq">
    <v-btn outline color="primary" to="/admin/dashboard">
      Back to Dashboard
    </v-btn>
    <v-btn outline color="primary" @click="exportCSV">
      Export CSV
    </v-btn>
    <h1>Questionnaires</h1>
    <code>{{ text }}</code>
    <v-radio-group v-model="radioGroup">
      <v-radio
        v-for="n in ['All', 'Users', 'Eligibles', 'Participants']"
        :key="n"
        :label="`${n}`"
        :value="n"
      ></v-radio>
    </v-radio-group>

    <v-expansion-panel v-model="panel">
      <v-expansion-panel-content
        v-for="(qi, index) in psq.filter(this.filterMethod)"
        :key="index">
        <div slot="header">
          <h2>User {{index}}</h2>
        </div>
        <v-card>
          <v-card-text>
            <h3>Demographics</h3>
            <span v-if="qi.demographics"><code style="width: 100%; color: black">{{ JSON.stringify(qi.demographics, null, 2) }}</code></span>
            <h3>Cycling Behaviour</h3>
            <span v-if="qi.cyclingBehaviour"><code style="width: 100%; color: black">{{ JSON.stringify(qi.cyclingBehaviour, null, 2) }}</code></span>
            <h3>Route Planning</h3>
            <span v-if="qi.routePlanning"><code style="width: 100%; color: black">{{ JSON.stringify(qi.routePlanning, null, 2) }}</code></span>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

  </div>
</template>

<script>
  import apiMixin from '../../../mixins/apiMixin'
  import formatDateMixin from '../../../mixins/formatDateMixin'
  import {EventBus} from '@/eventBus.js'

  export default {
    name: 'PSQ',
    data () {
      return {
        text: '',
        psq: [],
        radioGroup: 'All',
        panel: [true],
      }
    },
    created () {
      this.getQuestionnaires()
    },
    methods: {
      exportCSV () {
        let results = this.psq.filter(this.filterMethod)
        let text = ''
        let first = true
        for (let res of results) {
          if (first) {
            for (let category in res) {
              if (category !== 'psq') continue
              for (let question in res[category]) {
                let q = res[category][question]
                if (typeof q === 'object' && q !== null) {
                  for (let subQuestion in q) {
                    text += (category.substr(0, 4) + '-' + question + '-' + subQuestion)
                    text += ';'
                  }
                } else {
                  text += (category.substr(0, 4) + '-' + question)
                  text += ';'
                }

              }
            }
            first = false
          }
          text += '\n'
          for (let category in res) {
            if (category !== 'psq') continue
            for (let question in res[category]) {
              let q = res[category][question]
              for (let subQuestion in q) {
                let subq = q[subQuestion]
                if (typeof subq === 'object') {
                  text += subq.value
                } else {
                  text += JSON.stringify(subq)
                }
                text += ';'
              }
            }
          }
          text += '\n'
          this.text = text
        }
      },

      async getQuestionnaires () {
        this.GET('questionnaire', (data, err) => {
          this.psq = data.questionnaires
        })
      },
      filterMethod (qi) {
        if (!qi.questionnaireInfo) {
          return false
        }
        switch (this.radioGroup) {
          case 'All':
            return true
          case 'Users':
            return qi.questionnaireInfo.canUseWebsite
          case 'Eligibles':
            return qi.questionnaireInfo.eligible
          case 'Participants':
            return qi.questionnaireInfo.participates
        }
      }
    }
    ,
    mixins: [apiMixin, formatDateMixin]
  }
</script>

<style scoped>

</style>
