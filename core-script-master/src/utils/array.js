//  ['a', 'a', 'ab'] => ['a0', 'a1', 'ab']

export function uniqueStringArray(sarray) {
  const repeatDic = {}
  // repeatDic = {
  //   a: 1
  // }
  return sarray.map(d => {
    if (repeatDic[d]) { // 之前让初始数字为0，导致这里判断为false
      repeatDic[d] = repeatDic[d] + 1
    } else {
      repeatDic[d] = 1
    }
    return `${d}${repeatDic[d]}` 
  })
}
