<template>
  <div v-if="qis">
    <v-btn outline color="primary" to="/admin/dashboard">
      Back to Dashboard
    </v-btn>
    <h1>Questionnaires</h1>
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
        v-for="(qi, index) in qis.filter(this.filterMethod)"
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
    name: 'Questionnaire',
    data () {
      return {
        qis: [],
        radioGroup: 'All',
        panel: [true],
      }
    },
    created () {
      this.getQuestionnaires()
    },
    methods: {
      async getQuestionnaires () {
        this.GET('questionnaire', (data, err) => {
          this.qis = data.questionnaires
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
    },
    mixins: [apiMixin, formatDateMixin]
  }
</script>

<style scoped>

</style>
