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

    normalizeGeos (geos) {
      if (!geos) {
        return []
      }

      const maxDistance = 0.02
      const minDistance = 0.01

      let totalDistance = 0

      for (let i = 0; i < geos.length - 1; ++i) {
        if (geos[i].location && geos[i + 1].location) {
          let coords1 = geos[i].location.coordinates
          let coords2 = geos[i + 1].location.coordinates
          const distance = this.getDistanceFromLatLonInKm(coords1[1], coords1[0], coords2[1], coords2[0])
          if (distance > maxDistance) {
            const newGeo = {
              altitude: geos[i].altitude,
              location: {
                coordinates: [
                  (coords1[0] + coords2[0]) / 2,
                  (coords1[1] + coords2[1]) / 2
                ]
              }
            }
            geos.splice(i + 1, 0, newGeo) // add a interpolated geo
            --i
          } else if (distance < minDistance) {
            geos.splice(i+1, 1) // remove the geo that is too dense
            --i
          }
          else {
            totalDistance += distance
          }
        }
      }
      return geos
    },

    toWaypoints (geos, inverted) {
      const waypoints = []
      if (!geos) {
        return routeData
      }
      for (let i = 0; i < geos.length; ++i) {
        if (geos[i].location) {
          let coords
          if (inverted) {
            coords = L.latLng((geos[i].location.coordinates[1]), (geos[i].location.coordinates[0]))
          } else {
            coords = L.latLng((geos[i].location.coordinates[0]), (geos[i].location.coordinates[1]))
          }

          waypoints.push(coords)
        }
      }
      return waypoints
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
