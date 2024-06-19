import Solutions from '../src/Data/Solutions'
import { expect, test, describe } from '@jest/globals'

describe('test solutions', () => {
  test('validate solutions contain necessary fields {asset, body, description, render, title}', () => {
    const solutions = Object.values(Solutions)
    for (let i = 0; i < solutions.length; ++i) {
      const solution = solutions[i]
      expect(solution).toBeDefined()
      expect(solution.asset).toBeDefined()
      expect(solution.body).toBeDefined()
      expect(solution.description).toBeDefined()
      expect(solution.render).toBeDefined()
      expect(solution.title).toBeDefined()
    }
  })

  test('validate solutions fields {asset, body, render, title} are valid', () => {
    const solutions = Object.values(Solutions)
    for (let i = 0; i < solutions.length; ++i) {
      const solution = solutions[i]
      expect(solution.asset.length).toBeGreaterThan(0)
      expect(solution.body.length).toBeGreaterThan(0)
      expect(solution.title.length).toBeGreaterThan(0)
    }
  })
})
