import type { StackFrameLite } from 'error-stack-parser-es/lite'
import { parseStack } from 'error-stack-parser-es/lite'

// @ts-expect-error missing globalThis type
let map: WeakMap<any, string> = globalThis.__TRACE_RECORD_MAP__
if (!map) {
  map = new WeakMap<any, string>()
  Object.defineProperty(globalThis, '__TRACE_RECORD_MAP__', {
    value: map,
    writable: false,
    enumerable: false,
  })
}

export function record<T extends WeakKey>(arg: T) {
  // eslint-disable-next-line unicorn/error-message
  const stack = new Error().stack
  if (stack)
    map.set(arg, stack)
  return arg
}

export function getTraceRaw<T extends WeakKey>(_arg: T): string | undefined {
  return map.get(_arg)
}

export function getTrace<T extends WeakKey>(_arg: T): StackFrameLite[] | undefined {
  const stack = map.get(_arg)
  return stack
    ? parseStack(stack).slice(1)
    : undefined
}
