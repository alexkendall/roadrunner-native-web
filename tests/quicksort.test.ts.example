import Solutions from '../src/Data/Solutions'
import { expect, test, describe } from '@jest/globals'
import { Comparator, quicksort } from '../src/sort/quicksort'

describe('test quicksort', () => {
  test('quicksort matches built-in javascript sort', () => {
    const comparator: Comparator<number> = (item1: number, item2: number): number => {
      return item1 - item2
    }
    const input = [9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    expect(quicksort(comparator, input)).toEqual(input.sort(comparator))
  })
})
