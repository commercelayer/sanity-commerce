import { definePlugin } from 'sanity';
import schemaTypes from './schemas';

interface SanityCommerceConfig {
  /* nothing here yet */
}

export const sanityCommerce = definePlugin<SanityCommerceConfig | void>(
  (config = {}) => {
    return {
      name: 'sanity-plugin-sanity-commerce',
      schema: {
        types: schemaTypes,
      },
    };
  },
);
