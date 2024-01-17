import { definePlugin } from 'sanity';
import getSchema, { Config } from './schema';

export type SanityCommercePluginConfig = Config | void;

export const sanityCommerce = definePlugin<Config | void>((config) => {
  return {
    name: 'sanity-plugin-commerce',
    schema: {
      types: getSchema(config || {}),
    },
  };
});
