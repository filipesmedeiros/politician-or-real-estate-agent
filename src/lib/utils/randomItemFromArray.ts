export const randomItemFromArray = <T>(array: ReadonlyArray<T>): T =>
  array.length <= Number.MAX_SAFE_INTEGER
    ? array[(array.length * Math.random()) | 0]
    : array[Math.floor(Math.random() * array.length)]
