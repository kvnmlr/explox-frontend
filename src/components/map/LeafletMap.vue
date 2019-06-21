<template>
  <div>
    <div class="elevation-5" style="padding: 8px;">
      <div id='images'></div>
      <section v-if="mapReady">
        <div id="map" style="height: 600px"></div>
      </section>
      <v-layout v-else column align-center justify-center style="height: 300px;">
        <v-progress-circular
          :size="80"
          :width="9"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-layout>
      <v-expansion-panel class="elevation-0" :value="openPanel && mapReady ? 0 : 1">
        <v-expansion-panel-content>
          <div slot="header">Map Visuals</div>
          <v-card>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 md3>
                  <v-menu offset-y>
                    <v-btn slot="activator" class="gradient gradient-orange" dark round>Change Map Style</v-btn>
                    <v-list style="z-index: 900" v-for="map in mapLayers" :key="map.index">
                      <v-list-tile @click="() => {selectedMap = map.id; reloadMap()}">
                        <v-list-tile-title>{{map.name}}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-flex>
                <v-flex xs12 md3>
                  <div
                    v-for="layer in featureLayers.filter((l) => {return l.toggleAble}).slice(0, Math.floor(featureLayers.filter((l) => {return l.toggleAble}).length / 2))"
                    :key="layer.id + layer.name">
                    <v-switch v-on:change="layerChanged(layer.id, false)" v-model="selectedFeatures"
                              v-bind:label="layer.name"
                              v-bind:value="layer.id" color="primary" hide-details>{{layer.name}}
                    </v-switch>
                  </div>
                </v-flex>
                <v-flex xs12 md3>
                  <div
                    v-for="layer in featureLayers.filter((l) => {return l.toggleAble}).slice(Math.floor(featureLayers.filter((l) => {return l.toggleAble}).length / 2), featureLayers.length)"
                    :key="layer.id + layer.name">
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

  </div>

</template>

