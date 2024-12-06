// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['stream', 'buffer']
    })
  ],
  resolve: {
    alias: {
      stream: 'stream-browserify',
      buffer: 'buffer'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: { global: 'globalThis' }
    }
  }
})