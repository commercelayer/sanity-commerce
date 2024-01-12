import { definePlugin } from 'sanity';
import getSchema, { Config } from './schema';

type SanityCommerceConfig = Config | void;

export const sanityCommerce = definePlugin<SanityCommerceConfig | void>(
  (config) => {
    return {
      name: 'sanity-plugin-commerce',
      schema: {
        types: getSchema(config || {}),
      },
    };
  },
);
