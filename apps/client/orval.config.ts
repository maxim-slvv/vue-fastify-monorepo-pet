import { defineConfig } from 'orval'

export default defineConfig({
  crypto: {
    output: {
      target: 'src/shared/api/crypto.gen.ts',
      client: 'fetch',
      mode: 'single',
      prettier: true,
      clean: true,
    },
    input: {
      target: 'http://localhost:3000/docs/json', //TODO ENVS
    },
    hooks: { afterAllFilesWrite: ['prettier --write src/shared/api/crypto.gen.ts'] },
  },
})
