import randomItemFromArray from '$lib/utils/randomItemFromArray'

const randomItemsFromArray = <T>(
  array: ReadonlyArray<T>,
  limit = 2,
): Set<T> => {
  const itemsToReturn = new Set<T>()
  while (
    !(itemsToReturn.size === limit || array.length === itemsToReturn.size)
  ) {
    const newItem = randomItemFromArray(array)
    itemsToReturn.add(newItem)
  }
  return itemsToReturn
}

export default randomItemsFromArray
