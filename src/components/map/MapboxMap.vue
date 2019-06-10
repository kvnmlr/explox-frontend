<template>
  <div>
    <mapbox v-show="!hidden" v-bind:class="[{ hidden: hidden, overlay: overlay}]"
            access-token="pk.eyJ1Ijoia3ZubWxyIiwiYSI6ImNqajRqdXEzOTFrajMza24zZzZsNXRlOGQifQ.oPZ1Cnq69ZVPEySZpJItLA"
            :map-options="{style: 'mapbox://styles/mapbox/light-v9',center: [-96, 37.8],zoom: 3}"
            :geolocate-control="{show: true,position: 'top-left'}"
            :scale-control="{show: true,position: 'top-left'}"
            :fullscreen-control="{show: true,position: 'top-right'}"

            @map-init="mapInitialized"
            @map-load="mapLoaded"
            @map-click="mapClicked"
            @geolocate-error="geolocateError"
            @geolocate-geolocate="geolocate">
    </mapbox>
  </div>
</template>

<script>
  import Mapbox from 'mapbox-gl-vue';
  import MapboxGl from 'mapbox-gl';

  export default {
    name: "mapbox-map",
    components: {Mapbox},
    data() {
      return {
        map: null,
        tileLayer: null,
        featureLayers: [],
        overlay: false,
        hidden: false,
      }
    },

    methods: {
      mapInitialized(map) {
        this.map = map;
      },
      mapLoaded(map) {
        map.addLayer({
          id: 'points',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-77.03238901390978, 38.913188059745586]
                },
                properties: {
                  title: 'Mapbox DC',
                  icon: 'monument'
                }
              }, {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-122.414, 37.776]
                },
                properties: {
                  title: 'Mapbox SF',
                  icon: 'harbor'
                }
              }]
            }
          },
          layout: {
            'icon-image': '{icon}-15',
            'text-field': '{title}',
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top'
          }
        });
      },
      mapClicked(map, e) {
        alert('Map Clicked!');
      },
      geolocateError(control, positionError) {
        console.log(positionError);
      },
      geolocate(control, position) {
        console.log(`User position: ${position.coords.latitude}, ${position.coords.longitude}`);
      }
    },
  }
</script>

<style scoped>

</style>
