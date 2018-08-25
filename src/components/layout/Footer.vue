<template>
  <Footer class="font-small">
    <template>
      <v-footer dark color="primary" class="pa-3">
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

