/* 时间戳转换为时间 */

export function timestampToTime(timestamp) {
  timestamp = timestamp ? timestamp : null;
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  var h = ( date.getHours() < 10 ? '0' +  date.getHours() :  date.getHours()) + ":";
  var m = ( date.getMinutes() < 10 ? '0' +  date.getMinutes() :  date.getMinutes())




  return Y + M + D + h + m
}
