import { defineConfig } from 'astro/config'

const cert = './localhost.pem'
const key = './localhost-key.pem'

export default defineConfig({
  server: {
    host: true,
    port: 1987,
  },
  vite: {
    server: {
      https: {
        key,
        cert
      }
    }
  }
})