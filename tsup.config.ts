import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['lib/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
  },
  splitting: false,
  sourcemap: true,
  clean: false, // Vite will handle cleaning
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  target: 'es2020',
  minify: false,
  bundle: true,
  outDir: 'dist',
  tsconfig: './tsconfig.build.json',
  skipNodeModulesBundle: true,
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    }
  },
})
