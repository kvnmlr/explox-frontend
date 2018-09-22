<template>
  <Footer class="font-small">
    <template>
      <v-footer style="z-index: 100; background-color: #000000" class="pa-3">
        <v-spacer></v-spacer>
        <div style="color: lightgray">&copy; ExploX {{ new Date().getFullYear() }}</div>
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

