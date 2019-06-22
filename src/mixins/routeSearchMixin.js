export default {
  computed: {
    filteredRoutes: function () {
      return this.routes.filter((route) => {
        if (this.search !== '') {
          this.page = 1
        }
        return (route.title.toUpperCase().match(this.search.toUpperCase())
          || route.body.toUpperCase().match(this.search.toUpperCase()))
      })
    }
  }
}
