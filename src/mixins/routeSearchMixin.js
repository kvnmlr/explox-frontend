export default {
  computed: {
    filteredRoutes: function () {
      return this.routes.filter((route) => {
        return (route.title.toUpperCase().match(this.search.toUpperCase())
          || route.body.toUpperCase().match(this.search.toUpperCase()));
      })
    }
  },
}
