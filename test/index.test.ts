import { expect, it } from 'vitest'
import { getTrace, record } from '../src'

const regex = record(/foo/)

it('should work', () => {
  const trace = getTrace(regex)!
  expect(trace).toBeDefined()
  expect(trace[0].file).toBe(__filename)
  expect(trace[0].line).toBe(4)
})

it('should throw on literal', () => {
  expect(() => {
    // @ts-expect-error literal
    record('1')
  }).throw()
})
