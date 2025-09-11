const moment = require('moment');

function getDate(){
    const nowDate = moment();
    console.log(nowDate.format("YYYY/DD/MM HH:mm:ss"));
  }
getDate();