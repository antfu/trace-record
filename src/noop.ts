import type { StackFrame } from 'error-stack-parser-es'

export function record<T extends WeakKey>(arg: T) {
  return arg
}

export function getTraceRaw<T extends WeakKey>(_arg: T): string | undefined {
  return undefined
}

export function getTrace<T extends WeakKey>(_arg: T): StackFrame[] | undefined {
  return undefined
}
