import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
const cert = './localhost.pem';
const key = './localhost-key.pem';

// https://astro.build/config
export default defineConfig({
  server: {
    host: true,
    port: 1987
  },
  vite: {
    server: {
      https: {
        key,
        cert
      }
    }
  },
  integrations: [react()]
});