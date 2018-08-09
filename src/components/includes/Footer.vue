<template>
  <Footer color="stylish-color" class="font-small pt-4 mt-4">
    <template>
      <v-footer class="pa-3">
        <v-spacer></v-spacer>
        <div>&copy; ExploX {{ new Date().getFullYear() }}</div>
      </v-footer>
    </template>
  </Footer>
</template>

<script>

  export default {
    components: {
    },
    name: "app-footer"
  }
</script>

<style scoped>
  Footer
  {
    clear: both;
    color: White;
    vertical-align: middle;
    margin: 0;
    position: relative;
    bottom: 0px;
    width: 100%;
  }
</style>
