<template>
  <div>
    <div id="map" class="elevation-5"></div>
    <v-expansion-panel dark class="elevation-10">
      <v-expansion-panel-content class="gradient-no-switch gradient-secondary" >
        <div dark slot="header">Map Settings</div>
        <v-card class="gradient-no-switch gradient-secondary" dark>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 md5 md5>
                <v-menu offset-y>
                  <v-btn slot="activator" class="gradient gradient-orange" round >Change Map Style</v-btn>
                  <v-list v-for="map in mapLayers" dark :key="map.index">
                    <v-list-tile @click="mapChanged(map.id)">
                      <v-list-tile-title>{{map.name}}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-btn light class="gradient gradient-green" round>Fullscreen</v-btn>
              </v-flex>
              <v-flex xs12 md4 md4>
                <div v-for="layer in featureLayers" :key="layer.id">
                  <v-switch v-on:change="layerChanged(layer.id)" v-model="selectedFeatures" v-bind:label="layer.name"
                            v-bind:value="layer.id" color="primary" hide-details>{{layer.name}}
                  </v-switch>
                </div>

              </v-flex>
              <v-flex xs12 md3 md3>
                <v-btn light fab class="gradient gradient-green" style="float: right;" v-on:click="reloadMap">
                  <v-icon>refresh</v-icon>
                </v-btn>
                <v-btn light fab class="gradient gradient-green" style="float: right;" v-on:click="reloadMap">
                  <v-icon>center_focus_strong</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
  export default {
    name: "simple",
    data() {
      return {
        map: null,
        mapLayers: [],
        featureLayers: [
          {
            id: 0,
            name: 'Restaurants',
            features: [
              {
                id: 0,
                name: 'Bogart\'s Smokehouse',
                type: 'marker',
                coords: [38.6109607, -90.2050322],
              },
            ],
          },
          {
            id: 1,
            color: 'blue',
            name: 'City/County Boundaries',
            features: [
              {
                id: 0,
                name: 'City of St. Louis',
                type: 'polygon',
                coords: [
                  [38.770547, -90.168056],
                  [38.753816, -90.177326],
                  [38.747390, -90.183849],
                  [38.731456, -90.206337],
                  [38.719805, -90.212002],
                  [38.706142, -90.210629],
                  [38.692879, -90.202217],
                  [38.680150, -90.189857],
                  [38.665139, -90.182991],
                  [38.646774, -90.179729],
                  [38.630818, -90.179214],
                  [38.615663, -90.183849],
                  [38.601713, -90.190201],
                  [38.587759, -90.204620],
                  [38.577427, -90.219212],
                  [38.564140, -90.232258],
                  [38.545615, -90.248566],
                  [38.531650, -90.257664],
                  [38.538901, -90.270023],
                  [38.548702, -90.273113],
                  [38.561053, -90.294399],
                  [38.574072, -90.309334],
                  [38.596346, -90.320320],
                  [38.614054, -90.314827],
                  [38.632159, -90.304527],
                  [38.651198, -90.302296],
                  [38.664067, -90.293713],
                  [38.683768, -90.278263],
                  [38.700650, -90.265388],
                  [38.717662, -90.253887],
                  [38.722349, -90.238266],
                  [38.729715, -90.221272],
                  [38.742302, -90.203934],
                  [38.754886, -90.191746],
                  [38.764792, -90.184021],
                  [38.771350, -90.183334],
                ],
              },
            ],
          },
          {
            id: 2,
            color: 'red',
            name: 'City/County Boundaries',
            features: [
              {
                id: 1,
                color: 'blue',
                name: 'St. Louis County',
                type: 'polygon',
                coords: [
                  [38.771216, -90.169601],
                  [38.786740, -90.144196],
                  [38.799049, -90.124283],

                  [38.863771, -90.271912],
                  [38.888361, -90.294571],
                  [38.892102, -90.327530],
                  [38.873929, -90.343323],
                  [38.856285, -90.342636],
                  [38.828475, -90.441513],
                  [38.788345, -90.477905],
                  [38.763186, -90.484772],
                  [38.740695, -90.510178],

                  [38.463267, -90.692139],
                  [38.453051, -90.684586],
                  [38.446060, -90.683899],
                  [38.446598, -90.669479],
                  [38.454126, -90.655060],
                  [38.466493, -90.659180],
                  [38.502505, -90.592575],
                  [38.503042, -90.407181],
                  [38.492294, -90.406494],
                  [38.484232, -90.409241],
                  [38.478320, -90.416107],
                  [38.472406, -90.422287],
                  [38.465418, -90.422287],
                  [38.454664, -90.413361],
                  [38.454664, -90.401688],
                  [38.458428, -90.392761],
                  [38.450900, -90.390015],
                  [38.452513, -90.374908],
                  [38.457353, -90.348129],
                  [38.451438, -90.337830],
                  [38.439069, -90.340576],
                  [38.428849, -90.346069],
                  [38.418628, -90.347443],
                  [38.408406, -90.347443],
                  [38.396568, -90.345383],
                  [38.391186, -90.336456],
                  [38.414862, -90.311737],
                  [38.424546, -90.293198],
                  [38.453051, -90.282898],
                  [38.492832, -90.273972],
                  [38.510565, -90.268135],
                  [38.531516, -90.258522],
                  [38.537693, -90.270538],
                  [38.544138, -90.272598],
                  [38.552730, -90.272598],
                  [38.559710, -90.293541],
                  [38.568032, -90.304871],
                  [38.577695, -90.311050],

                  [38.740963, -90.204620],
                  [38.747925, -90.198097],
                  [38.756225, -90.189514],
                  [38.763721, -90.185051],
                  [38.771752, -90.184708],
                ],
              },
            ],
          },
        ],
        tileLayer: null,
        selectedMap: 0,
        selectedFeatures: [0, 1],
      }
    },

    mounted() {
      this.initProviders();
      this.initLayers();
      this.init();
    },
    methods: {
      reloadMap() {
        this.map.remove();
        this.init();
      },

      init() {
        this.initView();
        this.mapChanged(this.selectedMap);
        this.selectedFeatures.forEach(feature => {
          this.layerChanged(feature, true);
        });
      },

      initView() {
        this.map = L.map('map').setView([38.63, -90.23], 12);
      },
      initProviders() {
        const lightMap = {
          leafletObject: L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
            subdomains: 'abcd',
            maxZoom: 19
          }),
          id: 0,
          name: 'Light'
        };
        this.mapLayers.push(lightMap);

        const darkMap = {
          leafletObject: L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
            subdomains: 'abcd',
            maxZoom: 19
          }),
          id: 1,
          name: 'Dark'
        };
        this.mapLayers.push(darkMap);

        const cyclingMap = {
          leafletObject: L.tileLayer('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=60c679297f13468f9c6f3992e0f9ea61', {
            attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 22
          }),
          id: 2,
          name: 'Road Cycling'
        };
        this.mapLayers.push(cyclingMap);

        const mtbMap = {
          leafletObject: L.tileLayer('http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &amp; USGS'
          }),
          id: 3,
          name: 'Mountainbike'
        };
        this.mapLayers.push(mtbMap);
      },
      initLayers() {
        this.featureLayers.forEach((layer) => {
          const markerFeatures = layer.features.filter(feature => feature.type === 'marker');
          const polygonFeatures = layer.features.filter(feature => feature.type === 'polygon');

          markerFeatures.forEach((feature) => {
            feature.leafletObject = L.marker(feature.coords).bindPopup(feature.name);
          });

          polygonFeatures.forEach((feature) => {
            feature.leafletObject = L.polygon(feature.coords, {color: layer.color}).bindPopup(feature.name);
          });
        });
      },

      layerChanged(layerId) {
        const active = this.selectedFeatures.includes(layerId);
        const layer = this.featureLayers.find(layer => layer.id === layerId);
        layer.features.forEach((feature) => {
          if (active) {
            feature.leafletObject.addTo(this.map);
          } else {
            feature.leafletObject.removeFrom(this.map);
          }
        });
      },

      mapChanged(mapId) {
        this.selectedMap = mapId;
        this.mapLayers.forEach(map => {
          if (map.leafletObject) {
            map.leafletObject.removeFrom(this.map);
          }
        });
        const layer = this.mapLayers.find(layer => layer.id === mapId);
        if (layer.leafletObject) {
          layer.leafletObject.addTo(this.map);
        }
      }
    },
  }
</script>

<style scoped>

</style>
