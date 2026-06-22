import { defineConfig, type Plugin, type ResolvedConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import fs from 'node:fs'
import path from 'node:path'

// Copy the built index.html → 404.html so GitHub Pages serves the SPA shell
// (with the original URL preserved) for deep links such as /services on a hard
// refresh. Same approach used in the dynamic-robotics-website repo.
function spaFallback(): Plugin {
  let outDir = 'dist'
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    configResolved(config: ResolvedConfig) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const index = path.resolve(outDir, 'index.html')
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, path.resolve(outDir, '404.html'))
      }
    },
  }
}

export default defineConfig({
  // Custom apex domain (standleytech.com) → served from root.
  base: '/',
  plugins: [react(), tsconfigPaths(), spaFallback()],
})