<script>
  import geoTransformMixin from '../../mixins/geoTransformMixin'
  import {EventBus} from '@/eventBus.js'

  require('../../assets/js/L.GridLayer.MaskCanvas.js')
  require('../../assets/js/leaflet-tilelayer-mask.js')
  require('../../assets/js/leaflet-heat.js')
  require('../../assets/js/heatcanvas/heatcanvas.js')
  require('../../assets/js/heatcanvas/heatcanvas-leaflet.js')

  // let x = require('../../../node_modules/leaflet-image/leaflet-image.js');

  export default {
    name: 'simple',
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

        routeInitialized: false,
        activitiesInitialized: false,
        mapReady: true,

        elevation: null,
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
      hasElevationProfile: Boolean,
    },

    mixins: [geoTransformMixin],
    beforeRouteLeave (to, from, next) {
      EventBus.$emit('removeMap', next)
    },
    created () {
      console.log(this)

      this.routeInitialized = false
      this.activitiesInitialized = false
      this.mapReady = true

      let features = []
      if (this.showRoute) {
        features.push(this.id_route)
        features.push(this.id_start_point)
        features.push(this.id_end_point)
      }
      if (this.showActivityMap) {
        features.push(this.id_activity)
      }
      if (this.showMouseSelection) {
        features.push(this.id_mouse_start_selection)
        features.push(this.id_mouse_end_selection)
      }
      this.selectedFeatures = features

      if (this.dark) {
        this.selectedMap = 1
      }

      EventBus.$on('routeReady', async (data) => {
        this.route = data
        this.routeGeoJSON = this.toGeoJSON(this.route.geo, false)
        this.routeWaypoints = this.toWaypoints(this.route.geo, true)
        this.routeInitialized = true

        if (this.activitiesInitialized || !this.showActivityMap || !this.user) {
          this.mapReady = true
          setTimeout(this.reloadMap, 100)
        }
      })
      EventBus.$on('activitiesReady', async (data) => {
        this.activities = data
        await this.asyncForEach(this.activities, async (activity) => {
          this.activitiesGeoJSON = this.activitiesGeoJSON.concat(this.toGeoJSON(this.normalizeGeos(activity.geo), true))
        })
        this.activitiesInitialized = true
        if (this.routeInitialized || !this.showRoute || this.$router.currentRoute.name.includes('Creator')) {
          this.mapReady = true
          setTimeout(this.reloadMap, 100)
        }
      })
      EventBus.$on('removeMap', (next) => {
        try {
          this.mapReady = false
          this.map.remove()
        } catch (ignored) {
          return
        }
        this.map = undefined
        next()
      })
    },

    mounted () {
      this.mapReady = true
      this.initProviders()
      this.init()
    },

    methods: {
      async asyncForEach (array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array)
        }
      },
      addMouseStartSelectionLayer (id) {
        let self = this
        this.map.on('click', function (click) {
          if (click.latlng && self.currentSelectStart && self.selectEnabled) {
            self.$emit('startSelected', click.latlng)

            const geojsonMarkerOptions = {
              radius: 8,
              fillColor: '#ff780000',
              color: '#000',
              weight: 5,
              opacity: 1,
              fillOpacity: 0.8
            }
            let states = {
              id: id,
              label: 'mouse',
              name: 'Mouse Selection',
              type: 'Feature',
              properties: {
                type: 'start',
                popupContent: 'This is the start point!'
              },
              geometry: {
                type: 'Point',
                coordinates: [click.latlng.lng.toFixed(4).toString(), click.latlng.lat.toFixed(4).toString()]
              }
            }

            // check if this layer already exists
            let index
            const layerExists = self.featureLayers.find((layer, i) => {
              if (layer.id === self.id_mouse_start_selection) {
                index = i
                return true
              }
              return false
            })

            if (!layerExists) {
              // push the layer for the first time and set index to the last position in the array
              self.featureLayers.push(states)
              index = self.featureLayers.length - 1
            } else {
              // remove the layer from the map in order to remove previous selections
              self.map.removeLayer(self.featureLayers[index].leafletObject)
            }

            // create and assign the geoJSON object
            self.featureLayers[index] = states
            self.featureLayers[index].leafletObject = L.geoJSON(states, {
              //onEachFeature: onEachFeature,
              style: function (feature) {
                geojsonMarkerOptions.color = '#ff7100'
                return geojsonMarkerOptions
              },
              pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions)
              }
            })

            // update the layer
            self.layerChanged(self.id_mouse_start_selection)
          }
        })
      },
      addMouseEndSelectionLayer (id) {
        let self = this
        this.map.on('click', function (click) {
          if (click.latlng && !self.currentSelectStart && self.selectEnabled) {

            self.$emit('endSelected', click.latlng)

            const geojsonMarkerOptions = {
              radius: 10,
              fillColor: '#ff780000',
              color: '#000',
              weight: 5,
              opacity: 1,
              fillOpacity: 0.8,
            }
            let states = {
              id: id,
              label: 'mouse',
              name: 'End Selection',
              type: 'Feature',
              properties: {
                type: 'end',
                popupContent: 'This is the end point!'
              },
              geometry: {
                type: 'Point',
                coordinates: [click.latlng.lng.toFixed(4).toString(), click.latlng.lat.toFixed(4).toString()]
              },
              toggleAble: false,
            }

            // check if this layer already exists
            let index
            const layerExists = self.featureLayers.find((layer, i) => {
              if (layer.id === self.id_mouse_end_selection) {
                index = i
                return true
              }
              return false
            })

            if (!layerExists) {
              // push the layer for the first time and set index to the last position in the array
              self.featureLayers.push(states)
              index = self.featureLayers.length - 1
            } else {
              // remove the layer from the map in order to remove previous selections
              self.map.removeLayer(self.featureLayers[index].leafletObject)
            }

            // create and assign the geoJSON object
            self.featureLayers[index] = states
            self.featureLayers[index].leafletObject = L.geoJSON(states, {
              //onEachFeature: onEachFeature,
              style: function (feature) {
                geojsonMarkerOptions.color = '#0cAAFF'
                return geojsonMarkerOptions
              },
              pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions)
              }
            })

            // update the layer
            self.layerChanged(self.id_mouse_end_selection)
          }
        })
      },
      addCoverageLayer (id) {
        if (!this.activities) {
          return
        }
        if (this.activities.length === 0) {
          return
        }
        const coverageLayer =
          {
            id: id,
            label: 'coverage',
            name: 'Activity Map',
            style: {
              'color': '#00FF00',
              'weight': 5,
              'opacity': 1
            },
            primary: 1,
            properties: {
              type: 'route'
            },
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: this.activitiesGeoJSON,
            },
            toggleAble: true,
          }
        this.featureLayers.push(coverageLayer)
      },
      addMarkerLayer (id) {
        const markerDistance = this.getDistanceFromLatLonInKm(this.routeGeoJSON[0][1], this.routeGeoJSON[0][0], this.routeGeoJSON[this.routeGeoJSON.length - 1][1], this.routeGeoJSON[this.routeGeoJSON.length - 1][0])
        const tooClose = markerDistance < 30
        const startPoint =
          {
            id: id,
            label: 'start',
            name: 'Start',
            type: 'marker',
            coords: tooClose
              ? [this.routeGeoJSON[0][1] + 0.0001, this.routeGeoJSON[0][0] + 0.0001]
              : [this.routeGeoJSON[0][1], this.routeGeoJSON[0][0]],
            toggleAble: true,
          }

        const endPoint = {
          id: id + 1,
          name: 'Finish',
          label: 'end',
          type: 'marker',
          color: 'green',
          coords: tooClose
            ? [this.routeGeoJSON[this.routeGeoJSON.length - 1][1] - 0.0001, this.routeGeoJSON[this.routeGeoJSON.length - 1][0] - 0.0001]
            : [this.routeGeoJSON[this.routeGeoJSON.length - 1][1], this.routeGeoJSON[this.routeGeoJSON.length - 1][0]],
          toggleAble: true,
        }
        this.featureLayers.push(startPoint)
        this.featureLayers.push(endPoint)
      },
      addRouteLayer (id) {
        let color = '#ffa54d'

        const routeLayerWhite =
          {
            id: id,
            label: 'route',
            name: 'Route White Outline',
            style: {
              'color': 'White',
              'weight': 8,
              'opacity': 0.5
            },
            primary: 2,
            properties: {
              type: 'route'
            },
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: this.routeGeoJSON,
            },
            toggleAble: false,
          }

        const routeLayerBlack =
          {
            id: id,
            label: 'route',
            name: 'Route Black Outline',
            style: {
              'color': 'black',
              'weight': 6,
              'opacity': 1
            },
            primary: 2,
            properties: {
              type: 'route'
            },
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: this.routeGeoJSON,
            },
            toggleAble: false,
          }

        const routeLayer =
          {
            id: id,
            label: 'routeelevation',
            name: 'Route',
            style: {
              'color': color,
              'weight': 5,
              'opacity': 1
            },
            primary: 5,
            properties: {
              type: 'route'
            },
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: this.routeGeoJSON,
            },
            toggleAble: true,
          }

        this.featureLayers.push(routeLayerWhite)
        this.featureLayers.push(routeLayerBlack)
        this.featureLayers.push(routeLayer)

      },

      reloadMap () {
        if (!this.map) {
          this.init()
        } else {
          try {
            if (this.elevation !== null) {
              this.elevation.clear()
            }
            this.map.remove()
            this.map = undefined
          } catch (e) {
            return
          }
          this.init()
        }

      },

      init () {
        if (!this.initView()) {
          return
        }

        this.providerChanged(this.selectedMap)

        // add layers
        this.featureLayers = []
        if (this.activitiesGeoJSON && this.showActivityMap) {
          this.addCoverageLayer(this.id_activity)
        }
        if (this.route && this.showRoute) {
          this.addRouteLayer(this.id_route)
          this.addMarkerLayer(this.id_start_point)
        }

        if (this.showMouseSelection) {
          this.addMouseStartSelectionLayer(this.id_mouse_start_selection)
          this.addMouseEndSelectionLayer(this.id_mouse_end_selection)
        }

        // init layers (create leaflet obejcts)
        this.initLayers()

        // activate layers
        this.bestPrimary = 0
        this.selectedFeatures.forEach(feature => {
          this.layerChanged(feature, true)
        })
      },

      initView () {
        try {
          if (this.map === null || !this.map) {
            this.map = L.map('map', {
              minZoom: 0,
              maxZoom: 100,
              scrollWheelZoom: true,
              zoomControl: true,
              fullscreenControl: true,
            }).setView([49.234, 6.997], 9)
            L.control.locate({
              // keepCurrentZoomLevel: true,
              drawMarker: false,
            }).addTo(this.map)
          }
        } catch (e) {
          // console.error(e)
          return false
        }
        return true
      },

      initProviders () {
        const defaultMap = {
          leafletObject: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }),
          id: 0,
          name: 'Default'
        }
        this.mapLayers.push(defaultMap)

        const explorationMap = {
          leafletObject: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }),
          id: 1,
          name: 'ExploX'
        }
        this.mapLayers.push(explorationMap)

        const lightMap = {
          leafletObject: L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
            subdomains: 'abcd',
            maxZoom: 19
          }),
          id: 2,
          name: 'Light'
        }
        this.mapLayers.push(lightMap)

        const darkMap = {
          leafletObject: L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
            subdomains: 'abcd',
            maxZoom: 19
          }),
          id: 3,
          name: 'Dark'
        }
        this.mapLayers.push(darkMap)

        const cyclingMap = {
          leafletObject: L.tileLayer('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=60c679297f13468f9c6f3992e0f9ea61', {
            attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 22
          }),
          id: 4,
          name: 'Road Cycling'
        }
        this.mapLayers.push(cyclingMap)

        const mtbMap = {
          leafletObject: L.tileLayer('http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &amp; USGS'
          }),
          id: 5,
          name: 'Mountainbike'
        }
        this.mapLayers.push(mtbMap)
      },

      initLayers () {
        this.featureLayers.forEach((layer) => {
            if (layer.label === 'start') {
              const startIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/kvnmlr/explox-frontend/master/src/assets/img/start.png',
                iconSize: [50, 50], // size of the icon
                iconAnchor: [15, 40], // point of the icon which will correspond to marker's location
                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
              })
              layer.leafletObject = L.marker(layer.coords, {icon: startIcon}).bindPopup(layer.name)
              return
            }

            if (layer.label === 'end') {
              const startIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/kvnmlr/explox-frontend/master/src/assets/img/finish.png',
                iconSize: [50, 50], // size of the icon
                iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
              })
              layer.leafletObject = L.marker(layer.coords, {icon: startIcon}).bindPopup(layer.name)
              return
            }

            if (layer.label === 'route' || layer.label === 'routeelevation') {
              if (false /*this.$router.currentRoute.name === 'Creator'*/) {
                const options = {
                  z: 0,
                  allowUTurns: false,
                  geometryOnly: true,
                }

                const routingLayer = L.routing.control({

                  router: new L.Routing.OSRMv1(options),
                  waypoints: this.routeWaypoints,
                  show: false,
                })

                layer.leafletObject = routingLayer
                return
              } else {

                if (layer.label === 'routeelevation') {

                  let geojson = {
                    name: 'NewFeatureType',
                    type: 'FeatureCollection',
                    features: [layer]
                  }

                  this.elevation = new L.Control.Elevation({
                    position: 'bottomright',
                    theme: 'explox-theme', //default: lime-theme
                    width: 500,
                    height: 100,
                    margins: {
                      top: 10,
                      right: 20,
                      bottom: 30,
                      left: 40
                    },
                    useHeightIndicator: this.hasElevationProfile, //if false a marker is drawn at map position
                    interpolation: 'linear', //see https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-area_interpolate
                    hoverNumber: {
                      decimalsX: 3, //decimals on distance (always in km)
                      decimalsY: 0, //deciamls on hehttps://www.npmjs.com/package/leaflet.coordinatesight (always in m)
                      formatter: undefined //custom formatter function may be injected
                    },
                    xTicks: undefined, //number of ticks in x axis, calculated by default according to width
                    yTicks: undefined, //number of ticks on y axis, calculated by default according to height
                    collapsed: false,  //collapsed mode, show chart on click or mouseover
                    imperial: false    //display imperial units instead of metric
                  })
                  this.elevation.addTo(this.map)

                  let leafletObject = new L.geoJson(geojson, {
                    style: layer.style,
                    onEachFeature: this.elevation.addData.bind(this.elevation) //working on a better solution
                  })
                  layer.leafletObject = leafletObject // L.geoJSON(layer, layer.style)
                }
                else {
                  layer.leafletObject = L.geoJSON(layer, layer.style)

                }
                return
              }
            }

            if (layer.label === 'coverage') {
              var addressPoints = this.activitiesGeoJSON

              addressPoints = addressPoints.map(function (p) {
                return [p[0], p[1]]
              })

              let opacity = 0
              switch (this.selectedMap) {
                case 0:
                  opacity = 0.15
                  break
                case 1:
                  opacity = 0.85
                  break
                case 2:
                  opacity = 0.07
                  break
                case 3:
                  opacity = 0.6
                  break
                case 4:
                  opacity = 0.2
                  break
                case 5:
                  opacity = 0.4
                  break
              }

              let coverageLayer = new L.GridLayer.MaskCanvas(
                {
                  radius: this.selectedMap === 1 ? 100 : 10,                 // radius in pixels or in meters (see useAbsoluteRadius)
                  useAbsoluteRadius: true,    // true: r in meters, false: r in pixels
                  color: '#000',              // the color of the layer
                  opacity: opacity,               // opacity of the not covered area
                  noMask: false,              // true results in normal (filled) circled, instead masked circles
                  lineColor: '#A00'           // color of the circle outline if noMask is true
                }
              )
              coverageLayer.setData(this.activitiesGeoJSON)
              layer.leafletObject = coverageLayer

              if (this.selectedMap !== 1) {
                try {
                  const layerOptions = {
                    minOpacity: 0.1,
                    max: 1,
                    radius: 30,
                    blur: 15,
                    gradient: {0.2: 'white', 0.3: 'lime', 0.5: 'orange'},
                  }
                  let heat = L.heatLayer(addressPoints, layerOptions).addTo(this.map)
                  layer.leafletObject = L.featureGroup([heat, coverageLayer])
                  layer.leafletObject.bounds = coverageLayer.bounds
                }
                catch
                  (e) {
                  console.log('Map data is not yet ready for heatmap ' + e.toString())
                }
                return
              }
            }
          }
        )
      },

      layerChanged (layerId, fit) {
        const active = this.selectedFeatures.includes(layerId)
        const layers = this.featureLayers.filter(layer => layer.id === layerId)
        if (!layers || layers.length === 0) {
          return
        }

        layers.forEach((layer) => {
          if (layer.leafletObject) {
            if (active) {
              layer.leafletObject.addTo(this.map)
              if ((layer.primary > this.bestPrimary) && fit) {
                this.bestPrimary = layer.primary
                try {
                  let bounds

                  if (layer.leafletObject.bounds) {
                    bounds = layer.leafletObject.bounds
                  } else {
                    bounds = layer.leafletObject.getBounds()
                  }
                  this.map.fitBounds(bounds)
                } catch (e) {
                  return
                }
              }
            } else {
              layer.leafletObject.removeFrom(this.map)
            }
          }
        })
      },

      providerChanged (mapId) {
        console.log('provider changed')
        this.selectedMap = mapId
        this.mapLayers.forEach(map => {
          if (map.leafletObject) {
            map.leafletObject.removeFrom(this.map)
          }
        })
        const layer = this.mapLayers.find(layer => layer.id === mapId)
        if (layer.leafletObject) {
          layer.leafletObject.addTo(this.map)
        }
        if (layer.routingLayer) {
          layer.routingLayer.addTo(this.map)
        }
      },
    },
  }
</script>

<style scoped>
</style>
