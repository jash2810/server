function addZeros(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
constants = {
    getFormatedDate: (date) => {
        return (
            addZeros(date.getDate())
            + '/'
            + addZeros(date.getMonth()) 
            + '/' 
            + addZeros(date.getFullYear())
        );
    },
    getFormatedTime: (date) => {
        return (
        addZeros(date.getHours())
        + ':'
        + addZeros(date.getMinutes()) 
        + ':' 
        + addZeros(date.getSeconds())
        )
    }
}

module.exports = {
    constants
}