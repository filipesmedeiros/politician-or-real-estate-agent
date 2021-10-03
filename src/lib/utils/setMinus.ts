const setMinus = <T>(set1: Set<T>, set2: Set<T>): Set<T> => {
  const newSet = new Set<T>()
  set1.forEach(item => {
    if (!set2.has(item)) newSet.add(item)
  })
  return newSet
}

export default setMinus
