import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    // Increase chunk size warning limit (project has large legal data files)
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      output: {
        // Manual chunking to split large encyclopedia data from UI code
        manualChunks(id) {
          // node_modules chunking — avoid circular references by being selective
          if (id.includes('node_modules')) {
            // Export/document generation libraries (large, rarely used on first load)
            if (
              id.includes('docx') ||
              id.includes('pdf-lib') ||
              id.includes('html2pdf') ||
              id.includes('file-saver') ||
              id.includes('jspdf') ||
              id.includes('html2canvas')
            ) {
              return 'export-vendor';
            }
            // QR code library
            if (id.includes('qrcode')) {
              return 'qr-vendor';
            }
            // All other node_modules go to vendor (React included)
            return 'vendor';
          }

          // Split large encyclopedia data files into separate chunks
          if (id.includes('officialStatutoryMegaRepository')) {
            return 'encyclopedia-mega';
          }
          if (id.includes('officialEncyclopediaCorporatePartnerships')) {
            return 'encyclopedia-corporate';
          }
          if (id.includes('officialEncyclopediaExpanded5')) {
            return 'encyclopedia-exp5';
          }
          if (id.includes('officialEncyclopediaExtended')) {
            return 'encyclopedia-ext';
          }
          if (id.includes('officialEncyclopediaGAFI')) {
            return 'encyclopedia-gafi';
          }
          if (id.includes('officialEncyclopedia')) {
            return 'encyclopedia-core';
          }
          if (id.includes('contractBuilder')) {
            return 'contract-builder';
          }
          if (id.includes('legalRecitalsEnricher')) {
            return 'legal-enricher';
          }
        },
      },
    },
  },
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
