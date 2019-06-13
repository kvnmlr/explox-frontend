<template>
  <div>
    <div v-if="user && user.creatorTutorial !== undefined">
      <section v-if="user.creatorTutorial">
        <creator v-bind:user="user"></creator>
      </section>
      <section v-else>
        <creator-tutorial v-bind:user="user"></creator-tutorial>
      </section>
    </div>
  </div>
</template>

<script>
  import Creator from '../routes/Creator'
  import CreatorTutorial from './CreatorTutorial'

  export default {
    name: 'CreatorWrapper',
    components: {CreatorTutorial, Creator},
    props: {
      user: Object
    },
  }
</script>

<style scoped>

</style>
