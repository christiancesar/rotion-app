import path from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
// import tsconfigPathsPlugin from 'vite-tsconfig-paths'

// const tsconfigPaths = tsconfigPathsPlugin({
//   projects: [path.resolve('./tsconfig.json')],
// })

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],

    // publicDir: path.resolve('resources'),
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    // publicDir: path.resolve('resources'),
  },
  renderer: {
    define: {
      'process.platform': JSON.stringify(process.platform),
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: './src/renderer/tailwind.config.js',
          }),
        ],
      },
    },
    resolve: {
      alias: {
        '@renderer': path.resolve('src/renderer/src'),
      },
    },
    plugins: [react()],
  },
})
