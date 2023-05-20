import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkOembed from 'remark-oembed';
import remarkDirective from 'remark-directive';
import { imageDirective, gistDirective } from './src/remark/directives';
import mdx from '@astrojs/mdx';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://unitaryfund.tghp.co.uk',
  integrations: [tailwind(), mdx(), react()],
  markdown: {
    remarkPlugins: [
      [
        remarkOembed,
        {
          syncWidget: true,
        },
      ],
      remarkDirective,
      imageDirective,
      gistDirective,
    ],
  },
});
