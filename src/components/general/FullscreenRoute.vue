<template>
  <div class="fs-map">
    <simple-map></simple-map>
  </div>
</template>

<script>
  import SimpleMap from "../map/LeafletMap";

  export default {
    components: {SimpleMap},
    name: "FullscreenRoute"
    }
</script>

<style scoped>
  .fs-map
  {
    z-index: 10;
    clear: both;
    color: White;
    vertical-align: middle;
    margin-top: 0px;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
</style>
