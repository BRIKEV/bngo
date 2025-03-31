import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    sequence: {
      shuffle: false,
      concurrent: false,
    },
    fileParallelism: false,
    globals: true,
    poolOptions: {
      threads: {
        isolate: false,
        singleThread: true,
        maxThreads: 1,
      },
    },
  },
});
