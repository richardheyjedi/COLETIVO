import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      // NOTE: Keys defined here are INLINED into the client bundle and visible in
      // the browser's source inspector. For production, use a server-side BFF to
      // proxy requests to Google Maps / Gemini APIs instead of exposing these keys.
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
      'process.env.GOOGLE_MAPS_PLATFORM_KEY': JSON.stringify(env.GOOGLE_MAPS_PLATFORM_KEY || ''),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // Target modern browsers for better tree-shaking and smaller output
      target: 'es2020',
      // Use esbuild for fast, efficient minification
      minify: 'esbuild',
      // Enable CSS minification
      cssMinify: true,
      // Warn only on truly large chunks (>700KB)
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          // Strategy: group by how often they change and their size
          manualChunks: (id) => {
            // React ecosystem — smallest, changes least often
            if (id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('/react/')) {
              return 'vendor-react';
            }

            // Animation libs — large but rarely change (good for long-term cache)
            if (
              id.includes('/gsap/') ||
              id.includes('@gsap/') ||
              id.includes('/split-type/') ||
              id.includes('/lenis/')
            ) {
              return 'vendor-animation';
            }

            // Framer Motion — large library, separate chunk
            if (id.includes('/motion/') || id.includes('framer-motion')) {
              return 'vendor-motion';
            }

            // Icon library — medium size, rarely changes
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }

            // Google Maps — only loaded when API key exists, keep separate
            // so it can be truly tree-shaken when not needed
            if (id.includes('@vis.gl/') || id.includes('react-google-maps')) {
              return 'vendor-maps';
            }

            // Gemini AI SDK — keep separate since it's large
            if (id.includes('@google/genai')) {
              return 'vendor-ai';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
