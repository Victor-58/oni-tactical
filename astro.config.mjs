// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://idyllic-kataifi-a55830.netlify.app',
  integrations: [sitemap(), compress(), icon()],
});