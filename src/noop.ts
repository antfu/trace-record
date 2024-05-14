import type { StackFrameLite } from 'error-stack-parser-es/lite'
import type { TraceObject } from './types'

export * from './types'

export function record<T extends WeakKey>(arg: T, _object?: TraceObject) {
  return arg
}

export function getTraceRaw<T extends WeakKey>(_arg: T): string | undefined {
  return undefined
}

export function getTrace<T extends WeakKey>(_arg: T): StackFrameLite[] | undefined {
  return undefined
}
