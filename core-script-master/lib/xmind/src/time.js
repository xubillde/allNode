'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeStr = getTimeStr;
function getTimeStr(minute, expandDate) {

  if (minute < 60) return minute + 'm';

  var getRemain = function getRemain(m, remain) {
    return m % remain;
  };

  var getHour = function getHour(minute) {
    var remainMinute = getRemain(minute, 60);
    var hour = (minute - remainMinute) / 60;
    return '' + (hour ? hour + 'h' : '') + (remainMinute ? Math.round(remainMinute) + 'm' : '');
  };

  if (minute < 60 * 8) return getHour(minute);

  var remainHour = getRemain(minute, 60 * 8);
  var workDay = (minute - remainHour) / (60 * 8);
  var getWorkDay = function getWorkDay(minute) {
    return workDay + 'd' + getHour(remainHour);
  };

  if (!expandDate) return getWorkDay(minute);
  // 一天只有8个h，还要加上(workDay * 16 * 60)
  return '' + getDateFromUnix(new Date(expandDate).getTime() + (minute + workDay * 16 * 60) * 60 * 1000);
}

function getDateFromUnix(time) {
  return new Date(time).toLocaleDateString();
}