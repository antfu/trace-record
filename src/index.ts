import type { StackFrameLite } from 'error-stack-parser-es/lite'
import { parseStack } from 'error-stack-parser-es/lite'
import type { TraceObject } from './types'

export * from './types'

// @ts-expect-error missing globalThis type
let map: WeakMap<any, TraceObject> = globalThis.__TRACE_RECORD_MAP__
if (!map) {
  map = new WeakMap()
  Object.defineProperty(globalThis, '__TRACE_RECORD_MAP__', {
    value: map,
    writable: false,
    enumerable: false,
  })
}

export function record<T extends WeakKey>(arg: T, object: TraceObject = {}) {
  // eslint-disable-next-line unicorn/error-message
  object.stack = new Error().stack
  if (object.stack)
    map.set(arg, object)
  return arg
}

export function getTraceRaw<T extends WeakKey>(_arg: T): string | undefined {
  return map.get(_arg)?.stack
}

export function getTrace<T extends WeakKey>(_arg: T): StackFrameLite[] | undefined {
  const stack = map.get(_arg)
  return stack?.stack
    ? parseStack(stack.stack).slice(stack.level ?? 1)
    : undefined
}
