export default {
  methods: {
    formatDate (dateString, short, time) {
      const date = new Date(dateString)
      const monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
      ]

      const minutes = date.getMinutes()
      const hours = date.getHours()
      const day = date.getDate()
      const monthIndex = date.getMonth()
      const year = date.getFullYear()

      if (short) {
        if (time) {
          return day + '.' + monthIndex + '.' + year + ' at ' + hours + ':' + minutes
        } else {
          return day + '.' + monthIndex + '.' + year
        }
      } else {
        if (time) {
          return day + '. ' + monthNames[monthIndex] + ' ' + year + ' at ' + hours + ':' + minutes
        } else {
          return day + '. ' + monthNames[monthIndex] + ' ' + year
        }
      }
    }
  }
}
