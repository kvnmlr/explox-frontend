<template>
  <div>
    <h1>Get Started</h1>
    <div class="separator"></div>
    <explanation :user="user"></explanation>
  </div>
</template>

<script>
  import UnderConstruction from "../includes/UnderConstruction";
  import Explanation from "./Explanation";

  export default {
    name: "GetStarted",
    components: {Explanation, UnderConstruction},
    props: {
      user: Object,
    }
  }
</script>

<style scoped>

</style>
