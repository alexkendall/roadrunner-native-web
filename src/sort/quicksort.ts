export type Comparator<T> = (item1: T, item2: T) => number

export const quicksort = <T>(comparator: Comparator<T>, array: Array<T>): Array<T> => {
  if (array.length <= 1) {
    return array
  }

  let pivot = array[0]

  let left = []
  let right = []

  for (let i = 1; i < array.length; i++) {
    if (comparator(array[i], pivot) < 0) {
      left.push(array[i])
    } else {
      right.push(array[i])
    }
  }

  return quicksort(comparator, left).concat(pivot, quicksort(comparator, right))
}
