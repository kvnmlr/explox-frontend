export default {
  methods: {
    formatDate (dateString, short, time) {
      const date = new Date(dateString)
      const monthNames = ['',
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
      ]

      const minutes = date.getMinutes()
      const hours = date.getHours()
      let day = date.getDate()
      let monthIndex = date.getMonth() + 1
      const year = date.getFullYear()

      if (monthIndex < 10 && short) {
        monthIndex = '0' + monthIndex
      }
      if (day < 10) {
        day = '0' + day
      }

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
