const moment = require('moment');

function getDate(){
    const nowDate = moment();
    console.log(nowDate.format("YYYY/DD/MM HH:mm:ss"));
  }
getDate();


function getCurrentWeekday() {
    const day = moment().format("dddd");
    console.log(day);
}
getCurrentWeekday();