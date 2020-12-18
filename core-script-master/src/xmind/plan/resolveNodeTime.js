export default function resolveNodeTime(timeStr) {
  const timeCombine = timeStr.split('/')
  const min = parseInt(timeCombine[0])
  const max = timeCombine[1] && parseInt(timeCombine[1]) || min
  return {
    min,
    max,
    expect: (max + min) / 2
  }
}