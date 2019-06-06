<template>
  <div class="elevation-5">
    <div id='images'></div>
    <div id="map"></div>
    <v-expansion-panel class="elevation-0" :value="openPanel ? 0 : 1">
      <v-expansion-panel-content>
        <div slot="header">Map Visuals</div>
        <v-card>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 md3>
                <v-menu offset-y>
                  <v-btn slot="activator" class="gradient gradient-orange" dark round>Change Map Style</v-btn>
                  <v-list style="z-index: 900" v-for="map in mapLayers" :key="map.index">
                    <v-list-tile @click="providerChanged(map.id)">
                      <v-list-tile-title>{{map.name}}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-flex>
              <v-flex xs12 md3>
                <div v-for="layer in featureLayers.slice(0, Math.floor(featureLayers.length / 2))" :key="layer.id">
                  <v-switch v-on:change="layerChanged(layer.id, false)" v-model="selectedFeatures"
                            v-bind:label="layer.name"
                            v-bind:value="layer.id" color="primary" hide-details>{{layer.name}}
                  </v-switch>
                </div>
              </v-flex>
              <v-flex xs12 md3>
                <div v-for="layer in featureLayers.slice(Math.floor(featureLayers.length / 2), featureLayers.length)" :key="layer.id">
                  <v-switch v-on:change="layerChanged(layer.id, false)" v-model="selectedFeatures"
                            v-bind:label="layer.name"
                            v-bind:value="layer.id" color="primary" hide-details>{{layer.name}}
                  </v-switch>
                </div>
              </v-flex>
              <v-flex xs12 md3>
                <v-btn light fab class="gradient gradient-green" style="float: right;" v-on:click="reloadMap">
                  <v-icon>refresh</v-icon>
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
  require('../../assets/js/leaflet-tilelayer-mask.js');
  require('../../assets/js/leaflet-heat.js');
  require('../../assets/js/heatcanvas/heatcanvas.js');
  require('../../assets/js/heatcanvas/heatcanvas-leaflet.js');

  // let x = require('../../../node_modules/leaflet-image/leaflet-image.js');

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

        bestPrimary: 0,

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
        } catch (ignored) {
          return;
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
              index = self.featureLayers.length - 1;
            } else {
              // remove the layer from the map in order to remove previous selections
              self.map.removeLayer(self.featureLayers[index].leafletObject);
            }

            // create and assign the geoJSON object
            self.featureLayers[index] = states;
            self.featureLayers[index].leafletObject = L.geoJSON(states, {
              //onEachFeature: onEachFeature,
              style: function (feature) {
                geojsonMarkerOptions.color = "#ff7100";
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
              index = self.featureLayers.length - 1;
            } else {
              // remove the layer from the map in order to remove previous selections
              self.map.removeLayer(self.featureLayers[index].leafletObject);
            }

            // create and assign the geoJSON object
            self.featureLayers[index] = states;
            self.featureLayers[index].leafletObject = L.geoJSON(states, {
              //onEachFeature: onEachFeature,
              style: function (feature) {
                geojsonMarkerOptions.color = "#0cff00";
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
            primary: 1,
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

        let color = '#ff6d00';
        /* if (this.selectedFeatures.includes(this.id_activity)) {
          color = '#ffffff';
        } */
        const routeLayer =
          {
            id: id,
            label: 'route',
            name: 'Route',
            style: {
              "color": color,
              "weight": 5,
              "opacity": 1
            },
            primary: 2,
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
          return;
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
        if (this.activitiesGeoJSON && this.showActivityMap) {
          this.addCoverageLayer(this.id_activity);
        }
        if (this.route && this.showRoute) {
          this.addRouteLayer(this.id_route);
          this.addMarkerLayer(this.id_start_point);
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
        this.bestPrimary = 0;
        this.selectedFeatures.forEach(feature => {
          this.layerChanged(feature, true);
        });
      },

      initView() {
        let self = this;
        try {
          this.map = L.map('map', {
            minZoom: 0,
            maxZoom: 100,
            scrollWheelZoom: false,
            zoomControl: true,
            fullscreenControl: {
              pseudoFullscreen: false // if true, fullscreen to page width and height
            }
          }).setView([49.234, 6.997], 9);


          /* let heatmap = new L.tileLayer.HeatCanvas({}, {'step': 0.5, 'degree': HeatCanvas.LINEAR, 'opacity': 0.5});
          let data = [[40.71455, -74.007124, 103], [37.777125, -122.419644, 86], [47.60356, -122.329439, 41], [51.506325, -0.127144, 40], [41.88415, -87.632409, 40], [43.64856, -79.385324, 36], [32.715695, -117.161719, 29], [30.267605, -97.742984, 26], [49.26044, -123.114034, 25], [44.572195, -116.676054, 24], [34.05349, -118.245319, 22], [42.358635, -71.056699, 20], [35.868436, -92.120663, 19], [39.90601, 116.387909, 17], [45.511795, -122.675629, 17], [48.85693, 2.3412, 16], [39.76486, -99.031824, 16], [31.247709, 121.472618, 15], [45.512293, -73.554407, 15], [52.37312, 4.893195, 15], [33.748315, -84.391109, 15], [29.76045, -95.369784, 14], [37.371612, -122.038258, 14], [-33.869629, 151.206955, 13], [44.979035, -93.264929, 12], [59.33228, 18.06284, 12], [40.438335, -79.997459, 11], [39.95227, -75.162369, 11], [48.136415, 11.577531, 11], [32.0485, 118.778969, 11], [12.97092, 77.60482, 10], [40.01574, -105.279239, 10], [37.44466, -122.160794, 10], [34.011565, -118.492289, 10], [48.202548, 16.368805, 9], [38.725735, -9.15021, 9], [51.490299, -0.1193, 9], [52.516074, 13.376987, 9], [60.17116, 24.93258, 9], [38.89037, -77.031959, 9], [-34.608521, -58.373539, 9], [30.252501, 120.165024, 9], [55.75695, 37.614975, 9], [-37.817532, 144.967148, 9], [37.338475, -121.885794, 8], [37.869885, -122.270539, 8], [41.385589, 2.168745, 8], [50.112065, 8.683415, 8], [1.29378, 103.853256, 8], [36.45106, -93.189394, 8], [48.112955, -105.196669, 7], [32.056915, -87.588184, 7], [35.2225, -80.837539, 7], [39.106614, -84.504552, 7], [32.045101, 34.769711, 7], [39.96196, -83.002984, 7], [41.674498, -72.94619, 7], [38.959374, -77.354571, 7], [13.06397, 80.24311, 7], [53.34807, -6.248274, 7], [44.27257, -121.175874, 7], [39.74001, -104.992259, 7], [29.42449, -98.494624, 6], [40.4203, -3.705774, 6], [36.979335, -85.610864, 6], [32.778155, -96.795404, 6], [-23.56288, -46.654659, 6], [38.62774, -90.199514, 6]];
          for (let i = 0, l = data.length; i < l; i++) {
            heatmap.pushData(data[i][0], data[i][1], data[i][2]);
            //if(data[i][2]> 10) {
            //    var marker = new L.Marker(new L.LatLng(data[i][0], data[i][1]));
            //    marker.bindPopup(data[i].toString());
            //    map.addLayer(marker);
            //}
          }
          let heattile = new L.HeatTile({step: 0.5, degree: HeatCanvas.LINEAR, opacity: 0.7, data: data});
          map.addLayer(heatmap);
          this.map.addLayer(heattile); */

          /* let fg = L.tileLayer.mask('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png', {
              maskSize: 100,
            }//optional
          ).addTo(this.map);

          // Add event handler to update mask position
          this.map.on("mousemove", function (e) {
            fg.setCenter(e.containerPoint);
          }); */


          /* var map = this.map;
          setTimeout(() => {
            if (map !== undefined) {
              console.debug(map);

              let y = new x(map, function(err, canvas) {
                // now you have canvas
                // example thing to do with that canvas:
                let img = document.createElement('img');
                let dimensions = map.getSize();
                img.width = dimensions.x;
                img.height = dimensions.y;
                img.src = canvas.toDataURL();
                document.getElementById('images').innerHTML = '';
                document.getElementById('images').appendChild(img);
              });
            }

          },2000) */

        } catch (e) {
          console.error(e);
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
            var addressPoints = this.activitiesGeoJSON;

            addressPoints = addressPoints.map(function (p) {
              return [p[0], p[1]];
            });

            let coverageLayer = new L.GridLayer.MaskCanvas(
              {
                radius: 40,                 // radius in pixels or in meters (see useAbsoluteRadius)
                useAbsoluteRadius: true,    // true: r in meters, false: r in pixels
                color: '#000',              // the color of the layer
                opacity: 0.1,               // opacity of the not covered area
                noMask: false,              // true results in normal (filled) circled, instead masked circles
                lineColor: '#A00'           // color of the circle outline if noMask is true
              }
            );
            coverageLayer.setData(this.activitiesGeoJSON);
            layer.leafletObject = coverageLayer;

            try {
              const layerOptions = {
                minOpacity: 0.1,
                max: 1,
                radius: 30,
                blur: 20,
                gradient: {0.2: 'blue', 0.4: 'lime', 1: 'orange'},
              };
              let heat = L.heatLayer(addressPoints, layerOptions).addTo(this.map);
              layer.leafletObject = L.featureGroup([heat, coverageLayer]);
              layer.leafletObject.bounds = coverageLayer.bounds;

            } catch (e) {
              console.log("Map data is not yet ready for heatmap");
            }

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
            if ((layer.primary > this.bestPrimary) && fit) {
              this.bestPrimary = layer.primary;
              try {
                let bounds;

                if (layer.leafletObject.bounds) {
                  bounds = layer.leafletObject.bounds;
                } else {
                  bounds = layer.leafletObject.getBounds();
                }

                this.map.fitBounds(bounds);
              } catch (e) {
                return;
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
