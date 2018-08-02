<template>
    <div>
      <h2>{{ name }}</h2>
    </div>
</template>

<script>
    export default {
        name: "RouteDetails",
      data () {
        return {
          name: this.$route.params.name,
        }
      },
    }
</script>

<style scoped>

</style>
