// vite.config.ts o vitest.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts', // <--- Añade esta línea y ajusta la ruta si es diferente
    // O si lo pones en una carpeta 'tests': './tests/setup.ts'
  },
})