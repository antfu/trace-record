import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/noop',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
