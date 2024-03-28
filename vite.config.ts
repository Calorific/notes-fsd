import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa'
import manifest from './manifest.json'

const vitePWA = VitePWA({
  registerType: 'autoUpdate',
  manifest: manifest as Partial<ManifestOptions>
})

export default defineConfig({
  plugins: [react(), vitePWA],
})
