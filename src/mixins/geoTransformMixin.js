export default {
  methods: {
    toGeoJSON(geos, inverted) {
      const routeData = [];
      if (!geos) {
        return routeData;
      }
      for (let i = 0; i < geos.length; ++i) {
        if (geos[i].location) {
          let coords;
          if (inverted) {
            coords = [(geos[i].location.coordinates[1]),(geos[i].location.coordinates[0])];
          } else {
            coords = [(geos[i].location.coordinates[0]),(geos[i].location.coordinates[1])];
          }

          routeData.push(coords);
        }
      }
      return routeData;
    },

    leafletMapConfig(coordinates) {
      return {
        // Probably not needed because we use fitBounds which does this automatically
        zoom: 11,                   // Zoom out such that every point is visible
        center: [49.2646, 6.9598],  // Center in the middle of the points
        scrollWheelZoom: true,     // Prevents scrolling the map when scrolling the page (maybe turn on for non-mobile page)
        zoomControl: false
      };
    }
  }
}
