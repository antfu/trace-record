# trace-record

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Get the stack trace of the creation of objects.

## Usages

```ts
// foo.ts
import { record } from 'trace-record'

export const obj = record({ some: 'obj' })
```

```ts
// bar.ts
import { getTrace } from 'trace-record'
import { obj } from './foo'

console.log(getTrace(obj)) // [{ file: 'foo.ts', line: 3, column: 0 }, ...]
```

## APIs

### `record<T>(obj: T): T`

`record()` is a bypass function that returns the object passed in. But also records the current stack trace and binds it to the object with an internal WeakMap. To retrieve the stack trace, use `getTrace()` and pass the object instance to it.

```ts
import { record } from 'trace-record'

const obj = record({ some: 'obj' })
const arr = record([1, 2, 3])
const fn = record(() => {})
```

Since it uses WeakMap under the hood, it requires the object to be a reference type (object-like). Primitive types like `string`, `number`, `boolean`, `null`, `undefined` will not work.

### `getTrace(obj: any): StackFrame[] | undefined`

`getTrace()` retrieves the stack trace of the object created by `record()`. It returns an array of `StackFrame` array. Returns `undefined` if the object is not recorded. Stacktrace parsing is powered by [`error-stack-parser-es`](https://github.com/antfu/error-stack-parser-es)

### `getTraceRaw(obj: any): string | undefined`

Same as `getTrace()` but returns a raw, unparsed, stacktrace string provided by the the JavaScript engine. The format may vary between engines and runtimes.

## Noop Exports

To make it easier to bail out the tracing in production, you can alias the package to the noop export in your build tool.

```ts
defineConfig({
  alias: {
    'trace-record': 'trace-record/noop'
  }
})
```

## Transpiler

I have a plan to rewrite a transpiler to automatically insert the `record()` for specific types of objects. For now, you might need to manually add `record()` to the objects you want to trace.

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2023-PRESENT [Anthony Fu](https://github.com/antfu)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/trace-record?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/trace-record
[npm-downloads-src]: https://img.shields.io/npm/dm/trace-record?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/trace-record
[bundle-src]: https://img.shields.io/bundlephobia/minzip/trace-record?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=trace-record
[license-src]: https://img.shields.io/github/license/antfu/trace-record.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/antfu/trace-record/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/trace-record
