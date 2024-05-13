import type { StackFrameLite } from 'error-stack-parser-es/lite'
import { parse } from 'error-stack-parser-es/lite'

// @ts-expect-error missing globalThis type
const map = globalThis.__TRACE_RECORD_MAP__ = new WeakMap<any, Error>()

// @ts-expect-error missing globalThis type
if (!globalThis.__TRACE_RECORD_MAP__) {
  Object.defineProperty(globalThis, '__TRACE_RECORD_MAP__', {
    value: map,
    writable: false,
    enumerable: false,
  })
}

export function record<T extends WeakKey>(arg: T) {
  // eslint-disable-next-line unicorn/error-message
  map.set(arg, new Error())
  return arg
}

export function getTraceRaw<T extends WeakKey>(_arg: T): string | undefined {
  return map.get(_arg)?.stack
}

export function getTrace<T extends WeakKey>(_arg: T): StackFrameLite[] | undefined {
  const stack = map.get(_arg)
  return stack
    ? parse(stack)
      .slice(1)
    : undefined
}
