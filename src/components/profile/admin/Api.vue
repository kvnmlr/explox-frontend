<template>
  <div>
    <h2>API Limits</h2>

    <b>Short Term</b>
    <p>20 out of 100</p>
    <v-progress-linear
      color="warning"
      height="15"
      value="20"
    ></v-progress-linear>

    <div class="separator"></div>

    <b>Long Term</b>
    <p>1000 out of 30000</p>
    <v-progress-linear
      color="warning"
      height="15"
      value="30"
    ></v-progress-linear>
    <div class="separator"></div>
  </div>

</template>

<script>
  export default {
    name: "Api"
  }
</script>

<style scoped>

</style>
