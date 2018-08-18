export default {
  methods: {
    formatDate(dateString, short) {
      const date = new Date(dateString);
      const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];

      const minutes = date.getMinutes();
      const hours = date.getHours();
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();

      if (!short) {
        return day + '. ' + monthNames[monthIndex] + ' ' + year + ' at ' + hours + ':' + minutes;
      } else {
        return day + '.' + monthIndex + '.' + year
      }
    }
  }
}
