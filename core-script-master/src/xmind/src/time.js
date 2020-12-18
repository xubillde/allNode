export function getTimeStr(minute, expandDate) {
  
  if (minute < 60) return `${minute}m`

  const getRemain = (m, remain) => m % remain

  const getHour = (minute) => {
    const remainMinute = getRemain(minute, 60)
    const hour = (minute - remainMinute ) / 60
    return `${hour ? `${hour}h` : ''}${remainMinute ? `${Math.round(remainMinute)}m` : ''}`
  }

  if (minute < 60 * 8) return getHour(minute)

  const remainHour = getRemain(minute, 60 * 8)
  const workDay = (minute - remainHour) / (60 * 8)
  const getWorkDay = (minute) => {
    return `${workDay}d${getHour(remainHour)}`
  }

  if (!expandDate) return getWorkDay(minute)
  // 一天只有8个h，还要加上(workDay * 16 * 60)
  return `${getDateFromUnix(new Date(expandDate).getTime() + (minute + workDay * 16 * 60) * 60 * 1000)}`

}

function getDateFromUnix (time) {
  return new Date(time).toLocaleDateString()
}
