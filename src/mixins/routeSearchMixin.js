export default {
  computed: {
    filteredRoutes: function () {
      return this.routes.filter((route) => {
        return (route.name.toUpperCase().match(this.search.toUpperCase())
          || route.speciality.toUpperCase().match(this.search.toUpperCase()));
      })
    }
  }
}
