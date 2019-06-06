export default {
  methods: {
    deg2rad (deg) {
      return deg * (Math.PI / 180)
    },
    getDistanceFromLatLonInKm (lat1, lon1, lat2, lon2) {
      const R = 6371 // Radius of the earth in km
      let dLat = this.deg2rad(lat2 - lat1)  // deg2rad below
      let dLon = this.deg2rad(lon2 - lon1)
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      let d = R * c // Distance in km
      return d
    },

    toGeoJSON (geos, inverted) {
      const routeData = []
      if (!geos) {
        return routeData
      }
      for (let i = 0; i < geos.length; ++i) {
        if (geos[i].location) {
          let coords
          if (inverted) {
            coords = [(geos[i].location.coordinates[1]), (geos[i].location.coordinates[0])]
          } else {
            coords = [(geos[i].location.coordinates[0]), (geos[i].location.coordinates[1])]
          }

          routeData.push(coords)
        }
      }
      return routeData
    },

    leafletMapConfig (coordinates) {
      return {
        // Probably not needed because we use fitBounds which does this automatically
        zoom: 11,                   // Zoom out such that every point is visible
        center: [49.2646, 6.9598],  // Center in the middle of the points
        scrollWheelZoom: true,     // Prevents scrolling the map when scrolling the page (maybe turn on for non-mobile page)
        zoomControl: false
      }
    }
  }
}
