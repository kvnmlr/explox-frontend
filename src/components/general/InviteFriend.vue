<template>
  <div>
    <v-btn style="width: 95%;" class="gradient gradient-green"
           @click.stop="inviteDialog = true" round light>
      <v-icon>people</v-icon>&nbsp;Invite a Friend
    </v-btn>
    <v-dialog v-model="inviteDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Invite Friends</v-card-title>
        <v-card-text>
          <p>Who do you want to invite? We will send an invitation e-mail directly to your friend's
            e-mail address.</p>
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="inviteName" label="Receiver Name (optional)"></v-text-field>
            <v-text-field v-model="inviteEmail" label="Receiver E-Mail" required></v-text-field>
            <v-btn round flat color="primary" v-on:click.prevent="invite">
              Send Invitation E-Mail
            </v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
  import apiMixin from "../../mixins/apiMixin";

  export default {
    name: "InviteFriend",
    data() {
      return {
        inviteDialog: false,
        inviteName: '',
        inviteEmail: '',
      };
    },
    methods: {
      async invite() {
        const formData = {
          _csrf: this.csrfToken,
          email: this.inviteEmail,
          name: this.inviteName,
        };

        this.POST('invite', formData, null, (data, err) => {
          this.inviteDialog = false;
          this.inviteEmail = '';
          this.inviteName = '';
        });
      },
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
