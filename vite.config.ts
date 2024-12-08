// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { nodePolyfills } from 'vite-plugin-node-polyfills'

// export default defineConfig({
//   plugins: [
//     react(),
//     nodePolyfills({
//       include: ['stream', 'buffer']
//     })
//   ],
//   resolve: {
//     alias: {
//       stream: 'stream-browserify',
//       buffer: 'buffer'
//     }
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       define: { global: 'globalThis' }
//     }
//   },
//   build: {
//     chunkSizeWarningLimit: 1000, // Increased warning threshold
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes('node_modules')) {
//             return 'vendor';
//           }
//         }
//       }
//     }
//   }
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,
    })
  ],
  build: {
    rollupOptions: {
      external: ['graphql'],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable code splitting
    sourcemap: true,
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
    }
  },
  // Optimize performance
  optimizeDeps: {
    include: ['react', 'react-dom'],
  }
})