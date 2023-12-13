import { definePlugin } from 'sanity';

interface SanityCommerceConfig {
  /* nothing here yet */
}

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {myPlugin} from 'sanity-plugin-sanity-commerce'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [myPlugin()],
 * })
 * ```
 */
export const sanityCommerce = definePlugin<SanityCommerceConfig | void>(
  (config = {}) => {
    // eslint-disable-next-line no-console
    console.log('hello from sanity-plugin-sanity-commerce');

    return {
      name: 'sanity-plugin-sanity-commerce',
    };
  },
);
