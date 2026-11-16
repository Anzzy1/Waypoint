import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Share previews need absolute URLs, which only exist once you know where the site is deployed.
 * Set VITE_SITE_URL (e.g. https://waypoint.example.com/) and the build adds the canonical link
 * and the og:url / og:image tags. Without it those tags are simply left out.
 */
function shareTags(siteUrl: string | undefined): Plugin {
  return {
    name: 'waypoint-share-tags',
    transformIndexHtml() {
      if (!siteUrl) return [];
      const base = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`;
      const meta = (attrs: Record<string, string>) => ({ tag: 'meta', attrs, injectTo: 'head' as const });
      return [
        { tag: 'link', attrs: { rel: 'canonical', href: base }, injectTo: 'head' },
        meta({ property: 'og:url', content: base }),
        meta({ property: 'og:image', content: `${base}og.png` }),
        meta({ property: 'og:image:width', content: '1200' }),
        meta({ property: 'og:image:height', content: '630' }),
        meta({ property: 'og:image:alt', content: 'Waypoint: free developer roadmaps. 10 career paths, 93 lessons.' }),
        meta({ name: 'twitter:image', content: `${base}og.png` }),
      ];
    },
  };
}

// base: './' keeps the build working on any static host (GitHub Pages, Netlify, Vercel)
export default defineConfig(({ mode }) => ({
  plugins: [react(), shareTags(loadEnv(mode, '.', '').VITE_SITE_URL)],
  base: './',
  build: {
    rollupOptions: {
      output: {
        // libraries change rarely: separate files stay cached in the browser across our deploys
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
}));
