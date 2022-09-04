import { fileURLToPath } from 'url'

const config = {
  root: 'src',
  base: '/df-talents-old/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./src/index.html', import.meta.url)),
        editor: fileURLToPath(new URL('./src/editor/index.html', import.meta.url)),
        translate: fileURLToPath(new URL('./src/translate/index.html', import.meta.url)),
        professions: fileURLToPath(new URL('./src/professions/index.html', import.meta.url)),
      },
    },
  },
  server: {
    host: true,
    port: 3000
  }
}

export default config