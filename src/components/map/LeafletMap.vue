<template>
  <div>
    <div id="map" class="elevation-5"></div>
    <v-expansion-panel dark class="elevation-10" :value="openPanel ? 0 : 1">
      <v-expansion-panel-content class="gradient-no-switch gradient-secondary">
        <div dark slot="header">Map Visuals</div>
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
              </v-flex>
              <v-flex xs12 md4 md4>
                <div v-for="layer in featureLayers" :key="layer.id">
                  <v-switch v-on:change="layerChanged(layer.id, false)" v-model="selectedFeatures"
                            v-bind:label="layer.name"
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

  require('../../assets/js/L.GridLayer.MaskCanvas.js');


  export default {
    name: "simple",
    data: function () {
      return {
        map: null,
        mapLayers: [],
        featureLayers: [],
        tileLayer: null,
        selectedMap: 0,
        selectedFeatures: [],
        route: undefined,
        routeGeoJSON: undefined,
        activities: [],
        activitiesGeoJSON: [],


        // IDs
        id_route: 1,
        id_start_point: 2,
        id_end_point: 3,
        id_activity: 4,
        id_mouse_start_selection: 5,
        id_mouse_end_selection: 6,
      }
    },
    props: {
      showActivityMap: Boolean,
      showRoute: Boolean,
      showMouseSelection: Boolean,
      dark: Boolean,
      currentSelectStart: Boolean,     // indicates whether current mouse selection is the start point
      selectEnabled: Boolean,
      openPanel: Boolean,
    },

    mixins: [geoTransformMixin],

    created() {
      let features = [];
      if (this.showRoute) {
        features.push(this.id_route);
        features.push(this.id_start_point);
        features.push(this.id_end_point);
      }
      if (this.showActivityMap) {
        features.push(this.id_activity);
      }
      if (this.showMouseSelection) {
        features.push(this.id_mouse_start_selection);
        features.push(this.id_mouse_end_selection);
      }
      this.selectedFeatures = features;

      if (this.dark) {
        this.selectedMap = 1;
      }

      EventBus.$on('routeReady', (data) => {
        this.route = data;
        this.routeGeoJSON = this.toGeoJSON(this.route.geo, false);
        this.reloadMap();
      });
      EventBus.$on('activitiesReady', (data) => {
        this.activities = data;

        this.activities.forEach(activity => {
          this.activitiesGeoJSON = this.activitiesGeoJSON.concat(this.toGeoJSON(activity.geo, true));
        });
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
      addMouseStartSelectionLayer(id) {
        let self = this;
        this.map.on('click', function (click) {
          if (click.latlng && self.currentSelectStart && self.selectEnabled) {

            self.$emit('startSelected', click.latlng);

            const geojsonMarkerOptions = {
              radius: 8,
              fillColor: "#ff780000",
              color: "#000",
              weight: 5,
              opacity: 1,
              fillOpacity: 0.8
            };
            let states = {
              id: id,
              label: 'mouse',
              name: 'Mouse Selection',
              type: "Feature",
              properties: {
                type: "start",
                popupContent: "This is the start point!"
              },
              geometry: {
                type: "Point",
                coordinates: [click.latlng.lng.toFixed(4).toString(), click.latlng.lat.toFixed(4).toString()]
              }
            };

            // check if this layer already exists
            let index;
            const layerExists = self.featureLayers.find((layer, i) => {
              if (layer.id === self.id_mouse_start_selection) {
                index = i;
                return true;
              }
              return false;
            });

            if (!layerExists) {
              // push the layer for the first time and set index to the last position in the array
              self.featureLayers.push(states);
              index = self.featureLayers.length-1;
            } else {
              // remove the layer from the map in order to remove previous selections
              self.map.removeLayer(self.featureLayers[index].leafletObject);
            }

            // create and assign the geoJSON object
            self.featureLayers[index] = states;
            self.featureLayers[index].leafletObject = L.geoJSON(states, {
              //onEachFeature: onEachFeature,
              style: function (feature) {
                geojsonMarkerOptions.color = "#ff7100"
                return geojsonMarkerOptions;
              },
              pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
              }
            });

            // update the layer
            self.layerChanged(self.id_mouse_start_selection);
          }
        });
      },
      addMouseEndSelectionLayer(id) {
        let self = this;
        this.map.on('click', function (click) {
          if (click.latlng && !self.currentSelectStart && self.selectEnabled) {

            self.$emit('endSelected', click.latlng);


            const geojsonMarkerOptions = {
              radius: 10,
              fillColor: "#ff780000",
              color: "#000",
              weight: 5,
              opacity: 1,
              fillOpacity: 0.8
            };
            let states = {
              id: id,
              label: 'mouse',
              name: 'End Selection',
              type: "Feature",
              properties: {
                type: "end",
                popupContent: "This is the end point!"
              },
              geometry: {
                type: "Point",
                coordinates: [click.latlng.lng.toFixed(4).toString(), click.latlng.lat.toFixed(4).toString()]
              }
            };

            // check if this layer already exists
            let index;
            const layerExists = self.featureLayers.find((layer, i) => {
              if (layer.id === self.id_mouse_end_selection) {
                index = i;
                return true;
              }
              return false;
            });

            if (!layerExists) {
              // push the layer for the first time and set index to the last position in the array
              self.featureLayers.push(states);
              index = self.featureLayers.length-1;
            } else {
              // remove the layer from the map in order to remove previous selections
              self.map.removeLayer(self.featureLayers[index].leafletObject);
            }

            // create and assign the geoJSON object
            self.featureLayers[index] = states;
            self.featureLayers[index].leafletObject = L.geoJSON(states, {
              //onEachFeature: onEachFeature,
              style: function (feature) {
                geojsonMarkerOptions.color = "#0cff00"
                return geojsonMarkerOptions;
              },
              pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
              }
            });

            // update the layer
            self.layerChanged(self.id_mouse_end_selection);
          }
        });
      },

      addCoverageLayer(id) {
        if (!this.activities) {
          return;
        }
        if (this.activities.length === 0) {
          return;
        }
        const coverageLayer =
          {
            id: id,
            label: 'coverage',
            name: 'Activity Map',
            style: {
              "color": "#00FF00",
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
              coordinates: this.activitiesGeoJSON,
            },
          };
        this.featureLayers.push(coverageLayer);
      },
      addMarkerLayer(id) {
        const startPoint =
          {
            id: id,
            label: 'start',
            name: 'Startpoint',
            type: 'marker',
            coords: [this.routeGeoJSON[0][1], this.routeGeoJSON[0][0]],
          };
        const endPoint = {
          id: id + 1,
          name: 'Endpoint',
          label: 'end',
          type: 'marker',
          color: 'green',
          coords: [this.routeGeoJSON[this.routeGeoJSON.length - 1][1], this.routeGeoJSON[this.routeGeoJSON.length - 1][0]],
        };
        this.featureLayers.push(startPoint);
        this.featureLayers.push(endPoint);
      },
      addRouteLayer(id) {
        const routeLayer =
          {
            id: id,
            label: 'route',
            name: 'Route',
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
              coordinates: this.routeGeoJSON,
            },
          };
        this.featureLayers.push(routeLayer);
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

        if (this.route && this.showRoute) {
          this.addRouteLayer(this.id_route);
          this.addMarkerLayer(this.id_start_point);
        }
        if (this.activitiesGeoJSON && this.showActivityMap) {
          this.addCoverageLayer(this.id_activity);
        }
        if (this.showMouseSelection) {
          this.addMouseStartSelectionLayer(this.id_mouse_start_selection);
          this.addMouseEndSelectionLayer(this.id_mouse_end_selection);

          /* let self = this;
          this.map.on('click', function () {
            self.currentSelectStart = !self.currentSelectStart;
          }); */
        }

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
          if (layer.label === 'start') {
            const startIcon = L.icon({
              iconUrl: 'https://cdn4.iconfinder.com/data/icons/maps-and-navigation-solid-icons-vol-3/72/115-512.png',
              iconSize: [50, 50], // size of the icon
              iconAnchor: [15, 40], // point of the icon which will correspond to marker's location
              popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
            });
            layer.leafletObject = L.marker(layer.coords, {icon: startIcon}).bindPopup(layer.name);
            return;
          }

          if (layer.label === 'end') {
            const startIcon = L.icon({
              iconUrl: 'https://cdn4.iconfinder.com/data/icons/maps-and-navigation-solid-icons-vol-3/72/115-512.png',
              iconSize: [50, 50], // size of the icon
              iconAnchor: [15, 40], // point of the icon which will correspond to marker's location
              popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
            });
            layer.leafletObject = L.marker(layer.coords, {icon: startIcon}).bindPopup(layer.name);
            return;
          }

          if (layer.label === 'route') {
            layer.leafletObject = L.geoJSON(layer, layer.style);
            return;
          }

          if (layer.label === 'coverage') {

            let coverageLayer = new L.GridLayer.MaskCanvas(
              {
                radius: 50,                 // radius in pixels or in meters (see useAbsoluteRadius)
                useAbsoluteRadius: true,    // true: r in meters, false: r in pixels
                color: '#000',              // the color of the layer
                opacity: 0.5,               // opacity of the not covered area
                noMask: false,              // true results in normal (filled) circled, instead masked circles
                lineColor: '#A00'           // color of the circle outline if noMask is true
              }
            );
            coverageLayer.setData(this.activitiesGeoJSON);
            layer.leafletObject = coverageLayer;


            // layer.leafletObject = L.geoJSON(layer, layer.style);
            return;
          }
        });
      },

      layerChanged(layerId, fit) {
        const active = this.selectedFeatures.includes(layerId);
        const layer = this.featureLayers.find(layer => layer.id === layerId);
        if (!layer) {
          return;
        }

        if (layer.leafletObject) {
          if (active) {
            layer.leafletObject.addTo(this.map);
            if (layer.primary && fit) {
              try {
                let bounds;
                if (layer.leafletObject.bounds) {
                  bounds = layer.leafletObject.bounds;
                } else {
                  bounds = layer.leafletObject.getBounds();
                }
                this.map.fitBounds(bounds);
              } catch (e) {
              }
            }
          } else {
            layer.leafletObject.removeFrom(this.map);
          }
        }
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
