import { defineConfig } from 'orval'

export default defineConfig({
  crypto: {
    output: {
      target: 'src/shared/api/crypto.gen.ts',
      client: 'fetch',
      mode: 'single',
      baseUrl: "import { API_URL } from '@/shared/config/api'\nexport const BASE = `${API_URL}`\n",
      prettier: true,
    },
    input: {
      target: 'http://localhost:3000/docs/json', //TODO ENVS
    },
    hooks: {
      afterAllFilesWrite: ['prettier --write src/shared/api/crypto.gen.ts'],
    },
  },
})
