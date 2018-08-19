<template>
  <div>
    <div id="map" class="elevation-5"></div>
    <v-expansion-panel dark class="elevation-10">
      <v-expansion-panel-content class="gradient-no-switch gradient-secondary">
        <div dark slot="header">Map Settings</div>
        <v-card class="gradient-no-switch gradient-secondary" dark>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 md5 md5>
                <v-menu offset-y>
                  <v-btn slot="activator" class="gradient gradient-orange" round>Change Map Style</v-btn>
                  <v-list v-for="map in mapLayers" dark :key="map.index">
                    <v-list-tile @click="providerChanged(map.id)">
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
  import geoTransformMixin from "../../mixins/geoTransformMixin";
  import {EventBus} from '@/eventBus.js';


  export default {
    name: "simple",
    data: function () {
      return {
        map: null,
        mapLayers: [],
        featureLayers: [],
        tileLayer: null,
        selectedMap: 0,
        selectedFeatures: [0, 1, 2, 3, 4],
        route: undefined,
        activities: undefined,
      }
    },

    mixins: [geoTransformMixin],

    created() {
      EventBus.$on('routeReady', (data) => {
        console.log('routes ready');
        this.route = data;
        this.reloadMap();
      });
      EventBus.$on('activitiesReady', (data) => {
        console.log('activities ready');
        this.activities = data;
        this.reloadMap();
      });
      EventBus.$on('removeMap', (next) => {
        try {
          this.map.remove();
        } catch (e) {
        }
        this.map = undefined;
        next();
      });
    },

    mounted() {
      this.initProviders();
      this.init();
    },

    methods: {
      addMouseSelectionLayer(id) {
        const layer = {
          id: 4,
          name: 'MouseSelection',
          features: [
            {
              style: {
                "color": "#00FF00",
                "weight": 5,
                "opacity": 1
              },
              properties: {
                type: "selection"
              },
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates:
                  [-90.168056, 38.770547],
              },

            }
          ],
        };
        this.featureLayers.push(layer);
      },
      addCoverageLayer(id) {
        if (!this.activities) {
          return;
        }
        const layer = {
          id: id,
          name: 'Coverage',
          features: [
            {
              style: {
                "color": "#00FF00",
                "weight": 5,
                "opacity": 1
              },
              primary: !this.route,
              properties: {
                type: "route"
              },
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: this.toGeoJSON(this.activities[0].geo),
              },

            }
          ],
        };
        this.featureLayers.push(layer);
      },
      addMarkerLayer(id) {
        const layer = {
          id: id,
          name: 'Endpoints',
          features: [
            {
              id: 0,
              name: 'Startpoint',
              type: 'marker',
              coords: [38.6109607, -90.2050322],
            },
            {
              id: 1,
              name: 'Endpoint',
              type: 'marker',
              coords: [38.6109607, -90.2050322],
            },
          ],
        };
        this.featureLayers.push(layer);
      },
      addRouteLayer(id) {
        if (!this.route) {
          return;
        }
        const layer = {
          id: id,
          name: 'RouteLines',
          features: [
            {
              style: {
                "color": "#FF0000",
                "weight": 5,
                "opacity": 1
              },
              primary: true,
              properties: {
                type: "route"
              },
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: this.toGeoJSON(this.route.geo),
              },

            }
          ],
        };
        this.featureLayers.push(layer);
      },

      reloadMap() {
        try {
          this.map.remove();
          this.map = undefined;
        } catch (e) {
        }
        this.init();
      },

      init() {
        if (!this.initView()) {
          return;
        }

        this.providerChanged(this.selectedMap);

        // add layers
        this.featureLayers = [];
        this.addRouteLayer(1);
        this.addMarkerLayer(2);
        this.addCoverageLayer(3);
        this.addMouseSelectionLayer(4);

        // init layers (create leaflet obejcts)
        this.initLayers();

        // activate layers
        this.selectedFeatures.forEach(feature => {
          this.layerChanged(feature, true);
        });
      },

      initView() {
        try {
          this.map = L.map('map', {
            minZoom: 0,
            maxZoom: 100,
            scrollWheelZoom: false,
            zoomControl: true,
            fullscreenControl: {
              pseudoFullscreen: false // if true, fullscreen to page width and height
            }
          }).setView([38.63, -90.23], 12);
        } catch (e) {
          return false;
        }
        return true;
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
          const geoJSONFeatures = layer.features.filter(feature => feature.type === 'Feature');

          markerFeatures.forEach((feature) => {
            feature.leafletObject = L.marker(feature.coords).bindPopup(feature.name);
          });

          polygonFeatures.forEach((feature) => {
            feature.leafletObject = L.polygon(feature.coords, {color: layer.color}).bindPopup(feature.name);
          });

          geoJSONFeatures.forEach((feature) => {
            feature.leafletObject = L.geoJSON(feature, feature.style);
          });

          /*
          var coverageLayer = new L.GridLayer.MaskCanvas(!{JSON.stringify(map.maskConfig)});
        coverageLayer.setData(!{JSON.stringify(map.heatmapData.data)});
           */
        });
      },

      layerChanged(layerId) {
        const active = this.selectedFeatures.includes(layerId);
        const layer = this.featureLayers.find(layer => layer.id === layerId);
        if (!layer) {
          return;
        }
        layer.features.forEach((feature) => {
          if (active) {
            feature.leafletObject.addTo(this.map);
            if (feature.primary) {
              try {
                this.map.fitBounds(feature.leafletObject.getBounds());
              } catch (e) {
                console.log("Bounds not ready yet");
              }
            }
          } else {
            feature.leafletObject.removeFrom(this.map);
          }
        });
      },

      providerChanged(mapId) {
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
      },
    },
  }
</script>

<style scoped>

</style>
